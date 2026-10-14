import hero from "@/public/Image/2026 image1.jpg"
import items from "@/public/Image/2026 image2.jpg"
import communities from "@/public/Image/2026 image3.jpg"
import type { Story } from "./types"

// PLACEHOLDER CONTENT: the titles, excerpts and dates below are illustrative samples,
// not real Mary Maud Charity news. Replace them with real stories before launch.
export const stories: Story[] = [
  {
    id: 1,
    slug: "community-outreach",
    category: "Community Outreach",
    title: "Making a Difference Through Community Outreach",
    excerpt:
      "Discover how community outreach initiatives bring people together to support those who need assistance.",
    date: "2026-09-16",
    image: hero,
    imageAlt: "Founder talking with children during an outreach",
    imagePosition: "60% 40%",
  },
  {
    id: 2,
    slug: "acts-of-kindness",
    category: "Our Activities",
    title: "Small Acts of Kindness, Lasting Impact",
    excerpt:
      "Explore the importance of compassion, collaboration, and practical support in creating positive change.",
    date: "2026-09-03",
    image: items,
    imageAlt: "Founder handing a pack of drinks to an elderly man",
    imagePosition: "center 45%",
  },
  {
    id: 3,
    slug: "brighter-future",
    category: "News & Updates",
    title: "Working Together for a Brighter Future",
    excerpt:
      "Learn how collective action and community involvement can help build a more supportive future.",
    date: "2026-04-19",
    image: communities,
    imageAlt: "Children holding up cards outside a building after an outreach",
  },
]