import { Box, Container, Heading, SimpleGrid, Text, VStack, Button, List, ListItem, ListIcon } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { CheckCircleIcon } from '@chakra-ui/icons'

const Home = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={16} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center" py={20}>
          <Heading as="h1" size="2xl" mb={6}>
            Welcome to Naval Nomad
          </Heading>
          <Text fontSize="xl" mb={8}>
            Live freely on the water while maintaining your digital lifestyle
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

        {/* What is a Naval Nomad */}
        <Box>
          <VStack spacing={8} align="stretch">
            <Heading as="h2" size="xl" textAlign="center">
              🌊 What Is a Naval Nomad?
            </Heading>
            <Text fontSize="lg">
              A Naval Nomad is someone who chooses to live freely, afloat. Not tied to one city. Not burdened by rent or mortgages. 
              Someone who wakes up with a sunrise on the water and works remotely with the world at their fingertips.
            </Text>
            <Box bg="blue.50" p={8} borderRadius="lg">
              <Heading as="h3" size="md" mb={4}>
                For many, it starts as a dream:
              </Heading>
              <List spacing={3}>
                <ListItem>• "What if I could live on a boat for a while?"</ListItem>
                <ListItem>• "What if my home moved with the seasons?"</ListItem>
                <ListItem>• "What if I didn't have to give up comfort or connectivity to explore the coast, the Keys, or the Caribbean?"</ListItem>
              </List>
            </Box>
          </VStack>
        </Box>

        {/* How We Help */}
        <Box>
          <VStack spacing={8} align="stretch">
            <Heading as="h2" size="xl" textAlign="center">
              🧭 Naval Nomad Changes That
            </Heading>
            <Text fontSize="lg" textAlign="center" mb={8}>
              We're building a platform that helps you test the waters—without the risk.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
                <VStack align="start" spacing={4}>
                  <Heading as="h3" size="md">Liveaboard Rentals</Heading>
                  <Text>Lease boats monthly or yearly from trusted owners ("Shiplords"), just like you'd rent an apartment.</Text>
                </VStack>
              </Box>
              <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
                <VStack align="start" spacing={4}>
                  <Heading as="h3" size="md">City & Marina Guides</Heading>
                  <Text>Find the best places to live afloat—from Wilmington to St. Pete to the Bahamas.</Text>
                </VStack>
              </Box>
              <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
                <VStack align="start" spacing={4}>
                  <Heading as="h3" size="md">Cruising Routes</Heading>
                  <Text>Learn about the Great Loop, the Intracoastal Waterway, or island hopping the Caribbean.</Text>
                </VStack>
              </Box>
              <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
                <VStack align="start" spacing={4}>
                  <Heading as="h3" size="md">Community Tips</Heading>
                  <Text>Packing lists, connectivity guides, weather apps, cost breakdowns, and more.</Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>

        {/* You Don't Have to Go All In */}
        <Box bg="gray.50" p={10} borderRadius="lg">
          <VStack spacing={8} align="stretch">
            <Heading as="h2" size="xl" textAlign="center">
              💡 You Don't Have to "Go All In" to Start
            </Heading>
            <Text fontSize="lg" textAlign="center" mb={8}>
              Naval Nomad is for anyone who's boat-curious:
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <Box>
                <List spacing={3}>
                  <ListItem display="flex" alignItems="center">
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Want to try a few months in a marina before buying? We got you.
                  </ListItem>
                </List>
              </Box>
              <Box>
                <List spacing={3}>
                  <ListItem display="flex" alignItems="center">
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Want to live off-grid while still making Zoom calls? That's the dream.
                  </ListItem>
                </List>
              </Box>
              <Box>
                <List spacing={3}>
                  <ListItem display="flex" alignItems="center">
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Want to downsize, but upgrade your lifestyle? Welcome aboard.
                  </ListItem>
                </List>
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>

        {/* CTA Section */}
        <Box textAlign="center" py={10} bg="blue.50" borderRadius="lg">
          <VStack spacing={6}>
            <Heading as="h2" size="xl">🌐 Ready to Start?</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} width="100%" maxW="3xl" mx="auto">
              <Button
                as={RouterLink}
                to="/liveaboard-guides"
                colorScheme="blue"
                size="lg"
                height="auto"
                py={4}
                whiteSpace="normal"
              >
                Browse our guides to learn what liveaboard life is really like
              </Button>
              <Button
                colorScheme="blue"
                variant="outline"
                size="lg"
                height="auto"
                py={4}
                whiteSpace="normal"
              >
                Join the waitlist to be first when listings go live
              </Button>
            </SimpleGrid>
            <Text fontSize="lg" mt={4}>
              You don't have to be rich to live on a boat.
              <br />
              You just have to be ready to float.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Home 