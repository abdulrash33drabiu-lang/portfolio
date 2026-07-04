import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { projects, type Project } from '../data/projects'
import { listByTag, cldUrl } from '../lib/cloudinary'
import LiveProjectButton from '../components/LiveProjectButton'
import ProjectGallery from '../components/ProjectGallery'

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'
const RADIUS_TOP = 'rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]'
const PREVIEW_COUNT = 3

/**
 * Resolve ALL of a project's images. Pulls every tagged image from Cloudinary
 * when available, otherwise keeps the static fallback so the card is never
 * empty.
 */
function useProjectImages(project: Project): string[] {
  const [images, setImages] = useState<string[]>(project.images)

  useEffect(() => {
    let active = true
    listByTag(project.tag).then((imgs) => {
      if (!active || imgs.length === 0) return
      setImages(imgs.map((img) => cldUrl(img, 1400)))
    })
    return () => {
      active = false
    }
  }, [project.tag])

  return images
}

type CardProps = {
  project: Project
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  onOpenGallery: (project: Project, images: string[]) => void
}

function Card({ project, index, total, progress, onOpenGallery }: CardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  const images = useProjectImages(project)
  const preview = images.slice(0, PREVIEW_COUNT)
  const remaining = images.length - preview.length

  return (
    <div className="sticky top-24 md:top-28 flex min-h-[85vh] items-start justify-center py-4">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className={`relative w-full max-w-6xl border-2 border-mist bg-ink p-4 sm:p-6 md:p-8 ${RADIUS}`}
      >
        {/* Top row */}
        <div className="mb-5 flex items-center justify-between gap-4 md:mb-7">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs sm:text-sm font-light uppercase tracking-widest text-mist/60">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-mist"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <div className="hidden sm:block">
            <LiveProjectButton onClick={() => onOpenGallery(project, images)} />
          </div>
        </div>

        {/* Preview — natural aspect ratio, no cropping */}
        <div className="columns-2 gap-3 sm:gap-4 md:columns-3">
          {preview.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onOpenGallery(project, images)}
              className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-mist/10 transition-transform duration-200 hover:scale-[1.01] sm:mb-4"
            >
              <img
                src={src}
                alt={`${project.name} preview ${i + 1}`}
                loading="lazy"
                className="block h-auto w-full"
              />
            </button>
          ))}
        </div>

        {/* View more */}
        {remaining > 0 && (
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={() => onOpenGallery(project, images)}
              className="rounded-full border-2 border-mist px-8 py-3 text-sm font-medium uppercase tracking-widest text-mist transition-colors duration-200 hover:bg-mist/10 sm:text-base"
            >
              View More ({remaining} more)
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const [gallery, setGallery] = useState<{
    project: Project
    images: string[]
  } | null>(null)

  return (
    <section
      id="projects"
      className={`relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-ink px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32 ${RADIUS_TOP}`}
    >
      <h2
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </h2>

      <div ref={containerRef}>
        {projects.map((project, index) => (
          <Card
            key={project.number}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
            onOpenGallery={(p, images) => setGallery({ project: p, images })}
          />
        ))}
      </div>

      <AnimatePresence>
        {gallery && (
          <ProjectGallery
            name={gallery.project.name}
            category={gallery.project.category}
            images={gallery.images}
            onClose={() => setGallery(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
