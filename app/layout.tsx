import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/staticComponents/Navbar";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/staticComponents/Footer";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mary Maud Charity",
  description: "A community-driven nonprofit improving the lives of widows, orphans, children, girls and other marginalized individuals."
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
