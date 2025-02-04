'use client'

import { motion } from 'framer-motion'
import { SignInButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-[#1F2937] to-[#111827] min-h-screen flex items-center">
    <div className="relative isolate px-6 pt-14 lg:px-8 w-full">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#10B981] to-[#047857] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
  
      {/* Hero content with motion animation */}
      <motion.div
  className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-20"
  initial={{ x: '-100%' }}
  animate={{ x: 0 }}
  transition={{ duration: 1 }}
>
  <div className="hidden sm:mb-8 sm:flex sm:justify-center">
    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-gray-700/10 hover:ring-gray-700/20">
      How to use this AI interview mocker .{' '}
      <a href="/how-it-works" className="font-semibold text-[#10B981]">
        <span aria-hidden="true" className="absolute inset-0" />
        Read more <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  </div>

  <div className="text-center">
    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
      Your Personal AI Interview Coach
    </h1>
    
    <p className="mt-4 text-lg leading-8 text-gray-300 sm:text-xl">
      AI-driven mock interviews with real-time feedback to help you land your dream job.
    </p>

    {/* Key Benefits */}
    <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 text-gray-300 text-sm sm:text-base">
      <div className="flex items-center gap-2">
        ✅ Personalized AI Feedback
      </div>
      <div className="flex items-center gap-2">
        ✅ Unlimited Practice Sessions
      </div>
      <div className="flex items-center gap-2">
        ✅ Real Interview Questions
      </div>
    </div>

    <div className="mt-10 flex items-center justify-center gap-x-6">
      <SignedOut>
        <SignInButton mode="modal">
          <button
            className="rounded-md bg-[#10B981] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#059669] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10B981]"
          >
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div className="p-5">
          <Link href={"/dashboard"}
            className="rounded-md bg-[#10B981] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#059669] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10B981]"
          >
            Start Interview
          </Link>
        </div>
      </SignedIn>
      {/* <a 
        href="/features" 
        className="rounded-md border border-gray-500 px-4 py-3 text-sm font-semibold text-gray-300 hover:bg-gray-800"
      >
        Learn more <span aria-hidden="true">→</span>
      </a> */}
    </div>
  </div>
</motion.div>
  
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(24% 0%, 100% 0%, 76% 100%, 0% 100%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#10B981] to-[#047857] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
    </div>
  )
}