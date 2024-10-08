"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-1 px-6 bg-gray-300 bg-op">
      <div className="flex items-center space-x-6 bg-white rounded-full py-1.5 p-1 pr-5">
        <Link href="/" className="text-2xl font-bold">
          <span className="sr-only">Home</span>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <circle cx="12" cy="12" r="12" />
          </svg>
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900">Get Started</Link>
        </div>
      </div>
      <div className="flex items-center space-x-4 bg-white rounded-full py-1 px-5">
        <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
        <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
        <Link href="/demo" className="text-gray-600 hover:text-gray-900">View Demo</Link>
        <AuthButton />
      </div>
    </nav>
  )
}

function AuthButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <Image className="rounded-full" src={session?.user?.image || "/default-profile.png"} alt="your profile picture" width={35} height={35} />
        <Button variant="default" className="bg-black rounded-full text-white hover:bg-gray-800" onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }

  return (
    <>
      <Button variant="default" className="bg-black rounded-full text-white hover:bg-gray-800" onClick={() => signIn()}>Sign in</Button>
    </>
  )
   
}