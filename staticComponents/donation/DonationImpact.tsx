import moneyHelp from "@/public/Image/moneyHelp.jpg"
import noursihingYoungLives from "@/public/Image/nourishingYoungLives.jpg"
import softcare from "@/public/Image/sofcare.jpg"
import education from "@/public/Image/education.jpg"
import healthImage from "@/public/Image/healthImage.jpg"
import Image from 'next/image';
import type { StaticImageData } from "next/image";

interface ImpactCardProps {
  title: string;
  description: string;
  impactLabel: string;
  imageSrc: StaticImageData;
  imageAlt: string;
}

const IMPACT_CARDS: ImpactCardProps[] = [
  {
    title: "Nourishing Young Lives",
    description:
      "Donations helped provide essential food supplies, including rice, beans, gari, cooking oil, palm oil, and spaghetti, to five beneficiary orphanages. Drinks and bottled water were also supplied to support the children's daily needs.",
    impactLabel: "Five orphanages received support",
    imageSrc: noursihingYoungLives,
    imageAlt: "Essential food and grocery supplies provided to beneficiary orphanages",
  },
  {
    title: "Healthcare When It Matters Most",
    description:
      "Donor contributions supported children's access to healthcare through National Health Insurance Scheme registration. Financial assistance also funded a reported GHS 15,000 kidney stone surgery for an eight-year-old boy.",
    impactLabel: "Healthcare and medical support",
    imageSrc: healthImage,
    imageAlt: "Children receiving healthcare support and medical care",
  },
  {
    title: "Investing in Education",
    description:
      "Donations helped provide educational materials to children in beneficiary orphanages, supporting their learning and academic development.",
    impactLabel: "Educational materials provided",
    imageSrc: education,
    imageAlt: "Educational stationery and learning materials supplied to children",
  },
  {
    title: "Protecting Dignity",
    description:
      "Donations helped provide sanitary products to girls, supporting menstrual hygiene, dignity, and inclusion.",
    impactLabel: "Supporting girls' wellbeing",
    imageSrc: softcare,
    imageAlt: "Sanitary products and personal care supplies for girls",
  },
  {
    title: "Supporting Essential Needs",
    description:
      "Each of the five beneficiary orphanages received GHS 1,000 in direct cash support. This assistance helped address urgent needs such as feeding, medical expenses, utilities, education, and facility maintenance.",
    impactLabel: "GHS 5,000 in direct cash donations",
    imageSrc: moneyHelp,
    imageAlt: "Charity outreach and direct institutional support for orphanages",
  },
];

export default function DonationImpact() {
  return (
    <section id="donation-impact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. INTRODUCTION HEADER */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FCE7F3] border border-[#E91E63]/20 text-[#E91E63] text-xs font-bold tracking-widest uppercase">
            OUR IMPACT
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#20213A] tracking-tight leading-tight">
            See the Difference <span className="text-[#E91E63]">Your Support Makes</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
            Your generosity helps Mary Maud Charity provide practical support to vulnerable children and the institutions caring for them. From essential food supplies to healthcare and educational materials, your contributions help address real needs.
          </p>
        </div>

        {/* 2. IMPACT STORY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {IMPACT_CARDS.map((card, idx) => (
            <div
              key={card.title}
              className={`bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Image Container (Clean & Natural, No Blue Tint) */}
                <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#FCE7F3] text-[#E91E63] text-xs font-bold tracking-wide">
                    {card.impactLabel}
                  </div>
                  <h3 className="text-xl font-bold text-[#20213A] group-hover:text-[#E91E63] transition-colors duration-200">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. IMPACT STATISTICS SECTION */}
        <div className="bg-[#242653] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden space-y-8">
          <div className="max-w-2xl text-center md:text-left space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E91E63]">
              REPORTED FIGURES
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Our Impact in Numbers — 2025
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Summarized report of support delivered and financial stewardship during 2025.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-1">
              <span className="block text-2xl sm:text-3xl font-black text-[#FCE7F3]">
                5
              </span>
              <span className="block text-xs font-medium text-gray-300">
                Beneficiary Orphanages Supported
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-1">
              <span className="block text-2xl sm:text-3xl font-black text-[#FCE7F3]">
                GHS 5,000
              </span>
              <span className="block text-xs font-medium text-gray-300">
                Direct Cash Donations
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-1">
              <span className="block text-2xl sm:text-3xl font-black text-[#FCE7F3]">
                GHS 11,990
              </span>
              <span className="block text-xs font-medium text-gray-300">
                Reported In-Kind Donations
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-1">
              <span className="block text-2xl sm:text-3xl font-black text-[#FCE7F3]">
                GHS 66,989
              </span>
              <span className="block text-xs font-medium text-gray-300">
                Raised in 2025 <br />
                <span className="text-[10px] text-gray-400 font-normal">
                  (GHS 64,330 spent on programme activities)
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* 4. CALL TO ACTION */}
        <div className="text-center pt-4">
          <a
            href="#donation-form"
            className="inline-flex items-center justify-center bg-[#E91E63] hover:bg-[#D81B60] text-white font-semibold text-base px-9 py-4 rounded-xl shadow-lg shadow-[#E91E63]/25 hover:shadow-xl hover:shadow-[#E91E63]/35 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E91E63]"
          >
            Make a Donation
          </a>
        </div>

      </div>
    </section>
  );
}