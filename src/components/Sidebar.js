import React from 'react';
import { Box, Flex, VStack, HStack, Text, Input } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <Box
      w="280px"
      bg="rgba(30, 41, 59, 0.9)"
      backdropFilter="blur(20px)"
      p={6}
      borderRight="1px solid rgba(148, 163, 184, 0.2)"
      boxShadow="0 0 50px rgba(0, 0, 0, 0.3)"
      h="100vh"
      overflowY="auto"
    >
      <Flex align="center" mb={8}>
        <Box w={8} h={8} bg="rgba(74, 85, 104, 0.6)" borderRadius="6px" mr={3} />
        <Input
          placeholder="Search tasks..."
          bg="rgba(51, 65, 85, 0.6)"
          backdropFilter="blur(10px)"
          border="1px solid rgba(148, 163, 184, 0.2)"
          p={3}
          borderRadius="12px"
          color="white"
          transition="all 0.3s ease"
          _placeholder={{ color: 'rgba(160, 174, 192, 0.8)' }}
          _focus={{
            borderColor: 'rgba(99, 179, 237, 0.5)',
            boxShadow: '0 0 0 3px rgba(99, 179, 237, 0.1)'
          }}
        />
      </Flex>

      <VStack align="stretch" spacing={1} mb={8}>
        <Text fontSize="11px" fontWeight="600" color="rgba(160, 174, 192, 0.8)" mb={2} textTransform="uppercase" letterSpacing="0.5px">
          LAYOUT
        </Text>
        <HStack
          p={3}
          borderRadius="12px"
          cursor="pointer"
          transition="all 0.3s ease"
          _hover={{ bg: 'rgba(51, 65, 85, 0.5)', transform: 'translateX(4px)' }}
        >
          <Text fontSize="14px" color="rgba(226, 232, 240, 0.8)">📋 List View</Text>
        </HStack>
        <HStack
          p={3}
          borderRadius="12px"
          cursor="pointer"
          transition="all 0.3s ease"
          bg="linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 179, 237, 0.1) 100%)"
          border="1px solid rgba(59, 130, 246, 0.3)"
          position="relative"
        >
          <Text fontSize="14px" color="#63b3ed">⊞ Grid View</Text>
        </HStack>
      </VStack>

      <VStack align="stretch" spacing={1} mb={8}>
        <Text fontSize="11px" fontWeight="600" color="rgba(160, 174, 192, 0.8)" mb={2} textTransform="uppercase" letterSpacing="0.5px">
          FILTERING
        </Text>
        <HStack
          p={3}
          borderRadius="12px"
          cursor="pointer"
          justify="space-between"
          transition="all 0.3s ease"
          _hover={{ bg: 'rgba(51, 65, 85, 0.5)', transform: 'translateX(4px)' }}
        >
          <HStack>
            <Box w="8px" h="8px" bg="#3182ce" borderRadius="50%" />
            <Text fontSize="14px" color="rgba(226, 232, 240, 0.8)">Active</Text>
          </HStack>
          <Text fontSize="12px" color="rgba(160, 174, 192, 0.8)">8</Text>
        </HStack>
        <HStack
          p={3}
          borderRadius="12px"
          cursor="pointer"
          justify="space-between"
          transition="all 0.3s ease"
          _hover={{ bg: 'rgba(51, 65, 85, 0.5)', transform: 'translateX(4px)' }}
        >
          <HStack>
            <Box w="8px" h="8px" bg="#718096" borderRadius="50%" />
            <Text fontSize="14px" color="rgba(226, 232, 240, 0.8)">Completed</Text>
          </HStack>
          <Text fontSize="12px" color="rgba(160, 174, 192, 0.8)">5</Text>
        </HStack>
      </VStack>

      <VStack align="stretch" spacing={1}>
        <Text fontSize="11px" fontWeight="600" color="rgba(160, 174, 192, 0.8)" mb={2} textTransform="uppercase" letterSpacing="0.5px">
          ADVANCED
        </Text>
        {['📅 Due Date', '📁 Per Project', '👤 Assigned By'].map((item, index) => (
          <HStack
            key={index}
            p={3}
            borderRadius="12px"
            cursor="pointer"
            transition="all 0.3s ease"
            _hover={{ bg: 'rgba(51, 65, 85, 0.5)', transform: 'translateX(4px)' }}
          >
            <Text fontSize="14px" color="rgba(226, 232, 240, 0.8)">{item}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
