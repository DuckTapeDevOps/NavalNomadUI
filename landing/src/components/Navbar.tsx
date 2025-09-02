import { Box, Flex, Button, Stack, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <Box bg={useColorModeValue('white', 'gray.800')} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <RouterLink to="/">
          <Box fontWeight="bold" fontSize="xl">
            Naval Nomad
          </Box>
        </RouterLink>

        <Flex alignItems="center">
          <Stack direction="row" spacing={4}>
            <Button
              as={RouterLink}
              to="/liveaboard-guides"
              variant="ghost"
            >
              Guides
            </Button>
            <Button
              as={RouterLink}
              to="/marina-explorer"
              variant="ghost"
            >
              Marinas
            </Button>
            <Button
              as={RouterLink}
              to="/routes"
              variant="ghost"
            >
              Routes
            </Button>
            <Button
              as={RouterLink}
              to="/community"
              variant="ghost"
            >
              Community
            </Button>
            <Button
              as={RouterLink}
              to="/contact"
              colorScheme="blue"
            >
              Contact
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
} 