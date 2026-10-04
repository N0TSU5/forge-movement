FORGE MOVEMENT: WEBSITE CONTENT
===============================
Every word on the website comes from the .txt files in this folder.
Edit a file, save it, and the site updates. No coding needed.

HOW A FILE IS LAID OUT
----------------------
  title: Forge Reformer          <- "settings" at the top, one per line (name: value)
  image: /images/classes/reformer.jpg
  ---                            <- three dashes: settings end, text begins
  First paragraph of text.

  Second paragraph (leave an empty line between paragraphs).

  ## What to bring               <- a line starting with ## starts a new section
  - Grip socks                   <- lines starting with "- " become bullet points
  - Water bottle

Some files hold a LIST of things (testimonials, FAQs, features...).
Each item is separated by a line with three equals signs:  ===

TEXT STYLING
------------
  *word*     -> italic
  **word**   -> italic, in Forge orange (used in headings, e.g. "**Movement** made *simple*")

IMAGES
------
Images live in /public/images. A setting like
  image: /images/classes/reformer.jpg
means the file public/images/classes/reformer.jpg. If the file isn't
there yet, the site shows a placeholder box instead.

Photos are cropped to fit their frame. To choose which part stays visible, add
  focus: 50% 80%
(left-right %, top-bottom %). 50% 0% keeps the top, 50% 100% keeps the bottom.

Lines starting with # in the settings area are notes and are ignored.
Anything in [square brackets] is placeholder text waiting for real copy.

BULLETS WITH PARTS
------------------
Some bullet lists hold several parts separated by " | ", for example
  - Grip socks | Required for Reformer and Contrast classes.
The first part is the title and the rest is the description (and, for
"Choose your format" on the First Timer page, a link at the end).
