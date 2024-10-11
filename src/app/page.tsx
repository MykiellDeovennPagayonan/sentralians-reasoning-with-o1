"use client"
import Navbar from "@/components/layout/Navbar"
import { FlipWords } from "@/components/ui/flip-words"
import { useState, useRef } from "react"
import { Highlighted } from "@/components/ui/hero-highlight"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const words = ["Enhanced Learning", "Better Learning", "Engaged Learning", "Easier Learning"]
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <div className="w-screen flex flex-col min-h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <section className="flex flex-col lg:flex-row w-screen bg-gray-100 px-6 md:px-8 lg:px-12 xl:px-20 py-20 xl:gap-16">
        <div className="w-full lg:w-1/2">
          <h1 className="text-5xl sm:text-6xl font-bold mb-2 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-950 via-blue-950 to-yellow-500 animate-gradient-x">
              BricolAI
            </span>
          </h1>
          <p className="text-2xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl mt-8 font-bold">
            <Highlighted className="text-black dark:text-white">
              Interactive
            </Highlighted> {" "}
            Chat-Based UI components for
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold mt-1">
            <FlipWords words={words} className='text-blue-800' />
          </h1>
          <button className="mt-4 md:mt-6 lg:mt-8 px-5 md:px-6 lg:px-8 xl:px-10 py-1 lg:py-2 text-lg md:text-lg lg:text-xl bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          // onClick={""}
          >
            Join us
          </button>
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <div className="relative group/card w-full rounded-2xl aspect-[16/9] border-2 border-gray-400 shadow-xl">
            <video
              ref={videoRef}
              src="/videos/hero-video.mp4"
              className="object-cover rounded-2xl w-full h-full"
              onEnded={handleVideoEnd}
              autoPlay
              muted
            />
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col px-6 md:px-8 lg:px-12 xl:px-20 py-20 bg-dot-black/[0.1] space-y-16">
        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold"> Product </h1>
        <div className="flex flex-col-reverse lg:flex-row w-full">
          <div className="w-3/4 lg:w-1/2 mt-8 lg:mt-0 mx-auto">
            <div className="relative group/card w-full rounded-2xl aspect-[16/9] border-2 border-gray-400 shadow-xl">
              <video
                ref={videoRef}
                src="/videos/draw-feature.mp4"
                className="object-cover rounded-2xl w-full h-full"
                autoPlay
                muted
                loop
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl lg:mt-8 text-center lg:text-left lg:ml-16 font-semibold mb-2 relative">
              BricolAI
            </h1>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl lg:mt-8 text-center lg:text-left lg:ml-16 font-semibold mb-2 relative">
              BricolAI
            </h1>
          </div>
          <div className="w-3/4 lg:w-1/2 mt-8 lg:mt-0 mx-auto">
            <div className="relative group/card w-full rounded-2xl aspect-[16/9] border-2 border-gray-400 shadow-xl">
              <video
                ref={videoRef}
                src="/videos/basic-features.mp4"
                className="object-cover rounded-2xl w-full h-full"
                autoPlay
                muted
                loop
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row w-full">
          <div className="w-3/4 lg:w-1/2 mt-8 lg:mt-0 mx-auto">
            <div className="relative group/card w-full rounded-2xl aspect-[16/9] border-2 border-gray-400 shadow-xl">
              <video
                ref={videoRef}
                src="/videos/physics-feature.mp4"
                className="object-cover rounded-2xl w-full h-full"
                autoPlay
                muted
                loop
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl lg:mt-8 text-center lg:text-left lg:ml-16 font-semibold mb-2 relative">
              BricolAI
            </h1>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col px-6 md:px-8 lg:px-12 xl:px-20 py-20 bg-gray-100 space-y-16">
        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold"> Pricing </h1>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg justify-between border border-gray-200">
            <div>
              <h3 className="text-2xl font-bold text-center">Free</h3>
              <div className="mt-4 text-center ">
                <span className="text-4xl font-bold">$0</span>/ month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5" />
                  50 messages per day
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5" />
                  Limited saved chats
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg justify-between border border-gray-200">
            <div>
              <h3 className="text-2xl font-bold text-center">Pro</h3>
              <div className="mt-4 text-center">
                <span className="text-4xl font-bold">$19</span>/ month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5" />
                  Unlimited messages
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5" />
                  Unlimited saved chats
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5" />
                  Access to advanced features
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5" />
                  Priority support
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}