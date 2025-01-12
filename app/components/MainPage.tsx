'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const adjectives = [ 
  'Swift', 'Bright', 'Hidden', 'Quiet', 'Soft', 
  'Bold', 'Lost', 'Fresh', 'Open', 'Clear', 
  'Tiny', 'Vast', 'Quick', 'Calm', 'Simple', 
  'Sharp', 'Brave', 'Warm', 'Cool', 'Free', 
  'Fast', 'Odd', 'Deep', 'Light', 'Pure', 
  'Smart', 'Fair', 'Wide', 'Strong', 'New'
]

const nouns = [
  'Path', 'Light', 'Loop', 'Wave', 'Seed', 
  'Bridge', 'Trail', 'Spark', 'Flow', 'Nest', 
  'Stone', 'Dream', 'Shell', 'Flame', 'Tree', 
  'Cloud', 'River', 'Star', 'Sky', 'Echo', 
  'Shade', 'Map', 'Glow', 'Drop', 'Fire', 
  'Leaf', 'Core', 'Line', 'Step', 'Root'
]

export function MainPage({ refine = false }) {
  const [keyword, setKeyword] = useState('')

  const generateKeyword = () => {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    setKeyword(`${adjective} ${noun}`)
  }

  useEffect(() => {
    generateKeyword()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 z-0" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-10" />
      
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="text-6xl font-bold mb-8 text-white text-center relative z-20"
      >
        Creative Project Generator
      </motion.h1>
      
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
        className="text-xl mb-12 text-white text-center max-w-2xl relative z-20"
      >
        {refine 
          ? "Great job on finishing your project! Let's refine or showcase it in the jam."
          : "Embark on a journey of innovation and creativity. Let's bring your ideas to life!"}
      </motion.p>
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 10 }}
        className="relative z-20 space-y-8 flex flex-col items-center"
      >
        <div className="text-4xl font-bold text-white mb-4">
          {keyword}
        </div>
        <Button
          onClick={generateKeyword}
          className="text-2xl px-8 py-6 bg-white text-purple-600 hover:bg-purple-100 hover:text-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          Generate New Keyword
        </Button>
        <Button asChild className="text-2xl px-8 py-6 bg-white text-purple-600 hover:bg-purple-100 hover:text-purple-700 transition-all duration-300 transform hover:scale-105">
          <Link href="/questions">Start Your Creative Project</Link>
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute inset-0 pointer-events-none z-30"
      >
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

