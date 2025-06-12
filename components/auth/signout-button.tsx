import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
      }}
    >
      <Button variant="outline" type="submit">
        Sign out
      </Button>
    </form>
  )
}