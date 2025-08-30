import React, { useState } from 'react';
import { Box, Flex, VStack, HStack, Text, Input, Spinner, Tooltip } from '@chakra-ui/react';

const Sidebar = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [activeSection, setActiveSection] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.length > 0) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => setIsSearching(false), 800);
    } else {
      setIsSearching(false);
    }
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <Box
      w={{ base: "260px", md: "280px", lg: "300px" }}
      bg="rgba(30, 41, 59, 0.95)"
      backdropFilter="blur(24px)"
      p={{ base: 5, md: 6, lg: 7 }}
      borderRight="1px solid rgba(148, 163, 184, 0.15)"
      boxShadow="
        4px 0 20px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(148, 163, 184, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.05)
      "
      h="100vh"
      overflowY="auto"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        opacity: 0.5
      }}
      sx={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(148, 163, 184, 0.1)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(148, 163, 184, 0.3)',
          borderRadius: '3px',
          '&:hover': {
            background: 'rgba(148, 163, 184, 0.5)',
          },
        },
      }}
    >
      {/* Subtle background pattern */}
      <Box
        position="absolute"
        top="20%"
        right="-10%"
        w={{ base: "250px", md: "300px", lg: "350px" }}
        h={{ base: "250px", md: "300px", lg: "350px" }}
        borderRadius="50%"
        bg="radial-gradient(circle, rgba(148, 163, 184, 0.02) 0%, transparent 70%)"
        pointerEvents="none"
      />

      {/* Search Section */}
      <Flex align="center" mb={{ base: 7, md: 8, lg: 9 }}>
        <Box 
          w={{ base: 7, md: 8, lg: 9 }} 
          h={{ base: 7, md: 8, lg: 9 }} 
          bg="rgba(74, 85, 104, 0.6)" 
          borderRadius="12px" 
          mr={4}
          boxShadow="
            0 2px 4px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          "
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="sm"
          color="muted"
          fontWeight="semibold"
        >
          🔍
        </Box>
        <Box position="relative" flex={1}>
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            bg="rgba(51, 65, 85, 0.7)"
            backdropFilter="blur(12px)"
            border="1px solid rgba(148, 163, 184, 0.2)"
            p={4}
            borderRadius="18px"
            color="primary"
            fontSize="sm"
            fontWeight="normal"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _placeholder={{ color: 'muted' }}
            boxShadow="
              0 2px 8px rgba(0, 0, 0, 0.1),
              0 0 0 1px rgba(148, 163, 184, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.05)
            "
            _focus={{
              borderColor: 'accent',
              boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.15), 0 4px 12px rgba(0, 0, 0, 0.15)',
              bg: 'rgba(51, 65, 85, 0.9)',
              transform: 'scale(1.02)'
            }}
            _hover={{
              bg: 'rgba(51, 65, 85, 0.8)',
              borderColor: 'rgba(148, 163, 184, 0.3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(148, 163, 184, 0.08)'
            }}
            pr={isSearching ? 12 : 4}
            aria-label="Search tasks"
          />
          {isSearching && (
            <Box
              position="absolute"
              right={3}
              top="50%"
              transform="translateY(-50%)"
            >
              <Spinner size="sm" color="accent" />
            </Box>
          )}
        </Box>
      </Flex>

      {/* Layout Section */}
      <VStack align="stretch" spacing={3} mb={{ base: 7, md: 8, lg: 9 }}>
        <Text 
          fontSize="xs" 
          fontWeight="semibold" 
          color="muted" 
          mb={4} 
          textTransform="uppercase" 
          letterSpacing="0.5px" 
          fontFamily="body"
          textShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
        >
          LAYOUT
        </Text>
        <Tooltip label="Switch to list view" placement="right" hasArrow>
          <HStack
            p={4}
            borderRadius="18px"
            cursor="pointer"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            bg={activeSection === 'list' ? 'rgba(51, 65, 85, 0.6)' : 'rgba(51, 65, 85, 0.3)'}
            border="1px solid"
            borderColor={activeSection === 'list' ? 'rgba(148, 163, 184, 0.3)' : 'rgba(148, 163, 184, 0.1)'}
            boxShadow="
              0 2px 4px rgba(0, 0, 0, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.02)
            "
            onClick={() => handleSectionClick('list')}
            _hover={{ 
              bg: 'rgba(51, 65, 85, 0.7)', 
              transform: 'translateX(6px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(148, 163, 184, 0.25)'
            }}
            role="button"
            tabIndex={0}
            aria-pressed={activeSection === 'list'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSectionClick('list');
              }
            }}
          >
            <Text fontSize="sm" color="secondary" fontWeight="medium" fontFamily="body">📋 List View</Text>
          </HStack>
        </Tooltip>
        
        <Tooltip label="Switch to grid view" placement="right" hasArrow>
          <HStack
            p={4}
            borderRadius="18px"
            cursor="pointer"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            bg={activeSection === 'grid' ? 
              'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(99, 179, 237, 0.2) 100%)' : 
              'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(99, 179, 237, 0.15) 100%)'
            }
            border="1px solid"
            borderColor={activeSection === 'grid' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.4)'}
            position="relative"
            boxShadow={activeSection === 'grid' ? 
              '0 6px 16px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.12)' :
              '0 4px 12px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }
            onClick={() => handleSectionClick('grid')}
            _hover={{ 
              transform: 'translateX(6px)',
              boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.2)'
            }}
            role="button"
            tabIndex={0}
            aria-pressed={activeSection === 'grid'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSectionClick('grid');
              }
            }}
          >
            <Text fontSize="sm" color="accent" fontWeight="semibold" fontFamily="body">⊞ Grid View</Text>
            {activeSection === 'grid' && (
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                height="1px"
                background="linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)"
                opacity={0.9}
              />
            )}
          </HStack>
        </Tooltip>
      </VStack>

      {/* Filtering Section */}
      <VStack align="stretch" spacing={3} mb={{ base: 7, md: 8, lg: 9 }}>
        <Text 
          fontSize="xs" 
          fontWeight="semibold" 
          color="muted" 
          mb={4} 
          textTransform="uppercase" 
          letterSpacing="0.5px" 
          fontFamily="body"
          textShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
        >
          FILTERING
        </Text>
        <HStack
          p={4}
          borderRadius="18px"
          cursor="pointer"
          justify="space-between"
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          bg="rgba(51, 65, 85, 0.3)"
          border="1px solid rgba(148, 163, 184, 0.1)"
          boxShadow="
            0 2px 4px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.02)
          "
          _hover={{ 
            bg: 'rgba(51, 65, 85, 0.6)', 
            transform: 'translateX(6px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(148, 163, 184, 0.2)'
          }}
          role="button"
          tabIndex={0}
          aria-label="Filter by active tasks"
        >
          <HStack>
            <Box 
              w="12px" 
              h="12px" 
              bg="#3182ce" 
              borderRadius="50%"
              boxShadow="0 2px 4px rgba(49, 130, 206, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(49, 130, 206, 0.2) 0%, transparent 70%)',
                zIndex: -1
              }}
            />
            <Text fontSize="sm" color="secondary" fontWeight="medium" fontFamily="body">Active</Text>
          </HStack>
          <Text fontSize="xs" color="muted" fontWeight="semibold" fontFamily="body">8</Text>
        </HStack>
        <HStack
          p={4}
          borderRadius="18px"
          cursor="pointer"
          justify="space-between"
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          bg="rgba(51, 65, 85, 0.3)"
          border="1px solid rgba(148, 163, 184, 0.1)"
          boxShadow="
            0 2px 4px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.02)
          "
          _hover={{ 
            bg: 'rgba(51, 65, 85, 0.6)', 
            transform: 'translateX(6px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(148, 163, 184, 0.2)'
          }}
          role="button"
          tabIndex={0}
          aria-label="Filter by completed tasks"
        >
          <HStack>
            <Box 
              w="12px" 
              h="12px" 
              bg="#718096" 
              borderRadius="50%"
              boxShadow="0 2px 4px rgba(113, 128, 150, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(113, 128, 150, 0.2) 0%, transparent 70%)',
                zIndex: -1
              }}
            />
            <Text fontSize="sm" color="secondary" fontWeight="medium" fontFamily="body">Completed</Text>
          </HStack>
          <Text fontSize="xs" color="muted" fontWeight="semibold" fontFamily="body">5</Text>
        </HStack>
      </VStack>

      {/* Advanced Section */}
      <VStack align="stretch" spacing={3}>
        <Text 
          fontSize="xs" 
          fontWeight="semibold" 
          color="muted" 
          mb={4} 
          textTransform="uppercase" 
          letterSpacing="0.5px" 
          fontFamily="body"
          textShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
        >
          ADVANCED
        </Text>
        {[
          { icon: '📅', label: 'Due Date', desc: 'Sort by deadline' },
          { icon: '📁', label: 'Per Project', desc: 'Group by project' },
          { icon: '👤', label: 'Assigned By', desc: 'Filter by assignee' }
        ].map((item, index) => (
          <Tooltip key={index} label={item.desc} placement="right" hasArrow>
            <HStack
              p={4}
              borderRadius="18px"
              cursor="pointer"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              bg="rgba(51, 65, 85, 0.3)"
              border="1px solid rgba(148, 163, 184, 0.1)"
              boxShadow="
                0 2px 4px rgba(0, 0, 0, 0.05),
                inset 0 1px 0 rgba(255, 255, 255, 0.02)
              "
              _hover={{ 
                bg: 'rgba(51, 65, 85, 0.6)', 
                transform: 'translateX(6px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(148, 163, 184, 0.2)'
              }}
              role="button"
              tabIndex={0}
              aria-label={item.desc}
            >
              <Text fontSize="sm" color="secondary" fontWeight="medium" fontFamily="body">
                {item.icon} {item.label}
              </Text>
            </HStack>
          </Tooltip>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
