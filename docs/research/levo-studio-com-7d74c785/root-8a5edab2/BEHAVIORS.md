# Behavior bible

- Hero enters with opacity/translate/blur animation. While scrolling through first viewport, `.hero-in` fades from 1 to 0 and translates up by `12%` of scroll distance.
- Philosophy and capability sections are scroll-driven, not click-driven. Each section has a sticky viewport panel and a tall scroll track.
- Scroll progress is normalized from section top to `section height - viewport height`.
- Crawl text starts dark/blurred (`rgb(78,78,74)`, 8px blur, opacity .22) and resolves to white; bold source words resolve to amber `rgb(255,177,0)`.
- SVG paths initialize with `strokeDasharray`/`strokeDashoffset` equal to path length and reveal in scroll order.
- Philosophy progress line width follows section progress.
- Hero “See what we build” uses an in-page anchor. External build links open in new tabs; mail link uses `mailto:`.
- Hover: amber button brightens to `#ffc740` and lifts 1px; text links change to white.
- Responsive: at `860px` capability cards stack text over SVG. At `640px`, hero title wraps inline, actions wrap, capability header becomes column, and SVGs shrink.
- Reduced motion disables entrance/cursor/arrow animations and reveals crawl/SVG content immediately.
