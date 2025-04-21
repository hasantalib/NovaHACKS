import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Career } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CareerInsightAI from './CareerInsightAI';
import LikeableElement from './LikeableElement';
import CareerPathVisualizer from './CareerPathVisualizer';

interface DetailTabsProps {
  career: Career;
}

const DetailTabs = ({ career }: DetailTabsProps) => {
  const [aiAssistantVisible, setAiAssistantVisible] = useState(false);

  const safeCareer = career || {} as Career;
  
  return (
    <>
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <TabsList className="px-6 py-0 h-14 bg-transparent">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Overview</TabsTrigger>
            <TabsTrigger value="salary" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Salary & Growth</TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Required Skills</TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Education Paths</TabsTrigger>
            <TabsTrigger value="career-path" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Career Path</TabsTrigger>
            <TabsTrigger value="daylife" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Day in the Life</TabsTrigger>
            <TabsTrigger value="ai-insights" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">AI Insights</TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="overview" className="mt-0">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3">Career Description</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {career?.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3">Key Responsibilities</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {career?.responsibilities?.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check-circle text-emerald-500 mt-1 mr-2"></i>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3">Work Environment</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                        <i className="fas fa-building text-primary"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Work Setting</p>
                          <LikeableElement 
                            careerId={career.id} 
                            elementType="work_setting" 
                            elementValue={career?.workSetting || "Office / Remote"} 
                            size="sm"
                          />
                        </div>
                        <p className="font-medium">{career?.workSetting || "Office / Remote"}</p>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                        <i className="fas fa-clock text-primary"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Work Schedule</p>
                          <LikeableElement 
                            careerId={career.id} 
                            elementType="work_schedule" 
                            elementValue={career?.workSchedule || "Full-time / Flexible"} 
                            size="sm"
                          />
                        </div>
                        <p className="font-medium">{career?.workSchedule || "Full-time / Flexible"}</p>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                        <i className="fas fa-users text-primary"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Team Structure</p>
                          <LikeableElement 
                            careerId={career.id} 
                            elementType="team_structure" 
                            elementValue={career?.teamStructure || "Collaborative"} 
                            size="sm"
                          />
                        </div>
                        <p className="font-medium">{career?.teamStructure || "Collaborative"}</p>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                        <i className="fas fa-brain text-primary"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Work Style</p>
                          <LikeableElement 
                            careerId={career.id} 
                            elementType="work_style" 
                            elementValue={career?.workStyle || "Creative / Analytical"} 
                            size="sm"
                          />
                        </div>
                        <p className="font-medium">{career?.workStyle || "Creative / Analytical"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
                  <h4 className="text-lg font-medium mb-4">Quick Facts</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Median Salary</p>
                      <div className="flex items-center mt-1">
                        <i className="fas fa-dollar-sign text-emerald-500 mr-2"></i>
                        <p className="font-semibold text-lg">${career?.medianSalary || '90,000'} / year</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Job Growth</p>
                      <div className="flex items-center mt-1">
                        <i className="fas fa-chart-line text-green-500 mr-2"></i>
                        <p className="font-semibold text-lg">+{career?.growth || '20'}% (2022-2032)</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Required Education</p>
                      <div className="flex items-center mt-1">
                        <i className="fas fa-graduation-cap text-primary mr-2"></i>
                        <p className="font-semibold">{career?.requiredEducation || 'Bachelor\'s or Certificate'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Work-Life Balance</p>
                      <div className="flex items-center mt-1">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full" 
                            style={{ width: `${(career?.workLifeBalance || 8) * 10}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{career?.workLifeBalance || 8}/10</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Top Locations</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {career?.topLocations?.map((location, index) => (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="text-xs rounded-full px-2 py-1"
                          >
                            {location}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button className="w-full">
                      Get Custom Career Plan
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setAiAssistantVisible(true)}
                    >
                      Ask AI Assistant
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="salary" className="mt-0">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4">Salary Range by Experience Level</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Entry Level (0-2 years)</span>
                      <span className="font-medium">${career?.salaryByExperience?.entry || '70,000'}</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Mid Level (3-5 years)</span>
                      <span className="font-medium">${career?.salaryByExperience?.mid || '90,000'}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Senior Level (6-10 years)</span>
                      <span className="font-medium">${career?.salaryByExperience?.senior || '120,000'}</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Expert Level (10+ years)</span>
                      <span className="font-medium">${career?.salaryByExperience?.expert || '150,000'}</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Employment Growth</h4>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <i className="fas fa-chart-line text-2xl text-green-500"></i>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">+{career?.growth || '20'}%</div>
                      <div className="text-gray-500 dark:text-gray-400">Projected Growth (2022-2032)</div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {career?.growthDescription || 'This career is growing faster than average, with strong job prospects expected over the next decade.'}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Salary Comparison</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>National Average</span>
                      <span className="font-medium">${career?.salaryComparison?.national || '75,000'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Career</span>
                      <span className="font-medium text-primary">${career?.medianSalary || '90,000'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Difference</span>
                      <span className="font-medium text-green-500">+${career?.salaryComparison?.difference || '15,000'} (+20%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-0">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold mb-4">Essential Skills</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {career?.skills?.slice(0, 6).map((skill, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <i className="fas fa-check text-primary"></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h5 className="font-medium">{skill}</h5>
                            <LikeableElement 
                              careerId={career.id} 
                              elementType="skill" 
                              elementValue={skill} 
                              size="sm"
                            />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Required for success in this role
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Technical Skills</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {career?.technicalSkills?.map((skill, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <i className="fas fa-laptop-code text-primary mr-2"></i>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <LikeableElement 
                            careerId={career.id} 
                            elementType="technical_skill" 
                            elementValue={skill.name} 
                            size="sm"
                          />
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${skill.level * 10}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
                          {skill.level < 5 ? 'Nice to have' : skill.level < 8 ? 'Important' : 'Essential'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold mb-4">Soft Skills</h4>
                  <ul className="space-y-3">
                    {career?.softSkills?.map((skill, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <i className="fas fa-star text-yellow-500 mr-2"></i>
                          <span>{skill}</span>
                        </div>
                        <LikeableElement 
                          careerId={career.id} 
                          elementType="soft_skill" 
                          elementValue={skill} 
                          size="sm"
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Skill Development</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Recommended ways to develop the skills needed for this career:
                  </p>
                  <ul className="space-y-3">
                    {career?.skillDevelopment?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-graduation-cap text-primary mt-1 mr-2"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="career-path" className="mt-0">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4">Interactive Career Journey Map</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Explore potential career paths, transitions, and advancement opportunities related to {career?.title}.
                  This visualization helps you understand how your career might evolve over time.
                </p>
                
                {/* Career Path Visualizer Component */}
                <CareerPathVisualizer currentCareer={safeCareer} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-0">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold mb-4">Education Pathways</h4>
                  <div className="space-y-6">
                    {career?.educationPaths?.map((path, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4 pb-6 relative">
                        <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>
                        <h5 className="font-medium text-lg">{path.name}</h5>
                        <p className="text-gray-600 dark:text-gray-300 mt-1 mb-2">{path.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {path.timeframe}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Recommended Programs</h4>
                  <div className="space-y-4">
                    {career?.recommendedPrograms?.map((program, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{program.name}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {program.provider}
                            </p>
                          </div>
                          <Badge className={`${
                            program.type === 'Degree' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                              : program.type === 'Certificate' 
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                            {program.type}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-3 text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            <i className="fas fa-clock mr-1"></i> {program.duration}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            <i className="fas fa-dollar-sign mr-1"></i> {program.cost}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold mb-4">Alternative Paths</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Non-traditional routes to enter this career field:
                  </p>
                  <ul className="space-y-3">
                    {career?.alternativePaths?.map((path, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-route text-primary mt-1 mr-2"></i>
                        <span>{path}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Certifications</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Industry certifications that can boost your career:
                  </p>
                  <div className="space-y-3">
                    {career?.certifications?.map((cert, index) => (
                      <div key={index} className="flex items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <i className="fas fa-certificate text-primary"></i>
                        </div>
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {cert.organization}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="daylife" className="mt-0">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4">Typical Daily Activities</h4>
                <div className="space-y-4">
                  {career?.dailyActivities?.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <h5 className="font-medium">{activity.time}</h5>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Work Challenges</h4>
                  <ul className="space-y-3">
                    {career?.challenges?.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-exclamation-circle text-amber-500 mt-1 mr-2"></i>
                        <span className="text-gray-600 dark:text-gray-300">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Work Rewards</h4>
                  <ul className="space-y-3">
                    {career?.rewards?.map((reward, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-award text-yellow-500 mt-1 mr-2"></i>
                        <span className="text-gray-600 dark:text-gray-300">{reward}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4">Professional's Perspective</h4>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center overflow-hidden mr-4">
                    <i className="fas fa-user text-gray-500 dark:text-gray-400"></i>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h5 className="font-medium">{career?.professionalPerspective?.name || 'Sarah Johnson'}</h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        • {career?.professionalPerspective?.yearsExperience || '8'} years experience
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 italic">
                      "{career?.professionalPerspective?.quote || 'What I love most about this career is the constant learning and problem-solving. Every day brings new challenges that keep me engaged and growing professionally.'}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai-insights" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">AI-Powered Career Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get personalized insights and answers about a career as a {career?.title}. Our AI assistant uses the latest data and can answer specific questions about educational requirements, day-to-day responsibilities, skill development, and industry trends.
                </p>
              </div>
              
              <CareerInsightAI career={career} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
};

export default DetailTabs;
