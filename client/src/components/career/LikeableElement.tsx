import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';
import { Heart } from 'lucide-react';

interface LikeableElementProps {
  careerId: number;
  elementType: string;
  elementValue: string;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  initialLiked?: boolean;
}

const LikeableElement = ({
  careerId,
  elementType,
  elementValue,
  className = '',
  showText = false,
  size = 'md',
  initialLiked = false,
}: LikeableElementProps) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Query to check if this element is already liked
  const { data: likedStatus, isLoading: checkingLikeStatus } = useQuery({
    queryKey: [`/api/users/${user?.id}/check-liked-element`, careerId, elementType, elementValue],
    queryFn: async () => {
      if (!user) return { isLiked: false };
      
      const response = await apiRequest(
        'GET', 
        `/api/users/${user.id}/check-liked-element?careerId=${careerId}&elementType=${encodeURIComponent(elementType)}&elementValue=${encodeURIComponent(elementValue)}`
      );
      return await response.json();
    },
    enabled: !!user, // Only run this query if the user is logged in
  });
  
  // Update local state when we get data from the server
  useEffect(() => {
    if (likedStatus?.isLiked !== undefined) {
      setIsLiked(likedStatus.isLiked);
    }
  }, [likedStatus?.isLiked]);

  // Size classes
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  // Like/unlike mutation
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error('You must be logged in to like elements');
      }
      
      const action = isLiked ? 'unlike' : 'like';
      
      const response = await apiRequest('POST', '/api/career-elements/like', {
        careerId,
        elementType,
        elementValue,
        action, // Explicitly tell the server whether to like or unlike
      });
      
      return await response.json();
    },
    onSuccess: (data) => {
      // Determine if the action was a like or unlike
      const wasLiked = data.action === 'liked';
      
      // Update any relevant queries
      queryClient.invalidateQueries({ queryKey: [`/api/users/${user?.id}/liked-elements`] });
      queryClient.invalidateQueries({ queryKey: [`/api/users/${user?.id}/check-liked-element`, careerId, elementType, elementValue] });
      queryClient.invalidateQueries({ queryKey: [`/api/users/${user?.id}/personalized-feed`] });
      
      // Show toast
      toast({
        title: wasLiked ? 'Added to liked elements' : 'Removed from liked elements',
        description: wasLiked
          ? `You've added "${elementValue}" to your preferences. This helps personalize your recommendations.`
          : `You've removed "${elementValue}" from your liked elements`,
        duration: 3000,
      });
      
      // Set local state based on server response
      setIsLiked(wasLiked);
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    likeMutation.mutate();
  };

  return (
    <button
      onClick={handleLike}
      disabled={likeMutation.isPending}
      className={`group relative ${className}`}
      aria-label={isLiked ? `Unlike ${elementValue}` : `Like ${elementValue}`}
    >
      <div
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full 
          ${isLiked 
            ? 'bg-red-100 dark:bg-red-900/20' 
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
          } transition-all duration-200 ease-in-out`}
      >
        <Heart 
          className={`${
            size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'
          } ${
            isLiked 
              ? 'text-red-500 fill-red-500' 
              : 'text-gray-500 dark:text-gray-400 group-hover:text-red-500'
          } transition-colors`}
        />
      </div>
      
      {showText && (
        <span 
          className={`text-xs mt-1 block ${
            isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {isLiked ? 'Liked' : 'Like'}
        </span>
      )}
      
      {likeMutation.isPending && (
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
        </div>
      )}
    </button>
  );
};

export default LikeableElement;