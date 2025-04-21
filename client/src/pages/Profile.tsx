import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // Fetch user data
  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/users/me'],
  });

  const handleNotificationsChange = (checked: boolean) => {
    setNotificationsEnabled(checked);
    toast({
      title: checked ? "Notifications enabled" : "Notifications disabled",
      description: checked 
        ? "You will now receive notifications about new career recommendations" 
        : "You have disabled notifications for new career recommendations",
    });
  };

  // Mock data for badges and achievements
  const badges = [
    { id: 1, name: "Quiz Taker", description: "Completed the career assessment quiz", icon: "fa-clipboard-check" },
    { id: 2, name: "Explorer", description: "Viewed 10 different career paths", icon: "fa-compass" },
    { id: 3, name: "Engaged Learner", description: "Used the AI assistant 5 times", icon: "fa-robot" },
  ];

  const savedCareers = [
    { id: 1, title: "UX/UI Designer", match: 95, field: "Design" },
    { id: 2, title: "Data Scientist", match: 92, field: "Technology" },
    { id: 3, title: "Digital Marketing Manager", match: 87, field: "Marketing" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Profile header */}
            <div className="bg-gradient-to-r from-primary to-purple-500 px-6 py-8 text-white">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-white/20">
                  <AvatarFallback className="text-3xl bg-white/10">
                    {isLoading ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      user?.name?.charAt(0) || "U"
                    )}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold">
                    {isLoading ? "Loading..." : user?.name || "User Profile"}
                  </h1>
                  <p className="opacity-90 mb-4">
                    {isLoading ? "..." : user?.email || "user@example.com"}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge className="bg-white/20 hover:bg-white/30">
                      Profile complete: 75%
                    </Badge>
                    <Badge className="bg-white/20 hover:bg-white/30">
                      3 Saved Careers
                    </Badge>
                    <Badge className="bg-white/20 hover:bg-white/30">
                      2 Achievements
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile content */}
            <Tabs defaultValue="overview" className="p-6">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="saved">Saved Careers</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                    <h3 className="text-lg font-semibold mb-4">Career Quiz Results</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Quiz Completion</span>
                          <span className="text-sm">100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      
                      <div>
                        <p className="text-sm mb-2">Top Career Categories Based on Your Answers:</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Technology</span>
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Design</span>
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Business</span>
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <i className="fas fa-redo mr-2"></i>
                        Retake Quiz
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <i className="fas fa-search text-primary text-sm"></i>
                        </div>
                        <div>
                          <p className="font-medium">Viewed UX/UI Designer career</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 days ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <i className="fas fa-heart text-primary text-sm"></i>
                        </div>
                        <div>
                          <p className="font-medium">Liked Data Scientist career</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">3 days ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <i className="fas fa-clipboard-list text-primary text-sm"></i>
                        </div>
                        <div>
                          <p className="font-medium">Completed career assessment quiz</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 days ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <i className="fas fa-user-plus text-primary text-sm"></i>
                        </div>
                        <div>
                          <p className="font-medium">Created account</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">7 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold mb-4">Your Career Progress</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Track your progress toward finding your ideal career path.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">3/15</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Careers Explored</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">1</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved Career</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">3</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">AI Chats</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">2/10</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Achievements</p>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <i className="fas fa-chart-line mr-2"></i>
                      Get Career Recommendations
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Saved Careers</h3>
                {savedCareers.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {savedCareers.map(career => (
                      <div key={career.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm p-4 flex justify-between items-center">
                        <div>
                          <Badge className="bg-primary/10 text-primary mb-2">
                            {career.match}% Match
                          </Badge>
                          <h4 className="font-semibold">{career.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {career.field}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                            <i className="fas fa-external-link-alt"></i>
                          </Button>
                          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                            <i className="fas fa-times"></i>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-gray-400 mb-2">
                      <i className="fas fa-bookmark text-3xl"></i>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No saved careers yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Save careers you're interested in to review them later.
                    </p>
                    <Button variant="outline">
                      Browse Careers
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Your Achievements</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {badges.map(badge => (
                    <div key={badge.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm p-5 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <i className={`fas ${badge.icon} text-xl text-primary`}></i>
                      </div>
                      <h4 className="font-semibold mb-1">{badge.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {badge.description}
                      </p>
                    </div>
                  ))}

                  {/* Locked achievement */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 text-center opacity-70">
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-lock text-xl text-gray-400"></i>
                    </div>
                    <h4 className="font-semibold mb-1">Career Expert</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      View 25 different career paths
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                    <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Toggle between light and dark theme
                          </p>
                        </div>
                        <Switch 
                          checked={isDarkMode}
                          onCheckedChange={toggleTheme}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notifications</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive updates about new career recommendations
                          </p>
                        </div>
                        <Switch 
                          checked={notificationsEnabled}
                          onCheckedChange={handleNotificationsChange}
                        />
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                      <Button variant="destructive" className="w-full">
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        Sign Out
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                    <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label htmlFor="data-collection" className="font-medium">Data Collection</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Allow us to collect usage data to improve recommendations
                          </p>
                        </div>
                        <Switch id="data-collection" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label htmlFor="marketing-emails" className="font-medium">Marketing Emails</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive emails about career tips and opportunities
                          </p>
                        </div>
                        <Switch id="marketing-emails" defaultChecked={false} />
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                      <Button variant="outline" className="w-full text-red-500 hover:text-red-600">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
