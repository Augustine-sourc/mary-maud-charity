import type { StaticImageData } from "next/image"
import Yao from "@/public/Image/sponsors/YAO-CONSULT.jpg"
import sunda from "@/public/Image/sponsors/Sunda-web.png"
import KOfori from "@/public/Image/sponsors/K-OFORI-LOGO.jpg"
import Koecom from "@/public/Image/sponsors/KOECOM.jpg"
import wilaman from "@/public/Image/sponsors/Wilaman.jpeg"
export type Sponsor = {
  id: number
  name: string
  logo: StaticImageData
  href?: string
  alt?: string
}

export const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "Yao Consult",
    logo: Yao,
    href: "https://web.facebook.com/yaoconsult/?_rdc=1&_rdr#",
  },
  {
    id: 2,
    name: "Sunda International",
    logo: sunda,
    href:"https://www.sunda.com/en"
  },
  {
    id: 3,
    name: "K Ofori Limited",
    logo: KOfori,
    href:"https://www.koforiltd.com/"
  },
  {
    id: 4,
    name: "Kingdom on Earth Commercial",
    logo: Koecom,
    href:"https://www.koecomgh.com/"
  },
  {
    id: 5,
    name:"Wilaman Investments",
    logo: wilaman,
    href:"https://www.businessghana.com/site/directory/food/433221/Wilaman-Investment"
  }
]