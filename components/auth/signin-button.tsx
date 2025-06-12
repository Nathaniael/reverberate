import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("spotify", { redirectTo: "/recap" })
      }}
    >
      <Button variant="spotify" size="lg" type="submit" className="text-lg px-8">
        Connect with Spotify
      </Button>
    </form>
  )
}