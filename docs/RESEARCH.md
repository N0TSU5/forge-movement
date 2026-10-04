# Forge Movement Website: Research & Build Plan

_Draft 1, 2026-10-03. Living doc, to be revised as we go._

## 1. Sources reviewed

| Source | Status | Notes |
|---|---|---|
| `ForgeMovement Website.pdf` (brief) | ✅ Read | Sitemap, brand fonts/colours, class copy, contact info, careers blurb |
| Canva draft (`DAHW0tJnnKk`) | ✅ Via screen recording | 6 Canva pages. Page 1 is the designed Forge homepage. Pages 2–6 are the unedited "Momentum Gym" template. See §2a. |
| hillspilates.com.my and subpages | ✅ Read | About, Classes, Instructors, FAQs, Contact, Career, New-to-Hills |
| "FORGE MOVEMENT WEBSITE PICTURES" folder | ❌ Not accessible | It's a Drive chip in the PDF with no URL. **Need the images dropped into the repo.** |
| Momence embed docs | ✅ Skimmed | Plugins are copy-paste snippets from *Studio Setup → Add to Website* ([help article](https://help.momence.com/en/articles/12029975-plugins-widgets-faq-s)) |

## 2a. Canva design: what it actually shows

Source: `Screen Recording 2026-10-03 at 23.19.38.mov`, frames extracted at 0.5s intervals.

### Page 1: the Forge homepage (the real design; build this faithfully)

| # | Section | Background | Content (verbatim where captured) |
|---|---|---|---|
| 1 | **Nav bar** | Cream `#EFE5DB` | Ember "F" logomark on the left. Ember uppercase links on the right: `HOME ▾` `CLASSES ▾` `INSTRUCTOR` `CLASS SCHEDULE` `CONTACT`. Two items have dropdowns: Home (probably Our Story) and Classes (the 5 classes). |
| 2 | **Hero** (about full viewport) | Dark brown, flat | Cream serif "Welcome to", the **FORGE / — MOVEMENT —** logo lockup (ember FORGE with a grain texture and a reversed "Ǝ"-style E, letter-spaced cream MOVEMENT between ember rules), and an ember-outline pill button **FIRST TIMER** near the bottom. No photo. |
| 3 | **Intro** | Brown | Heading "*Movement* made *simple*": "Movement" in ember italic, "simple" in cream italic. Body copy: "We believe that there is a movement behind the movement, purpose behind the progession, and intention behind every exercise. Let us help you elevate that experience!" |
| 4 | **Feature grid (2×2)** | Brown | Each tile is a tall photo, then a cream serif title, then centred body copy:<br>• **Welcoming & Certified Instructors**: "Our instructors are friendly, passionate, and certified in teaching Pilates, Barre, and Yoga that will help you enjoy your fitness journey"<br>• **Fully-Equipted Studio**: "Our studio is equipped with a variety of Pilates props and tools, to help guide you from one movement to the next."<br>• **Recovery Sessions**: "We believe that recovery is a crucial step in movement. Join *Forge Recovery T to slow down and restore.*"<br>• **Infrared Heating**: "Our infrared-installed studio offers that warmth can promote a calming, comfortable feeling during your Pilates session." |
| 5 | **Explore** | Brown | Heading "Explore *Forge Movement*" (ember italic). Three square photos, each with an outline pill button: **OUR INSTRUCTORS**, **CURATED CLASSES**, **OUR STORY**. |
| 6 | **Testimonials** | Brown | Heading "Testimonials". Three white rounded cards, each with a quote, a round avatar and a bold name (template placeholder text and names). Then a cream-outline pill button **BOOK TRIAL CLASS**. |

**Typography as rendered:** headings look like **Cooper BT Light** (soft, low-contrast serif with italics). Body text is **Century Gothic** (single-storey "a"). Buttons are a bold grotesk in caps (**Arimo**). This all matches the brief.

**Copy typos to confirm:** "progession" should be "progression". "Equipted" should be "Equipped". "Forge Recovery T" is probably meant to be "**Forge Reset**", the infrared recovery class in the brief. "offers that warmth can promote…" reads awkwardly.

### Pages 2–6: unedited Canva template ("Momentum Gym")

These still hold template placeholders: $29/$59/$89 memberships, "Morning Cardio 6:00 AM", stock trainers "Leona / Maeva / Jeremy", "123 Anywhere St.", "hello@reallygreatsite.com". I read them as **layout ideas for the subpages**, not final content:

| Template section | Look | Maps to Forge page |
|---|---|---|
| "About Us": heading with a full-width rule, empty text area, 3-photo row | Cream | `/our-story` |
| "Choose the *plan* that fits you": 3 photos and price columns | Rust `~#5C2A10` | Pricing. **Not in the brief.** Is it needed, or does Momence handle it? |
| "Membership *benefits*": 3 line icons, caps serif titles, body | White | Could become "Why Forge" or equipment |
| "Start your fitness…": enquiry form | Sand `~#E8D8A0` | Contact form |
| "Find a *class* you'll love": 3 photos with class name and time | Rust | `/classes` cards |
| "Stay *motivated* together": big heading, wide photo, 3 caps-serif value columns | White | Home or Classes |
| "Meet our *trainers*": 3 square portraits, caps-serif name, specialty | White | `/instructors` (Nora, Lamia) |
| "Find the *right class* for you" and "Let's get *started*": two-column heading and form | Sand | Contact / first-timer enquiry |
| "Momentum Gym" footer: full-bleed photo, big italic name, Phone / Email / Address | Photo | Site footer, or the top of `/contact` |

**Recurring design language** to carry across every page:
- Big serif headings with **one word in italic**, often in ember.
- Caps serif sub-labels.
- Light Century Gothic body text.
- Rows of three equal photos.
- Outline pill buttons.
- Generous padding; sections are full-bleed colour bands.

**Images in Canva are stock placeholders.** The real ones come from the client's pictures folder.

## 2. What Hills Pilates does that we should copy (subpage structure)

You asked us to use the inner pages, not the homepage, as the structural reference. Here is what each one does:

- **About / Our Story**: one column with a big "About Us" heading and lots of whitespace. Three short paragraphs cover origin, mission and community. Decorative background shapes sit behind the text. No CTA except the nav's "Book A Class".
  → *Forge:* the `/our-story` page, linked from the homepage "OUR STORY" button.
- **Classes**: page title, then a one-line philosophy statement, then a grid of **vertical cards** (image, title, 2–3 bullets). A "View Plans & Pricing" CTA follows each group. Weak spot: no per-class detail pages.
  → *Forge:* keep the card grid on `/classes`, but each card links to a **class subpage** (the brief requires one) that carries the full copy and a "First time? What to bring" panel.
- **Instructors**: a **single-column vertical stack**. Each instructor gets a name heading, a photo, a 2–4 sentence *Introduction* and *Experience* bullets (certifications). This matches the brief's Nora/Lamia template exactly.
  → *Forge:* `/instructors`, alternating photo left/right on desktop. Each profile also gets a "See Nora's classes" link to a filtered schedule.
- **FAQs**: questions grouped under category headings: *Why Pilates*, *Class*, *Bookings*, *Prepare for your class*.
  → *Forge:* the same categories, built as an accessible accordion inside Contact (the brief puts FAQs there).
- **Contact**: heading and subline, an enquiry form (name, phone, email, subject, message), a direct-message fallback and the footer details. No map.
  → *Forge:* contact details and socials first, then an embedded map (the studio is hard to find: "1st floor above CrossFit Digbeth"), then Careers, then FAQs.
- **Career**: hero, "join us" copy, roles, then an application form.
  → *Forge:* a short Careers section in Contact using the brief's blurb, with a `mailto:` "Apply" CTA. A form is overkill for a two-instructor studio.
- **New to Hills**: what to bring (attire, grip socks, water, towel, "positive attitude"), shown with "Book Trial Class" CTAs.
  → *Forge:* folded into each class subpage, per the brief.

**Patterns used site-wide:** a sticky header with a single persistent primary CTA ("Book A Class"), a calm warm palette, generous whitespace, a serif display face over a geometric sans, and a footer with contact, socials and legal links.

## 3. Proposed sitemap & routes

```
/                       Home
/our-story              Our Story (from the "OUR STORY" button)
/classes                Classes overview (cards)
/classes/:slug          pilates | reformer | contrast | restore | reset
/instructors            Nora, Lamia
/schedule               Momence timetable (+ ?instructor=nora filter if the embed supports it)
/contact                Contact · Careers · FAQs (anchor-linked sections)
```

**Homepage section order:** the Canva page 1 order, with the brief's missing items slotted in (marked ➕):
1. Hero: "Welcome to" plus the logo lockup, and **FIRST TIMER** (links to a first-timer guide)
2. "*Movement* made *simple*" intro (covers "what is it")
3. 2×2 features: Instructors / Studio & equipment / Recovery / Infrared (covers "what it offers", the people, and the equipment summary)
4. ➕ **Classes at a glance**: five compact cards linking to `/classes/:slug` (the brief asks for this; it isn't in Canva yet)
5. ➕ **Studio gallery**: a horizontal photo strip of the space and people in class (brief: "gallery" and "pictures of people in classes")
6. "Explore *Forge Movement*": Our Instructors / Curated Classes / **Our Story**
7. Testimonials, then **BOOK TRIAL CLASS**
8. Footer (contact, socials), modelled on the template's photo footer

## 4. Brand system

| Token | Value | Use |
|---|---|---|
| `--brown` | `#402A1D` | Text, header and footer backgrounds |
| `--cream` | `#EFE5DB` | Page background |
| `--ember` | `#E53E0B` | CTAs, accents, links (use sparingly, as in "forge") |

Contrast checks: brown on cream is roughly 11:1 (AAA). Ember on cream is roughly 3.6:1, which passes for large text and buttons only, so body links should stay brown with an ember underline. White on ember is roughly 3.9:1, which is fine for bold button text at 16px or larger.

**Fonts: licensing flag ⚠️**
- **Cooper BT** (headings) and **Century Gothic** (subheadings) are commercial fonts. Neither is on Google Fonts.
  - Option A: the client buys webfont licences (Cooper BT from MyFonts/Bitstream, Century Gothic from Monotype) and we self-host the `.woff2` files.
  - Option B: use free stand-ins. For **Cooper BT**, the Canva headings use the *Light* cut, and the closest free match is **Fraunces** at weight 300 with the `SOFT` axis at 100 (it has true italics, which the "one italic word" headings need). For **Century Gothic**, use **Questrial** or **Didact Gothic**, which have almost the same geometric shapes.
  - I'd build with the free stand-ins behind CSS variables, so swapping in the licensed files later is a one-line change.
- **Arimo** (buttons) is free on Google Fonts. ✅

## 5. Tech approach

- **React 19 + Vite + React Router**: a static SPA that deploys anywhere (Vercel, Netlify, S3). No server is needed, since Momence handles bookings.
- **Content lives in plain `.txt` files, not in JSX** (per your requirement):
  ```
  content/
    site.txt            # name, address, email, socials, phone
    home.txt            # hero copy, intro, equipment summary
    our-story.txt
    classes/
      pilates.txt       # title, tagline, body paragraphs, requirements, what-to-bring
      reformer.txt
      contrast.txt
      restore.txt
      reset.txt
    instructors/
      nora.txt
      lamia.txt
    testimonials.txt
    faqs.txt
    careers.txt
  ```
  Each file uses a tiny, human-editable format, so the studio owner can edit copy without touching code:
  ```
  title: Forge Reformer
  tagline: Small-group Reformer, max five people.
  capacity: 5
  bring: Grip socks (required), water bottle, comfortable fitted clothing
  ---
  A small-group Reformer Pilates class for up to five people…

  Using the Reformer's springs, resistance…
  ```
  The header is `key: value` lines, then a `---` separator, then the body, with paragraphs split on blank lines and `- ` for bullets. These files are loaded at build time via Vite `import.meta.glob('…/*.txt', { query: '?raw' })`, parsed by a roughly 30-line parser, and fully static. There are no runtime fetches and no CMS.
- **Styling**: plain CSS Modules with CSS custom properties. No Tailwind, so it stays close to a hand-built 2010s feel and stays lean.
- **Momence**: paste their schedule plugin snippet into a `<MomenceSchedule />` component, which injects the script on mount. Whether it can **filter by instructor** depends on the plugin options in their dashboard. If it can't, the fallback is a link to the instructor's Momence page.
- **Images**: `/public/images/…`, served responsive and lazy-loaded.

## 6. Gaps: what I need from you

1. ~~**Canva design**~~: covered by the screen recording. Still open: are pages 2–6 meant to be redesigned in Canva, or should I design the subpages myself in page 1's style?
2. **Photos**: the "FORGE MOVEMENT WEBSITE PICTURES" folder, dropped into the repo (or a shareable link).
3. **Logo**: SVG preferred.
4. **Copy still missing from the brief:**
   - Phone number (blank in the brief)
   - Nora and Lamia: intro paragraph and experience bullets
   - Our Story text
   - Homepage intro ("what is it / what it offers / who's behind it")
   - Equipment summary (how many Reformers? Is the infrared studio for Reset only?)
   - Testimonials (or permission to pull Google reviews)
   - FAQs (blank in the brief; I can draft a set adapted from Hills' categories)
   - "What to bring" for Pilates, Restore and Reset (the brief only covers Reformer and Contrast)
   - Class durations
5. **Momence**: the schedule plugin embed code from *Studio Setup → Add to Website*.
6. **Fonts**: licensed files, or approval to use free stand-ins.
7. **Hosting / domain**: do you have a preference?
