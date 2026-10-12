"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { sponsors } from "@/staticComponents/Sponsor"

const base = "transition duration-500 ease-out motion-reduce:transition-none"
const hidden = "opacity-0 translate-y-2 motion-reduce:translate-y-0"
const shown = "opacity-100 translate-y-0"

function SponsorsSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (sponsors.length === 0) return null

  return (
    <section
      ref={ref}
      aria-labelledby="sponsors-heading"
      className="bg-white px-5 py-14 sm:px-6 md:py-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <p
            className={`${base} inline-block rounded-full bg-brand-softpink px-4 py-1.5 text-xs font-bold tracking-widest text-pink-700 uppercase sm:text-sm ${visible ? shown : hidden}`}
          >
            Our community of supporters
          </p>

          <h2
            id="sponsors-heading"
            style={{ transitionDelay: visible ? "60ms" : "0ms" }}
            className={`${base} mt-4 text-3xl leading-tight font-extrabold text-brand-navy sm:text-4xl lg:text-5xl ${visible ? shown : hidden}`}
          >
            Together, we make a difference.
          </h2>

          <p
            style={{ transitionDelay: visible ? "140ms" : "0ms" }}
            className={`${base} mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 md:text-lg md:leading-8 ${visible ? shown : hidden}`}
          >
            We&apos;re grateful to the organisations and partners who support our mission and
            help us create meaningful change in our communities.
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-10 md:mt-14">
          {sponsors.map((sponsor, i) => {
            const logo = (
              <div className="mx-auto h-16 w-full max-w-[200px] sm:h-20">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.alt ?? `${sponsor.name} logo`}
                  sizes="(min-width: 1024px) 200px, 50vw"
                  className="h-full w-full object-contain"
                />
              </div>
            )

            return (
              <li
                key={sponsor.id}
                style={{ transitionDelay: visible ? `${220 + i * 70}ms` : "0ms" }}
                className={`${base} flex basis-[calc(50%_-_1rem)] items-center justify-center sm:basis-[calc(33.333%_-_1.34rem)] lg:basis-[calc(25%_-_1.5rem)] ${visible ? shown : hidden}`}
              >
                {sponsor.href ? (
                  <a
                    href={sponsor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-lg transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
                  >
                    {logo}
                    <span className="sr-only">{sponsor.name} (opens in a new tab)</span>
                  </a>
                ) : (
                  <div className="w-full">{logo}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default SponsorsSection