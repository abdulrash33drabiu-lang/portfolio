import { useEffect, useRef, useState } from 'react'
import { marqueeImages } from '../data/marquee'

const ROW_ONE = marqueeImages.slice(0, 11)
const ROW_TWO = marqueeImages.slice(11)

// Triple each row so the scroll translate never reveals an edge.
const tripled = (arr: string[]) => [...arr, ...arr, ...arr]

function Tile({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className="rounded-2xl object-cover"
      style={{ width: 420, height: 270, flexShrink: 0 }}
    />
  )
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const sectionTop = el.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const shift = offset - 200

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-3 overflow-hidden bg-ink pt-24 sm:pt-32 md:pt-40 pb-10"
    >
      {/* Row 1 — moves right */}
      <div
        className="flex gap-3"
        style={{ transform: `translateX(${shift}px)`, willChange: 'transform' }}
      >
        {tripled(ROW_ONE).map((src, i) => (
          <Tile key={`r1-${i}`} src={src} />
        ))}
      </div>

      {/* Row 2 — moves left */}
      <div
        className="flex gap-3"
        style={{ transform: `translateX(${-shift}px)`, willChange: 'transform' }}
      >
        {tripled(ROW_TWO).map((src, i) => (
          <Tile key={`r2-${i}`} src={src} />
        ))}
      </div>
    </section>
  )
}
