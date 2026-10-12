import type { StaticImageData } from "next/image"
import slide1 from "@/public/Image/hero.jpg"
import slide2 from "@/public/Image/slide1.jpg"
import slide3 from "@/public/Image/slide3.jpg"

export type HeroButton = {
  label: string
  href: string
  variant: "primary" | "secondary"
}

export type HeroSlide = {
  id: string
  image: StaticImageData
  alt: string
  position: string // which part of the photo stays visible when cropped
  heading: string
  description: string
  buttons: HeroButton[]
}

export const heroSlides: HeroSlide[] = [
  {
    id: "mission",
    image: slide1,
    alt: "Children in a classroom giving thumbs up",
    position: "center 35%",
    heading: "Together, We Can Make a Difference.",
    description:
      "At Mary Maud Charity, we believe in the power of compassion, community, and collective action to create positive change.",
    buttons: [
      { label: "Donate Now", href: "/donate", variant: "primary" },
      { label: "Discover Our Story", href: "/about", variant: "secondary" },
    ],
  },
  {
    id: "impact",
    image: slide2,
    alt: "Children holding up cards outside a building after an outreach",
    position: "center 40%",
    heading: "Every Act of Kindness Matters.",
    description:
      "Through compassion and community support, we work towards making a meaningful difference in the lives of those who need it.",
    buttons: [
      { label: "Support Our Mission", href: "/donate", variant: "primary" },
      { label: "See Our Work", href: "/programs", variant: "secondary" },
    ],
  },
  {
    id: "involved",
    image: slide3,
    alt: "Founder talking with children during an outreach",
    position: "60% 40%",
    heading: "Be Part of Something Meaningful.",
    description:
      "Join us in supporting our mission and helping us continue bringing care, hope, and support to communities.",
    buttons: [
      { label: "Get Involved", href: "/contact", variant: "primary" },
      { label: "Donate Now", href: "/donate", variant: "secondary" },
    ],
  },
]