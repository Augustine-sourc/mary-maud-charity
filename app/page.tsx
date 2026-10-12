import Hero from "@/staticComponents/Hero"
import OurStory from "@/staticComponents/OurStory"
import ImpactSection from "@/staticComponents/ImpactSection"
import SponsorsSection from "@/staticComponents/SponsorsSection"

function page(){
  return(
    <main>
      <Hero/>
      <OurStory/>
      <ImpactSection/>
      <SponsorsSection/>
    </main>
  )
}

export default page