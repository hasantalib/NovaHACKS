import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { getQueryFn } from '@/lib/queryClient';

export function QuizGuard({ 
  component: Component
}: { 
  component: () => React.JSX.Element 
}) {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  // Fetch quiz results for the current user
  const {
    data: quizResults,
    isLoading: quizLoading,
  } = useQuery({
    queryKey: ['/api/quiz-results'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!user, // Only run query if user is logged in
  });
  
  // Determine if user has completed the quiz
  const hasCompletedQuiz = quizResults && 
    ((Array.isArray(quizResults) && quizResults.length > 0) || 
    (typeof quizResults === 'object' && Object.keys(quizResults).length > 0));
  
  useEffect(() => {
    // If auth and quiz data are loaded and user hasn't completed quiz, redirect to quiz
    if (!authLoading && !quizLoading && user && !hasCompletedQuiz) {
      setLocation('/quiz');
    }
  }, [authLoading, quizLoading, user, hasCompletedQuiz, setLocation]);
  
  // Show loading state while checking
  if (authLoading || quizLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // If user has completed quiz, render the protected component
  if (user && hasCompletedQuiz) {
    return <Component />;
  }
  
  // This will briefly show before redirect happens
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}