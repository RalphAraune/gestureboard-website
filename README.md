# GestureBoard Website

The landing page for **GestureBoard**, a gesture-controlled desktop application for presentation control using computer vision.
It's a capstone project by Ralph Lawrence Araune, Kher Noel Sato, and Princess Claire Balili (BSIT, Cristal e-College, 2026).

The site is plain HTML, CSS, and JavaScript. It has no framework, no build step, and no dependencies.

```
index.html        the whole page
css/style.css     styles (theme colors at the top in :root)
js/main.js        download settings + menu, mobile popup, animations
assets/           logo, favicons, Open Graph image
robots.txt        for search engines
sitemap.xml       for search engines
vercel.json       caching + clean URLs on Vercel
```

---

## Test it locally

Pick **one** of these from inside the project folder, then open the address it prints:

```bash
# Python (already installed on most PCs)
python -m http.server 8000
# then open http://localhost:8000

# or Node.js
npx serve .
# then open http://localhost:3000
```

You can also double-click `index.html`. Using a local server is better because it behaves like Vercel.

**Test the phone/tablet behavior:** in Chrome, press `F12`, then `Ctrl+Shift+M` (device toolbar), choose a phone like "iPhone 12", **reload**, and click *Download*. You should see the "Open this page on your Windows PC" popup with a **Copy link** button instead of a download.

---

## Deploy on Vercel

### Option A: through GitHub (recommended)
1. Push this folder to a GitHub repository.
2. Go to <https://vercel.com/new> and import the repository.
3. Settings:
   - **Framework Preset:** `Other`
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (root)
4. Click **Deploy**. Every future `git push` redeploys automatically.

### Option B: from your PC with the Vercel CLI
```bash
npx vercel          # first time: log in and answer the questions (defaults are fine)
npx vercel --prod   # publish to production
```

---

## Things to change

### 1. Download settings (new version, new link, new size)
At the **very top of `js/main.js`**:

```js
const DOWNLOAD_CONFIG = {
  link: "https://github.com/RalphAraune/Gestureboard/releases/latest/download/GestureBoard_Setup_1.0.0.exe",
  version: "1.0.0",
  size: "137 MB",
};
```

All Download buttons and the "Version · Size" labels update from this object.

> **Important:** the link only works if a file named exactly `GestureBoard_Setup_1.0.0.exe` is uploaded as an asset of the **latest** GitHub release.
> When you release a new version, upload the new .exe and update `link` + `version` + `size` here.

`index.html` also contains the same link in each button's `href`. That copy is only a fallback for visitors who have JavaScript turned off. Search for `GestureBoard_Setup_` to update it too.

### 2. Site domain (SEO)
The live site is **https://gestureboardv1.vercel.app**. If the domain ever changes, update it in:
- `index.html`: `canonical`, `og:url`, `og:image`, `twitter:image`
- `robots.txt`
- `sitemap.xml`

Tip: search the whole project for `gestureboardv1.vercel.app`.

To get indexed faster, submit `https://gestureboardv1.vercel.app/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

### 3. Gesture guide
In `index.html`, find `EDIT GESTURES HERE`. Each gesture is one `<li class="gesture">` block with an emoji, a name, and what it does.
**The current gestures are placeholders. Update them to match the real app.**
Keep in mind that hand gestures are only for **slide control** and the **virtual mouse**. Digital annotation and the virtual whiteboard use the regular mouse.

### 4. Feedback link
In `index.html`, find `FEEDBACK LINK` and replace `href="#"` with your Google Form (or other) URL.

### 5. App screenshot
The hero shows a drawn mock of the app window as a placeholder. To use a real screenshot:
1. Save it as `assets/screenshots/main.png` (around 1280×800 works well).
2. In `index.html`, find `APP SCREENSHOT` and follow the instructions in the comment.

### 6. Team photos
The team section uses `assets/team/ralph.jpg`, `kher.jpg`, and `princess.jpg` (256×256, cropped to head and shoulders).
To change a photo, replace the file in `assets/team/` with a square JPG of the same name. Around 256×256 keeps the page fast.

### 7. System requirements
These are in the `#requirements` section of `index.html`. The storage size (~500 MB) and processor are estimates, so please confirm them.

### 8. Colors
Theme colors are CSS variables at the top of `css/style.css` (`--bg`, `--accent`, etc.).

---

## Preview images
- `assets/og-image.png` (1200×630) is the image shown when the link is shared on Facebook/Messenger.
  To check it after deploying, use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and click "Scrape Again" after any change.
- `assets/favicon-32.png`, `assets/apple-touch-icon.png`, and `assets/logo/app_icon.ico` are the browser tab and home-screen icons.
