# Deploying & the auto-updating gallery

## How the auto-update works

Project images are pulled from **Cloudinary** in the browser every time the page
loads. So once this is live:

- **Add / remove work → tag it in Cloudinary → it shows on the site.** No
  redeploy needed.
- You only redeploy when you change **code or text** (name, services, copy…).

---

## Part 1 — Cloudinary (one-time, ~15 min)

1. Create a free account at <https://cloudinary.com>.
2. On the dashboard, copy your **Cloud name**.
3. Put it in `.env`:  `VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name`
4. Enable public listing: **Settings → Security → Restricted media types →
   make sure "Resource list" is NOT restricted** (allow unsigned listing).
5. Upload your work in the **Media Library** and give each image a **tag**:
   - `graphic-design`  → Graphic Design Portfolio
   - `chopnow`         → ChopNow Brand & Packaging
   - `ai-brand`        → AI Brand Images
   (Tags map to projects in `src/data/projects.ts`.)

Until step 3 is done, the site shows the built-in fallback images.

---

## Part 2 — Deploy (pick one)

### Option A — Instant drag-and-drop (fastest)
1. Run `npm run build` (creates the `dist/` folder).
2. Go to <https://app.netlify.com/drop> and drag the `dist` folder in.
3. You get a live URL immediately.
   (Re-drag a fresh `dist` whenever you change code/text.)

### Option B — Connected to Git (auto-deploys on push)
1. Push this folder to a GitHub repo.
2. In Netlify: **Add new site → Import from Git → pick the repo.**
3. Build settings are read from `netlify.toml` automatically.
4. Add an env var in Netlify: **VITE_CLOUDINARY_CLOUD_NAME = your-cloud-name**.
5. Every `git push` redeploys.

Vercel works the same way (it auto-detects Vite); just add the same env var.
