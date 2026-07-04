import { useRef, type CSSProperties } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

type AnimatedTextProps = {
  text: string
  className?: string
  style?: CSSProperties
}

type CharProps = {
  char: string
  progress: MotionValue<number>
  range: [number, number]
}

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'pre' }}>
      {/* invisible placeholder to reserve layout space */}
      <span style={{ opacity: 0.2 }}>{char}</span>
      <motion.span
        style={{ position: 'absolute', left: 0, top: 0, opacity }}
        aria-hidden
      >
        {char}
      </motion.span>
    </span>
  )
}

/**
 * Character-by-character scroll-reveal text. Each character fades from
 * opacity 0.2 -> 1 based on its position relative to scroll progress.
 */
export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => {
        const start = i / chars.length
        const end = start + 1 / chars.length
        return (
          <Char key={i} char={char} progress={scrollYProgress} range={[start, end]} />
        )
      })}
    </p>
  )
}
