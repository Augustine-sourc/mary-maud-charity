"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import CountUp from "./CountUp"
import { impactStats, type ImpactStat } from "./impactData"

const base = "transition duration-500 ease-out motion-reduce:transition-none"
const hidden = "opacity-0 translate-y-3 motion-reduce:translate-y-0"
const shown = "opacity-100 translate-y-0"

function Icon({ name }: { name: ImpactStat["icon"] }) {
  const shapes = {
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    home: (
      <>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>
    ),
    box: (
      <>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </>
    ),
  }

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes[name]}
    </svg>
  )
}

function ImpactSection() {
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

  return (
    <section
      ref={ref}
      aria-labelledby="impact-heading"
      className="bg-brand-navy px-5 py-16 sm:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="text-left sm:text-center">
          <p
            className={`${base} text-sm font-bold tracking-widest text-pink-400 uppercase ${visible ? shown : hidden}`}
          >
            Our impact in action
          </p>

          <h2
            id="impact-heading"
            className={`${base} mt-3 text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-5xl ${visible ? shown : hidden}`}
          >
            Small acts. <span className="text-pink-400">Lasting impact.</span>
          </h2>

          <p
            style={{ transitionDelay: visible ? "100ms" : "0ms" }}
            className={`${base} mx-auto mt-4 max-w-2xl text-base leading-7 text-[#D8D9E8] md:text-lg md:leading-8 ${visible ? shown : hidden}`}
          >
            Every number represents a life we&apos;ve touched. Together, we&apos;re building
            stronger communities and brighter futures.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <li
              key={stat.id}
              style={{ transitionDelay: visible ? `${150 + i * 70}ms` : "0ms" }}
              className={`${base} ${visible ? shown : hidden}`}
            >
              <article className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={stat.image}
                    alt={stat.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 400px) 50vw, 100vw"
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-softpink text-brand-pink">
                    <Icon name={stat.icon} />
                  </span>

                  <p className="mt-4 text-3xl font-extrabold text-brand-navy tabular-nums lg:text-4xl">
                    <CountUp end={stat.value} suffix={stat.suffix} run={visible} />
                  </p>

                  <h3 className="mt-1 font-semibold text-brand-navy">{stat.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">{stat.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ImpactSection