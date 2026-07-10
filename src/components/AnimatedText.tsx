import { Fragment, useRef, type CSSProperties } from 'react'
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
 *
 * Characters are grouped per word inside a `nowrap` inline-block so lines only
 * ever break between words — never mid-word.
 */
export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const words = text.split(' ')
  const totalChars = words.reduce((n, w) => n + w.length, 0)
  let index = 0

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const chars = word.split('').map((ch) => {
          const i = index++
          return { ch, range: [i / totalChars, (i + 1) / totalChars] as [number, number] }
        })
        return (
          <Fragment key={wi}>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {chars.map((c, ci) => (
                <Char key={ci} char={c.ch} progress={scrollYProgress} range={c.range} />
              ))}
            </span>
            {wi < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
    </p>
  )
}
