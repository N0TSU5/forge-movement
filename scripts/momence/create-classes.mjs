// Creates the weekly timetable in Momence as recurring classes by driving the
// dashboard in a browser (Momence has no API for this).
//
//   npm run momence:login                     log in once, saves .auth.json
//   npm run momence:classes                   dry run: show what would be created
//   npm run momence:classes -- --check        fill the form for the first class, screenshot, close without submitting
//   npm run momence:classes -- --live         actually create the missing classes
//
// Options: --start YYYY-MM-DD (first week to schedule, default tomorrow),
//          --headed (watch the browser), --only "Mon 06:30" (one class).
//
// Reads scripts/momence/timetable.json (from parse-timetable.mjs). Classes whose
// weekday and time already exist in Momence are skipped, and anything that
// doesn't match the timetable is listed at the end for fixing by hand. It never
// edits or deletes existing classes.

import { readFileSync, writeFileSync } from 'node:fs'
import { parseArgs } from 'node:util'
import { chromium } from 'playwright'

const HOST_ID = 352016
const DASHBOARD = `https://momence.com/dashboard/${HOST_ID}`
const TIME_ZONE = 'Europe/London'
const DURATION_MINUTES = 60
const CLASSES_IN_ADVANCE = 52

// Timetable class type -> Momence class template.
const TEMPLATES = {
  Reformer: 'Forge Reformer',
  Mat: 'Forge Pilates',
  Yoga: 'Forge Restore',
  Contrast: 'Forge Contrast',
  Barre: 'Forge Barre',
  Reset: 'Forge Reset',
}

const AUTH = new URL('./.auth.json', import.meta.url).pathname
const TIMETABLE = new URL('./timetable.json', import.meta.url).pathname
const SHOTS = new URL('./', import.meta.url).pathname
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const { values: args } = parseArgs({
  options: {
    login: { type: 'boolean' },
    live: { type: 'boolean' },
    check: { type: 'boolean' },
    headed: { type: 'boolean' },
    start: { type: 'string' },
    only: { type: 'string' },
  },
})

if (args.login) await login()
else await run()

async function login() {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('https://momence.com/sign-in')
  console.log('Log in to Momence in the browser window (including 2FA). Waiting...')
  await page.waitForURL(/\/dashboard\/\d+/, { timeout: 10 * 60_000 })
  await context.storageState({ path: AUTH })
  console.log(`Saved login to ${AUTH}`)
  await browser.close()
}

async function run() {
  const start = args.start ? new Date(`${args.start}T12:00:00Z`) : addDays(new Date(), 1)
  let timetable = JSON.parse(readFileSync(TIMETABLE, 'utf8'))
  if (args.only) timetable = timetable.filter((c) => `${c.day.slice(0, 3)} ${c.time}` === args.only)

  const browser = await chromium.launch({ headless: !args.headed })
  const context = await browser.newContext({ storageState: AUTH, viewport: { width: 1400, height: 1100 } })
  const page = await context.newPage()
  page.setDefaultTimeout(60_000)

  try {
    await page.goto(`${DASHBOARD}/sessions`, { waitUntil: 'domcontentloaded' })
    if (!/\/dashboard\/\d+/.test(page.url())) throw new Error('Not logged in. Run: npm run momence:login')

    const existing = await existingWeek(page, start)
    const { toCreate, report } = plan(timetable, existing, start)
    printPlan(toCreate, report, start)

    if (args.check && toCreate[0]) {
      await openForm(page, toCreate[0])
      await fillForm(page, toCreate[0])
      const shot = `${SHOTS}check.png`
      await page.screenshot({ path: shot, fullPage: true })
      console.log(`\n--check: filled the form for "${toCreate[0].label}" and closed the browser without submitting. Screenshot: ${shot}`)
    } else if (args.live) {
      for (const [i, c] of toCreate.entries()) {
        console.log(`\n[${i + 1}/${toCreate.length}] Creating ${c.label}`)
        await openForm(page, c)
        await fillForm(page, c)
        await page.getByRole('button', { name: 'Create', exact: true }).click()
        await page.getByText('Create recurring class').waitFor({ state: 'hidden' })
        // The schedule list can lag a few seconds behind the create.
        let shown = false
        for (let tries = 0; tries < 10 && !shown; tries++) {
          if (tries) await page.waitForTimeout(2000)
          shown = (await existingWeek(page, start)).some((e) => e.key === c.key && e.template === c.template)
        }
        if (!shown) throw new Error(`Momence didn't show ${c.label} after creating it`)
        console.log('  ✓ created')
      }
      console.log(`\nDone. Created ${toCreate.length} recurring classes.`)
    } else {
      console.log('\nDry run only. Re-run with --live to create these classes.')
    }
  } catch (err) {
    const shot = `${SHOTS}error.png`
    await page.screenshot({ path: shot, fullPage: true }).catch(() => {})
    console.error(`\nStopped: ${err.message}\nScreenshot of the page: ${shot}`)
    process.exitCode = 1
  } finally {
    await browser.close()
  }
}

// One week of classes from `start`, read from the same data the Schedule page loads.
async function existingWeek(page, start) {
  const from = new Date(start); from.setUTCHours(0, 0, 0, 0)
  const to = addDays(from, 7)
  const q = new URLSearchParams({
    sortBy: 'startsAt', sortOrder: 'ASC', page: '0', pageSize: '200', timeZone: TIME_ZONE,
    dateFrom: from.toISOString(), dateTo: to.toISOString(),
  })
  q.append('status[]', 'published')
  q.append('status[]', 'unpublished')
  const res = await page.request.get(`https://momence.com/_api/readonly/host/${HOST_ID}/sessions?${q}`)
  if (!res.ok()) throw new Error(`Couldn't read the Momence schedule (HTTP ${res.status()})`)
  const { payload } = await res.json()
  return payload
    .filter((s) => !s.isCancelled)
    .map((s) => {
      const { day, time } = local(new Date(s.startsAt))
      return { day, time, key: `${day} ${time}`, template: s.name, recurring: !!s.sessionRecurringSeriesId }
    })
}

function plan(timetable, existing, start) {
  const toCreate = []
  const report = { exists: [], clash: [], unknown: [] }

  for (const c of timetable) {
    const template = TEMPLATES[c.type]
    const key = `${c.day} ${c.time}`
    const label = labelFor(c)
    if (!template) { report.unknown.push(`${label}: no Momence template for "${c.type}"`); continue }

    const inSlot = existing.filter((e) => e.key === key)
    if (inSlot.some((e) => e.template === template)) { report.exists.push(label); continue }
    if (inSlot.length) {
      report.clash.push(`${c.day} ${c.time}: timetable says ${template}, Momence has ${inSlot.map((e) => e.template).join(', ')}`)
      continue
    }
    toCreate.push({ ...c, key, template, label, startDate: nextWeekday(start, c.day) })
  }

  const wanted = new Set(timetable.map((c) => `${c.day} ${c.time} ${TEMPLATES[c.type]}`))
  report.extra = existing
    .filter((e) => !wanted.has(`${e.key} ${e.template}`) && !report.clash.some((x) => x.startsWith(e.key)))
    .map((e) => `${e.key}: ${e.template} is in Momence but not on the timetable`)

  return { toCreate, report }
}

function printPlan(toCreate, report, start) {
  console.log(`Week starting ${start.toDateString()}\n`)
  console.log(`Already in Momence (${report.exists.length}):`)
  for (const l of report.exists) console.log(`  = ${l}`)
  console.log(`\nTo create (${toCreate.length}):`)
  for (const c of toCreate) console.log(`  + ${c.template.padEnd(15)} ${c.label}   first class ${c.startDate.toDateString()}`)
  const issues = [...report.clash, ...report.extra, ...report.unknown]
  if (issues.length) {
    console.log(`\nInconsistencies to fix by hand in Momence (${issues.length}):`)
    for (const l of issues) console.log(`  ! ${l}`)
  }
}

// The form sometimes renders before the template is applied (blank template,
// no date fields), so reload it until the date section shows up.
async function openForm(page, c) {
  for (let attempt = 1; ; attempt++) {
    await openFormOnce(page, c)
    const date = page.locator('input[name="intervals[0].startsAtDate"]')
    if (await date.waitFor({ timeout: 15_000 }).then(() => true, () => false)) return
    if (attempt === 3) throw new Error(`The form for ${c.label} never loaded the ${c.template} template`)
    console.log(`  form loaded without the template, retrying (${attempt}/3)`)
  }
}

async function openFormOnce(page, c) {
  await page.goto(`${DASHBOARD}/sessions`, { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: /New class/ }).click()
  await page.getByRole('button', { name: /Recurring/ }).click()
  await page
    .getByRole('row')
    .filter({ has: page.getByText(c.template, { exact: true }) })
    .getByRole('button', { name: 'Use template' })
    .click()
  await page.getByText('Create recurring class').waitFor()
}

async function fillForm(page, c) {
  await page.locator('input[name="name"]').fill(c.label)
  await page.locator('input[name="durationMinutes"]').fill(String(DURATION_MINUTES))

  const date = page.locator('input[name="intervals[0].startsAtDate"]')
  await date.fill(usDate(c.startDate))
  await date.press('Tab')

  const time = page.locator('input[name="intervals[0].startsAtTime"]')
  await time.fill(amPm(c.time))
  await time.press('Tab')

  await page.locator('input[name="intervals[0].intervalInDays"]').fill('7')
  await page.locator('input[name="intervals[0].createInAdvance"]').fill(String(CLASSES_IN_ADVANCE))

  // Read the values back so a date/time picker that rejected the input fails loudly.
  const gotDate = await date.inputValue()
  const gotTime = await time.inputValue()
  if (gotDate !== usDate(c.startDate) || gotTime.replace(/^0/, '') !== amPm(c.time))
    throw new Error(`Form didn't take the date/time for ${c.label} (got "${gotDate}" "${gotTime}")`)
}

// "Reformer · Lamia · Mon 6:30am (women only) (tbc)" — staff-only label.
function labelFor(c) {
  const bits = [c.type, c.instructor ?? 'instructor tbc', `${c.day.slice(0, 3)} ${amPm(c.time).replace(' ', '').toLowerCase()}`]
  return bits.join(' · ') + (c.womenOnly ? ' (women only)' : '') + (c.tbc ? ' (tbc)' : '')
}

function local(date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(date).map((p) => [p.type, p.value]),
  )
  return { day: parts.weekday, time: `${parts.hour}:${parts.minute}` }
}

function nextWeekday(from, day) {
  const d = new Date(from)
  while (DAYS[d.getUTCDay()] !== day) d.setUTCDate(d.getUTCDate() + 1)
  return d
}

function addDays(d, n) {
  const x = new Date(d)
  x.setUTCDate(x.getUTCDate() + n)
  return x
}

function usDate(d) {
  return `${String(d.getUTCMonth() + 1).padStart(2, '0')}/${String(d.getUTCDate()).padStart(2, '0')}/${d.getUTCFullYear()}`
}

function amPm(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}
