import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify(
      {
        authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-top-read,user-read-recently-played,user-read-playback-state,user-library-read,playlist-read-private'
      }
    )
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    }
  },
  trustHost: true,
  debug: process.env.NODE_ENV === "development"
})