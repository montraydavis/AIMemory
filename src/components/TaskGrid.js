import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import TaskCard from './TaskCard';

const TaskGrid = () => {
  const containerRef = useRef(null);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  // Get next batch of tasks for infinite scroll
  const getNextBatch = useCallback((startIndex, count = 15) => {
    const tasks = [];
    for (let i = 0; i < count; i++) {
      const taskIndex = (startIndex + i) % baseTasks.length;
      const baseTask = baseTasks[taskIndex];
      tasks.push({
        ...baseTask,
        id: `${startIndex + i}-${taskIndex}`,
        title: baseTask.title
      });
    }
    return tasks;
  }, []);

  // Initialize with first batch
  useEffect(() => {
    setDisplayedTasks(getNextBatch(0, 15));
  }, [getNextBatch]);

  // Load more tasks when scrolling
  const loadMoreTasks = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const nextBatch = getNextBatch(currentIndex + 15, 15);
      setDisplayedTasks(prev => [...prev, ...nextBatch]);
      setCurrentIndex(prev => prev + 15);
      setIsLoading(false);
    }, 300);
  }, [currentIndex, isLoading, getNextBatch]);

  // Handle scroll events for infinite scroll
  const handleScroll = useCallback((e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // Load more when user is near bottom (within 200px)
    if (scrollHeight - scrollTop - clientHeight < 200) {
      loadMoreTasks();
    }
  }, [loadMoreTasks]);

  // Apply masonry layout to cards
  useEffect(() => {
    const applyMasonryLayout = () => {
      const container = containerRef.current;
      if (!container) return;

      const cards = container.children;
      if (!cards.length) return;

      const columnCount = 3;
      const gap = 20;
      const containerWidth = container.offsetWidth;
      const cardWidth = (containerWidth - (gap * (columnCount - 1))) / columnCount;

      const columnHeights = new Array(columnCount).fill(0);

      Array.from(cards).forEach((card) => {
        card.style.width = cardWidth + 'px';
        card.style.position = 'absolute';

        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        
        card.style.left = (shortestColumnIndex * (cardWidth + gap)) + 'px';
        card.style.top = columnHeights[shortestColumnIndex] + 'px';

        const cardHeight = card.offsetHeight;
        columnHeights[shortestColumnIndex] += cardHeight + gap;
      });

      // Set container height to accommodate all cards
      const maxHeight = Math.max(...columnHeights);
      container.style.height = maxHeight + 'px';
    };

    // Apply layout after a short delay to ensure DOM is ready
    const timer = setTimeout(applyMasonryLayout, 100);
    
    // Also apply on window resize
    const handleResize = () => setTimeout(applyMasonryLayout, 100);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [displayedTasks]);

  return (
    <Box 
      ref={containerRef}
      position="relative"
      maxW="1400px"
      overflowY="auto"
      onScroll={handleScroll}
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
      {displayedTasks.map((task, index) => (
        <TaskCard key={task.id || index} {...task} />
      ))}
      {isLoading && (
        <Box
          position="absolute"
          bottom="20px"
          left="50%"
          transform="translateX(-50%)"
          p={4}
          bg="rgba(30, 41, 59, 0.9)"
          borderRadius="12px"
          border="1px solid rgba(148, 163, 184, 0.2)"
          color="rgba(148, 163, 184, 0.8)"
          fontSize="14px"
        >
          Loading more tasks...
        </Box>
      )}
    </Box>
  );
};

export default TaskGrid;
