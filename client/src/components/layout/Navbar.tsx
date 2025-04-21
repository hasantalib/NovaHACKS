import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/hooks/use-auth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  // Force logged-out state on landing page
  const isLandingPage = location === '/';

  // Get initials for avatar
  const getInitials = () => {
    if (!user) return '?';
    
    if (user.name) {
      const nameParts = user.name.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return user.name[0].toUpperCase();
    }
    
    return user.username[0].toUpperCase();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClass = `fixed top-0 left-0 w-full backdrop-blur-md z-50 transition-all duration-200
    ${isScrolled ? 'shadow-md py-2' : 'py-3'} 
    ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'}`;

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-md transform rotate-45"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-3 border-white rounded-sm flex items-center justify-center transform -rotate-45">
                <i className="fas fa-road text-white text-xs"></i>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
          </div>
          <Link href="/" className="text-xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            CareerCanvas
          </Link>
        </div>
        
        {user && !isLandingPage && (
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/careers" className={`font-medium hover:text-primary transition-colors ${location === '/careers' || location === '/dashboard' ? 'text-primary' : ''}`}>
              Browse Careers
            </Link>
            <Link href="/chat" className={`font-medium hover:text-primary transition-colors ${location === '/chat' ? 'text-primary' : ''}`}>
              AI Assistant
            </Link>
            <Link href="/profile" className={`font-medium hover:text-primary transition-colors ${location === '/profile' ? 'text-primary' : ''}`}>
              Profile
            </Link>
            <Link href="/settings" className={`font-medium hover:text-primary transition-colors ${location === '/settings' ? 'text-primary' : ''}`}>
              Settings
            </Link>
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
          
          {user && !isLandingPage ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 outline-none">
                  <Avatar className="h-9 w-9 border-2 border-primary/50">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name || user.username}</p>
                  {user.email && (
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/careers" className="cursor-pointer w-full">
                    <i className="fas fa-search mr-2 text-gray-500"></i>
                    Browse Careers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/chat" className="cursor-pointer w-full">
                    <i className="fas fa-robot mr-2 text-gray-500"></i>
                    AI Assistant
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer w-full">
                    <i className="fas fa-user mr-2 text-gray-500"></i>
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer w-full">
                    <i className="fas fa-cog mr-2 text-gray-500"></i>
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  {logoutMutation.isPending ? 'Signing out...' : 'Sign out'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth?tab=login" className="text-sm font-medium hover:text-primary transition-colors">
                Sign In
              </Link>
              
              <Link href="/auth?tab=register" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full font-medium transition-colors">
                Sign Up
              </Link>
            </>
          )}
          
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50">
          <div className="flex flex-col p-4 space-y-3">
            {/* Always show sign in message on landing page regardless of auth state */}
            {user && !isLandingPage ? (
              <>
                <Link 
                  href="/careers" 
                  className="font-medium py-2" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fas fa-search mr-2 text-gray-500"></i>
                  Browse Careers
                </Link>
                <Link 
                  href="/chat" 
                  className="font-medium py-2" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fas fa-robot mr-2 text-gray-500"></i>
                  AI Assistant
                </Link>
                <Link 
                  href="/profile" 
                  className="font-medium py-2" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fas fa-user mr-2 text-gray-500"></i>
                  Profile
                </Link>
                <Link 
                  href="/settings" 
                  className="font-medium py-2" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fas fa-cog mr-2 text-gray-500"></i>
                  Settings
                </Link>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="mb-2">Sign in to access career tools</p>
              </div>
            )}
            
            {/* Add authentication links based on user state */}
            <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
              {user && !isLandingPage ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <Avatar className="h-8 w-8 border-2 border-primary/50">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium">{user.name || user.username}</div>
                      {user.email && <div className="text-xs text-gray-500">{user.email}</div>}
                    </div>
                  </div>
                  <Link 
                    href="/profile" 
                    className="flex items-center font-medium py-2" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fas fa-user mr-2 text-gray-500"></i> Profile
                  </Link>
                  <button 
                    onClick={() => {
                      logoutMutation.mutate();
                      setMobileMenuOpen(false);
                    }}
                    disabled={logoutMutation.isPending}
                    className="flex items-center font-medium py-2 text-red-500 w-full text-left"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> 
                    {logoutMutation.isPending ? 'Signing out...' : 'Sign out'}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth?tab=login" 
                    className="flex items-center font-medium py-2" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fas fa-sign-in-alt mr-2 text-gray-500"></i> Sign In
                  </Link>
                  <Link 
                    href="/auth?tab=register" 
                    className="flex items-center font-medium py-2" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fas fa-user-plus mr-2 text-gray-500"></i> Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
