import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import CareerCard from '@/components/dashboard/CareerCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Career } from '@/types';
import Walkthrough from '@/components/onboarding/Walkthrough';

const Dashboard = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('recommended');

  // Fetch career recommendations
  const { data: careers, isLoading, error } = useQuery({
    queryKey: ['/api/careers'],
  });

  // Filter careers based on current filters and search
  const filteredCareers = Array.isArray(careers) ? careers.filter((career: Career) => {
    // Apply search filter
    if (searchQuery && !career.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply category filters
    if (filter === 'high-growth' && (!career.growth || career.growth < 15)) {
      return false;
    }
    
    if (filter === 'high-salary' && (!career.salaryMax || career.salaryMax < 100000)) {
      return false;
    }
    
    return true;
  }) : [];

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const [location] = useLocation();
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  
  // Check for walkthrough parameter and local storage
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const walkthroughRequested = params.get('walkthrough') === 'true';
    const walkthroughCompleted = localStorage.getItem('walkthroughCompleted') === 'true';
    
    // Show walkthrough if it's explicitly requested or if the user hasn't seen it yet
    setShowWalkthrough(walkthroughRequested || !walkthroughCompleted);
  }, [location]);
  
  // Add CSS classes to career elements to help the walkthrough
  useEffect(() => {
    // Add classes to elements that the walkthrough needs to target
    const addClasses = () => {
      // Find career cards and add class
      const cards = document.querySelectorAll('.career-card');
      if (cards.length === 0) {
        // Career cards haven't been rendered yet
        const cardsInterval = setTimeout(addClasses, 500);
        return () => clearTimeout(cardsInterval);
      }

      // Find view details buttons
      const viewDetailsButtons = document.querySelectorAll('.view-details-button');
      
      // Find like buttons
      const likeButtons = document.querySelectorAll('.career-card-buttons');
      
      // Find AI assistant button
      const aiButton = document.querySelector('.fixed.bottom-6.right-6.w-14.h-14');
      if (aiButton) {
        aiButton.classList.add('ai-assistant-button');
      }
      
      // Find profile link
      const profileLinks = document.querySelectorAll('a[href="/profile"]');
      profileLinks.forEach(link => {
        link.classList.add('profile-link');
      });
    };
    
    addClasses();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {showWalkthrough && <Walkthrough />}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3">Your Career Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover and explore careers that match your skills, interests, and goals.
            </p>
          </div>

          {/* Tabs and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-primary to-purple-500 px-6 py-6 text-white">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Career Recommendations</h2>
                  <p className="opacity-90">Based on your interests and quiz results</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search careers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-white/20 border-white/30 placeholder:text-white/70 text-white w-full md:w-auto"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"></i>
                  </div>
                  <div className="bg-white/20 px-3 py-2 rounded-md text-sm flex items-center cursor-pointer">
                    <i className="fas fa-filter mr-2"></i>
                    <select 
                      className="bg-transparent outline-none cursor-pointer"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all" className="text-gray-800">All Careers</option>
                      <option value="high-growth" className="text-gray-800">High Growth</option>
                      <option value="high-salary" className="text-gray-800">High Salary</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="recommended" value={selectedTab} onValueChange={handleTabChange}>
              <div className="px-6 pt-4">
                <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="saved">Saved</TabsTrigger>
                  <TabsTrigger value="explore">Explore All</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="recommended" className="p-6 pt-4">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="bg-gray-100 dark:bg-gray-700 rounded-xl h-72 animate-pulse"></div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-10">
                    <div className="text-red-500 mb-2">
                      <i className="fas fa-exclamation-circle text-3xl"></i>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Error loading careers</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      We couldn't load your career recommendations. Please try again.
                    </p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                  </div>
                ) : filteredCareers.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="text-gray-400 mb-2">
                      <i className="fas fa-search text-3xl"></i>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No careers found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search or filters to see more results.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCareers.map((career: Career) => (
                        <CareerCard key={career.id} career={career} />
                      ))}
                    </div>

                    {filteredCareers.length > 9 && (
                      <div className="mt-8 text-center">
                        <Button variant="outline" className="inline-flex items-center">
                          <span>Load More Careers</span>
                          <i className="fas fa-chevron-down ml-2"></i>
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              <TabsContent value="saved" className="p-6 pt-4">
                <div className="text-center py-10">
                  <div className="text-gray-400 mb-2">
                    <i className="fas fa-bookmark text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-medium mb-2">No saved careers yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Save careers you're interested in to review them later.
                  </p>
                  <Button variant="outline" onClick={() => setSelectedTab('recommended')}>
                    Browse Recommended Careers
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="explore" className="p-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Would display a larger set of careers from broader categories */}
                  {/* For now we'll show the same careers as recommended */}
                  {filteredCareers.map((career: Career) => (
                    <CareerCard key={career.id} career={career} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Tips Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Tips for Exploring Careers</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-heart text-primary"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Save Favorites</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click the heart icon to save careers you're interested in for later comparison.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-robot text-primary"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Ask the AI</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use our AI assistant to get answers about specific careers or education paths.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-list-check text-primary"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Compare Details</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View detailed information for each career to find the perfect match for your goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
