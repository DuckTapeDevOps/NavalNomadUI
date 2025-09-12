import { ChakraProvider, Box } from '@chakra-ui/react'
import theme from './theme'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Home from './pages/Home'
import MarinaExplorer from './pages/MarinaExplorer'
import RouteExplorer from './pages/Routes'
import Community from './pages/Community'
import { MapPage } from './pages/MapPage'
import Contact from './components/Contact'
import { AuthProvider } from './contexts/AuthContext'
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
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Box minH="100vh">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marina-explorer" element={<MarinaExplorer />} />
              <Route path="/routes" element={<RouteExplorer />} />
              <Route path="/community" element={<Community />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
