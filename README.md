# Modern Fashion Storefront: Demo Preview

A demo preview of a high-quality, modern Shopify-style fashion website homepage. Built with plain HTML, CSS and JavaScript, with no frameworks or build step.

> This is a front-end design preview, not a working store. Prices, product names and links are sample content.

## Run it

1. Unzip the project.
2. Open `index.html` in any modern browser.

An internet connection is needed because the fonts and demo images load from remote URLs.

## Project structure

```
index.html   Page markup (header, mega menu, all sections, footer)
style.css    All styling, including responsive rules
script.js    All interactions and animations
README.md    This file
```

## Highlights

- **Hero slider:** full-width banner slider with a wipe transition, slow zoom, autoplay, progress bar, arrows and dots.
- **Scroll-driven marquee:** oversized type rows that move in opposite directions as you scroll.
- **Product tabs:** T-shirts and Hoodies switcher with a second image on hover and a quick-add size selector (unavailable sizes are struck through).
- **3D scroll effects:** product cards that rise and tilt into place, and a feature banner that tilts in perspective.
- **Favorites rail:** swipeable product row with arrows and a progress line.
- **Lookbook:** editorial photo layout with reveal wipes and parallax.
- **Live trending list:** ranked best-sellers with animated bars, a product preview on hover, and a glitch-style "live" heading.
- **Fixed ticker:** a slim looping stripe pinned to the bottom of the page.
- **Full-width gallery:** auto-sliding photo panels with counter, progress line, arrows and swipe.
- **Mega menu:** animated desktop menus with link columns, featured products and a promo tile. On smaller screens it becomes a slide-in drawer.
- **Closing call to action:** a bold CTA with floating product shots that react to the mouse.

## Customize

| What | Where |
| --- | --- |
| Product names, prices, images | `index.html`, in the product `.card` blocks |
| Sizes and sold-out sizes | The `.sz` buttons inside each card (`disabled` marks sold out) |
| Trending items and preview images | The `.tr li` rows (`data-img`, `data-name`) |
| Mega menu content | The `.mega` panels inside `<header class="top">` |
| Colors, fonts, spacing | CSS variables at the top of `style.css` (`--ink`, `--c`, `--pad`, etc.) |
| Slider speed | `DUR` in the hero slider section of `script.js` (hero), and the `3600` timeout in the gallery section |

## Responsive and accessible

- Layouts adapt from large desktops down to small phones (key breakpoints at 1280, 1180, 1000 and 700 px).
- The menu switches to a hamburger drawer under 1180 px.
- Touch devices show size options without needing hover.
- Keyboard focus styles are included, and animations switch off for visitors who prefer reduced motion.

## Notes

- Replace all remote demo images with your own optimized assets before any real use.
- To turn this into a live Shopify theme, convert the sections to Liquid and connect real product, collection and cart data.
