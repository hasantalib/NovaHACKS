import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronRight, 
  GraduationCap, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Info 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Career } from '@/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Animation variants for nodes and connections - defined outside components to be global
const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const connectionVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }
};

interface CareerPathVisualizerProps {
  currentCareer: Career;
}

const getRandomSkillOverlap = (skillsA: string[], skillsB: string[]) => {
  if (!skillsA || !skillsB) return [];
  const overlap = skillsA.filter(skill => skillsB.includes(skill));
  return overlap.slice(0, 3); // Return up to 3 shared skills
};

const getNodeColor = (field: string) => {
  const colorMap: Record<string, string> = {
    'Design': 'bg-purple-100 border-purple-500 dark:bg-purple-950 dark:border-purple-500',
    'Engineering': 'bg-blue-100 border-blue-500 dark:bg-blue-950 dark:border-blue-500',
    'Marketing': 'bg-green-100 border-green-500 dark:bg-green-950 dark:border-green-500', 
    'Content': 'bg-yellow-100 border-yellow-500 dark:bg-yellow-950 dark:border-yellow-500',
    'Management': 'bg-orange-100 border-orange-500 dark:bg-orange-950 dark:border-orange-500',
    'Data Science': 'bg-red-100 border-red-500 dark:bg-red-950 dark:border-red-500',
    'Finance': 'bg-emerald-100 border-emerald-500 dark:bg-emerald-950 dark:border-emerald-500',
    'Healthcare': 'bg-sky-100 border-sky-500 dark:bg-sky-950 dark:border-sky-500',
    'Education': 'bg-indigo-100 border-indigo-500 dark:bg-indigo-950 dark:border-indigo-500',
  };
  
  return colorMap[field] || 'bg-gray-100 border-gray-500 dark:bg-gray-800 dark:border-gray-500';
};

// Skills-based career path visualization
const SkillsBasedPath = ({ 
  currentCareer, 
  relatedCareers, 
  advancementPaths, 
  previousCareers,
  isExpanded 
}: { 
  currentCareer: Career, 
  relatedCareers: Career[],
  advancementPaths: Career[],
  previousCareers: Career[],
  isExpanded: boolean
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Previous potential career paths */}
      {previousCareers.length > 0 && (
        <div className={`grid ${isExpanded ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mb-10 w-full`}>
          {previousCareers.map((career, index) => (
            <motion.div
              key={`prev-${career.id}`}
              className={`relative ${getNodeColor(career.field)} border-2 rounded-lg p-4 shadow-sm`}
              initial="hidden"
              animate="visible"
              variants={nodeVariants}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{career.title}</h4>
                  <p className="text-xs text-muted-foreground">{career.field}</p>
                  
                  <div className="mt-2">
                    <p className="text-xs">Shared skills with {currentCareer.title}:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {getRandomSkillOverlap(career.skills || [], currentCareer.skills || []).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Badge className="bg-blue-500">Previous Step</Badge>
              </div>
              
              <div className="absolute bottom-0 right-4 transform translate-y-1/2">
                <motion.div 
                  className="text-primary" 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + 0.1 * index, duration: 0.5 }}
                >
                  <ArrowRight size={24} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Current career */}
      <motion.div
        className={`relative bg-primary/10 border-4 border-primary rounded-lg p-6 shadow-md max-w-2xl mb-10`}
        initial="hidden"
        animate="visible"
        variants={nodeVariants}
        transition={{ delay: 0.3 }}
      >
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Current Path</Badge>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{currentCareer.title}</h3>
            <p className="text-sm text-muted-foreground">{currentCareer.field}</p>
          </div>
          <div>
            <p className="text-sm font-medium">${currentCareer.salaryMin?.toLocaleString() || '50,000'} - ${currentCareer.salaryMax?.toLocaleString() || '100,000'}</p>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-2">Key Skills:</p>
            <div className="flex flex-wrap gap-1">
              {currentCareer.skills?.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Future advancement paths */}
      {advancementPaths.length > 0 && (
        <div className={`grid ${isExpanded ? 'grid-cols-3' : 'grid-cols-2'} gap-4 mb-10 w-full`}>
          {advancementPaths.map((career, index) => (
            <motion.div
              key={`adv-${career.id}`}
              className={`relative ${getNodeColor(career.field)} border-2 rounded-lg p-4 shadow-sm`}
              initial="hidden"
              animate="visible"
              variants={nodeVariants}
              transition={{ delay: 0.5 + 0.1 * index }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{career.title}</h4>
                  <p className="text-xs text-muted-foreground">{career.field}</p>
                  
                  {isExpanded && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        +${Math.round((career.salaryMin || 0) - (currentCareer.salaryMin || 0)).toLocaleString()} increase
                      </Badge>
                      
                      <p className="text-xs mt-2">New skills required:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {getRandomSkillOverlap(
                          (career.skills || []).filter(s => !(currentCareer.skills || []).includes(s)), 
                          career.skills || []
                        ).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <Badge className="bg-green-500">Next Step</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Lateral moves / Related careers */}
      {relatedCareers.filter(c => 
        !advancementPaths.find(adv => adv.id === c.id) && 
        !previousCareers.find(prev => prev.id === c.id)
      ).length > 0 && (
        <div className="mt-10 w-full">
          <h4 className="font-semibold mb-3">Lateral Career Transitions</h4>
          <div className={`grid ${isExpanded ? 'grid-cols-3' : 'grid-cols-2'} gap-4 w-full`}>
            {relatedCareers
              .filter(c => 
                !advancementPaths.find(adv => adv.id === c.id) && 
                !previousCareers.find(prev => prev.id === c.id)
              )
              .slice(0, isExpanded ? 6 : 4)
              .map((career, index) => (
                <motion.div
                  key={`rel-${career.id}`}
                  className={`relative ${getNodeColor(career.field)} border-2 rounded-lg p-4 shadow-sm`}
                  initial="hidden"
                  animate="visible"
                  variants={nodeVariants}
                  transition={{ delay: 0.7 + 0.1 * index }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{career.title}</h4>
                      <p className="text-xs text-muted-foreground">{career.field}</p>
                      
                      <div className="mt-2">
                        <p className="text-xs">Skill overlap:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {getRandomSkillOverlap(career.skills || [], currentCareer.skills || []).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Badge className="bg-yellow-500 text-black">Lateral Move</Badge>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Education-based career path visualization
const EducationBasedPath = ({ 
  currentCareer, 
  educationPaths,
  advancementPaths,
  isExpanded 
}: { 
  currentCareer: Career, 
  educationPaths: Array<{name: string, description: string, timeframe: string}>,
  advancementPaths: Career[],
  isExpanded: boolean
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Current career */}
      <motion.div
        className={`relative bg-primary/10 border-4 border-primary rounded-lg p-6 shadow-md max-w-2xl mb-8`}
        initial="hidden"
        animate="visible"
        variants={nodeVariants}
        transition={{ delay: 0.3 }}
      >
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Current Career</Badge>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{currentCareer.title}</h3>
            <p className="text-sm text-muted-foreground">Required education: {currentCareer.requiredEducation || 'Bachelor\'s Degree'}</p>
          </div>
        </div>
      </motion.div>
      
      {/* Education paths */}
      <div className="mb-10 w-full">
        <h4 className="font-semibold mb-3 text-center">Education Pathways</h4>
        <div className={`grid ${isExpanded ? 'grid-cols-2' : 'grid-cols-1'} gap-8 w-full`}>
          {educationPaths && educationPaths.length > 0 ? (
            educationPaths.map((path, index) => (
              <motion.div
                key={`edu-${index}`}
                className="relative bg-blue-50 border-2 border-blue-500 dark:bg-blue-950 dark:border-blue-400 rounded-lg p-4 shadow-sm"
                initial="hidden"
                animate="visible"
                variants={nodeVariants}
                transition={{ delay: 0.5 + 0.1 * index }}
              >
                <div className="absolute -top-3 left-4">
                  <Badge className="bg-blue-600">
                    <GraduationCap className="mr-1 h-3 w-3" /> Education
                  </Badge>
                </div>
                
                <h4 className="font-semibold text-lg mt-2">{path.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">Timeframe: {path.timeframe}</p>
                
                {isExpanded && (
                  <p className="text-sm">{path.description}</p>
                )}
                
                {/* Only show arrow for the first education path to advancement */}
                {index === 0 && advancementPaths.length > 0 && (
                  <div className="absolute bottom-0 right-4 transform translate-y-1/2">
                    <motion.div 
                      className="text-primary" 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <ArrowRight size={24} />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div
              className="relative bg-gray-50 border-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-lg p-4 shadow-sm"
              initial="hidden"
              animate="visible"
              variants={nodeVariants}
              transition={{ delay: 0.5 }}
            >
              <h4 className="font-semibold">Bachelor's Degree</h4>
              <p className="text-xs text-muted-foreground mb-2">Timeframe: 4 Years</p>
              
              {isExpanded && (
                <p className="text-sm">Completing a bachelor's degree in a relevant field is typically required for this position.</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Future advancement paths from education */}
      {advancementPaths.length > 0 && (
        <div className="mt-6 w-full">
          <h4 className="font-semibold mb-3 text-center">Advanced Career Opportunities</h4>
          <div className={`grid ${isExpanded ? 'grid-cols-3' : 'grid-cols-2'} gap-4 w-full`}>
            {advancementPaths.map((career, index) => (
              <motion.div
                key={`adv-edu-${career.id}`}
                className={`relative ${getNodeColor(career.field)} border-2 rounded-lg p-4 shadow-sm`}
                initial="hidden"
                animate="visible"
                variants={nodeVariants}
                transition={{ delay: 0.8 + 0.1 * index }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{career.title}</h4>
                    <p className="text-xs text-muted-foreground">{career.field}</p>
                    
                    {isExpanded && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          +${Math.round((career.salaryMin || 0) - (currentCareer.salaryMin || 0)).toLocaleString()} increase
                        </Badge>
                        
                        {career.requiredEducation && (
                          <p className="text-xs mt-2">Required education: {career.requiredEducation}</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <Badge className="bg-green-500">Advanced Role</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Field transitions path visualization
const FieldTransitionsPath = ({ 
  currentCareer, 
  relatedCareers,
  isExpanded 
}: { 
  currentCareer: Career, 
  relatedCareers: Career[],
  isExpanded: boolean
}) => {
  // Group related careers by field
  const careersByField = relatedCareers.reduce((acc, career) => {
    const field = career.field;
    if (!acc[field]) {
      acc[field] = [];
    }
    acc[field].push(career);
    return acc;
  }, {} as Record<string, Career[]>);
  
  return (
    <div className="flex flex-col items-center">
      {/* Current career field */}
      <motion.div
        className={`relative bg-primary/10 border-4 border-primary rounded-lg p-6 shadow-md max-w-lg mb-16`}
        initial="hidden"
        animate="visible"
        variants={nodeVariants}
        transition={{ delay: 0.3 }}
      >
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Current Field</Badge>
        <div className="text-center">
          <h3 className="text-xl font-bold">{currentCareer.field}</h3>
          <p className="text-sm text-muted-foreground">Current position: {currentCareer.title}</p>
        </div>
      </motion.div>
      
      {/* Field transitions */}
      {Object.keys(careersByField).length > 0 ? (
        <div className={`grid ${isExpanded ? 'grid-cols-3' : 'grid-cols-2'} gap-8 w-full`}>
          {Object.entries(careersByField).map(([field, careers], fieldIndex) => (
            <div key={`field-${field}`} className="flex flex-col items-center">
              <motion.div
                className={`relative w-full ${getNodeColor(field)} border-2 rounded-lg p-4 shadow-sm mb-2`}
                initial="hidden"
                animate="visible"
                variants={nodeVariants}
                transition={{ delay: 0.5 + 0.1 * fieldIndex }}
              >
                <Badge className="absolute -top-3 left-4 bg-blue-600">{field}</Badge>
                <p className="text-sm mt-2">Transition difficulty:</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-4 h-4 rounded-full mx-0.5 ${
                        i < Math.min(3, 5 - fieldIndex) 
                          ? 'bg-green-500' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`} 
                    />
                  ))}
                </div>
                
                {isExpanded && (
                  <div className="mt-2">
                    <p className="text-xs">Transferable skills:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {getRandomSkillOverlap(
                        currentCareer.skills || [], 
                        careers[0]?.skills || []
                      ).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
              
              {/* Sample careers in this field */}
              <div className="space-y-2 w-full">
                {careers.slice(0, isExpanded ? 2 : 1).map((career, careerIndex) => (
                  <motion.div
                    key={`field-career-${career.id}`}
                    className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-2 text-sm"
                    initial="hidden"
                    animate="visible"
                    variants={nodeVariants}
                    transition={{ delay: 0.7 + 0.1 * fieldIndex + 0.05 * careerIndex }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{career.title}</span>
                      <ChevronRight size={16} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          No clear field transitions available for this career.
        </div>
      )}
      
      <div className="mt-10 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg max-w-xl">
        <div className="flex items-start">
          <Info className="text-blue-500 mr-2 h-5 w-5 mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">Transition Tips</h4>
            <p className="text-xs text-muted-foreground mt-1">
              When transitioning to a new field, focus on highlighting transferable skills, gaining relevant certifications, 
              and building a network in your target field. Consider intermediate roles that bridge your current experience 
              with your desired path.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const CareerPathVisualizer = ({ currentCareer }: CareerPathVisualizerProps) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedPath, setSelectedPath] = useState<string>('skills');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get related careers
  const { data: relatedCareers = [] } = useQuery({
    queryKey: [`/api/careers/${currentCareer.id}/related`, 6],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', `/api/careers/${currentCareer.id}/related?limit=6`);
        return await res.json();
      } catch (error) {
        console.error("Failed to fetch related careers:", error);
        return [];
      }
    },
    enabled: !!currentCareer?.id,
  });
  
  // Get potential "next step" career paths that are more senior
  const { data: advancementPaths = [] } = useQuery({
    queryKey: [`/api/careers/advancement-paths`, currentCareer.id],
    queryFn: async () => {
      try {
        // For now, use the related careers and filter for ones that might be advancements
        // In a real implementation, we'd have a specific endpoint for this
        const relatedRes = await apiRequest('GET', `/api/careers/${currentCareer.id}/related?limit=10`);
        const allRelated = await relatedRes.json();
        
        // Filter for careers that might be advancements (higher salary, same field, etc.)
        return allRelated.filter((career: Career) => 
          (career.salaryMin || 0) > (currentCareer.salaryMin || 0) * 1.2 && 
          career.field === currentCareer.field
        ).slice(0, 3);
      } catch (error) {
        console.error("Failed to fetch advancement paths:", error);
        return [];
      }
    },
    enabled: !!currentCareer?.id,
  });
  
  // "Previous" careers that might have led to the current one
  const { data: previousCareers = [] } = useQuery({
    queryKey: [`/api/careers/previous-paths`, currentCareer.id],
    queryFn: async () => {
      try {
        // Again, using related careers as stand-in
        const relatedRes = await apiRequest('GET', `/api/careers/${currentCareer.id}/related?limit=10`);
        const allRelated = await relatedRes.json();
        
        // Filter for careers that might be previous steps (lower salary, same field, etc.)
        return allRelated.filter((career: Career) => 
          (career.salaryMax || 0) < (currentCareer.salaryMin || 0) * 0.8 && 
          career.field === currentCareer.field
        ).slice(0, 2);
      } catch (error) {
        console.error("Failed to fetch previous careers:", error);
        return [];
      }
    },
    enabled: !!currentCareer?.id,
  });

  // Education paths for the current career
  const educationPaths = currentCareer?.educationPaths || [];
  
  const pathOptions = [
    { value: 'skills', label: 'Skills Based' },
    { value: 'education', label: 'Education Based' },
    { value: 'field', label: 'Field Transitions' },
  ];
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-6">
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <h3 className="text-lg font-semibold">Career Journey Map</h3>
          <p className="text-sm text-muted-foreground">
            Visualize potential career paths and transitions
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={selectedPath} onValueChange={setSelectedPath}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Path Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Path Visualization</SelectLabel>
                {pathOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
          </Button>
        </div>
      </div>
      
      <div className="p-4 relative">
        <div ref={containerRef} className="relative min-h-[400px] overflow-x-auto">
          {selectedPath === 'skills' && (
            <SkillsBasedPath 
              currentCareer={currentCareer}
              relatedCareers={relatedCareers}
              advancementPaths={advancementPaths}
              previousCareers={previousCareers}
              isExpanded={isExpanded}
            />
          )}
          
          {selectedPath === 'education' && (
            <EducationBasedPath 
              currentCareer={currentCareer}
              educationPaths={educationPaths}
              advancementPaths={advancementPaths}
              isExpanded={isExpanded}
            />
          )}
          
          {selectedPath === 'field' && (
            <FieldTransitionsPath 
              currentCareer={currentCareer}
              relatedCareers={relatedCareers.filter((c: Career) => c.field !== currentCareer.field)}
              isExpanded={isExpanded}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPathVisualizer;