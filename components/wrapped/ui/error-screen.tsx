interface ErrorScreenProps {
  title?: string
  message: string
}

export function ErrorScreen({
  title = "Oops! Something went wrong",
  message
}: ErrorScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-white">
        <p className="text-xl font-medium mb-4">{title}</p>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  )
}