# Philosophy specification

- Target: `Philosophy.tsx`
- Interaction model: scroll-driven sticky section.
- Track: `height:340vh`; sticky panel `height:100vh`; padding `0 6vw`.
- Eyebrow: Geist Mono, 11px, uppercase, letter-spacing `.16em`, color `#5A5A57`.
- Text: max-width `min(20ch,92vw)`, size `clamp(2rem,4.6vw,4.4rem)`, weight 500, line-height 1.12.
- Scroll states: words start blur 8px/opacity .22/dark gray and resolve sequentially; bold words resolve amber.
- Progress line: width `min(420px,60vw)`, fill follows normalized section progress.
