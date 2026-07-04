/**
 * Lightweight, key-less Cloudinary access.
 *
 * We use Cloudinary's public "client-side asset list" endpoint:
 *   https://res.cloudinary.com/<cloud>/image/list/<tag>.json
 * Every image uploaded with a given tag is returned here, so adding a tagged
 * image to your Cloudinary media library automatically makes it appear on the
 * site — no API key, no redeploy.
 *
 * Requirements on the Cloudinary side:
 *  1. Set VITE_CLOUDINARY_CLOUD_NAME in .env to your cloud name.
 *  2. Settings → Security → allow "Resource list" (enable unsigned listing).
 *  3. Tag your uploads (e.g. "graphic-design", "chopnow", "ai-brand").
 */

const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined

export type CloudImage = {
  publicId: string
  format: string
  version: number
}

export const cloudinaryConfigured = Boolean(CLOUD)

/** Fetch every image carrying `tag`, newest first. Returns [] on any failure. */
export async function listByTag(tag: string): Promise<CloudImage[]> {
  if (!CLOUD) return []
  try {
    const res = await fetch(
      `https://res.cloudinary.com/${CLOUD}/image/list/${tag}.json`,
    )
    if (!res.ok) return []
    const data = (await res.json()) as {
      resources?: Array<{ public_id: string; format: string; version: number }>
    }
    return (data.resources ?? []).map((r) => ({
      publicId: r.public_id,
      format: r.format,
      version: r.version,
    }))
  } catch {
    return []
  }
}

/** Build a delivery URL with auto format/quality and an optional width. */
export function cldUrl(img: CloudImage, width = 1280): string {
  const transforms = `f_auto,q_auto,c_fill,w_${width}`
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/v${img.version}/${img.publicId}.${img.format}`
}
