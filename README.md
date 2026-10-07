# Registration prototype

A clickable before-and-after prototype of the Teladoc Health registration flow, with a mini case study below it.

- **Before:** the original screens, as screenshots in `before/`. Each one has an invisible hotspot on its main button. Click anywhere else on a screen to see where to tap.
- **After:** the redesign, built live with the [Anvil design system](https://mendowski.github.io/anvil-design-system/). Its components, tokens, fonts and illustrations all load from the Anvil site, so updates to Anvil show up here automatically.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page. Loads Anvil, React and the two files below |
| `prototype.js` | Both flows (hotspot positions for the old screens, Anvil-built new screens) and the mini case study (`STATS`, `DECISIONS` and `CaseStudy`) |
| `prototype.css` | Page layout and the phone frame, using Anvil tokens |
| `before/` | Screenshots of the original screens |
| `after/` | Figma exports of the redesign, for reference only. The live prototype doesn't use them |

## Linking to a screen

Add `#before/3` or `#after/4` to the address to open a specific screen.

## Changing the before flow

Screens are listed in the `BEFORE` array at the top of `prototype.js`. Each `cta` is the main button's box in image pixels: left, top, right, bottom.

## Editing the case study

The case study under the prototype lives in `prototype.js`. Change the numbers in `STATS`, the decisions in `DECISIONS`, and the intro and callout text in `CaseStudy`. Each decision's `screen` is the redesigned screen its "See it in the prototype" link opens.

## Hosting on Vercel

This is a static site with no build step, so Vercel can serve it as is. Keep it behind the same password as the portfolio, because the page shows Teladoc screens and results.
