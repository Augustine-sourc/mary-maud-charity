"use client"

import Image from "next/image"
import Link from "next/link"
import { useInViewOnce } from "./useInViewOnce"
import type { Story } from "./types"

type Props = {
  stories: Story[]
  basePath?: string
  viewAllHref?: string
  linkable?: boolean
}

const base = "transition duration-500 ease-out motion-reduce:transition-none"
const hidden = "opacity-0 translate-y-4 motion-reduce:translate-y-0"
const shown = "opacity-100 translate-y-0"

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

function formatDate(date?: string) {
  if (!date) return null
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? null : dateFormatter.format(parsed)
}

function LatestStories({
  stories,
  basePath = "/stories",
  viewAllHref = "/stories",
  linkable = true,
}: Props) {
  const { ref, visible } = useInViewOnce<HTMLElement>(0.15)

  if (stories.length === 0) return null

  return (
    <section
      ref={ref}
      aria-labelledby="stories-heading"
      className="bg-gray-50 px-5 py-16 sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p
              className={`${base} text-sm font-bold tracking-widest text-brand-pink uppercase ${visible ? shown : hidden}`}
            >
              Our latest stories
            </p>

            <h2
              id="stories-heading"
              style={{ transitionDelay: visible ? "60ms" : "0ms" }}
              className={`${base} mt-3 text-3xl leading-tight font-extrabold text-brand-navy sm:text-4xl lg:text-5xl ${visible ? shown : hidden}`}
            >
              Stories of Hope, Moments of Change.
            </h2>

            <p
              style={{ transitionDelay: visible ? "120ms" : "0ms" }}
              className={`${base} mt-4 text-base leading-7 text-gray-500 md:text-lg md:leading-8 ${visible ? shown : hidden}`}
            >
              Discover the activities, people, and moments that bring the Mary Maud Charity
              mission to life.
            </p>
          </div>

          {linkable && (
            <div
              style={{ transitionDelay: visible ? "180ms" : "0ms" }}
              className={`${base} ${visible ? shown : hidden}`}
            >
              <Link
                href={viewAllHref}
                className="inline-flex items-center gap-2 rounded-full border border-brand-navy/20 px-6 py-3 font-semibold text-brand-navy transition-colors duration-200 hover:border-brand-pink hover:text-brand-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
              >
                View All Stories <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {stories.map((story, i) => {
            const date = formatDate(story.date)

            return (
              <li
                key={story.id}
                style={{ transitionDelay: visible ? `${200 + i * 80}ms` : "0ms" }}
                className={`${base} ${visible ? shown : hidden}`}
              >
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 ${
                    linkable
                      ? "hover:-translate-y-1 hover:shadow-lg has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand-pink"
                      : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-softpink">
                    {story.image && (
                      <Image
                        src={story.image}
                        alt={story.imageAlt ?? ""}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className={`object-cover transition-transform duration-300 ${
                          linkable ? "group-hover:scale-105" : ""
                        }`}
                        style={story.imagePosition ? { objectPosition: story.imagePosition } : undefined}
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    {(story.category || date) && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        {story.category && (
                          <span className="font-semibold text-brand-pink">{story.category}</span>
                        )}
                        {date && (
                          <time dateTime={story.date} className="text-gray-500">
                            {date}
                          </time>
                        )}
                      </div>
                    )}

                    <h3
                      className={`mt-3 line-clamp-2 text-xl leading-snug font-bold text-[#20213A] transition-colors duration-300 ${
                        linkable ? "group-hover:text-brand-pink" : ""
                      }`}
                    >
                      {story.title}
                    </h3>

                    {story.excerpt && (
                      <p className="mt-3 line-clamp-3 text-base leading-7 text-gray-500">
                        {story.excerpt}
                      </p>
                    )}

                    {linkable && (
                      <div className="mt-auto pt-6">
                        <Link
                          href={`${basePath}/${story.slug}`}
                          className="inline-flex items-center gap-1.5 font-semibold text-brand-pink after:absolute after:inset-0 focus-visible:outline-none"
                        >
                          Read Story
                          <span className="sr-only">: {story.title}</span>
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default LatestStories