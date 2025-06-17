import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Home from './pages/Home'
import LiveaboardGuides from './pages/LiveaboardGuides'
import MarinaExplorer from './pages/MarinaExplorer'
import RouteExplorer from './pages/Routes'
import { MapPage } from './pages/MapPage'
import { AuthProvider } from './contexts/AuthContext'
import { signInWithRedirect } from 'aws-amplify/auth'
import { useEffect } from 'react'

function AuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // The redirect will be handled automatically by Amplify
        window.location.href = '/'
      } catch (error) {
        console.error('Error handling auth redirect:', error)
      }
    }
    handleCallback()
  }, [])

  return (
    <Box p={8} textAlign="center">
      <p>Completing sign in...</p>
    </Box>
  )
}

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Box minH="100vh">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/liveaboard-guides" element={<LiveaboardGuides />} />
              <Route path="/marina-explorer" element={<MarinaExplorer />} />
              <Route path="/routes" element={<RouteExplorer />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
