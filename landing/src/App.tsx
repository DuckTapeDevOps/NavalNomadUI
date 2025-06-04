import { ChakraProvider, Box } from '@chakra-ui/react'
import theme from './theme'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Contact from './components/Contact'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Contact />
      </Box>
    </ChakraProvider>
  )
}

export default App
