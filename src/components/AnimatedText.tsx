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
      {/* dimmed placeholder reserves layout space */}
      <span style={{ opacity: 0.2 }}>{char}</span>
      <motion.span style={{ position: 'absolute', left: 0, top: 0, opacity }}>
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
 *
 * ACCESSIBILITY / SEO: the visual effect renders every character twice (a
 * dimmed placeholder plus an animated overlay) and splits each word into
 * per-character spans. Anything that reads the DOM rather than the rendered
 * pixels — Google, LinkedIn/OG link previews, screen readers, copy-paste —
 * would otherwise see doubled, fragmented text ("II''mm AAbbdduullrraasshheeeedd").
 * So the animated tree is marked aria-hidden and a single clean copy of the
 * string is exposed via a visually-hidden span.
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
      {/* The real, machine-readable text. Visually hidden, no layout impact. */}
      <span className="sr-only">{text}</span>

      {/* Decorative animated duplicate — hidden from assistive tech. */}
      <span aria-hidden="true">
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
      </span>
    </p>
  )
}
