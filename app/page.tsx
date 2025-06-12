import { auth } from "@/auth"
import { SignIn } from "@/components/auth/signin-button"
import { SignOut } from "@/components/auth/signout-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Music, Sparkles, BarChart3, Heart, AlertCircle } from "lucide-react"

interface HomeProps {
  searchParams: Promise<{ error?: string }>
}

export default async function Home(props: HomeProps) {
  const session = await auth()
  const searchParams = await props.searchParams
  const error = searchParams.error

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Music className="w-8 h-8 text-green-400" />
          <span className="text-2xl font-bold text-white">Reverberate</span>
        </div>
        <div>
          {session ? <SignOut /> : null}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-8 max-w-md mx-auto">
              <div className="flex items-center space-x-2 text-red-200">
                <AlertCircle className="w-5 h-5" />
                <span>{getErrorMessage(error)}</span>
              </div>
            </div>
          )}

          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-6">
              Your Musical Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover your unique music DNA with a beautiful, personalized journey through your Spotify listening habits
            </p>
          </div>

          {session ? (
            <div className="space-y-6">
              <p className="text-lg text-green-400 mb-4">
                Welcome back, {session.user?.name}! 👋
              </p>
              <Link href="/wrapped">
                <Button variant="spotify" size="lg" className="text-xl px-12 py-6">
                  View Your Wrapped ✨
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <SignIn />
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                Connect your Spotify account to generate your personalized music wrapped experience
              </p>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Top Tracks & Artists</h3>
              <p className="text-gray-300 text-sm">
                Discover your most played songs and favorite artists from the year
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Musical DNA</h3>
              <p className="text-gray-300 text-sm">
                Analyze your music&apos;s mood, energy, and emotional fingerprint
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Beautiful Stories</h3>
              <p className="text-gray-300 text-sm">
                Experience your data through smooth animations and stunning visuals
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-400 text-sm">
        <p>Built with Next.js, Tailwind CSS, and the Spotify Web API</p>
      </footer>
    </div>
  )
}
