"use client"
import { useState } from "react"
import Link from "next/link"
import Logo from "@/public/Image/logo.jpg"
import Image from "next/image"
function Navbar() {
 const [open, setOpen] = useState(false)

  const links = [
    { label: "About", href: "/about" },
    { label: "Programmes", href: "/programs" },
    { label: "Stories", href: "/stories" },
    { label: "Transparency", href: "/transparency" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 md:top-6 md:w-max">
      <nav className="flex items-center justify-between gap-4 rounded-full bg-brand-navy/55 p-2 text-white shadow-lg backdrop-blur-md md:gap-8">
        <Link href="/" className="flex items-center rounded-full bg-white px-4 py-1.5">
          <Image src={Logo} alt="Mary Maud Charity" className="h-8 w-auto" priority />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm transition-colors hover:text-pink-300">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            className="rounded-full bg-brand-pink px-5 py-3 text-sm font-medium transition-colors hover:bg-pink-700"
          >
            Donate
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-xl md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="mt-2 flex flex-col gap-4 rounded-3xl bg-brand-navy/90 p-6 text-white backdrop-blur-md md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setOpen(false)} className="block">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar