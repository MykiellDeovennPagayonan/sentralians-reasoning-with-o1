"use client"

import { Input } from '@/components/ui/input'
import React from 'react'
import { Button } from '@/components/ui/button'

import { useSearchParams } from "next/navigation"

export default function SignupForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // this is the url to redirect to after signing up

  console.log(callbackUrl, 'redirect url')

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <Input id="name" placeholder="Enter your full name" type="text" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <Input id="email" placeholder="Enter your email" type="email" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <Input id="password" placeholder="Create a password" type="password" />
      </div>
      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <Input id="confirm-password" placeholder="Confirm your password" type="password" />
      </div>
      <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
    </form>
  )
}