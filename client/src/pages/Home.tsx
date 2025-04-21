import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div>
      <Hero />
      
      {/* Featured partnerships logos */}
      <div className="container mx-auto px-4 mb-20 relative z-10">
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Trusted by thousands of job seekers and leading organizations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 justify-items-center items-center opacity-70">
          {/* Partner logos would go here - using gray placeholders */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-28 bg-gray-200 dark:bg-gray-700 rounded-md opacity-60 dark:opacity-40" />
          ))}
        </div>
      </div>
      

      
      {/* Comprehensive Career Exploration Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-poppins mb-4">Explore Careers In Detail</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover comprehensive career information with AI-powered insights to guide your professional journey.
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Example career card (left column) */}
              <div className="lg:col-span-4 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 dark:bg-primary-900/30 rounded-full w-8 h-8 flex items-center justify-center text-primary shrink-0 mt-1">
                        <i className="fas fa-search"></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Browse Careers</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Explore over 1,200 career options with detailed information and insights.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 dark:bg-primary-900/30 rounded-full w-8 h-8 flex items-center justify-center text-primary shrink-0 mt-1">
                        <i className="fas fa-thumbs-up"></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Like Career Elements</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Mark specific aspects of careers you like for personalized recommendations.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 dark:bg-primary-900/30 rounded-full w-8 h-8 flex items-center justify-center text-primary shrink-0 mt-1">
                        <i className="fas fa-robot"></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Ask AI Assistant</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Get answers to specific questions about any career path that aren't covered in the profile.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 dark:bg-primary-900/30 rounded-full w-8 h-8 flex items-center justify-center text-primary shrink-0 mt-1">
                        <i className="fas fa-map"></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Generate Roadmaps</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Create personalized learning paths and career development plans tailored to your goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden pointer-events-none border border-gray-100 dark:border-gray-700">
                  <div className="h-52 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1000&auto=format&fit=crop" 
                      alt="UX Designer Career"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">96% Match</span>
                          <span className="bg-cyan-500/80 text-white text-xs px-2 py-1 rounded-full">Design</span>
                        </div>
                        <h3 className="text-xl font-semibold">UX Designer</h3>
                        <p className="text-sm text-gray-200">Create intuitive, engaging interfaces for digital products</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-3">
                      <div className="flex items-center">
                        <i className="fas fa-dollar-sign text-emerald-500 mr-1"></i>
                        <span className="text-gray-700 dark:text-gray-300">$85k-$130k</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-chart-line text-green-500 mr-1"></i>
                        <span className="text-gray-700 dark:text-gray-300">+19% growth</span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-4 items-center opacity-80">
                      <div className="text-primary text-sm font-medium flex items-center">
                        View Details
                        <i className="fas fa-chevron-right ml-1 text-xs"></i>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                          <i className="fas fa-bookmark text-gray-500 dark:text-gray-400"></i>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                          <i className="fas fa-heart text-gray-500 dark:text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-100 dark:border-blue-900/50">
                  <div className="flex items-start">
                    <i className="fas fa-info-circle text-blue-500 mt-1"></i>
                    <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      Sign up to explore over 1,200 careers with personalized recommendations based on your interests and skills.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Enlarged career card with comprehensive details (right column) */}
              <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="h-72 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070&auto=format&fit=crop" 
                    alt="Data Scientist Career Path"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-end">
                    <div className="p-6 text-white">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">98% Match</span>
                        <span className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">Tech</span>
                        <span className="bg-purple-500/80 text-white text-xs px-2 py-1 rounded-full">Analytics</span>
                        <span className="bg-green-500/80 text-white text-xs px-2 py-1 rounded-full">High Growth</span>
                      </div>
                      <h3 className="text-3xl font-bold">Data Scientist</h3>
                      <p className="text-gray-200 mt-2 max-w-3xl">
                        Analyze complex data sets to help organizations make better decisions through statistical analysis, 
                        machine learning, and data visualization.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Average Salary</div>
                      <div className="font-semibold text-lg">$120,000 - $165,000</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Growth Rate</div>
                      <div className="font-semibold text-lg text-green-500">+31% <span className="text-sm font-normal text-gray-500">(10 yrs)</span></div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Work-Life Balance</div>
                      <div className="font-semibold text-lg flex items-center">
                        <span className="mr-1">4.2/5</span>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Job Satisfaction</div>
                      <div className="font-semibold text-lg flex items-center">
                        <span className="mr-1">4.5/5</span>
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive tabs for career details */}
                  <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                    <div className="flex flex-wrap gap-4">
                      {['Overview', 'Responsibilities', 'Skills', 'Education', 'Roadmap', 'Day in Life', 'Q&A'].map((tab, i) => (
                        <button 
                          key={i}
                          onClick={() => {
                            // This would actually change the active tab state in a real implementation
                            const tabElements = document.querySelectorAll('.career-tab-button');
                            tabElements.forEach(el => {
                              el.classList.remove('border-primary', 'text-primary');
                              el.classList.add('border-transparent', 'text-gray-500');
                            });
                            
                            const tabContentElements = document.querySelectorAll('.career-tab-content');
                            tabContentElements.forEach(el => {
                              el.classList.add('hidden');
                            });
                            
                            // Activate the clicked tab
                            document.getElementById(`tab-button-${i}`)?.classList.add('border-primary', 'text-primary');
                            document.getElementById(`tab-button-${i}`)?.classList.remove('border-transparent', 'text-gray-500');
                            
                            // Show the corresponding content
                            document.getElementById(`tab-content-${i}`)?.classList.remove('hidden');
                          }}
                          id={`tab-button-${i}`}
                          className={`career-tab-button py-2 px-1 font-medium text-sm border-b-2 ${i === 0 ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Content for the Overview tab */}
                  <div id="tab-content-0" className="career-tab-content space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Career Overview</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Data Scientists combine statistical analysis, machine learning, programming, and domain expertise to extract 
                        actionable insights from data. They create predictive models, design algorithms, and develop data-driven 
                        solutions that help organizations make informed decisions, optimize processes, and identify opportunities.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-lg">
                        <h4 className="font-medium mb-3">Key Technical Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'TensorFlow', 'PyTorch', 'Big Data'].map((skill, i) => (
                            <span key={i} className="bg-white dark:bg-gray-800 text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-lg">
                        <h4 className="font-medium mb-3">Soft Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Communication', 'Problem Solving', 'Critical Thinking', 'Storytelling', 'Business Acumen', 'Teamwork', 'Curiosity'].map((skill, i) => (
                            <span key={i} className="bg-white dark:bg-gray-800 text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-lg">
                        <h4 className="font-medium mb-3">Work Environment</h4>
                        <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                          <li className="flex items-start">
                            <i className="fas fa-building mt-1 mr-2 text-gray-500"></i>
                            <span>Tech companies, financial institutions, healthcare, research, and consulting firms</span>
                          </li>
                          <li className="flex items-start">
                            <i className="fas fa-clock mt-1 mr-2 text-gray-500"></i>
                            <span>Full-time with flexible schedules and remote opportunities</span>
                          </li>
                          <li className="flex items-start">
                            <i className="fas fa-users mt-1 mr-2 text-gray-500"></i>
                            <span>Collaborative teams with data engineers, analysts, and business stakeholders</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-lg">
                        <h4 className="font-medium mb-3">Education & Certification</h4>
                        <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                          <li className="flex items-start">
                            <i className="fas fa-graduation-cap mt-1 mr-2 text-gray-500"></i>
                            <span>Bachelor's or Master's in Computer Science, Statistics, Mathematics, or related field</span>
                          </li>
                          <li className="flex items-start">
                            <i className="fas fa-certificate mt-1 mr-2 text-gray-500"></i>
                            <span>Professional certifications: AWS Machine Learning, Google Data Analytics, IBM Data Science</span>
                          </li>
                          <li className="flex items-start">
                            <i className="fas fa-laptop-code mt-1 mr-2 text-gray-500"></i>
                            <span>Portfolio of projects demonstrating analytical and technical skills</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Career Development Path</h4>
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                        <div className="space-y-6 relative">
                          {[
                            { title: 'Junior Data Scientist', years: '0-2 years', description: 'Assist with data cleaning, simple analyses, and model implementation under supervision.' },
                            { title: 'Data Scientist', years: '2-5 years', description: 'Develop models independently, collaborate across teams, and contribute to strategic projects.' },
                            { title: 'Senior Data Scientist', years: '5-8 years', description: 'Lead complex projects, mentor junior team members, and influence product decisions.' },
                            { title: 'Lead/Principal Data Scientist', years: '8+ years', description: 'Set technical direction, define methodologies, and drive innovation across the organization.' }
                          ].map((step, i) => (
                            <div key={i} className="flex">
                              <div className="flex-shrink-0 flex items-start">
                                <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center text-white z-10">
                                  {i + 1}
                                </div>
                              </div>
                              <div className="ml-4">
                                <h5 className="font-medium">{step.title} <span className="text-sm font-normal text-gray-500">({step.years})</span></h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content for the Responsibilities tab */}
                  <div id="tab-content-1" className="career-tab-content space-y-6 hidden">
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Key Responsibilities</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Data Scientists are responsible for collecting, analyzing, and interpreting large, complex datasets
                        to develop data-driven solutions for business challenges.
                      </p>
                    </div>
                    
                    <div className="grid gap-4">
                      {[
                        {
                          title: "Data Collection & Processing",
                          description: "Gather and clean data from various sources, ensuring data quality and integrity.",
                          icon: "fa-database"
                        },
                        {
                          title: "Statistical Analysis & Modeling",
                          description: "Apply statistical methods to identify patterns and trends in large datasets.",
                          icon: "fa-chart-line"
                        },
                        {
                          title: "Machine Learning Implementation",
                          description: "Develop and deploy machine learning models to solve business problems.",
                          icon: "fa-robot"
                        },
                        {
                          title: "Data Visualization",
                          description: "Create compelling visual representations of data insights for stakeholders.",
                          icon: "fa-chart-pie"
                        },
                        {
                          title: "Cross-functional Collaboration",
                          description: "Work with product, engineering, and business teams to implement data-driven solutions.",
                          icon: "fa-users"
                        },
                        {
                          title: "Technical Communication",
                          description: "Present findings and recommendations to both technical and non-technical audiences.",
                          icon: "fa-comments"
                        }
                      ].map((item, i) => (
                        <div key={i} className="flex border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-10 h-10 bg-primary/10 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-primary">
                              <i className={`fas ${item.icon}`}></i>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">{item.title}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Content for the Skills tab */}
                  <div id="tab-content-2" className="career-tab-content space-y-6 hidden">
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Essential Skills</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        The data science field requires a unique blend of technical and soft skills to effectively 
                        analyze data and communicate insights.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-base mb-3 flex items-center">
                          <i className="fas fa-code text-primary mr-2"></i>
                          Technical Skills
                        </h5>
                        <div className="space-y-3">
                          {[
                            { skill: "Python/R Programming", level: 90 },
                            { skill: "SQL & Database Knowledge", level: 85 },
                            { skill: "Statistical Analysis", level: 85 },
                            { skill: "Machine Learning Algorithms", level: 80 },
                            { skill: "Data Visualization", level: 75 },
                            { skill: "Big Data Technologies", level: 70 },
                          ].map((item, i) => (
                            <div key={i}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">{item.skill}</span>
                                <span className="text-xs text-gray-500">{item.level}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{width: `${item.level}%`}}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-base mb-3 flex items-center">
                          <i className="fas fa-user-tie text-primary mr-2"></i>
                          Soft Skills
                        </h5>
                        <div className="space-y-3">
                          {[
                            { skill: "Analytical Thinking", level: 90 },
                            { skill: "Communication", level: 85 },
                            { skill: "Problem Solving", level: 85 },
                            { skill: "Business Acumen", level: 75 },
                            { skill: "Team Collaboration", level: 80 },
                            { skill: "Continuous Learning", level: 85 },
                          ].map((item, i) => (
                            <div key={i}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">{item.skill}</span>
                                <span className="text-xs text-gray-500">{item.level}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{width: `${item.level}%`}}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content for the Education tab */}
                  <div id="tab-content-3" className="career-tab-content space-y-6 hidden">
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Educational Pathways</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        There are multiple educational routes to becoming a Data Scientist, depending on your background and career goals.
                      </p>
                      
                      <div className="space-y-6">
                        {[
                          {
                            title: "Traditional Academic Path",
                            timeframe: "4-6 years",
                            requirements: [
                              "Bachelor's degree in Computer Science, Statistics, Mathematics, or related field",
                              "Master's or PhD in Data Science, Machine Learning, or related specialization",
                              "Research experience with published papers (for research-focused roles)"
                            ],
                            institutions: ["Stanford University", "MIT", "UC Berkeley", "Carnegie Mellon"]
                          },
                          {
                            title: "Bootcamp + Self-Learning Path",
                            timeframe: "6-12 months",
                            requirements: [
                              "Intensive data science bootcamp (12-24 weeks)",
                              "Self-directed learning through online courses and tutorials",
                              "Building a portfolio of projects to demonstrate skills",
                              "Contributing to open-source data projects"
                            ],
                            institutions: ["Galvanize", "General Assembly", "DataCamp", "Coursera"]
                          },
                          {
                            title: "Professional Certification Path",
                            timeframe: "1-2 years",
                            requirements: [
                              "Industry certifications in relevant tools and technologies",
                              "Specialized certifications in machine learning and AI",
                              "Cloud platform certifications (AWS, Azure, GCP)"
                            ],
                            institutions: ["Google", "IBM", "Microsoft", "AWS"]
                          }
                        ].map((path, i) => (
                          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
                              <div className="flex justify-between items-center">
                                <h5 className="font-medium">{path.title}</h5>
                                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                                  {path.timeframe}
                                </span>
                              </div>
                            </div>
                            <div className="p-4">
                              <h6 className="text-sm font-medium mb-2">Key Requirements:</h6>
                              <ul className="space-y-1 mb-3">
                                {path.requirements.map((req, i) => (
                                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                                    <i className="fas fa-check-circle text-green-500 mr-2 mt-1 text-xs"></i>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                              <h6 className="text-sm font-medium mb-2">Notable Institutions:</h6>
                              <div className="flex flex-wrap gap-2">
                                {path.institutions.map((inst, i) => (
                                  <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                                    {inst}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content for the Roadmap tab */}
                  <div id="tab-content-4" className="career-tab-content space-y-6 hidden">
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Career Development Roadmap</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Follow this roadmap to develop the skills and experience needed to progress in a data science career.
                      </p>
                    </div>
                    
                    <div className="relative pb-12">
                      <div className="absolute left-0 top-0 h-full w-0.5 bg-primary/20"></div>
                      
                      {[
                        {
                          title: "Foundation Stage",
                          timeframe: "0-6 months",
                          description: "Build essential technical skills and knowledge",
                          tasks: [
                            "Learn Python programming fundamentals",
                            "Master SQL for database queries",
                            "Study statistics and probability",
                            "Learn data visualization techniques",
                            "Complete introductory machine learning courses"
                          ]
                        },
                        {
                          title: "Skill Building Stage",
                          timeframe: "6-12 months",
                          description: "Deepen technical expertise and start building projects",
                          tasks: [
                            "Advanced Python for data science",
                            "Learn machine learning algorithms in depth",
                            "Master data preprocessing techniques",
                            "Build 2-3 complete data science projects",
                            "Learn a specialization (NLP, Computer Vision, etc.)"
                          ]
                        },
                        {
                          title: "Experience Building Stage",
                          timeframe: "1-2 years",
                          description: "Apply skills in real-world contexts and build professional network",
                          tasks: [
                            "Contribute to open-source projects",
                            "Participate in Kaggle competitions",
                            "Build an online portfolio/GitHub presence",
                            "Network with professionals in the field",
                            "Apply for entry-level positions or internships"
                          ]
                        },
                        {
                          title: "Career Advancement Stage",
                          timeframe: "2-5+ years",
                          description: "Develop specialization and leadership skills",
                          tasks: [
                            "Gain deeper expertise in a specific domain",
                            "Learn MLOps and deployment technologies",
                            "Develop soft skills and business acumen",
                            "Mentor junior data scientists",
                            "Lead complex data science projects"
                          ]
                        }
                      ].map((stage, i) => (
                        <div key={i} className="relative pl-8 pb-8">
                          <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border-2 border-primary flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <div className="mb-1">
                            <h5 className="font-medium flex items-center text-lg">
                              {stage.title}
                              <span className="text-sm font-normal text-gray-500 ml-2">({stage.timeframe})</span>
                            </h5>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{stage.description}</p>
                            <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                              <h6 className="font-medium text-sm mb-2">Key Activities:</h6>
                              <ul className="space-y-1.5">
                                {stage.tasks.map((task, j) => (
                                  <li key={j} className="text-sm flex items-start">
                                    <div className="h-5 w-5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 flex items-center justify-center flex-shrink-0 mr-2">
                                      <i className="fas fa-check text-green-500 text-xs"></i>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">{task}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Content for the Day in Life tab */}
                  <div id="tab-content-5" className="career-tab-content space-y-6 hidden">
                    <div>
                      <h4 className="font-semibold text-lg mb-3">A Day in the Life of a Data Scientist</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Get a glimpse into what a typical workday looks like for a data scientist at a mid-sized tech company.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        {
                          time: "9:00 AM - 9:30 AM",
                          activity: "Morning Check-in",
                          description: "Review emails, messages, and plan the day's work. Check on any overnight model runs or data processing jobs."
                        },
                        {
                          time: "9:30 AM - 10:30 AM",
                          activity: "Team Stand-up Meeting",
                          description: "Participate in daily stand-up with the data science team to discuss progress, blockers, and align on priorities."
                        },
                        {
                          time: "10:30 AM - 12:30 PM",
                          activity: "Deep Work: Model Development",
                          description: "Focus time for model development, data analysis, or algorithm implementation. Work on current sprint's deliverables."
                        },
                        {
                          time: "12:30 PM - 1:30 PM",
                          activity: "Lunch Break",
                          description: "Take a break, sometimes joining colleagues for lunch discussions about recent developments in AI/ML."
                        },
                        {
                          time: "1:30 PM - 3:00 PM",
                          activity: "Cross-functional Meeting",
                          description: "Meet with product managers or stakeholders to understand business requirements or present findings from analysis."
                        },
                        {
                          time: "3:00 PM - 4:30 PM",
                          activity: "Collaborative Coding",
                          description: "Code review sessions with team members, pair programming on complex problems, or debugging issues."
                        },
                        {
                          time: "4:30 PM - 5:30 PM",
                          activity: "Documentation & Planning",
                          description: "Document work completed, update project tracking tools, and plan tasks for the next day."
                        },
                        {
                          time: "5:30 PM - 6:00 PM",
                          activity: "Learning Time",
                          description: "Set aside time to read research papers, experiment with new tools, or work on skill development."
                        }
                      ].map((item, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4">
                          <div className="col-span-12 md:col-span-3">
                            <div className="font-medium text-primary">{item.time}</div>
                          </div>
                          <div className="col-span-12 md:col-span-9 border-l border-gray-200 dark:border-gray-700 pl-4">
                            <h5 className="font-medium">{item.activity}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Content for the Q&A tab */}
                  <div id="tab-content-6" className="career-tab-content space-y-6 hidden">
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Frequently Asked Questions</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Common questions about pursuing a career as a Data Scientist, answered by professionals in the field.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        {
                          question: "Do I need a PhD to become a Data Scientist?",
                          answer: "No, a PhD is not required for most data science positions. While it can be beneficial for research-focused roles and can give you an edge in competitive environments, many successful data scientists have bachelor's or master's degrees. What's most important is demonstrating your skills through projects, experience, and continuous learning."
                        },
                        {
                          question: "What's the difference between a Data Scientist and a Data Analyst?",
                          answer: "Data Scientists typically focus on building predictive models and working with unstructured data using advanced statistical methods and machine learning. Data Analysts primarily work with structured data to provide business insights through descriptive analytics. Data Scientists generally need stronger programming and mathematical skills, while Data Analysts focus more on business domain knowledge and data visualization."
                        },
                        {
                          question: "Which programming languages should I learn first?",
                          answer: "Python is the most widely used language in data science and is recommended as your first language due to its readability and extensive libraries (pandas, NumPy, scikit-learn, TensorFlow). SQL is essential for working with databases and should be learned early on. R is popular in statistical analysis and can be valuable depending on your industry. Focus on mastering Python first before expanding to other languages."
                        },
                        {
                          question: "How important are communication skills for Data Scientists?",
                          answer: "Communication skills are extremely important for data scientists. The ability to explain complex concepts and findings to non-technical stakeholders is often what separates successful data scientists from others. You'll need to create visualizations, write reports, give presentations, and work closely with cross-functional teams. Strong communication ensures your insights drive actual business decisions."
                        }
                      ].map((item, i) => (
                        <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700">
                            <h5 className="font-medium flex items-center">
                              <i className="fas fa-question-circle text-primary mr-2"></i>
                              {item.question}
                            </h5>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                          </div>
                        </div>
                      ))}
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4 mt-6">
                        <div className="flex items-start">
                          <i className="fas fa-robot text-blue-500 mt-1"></i>
                          <div className="ml-3">
                            <h5 className="font-medium text-blue-700 dark:text-blue-300">Have a specific question?</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Sign up to ask our AI career assistant any specific questions about this career path and get personalized answers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 mb-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-start">
                        <i className="fas fa-robot text-lg text-primary mt-1"></i>
                        <div className="ml-3">
                          <h5 className="font-medium">AI Career Assistant</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Get personalized answers to your specific career questions and generate custom roadmaps.
                          </p>
                        </div>
                      </div>
                      <Link href="/auth?tab=register">
                        <Button className="inline-flex items-center">
                          <span>Get Started</span>
                          <i className="fas fa-arrow-right ml-2 text-xs"></i>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <Features />
    </div>
  );
};

export default Home;
