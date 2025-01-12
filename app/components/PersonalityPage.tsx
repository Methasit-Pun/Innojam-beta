'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function PersonalityPage() {
  const [mbti, setMbti] = useState('')
  const [passion, setPassion] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    // For now, we'll just redirect to the main page
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 flex flex-col items-center max-w-2xl w-full relative z-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Personality and Passion</h2>
        
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <Label htmlFor="mbti" className="text-xl text-white">What's your MBTI personality type?</Label>
            <Input 
              id="mbti" 
              value={mbti} 
              onChange={(e) => setMbti(e.target.value)} 
              className="w-full p-4 text-xl bg-white bg-opacity-30 text-white placeholder-gray-300 rounded-lg focus:bg-opacity-40"
              placeholder="e.g., INTJ, ENFP"
            />
          </div>
          
          <div>
            <Label htmlFor="passion" className="text-xl text-white">What are you passionate about right now?</Label>
            <Input 
              id="passion" 
              value={passion} 
              onChange={(e) => setPassion(e.target.value)} 
              className="w-full p-4 text-xl bg-white bg-opacity-30 text-white placeholder-gray-300 rounded-lg focus:bg-opacity-40"
              placeholder="e.g., AI, climate change, art"
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full text-xl py-6 bg-white text-purple-600 hover:bg-purple-100 transition-all duration-300 transform hover:scale-105"
          >
            Submit
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

