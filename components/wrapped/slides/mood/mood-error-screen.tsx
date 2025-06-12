import { Music } from 'lucide-react'

interface MoodErrorScreenProps {
  error: string
}

export function MoodErrorScreen({ error }: MoodErrorScreenProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4 md:p-8">
      <div className="text-center text-white">
        <Music size={48} className="md:w-16 md:h-16 mx-auto mb-4 text-gray-400" />
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Musical Mood Analysis</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          {error || 'Unable to analyze your musical mood right now'}
        </p>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 max-w-md mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Try Again Later</h2>
          <p className="text-gray-300 text-sm md:text-base">
            We&apos;re working on enhancing your music analysis experience!
          </p>
        </div>
      </div>
    </div>
  )
}