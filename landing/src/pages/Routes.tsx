import { Box, Container, Heading, Text, VStack, SimpleGrid, Button, Badge } from '@chakra-ui/react'

const Routes = () => {
  const routes = [
    {
      name: "Florida Keys Loop",
      season: "Winter",
      duration: "3-4 months",
      description: "Perfect winter escape with warm weather and crystal clear waters",
      difficulty: "Easy",
      highlights: ["Key West", "Bahia Honda", "Marathon"]
    },
    {
      name: "Chesapeake Bay Circuit",
      season: "Spring/Fall",
      duration: "2-3 months",
      description: "Rich history and diverse communities along the largest estuary in the US",
      difficulty: "Moderate",
      highlights: ["Annapolis", "Baltimore", "Norfolk"]
    },
    {
      name: "New England Coastal",
      season: "Summer",
      duration: "2-3 months",
      description: "Experience charming coastal towns and rich maritime history",
      difficulty: "Moderate",
      highlights: ["Martha's Vineyard", "Newport", "Portland"]
    }
  ]

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={12} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={6}>
            Popular Routes
          </Heading>
          <Text fontSize="xl" maxW="2xl" mx="auto">
            Discover seasonal routes perfect for liveaboard digital nomads
          </Text>
        </Box>

        {/* Route Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {routes.map((route) => (
            <Box
              key={route.name}
              p={6}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              _hover={{ shadow: "lg" }}
              transition="all 0.2s"
            >
              <VStack align="start" spacing={4}>
                <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                  <Heading as="h3" size="lg">
                    {route.name}
                  </Heading>
                  <Badge colorScheme="blue">{route.season}</Badge>
                </Box>
                <Text color="gray.600">Duration: {route.duration}</Text>
                <Text>{route.description}</Text>
                <Box>
                  <Text fontWeight="bold" mb={2}>Highlights:</Text>
                  <SimpleGrid columns={2} spacing={2}>
                    {route.highlights.map((highlight) => (
                      <Badge key={highlight} colorScheme="green" p={1}>
                        {highlight}
                      </Badge>
                    ))}
                  </SimpleGrid>
                </Box>
                <Button colorScheme="blue" variant="outline" width="100%">
                  View Route Details
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Seasonal Tips */}
        <Box bg="gray.50" p={8} borderRadius="lg">
          <VStack spacing={6} align="stretch">
            <Heading as="h2" size="xl" textAlign="center">
              Seasonal Tips
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <Box>
                <Heading as="h3" size="md" mb={4}>
                  Winter (Dec-Feb)
                </Heading>
                <Text>• Head south to Florida Keys or Bahamas</Text>
                <Text>• Book marinas in advance for popular destinations</Text>
                <Text>• Prepare for occasional cold fronts</Text>
              </Box>
              <Box>
                <Heading as="h3" size="md" mb={4}>
                  Summer (Jun-Aug)
                </Heading>
                <Text>• Explore New England or Great Lakes</Text>
                <Text>• Take advantage of longer daylight hours</Text>
                <Text>• Watch for hurricane season in the South</Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>

        {/* CTA Section */}
        <Box textAlign="center" py={10} bg="blue.50" borderRadius="lg">
          <VStack spacing={6}>
            <Heading as="h2" size="xl">Share Your Route</Heading>
            <Text fontSize="lg">Have a favorite route? Share your experience with the community</Text>
            <Button colorScheme="blue" size="lg">
              Submit Route
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Routes 