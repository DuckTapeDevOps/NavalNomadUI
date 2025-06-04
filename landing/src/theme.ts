import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6F0FF',
      100: '#B3D1FF',
      200: '#80B3FF',
      300: '#4D94FF',
      400: '#1A75FF',
      500: '#0057E6',
      600: '#0044B3',
      700: '#003180',
      800: '#001F4D',
      900: '#000C1A',
    },
    navy: {
      50: '#E6E8EB',
      100: '#B3B9C2',
      200: '#808A99',
      300: '#4D5B70',
      400: '#1A2C47',
      500: '#001D2E',
      600: '#001725',
      700: '#00111C',
      800: '#000B13',
      900: '#00050A',
    },
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Inter", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'navy.500',
      },
    },
  },
});

export default theme; 