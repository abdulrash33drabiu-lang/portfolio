import FadeIn from '../components/FadeIn'

type Service = {
  number: string
  name: string
  description: string
}

const SERVICES: Service[] = [
  {
    number: '01',
    name: 'Brand Identity Design',
    description:
      'Logos, colour systems, typography guides, and full brand kits that make you unforgettable.',
  },
  {
    number: '02',
    name: 'Event & Flyer Design',
    description:
      'High-impact event flyers, posters, and promotional materials that drive attendance.',
  },
  {
    number: '03',
    name: 'Large Format Print',
    description:
      'Banners, flex boards, roll-ups, billboards — designed for outdoor visibility.',
  },
  {
    number: '04',
    name: 'Packaging Design',
    description:
      'Product packaging that stands out on shelf — food, retail, cosmetics, and beyond.',
  },
  {
    number: '05',
    name: 'Political Campaign Design',
    description:
      'Campaign visuals and political branding that convey trust, strength, and vision.',
  },
  {
    number: '06',
    name: 'AI-Assisted Creative',
    description:
      'Accelerate projects with AI-generated concept art, moodboards, and prompt visuals.',
  },
  {
    number: '07',
    name: 'Motion-driven Web Design',
    description:
      'Modern, interactive websites brought to life with scroll-driven animation and micro-interactions — digital experiences that feel as dynamic as they look.',
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
        className="mb-16 sm:mb-20 md:mb-28 text-center font-black uppercase"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)', color: '#0C0C0C' }}
      >
        Services
      </h2>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
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
    </section>
  )
}
