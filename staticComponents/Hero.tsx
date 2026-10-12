"use client"

import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import type { FocusEvent, KeyboardEvent, PointerEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { heroSlides } from "./heroSlides"

const INTERVAL = 6500
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY)
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}
const getReducedMotion = () => window.matchMedia(REDUCED_QUERY).matches
const getServerReducedMotion = () => false

const buttonBase =
  "inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
const buttonVariants = {
  primary: "bg-brand-pink text-white hover:bg-pink-700",
  secondary: "border border-white/80 text-white hover:bg-white/10",
}

const controlButton =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

const rise = (active: boolean) =>
  `transition duration-500 ease-out motion-reduce:transition-none ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 motion-reduce:translate-y-0"
  }`
const delay = (active: boolean, ms: number) => ({
  transitionDelay: active ? `${ms}ms` : "0ms",
})

function Hero() {
  const count = heroSlides.length
  const [current, setCurrent] = useState(0)
  const [seen, setSeen] = useState<number[]>([0])
  const [hovering, setHovering] = useState(false)
  const [keyboardFocus, setKeyboardFocus] = useState(false)

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  )

  const goTo = useCallback((index: number) => {
    setCurrent(index)
    setSeen((s) => (s.includes(index) ? s : [...s, index]))
  }, [])

  const next = () => goTo((current + 1) % count)
  const prev = () => goTo((current - 1 + count) % count)

  const autoRotate = !reducedMotion && !hovering && !keyboardFocus

  useEffect(() => {
    if (!autoRotate) return
    const timer = setTimeout(() => goTo((current + 1) % count), INTERVAL)
    return () => clearTimeout(timer)
  }, [autoRotate, current, count, goTo])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Mary Maud Charity highlights"
      className="relative h-[80svh] max-h-[780px] min-h-[640px] w-full overflow-hidden bg-brand-navy lg:min-h-[620px]"
      onPointerEnter={(e: PointerEvent<HTMLElement>) => {
        if (e.pointerType === "mouse") setHovering(true)
      }}
      onPointerLeave={() => setHovering(false)}
      onFocus={(e: FocusEvent<HTMLElement>) => {
        if (e.target.matches(":focus-visible")) setKeyboardFocus(true)
      }}
      onBlur={() => setKeyboardFocus(false)}
      onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "ArrowRight") next()
        if (e.key === "ArrowLeft") prev()
      }}
    >
      <div aria-live={autoRotate ? "off" : "polite"} className="absolute inset-0">
        {heroSlides.map((slide, i) => {
          const active = i === current
          const showImage = active || i === (current + 1) % count || seen.includes(i)
          const Heading = i === 0 ? "h1" : "h2"

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            >
              {showImage && (
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  quality={85}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: slide.position }}
                />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-brand-navy/90 via-brand-navy/50 to-brand-navy/20 lg:bg-linear-to-r lg:from-brand-navy/90 lg:via-brand-navy/55 lg:to-transparent" />

              <div className="absolute inset-0 flex items-end pt-28 pb-28 lg:items-center lg:pb-16">
                <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
                  <div className="max-w-2xl text-white">
                    <Heading
                      style={delay(active, 150)}
                      className={`${rise(active)} text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl`}
                    >
                      {slide.heading}
                    </Heading>

                    <p
                      style={delay(active, 250)}
                      className={`${rise(active)} mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl`}
                    >
                      {slide.description}
                    </p>

                    <div
                      style={delay(active, 350)}
                      className={`${rise(active)} mt-8 flex flex-col gap-3 sm:flex-row`}
                    >
                      {slide.buttons.map((button) => (
                        <Link
                          key={button.label}
                          href={button.href}
                          className={`${buttonBase} ${buttonVariants[button.variant]}`}
                        >
                          {button.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-5 z-10 px-5 sm:px-6 lg:bottom-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div role="group" aria-label="Choose a slide" className="flex items-center">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current ? "true" : undefined}
                className="flex h-11 items-center px-1.5 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${i === current ? "w-8 bg-brand-pink" : "w-2.5 bg-white/60"
                    }`}
                />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={prev} aria-label="Previous slide" className={controlButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button type="button" onClick={next} aria-label="Next slide" className={controlButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero