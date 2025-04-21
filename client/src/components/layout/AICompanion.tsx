import { useState, useRef, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

type SuggestedQuestion = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: '1',
    icon: 'fa-search',
    title: 'What skills should I develop for UX design?',
    description: 'Get recommendations on must-have skills'
  },
  {
    id: '2',
    icon: 'fa-graduation-cap',
    title: 'Is a degree necessary for data science?',
    description: 'Learn about education requirements'
  },
  {
    id: '3',
    icon: 'fa-code-branch',
    title: 'How can I transition from marketing to product management?',
    description: 'Get a personalized transition plan'
  },
  {
    id: '4',
    icon: 'fa-map-marker-alt',
    title: 'Best cities for software developers in 2023?',
    description: 'Discover top locations for your career'
  }
];

interface AICompanionProps {
  onClose?: () => void;
  fullPage?: boolean;
}

const AICompanion = ({ onClose, fullPage = false }: AICompanionProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: "Hi there! I'm your CareerCanvas AI assistant. How can I help with your career journey today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await apiRequest('POST', '/api/chat', { message: content });
      const data = await response.json();
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI assistant",
        variant: "destructive"
      });
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: "Sorry, I couldn't process your request at the moment. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: SuggestedQuestion) => {
    handleSendMessage(question.title);
  };

  return (
    <div className={`${fullPage ? 'w-full h-full' : 'fixed bottom-24 right-6 md:right-10 z-50 max-w-4xl w-[95%] md:w-[550px] shadow-2xl rounded-2xl'} overflow-hidden`}>
      <div className={`bg-white dark:bg-gray-800 flex flex-col ${fullPage ? 'h-full min-h-[calc(100vh-64px)]' : 'h-[500px] max-h-[80vh]'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary to-purple-500 text-white">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <i className="fas fa-robot"></i>
            </div>
            <span className="font-medium">Career AI Assistant</span>
          </div>
          {!fullPage && onClose && (
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
          {messages.map((message) => (
            <div key={message.id} className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
              {message.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-500 flex-shrink-0 flex items-center justify-center">
                  <i className="fas fa-robot text-white text-xs"></i>
                </div>
              )}
              
              <div className={`mx-3 p-3 rounded-lg max-w-[80%] ${
                message.sender === 'ai' 
                  ? 'bg-gray-100 dark:bg-gray-700 rounded-tl-none' 
                  : 'bg-primary/10 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-tr-none'
              }`}>
                <p className={message.sender === 'ai' ? 'text-gray-800 dark:text-gray-200' : ''}>
                  {message.content}
                </p>
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <i className="fas fa-user text-gray-500 dark:text-gray-400"></i>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center justify-center text-gray-400 text-sm my-2">
              <span>AI is typing</span>
              <span className="ml-2 flex space-x-1">
                <span className="animate-bounce delay-100 w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="animate-bounce delay-200 w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="animate-bounce delay-300 w-1 h-1 bg-gray-400 rounded-full"></span>
              </span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 2 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h3 className="text-sm font-semibold mb-3">Suggested questions:</h3>
            <div className="space-y-2 max-h-[150px] overflow-y-auto">
              {suggestedQuestions.map(question => (
                <div 
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  className="flex items-start bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="bg-primary/10 dark:bg-primary-900/30 rounded-full p-2 mr-3">
                    <i className={`fas ${question.icon} text-primary`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{question.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{question.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="relative">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }
              }}
              placeholder="Ask a question..." 
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            <button 
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full ${
                isLoading || !inputValue 
                  ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90'
              } flex items-center justify-center text-white transition-colors`}
              onClick={() => handleSendMessage(inputValue)}
              disabled={isLoading || !inputValue}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICompanion;
