"use client"

import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  direction?: "up" | "left" | "right"
  delay?: number
  className?: string
}

function Reveal({ children, direction = "up", delay = 0, className }: Props) {
  const reduce = useReducedMotion()
  const offset = {
    up: { x: 0, y: 32 },
    left: { x: -48, y: 0 },
    right: { x: 48, y: 0 },
  }[direction]

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal