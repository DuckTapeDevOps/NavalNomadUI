import { Box, Container, Heading, Text, VStack, Input, InputGroup, InputLeftElement, SimpleGrid, Button } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const MarinaExplorer = () => {
  const featuredMarinas = [
    {
      name: "Miami Marina",
      location: "Miami, FL",
      description: "Prime location with excellent amenities and liveaboard community",
      rating: 4.8,
      price: "$$$"
    },
    {
      name: "Charleston Harbor Marina",
      location: "Charleston, SC",
      description: "Historic marina with modern facilities and strong liveaboard presence",
      rating: 4.6,
      price: "$$"
    },
    {
      name: "Norfolk Waterside Marina",
      location: "Norfolk, VA",
      description: "Urban marina with easy access to city amenities",
      rating: 4.5,
      price: "$$"
    }
  ]

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={12} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={6}>
            Marina Explorer
          </Heading>
          <Text fontSize="xl" maxW="2xl" mx="auto" mb={8}>
            Find liveaboard-friendly marinas along the East Coast
          </Text>
          
          {/* Search Bar */}
          <InputGroup maxW="2xl" mx="auto">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search by location, marina name, or amenities..."
              size="lg"
              borderRadius="full"
            />
          </InputGroup>
        </Box>

        {/* Map Placeholder */}
        <Box
          height="400px"
          bg="gray.100"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="xl" color="gray.500">
            Interactive Map Coming Soon
          </Text>
        </Box>

        {/* Featured Marinas */}
        <Box>
          <Heading as="h2" size="xl" mb={6}>
            Featured Marinas
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {featuredMarinas.map((marina) => (
              <Box
                key={marina.name}
                p={6}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
                _hover={{ shadow: "lg" }}
                transition="all 0.2s"
              >
                <VStack align="start" spacing={4}>
                  <Heading as="h3" size="md">
                    {marina.name}
                  </Heading>
                  <Text color="gray.600">{marina.location}</Text>
                  <Text>{marina.description}</Text>
                  <Box display="flex" justifyContent="space-between" width="100%">
                    <Text>Rating: {marina.rating}/5</Text>
                    <Text>Price: {marina.price}</Text>
                  </Box>
                  <Button colorScheme="blue" variant="outline" width="100%">
                    View Details
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* CTA Section */}
        <Box textAlign="center" py={10} bg="gray.50" borderRadius="lg">
          <VStack spacing={6}>
            <Heading as="h2" size="xl">Want to List Your Marina?</Heading>
            <Text fontSize="lg">Add your marina to our directory and reach potential liveaboard residents</Text>
            <Button colorScheme="blue" size="lg">
              List Your Marina
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default MarinaExplorer 