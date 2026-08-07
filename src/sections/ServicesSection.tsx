import FadeIn from '../components/FadeIn'

type Service = {
  number: string
  name: string
  description: string
}

/**
 * CORE services get the full numbered treatment. These are what the site
 * leads with, what the headline promises, and what you want to be referred
 * for. Keep this list at three — a fourth dilutes the positioning.
 */
const CORE_SERVICES: Service[] = [
  {
    number: '01',
    name: 'Brand Identity Design',
    description:
      'Logos, colour systems, typography guides, and full brand kits — delivered with print, screen and one-colour variants, so the identity holds up everywhere it lands.',
  },
  {
    number: '02',
    name: 'Product & Interface Design',
    description:
      'User flows, wireframes and high-fidelity UI — with the typography and visual systems most product work is missing. Handoffs built in React and Tailwind, so what I give you can actually be built.',
  },
  {
    number: '03',
    name: 'Motion-driven Web Design',
    description:
      'Interactive sites with scroll-driven animation and micro-interactions — digital experiences that feel as considered as they look.',
  },
]

/**
 * SECONDARY services stay visible and sellable, but sit below the fold of
 * attention. Nothing here is turned away — it just isn't what the site argues
 * you are.
 */
const SECONDARY_SERVICES: Service[] = [
  {
    number: '04',
    name: 'Packaging Design',
    description:
      'Product packaging that stands out on shelf — food, retail, cosmetics and beyond. Designed for the 3-second glance, built to the printer’s spec.',
  },
  {
    number: '05',
    name: 'Large Format Print',
    description:
      'Banners, flex boards, roll-ups and billboards — designed for viewing distance and specified for the material.',
  },
  {
    number: '06',
    name: 'Event & Flyer Design',
    description:
      'High-impact event flyers, posters and promotional materials that drive attendance.',
  },
  {
    number: '07',
    name: 'Political Campaign Design',
    description:
      'Campaign visuals and political branding that convey trust, strength and vision.',
  },
  {
    number: '08',
    name: 'AI-Assisted Creative',
    description:
      'Faster concepting, moodboards and exploration — with human craft on everything that ships.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ color: '#0C0C0C' }}
    >
      <h2
        className="mb-6 text-center font-black uppercase"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)', color: '#0C0C0C' }}
      >
        Services
      </h2>

      <p
        className="mx-auto mb-16 sm:mb-20 md:mb-24 max-w-xl text-center font-light leading-relaxed"
        style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1.2rem)', opacity: 0.55 }}
      >
        Three things I do best — and a few more I do often.
        {/* TODO (pricing floor): add a starting price once you've set one, e.g.
            "Projects start from ₦___ / $___." Buyers self-qualify on price;
            with none shown you attract tyre-kickers and lose serious clients. */}
      </p>

      <div className="mx-auto max-w-5xl">
        {CORE_SERVICES.map((service, i) => (
          <FadeIn
            key={service.number}
            delay={i * 0.1}
            className="flex items-start gap-5 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
            style={{ borderTop: '1px solid rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)', color: '#0C0C0C' }}
            >
              {service.number}
            </span>
            <div className="flex flex-col gap-3 pt-1 md:pt-3">
              <h3
                className="font-medium uppercase"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* ---- Secondary tier ---- */}
      <div className="mx-auto mt-20 sm:mt-24 md:mt-28 max-w-5xl">
        <FadeIn>
          <h3
            className="mb-10 text-center font-medium uppercase tracking-[0.2em]"
            style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)', opacity: 0.45 }}
          >
            Also available
          </h3>
        </FadeIn>

        <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
          {SECONDARY_SERVICES.map((service, i) => (
            <FadeIn
              key={service.number}
              delay={i * 0.08}
              className="flex items-start gap-4 py-5"
              style={{ borderTop: '1px solid rgba(12, 12, 12, 0.12)' }}
            >
              <span
                className="font-black leading-none pt-1"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', opacity: 0.3 }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-1.5">
                <h4
                  className="font-medium uppercase"
                  style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)' }}
                >
                  {service.name}
                </h4>
                <p
                  className="font-light leading-relaxed"
                  style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)', opacity: 0.55 }}
                >
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
