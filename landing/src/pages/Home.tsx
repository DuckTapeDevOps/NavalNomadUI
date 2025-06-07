import { Box, Container, Heading, SimpleGrid, Text, VStack, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Home = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={12} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center" py={20}>
          <Heading as="h1" size="2xl" mb={6}>
            Welcome to Naval Nomad
          </Heading>
          <Text fontSize="xl" mb={8}>
            Discover the freedom of living on the water while maintaining your digital lifestyle
          </Text>
          <Button
            as={RouterLink}
            to="/liveaboard-guides"
            colorScheme="blue"
            size="lg"
          >
            Start Your Journey
          </Button>
        </Box>

        {/* Main Content Sections */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {/* Liveaboard Guides */}
          <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
            <VStack align="start" spacing={4}>
              <Heading as="h2" size="lg">🧭 Liveaboard Guides</Heading>
              <Text>Learn how to test the waters without buying a boat</Text>
              <Button as={RouterLink} to="/liveaboard-guides" variant="link">
                Explore Guides →
              </Button>
            </VStack>
          </Box>

          {/* Marina Explorer */}
          <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
            <VStack align="start" spacing={4}>
              <Heading as="h2" size="lg">📍 Marina Explorer</Heading>
              <Text>Find liveaboard-friendly marinas along the East Coast</Text>
              <Button as={RouterLink} to="/marina-explorer" variant="link">
                Explore Marinas →
              </Button>
            </VStack>
          </Box>

          {/* Routes */}
          <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
            <VStack align="start" spacing={4}>
              <Heading as="h2" size="lg">🗺️ Routes</Heading>
              <Text>Discover popular routes and seasonal tips</Text>
              <Button as={RouterLink} to="/routes" variant="link">
                View Routes →
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* CTA Section */}
        <Box textAlign="center" py={10} bg="gray.50" borderRadius="lg">
          <VStack spacing={6}>
            <Heading as="h2" size="xl">Ready to Start Your Journey?</Heading>
            <Text fontSize="lg">Sign up to be notified when boats in your area become available</Text>
            <Button colorScheme="blue" size="lg">
              Get Notified
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Home 