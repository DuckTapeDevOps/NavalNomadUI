import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Home from './pages/Home'
import LiveaboardGuides from './pages/LiveaboardGuides'
import MarinaExplorer from './pages/MarinaExplorer'
import RouteExplorer from './pages/Routes'

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
