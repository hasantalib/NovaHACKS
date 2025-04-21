import { motion } from 'framer-motion';
import { QuizQuestion } from '@/types';

interface QuizCardProps {
  question: QuizQuestion;
  selectedOption: string | null;
  onOptionSelect: (optionId: string) => void;
}

const QuizCard = ({ question, selectedOption, onOptionSelect }: QuizCardProps) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl md:text-2xl font-semibold mb-6">{question.question}</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        {question.options.map((option) => (
          <motion.label 
            key={option.id}
            className="cursor-pointer relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <input 
              type="radio" 
              name={`question-${question.id}`}
              value={option.id} 
              checked={selectedOption === option.id}
              onChange={() => onOptionSelect(option.id)}
              className="peer sr-only" 
            />
            <div className="flex items-start p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 peer-checked:border-primary dark:peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 transition-all">
              <i className={`fas ${option.icon} text-2xl text-gray-400 peer-checked:text-primary mr-4 mt-1 group-hover:text-primary/70 transition-colors`}></i>
              <div>
                <h4 className="font-medium">{option.text}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{option.description}</p>
              </div>
            </div>
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 peer-checked:border-primary dark:peer-checked:border-primary peer-checked:bg-primary dark:peer-checked:bg-primary transition-all flex items-center justify-center">
              <i className="fas fa-check text-white scale-0 peer-checked:scale-100 transition-transform"></i>
            </div>
          </motion.label>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizCard;
