"use client"

import { useEffect, useState } from "react"

const formatter = new Intl.NumberFormat("en-US")

type Props = {
  end: number
  suffix?: string
  run: boolean
  duration?: number
}

function CountUp({ end, suffix = "", run, duration = 1400 }: Props) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!run) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end)
      return
    }

    let frame = 0
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [run, end, duration])

  return (
    <>
      <span aria-hidden="true">
        {formatter.format(value)}
        {suffix}
      </span>
      <span className="sr-only">
        {formatter.format(end)}
        {suffix}
      </span>
    </>
  )
}

export default CountUp