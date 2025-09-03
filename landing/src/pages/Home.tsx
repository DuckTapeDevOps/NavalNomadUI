import { Box, Container, Heading, SimpleGrid, Text, VStack, Button, List, ListItem, ListIcon, Image, Link, HStack, Icon } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { FaInstagram, FaYoutube } from 'react-icons/fa'

const Home = () => {
  const influencers = [
    {
      name: "Sailing La Vagabonde",
      handle: "@sailinglavagabonde",
      platform: "youtube",
      followers: "2.8M",
      description: "Riley and Elayna's journey from Australia to the world",
      image: "https://i.ytimg.com/vi/your-video-id/maxresdefault.jpg"
    },
    {
      name: "Sailing Uma",
      handle: "@sailinguma",
      platform: "youtube",
      followers: "1.2M",
      description: "Dan and Kika's minimalist sailing adventures",
      image: "https://i.ytimg.com/vi/your-video-id/maxresdefault.jpg"
    },
    {
      name: "Sailing Zatara",
      handle: "@sailingzatara",
      platform: "youtube",
      followers: "1.5M",
      description: "Family of 6 living and sailing around the world",
      image: "https://i.ytimg.com/vi/your-video-id/maxresdefault.jpg"
    },
    {
      name: "Sailing Doodles",
      handle: "@sailingdoodles",
      platform: "instagram",
      followers: "500K",
      description: "Daily life and adventures of a liveaboard couple",
      image: "https://instagram.com/your-image.jpg"
    }
  ]

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={16} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center" py={20}>
          <Heading as="h1" size="3xl" mb={6} bgGradient="linear(to-r, navy.600, blue.600)" bgClip="text">
            Naval Nomad
          </Heading>
          <Text fontSize="xl" mb={8} maxW="3xl" mx="auto">
            Every marina is a potential floating village. Join the community that connects liveaboards 
            across marinas, making every dock feel like home.
          </Text>
          <VStack spacing={4}>
            <Button
              as={RouterLink}
              to="/community"
              colorScheme="blue"
              size="lg"
              px={8}
            >
              Join the Community
            </Button>
            <Text fontSize="sm" color="gray.600">
              You don't have to lose your community when you gain your freedom on the water.
            </Text>
          </VStack>
        </Box>

        {/* Community Focus */}
        <Box>
          <VStack spacing={8} align="stretch">
            <Heading as="h2" size="xl" textAlign="center">
              🌊 Building Community on the Water
            </Heading>
            <Text fontSize="lg" textAlign="center" maxW="3xl" mx="auto">
              Whether you're already living aboard or dreaming of the liveaboard lifestyle, 
              the biggest challenge isn't the boat or the logistics, it's finding your community.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <Box p={6} bg="blue.50" borderRadius="lg" textAlign="center">
                <Heading as="h3" size="md" mb={3} color="blue.600">Connect</Heading>
                <Text fontSize="sm">Find fellow liveaboards at your marina and beyond</Text>
              </Box>
              <Box p={6} bg="green.50" borderRadius="lg" textAlign="center">
                <Heading as="h3" size="md" mb={3} color="green.600">Share</Heading>
                <Text fontSize="sm">Review marinas, share local knowledge, and help others</Text>
              </Box>
              <Box p={6} bg="purple.50" borderRadius="lg" textAlign="center">
                <Heading as="h3" size="md" mb={3} color="purple.600">Explore</Heading>
                <Text fontSize="sm">Discover new marinas and plan your next adventure</Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>

        {/* Call to Action */}
        <Box bg="blue.50" p={10} borderRadius="lg" textAlign="center">
          <VStack spacing={6}>
            <Heading as="h2" size="xl" color="navy.600">
              Ready to Join the Community?
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Connect with fellow liveaboards, share your marina experiences, and help build 
              the network that makes every dock feel like home.
            </Text>
            <Button
              as={RouterLink}
              to="/community"
              colorScheme="blue"
              size="lg"
              px={8}
            >
              Join the Community
            </Button>
          </VStack>
        </Box>


      </VStack>
    </Container>
  )
}

export default Home 