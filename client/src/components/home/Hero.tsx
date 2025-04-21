import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-10 dark:opacity-5">
        <motion.div 
          className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/60 blur-3xl" 
          animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-purple-500/60 blur-3xl" 
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-cyan-400/60 blur-3xl transform -translate-x-1/2 -translate-y-1/2" 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
      </div>
      
      {/* Hero section */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 mb-6">
              Discover Your Perfect Career Path
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
              Explore the future of your passion with AI-powered career insights and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth?tab=register">
                <Button className="w-full sm:w-auto text-base inline-flex items-center justify-center px-6 py-3 rounded-full shadow-lg hover:shadow-primary/20 transition-all transform hover:scale-105">
                  <span>Get Started</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </Button>
              </Link>
              <Link href="/auth?tab=login">
                <Button variant="outline" className="w-full sm:w-auto text-base inline-flex items-center justify-center px-6 py-3 rounded-full">
                  <i className="fas fa-user mr-2"></i>
                  <span>Sign In</span>
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              Join thousands of users who have found their perfect career path with CareerCanvas
            </p>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-full h-[500px] flex items-center justify-center">
              {/* Career path visualizations - floating cards effect */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[180px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 z-20 rotate-6"
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="bg-primary/10 dark:bg-primary-900/30 text-primary dark:text-primary-300 text-xs rounded-full px-2 py-1 inline-flex items-center w-fit mb-2">
                      <i className="fas fa-chart-line mr-1"></i>
                      <span>Data Science</span>
                    </div>
                    <h3 className="font-semibold text-lg">Data Scientist</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Analyze and interpret complex data to help organizations make better decisions.</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Avg. $120k/yr</span>
                    <span className="text-green-500">+24% growth</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute top-1/4 right-1/4 w-[260px] h-[170px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 z-10 -rotate-3"
                animate={{ y: [10, -5, 10] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs rounded-full px-2 py-1 inline-flex items-center w-fit mb-2">
                      <i className="fas fa-code mr-1"></i>
                      <span>Technology</span>
                    </div>
                    <h3 className="font-semibold text-lg">UI/UX Designer</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Create intuitive, engaging interfaces for digital products and services.</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Avg. $95k/yr</span>
                    <span className="text-green-500">+18% growth</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-1/4 left-1/4 w-[270px] h-[170px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 z-30 rotate-[-8deg]"
                animate={{ y: [5, -10, 5] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full px-2 py-1 inline-flex items-center w-fit mb-2">
                      <i className="fas fa-heartbeat mr-1"></i>
                      <span>Healthcare</span>
                    </div>
                    <h3 className="font-semibold text-lg">Nurse Practitioner</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Provide primary and specialty healthcare with more autonomy than RNs.</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Avg. $115k/yr</span>
                    <span className="text-green-500">+45% growth</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
