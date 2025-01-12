import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface ProjectNameDisplayProps {
  projectName: string
  generateProjectName: () => void
}

export function ProjectNameDisplay({ projectName, generateProjectName }: ProjectNameDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center"
    >
      {projectName && (
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl font-bold mb-6 text-white text-center"
        >
          {projectName}
        </motion.h2>
      )}
      <Button 
        onClick={generateProjectName} 
        size="lg" 
        className="bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300"
      >
        Generate Project Name
      </Button>
      {projectName && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-white text-center"
        >
          Let your imagination run wild! Interpret this project name and create something amazing.
        </motion.p>
      )}
    </motion.div>
  )
}

