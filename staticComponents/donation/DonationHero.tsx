import donationImage from "@/public/Image/donationImage.jpg"
import Image from 'next/image';

export default function DonationHero() {
  return (
    <section className="relative bg-gradient-to-b from-[#FCE7F3]/40 via-white to-white py-12 md:py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Small Introductory Label */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FCE7F3] border border-[#E91E63]/20 text-[#E91E63] text-xs font-bold tracking-widest uppercase">
              MAKE A DIFFERENCE
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-[#20213A] tracking-tight leading-tight">
              Your Kindness Can <span className="text-[#E91E63]">Change a Life.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#6B7280] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Every act of generosity creates an opportunity for hope, growth, and a brighter future. Your support helps Mary Maud Charity continue pursuing its mission and making a meaningful difference in the communities it serves.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
              
              {/* Primary CTA Button */}
              <a
                href="#donation-form"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#E91E63] hover:bg-[#D81B60] text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-[#E91E63]/20 hover:shadow-xl hover:shadow-[#E91E63]/30 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E91E63]"
              >
                Donate Today
              </a>

              {/* Secondary Text Link */}
              <a
                href="#donation-impact"
                className="inline-flex items-center text-sm font-medium text-[#242653] hover:text-[#E91E63] group transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E63] rounded px-2 py-1"
              >
                <span>Learn How Your Donation Helps</span>
                <svg 
                  className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200 text-[#E91E63]" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

            </div>

            {/* Trust Badges / Supporting Note */}
            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-[#6B7280]">
              <div className="flex items-center space-x-1.5">
                <svg className="w-4 h-4 text-[#E91E63]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Secure Donation</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <svg className="w-4 h-4 text-[#E91E63]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Direct Community Impact</span>
              </div>
            </div>

          </div>

          {/* Right Column: Expanded Wider Visual Container */}
          <div className="lg:col-span-6 relative w-full">
            
            {/* Subtle Decorative Background Frame */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#E91E63]/20 to-[#242653]/20 rounded-3xl blur-lg opacity-70"></div>

            {/* Image Container with wider aspect ratio */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-[#242653] shadow-2xl border border-white/20 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              <Image
                src={donationImage}
                alt="Community members and children supported by Mary Maud Charity"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle Overlay gradient at base */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#242653]/30 via-transparent to-transparent pointer-events-none"></div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}