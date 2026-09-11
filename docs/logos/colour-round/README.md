# Oefenschrift logo directions

Open `index.html` directly in a browser, or serve this directory locally:

```sh
python3 -m http.server 8882 --bind 127.0.0.1 --directory docs/logos/colour-round
```

The page contains 17 logo directions drawn as SVG paths. Select a direction to see its wordmark at the current sidebar width and beside the new subject cards. Dark preview and One colour apply to the selected preview and downloaded SVG. The bookmark buttons save a shortlist in this browser. A selected design can be linked through its URL fragment.

The HTML embeds its interface fonts and card illustrations. SVG downloads use outlined lettering and contain no font or raster-image dependencies. Each direction also has an icon. The `svg/` directory contains 68 ready-to-use files: a wordmark and icon for each design in light and dark versions. The page can additionally export monochrome versions with transparent cutouts.

The application's current logo has not been replaced. The gallery keeps it beside the selected option for comparison.

**17 The original, with a full stop** is the latest refinement. It reuses the exact current Nunito outlines, makes the entire O and the i dot solid ink, and adds one yellow full stop. Its favicon uses the original capital O and lowercase e on the rounded yellow tile. The preview opens on this option, shows the icon at 16, 24, 40 and 64px, and uses it as the gallery tab favicon.

Starting points: **01 Full stop** keeps the word clear with a small accent; **06 Folded page** gives the application a recognisable notebook symbol. **13 Card mosaic** uses the new subject grid as its mark. All directions remain available for comparison.

`gallery.css`, `gallery.js` and `page.html` are the editable page sources. `generate.mjs` creates the combined HTML and SVG exports. It reads the six font files already cached in `docs/logos/fonts/` from the earlier logo studies. Those files are only needed to regenerate lettering; opening the delivered page and using its SVGs requires no font installation.

```sh
npm install --prefix tmp/logo-runtime --no-save --package-lock=false opentype.js@2.0.0
node docs/logos/colour-round/generate.mjs
```

Letter outlines use Gabarito, Nunito, Manrope, Outfit, Fraunces and Kalam. The embedded interface font is the project's Fira Sans; its SIL Open Font License is included in the HTML. The symbols were drawn directly as SVG shapes.

Firefox verification covers selecting designs, shortlist persistence, colour modes, SVG downloads, keyboard dismissal, clipboard failure recovery, phone layouts and opening the self-contained HTML from disk. See `verification.json` for the completed checks.
