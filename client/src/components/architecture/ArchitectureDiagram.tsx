import React from 'react';
import { motion } from 'framer-motion';

const ArchitectureDiagram: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } }
  };

  // Component colors
  const colors = {
    client: "#4f86f7", // Blue for client
    server: "#6bb183", // Green for server
    database: "#ca7b4d", // Orange for database
    external: "#9c6bbd", // Purple for external services
    line: "#8d90a0",     // Gray for connecting lines
    text: "#2c3e50",     // Dark blue for text
    background: "#f8f9fa" // Light background
  };

  return (
    <div className="w-full overflow-auto bg-white rounded-lg shadow-lg p-6 my-8">
      <h2 className="text-2xl font-bold text-center mb-6">CareerCanvas Architecture Diagram</h2>
      
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <svg width="1000" height="700" viewBox="0 0 1000 700" className="mx-auto">
          {/* Background Grid */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Layers */}
          <motion.rect variants={itemVariants} x="50" y="100" width="900" height="180" rx="10" fill={colors.client} fillOpacity="0.1" stroke={colors.client} strokeWidth="2" />
          <motion.text variants={itemVariants} x="75" y="130" fill={colors.text} fontSize="18" fontWeight="bold">Client Layer</motion.text>
          
          <motion.rect variants={itemVariants} x="50" y="300" width="900" height="180" rx="10" fill={colors.server} fillOpacity="0.1" stroke={colors.server} strokeWidth="2" />
          <motion.text variants={itemVariants} x="75" y="330" fill={colors.text} fontSize="18" fontWeight="bold">Server Layer</motion.text>
          
          <motion.rect variants={itemVariants} x="50" y="500" width="900" height="180" rx="10" fill={colors.database} fillOpacity="0.1" stroke={colors.database} strokeWidth="2" />
          <motion.text variants={itemVariants} x="75" y="530" fill={colors.text} fontSize="18" fontWeight="bold">Persistence Layer</motion.text>
          
          {/* Client Components */}
          <motion.rect variants={itemVariants} x="100" y="150" width="160" height="80" rx="8" fill="white" stroke={colors.client} strokeWidth="2" />
          <motion.text variants={itemVariants} x="180" y="190" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">React Components</motion.text>
          <motion.text variants={itemVariants} x="180" y="210" fill={colors.text} fontSize="12" textAnchor="middle">Pages, UI Elements</motion.text>
          
          <motion.rect variants={itemVariants} x="300" y="150" width="160" height="80" rx="8" fill="white" stroke={colors.client} strokeWidth="2" />
          <motion.text variants={itemVariants} x="380" y="190" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">React Query</motion.text>
          <motion.text variants={itemVariants} x="380" y="210" fill={colors.text} fontSize="12" textAnchor="middle">Data Fetching, State</motion.text>
          
          <motion.rect variants={itemVariants} x="500" y="150" width="160" height="80" rx="8" fill="white" stroke={colors.client} strokeWidth="2" />
          <motion.text variants={itemVariants} x="580" y="190" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">Custom Hooks</motion.text>
          <motion.text variants={itemVariants} x="580" y="210" fill={colors.text} fontSize="12" textAnchor="middle">Auth, Theme, UI</motion.text>
          
          <motion.rect variants={itemVariants} x="700" y="150" width="160" height="80" rx="8" fill="white" stroke={colors.client} strokeWidth="2" />
          <motion.text variants={itemVariants} x="780" y="190" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">Shadcn UI + Tailwind</motion.text>
          <motion.text variants={itemVariants} x="780" y="210" fill={colors.text} fontSize="12" textAnchor="middle">Styling Components</motion.text>
          
          {/* Server Components */}
          <motion.rect variants={itemVariants} x="100" y="350" width="160" height="80" rx="8" fill="white" stroke={colors.server} strokeWidth="2" />
          <motion.text variants={itemVariants} x="180" y="390" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">Express Routes</motion.text>
          <motion.text variants={itemVariants} x="180" y="410" fill={colors.text} fontSize="12" textAnchor="middle">API Endpoints</motion.text>
          
          <motion.rect variants={itemVariants} x="300" y="350" width="160" height="80" rx="8" fill="white" stroke={colors.server} strokeWidth="2" />
          <motion.text variants={itemVariants} x="380" y="390" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">Storage Layer</motion.text>
          <motion.text variants={itemVariants} x="380" y="410" fill={colors.text} fontSize="12" textAnchor="middle">Data Management</motion.text>
          
          <motion.rect variants={itemVariants} x="500" y="350" width="160" height="80" rx="8" fill="white" stroke={colors.server} strokeWidth="2" />
          <motion.text variants={itemVariants} x="580" y="390" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">Auth System</motion.text>
          <motion.text variants={itemVariants} x="580" y="410" fill={colors.text} fontSize="12" textAnchor="middle">Passport.js, Sessions</motion.text>
          
          <motion.rect variants={itemVariants} x="700" y="350" width="160" height="80" rx="8" fill="white" stroke={colors.server} strokeWidth="2" />
          <motion.text variants={itemVariants} x="780" y="390" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">AI Service</motion.text>
          <motion.text variants={itemVariants} x="780" y="410" fill={colors.text} fontSize="12" textAnchor="middle">GPT-4o Integration</motion.text>
          
          {/* Database Components */}
          <motion.rect variants={itemVariants} x="100" y="550" width="160" height="80" rx="8" fill="white" stroke={colors.database} strokeWidth="2" />
          <motion.text variants={itemVariants} x="180" y="590" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">PostgreSQL</motion.text>
          <motion.text variants={itemVariants} x="180" y="610" fill={colors.text} fontSize="12" textAnchor="middle">Relational Database</motion.text>
          
          <motion.rect variants={itemVariants} x="300" y="550" width="160" height="80" rx="8" fill="white" stroke={colors.database} strokeWidth="2" />
          <motion.text variants={itemVariants} x="380" y="590" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">Drizzle ORM</motion.text>
          <motion.text variants={itemVariants} x="380" y="610" fill={colors.text} fontSize="12" textAnchor="middle">Type-safe Queries</motion.text>
          
          <motion.rect variants={itemVariants} x="500" y="550" width="160" height="80" rx="8" fill="white" stroke={colors.database} strokeWidth="2" />
          <motion.text variants={itemVariants} x="580" y="590" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">Data Schema</motion.text>
          <motion.text variants={itemVariants} x="580" y="610" fill={colors.text} fontSize="12" textAnchor="middle">Users, Careers, Quiz</motion.text>
          
          <motion.rect variants={itemVariants} x="700" y="550" width="160" height="80" rx="8" fill="white" stroke={colors.external} strokeWidth="2" />
          <motion.text variants={itemVariants} x="780" y="590" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="medium">OpenAI API</motion.text>
          <motion.text variants={itemVariants} x="780" y="610" fill={colors.text} fontSize="12" textAnchor="middle">External AI Service</motion.text>
          
          {/* Connection Lines - Vertical */}
          {/* Client to Server */}
          <motion.path variants={lineVariants} d="M 180 230 L 180 350" stroke={colors.line} strokeWidth="2" strokeDasharray="5,5" fill="none" />
          <motion.path variants={lineVariants} d="M 380 230 L 380 350" stroke={colors.line} strokeWidth="2" strokeDasharray="5,5" fill="none" />
          <motion.path variants={lineVariants} d="M 580 230 L 580 350" stroke={colors.line} strokeWidth="2" strokeDasharray="5,5" fill="none" />
          <motion.path variants={lineVariants} d="M 780 230 L 780 350" stroke={colors.line} strokeWidth="2" strokeDasharray="5,5" fill="none" />
          
          {/* Server to Database */}
          <motion.path variants={lineVariants} d="M 180 430 L 180 550" stroke={colors.line} strokeWidth="2" strokeDasharray="5,5" fill="none" />
          <motion.path variants={lineVariants} d="M 380 430 L 380 550" stroke={colors.line} strokeWidth="2" strokeDasharray="5,5" fill="none" />
          <motion.path variants={lineVariants} d="M 580 430 L 580 550" stroke={colors.line} strokeWidth="2" strokeDasharray="5,5" fill="none" />
          <motion.path variants={lineVariants} d="M 780 430 L 780 550" stroke={colors.line} strokeWidth="2" strokeDasharray="5,5" fill="none" />
          
          {/* Connection Lines - Horizontal */}
          {/* Client Layer */}
          <motion.path variants={lineVariants} d="M 260 190 L 300 190" stroke={colors.line} strokeWidth="2" fill="none" />
          <motion.path variants={lineVariants} d="M 460 190 L 500 190" stroke={colors.line} strokeWidth="2" fill="none" />
          <motion.path variants={lineVariants} d="M 660 190 L 700 190" stroke={colors.line} strokeWidth="2" fill="none" />
          
          {/* Server Layer */}
          <motion.path variants={lineVariants} d="M 260 390 L 300 390" stroke={colors.line} strokeWidth="2" fill="none" />
          <motion.path variants={lineVariants} d="M 460 390 L 500 390" stroke={colors.line} strokeWidth="2" fill="none" />
          <motion.path variants={lineVariants} d="M 660 390 L 700 390" stroke={colors.line} strokeWidth="2" fill="none" />
          
          {/* Database Layer */}
          <motion.path variants={lineVariants} d="M 260 590 L 300 590" stroke={colors.line} strokeWidth="2" fill="none" />
          <motion.path variants={lineVariants} d="M 460 590 L 500 590" stroke={colors.line} strokeWidth="2" fill="none" />
          <motion.path variants={lineVariants} d="M 660 590 L 700 590" stroke={colors.line} strokeWidth="2" fill="none" />
          
          {/* Data Flow Annotations */}
          <motion.text variants={itemVariants} x="250" y="170" fill={colors.text} fontSize="10" textAnchor="middle">API Calls</motion.text>
          <motion.text variants={itemVariants} x="180" y="290" fill={colors.text} fontSize="10" textAnchor="middle">HTTP Requests</motion.text>
          <motion.text variants={itemVariants} x="180" y="490" fill={colors.text} fontSize="10" textAnchor="middle">SQL Queries</motion.text>
          <motion.text variants={itemVariants} x="800" y="490" fill={colors.text} fontSize="10" textAnchor="middle">API Requests</motion.text>
          
          {/* Legend */}
          <motion.rect variants={itemVariants} x="820" y="40" width="20" height="10" fill={colors.client} fillOpacity="0.5" />
          <motion.text variants={itemVariants} x="845" y="48" fill={colors.text} fontSize="10" textAnchor="start">Client Layer</motion.text>
          
          <motion.rect variants={itemVariants} x="820" y="60" width="20" height="10" fill={colors.server} fillOpacity="0.5" />
          <motion.text variants={itemVariants} x="845" y="68" fill={colors.text} fontSize="10" textAnchor="start">Server Layer</motion.text>
          
          <motion.rect variants={itemVariants} x="820" y="80" width="20" height="10" fill={colors.database} fillOpacity="0.5" />
          <motion.text variants={itemVariants} x="845" y="88" fill={colors.text} fontSize="10" textAnchor="start">Persistence Layer</motion.text>
          
          <motion.rect variants={itemVariants} x="820" y="100" width="20" height="10" fill={colors.external} fillOpacity="0.5" />
          <motion.text variants={itemVariants} x="845" y="108" fill={colors.text} fontSize="10" textAnchor="start">External Services</motion.text>
        </svg>
      </motion.div>
      
      {/* Key Features */}
      <motion.div 
        variants={containerVariants}
        className="mt-8 p-4 border border-gray-200 rounded-lg"
      >
        <h3 className="text-xl font-bold mb-4">Key Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants} className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-700">Authentication System</h4>
            <p className="text-sm text-gray-600">User registration, login, session management</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="p-3 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-700">Career Exploration</h4>
            <p className="text-sm text-gray-600">Extensive database of 1,200+ careers with details</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="p-3 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-700">Personalization</h4>
            <p className="text-sm text-gray-600">Quiz-based recommendations & element-level liking</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="p-3 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-700">AI Integration</h4>
            <p className="text-sm text-gray-600">Context-aware AI assistant for career guidance</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="p-3 bg-red-50 rounded-lg">
            <h4 className="font-medium text-red-700">Interactive Visualizations</h4>
            <p className="text-sm text-gray-600">Animated career path journey maps</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="p-3 bg-indigo-50 rounded-lg">
            <h4 className="font-medium text-indigo-700">Personalized Feed</h4>
            <p className="text-sm text-gray-600">AI-driven recommendations based on interactions</p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Data Flow */}
      <motion.div 
        variants={containerVariants}
        className="mt-8 p-4 border border-gray-200 rounded-lg"
      >
        <h3 className="text-xl font-bold mb-4">Data Flow</h3>
        <div className="relative h-20">
          <motion.div variants={itemVariants} className="absolute flex w-full items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">1</div>
              <p className="text-xs mt-1 text-center">User<br/>Authentication</p>
            </div>
            
            <motion.div variants={lineVariants} className="h-0.5 w-1/6 bg-gray-300"></motion.div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">2</div>
              <p className="text-xs mt-1 text-center">Career<br/>Quiz</p>
            </div>
            
            <motion.div variants={lineVariants} className="h-0.5 w-1/6 bg-gray-300"></motion.div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">3</div>
              <p className="text-xs mt-1 text-center">Personalized<br/>Dashboard</p>
            </div>
            
            <motion.div variants={lineVariants} className="h-0.5 w-1/6 bg-gray-300"></motion.div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">4</div>
              <p className="text-xs mt-1 text-center">Career<br/>Details</p>
            </div>
            
            <motion.div variants={lineVariants} className="h-0.5 w-1/6 bg-gray-300"></motion.div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">5</div>
              <p className="text-xs mt-1 text-center">Enhanced<br/>Recommendations</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
    </div>
  );
};

export default ArchitectureDiagram;