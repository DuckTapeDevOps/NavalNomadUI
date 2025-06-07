import { Box, Container, Heading, Text, VStack, SimpleGrid, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const LiveaboardGuides = () => {
  const guides = [
    {
      title: "Testing the Waters",
      description: "Learn how to experience liveaboard life without committing to a purchase",
      link: "/guides/testing-waters",
      icon: "🌊"
    },
    {
      title: "Boat Selection",
      description: "Find the perfect boat for your liveaboard lifestyle",
      link: "/guides/boat-selection",
      icon: "⛵"
    },
    {
      title: "Marina Living",
      description: "Everything you need to know about marina life and regulations",
      link: "/guides/marina-living",
      icon: "🏖️"
    },
    {
      title: "Digital Setup",
      description: "Set up your remote work environment on board",
      link: "/guides/digital-setup",
      icon: "💻"
    },
    {
      title: "Cost Breakdown",
      description: "Understand the financial aspects of liveaboard life",
      link: "/guides/cost-breakdown",
      icon: "💰"
    },
    {
      title: "Community",
      description: "Connect with other liveaboard digital nomads",
      link: "/guides/community",
      icon: "👥"
    }
  ]

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={12} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={6}>
            Liveaboard Guides
          </Heading>
          <Text fontSize="xl" maxW="2xl" mx="auto">
            Everything you need to know about transitioning to a liveaboard lifestyle while maintaining your digital career
          </Text>
        </Box>

        {/* Guide Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {guides.map((guide) => (
            <Box
              key={guide.title}
              p={6}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              _hover={{ shadow: "lg" }}
              transition="all 0.2s"
            >
              <VStack align="start" spacing={4}>
                <Text fontSize="4xl">{guide.icon}</Text>
                <Heading as="h3" size="lg">
                  {guide.title}
                </Heading>
                <Text>{guide.description}</Text>
                <Button
                  as={RouterLink}
                  to={guide.link}
                  colorScheme="blue"
                  variant="outline"
                  mt={2}
                >
                  Read Guide
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* CTA Section */}
        <Box textAlign="center" py={10} bg="gray.50" borderRadius="lg">
          <VStack spacing={6}>
            <Heading as="h2" size="xl">Ready to Take the Next Step?</Heading>
            <Text fontSize="lg">Explore our marina finder to locate liveaboard-friendly marinas in your area</Text>
            <Button
              as={RouterLink}
              to="/marina-explorer"
              colorScheme="blue"
              size="lg"
            >
              Find Marinas
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default LiveaboardGuides 