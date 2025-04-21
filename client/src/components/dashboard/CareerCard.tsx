import { useState } from 'react';
import { Link } from 'wouter';
import { Career } from '@/types';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface CareerCardProps {
  career: Career;
}

const CareerCard = ({ career }: CareerCardProps) => {
  const [isLiked, setIsLiked] = useState(career.isLiked || false);
  const [isSaved, setIsSaved] = useState(career.isSaved || false);
  const { toast } = useToast();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from liked careers" : "Added to liked careers",
      description: isLiked 
        ? "This career has been removed from your liked list" 
        : "This career has been added to your liked list",
    });
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved careers" : "Saved for later",
      description: isSaved 
        ? "This career has been removed from your saved list" 
        : "This career has been saved to your profile for later reference",
    });
  };

  // Function to get a gradient based on the career field
  const getGradient = (field: string) => {
    const gradients = {
      'Technology': 'from-blue-500 to-indigo-600',
      'Healthcare': 'from-emerald-500 to-teal-600',
      'Business': 'from-amber-500 to-orange-600',
      'Education': 'from-purple-500 to-violet-600',
      'Creative': 'from-pink-500 to-rose-600',
      'Engineering': 'from-sky-500 to-cyan-600',
      'Science': 'from-green-500 to-emerald-600',
      'Finance': 'from-yellow-500 to-amber-600',
      'default': 'from-gray-500 to-gray-600'
    };
    
    // @ts-ignore
    return gradients[field] || gradients.default;
  };
  
  // Function to get an icon based on the career field
  const getFieldIcon = (field: string) => {
    const icons = {
      'Technology': 'fa-laptop-code',
      'Healthcare': 'fa-heartbeat',
      'Business': 'fa-briefcase',
      'Education': 'fa-graduation-cap',
      'Creative': 'fa-paint-brush',
      'Engineering': 'fa-cogs',
      'Science': 'fa-flask',
      'Finance': 'fa-chart-line',
      'default': 'fa-star'
    };
    
    // @ts-ignore
    return icons[field] || icons.default;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="career-card bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      <div className="h-44 overflow-hidden relative">
        <div className={`w-full h-full bg-gradient-to-br ${getGradient(career.field)}`}>
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <i className={`fas ${getFieldIcon(career.field)} text-white text-xl`}></i>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="p-5 text-white w-full">
            <div className="flex justify-between items-start mb-1">
              <Badge className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                {career.match}% Match
              </Badge>
              
              <Badge 
                className={`${
                  career.growth >= 15 
                    ? 'bg-green-500/90' 
                    : career.growth >= 5 
                      ? 'bg-amber-500/90' 
                      : 'bg-gray-500/90'
                } text-white text-xs px-2 py-1 rounded-full`}
              >
                <i className="fas fa-chart-line mr-1"></i>
                {career.growth}% growth
              </Badge>
            </div>
            
            <h3 className="text-xl font-bold mt-1">{career.title}</h3>
            <p className="text-white/80 text-sm">{career.field}</p>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        {/* Salary section */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Salary Range
          </h4>
          <div className="flex items-center">
            <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${(career.salaryMax - career.salaryMin) / 2}%` }}
              ></div>
            </div>
            <div className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              ${career.salaryMin}k - ${career.salaryMax}k
            </div>
          </div>
          {career.medianSalary && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <i className="fas fa-info-circle mr-1"></i>
              Median: {career.medianSalary}
            </p>
          )}
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
          {career.description}
        </p>
        
        {/* Skills */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Key Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {career.skills.slice(0, 4).map((skill, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full px-2 py-1"
              >
                {skill}
              </span>
            ))}
            {career.skills.length > 4 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full px-2 py-1">
                +{career.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
        
        {/* Education (if available) */}
        {career.requiredEducation && (
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <i className="fas fa-graduation-cap mr-2 text-primary"></i>
              {career.requiredEducation}
            </div>
          </div>
        )}
        
        {/* Work setting/style (if available) */}
        {career.workSetting && (
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <i className="fas fa-building mr-2 text-primary"></i>
              {career.workSetting}
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link href={`/career/${career.id}`} className="view-details-button text-primary hover:text-primary/90 font-medium flex items-center">
            View Details
            <i className="fas fa-chevron-right ml-1 text-xs"></i>
          </Link>
          
          <div className="career-card-buttons flex space-x-2">
            <button 
              onClick={handleSave}
              className={`w-9 h-9 flex items-center justify-center rounded-full ${
                isSaved 
                  ? 'bg-primary/10 dark:bg-primary/20' 
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
              aria-label={isSaved ? "Unsave" : "Save"}
            >
              <i className={`fas fa-bookmark ${isSaved ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}></i>
            </button>
            
            <button 
              onClick={handleLike}
              className={`w-9 h-9 flex items-center justify-center rounded-full ${
                isLiked 
                  ? 'bg-red-100 dark:bg-red-900/20' 
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <i className={`fas fa-heart ${isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerCard;
