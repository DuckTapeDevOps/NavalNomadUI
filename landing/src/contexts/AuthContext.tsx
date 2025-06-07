import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Auth } from 'aws-amplify'

interface User {
  id: string
  email: string
  name: string
  navalNomadStatus?: string
  instagramHandle?: string
  youtubeChannel?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  linkInstagram: (handle: string) => Promise<void>
  linkYouTube: (channel: string) => Promise<void>
  updateNavalNomadStatus: (status: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      const attributes = await Auth.currentUserInfo()
      
      setUser({
        id: attributes.username,
        email: attributes.attributes.email,
        name: attributes.attributes.name,
        navalNomadStatus: attributes.attributes['custom:naval_nomad_status'],
        instagramHandle: attributes.attributes['custom:instagram_handle'],
        youtubeChannel: attributes.attributes['custom:youtube_channel']
      })
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  async function signIn() {
    try {
      await Auth.federatedSignIn({ provider: 'Google' })
      await checkUser()
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  async function signOut() {
    try {
      await Auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  async function linkInstagram(handle: string) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.updateUserAttributes(user, {
        'custom:instagram_handle': handle
      })
      await checkUser()
    } catch (error) {
      console.error('Error linking Instagram:', error)
      throw error
    }
  }

  async function linkYouTube(channel: string) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.updateUserAttributes(user, {
        'custom:youtube_channel': channel
      })
      await checkUser()
    } catch (error) {
      console.error('Error linking YouTube:', error)
      throw error
    }
  }

  async function updateNavalNomadStatus(status: string) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.updateUserAttributes(user, {
        'custom:naval_nomad_status': status
      })
      await checkUser()
    } catch (error) {
      console.error('Error updating Naval Nomad status:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
    linkInstagram,
    linkYouTube,
    updateNavalNomadStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 