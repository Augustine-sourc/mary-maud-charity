import Hero from "@/staticComponents/Hero"
import OurStory from "@/staticComponents/OurStory"
import ImpactSection from "@/staticComponents/ImpactSection"
import SponsorsSection from "@/staticComponents/SponsorsSection"
import LatestStories from "@/staticComponents/LatestStories"
import { stories } from "@/staticComponents/storiesData"
import Footer from "@/staticComponents/Footer"

function page(){
  return(
    <main>
      <Hero/>
      <OurStory/>
      <ImpactSection/>
      <SponsorsSection/>
      <LatestStories stories={stories} />
    </main>
  )
}

export default page