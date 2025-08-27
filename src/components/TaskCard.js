import React from 'react';
import { Box, Flex, VStack, HStack, Text } from '@chakra-ui/react';

const TaskCard = ({ title, project, priority, dueDate, description, assignees, isCompleted, hasCheckbox }) => {
  const priorityColors = {
    High: '#ef4444',
    Medium: '#f59e0b', 
    Low: '#10b981'
  };

  const projectColors = {
    Payments: '#3b82f6',
    'Mobile applications': '#f59e0b',
    'Nike+': '#10b981', 
    'System administration': '#8b5cf6',
    'Newsletter design': '#ef4444'
  };

  return (
    <Box
      bg="rgba(30, 41, 59, 0.8)"
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor="rgba(148, 163, 184, 0.2)"
      borderRadius="16px"
      p={5}
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        borderColor: 'rgba(148, 163, 184, 0.3)',
        zIndex: 10
      }}
    >
      <Flex align="center" mb={3}>
        {hasCheckbox && (
          <Box
            w="18px"
            h="18px"
            borderRadius="6px"
            mr={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="11px"
            transition="all 0.3s ease"
            bg={isCompleted ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent'}
            border={isCompleted ? '2px solid #10b981' : '2px solid rgba(148, 163, 184, 0.4)'}
            color={isCompleted ? 'white' : 'transparent'}
            boxShadow={isCompleted ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'}
          >
            {isCompleted && '✓'}
          </Box>
        )}
        <Text 
          fontSize="15px"
          fontWeight="600"
          color="#f8fafc"
          lineHeight="1.4"
          letterSpacing="-0.01em"
        >
          {title}
        </Text>
      </Flex>

      <HStack spacing={4} mb={2}>
        <HStack>
          <Box 
            w="10px"
            h="10px"
            borderRadius="50%"
            bg={projectColors[project]}
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.3)"
          />
          <Text fontSize="12px" color="rgba(148, 163, 184, 0.8)">Project:</Text>
          <Text fontSize="12px" color="#f1f5f9">{project}</Text>
        </HStack>
      </HStack>

      <HStack spacing={4} mb={4}>
        <HStack>
          <Box 
            w="10px"
            h="10px"
            borderRadius="50%"
            bg={priorityColors[priority]}
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.3)"
          />
          <Text fontSize="12px" color="rgba(148, 163, 184, 0.8)">Priority:</Text>
          <Text fontSize="12px" color="#f1f5f9">{priority}</Text>
        </HStack>
        <HStack>
          <Text fontSize="12px" color="rgba(148, 163, 184, 0.8)">Due:</Text>
          <Text fontSize="12px" color="#f1f5f9">{dueDate}</Text>
        </HStack>
      </HStack>

      <Text color="#94a3b8" fontSize="13px" lineHeight="1.4" mb={4}>
        {description}
      </Text>

      <VStack spacing={2} align="stretch" mb={4}>
        {assignees.map((assignee, index) => (
          <HStack key={index}>
            <Box
              w="36px"
              h="36px"
              borderRadius="12px"
              bg="linear-gradient(135deg, #64748b 0%, #475569 100%)"
              border="2px solid rgba(148, 163, 184, 0.2)"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                w="16px"
                h="16px"
                bg="rgba(248, 250, 252, 0.8)"
                borderRadius="50%"
              />
            </Box>
            <VStack align="start" spacing={0} flex={1}>
              <Text 
                fontSize="14px"
                fontWeight="600"
                color="#f1f5f9"
                letterSpacing="-0.01em"
              >
                {assignee.name}
              </Text>
              <Text fontSize="12px" color="#94a3b8" lineHeight="1.4">
                {assignee.description}
              </Text>
            </VStack>
          </HStack>
        ))}
      </VStack>

      <Box
        fontSize="12px"
        color="#64748b"
        p={2}
        bg="rgba(51, 65, 85, 0.3)"
        border="1px dashed rgba(148, 163, 184, 0.2)"
        borderRadius="8px"
        textAlign="center"
        transition="all 0.3s ease"
        cursor="pointer"
        _hover={{
          bg: 'rgba(51, 65, 85, 0.5)',
          borderColor: 'rgba(148, 163, 184, 0.4)',
          color: '#94a3b8'
        }}
      >
        Add comment
      </Box>
    </Box>
  );
};

export default TaskCard;
