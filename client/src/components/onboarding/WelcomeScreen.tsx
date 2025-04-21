import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeScreen = () => {
  const [step, setStep] = useState(0);
  const [, navigate] = useLocation();
  
  const messages = [
    {
      title: 'Welcome to CareerCanvas!',
      description: 'Your journey to finding the perfect career path starts here.'
    },
    {
      title: 'Personalized For You',
      description: 'We\'ll help you discover careers that match your unique skills, interests, and goals.'
    },
    {
      title: 'Let\'s Get Started',
      description: 'First, let\'s learn more about you through a quick quiz to understand your preferences.'
    }
  ];
  
  useEffect(() => {
    // Advance through the messages automatically
    const timer = setTimeout(() => {
      if (step < messages.length - 1) {
        setStep(step + 1);
      } else {
        // Navigate to quiz after showing all messages
        navigate('/quiz');
      }
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [step, navigate]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6 max-w-md"
        >
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              {step === 0 && <i className="fas fa-rocket text-3xl text-primary"></i>}
              {step === 1 && <i className="fas fa-user-check text-3xl text-primary"></i>}
              {step === 2 && <i className="fas fa-clipboard-list text-3xl text-primary"></i>}
            </div>
            <h1 className="text-3xl font-bold mb-3">{messages[step].title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{messages[step].description}</p>
          </div>
          
          <div className="flex justify-center space-x-2 mt-8">
            {messages.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === step 
                    ? 'bg-primary' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WelcomeScreen;