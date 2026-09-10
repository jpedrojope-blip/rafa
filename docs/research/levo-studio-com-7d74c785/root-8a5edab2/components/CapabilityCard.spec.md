# Capability card specification

- Target: `CapabilityCard.tsx`
- Interaction model: scroll-driven sticky card; no tabs or click state.
- Track: `height:300vh`; sticky panel `height:100vh`; top border and deep top shadow.
- Desktop: two columns `1.02fr .98fr`, gap `4vw`, padding `0 6vw`.
- Mobile/tablet: at `860px`, one column; SVG ordered after copy, max-height 38–40vh.
- Text: title size `clamp(1.8rem,3.4vw,3rem)`, weight 500; body size `clamp(1.05rem,1.6vw,1.6rem)`, line-height 1.45.
- SVGs: source inline diagrams, amber `#FFB100`, muted gray strokes, monospace labels. Paths animate through stroke dash offset based on scroll progress.
- Variants: Software & Platforms, High-performing websites, Managed hosting, privacy-first, Four nodes. One jurisdiction.
