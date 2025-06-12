interface LoadingScreenProps {
  title?: string
  subtitle?: string
}

export function LoadingScreen({
  title = "Loading your musical journey...",
  subtitle
}: LoadingScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-white">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium">{title}</p>
        {subtitle && <p className="text-gray-300 mt-2">{subtitle}</p>}
      </div>
    </div>
  )
}