"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Menu, X } from 'lucide-react'
import { useState } from "react"

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="sr-only">Home</span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            </Link>
            <Button
              variant="outline"
              className="block ml-3 z-50 md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              Chat History
            </Button>
            <div className="hidden md:block ml-10 space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900">Get Started</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900">View Demo</Link>
              <AuthButton />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Get Started</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</Link>
            <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Blog</Link>

          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2">
              <Button variant="default" className="w-full bg-black text-white hover:bg-gray-800">
                View Demo
              </Button>
            </div>
          </div>
          <AuthButton />
        </div>
      )}
    </nav>
  )
}

function AuthButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <Image className="rounded-full hidden md:block" src={session?.user?.image || "/default-profile.png"} alt="your profile picture" width={35} height={35} />
        <Button variant="default" className="bg-black rounded-full text-white hover:bg-gray-800 mx-2 md:m-0" onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }

  return (
    <>
      <Button variant="default" className="bg-black rounded-full text-white hover:bg-gray-800" onClick={() => signIn()}>Sign in</Button>
    </>
  )
}