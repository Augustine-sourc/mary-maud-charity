import Image from "next/image"
import Link from "next/link"
import StoryImg from "@/public/Image/StoryImg.jpg"
import Reveal from "./Reveal"

function OurStory() {
  return (
    <section className="overflow-hidden bg-white px-5 py-14 sm:px-6 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-20">
        {/* LEFT: image */}
        <Reveal
          direction="left"
          className="relative mx-auto h-[360px] w-full max-w-lg sm:h-[460px] lg:mx-0 lg:h-[580px] lg:w-[45%] lg:max-w-none"
        >
          <div className="absolute top-5 -left-3 h-full w-full rounded-3xl bg-brand-softpink md:top-6 md:-left-4" />

          <div className="relative h-full overflow-hidden rounded-[20px]">
            <Image
              src={StoryImg}
              alt="Founder holding a baby at a Mary Maud Charity outreach"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[center_22%]"
            />
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-md">
            <span className="h-2 w-2 rounded-full bg-brand-pink" />
            <span className="text-xs font-semibold text-brand-navy md:text-sm">
              Supporting Humanity 2025 · Phase 1
            </span>
          </div>
        </Reveal>

        {/* RIGHT: text */}
        <Reveal direction="right" className="w-full lg:flex-1">
          <span className="text-md font-bold tracking-widest text-brand-pink uppercase">
            Who we are
          </span>

          <h2 className="mt-4 text-3xl leading-tight font-extrabold text-brand-navy sm:text-4xl lg:text-5xl">
            Every person deserves{" "}
            <span className="text-brand-pink">dignity, opportunity</span> and hope
          </h2>

          <p className="mt-5 text-xl leading-9 text-gray-700 md:text-2xl md:leading-10">
            Mary Maud Charity is a community-driven nonprofit organization dedicated to improving
            the lives of widows, orphans, children, girls and other marginalized individuals.
          </p>

          <div className="mt-7 rounded-2xl bg-brand-softpink p-6">
            <p className="text-md font-bold tracking-widest text-brand-pink uppercase">
              Our mission
            </p>
            <p className="mt-2 text-lg leading-8 font-medium text-brand-navy md:text-xl md:leading-9">
              To provide essential support through livelihood assistance, quality education,
              healthcare services, skills development, capacity building and awareness
              programs, while creating opportunities for sustainable and brighter futures.
            </p>
          </div>

          <Link
            href="/about"
            className="mt-8 block w-full rounded-full bg-brand-navy px-8 py-4 text-center font-semibold text-white transition-colors hover:bg-brand-pink sm:inline-block sm:w-auto"
          >
            Learn more about us...
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default OurStory