'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [inputValue, setInputValue] = useState('')

  const toggleChatbot = () => setIsOpen(!isOpen)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }])
      // Here you would typically send the message to a backend for processing
      // For now, we'll just echo the message back
      setTimeout(() => {
        setMessages(prev => [...prev, { text: `You said: ${inputValue}`, isUser: false }])
      }, 1000)
      setInputValue('')
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={toggleChatbot}
          className="rounded-full w-12 h-12 bg-purple-600 text-white hover:bg-purple-700"
        >
          <MessageCircle size={24} />
        </Button>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold">Chatbot Assistant</h3>
              <Button onClick={toggleChatbot} variant="ghost" size="sm">
                <X size={20} />
              </Button>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.isUser ? 'text-right' : 'text-left'
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.isUser
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-2 rounded border"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

