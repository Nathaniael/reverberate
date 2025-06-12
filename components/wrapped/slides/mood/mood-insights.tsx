'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MoodInsightsProps {
  insights: string[]
}

export function MoodInsights({ insights }: MoodInsightsProps) {
  const [currentInsight, setCurrentInsight] = useState(0)

  // Cycle through insights
  useEffect(() => {
    if (insights.length > 1) {
      const interval = setInterval(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [insights.length])

  if (insights.length === 0) return null

  return (
    <motion.div
      className="mb-6 md:mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Musical Insights</h2>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentInsight}
            className="text-lg text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {insights[currentInsight]}
          </motion.p>
        </AnimatePresence>
        {insights.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {insights.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentInsight ? 'bg-white' : 'bg-white/30'
                }`}
                onClick={() => setCurrentInsight(index)}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}