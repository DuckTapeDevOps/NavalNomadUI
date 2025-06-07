import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Home from './pages/Home'
import LiveaboardGuides from './pages/LiveaboardGuides'
import MarinaExplorer from './pages/MarinaExplorer'
import RouteExplorer from './pages/Routes'
import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    region: 'your-region',
    userPoolId: 'your-user-pool-id',
    userPoolWebClientId: 'your-client-id',
    oauth: {
      domain: 'your-domain',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'https://your-domain/auth/callback',
      redirectSignOut: 'https://your-domain',
      responseType: 'code'
    }
  }
})

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/liveaboard-guides" element={<LiveaboardGuides />} />
            <Route path="/marina-explorer" element={<MarinaExplorer />} />
            <Route path="/routes" element={<RouteExplorer />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App
