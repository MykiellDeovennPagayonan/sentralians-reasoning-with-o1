"use client"
import Navbar from "@/components/layout/Navbar"
import { FlipWords } from "@/components/ui/flip-words"
import { useState } from "react"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const words = ["build", "innovate", "create", "connect", "inspire"]

  return (
    <div className="w-screen flex flex-col min-h-screen bg-grid-black/[0.1]">
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <section className="flex flex-col lg:flex-row w-screen bg-gray-50 px-6 md:px-8 lg:px-12 xl:px-20 py-20 xl:gap-16">
      <div className="w-full lg:w-1/2">
        <h1 className="text-5xl sm:text-6xl font-bold mb-2 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-950 via-blue-950 to-yellow-500 animate-gradient-x">
            Together we,
          </span>
        </h1>
        <h1 className="text-5xl sm:text-6xl font-bold relative">
          <FlipWords words={words} className='text-blue-800' />
        </h1>
        <p className="text-xl sm:text-2xl mt-8">
          The Google Developer Student Clubs - Central Philippine University is passionate community of developers, designers, and tech enthusiasts from Central Philippine University; willing to learn, build, and innovate together.
        </p>
      </div>
      <div className="w-full lg:w-1/2 h-[400px] mt-8 lg:mt-0">

      </div>
    </section>
    </div>
  )
}