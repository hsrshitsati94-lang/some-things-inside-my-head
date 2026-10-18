# Some things inside my head

A personal poetry collection by Harshit Sati. Built with plain HTML, CSS, JavaScript, and locally bundled GSAP/ScrollTrigger. No package installation or build step is required.

[Visit the collection](https://hsrshitsati94-lang.github.io/some-things-inside-my-head/) · [GitHub repository](https://github.com/hsrshitsati94-lang/some-things-inside-my-head)

## Publishing

GitHub Pages serves the root of the `main` branch. The `.nojekyll` marker keeps the HTML, CSS, JavaScript, SVGs, fonts, and images as a direct static site. Push changes to `main` to publish an update. No API keys, package installation, or custom domain purchase are needed.

## Open the website

Double-click `index.html`, or serve this folder with a local static web server. For example, with Python installed:

```powershell
python -m http.server 8767 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8767`. A local web server is recommended for the most predictable clipboard and saved-poem behavior.

## Included

- Nine original poems, transcribed from the author's messages without wording corrections.
- Mood filters, full-text search, a random poem, and saved poems stored in this browser.
- A keyboard-accessible native dialog reader, paper/night reading backgrounds, previous/next poems, and copy.
- Direct poem links using `#poem-koshish`, `#poem-fursat`, `#poem-aadha-adhura`, `#poem-dastaan`, `#poem-phir-se`, `#poem-shab-e-chahat`, `#poem-radha-kanha`, `#poem-musafir`, and `#poem-ek-khwais`.
- Responsive phone/laptop layouts, a motion toggle, and respect for the device's reduced motion preference.
- Nine individual illustrated reading backgrounds, each with an original SVG setting and GSAP motion graphics. Scenery stays anchored while long poems scroll.
- A pause/resume control inside the poem reader. Scene motion follows the main motion switch and the device's reduced motion preference, and stops when the tab is hidden.
- Locally stored fonts, image, and scripts, so ordinary browsing has no external asset dependency.

The display titles and mood labels are editorial navigation labels. The two Kaash poems are retained as separate entries. Uncertain phrases such as “Adam tehfizaat”, “afaq”, and “madine” remain as supplied. Change text and collection order in `poems.js`.

## Visual direction

Midnight teal/ink (`#131c1c`), moonlit cream (`#f1e9dd`), muted rose (`#d7a39b`), warm paper (`#eee5d9`). Cormorant for poetry and titles; Manrope for navigation and supporting text. Motion supports the imagery of a night, a first glance, a growing flower, and scattered thoughts settling into words. Poems remain immediately readable in the reader.

See `THIRD_PARTY.md` for component, font, and animation notices. No paid Animaster files are included. Hosting uses the free GitHub Pages address above.

## Individual poem settings

| Poem | Background and motion |
| --- | --- |
| Koshish Kaha Se Karu | Rose garden, swaying flowers, drifting petals, drawn vine |
| Fursat Se | Moonlit lake, reflection, slow ripples, water flowers |
| Aadha-Adhura Jaana | Empty blue lane, rain, warm windows, puddles |
| Dastaan | Open sky, drifting clouds, flying birds, a floating feather |
| Phir Se Anjana | Arched window into a remembered dusk, a moving curtain, petals |
| Shab-e-Chahat | Moonlit rooftops, soft window light, flowers, passing clouds |
| Radha Aur Kanha | Teal lotus pond, peacock feather, fireflies, ripples |
| Kabhi To Aaega | Desert dunes, a lone traveller, distant star, moving dust |
| Ek Khwais | Open pages, a quill, an ink line drawing, drifting fragments |

All nine scenes are project-native vector illustrations in `poem-scenes.js`, styled by `poem-scenes.css`. No new raster image generation or paid component is used for these reading backgrounds. The poems remain verbatim. Both night and paper reading modes keep a protective surface behind the text. Scene timelines are cleared when a poem closes or changes.

## Generated background

Asset: `assets/moonlit-rooftop.webp` (1659 × 948; optimized from the original PNG).

Created with the built-in image generation tool for this website. Final prompt:

> Use case: stylized-concept. Asset type: immersive full-width background photograph for a personal Hindi/Urdu poetry collection website about longing, moonlit rooftops, waiting, flowers and memory. Create one cinematic landscape image, 1792 by 1024 or a similar wide ratio. Scene: a quiet old North Indian rooftop at blue hour slipping into night, a low weathered parapet at the bottom, a few tiny distant warm windows in hazy old rooftops, graceful dark flowering bougainvillea branches intruding from the right, a small luminous moon in the upper right beyond wispy cloud, muted dusty rose and peach glow at the horizon, deep desaturated midnight teal sky. Fine photographic detail, understated analog film softness, sophisticated romantic literary mood, convincing natural light. Composition: most of upper and middle left is dark uncluttered sky and haze for large readable cream typography to be overlaid later; the rooftop and city sit in lower third, blossoms occupy only rightmost quarter. No people, no readable writing, no logos, no lettering, no UI, no watermark. This is a website background asset, not a website screenshot.
