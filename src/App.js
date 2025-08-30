import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import VirtualTaskGrid from './components/VirtualTaskGrid';
import { Box, Flex, Text } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", sans-serif',
  },
  fontSizes: {
    xs: '11px',
    sm: '13px',
    base: '15px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", sans-serif',
        fontSize: 'sm',
        fontWeight: 'normal',
        lineHeight: '1.6',
        letterSpacing: '-0.01em',
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: '#f8fafc', // Pure white for main text
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", sans-serif',
      },
      variants: {
        primary: {
          color: '#f8fafc',
          fontWeight: 'semibold',
        },
        secondary: {
          color: '#e2e8f0', // Light gray for secondary
          fontWeight: 'normal',
        },
        tertiary: {
          color: '#cbd5e1', // Medium gray for tertiary
          fontWeight: 'normal',
        },
        muted: {
          color: '#94a3b8', // Muted but readable
          fontWeight: 'normal',
        },
        accent: {
          color: '#60a5fa', // Blue for links/actions
          fontWeight: 'medium',
        },
      },
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex minH="100vh" bg="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)">
        <Sidebar />
        <Box 
          flex={1} 
          p={{ base: 4, md: 6, lg: 8 }}
          maxW="100%"
          overflow="hidden"
        >
          {/* Minimal Header Section */}
          <Flex 
            align="center" 
            justify="space-between" 
            mb={4}
            p={3}
            bg="rgba(30, 41, 59, 0.6)"
            backdropFilter="blur(20px)"
            borderRadius="16px"
            border="1px solid rgba(148, 163, 184, 0.1)"
            boxShadow="
              0 4px 16px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(148, 163, 184, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.05)
            "
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
              opacity: 0.6
            }}
          >
            {/* Subtle background pattern */}
            <Box
              position="absolute"
              top="50%"
              right="-10%"
              w="120px"
              h="120px"
              borderRadius="50%"
              bg="radial-gradient(circle, rgba(148, 163, 184, 0.02) 0%, transparent 70%)"
              transform="translateY(-50%)"
              pointerEvents="none"
            />
            
            {/* Title Section */}
            <Flex direction="column" spacing={0}>
              <Text
                fontSize="lg"
                fontWeight="bold"
                bgGradient="linear(135deg, #f8fafc 0%, #e2e8f0 100%)"
                bgClip="text"
                letterSpacing="-0.01em"
                fontFamily="heading"
                textShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
                position="relative"
                zIndex={1}
                mb={0}
                lineHeight="1.2"
              >
                Tasks
              </Text>
              <Text
                fontSize="xs"
                color="muted"
                fontWeight="medium"
                fontFamily="body"
                opacity={0.8}
                lineHeight="1.2"
              >
                Manage your projects and track progress
              </Text>
            </Flex>

            {/* Minimal Action Button */}
            <Box
              w="32px"
              h="32px"
              borderRadius="10px"
              bg="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
              border="2px solid rgba(59, 130, 246, 0.4)"
              boxShadow="
                0 4px 16px rgba(59, 130, 246, 0.3),
                0 0 0 1px rgba(59, 130, 246, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              "
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              cursor="pointer"
              _hover={{
                transform: 'scale(1.05) rotate(5deg)',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.3)'
              }}
              _active={{
                transform: 'scale(0.98)',
                transition: 'all 0.1s ease'
              }}
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                opacity: 0.8
              }}
              role="button"
              tabIndex={0}
              aria-label="Add new task"
            >
              <Box
                w="14px"
                h="14px"
                bg="rgba(255, 255, 255, 0.95)"
                borderRadius="50%"
                boxShadow="0 2px 8px rgba(0, 0, 0, 0.2)"
              />
            </Box>
          </Flex>

          {/* Main Content Area */}
          <Box
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.1), transparent)',
              opacity: 0.5
            }}
          >
            <VirtualTaskGrid />
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
