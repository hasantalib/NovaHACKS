import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import DetailTabs from '@/components/career/DetailTabs';
import CareerInsightAI from '@/components/career/CareerInsightAI';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Career } from '@/types';

const CareerDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  // Fetch career details
  const { data: career, isLoading, error } = useQuery<Career>({
    queryKey: [`/api/careers/${id}`],
  });

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from liked careers" : "Added to liked careers",
      description: isLiked 
        ? "This career has been removed from your liked list" 
        : "This career has been added to your liked list",
    });
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved careers" : "Saved for later",
      description: isSaved 
        ? "This career has been removed from your saved list" 
        : "This career has been saved to your profile for later reference",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="h-60 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 mb-8 animate-pulse"></div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="col-span-2 space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    ))}
                  </div>
                  <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="text-red-500 mb-4">
            <i className="fas fa-exclamation-circle text-5xl"></i>
          </div>
          <h2 className="text-2xl font-bold mb-2">Career Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We couldn't find the career details you're looking for. It may have been removed or there was an error.
          </p>
          <div className="space-y-3">
            <Link href="/dashboard">
              <Button className="w-full">
                Return to Dashboard
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.location.reload()} className="w-full">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Use a safe career object for rendering to handle undefined case
  const safeCareer = career || {} as Career;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Career detail card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-60">
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-6 text-white w-full">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center mb-2 flex-wrap gap-2">
                        <Badge className="bg-primary text-white text-xs px-2 py-1 rounded-full mr-2">
                          {safeCareer.match}% Match
                        </Badge>
                        <Badge variant="secondary" className="text-xs px-2 py-1 rounded-full">
                          {safeCareer.field}
                        </Badge>
                      </div>
                      <h1 className="text-3xl font-semibold">{safeCareer.title}</h1>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleLike}
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${
                          isLiked ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'
                        } transition-colors`}
                        aria-label={isLiked ? "Unlike" : "Like"}
                      >
                        <i className={`fas fa-heart ${isLiked ? 'text-white' : 'text-white'}`}></i>
                      </button>
                      <button 
                        onClick={handleSave}
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${
                          isSaved ? 'bg-primary' : 'bg-white/20 hover:bg-white/30'
                        } transition-colors`}
                        aria-label={isSaved ? "Unsave" : "Save"}
                      >
                        <i className={`fas fa-bookmark ${isSaved ? 'text-white' : 'text-white'}`}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Career tabs */}
            <DetailTabs career={safeCareer} />
          </div>

          {/* Related careers */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-6">Related Careers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <Badge className="bg-primary/90 text-white text-xs px-2 py-1 rounded-full">
                          {85 + i}% Match
                        </Badge>
                        <h3 className="text-lg font-semibold mt-1">Related Career {i + 1}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Similar career path with overlapping skills and interests.
                    </p>
                    <Link href={`/career/${10 + i}`}>
                      <a className="text-primary hover:text-primary/90 text-sm font-medium flex items-center">
                        View Details
                        <i className="fas fa-chevron-right ml-1 text-xs"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back to dashboard button */}
          <div className="mt-10 text-center">
            <Link href="/dashboard">
              <Button variant="outline" className="inline-flex items-center">
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;
