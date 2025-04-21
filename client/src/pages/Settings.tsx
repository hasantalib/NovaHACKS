import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Define theme colors
const themeColors = [
  { id: 'indigo', color: '#4f46e5', name: 'Indigo' },
  { id: 'purple', color: '#9333ea', name: 'Purple' },
  { id: 'rose', color: '#e11d48', name: 'Rose' },
  { id: 'emerald', color: '#10b981', name: 'Emerald' },
  { id: 'amber', color: '#f59e0b', name: 'Amber' },
  { id: 'sky', color: '#0ea5e9', name: 'Sky' },
  { id: 'cyan', color: '#06b6d4', name: 'Cyan' },
  { id: 'teal', color: '#14b8a6', name: 'Teal' },
  { id: 'blue', color: '#2563eb', name: 'Blue' },
  { id: 'pink', color: '#ec4899', name: 'Pink' },
];

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState('indigo');
  const [colorVariant, setColorVariant] = useState('vibrant');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  
  // Initialize settings from localStorage or defaults
  useEffect(() => {
    // Check for dark mode from document
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Get theme settings
    try {
      const themeData = localStorage.getItem('theme-settings');
      if (themeData) {
        const settings = JSON.parse(themeData);
        setSelectedColor(settings.color || 'indigo');
        setColorVariant(settings.variant || 'vibrant');
      }
      
      // Get notification settings
      const notifData = localStorage.getItem('notification-settings');
      if (notifData) {
        const settings = JSON.parse(notifData);
        setEmailNotifications(settings.email !== false);
        setAppNotifications(settings.app !== false);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }, []);
  
  // Apply theme color
  const applyThemeColor = (color: string, variant: string) => {
    try {
      // Update JSON theme file
      const themeData = {
        primary: color,
        variant: variant,
        radius: 0.5,
        appearance: isDarkMode ? 'dark' : 'light'
      };
      
      // In a real app, we would update the theme server-side
      // For now, we'll just store it in localStorage and show a toast
      localStorage.setItem('theme-settings', JSON.stringify({
        color,
        variant
      }));
      
      // This would actually update the theme in a real implementation
      // But for now we'll just show a toast
      toast({
        title: 'Theme updated',
        description: 'Your changes will take effect the next time you refresh the page.',
      });
    } catch (error) {
      console.error('Error applying theme:', error);
      toast({
        title: 'Error updating theme',
        description: 'There was a problem updating your theme settings.',
        variant: 'destructive',
      });
    }
  };
  
  // Handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    applyThemeColor(color, colorVariant);
  };
  
  // Handle variant selection
  const handleVariantChange = (variant: string) => {
    setColorVariant(variant);
    applyThemeColor(selectedColor, variant);
  };
  
  // Handle dark mode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    
    // Update the document classes
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Update the theme appearance
    const themeData = JSON.parse(localStorage.getItem('theme-settings') || '{}');
    themeData.appearance = checked ? 'dark' : 'light';
    localStorage.setItem('theme-settings', JSON.stringify(themeData));
    
    toast({
      title: `${checked ? 'Dark' : 'Light'} mode enabled`,
      description: `The application is now in ${checked ? 'dark' : 'light'} mode.`,
    });
  };
  
  // Handle notification settings
  const handleNotificationSettings = (type: 'email' | 'app', checked: boolean) => {
    if (type === 'email') {
      setEmailNotifications(checked);
    } else {
      setAppNotifications(checked);
    }
    
    // Save to localStorage
    const currentSettings = JSON.parse(localStorage.getItem('notification-settings') || '{}');
    currentSettings[type] = checked;
    localStorage.setItem('notification-settings', JSON.stringify(currentSettings));
    
    toast({
      title: 'Notification settings updated',
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${checked ? 'enabled' : 'disabled'}.`,
    });
  };
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Customize your CareerCanvas experience
          </p>
          
          <Tabs defaultValue="appearance">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize how CareerCanvas looks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Color Picker */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Theme Color</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {themeColors.map(theme => (
                        <div 
                          key={theme.id}
                          onClick={() => handleColorSelect(theme.color)}
                          className={`w-full aspect-square rounded-full cursor-pointer relative transition-all p-1 ${
                            selectedColor === theme.color ? 'scale-110 ring-2 ring-offset-2 ring-black dark:ring-white' : 'hover:scale-105'
                          }`}
                        >
                          <div 
                            className="w-full h-full rounded-full"
                            style={{ backgroundColor: theme.color }}
                          />
                          {selectedColor === theme.color && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <i className="fas fa-check"></i>
                            </div>
                          )}
                          <span className="sr-only">{theme.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Color Variant */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Color Style</h3>
                    <RadioGroup 
                      value={colorVariant} 
                      onValueChange={handleVariantChange}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="professional" id="professional" />
                        <Label htmlFor="professional">Professional</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vibrant" id="vibrant" />
                        <Label htmlFor="vibrant">Vibrant</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tint" id="tint" />
                        <Label htmlFor="tint">Tint</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Dark Mode Toggle */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Dark Mode</h3>
                    <div className="flex items-center space-x-4">
                      <Switch 
                        id="dark-mode" 
                        checked={isDarkMode}
                        onCheckedChange={handleDarkModeToggle}
                      />
                      <Label htmlFor="dark-mode">
                        {isDarkMode ? 'Dark mode enabled' : 'Light mode enabled'}
                      </Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Some changes may require a page refresh to fully take effect.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how you receive updates and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive email updates about new career matches and recommendations
                        </p>
                      </div>
                      <Switch 
                        checked={emailNotifications}
                        onCheckedChange={checked => handleNotificationSettings('email', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">In-App Notifications</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified within the app about updates and new features
                        </p>
                      </div>
                      <Switch 
                        checked={appNotifications}
                        onCheckedChange={checked => handleNotificationSettings('app', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Manage your account details and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-lg font-medium">{user?.name || user?.username}</span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-lg font-medium">{user?.email || 'No email provided'}</span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium mb-2">Data Privacy</h4>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" className="justify-start">
                          <i className="fas fa-download mr-2"></i>
                          Download My Data
                        </Button>
                        <Button variant="outline" className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20">
                          <i className="fas fa-trash-alt mr-2"></i>
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;