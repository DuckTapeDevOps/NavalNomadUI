import { Box, Flex, Button, Stack, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const Navbar = () => {
  const { user, signIn, signOut } = useAuth()

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
              to="/community"
              colorScheme="blue"
            >
              Community
            </Button>
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
              to="/map"
              variant="ghost"
            >
              Map
            </Button>
            <Button
              as={RouterLink}
              to="/contact"
              variant="ghost"
            >
              Contact
            </Button>
            {user ? (
              <Button
                onClick={signOut}
                colorScheme="blue"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                onClick={signIn}
                colorScheme="blue"
              >
                Sign In with Google
              </Button>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
} 