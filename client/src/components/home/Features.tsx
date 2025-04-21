import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  iconBgClass = "bg-primary-100 dark:bg-primary-900/30",
  iconTextClass = "text-primary",
  bgGradientClass = "from-primary-500 to-primary-500",
  index 
}: { 
  icon: string;
  title: string;
  description: string;
  iconBgClass?: string;
  iconTextClass?: string;
  bgGradientClass?: string;
  index: number;
}) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-r ${bgGradientClass} opacity-10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-125`}></div>
      <div className="relative">
        <div className={`w-12 h-12 rounded-lg ${iconBgClass} flex items-center justify-center mb-4`}>
          <i className={`fas ${icon} ${iconTextClass} text-xl`}></i>
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: "fa-clipboard-list",
      title: "15-Question Assessment",
      description: "Answer a quick series of targeted questions to help our AI understand your interests, skills, and work preferences.",
      iconBgClass: "bg-primary/10 dark:bg-primary-900/30",
      iconTextClass: "text-primary",
      bgGradientClass: "from-primary/20 to-primary/10"
    },
    {
      icon: "fa-chart-bar",
      title: "Comprehensive Data",
      description: "Explore 20+ data points for each career path, including salary trajectories, growth potential, and required skills.",
      iconBgClass: "bg-cyan-100 dark:bg-cyan-900/30",
      iconTextClass: "text-cyan-600 dark:text-cyan-400",
      bgGradientClass: "from-cyan-500/20 to-cyan-500/10"
    },
    {
      icon: "fa-robot",
      title: "AI Career Assistant",
      description: "Get personalized answers to your career questions, custom advice, and deep insights powered by advanced AI.",
      iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
      iconTextClass: "text-purple-600 dark:text-purple-400",
      bgGradientClass: "from-purple-500/20 to-purple-500/10"
    },
    {
      icon: "fa-thumbs-up",
      title: "Personalized Feed",
      description: "Like or dislike career paths and specific attributes to continuously refine your recommendations.",
      iconBgClass: "bg-primary/10 dark:bg-primary-900/30",
      iconTextClass: "text-primary",
      bgGradientClass: "from-primary/20 to-primary/10"
    },
    {
      icon: "fa-graduation-cap",
      title: "Education Pathways",
      description: "Discover the best degrees, courses, certifications, and learning resources for your chosen career path.",
      iconBgClass: "bg-cyan-100 dark:bg-cyan-900/30",
      iconTextClass: "text-cyan-600 dark:text-cyan-400",
      bgGradientClass: "from-cyan-500/20 to-cyan-500/10"
    },
    {
      icon: "fa-medal",
      title: "Achievement System",
      description: "Track your progress with badges and achievements as you explore different career options and build your profile.",
      iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
      iconTextClass: "text-purple-600 dark:text-purple-400",
      bgGradientClass: "from-purple-500/20 to-purple-500/10"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-100 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold font-poppins mb-4">Discover Your Career Path</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            CareerCanvas combines personalized assessments, comprehensive data, and AI guidance to help you find your ideal career.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/signup">
            <Button className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-lg hover:shadow-primary/20 transition-all transform hover:scale-105">
              <span>Start Your Career Journey</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
