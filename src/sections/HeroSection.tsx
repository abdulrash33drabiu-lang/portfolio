import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import ContactButton from '../components/ContactButton'

const NAV_LINKS = ['About', 'Services', 'Projects', 'Contact']

// Your Cloudinary head portrait (transparent PNG). Template image is a fallback.
const PORTRAIT_URL =
  'https://res.cloudinary.com/fnbqnrwk/image/upload/f_auto,q_auto,w_800/v1783676533/Portrait_-_Head_pedfrq.png'
const PORTRAIT_FALLBACK =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'

export default function HeroSection() {
  return (
    <section
      className="relative flex h-screen flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-sm font-medium uppercase tracking-wider text-mist transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
          >
            {link}
          </a>
        ))}
      </FadeIn>

      {/* Big heading — SVG text scales to fill the width, one straight line */}
      <div className="flex flex-1 items-center px-6 md:px-10">
        <FadeIn as="h1" delay={0.15} y={40} className="w-full">
          <svg
            viewBox="0 0 100 12"
            preserveAspectRatio="xMidYMid meet"
            className="block w-full"
            role="img"
            aria-label="Hi, I'm Abdulrasheed"
          >
            <defs>
              <linearGradient id="heroName" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#646973" />
                <stop offset="100%" stopColor="#bbccd7" />
              </linearGradient>
            </defs>
            <text
              x="50"
              y="9.4"
              textAnchor="middle"
              textLength="100"
              lengthAdjust="spacingAndGlyphs"
              fontFamily="'Kanit', sans-serif"
              fontWeight={900}
              fontSize="9.6"
              fill="url(#heroName)"
            >
              HI, I&apos;M ABDULRASHEED
            </text>
          </svg>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-mist sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          Hi, I&apos;m Abdulrasheed, a graphic designer &amp; creative director crafting bold, print-ready visuals that stop the scroll
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Portrait — centering transforms live on this wrapper so they don't
          clash with the inline transform Framer Motion writes on FadeIn. */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:translate-y-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30} className="w-full">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={PORTRAIT_URL}
              alt="Abdulrasheed Muhammadrabiu"
              className="w-full select-none"
              draggable={false}
              onError={(e) => {
                const img = e.currentTarget
                if (img.src !== PORTRAIT_FALLBACK) img.src = PORTRAIT_FALLBACK
              }}
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  )
}
