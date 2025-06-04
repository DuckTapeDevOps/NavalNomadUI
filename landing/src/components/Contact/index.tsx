import { Box, Container, Heading, Text, Stack, Button, Input, Textarea, VStack, useToast as useChakraToast } from '@chakra-ui/react'
import { useState } from 'react'

const Contact = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const toast = useChakraToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock form submission
    toast({
      title: 'Form submitted!',
      description: "This is a mock submission. In production, this would connect to Google Forms.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    // Reset form
    setEmail('')
    setName('')
    setMessage('')
  }

  return (
    <Box py={20} bg="gray.50">
      <Container maxW="container.xl">
        <Stack gap={12}>
          <Stack gap={4} textAlign="center">
            <Heading
              as="h2"
              size="xl"
              fontFamily="heading"
              color="navy.500"
            >
              Join the Waitlist
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
              Be among the first to experience Naval Nomad. Sign up for our waitlist to get early access and exclusive updates.
            </Text>
          </Stack>

          <Box
            as="form"
            onSubmit={handleSubmit}
            p={8}
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
          >
            <VStack gap={4}>
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Textarea
                placeholder="Tell us about your interest in Naval Nomad"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                width="full"
              >
                Join Waitlist
              </Button>
            </VStack>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Contact 