import { motion } from 'framer-motion'
import { Waves } from 'lucide-react'

interface RecommendedActivitiesProps {
  activities: string[]
}

export function RecommendedActivities({ activities }: RecommendedActivitiesProps) {
  return (
    <motion.div
      className="mb-6 md:mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.6 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Perfect Activities for Your Mood</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={activity}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
          >
            <Waves size={24} className="mx-auto mb-2 text-white/80" />
            <span className="text-sm font-medium">{activity}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}