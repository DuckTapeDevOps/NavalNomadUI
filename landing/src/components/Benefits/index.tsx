import { Box, Container, Heading, SimpleGrid, Stack, Text, Icon } from '@chakra-ui/react'
import { FaShip, FaLaptop, FaMoneyBillWave, FaGlobeAmericas } from 'react-icons/fa'

const benefits = [
  {
    icon: FaShip,
    title: 'For Shiplords',
    benefits: [
      'Generate passive income from your vessel',
      'Connect with responsible, long-term tenants',
      'Flexible rental terms and pricing',
      'Secure payment processing'
    ]
  },
  {
    icon: FaLaptop,
    title: 'For Naval Nomads',
    benefits: [
      'Find your perfect floating home',
      'Work remotely from anywhere',
      'Join a community of like-minded adventurers',
      'Experience life on the water'
    ]
  }
]

const Benefits = () => {
  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <Stack gap={12}>
          <Stack gap={4} textAlign="center">
            <Heading
              as="h2"
              size="xl"
              fontFamily="heading"
              color="navy.500"
            >
              Benefits for Everyone
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
              Whether you're a boat owner or a digital nomad, Naval Nomad offers unique advantages for your lifestyle.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
            {benefits.map((section, index) => (
              <Box
                key={index}
                p={8}
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                border="1px"
                borderColor="gray.100"
              >
                <Stack gap={6}>
                  <Box
                    w={12}
                    h={12}
                    bg="brand.50"
                    color="brand.500"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={section.icon} w={6} h={6} />
                  </Box>
                  <Heading as="h3" size="lg" color="navy.500">
                    {section.title}
                  </Heading>
                  <Stack gap={3}>
                    {section.benefits.map((benefit, idx) => (
                      <Text key={idx} color="gray.600" display="flex" alignItems="center" gap={2}>
                        <Box as="span" color="brand.500">•</Box>
                        {benefit}
                      </Text>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}

export default Benefits 