'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { LoadingAnimation } from './LoadingAnimation'

const questions = [
  {
    id: 1,
    question: "Do you have a project in mind?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 2,
    question: "What stage is your project in?",
    type: "radio",
    options: ["Idea stage", "Prototype stage", "Development stage", "Finished"],
  },
  {
    id: 3,
    question: "What type of project is it?",
    type: "radio",
    options: ["Game", "App", "Tool", "Website", "Other"],
  },
  {
    id: 4,
    question: "What is your innovation project's main focus?",
    type: "checkbox",
    options: ["Healthcare", "Entertainment", "Education", "Sustainability", "Food", "Transportation", "Other"],
  },
  {
    id: 5,
    question: "Do you want feedback or suggestions for your project?",
    type: "radio",
    options: ["Yes", "No"],
  },
]

export function QuestionPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAnswer = (answer: any) => {
    setAnswers({ ...answers, [currentQuestion]: answer })
  }

  const handleNext = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (currentQuestion === 0 && answers[0] === "No") {
        // Redirect to personality questions
        router.push('/personality')
      } else if (currentQuestion === 1 && answers[1] === "Finished") {
        // Redirect to main page for project refinement
        router.push('/?refine=true')
      } else if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Handle completion based on the last question's answer
        if (answers[4] === "Yes") {
          router.push('/suggestions')
        } else {
          router.push('/customization')
        }
      }
    }, 3000 + Math.random() * 2000) // Random delay between 3-5 seconds
  }

  const currentQ = questions[currentQuestion]

  if (isLoading) {
    return <LoadingAnimation />
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
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <h2 className="text-3xl font-bold mb-6 text-white text-center">{currentQ.question}</h2>
            
            {currentQ.type === "radio" && (
              <RadioGroup onValueChange={handleAnswer} className="space-y-4">
                {currentQ.options?.map((option) => (
                  <div key={option} className="flex items-center space-x-2 bg-white bg-opacity-30 p-4 rounded-lg transition-all hover:bg-opacity-40">
                    <RadioGroupItem value={option} id={option} className="text-purple-600" />
                    <Label htmlFor={option} className="text-xl text-white cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {currentQ.type === "checkbox" && (
              <div className="space-y-4">
                {currentQ.options?.map((option) => (
                  <div key={option} className="flex items-center space-x-2 bg-white bg-opacity-30 p-4 rounded-lg transition-all hover:bg-opacity-40">
                    <Checkbox 
                      id={option} 
                      onCheckedChange={(checked) => {
                        const currentAnswers = answers[currentQuestion] || []
                        if (checked) {
                          handleAnswer([...currentAnswers, option])
                        } else {
                          handleAnswer(currentAnswers.filter((a: string) => a !== option))
                        }
                      }}
                      className="text-purple-600"
                    />
                    <label htmlFor={option} className="text-xl text-white cursor-pointer">{option}</label>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 w-full"
        >
          <Button 
            onClick={handleNext} 
            className="w-full text-xl py-6 bg-white text-purple-600 hover:bg-purple-100 transition-all duration-300 transform hover:scale-105"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish"}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

