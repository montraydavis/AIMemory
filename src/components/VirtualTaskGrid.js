import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import TaskCard from './TaskCard';

const VirtualTaskGrid = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  
  // Auto-scroll state
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const [mouseLastMoved, setMouseLastMoved] = useState(Date.now());
  const autoScrollIntervalRef = useRef(null);
  const mouseTimeoutRef = useRef(null);
  
  // Virtual scrolling state
  const [virtualState, setVirtualState] = useState({
    scrollTop: 0,
    containerHeight: 0,
    visibleRange: { start: 0, end: 0 },
    totalItems: 1000,
    estimatedItemHeight: 200,
    actualHeights: new Map(),
    columnHeights: [0, 0, 0],
    itemPositions: new Map()
  });

  // Incremental loading state
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [taskQueue, setTaskQueue] = useState([]);
  const [loadingStates, setLoadingStates] = useState(new Set());
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Multiple scroll thresholds for continuous loading
  const SCROLL_THRESHOLDS = [
    { distance: 800, cardsToAdd: 3 },
    { distance: 600, cardsToAdd: 2 },
    { distance: 400, cardsToAdd: 2 },
    { distance: 200, cardsToAdd: 1 }
  ];

  const baseTasks = [
    {
      title: "Integrate PayPal and Stripe checkout",
      project: "Payments",
      priority: "High",
      dueDate: "Today",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac diam mattis.",
      assignees: [
        { name: "Johnathan Doe", description: "Vestibulum sodales metus. Semper nunc faucibus integer!" }
      ],
      hasCheckbox: false
    },
    {
      title: "Fix unexpected crashes in mobile applications", 
      project: "Mobile applications",
      priority: "Medium",
      dueDate: "Tomorrow",
      description: "Investigation shows crashes occurring during data sync operations, particularly when users have poor network connectivity. Need to implement proper error handling and offline capabilities to improve app stability and user experience.",
      assignees: [
        { name: "Lorem Ipsum", description: "Senior mobile developer with expertise in crash analytics and performance optimization for iOS and Android platforms." },
        { name: "Jane Doe", description: "QA engineer specializing in mobile testing and crash reproduction across different device configurations and network conditions." },
        { name: "Oliver Jones", description: "DevOps specialist managing crash reporting infrastructure and monitoring systems to track application stability metrics." },
        { name: "Marcus Chen", description: "Product manager coordinating the fix rollout and user communication strategy." }
      ],
      hasCheckbox: false
    },
    {
      title: "Create Hi-Fi wireframes for Nike+ app",
      project: "Nike+", 
      priority: "High",
      dueDate: "11/02/15",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac diam mattis.",
      assignees: [
        { name: "Johnathan Doe", description: "Vestibulum sodales metus. Semper nunc faucibus integer!" },
        { name: "Christina Powell", description: "Vestibulum sodales metus." }
      ],
      hasCheckbox: true,
      isCompleted: true
    },
    {
      title: "Update database schema for v2.0",
      project: "System administration",
      priority: "Medium", 
      dueDate: "Tomorrow",
      description: "Quick schema update needed.",
      assignees: [
        { name: "Sarah Johnson", description: "Database architect." }
      ],
      hasCheckbox: false
    },
    {
      title: "Create reminder email template",
      project: "Newsletter design",
      priority: "High",
      dueDate: "Today", 
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac diam mattis.",
      assignees: [
        { name: "Johnathan Doe", description: "Vestibulum sodales metus. Semper nunc faucibus integer!" }
      ],
      hasCheckbox: true,
      isCompleted: true
    },
    {
      title: "Create comprehensive brand guidelines document",
      project: "Newsletter design",
      priority: "Low",
      dueDate: "Next week",
      description: "Create a comprehensive brand guidelines document that includes detailed specifications for logo usage, color palettes with hex codes, typography hierarchy, imagery guidelines, tone of voice, and application examples across digital and print media. This document will serve as the foundation for all future design work and ensure brand consistency across all touchpoints including websites, mobile apps, marketing materials, and internal communications.",
      assignees: [
        { name: "Lisa Park", description: "Senior brand designer with 8+ years of experience in visual identity development and brand strategy implementation." },
        { name: "Creative Director", description: "Overseeing brand consistency and strategic direction." },
        { name: "Marketing Lead", description: "Ensuring guidelines align with marketing strategy." }
      ],
      hasCheckbox: false
    },
    {
      title: "Implement user authentication system",
      project: "System administration",
      priority: "High",
      dueDate: "This week",
      description: "Build a secure authentication system with JWT tokens, password hashing, and role-based access control. Include features like password reset, email verification, and session management.",
      assignees: [
        { name: "Alex Rodriguez", description: "Backend developer specializing in security and authentication systems." },
        { name: "Security Team", description: "Ensuring compliance with security standards and best practices." }
      ],
      hasCheckbox: false
    },
    {
      title: "Design mobile app onboarding flow",
      project: "Mobile applications",
      priority: "Medium",
      dueDate: "Next Friday",
      description: "Create an intuitive onboarding experience for new users, including welcome screens, feature tutorials, and account setup process. Focus on reducing drop-off rates and improving user engagement.",
      assignees: [
        { name: "Emma Wilson", description: "UX/UI designer with expertise in mobile app design and user research." },
        { name: "Product Manager", description: "Defining user journey and conversion goals." }
      ],
      hasCheckbox: false
    },
    {
      title: "Optimize database query performance",
      project: "System administration",
      priority: "Low",
      dueDate: "End of month",
      description: "Analyze and optimize slow database queries, add proper indexing, and implement query caching strategies to improve overall application performance and reduce server load.",
      assignees: [
        { name: "David Kim", description: "Database performance specialist with 10+ years of experience." },
        { name: "DevOps Engineer", description: "Monitoring and implementing performance improvements." }
      ],
      hasCheckbox: false
    },
    {
      title: "Create social media campaign assets",
      project: "Newsletter design",
      priority: "Medium",
      dueDate: "Monday",
      description: "Design visual assets for upcoming social media campaigns across all platforms. Include variations for different sizes and formats, maintaining brand consistency and visual appeal.",
      assignees: [
        { name: "Sophie Chen", description: "Graphic designer specializing in social media and digital marketing." },
        { name: "Marketing Coordinator", description: "Coordinating campaign timeline and content strategy." }
      ],
      hasCheckbox: false
    },
    {
      title: "Implement real-time notifications",
      project: "Mobile applications",
      priority: "High",
      dueDate: "ASAP",
      description: "Add push notifications and in-app alerts for important updates, task assignments, and deadline reminders. Ensure cross-platform compatibility and user preference management.",
      assignees: [
        { name: "Mike Thompson", description: "Mobile developer with expertise in push notification systems." },
        { name: "QA Tester", description: "Testing notification delivery across different devices and scenarios." }
      ],
      hasCheckbox: false
    },
    {
      title: "Conduct user research interviews",
      project: "Nike+",
      priority: "Medium",
      dueDate: "Next week",
      description: "Schedule and conduct user interviews to gather feedback on current app features and identify opportunities for improvement. Document insights and create actionable recommendations.",
      assignees: [
        { name: "Rachel Green", description: "User researcher with experience in mobile app usability studies." },
        { name: "Product Designer", description: "Translating user insights into design improvements." }
      ],
      hasCheckbox: false
    },
    {
      title: "Set up automated testing pipeline",
      project: "System administration",
      priority: "Low",
      dueDate: "Two weeks",
      description: "Implement CI/CD pipeline with automated testing, code quality checks, and deployment automation. Include unit tests, integration tests, and end-to-end testing.",
      assignees: [
        { name: "Tom Anderson", description: "DevOps engineer specializing in CI/CD and automation." },
        { name: "QA Lead", description: "Defining testing strategies and quality standards." }
      ],
      hasCheckbox: false
    },
    {
      title: "Redesign landing page",
      project: "Newsletter design",
      priority: "High",
      dueDate: "This Friday",
      description: "Modernize the main landing page with improved visual hierarchy, better call-to-action placement, and mobile-first responsive design. Focus on conversion rate optimization.",
      assignees: [
        { name: "Jessica Lee", description: "Frontend developer with expertise in conversion optimization." },
        { name: "Marketing Manager", description: "Defining conversion goals and target metrics." }
      ],
      hasCheckbox: false
    },
    {
      title: "Plan quarterly team retreat",
      project: "System administration",
      priority: "Low",
      dueDate: "Next month",
      description: "Organize team building activities, workshops, and networking opportunities for the upcoming quarterly retreat. Coordinate logistics, budget, and participant feedback.",
      assignees: [
        { name: "HR Coordinator", description: "Managing logistics and team building activities." },
        { name: "Team Lead", description: "Defining retreat objectives and team goals." }
      ],
      hasCheckbox: false
    }
  ];

  // Generate large pool of tasks for smooth scrolling
  const generateTaskPool = useCallback((count = 200) => {
    const pool = [];
    for (let i = 0; i < count; i++) {
      const taskIndex = i % baseTasks.length;
      const baseTask = baseTasks[taskIndex];
      pool.push({
        ...baseTask,
        id: `task-${i}`,
        title: baseTask.title
      });
    }
    return pool;
  }, []);

  // Handle incremental scroll loading
  const handleIncrementalScroll = useCallback((scrollDistance) => {
    SCROLL_THRESHOLDS.forEach(({ distance, cardsToAdd }, index) => {
      if (scrollDistance < distance && !loadingStates.has(index)) {
        setLoadingStates(prev => new Set(prev).add(index));
        
        if (taskQueue.length >= cardsToAdd) {
          const cardsToDisplay = taskQueue.slice(0, cardsToAdd);
          const remainingQueue = taskQueue.slice(cardsToAdd);
          
          setDisplayedTasks(prev => [...prev, ...cardsToDisplay]);
          setTaskQueue(remainingQueue);
          
          setTimeout(() => {
            const newCards = generateTaskPool(cardsToAdd * 2);
            setTaskQueue(prev => [...prev, ...newCards]);
            setLoadingStates(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }, 50);
        }
      }
    });
  }, [taskQueue, loadingStates, generateTaskPool]);

  // Initialize with task pool and first batch
  useEffect(() => {
    const pool = generateTaskPool(200);
    setTaskQueue(pool.slice(0, 50));
    setDisplayedTasks(pool.slice(0, 12));
    setCurrentBatchIndex(12);
  }, [generateTaskPool]);

  // Auto-scroll functionality
  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) return;
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (!autoScrollPaused && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const currentScrollTop = container.scrollTop;
        const scrollStep = 2; // Smooth scroll step
        
        container.scrollTop = currentScrollTop + scrollStep;
      }
    }, 50); // 20 FPS for smooth scrolling
  }, [autoScrollPaused]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }, []);

  // Mouse movement detection with debouncing
  const handleMouseMove = useCallback(() => {
    const now = Date.now();
    setMouseLastMoved(now);
    setAutoScrollPaused(true);
    
    // Clear existing timeout
    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }
    
    // Set new timeout to resume auto-scroll after 3 seconds of no movement
    mouseTimeoutRef.current = setTimeout(() => {
      setAutoScrollPaused(false);
    }, 3000);
  }, []);

  // Mouse wheel detection to pause auto-scroll
  const handleWheel = useCallback(() => {
    const now = Date.now();
    setMouseLastMoved(now);
    setAutoScrollPaused(true);
    
    // Clear existing timeout
    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }
    
    // Set new timeout to resume auto-scroll after 3 seconds of no wheel activity
    mouseTimeoutRef.current = setTimeout(() => {
      setAutoScrollPaused(false);
    }, 3000);
  }, []);

  // Debounced mouse movement handler
  const debouncedMouseMove = useCallback(
    debounce(handleMouseMove, 100), // 100ms debounce
    [handleMouseMove]
  );

  // Debounced mouse wheel handler
  const debouncedWheel = useCallback(
    debounce(handleWheel, 50), // 50ms debounce for wheel events
    [handleWheel]
  );

  // Start/stop auto-scroll based on state
  useEffect(() => {
    if (autoScrollEnabled && !autoScrollPaused) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
    
    return () => stopAutoScroll();
  }, [autoScrollEnabled, autoScrollPaused, startAutoScroll, stopAutoScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoScroll();
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, [stopAutoScroll]);

  // Virtual scroll handler
  const handleVirtualScroll = useCallback((e) => {
    const scrollContainer = e.target;
    const scrollTop = scrollContainer.scrollTop;
    const scrollHeight = scrollContainer.scrollHeight;
    const clientHeight = scrollContainer.clientHeight;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    
    setVirtualState(prev => ({
      ...prev,
      scrollTop,
      containerHeight: clientHeight
    }));

    handleIncrementalScroll(distanceFromBottom);
  }, [handleIncrementalScroll]);

  // Update item height when measured
  const updateItemHeight = useCallback((virtualIndex, height) => {
    setVirtualState(prev => {
      const newActualHeights = new Map(prev.actualHeights);
      newActualHeights.set(virtualIndex, height);
      return {
        ...prev,
        actualHeights: newActualHeights
      };
    });
  }, []);

  // Apply masonry layout with complete reset
  useEffect(() => {
    const applyMasonryLayout = () => {
      const container = containerRef.current;
      if (!container) return;

      const cards = Array.from(container.children);
      if (!cards.length) return;

      const columnCount = 3;
      const gap = 20;
      const containerWidth = container.offsetWidth;
      const cardWidth = (containerWidth - (gap * (columnCount - 1))) / columnCount;

      // Always reset everything for stable layout
      container.columnHeights = new Array(columnCount).fill(0);
      
      // Clear all existing positioning
      cards.forEach(card => {
        card.classList.remove('positioned');
        card.style.position = 'static';
        card.style.left = 'auto';
        card.style.top = 'auto';
        card.style.width = 'auto';
        card.style.opacity = '1';
        card.style.transform = 'none';
      });

      // Process all cards in order for proper masonry layout
      cards.forEach((card, index) => {
        card.style.width = cardWidth + 'px';
        card.style.position = 'absolute';
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease';

        const shortestColumnIndex = container.columnHeights.indexOf(Math.min(...container.columnHeights));
        
        const left = shortestColumnIndex * (cardWidth + gap);
        const top = container.columnHeights[shortestColumnIndex];
        
        card.style.left = left + 'px';
        card.style.top = top + 'px';
        
        // Smooth entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });

        const cardHeight = card.offsetHeight;
        container.columnHeights[shortestColumnIndex] += cardHeight + gap;
        
        card.classList.add('positioned');
      });

      // Update container height
      const maxHeight = Math.max(...container.columnHeights);
      container.style.height = maxHeight + 'px';

      // Update virtual state
      setVirtualState(prev => ({
        ...prev,
        columnHeights: [...container.columnHeights]
      }));
    };

    const timer = requestAnimationFrame(applyMasonryLayout);
    return () => cancelAnimationFrame(timer);
  }, [displayedTasks]);

  // Apply fade effects based on viewport position
  useEffect(() => {
    const applyFadeEffects = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const cards = Array.from(container.children[0]?.children || []);

      cards.forEach((card) => {
        if (!card.classList.contains('positioned')) return;

        const cardTop = parseFloat(card.style.top) || 0;
        const cardHeight = card.offsetHeight;
        const cardBottom = cardTop + cardHeight;

        // Calculate visibility based on card position relative to viewport
        const isAboveViewport = cardBottom < scrollTop;
        const isBelowViewport = cardTop > scrollTop + clientHeight;
        const isInViewport = !isAboveViewport && !isBelowViewport;

        if (isInViewport) {
          // Card is fully visible
          card.style.opacity = '1';
          card.style.filter = 'none';
        } else if (isAboveViewport) {
          // Card is above viewport - fade out
          const distance = scrollTop - cardBottom;
          const fadeDistance = 200; // Start fading 200px before going out of view
          const opacity = Math.max(0, 1 - (distance / fadeDistance));
          card.style.opacity = opacity.toString();
          card.style.filter = `blur(${Math.min(2, distance / 100)}px)`;
        } else {
          // Card is below viewport - fade out
          const distance = cardTop - (scrollTop + clientHeight);
          const fadeDistance = 200; // Start fading 200px before going out of view
          const opacity = Math.max(0, 1 - (distance / fadeDistance));
          card.style.opacity = opacity.toString();
          card.style.filter = `blur(${Math.min(2, distance / 100)}px)`;
        }
      });
    };

    const timer = requestAnimationFrame(applyFadeEffects);
    return () => cancelAnimationFrame(timer);
  }, [virtualState.scrollTop, virtualState.containerHeight, displayedTasks]);

  // Handle resize with debouncing
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const container = containerRef.current;
        if (container) {
          container.columnHeights = null;
          Array.from(container.children).forEach(card => {
            card.classList.remove('positioned');
            card.style.position = 'static';
            card.style.left = 'auto';
            card.style.top = 'auto';
            card.style.width = 'auto';
          });
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Calculate total virtual height
  const totalVirtualHeight = Math.max(...virtualState.columnHeights) + 100;

  return (
    <Box 
      ref={scrollContainerRef}
      h="calc(100vh - 120px)"
      overflowY="auto"
      onScroll={handleVirtualScroll}
      onMouseMove={debouncedMouseMove}
      onWheel={debouncedWheel}
      sx={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(30, 41, 59, 0.3)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(148, 163, 184, 0.5)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(148, 163, 184, 0.7)',
          },
        },
      }}
    >
      <Box h={`${totalVirtualHeight}px`} position="relative">
        <Box 
          ref={containerRef}
          position="relative"
          maxW="1400px"
          pb={20}
        >
          {displayedTasks.map((task, index) => (
            <Box
              key={task.id}
              position="absolute"
              width="auto"
              transition="opacity 0.3s ease, filter 0.3s ease"
            >
              <TaskCard 
                {...task} 
                onHeightMeasured={(height) => updateItemHeight(index, height)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default VirtualTaskGrid;
