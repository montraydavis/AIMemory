import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import TaskGrid from './components/TaskGrid';
import { Box, Flex, Text } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      },
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex minH="100vh">
        <Sidebar />
        <Box flex={1} p={6}>
          <Flex align="center" justify="space-between" mb={6}>
            <Text
              fontSize="32px"
              fontWeight="700"
              bgGradient="linear(135deg, #f8fafc 0%, #cbd5e1 100%)"
              bgClip="text"
              letterSpacing="-0.02em"
            >
              Tasks
            </Text>
            <Box
              w="40px"
              h="40px"
              borderRadius="12px"
              bg="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
              border="2px solid rgba(59, 130, 246, 0.3)"
              boxShadow="0 4px 16px rgba(59, 130, 246, 0.2)"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                w="18px"
                h="18px"
                bg="rgba(255, 255, 255, 0.9)"
                borderRadius="50%"
              />
            </Box>
          </Flex>
          <TaskGrid />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
