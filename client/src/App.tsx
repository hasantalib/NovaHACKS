import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Dashboard from "@/pages/Dashboard";
import CareerDetail from "@/pages/CareerDetail";
import AuthPage from "@/pages/AuthPage";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import AICompanion from "@/components/layout/AICompanion";
import WelcomeScreen from "@/components/onboarding/WelcomeScreen";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { AuthProvider, LandingPageProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { QuizGuard } from "@/components/auth/QuizGuard";

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => (
          <LandingPageProvider>
            <Home />
          </LandingPageProvider>
        )}
      </Route>
      <Route path="/auth" component={AuthPage} />
      <Route path="/welcome" component={WelcomeScreen} />
      <Route path="/quiz" component={Quiz} />
      <ProtectedRoute path="/dashboard">
        <QuizGuard component={Dashboard} />
      </ProtectedRoute>
      <ProtectedRoute path="/careers">
        <QuizGuard component={Dashboard} />
      </ProtectedRoute>
      <ProtectedRoute path="/career/:id">
        <QuizGuard component={CareerDetail} />
      </ProtectedRoute>
      <ProtectedRoute path="/chat">
        <QuizGuard component={() => <AICompanion fullPage={true} />} />
      </ProtectedRoute>
      <ProtectedRoute path="/profile">
        <QuizGuard component={Profile} />
      </ProtectedRoute>
      <ProtectedRoute path="/settings">
        <QuizGuard component={Settings} />
      </ProtectedRoute>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showAICompanion, setShowAICompanion] = useState(false);
  const [location] = useLocation();
  
  // Determine if we should show navbar and footer
  // Don't show them on welcome screen or quiz page
  const isWelcomePage = location === '/welcome';
  const isQuizPage = location === '/quiz' || location.startsWith('/quiz?');
  const isLandingPage = location === '/';
  const hideNavigation = isWelcomePage || isQuizPage;
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          {!hideNavigation && <Navbar />}
          <main className={`flex-grow ${hideNavigation ? 'pt-0' : 'pt-16'}`}>
            <Router />
          </main>
          {!hideNavigation && <Footer />}
          
          {/* Floating AI Assistant Button - only on authenticated pages after quiz (not on landing page) */}
          {!hideNavigation && !isLandingPage && (
            <button 
              onClick={() => setShowAICompanion(!showAICompanion)}
              className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50 animate-pulse duration-[4000ms]"
            >
              <i className="fas fa-robot text-xl"></i>
            </button>
          )}
          
          {showAICompanion && <AICompanion onClose={() => setShowAICompanion(false)} />}
        </div>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
