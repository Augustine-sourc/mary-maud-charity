import type { StaticImageData } from "next/image"

export type Story = {
  id: string | number
  slug: string
  title: string
  category?: string
  excerpt?: string
  date?: string // ISO format, e.g. "2026-09-15"
  image?: StaticImageData | string // an imported file now, a URL from the backend later
  imageAlt?: string
  imagePosition?: string // which part of the photo stays visible, e.g. "center 40%"
}