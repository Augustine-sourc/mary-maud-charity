import type { StaticImageData } from "next/image"
import missions from "@/public/Image/helping.jpg"
import people from "@/public/Image/peopleReached.jpg"
import communities from "@/public/Image/community.jpg"
import items from "@/public/Image/items.jpg"

export type ImpactStat = {
  id: string
  icon: "pin" | "users" | "home" | "box"
  title: string
  value: number
  suffix?: string
  description: string
  image: StaticImageData
  alt: string
}

// PLACEHOLDER NUMBERS: replace every value below with the charity's verified figures.
export const impactStats: ImpactStat[] = [
  {
    id: "missions",
    icon: "pin",
    title: "Missions completed",
    value: 15,
    suffix: "+",
    description: "Reaching communities through outreach activities.",
    image: missions,
    alt: "Founder in a Mary Maud Charity vest at an outreach with supplies and children behind her",
  },
  {
    id: "people",
    icon: "users",
    title: "People reached",
    value: 700,
    suffix: "+",
    description: "Children, families, and individuals supported.",
    image: people,
    alt: "Children in a classroom giving thumbs up",
  },
  {
    id: "communities",
    icon: "home",
    title: "Communities supported",
    value: 10,
    suffix: "+",
    description: "Building stronger, healthier communities.",
    image: communities,
    alt: "Children holding up cards outside a building after an outreach",
  },
  {
    id: "items",
    icon: "box",
    title: "Items donated",
    value: 3000,
    suffix: "+",
    description: "Food, clothing, and essential supplies distributed.",
    image: items,
    alt: "Founder handing a pack of drinks to an elderly man at a distribution",
  },
]