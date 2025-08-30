import React, { useRef, useEffect, useState } from 'react';
import { Box, Flex, VStack, HStack, Text, Tooltip, Spinner } from '@chakra-ui/react';

const TaskCard = ({ title, project, priority, dueDate, description, assignees, isCompleted, hasCheckbox, onHeightMeasured }) => {
  const cardRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Measure card height for virtual scrolling
  useEffect(() => {
    if (cardRef.current && onHeightMeasured) {
      const height = cardRef.current.offsetHeight;
      onHeightMeasured(height);
    }
  }, [title, description, assignees, onHeightMeasured]);

  const priorityColors = {
    High: '#ef4444',
    Medium: '#f59e0b', 
    Low: '#10b981'
  };

  const projectColors = {
    Payments: '#8b5cf6',
    'Mobile applications': '#f59e0b',
    'Nike+': '#10b981', 
    'System administration': '#6366f1',
    'Newsletter design': '#ec4899'
  };

  const handleCardClick = () => {
    setIsLoading(true);
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    // Handle checkbox logic here
  };

  return (
    <Box
      ref={cardRef}
      bg="rgba(30, 41, 59, 0.95)"
      backdropFilter="blur(24px)"
      border="1px solid"
      borderColor={isFocused ? 'rgba(96, 165, 250, 0.4)' : 'rgba(148, 163, 184, 0.15)'}
      borderRadius="24px"
      p={6}
      position="relative"
      overflow="hidden"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      boxShadow={isFocused ? `
        0 8px 32px rgba(96, 165, 250, 0.2),
        0 0 0 2px rgba(96, 165, 250, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.08)
      ` : `
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 0 0 1px rgba(148, 163, 184, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.05)
      `}
      _hover={{
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: `
          0 25px 50px -12px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(148, 163, 184, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.08)
        `,
        borderColor: 'rgba(148, 163, 184, 0.25)',
        zIndex: 10
      }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.4s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={handleCardClick}
      cursor="pointer"
      role="button"
      tabIndex={0}
      aria-label={`Task: ${title}. Project: ${project}. Priority: ${priority}. Due: ${dueDate}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Loading overlay */}
      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(30, 41, 59, 0.9)"
          backdropFilter="blur(8px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="24px"
          zIndex={20}
        >
          <VStack spacing={3}>
            <Spinner size="lg" color="accent" />
            <Text fontSize="sm" color="secondary" fontWeight="medium">
              Loading...
            </Text>
          </VStack>
        </Box>
      )}

      {/* Subtle background pattern */}
      <Box
        position="absolute"
        top="50%"
        right="-20%"
        w="200px"
        h="200px"
        borderRadius="50%"
        bg="radial-gradient(circle, rgba(148, 163, 184, 0.03) 0%, transparent 70%)"
        transform="translateY(-50%)"
        pointerEvents="none"
      />

      <Flex align="center" mb={4}>
        {hasCheckbox && (
          <Tooltip label={isCompleted ? "Mark as incomplete" : "Mark as complete"} placement="top" hasArrow>
            <Box
              w="22px"
              h="22px"
              borderRadius="10px"
              mr={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="13px"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              bg={isCompleted ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent'}
              border={isCompleted ? '2px solid #10b981' : '2px solid rgba(148, 163, 184, 0.3)'}
              color={isCompleted ? 'white' : 'transparent'}
              boxShadow={isCompleted ? 
                '0 4px 12px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 
                '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }
              _hover={{
                transform: isCompleted ? 'scale(1.1)' : 'scale(1.05)',
                boxShadow: isCompleted ? 
                  '0 6px 16px rgba(16, 185, 129, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)' : 
                  '0 4px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              onClick={handleCheckboxClick}
              cursor="pointer"
              role="checkbox"
              aria-checked={isCompleted}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCheckboxClick(e);
                }
              }}
            >
              {isCompleted && '✓'}
            </Box>
          </Tooltip>
        )}
        <Text 
          fontSize="base"
          fontWeight="semibold"
          color="primary"
          lineHeight="1.4"
          letterSpacing="-0.01em"
          fontFamily="body"
          textShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
        >
          {title}
        </Text>
      </Flex>

      <HStack spacing={4} mb={3}>
        <HStack>
          <Tooltip label={`Project: ${project}`} placement="top" hasArrow>
            <Box 
              w="14px"
              h="14px"
              borderRadius="50%"
              bg={projectColors[project]}
              boxShadow="0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${projectColors[project]}40 0%, transparent 70%)`,
                zIndex: -1
              }}
            />
          </Tooltip>
          <Text fontSize="xs" color="muted" fontWeight="medium" textTransform="uppercase" letterSpacing="0.5px" fontFamily="body">Project:</Text>
          <Text fontSize="sm" color="secondary" fontWeight="medium" fontFamily="body">{project}</Text>
        </HStack>
      </HStack>

      <HStack spacing={4} mb={5}>
        <HStack>
          <Tooltip label={`Priority: ${priority}`} placement="top" hasArrow>
            <Box 
              w="14px"
              h="14px"
              borderRadius="50%"
              bg={priorityColors[priority]}
              boxShadow="0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${priorityColors[priority]}40 0%, transparent 70%)`,
                zIndex: -1
              }}
            />
          </Tooltip>
          <Text fontSize="xs" color="muted" fontWeight="medium" textTransform="uppercase" letterSpacing="0.5px" fontFamily="body">Priority:</Text>
          <Text fontSize="sm" color="secondary" fontWeight="medium" fontFamily="body">{priority}</Text>
        </HStack>
        <HStack>
          <Text fontSize="xs" color="muted" fontWeight="medium" textTransform="uppercase" letterSpacing="0.5px" fontFamily="body">Due:</Text>
          <Text fontSize="sm" color="secondary" fontWeight="medium" fontFamily="body">{dueDate}</Text>
        </HStack>
      </HStack>

      <Text color="tertiary" fontSize="sm" lineHeight="1.6" mb={5} fontFamily="body">
        {description}
      </Text>

      <VStack spacing={3} align="stretch" mb={5}>
        {assignees.map((assignee, index) => (
          <HStack key={index}>
            <Box
              w="44px"
              h="44px"
              borderRadius="16px"
              bg="linear-gradient(135deg, #64748b 0%, #475569 100%)"
              border="2px solid rgba(148, 163, 184, 0.2)"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="
                0 4px 8px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              "
              transition="all 0.3s ease"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
              }}
            >
              <Box
                w="20px"
                h="20px"
                bg="rgba(248, 250, 252, 0.9)"
                borderRadius="50%"
                boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
              />
            </Box>
            <VStack align="start" spacing={1} flex={1}>
              <Text 
                fontSize="sm"
                fontWeight="semibold"
                color="primary"
                letterSpacing="-0.01em"
                fontFamily="body"
              >
                {assignee.name}
              </Text>
              <Text fontSize="xs" color="muted" lineHeight="1.4" fontFamily="body">
                {assignee.description}
              </Text>
            </VStack>
          </HStack>
        ))}
      </VStack>

      <Tooltip label="Add a comment to this task" placement="top" hasArrow>
        <Box
          fontSize="xs"
          color="muted"
          p={4}
          bg="rgba(51, 65, 85, 0.4)"
          border="1px dashed rgba(148, 163, 184, 0.3)"
          borderRadius="16px"
          textAlign="center"
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          cursor="pointer"
          fontWeight="medium"
          textTransform="uppercase"
          letterSpacing="0.5px"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            transition: 'left 0.5s ease'
          }}
          _hover={{
            bg: 'rgba(51, 65, 85, 0.6)',
            borderColor: 'rgba(148, 163, 184, 0.5)',
            color: 'secondary',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            _before: {
              left: '100%'
            }
          }}
          _focus={{
            outline: '2px solid rgba(96, 165, 250, 0.5)',
            outlineOffset: '2px'
          }}
          role="button"
          tabIndex={0}
          aria-label="Add comment to task"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              // Handle comment addition
            }
          }}
        >
          Add comment
        </Box>
      </Tooltip>
    </Box>
  );
};

export default TaskCard;
