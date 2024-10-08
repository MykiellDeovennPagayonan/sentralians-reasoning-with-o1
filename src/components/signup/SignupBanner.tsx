import { CheckCircle, CheckSquare } from 'lucide-react'
import React from 'react'
import { Card } from '@/components/ui/card'

export default function SignupBanner() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-blue-100 justify-center items-center p-12">
      <Card className="w-full max-w-md p-8 bg-blue-200 text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-blue-300 rounded-full flex items-end justify-center">
              <div className="w-24 h-28 bg-blue-400 rounded-t-full"></div>
            </div>
            <div className="absolute top-0 right-0 bg-white rounded-full p-1">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <div className="w-16 h-20 bg-white rounded-lg flex flex-col justify-center items-center">
            <CheckSquare className="w-8 h-8 text-blue-500 mb-2" />
            <div className="w-10 h-1 bg-gray-300"></div>
            <div className="w-10 h-1 bg-gray-300 mt-1"></div>
          </div>
          <div className="w-12 h-16 bg-yellow-200 rounded-lg"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          Join Tasky and start organizing your tasks like never before!
        </h3>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
        </div>
      </Card>
    </div>
  )
}