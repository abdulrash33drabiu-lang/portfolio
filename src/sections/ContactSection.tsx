import { Mail, Phone, Linkedin, Instagram, Download } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'

const CV_URL =
  'https://drive.google.com/uc?export=download&id=1zAaEYAF5zNsh1Gn5pU87-8gpN_GaDSow'

type Link = {
  icon: typeof Mail
  label: string
  value: string
  href: string
  download?: boolean
}

const LINKS: Link[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'abdulrash333d@gmail.com',
    href: 'mailto:abdulrash333d@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: '+234 818 057 4814',
    href: 'tel:+2348180574814',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'abdulrasheed-rabiu',
    href: 'https://www.linkedin.com/in/abdulrasheed-rabiu-839839246',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@printpulsecreativez',
    href: 'https://www.instagram.com/printpulsecreativez',
  },
  {
    icon: Download,
    label: 'Resume / CV',
    value: 'Download My CV',
    href: CV_URL,
    download: true,
  },
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-ink px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 sm:gap-16">
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Let&apos;s talk
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.1}
          className="max-w-[520px] text-center font-light leading-relaxed text-mist"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        >
          Have a project in mind or just want to say hello? Reach out through any
          of the channels below.
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <ContactButton label="Email Me" href="mailto:abdulrash333d@gmail.com" />
        </FadeIn>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {LINKS.map((link, i) => {
            const Icon = link.icon
            return (
              <FadeIn key={link.label} delay={0.1 + i * 0.05} y={20}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  download={link.download}
                  className="flex h-full items-center gap-4 rounded-2xl border border-mist/15 bg-white/[0.03] p-5 transition-colors duration-200 hover:border-mist/40 hover:bg-white/[0.06]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist/10 text-mist">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-mist/50">
                      {link.label}
                    </span>
                    <span className="font-medium text-mist">{link.value}</span>
                  </span>
                </a>
              </FadeIn>
            )
          })}
        </div>

        <p className="pt-6 text-center text-sm font-light text-mist/40">
          © {new Date().getFullYear()} Abdulrasheed Muhammadrabiu · PrintPulse
          Creativez · Lagos, Nigeria
        </p>
      </div>
    </section>
  )
}
