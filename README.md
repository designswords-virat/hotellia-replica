# Hotellia replica

Two files, two purposes.

## `exact.html` — pixel-perfect replica (3 MB)

The original Framer site captured via SingleFile. Everything (CSS, fonts, images, JS)
is inlined as base64 — it works fully offline and renders exactly like the live site.

**Use this as your visual reference** when redesigning. Open it in a browser:
`replica/exact.html`

You generally won't edit this file — it's the ground truth.

## `index.html` + `styles.css` + `script.js` — clean editable starting point (~36 KB)

A hand-rebuilt version of the same page with:

- Semantic HTML, no minified class names
- Design tokens at the top of `styles.css` (colors, type, spacing)
- Images pulled directly from Framer's CDN
- Plain JS for interactions (menu, FAQ, ticker, reviews, scroll reveal)

**Use this as the starting point for your redesign.** Change tokens, swap content,
restructure freely.

## Workflow for redesign

1. Open `exact.html` in one tab → that's the look-and-feel target
2. Open `index.html` in another → that's where you edit
3. Edit `styles.css` to evolve the design system
4. Edit `index.html` to change content/sections

If a section in `index.html` looks visibly off compared to `exact.html`, point at
it and I'll match the original's spacing / sizing for that section.
