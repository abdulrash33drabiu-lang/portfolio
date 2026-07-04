import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects, type Project } from '../data/projects'
import { listByTag, cldUrl } from '../lib/cloudinary'
import LiveProjectButton from '../components/LiveProjectButton'

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'
const RADIUS_TOP = 'rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]'

/**
 * Resolve a project's three card images. Pulls tagged images from Cloudinary
 * when available, otherwise keeps the static fallback so the card is never
 * empty. Any Cloudinary images beyond the first three are ignored here (the
 * card layout has exactly three slots).
 */
function useCardImages(project: Project): [string, string, string] {
  const [images, setImages] = useState<[string, string, string]>(project.images)

  useEffect(() => {
    let active = true
    listByTag(project.tag).then((imgs) => {
      if (!active || imgs.length === 0) return
      const urls = imgs.map((img) => cldUrl(img))
      // pad up to three slots by reusing what we have
      setImages([
        urls[0],
        urls[1] ?? urls[0],
        urls[2] ?? urls[1] ?? urls[0],
      ])
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
}

function Card({ project, index, total, progress }: CardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  const [c1, c2, c3] = useCardImages(project)

  return (
    <div className="sticky top-24 md:top-32 flex h-[85vh] items-center justify-center">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className={`relative w-full max-w-6xl border-2 border-mist bg-ink p-4 sm:p-6 md:p-8 ${RADIUS}`}
      >
        {/* Top row */}
        <div className="mb-4 flex items-center justify-between gap-4 md:mb-6">
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
            <LiveProjectButton />
          </div>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-[40%_60%] gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <img
              src={c1}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className={`w-full object-cover ${RADIUS}`}
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={c2}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className={`w-full object-cover ${RADIUS}`}
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <img
            src={c3}
            alt={`${project.name} preview 3`}
            loading="lazy"
            className={`h-full w-full object-cover ${RADIUS}`}
          />
        </div>
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
          />
        ))}
      </div>
    </section>
  )
}
