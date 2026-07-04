import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type ProjectGalleryProps = {
  name: string
  category: string
  images: string[]
  onClose: () => void
}

/**
 * Full-screen gallery for a single project: a masonry of every image at its
 * natural aspect ratio (no cropping), with click-to-zoom + keyboard nav.
 */
export default function ProjectGallery({
  name,
  category,
  images,
  onClose,
}: ProjectGalleryProps) {
  const [zoom, setZoom] = useState<number | null>(null)

  const showPrev = useCallback(
    () => setZoom((z) => (z === null ? z : (z - 1 + images.length) % images.length)),
    [images.length],
  )
  const showNext = useCallback(
    () => setZoom((z) => (z === null ? z : (z + 1) % images.length)),
    [images.length],
  )

  // Lock body scroll while open; restore on unmount.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Keyboard: ESC closes zoom (or the whole gallery); arrows navigate zoom.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoom !== null) setZoom(null)
        else onClose()
      } else if (zoom !== null && e.key === 'ArrowLeft') {
        showPrev()
      } else if (zoom !== null && e.key === 'ArrowRight') {
        showNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoom, onClose, showPrev, showNext])

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto bg-ink/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-ink/80 px-5 py-4 backdrop-blur sm:px-8">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-mist/50">
            {category}
          </span>
          <h3 className="font-medium uppercase text-mist sm:text-lg">
            {name}{' '}
            <span className="text-mist/40">({images.length})</span>
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-mist/20 text-mist transition-colors hover:bg-mist/10"
        >
          <X size={20} />
        </button>
      </div>

      {/* Masonry — images keep their natural aspect ratio (no crop) */}
      <div
        className="columns-1 gap-4 px-5 py-6 sm:columns-2 sm:px-8 lg:columns-3"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setZoom(i)}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-mist/10 transition-transform duration-200 hover:scale-[1.01]"
          >
            <img
              src={src}
              alt={`${name} ${i + 1}`}
              loading="lazy"
              className="block h-auto w-full"
            />
          </button>
        ))}
      </div>

      {/* Zoom overlay */}
      <AnimatePresence>
        {zoom !== null && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation()
              setZoom(null)
            }}
          >
            <button
              type="button"
              aria-label="Close image"
              onClick={(e) => {
                e.stopPropagation()
                setZoom(null)
              }}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <X size={22} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation()
                    showPrev()
                  }}
                  className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:left-6"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation()
                    showNext()
                  }}
                  className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-6"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <img
              src={images[zoom]}
              alt={`${name} ${zoom + 1}`}
              className="max-h-[90vh] max-w-[92vw] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/60">
              {zoom + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
