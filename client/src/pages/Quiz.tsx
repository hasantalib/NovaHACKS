import { useState } from 'react';
import { useLocation } from 'wouter';
import QuizCard from '@/components/quiz/QuizCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Confetti } from '@/components/ui/confetti';
import { QuizQuestion } from '@/types';

// Quiz questions
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What environment do you prefer working in?",
    options: [
      { id: 'a', text: "Corporate Office", description: "Structured environment with clear hierarchies and processes", icon: "fa-building" },
      { id: 'b', text: "Remote Work", description: "Flexible schedule with freedom to work from anywhere", icon: "fa-home" },
      { id: 'c', text: "Outdoors", description: "Active work in natural settings with physical components", icon: "fa-tree" },
      { id: 'd', text: "Creative Studio", description: "Collaborative space focused on innovation and design", icon: "fa-flask" }
    ]
  },
  {
    id: 2,
    question: "Which skills do you enjoy using the most?",
    options: [
      { id: 'a', text: "Analytical Thinking", description: "Examining data, finding patterns, solving problems", icon: "fa-brain" },
      { id: 'b', text: "Creativity", description: "Developing original ideas, artistic expression", icon: "fa-paint-brush" },
      { id: 'c', text: "Communication", description: "Connecting with others, persuading, explaining", icon: "fa-comments" },
      { id: 'd', text: "Technical Skills", description: "Using tools, technology, and specialized knowledge", icon: "fa-cogs" }
    ]
  },
  {
    id: 3,
    question: "What's most important to you in a career?",
    options: [
      { id: 'a', text: "Work-Life Balance", description: "Flexibility and time for personal interests", icon: "fa-balance-scale" },
      { id: 'b', text: "High Income", description: "Maximum earning potential and financial security", icon: "fa-dollar-sign" },
      { id: 'c', text: "Making an Impact", description: "Contributing to society and helping others", icon: "fa-hands-helping" },
      { id: 'd', text: "Career Growth", description: "Advancement opportunities and professional development", icon: "fa-chart-line" }
    ]
  },
  {
    id: 4,
    question: "How do you prefer to learn new skills?",
    options: [
      { id: 'a', text: "Formal Education", description: "Structured courses, degrees, and programs", icon: "fa-graduation-cap" },
      { id: 'b', text: "Self-Directed Learning", description: "Independent research and practice", icon: "fa-book-open" },
      { id: 'c', text: "Hands-on Experience", description: "Learning by doing and experimenting", icon: "fa-hands" },
      { id: 'd', text: "Mentorship", description: "Working with experienced professionals", icon: "fa-user-friends" }
    ]
  },
  {
    id: 5,
    question: "What type of problems do you enjoy solving?",
    options: [
      { id: 'a', text: "Technical Challenges", description: "Fixing things, debugging, optimizing systems", icon: "fa-tools" },
      { id: 'b', text: "Creative Challenges", description: "Designing, innovating, finding novel solutions", icon: "fa-lightbulb" },
      { id: 'c', text: "People Challenges", description: "Resolving conflicts, understanding needs, building relationships", icon: "fa-users" },
      { id: 'd', text: "Business Challenges", description: "Increasing efficiency, growing revenue, reducing costs", icon: "fa-chart-bar" }
    ]
  },
  {
    id: 6,
    question: "How do you prefer to work with others?",
    options: [
      { id: 'a', text: "Leading Teams", description: "Managing projects and directing others", icon: "fa-user-tie" },
      { id: 'b', text: "Collaborative Work", description: "Working closely with teammates on shared goals", icon: "fa-users-cog" },
      { id: 'c', text: "Independent Work", description: "Self-directed tasks with autonomy", icon: "fa-user-ninja" },
      { id: 'd', text: "Supportive Role", description: "Helping others succeed in their objectives", icon: "fa-hands-helping" }
    ]
  },
  {
    id: 7,
    question: "Which industry interests you the most?",
    options: [
      { id: 'a', text: "Technology", description: "Software, hardware, digital products", icon: "fa-laptop-code" },
      { id: 'b', text: "Healthcare", description: "Medical services, wellness, patient care", icon: "fa-heartbeat" },
      { id: 'c', text: "Creative Arts", description: "Media, design, entertainment", icon: "fa-film" },
      { id: 'd', text: "Business & Finance", description: "Commerce, investment, enterprise", icon: "fa-briefcase" }
    ]
  },
  {
    id: 8,
    question: "What's your ideal work schedule?",
    options: [
      { id: 'a', text: "Standard 9-5", description: "Regular hours with weekends off", icon: "fa-calendar-alt" },
      { id: 'b', text: "Flexible Hours", description: "Variable schedule with core requirements", icon: "fa-clock" },
      { id: 'c', text: "Project-Based", description: "Intense work periods with breaks between", icon: "fa-project-diagram" },
      { id: 'd', text: "Shift Work", description: "Rotating schedule or non-standard hours", icon: "fa-calendar-week" }
    ]
  },
  {
    id: 9,
    question: "How comfortable are you with risk?",
    options: [
      { id: 'a', text: "Risk-Averse", description: "Prefer stability and certainty", icon: "fa-shield-alt" },
      { id: 'b', text: "Calculated Risks", description: "Comfortable with moderate, well-researched risks", icon: "fa-chart-pie" },
      { id: 'c', text: "Risk-Tolerant", description: "Open to uncertainty for potential rewards", icon: "fa-dice" },
      { id: 'd', text: "Risk-Seeking", description: "Embrace challenges and high-risk opportunities", icon: "fa-rocket" }
    ]
  },
  {
    id: 10,
    question: "What motivates you to do your best work?",
    options: [
      { id: 'a', text: "Recognition", description: "Acknowledgment of achievements and contributions", icon: "fa-trophy" },
      { id: 'b', text: "Personal Growth", description: "Learning and developing new capabilities", icon: "fa-seedling" },
      { id: 'c', text: "Financial Rewards", description: "Bonuses, raises, and monetary incentives", icon: "fa-coins" },
      { id: 'd', text: "Making a Difference", description: "Creating positive change for others", icon: "fa-heart" }
    ]
  },
  {
    id: 11,
    question: "Which best describes your communication style?",
    options: [
      { id: 'a', text: "Direct & Concise", description: "Straightforward, to-the-point communication", icon: "fa-bullhorn" },
      { id: 'b', text: "Detailed & Thorough", description: "Comprehensive, with complete information", icon: "fa-file-alt" },
      { id: 'c', text: "Diplomatic & Tactful", description: "Careful consideration of others' feelings", icon: "fa-handshake" },
      { id: 'd', text: "Visual & Demonstrative", description: "Using examples, illustrations, and stories", icon: "fa-image" }
    ]
  },
  {
    id: 12,
    question: "What level of structure do you prefer in your work?",
    options: [
      { id: 'a', text: "Highly Structured", description: "Clear guidelines and established processes", icon: "fa-tasks" },
      { id: 'b', text: "Moderately Structured", description: "Some guidelines with room for interpretation", icon: "fa-list-ul" },
      { id: 'c', text: "Loosely Structured", description: "General direction with significant flexibility", icon: "fa-feather" },
      { id: 'd', text: "Unstructured", description: "Open-ended problems with multiple approaches", icon: "fa-wind" }
    ]
  },
  {
    id: 13,
    question: "How important is work-related travel to you?",
    options: [
      { id: 'a', text: "No Travel", description: "Work exclusively from one location", icon: "fa-building" },
      { id: 'b', text: "Occasional Travel", description: "A few trips per year", icon: "fa-car-side" },
      { id: 'c', text: "Moderate Travel", description: "Regular travel (monthly)", icon: "fa-plane" },
      { id: 'd', text: "Frequent Travel", description: "Travel as a core part of the role", icon: "fa-globe-americas" }
    ]
  },
  {
    id: 14,
    question: "Which best describes your preferred pace of work?",
    options: [
      { id: 'a', text: "Steady & Consistent", description: "Regular workflow with predictable demands", icon: "fa-stream" },
      { id: 'b', text: "Dynamic & Fast-paced", description: "Quick decisions and rapid changes", icon: "fa-bolt" },
      { id: 'c', text: "Methodical & Thorough", description: "Careful and detail-oriented approach", icon: "fa-microscope" },
      { id: 'd', text: "Varied & Adaptable", description: "Different paces depending on the situation", icon: "fa-random" }
    ]
  },
  {
    id: 15,
    question: "What type of work environment helps you thrive?",
    options: [
      { id: 'a', text: "Competitive", description: "Performance-driven with targets and metrics", icon: "fa-trophy" },
      { id: 'b', text: "Collaborative", description: "Team-focused with shared goals", icon: "fa-people-carry" },
      { id: 'c', text: "Autonomous", description: "Self-directed with minimal oversight", icon: "fa-user-astronaut" },
      { id: 'd', text: "Supportive", description: "Mentorship and growth-oriented", icon: "fa-hand-holding-heart" }
    ]
  }
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const totalQuestions = QUIZ_QUESTIONS.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = () => {
    if (!selectedOption) {
      toast({
        title: "Selection Required",
        description: "Please select an option to continue",
        variant: "destructive"
      });
      return;
    }
    
    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedOption
    }));
    
    // Check if it's the last question
    if (currentQuestionIndex === totalQuestions - 1) {
      handleSubmitQuiz();
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null); // Reset selection for the next question
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Restore previous answer if it exists
      setSelectedOption(answers[QUIZ_QUESTIONS[currentQuestionIndex - 1].id] || null);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    
    try {
      // Save the final answer before submitting
      const finalAnswers = {
        ...answers,
        [currentQuestion.id]: selectedOption || answers[currentQuestion.id]
      };
      
      console.log("Submitting quiz answers:", finalAnswers);
      
      // Send only the answers object, userId will be added on the server
      await apiRequest('POST', '/api/quiz-results', { answers: finalAnswers });
      
      // Show completion animation
      setShowCompletion(true);
      
      // Redirect to dashboard with walkthrough flag after a delay
      setTimeout(() => {
        setLocation('/dashboard');
      }, 3000);
      
    } catch (error) {
      console.error("Quiz submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      {showCompletion ? (
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center py-20">
          <Confetti />
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-check text-3xl text-primary"></i>
          </div>
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-8">
            Thanks for sharing your preferences! We're building your personalized career recommendations.
          </p>
          <div className="animate-pulse">
            <p>Redirecting to your dashboard in a moment...</p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-poppins mb-4">Find Your Ideal Career Path</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Answer questions about your preferences, skills, and interests to discover matching career options.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {/* Progress bar */}
            <div className="mb-8 flex items-center">
              <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="ml-4 font-semibold">
                {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>
            
            {/* Question card */}
            <QuizCard
              question={currentQuestion}
              selectedOption={selectedOption}
              onOptionSelect={handleOptionSelect}
            />
            
            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Previous
              </Button>
              
              <Button 
                onClick={handleNextQuestion}
                disabled={!selectedOption || isSubmitting}
                className="flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Processing...
                  </>
                ) : currentQuestionIndex === totalQuestions - 1 ? (
                  <>
                    Complete Quiz
                    <i className="fas fa-check ml-2"></i>
                  </>
                ) : (
                  <>
                    Next Question
                    <i className="fas fa-arrow-right ml-2"></i>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
