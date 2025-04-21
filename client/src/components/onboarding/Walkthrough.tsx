import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

type Step = {
  id: number;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  icon: string;
};

const WALKTHROUGH_STEPS: Step[] = [
  {
    id: 1,
    title: 'Welcome to CareerCanvas!',
    description: 'Thanks for completing the quiz. Let\'s take a quick tour of your personalized dashboard.',
    target: 'body',
    position: 'center',
    icon: 'fa-rocket',
  },
  {
    id: 2,
    title: 'Career Cards',
    description: 'These cards show careers that match your preferences. Explore them to find paths that interest you.',
    target: '.career-card',
    position: 'bottom',
    icon: 'fa-id-card',
  },
  {
    id: 3,
    title: 'Like Career Elements',
    description: 'Click on individual aspects of careers that appeal to you to get more personalized recommendations.',
    target: '.career-card-buttons',
    position: 'top',
    icon: 'fa-thumbs-up',
  },
  {
    id: 4,
    title: 'View Career Details',
    description: 'Click on "View Details" to explore in-depth information about a career.',
    target: '.view-details-button',
    position: 'bottom',
    icon: 'fa-search',
  },
  {
    id: 5,
    title: 'AI Assistant',
    description: 'Your personal AI assistant can answer questions about careers and provide personalized guidance.',
    target: '.ai-assistant-button',
    position: 'left',
    icon: 'fa-robot',
  },
  {
    id: 6,
    title: 'Your Profile',
    description: 'Access your saved information and update your preferences in your profile.',
    target: '.profile-link',
    position: 'bottom',
    icon: 'fa-user',
  },
  {
    id: 7,
    title: 'You\'re All Set!',
    description: 'Enjoy exploring careers and discovering your perfect path. Remember, the more you interact, the more personalized your experience becomes!',
    target: 'body',
    position: 'center',
    icon: 'fa-check-circle',
  }
];

const Walkthrough = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  
  // Parse URL for walkthrough parameter
  const shouldShowWalkthrough = typeof window !== 'undefined' && window.location.search.includes('walkthrough=true');
  
  useEffect(() => {
    // Show the walkthrough immediately when component mounts
    setIsVisible(true);
    
    // Add class to body to prevent scrolling
    document.body.classList.add('overflow-hidden');
    
    return () => {
      // Cleanup
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const step = WALKTHROUGH_STEPS[currentStep];
    if (!step) return;
    
    // Find target element
    let targetElement: Element | null = null;
    
    if (step.target === 'body') {
      targetElement = document.body;
    } else {
      // Try to find the element by selector
      targetElement = document.querySelector(step.target);
      
      // If we couldn't find it, maybe we need to wait for rendering
      if (!targetElement) {
        const checkInterval = setInterval(() => {
          targetElement = document.querySelector(step.target);
          if (targetElement) {
            clearInterval(checkInterval);
            updatePosition(targetElement, step.position);
          }
        }, 300);
        
        return () => clearInterval(checkInterval);
      }
    }
    
    if (targetElement) {
      updatePosition(targetElement, step.position);
    }
  }, [currentStep, isVisible]);
  
  const updatePosition = (element: Element, positionType: string) => {
    if (positionType === 'center') {
      // Center in the viewport
      setPosition({
        top: window.innerHeight / 2 - 150,
        left: window.innerWidth / 2 - 200,
      });
      return;
    }
    
    const rect = element.getBoundingClientRect();
    let newPosition = { top: 0, left: 0 };
    
    switch (positionType) {
      case 'top':
        newPosition = {
          top: rect.top - 180,
          left: rect.left + (rect.width / 2) - 200,
        };
        break;
      case 'bottom':
        newPosition = {
          top: rect.bottom + 20,
          left: rect.left + (rect.width / 2) - 200,
        };
        break;
      case 'left':
        newPosition = {
          top: rect.top + (rect.height / 2) - 100,
          left: rect.left - 420,
        };
        break;
      case 'right':
        newPosition = {
          top: rect.top + (rect.height / 2) - 100,
          left: rect.right + 20,
        };
        break;
    }
    
    // Ensure tooltip is within viewport
    const tooltip = {
      width: 400,
      height: 200,
    };
    
    // Adjust if off-screen
    if (newPosition.top < 20) newPosition.top = 20;
    if (newPosition.left < 20) newPosition.left = 20;
    if (newPosition.left + tooltip.width > window.innerWidth - 20) {
      newPosition.left = window.innerWidth - tooltip.width - 20;
    }
    if (newPosition.top + tooltip.height > window.innerHeight - 20) {
      newPosition.top = window.innerHeight - tooltip.height - 20;
    }
    
    setPosition(newPosition);
  };
  
  const handleNext = () => {
    if (currentStep < WALKTHROUGH_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      closeWalkthrough();
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const closeWalkthrough = () => {
    setIsVisible(false);
    // Save that user has seen the walkthrough
    localStorage.setItem('walkthroughCompleted', 'true');
  };
  
  const handleSkip = () => {
    closeWalkthrough();
  };
  
  if (!isVisible) return null;
  
  const step = WALKTHROUGH_STEPS[currentStep];
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[999]"
            onClick={handleSkip}
          />
          
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[1000] bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-[400px]"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <i className={`fas ${step.icon} text-primary`}></i>
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">{step.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {WALKTHROUGH_STEPS.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentStep 
                          ? 'bg-primary' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  {currentStep > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrev}
                    >
                      Back
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    onClick={handleNext}
                  >
                    {currentStep === WALKTHROUGH_STEPS.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
            
            <button 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              onClick={handleSkip}
            >
              <i className="fas fa-times"></i>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Walkthrough;