'use client'

import { useSession } from "next-auth/react"
import { SignIn } from "@/components/auth/signin-button"
import { SignOut } from "@/components/auth/signout-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Music, Sparkles, BarChart3, Heart, AlertCircle, Play, Headphones, TrendingUp, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

// Floating musical elements component
const FloatingMusicElements = () => {
  const elements = [
    { icon: Music, delay: 0, x: 15, y: 20, size: 28, color: "text-green-400/30" },
    { icon: Play, delay: 0.8, x: 85, y: 15, size: 24, color: "text-blue-400/30" },
    { icon: Heart, delay: 1.6, x: 10, y: 75, size: 20, color: "text-pink-400/30" },
    { icon: Headphones, delay: 2.4, x: 90, y: 80, size: 26, color: "text-purple-400/30" },
    { icon: TrendingUp, delay: 1.2, x: 20, y: 50, size: 22, color: "text-yellow-400/30" },
    { icon: Zap, delay: 2, x: 80, y: 45, size: 24, color: "text-cyan-400/30" },
  ]

  return (
    <>
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color}`}
          style={{ left: `${element.x}%`, top: `${element.y}%` }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: [-15, 15, -15],
            x: [-5, 5, -5],
          }}
          transition={{
            delay: element.delay,
            duration: 1,
            y: {
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: {
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <element.icon size={element.size} />
        </motion.div>
      ))}
    </>
  )
}

// Separate client component for error handling that uses useSearchParams
function ErrorMessage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'no-session':
        return 'Please sign in with your Spotify account to continue.'
      case 'no-access-token':
        return 'Authentication failed. Please try signing in again.'
      default:
        return 'An error occurred. Please try again.'
    }
  }

  if (!error) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-8 max-w-md mx-auto backdrop-blur-lg"
    >
      <div className="flex items-center space-x-2 text-red-200">
        <AlertCircle className="w-5 h-5" />
        <span>{getErrorMessage(error)}</span>
      </div>
    </motion.div>
  )
}

// Animated background orbs
const BackgroundOrbs = () => (
  <>
    <motion.div
      className="absolute top-1/4 left-1/6 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.4, 0.2],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute top-1/2 right-1/6 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.3, 0.5, 0.3],
        x: [0, -40, 0],
        y: [0, 30, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
    <motion.div
      className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.25, 0.45, 0.25],
        x: [0, 25, 0],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
    />
  </>
)

export default function Home() {
  const { data: session, status } = useSession()

  const features = [
    {
      icon: BarChart3,
      title: "Top Tracks & Artists",
      description: "Discover your most played songs and favorite artists from the year",
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Heart,
      title: "Musical DNA",
      description: "Analyze your music's mood, energy, and emotional fingerprint",
      color: "text-pink-400",
      bgColor: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: Sparkles,
      title: "Beautiful Stories",
      description: "Experience your data through smooth animations and stunning visuals",
      color: "text-yellow-400",
      bgColor: "from-yellow-500/20 to-amber-500/20"
    }
  ]

  // Show loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <FloatingMusicElements />
        <BackgroundOrbs />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6 flex justify-between items-center"
      >
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Music className="w-8 h-8 text-green-400" />
          </motion.div>
          <span className="text-2xl font-bold text-white">Reverberate</span>
        </motion.div>
        <div>
          {session ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <SignOut />
            </motion.div>
          ) : null}
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-8 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Error Message */}
          <Suspense fallback={null}>
            <ErrorMessage />
          </Suspense>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-6"
            >
              Your Musical Story
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Discover your unique music DNA with a beautiful, personalized journey through your Spotify listening habits
            </motion.p>
          </motion.div>

          {session ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-6"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-lg text-green-400 mb-4"
              >
                Welcome back, {session.user?.name}! 👋
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link href="/recap">
                  <Button variant="spotify" size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25">
                    <Play className="w-6 h-6 mr-2" />
                    View Your Recap ✨
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-8"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <SignIn />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-sm text-gray-400 max-w-md mx-auto"
              >
                Connect your Spotify account to generate your personalized music recap experience
              </motion.p>
            </motion.div>
          )}

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 1.2 + index * 0.2,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                className={`bg-gradient-to-br ${feature.bgColor} backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer`}
              >
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="relative z-10 p-6 text-center text-gray-400 text-sm"
      >
        <motion.p
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Built with Next.js, Tailwind CSS, and the Spotify Web API
        </motion.p>
      </motion.footer>
    </div>
  )
}
