import { useState, useRef, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Career } from '@/types';
import { Button } from '@/components/ui/button';
import { SendIcon, Sparkles, RotateCw } from 'lucide-react';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

interface CareerInsightAIProps {
  career: Career;
}

const CareerInsightAI = ({ career }: CareerInsightAIProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Ensure career is defined with safe defaults
  const safeCareer = career || { id: 0, title: "this career", field: "general" } as Career;

  // Career-specific suggested questions
  const suggestedQuestions = [
    `What skills should I focus on to become a ${safeCareer.title}?`,
    `What's the typical day like for a ${safeCareer.title}?`,
    `Is it possible to transition to ${safeCareer.title} from a different field?`,
    `What education is required for a ${safeCareer.title} position?`
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate initial greeting on component mount
  useEffect(() => {
    const initialMessage: Message = {
      id: 'initial',
      sender: 'ai',
      content: `I can provide personalized insights about a career as a ${safeCareer.title}. What would you like to know?`,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, [safeCareer.title]);

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
      // Send message to AI with career context
      const payload = { 
        message: content,
        conversationId: conversationId || undefined,
        context: {
          careerContext: {
            id: safeCareer.id,
            title: safeCareer.title,
            field: safeCareer.field
          }
        }
      };
      
      const response = await apiRequest('POST', '/api/chat', payload);
      const data = await response.json();
      
      // Store conversation ID for continued context
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
      
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-primary/80 to-primary text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <h3 className="font-medium">AI Career Insights</h3>
        </div>
        {messages.length > 1 && (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => {
              // Reset conversation but keep initial message
              setMessages([messages[0]]);
              setConversationId(null);
            }}
            className="h-8 text-white hover:bg-white/20 hover:text-white border-white/30"
          >
            <RotateCw className="h-3 w-3 mr-2" />
            <span className="text-xs">Reset chat</span>
          </Button>
        )}
      </div>

      <div className="flex flex-col h-[300px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'ai' 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
                  : 'bg-primary/10 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
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
              placeholder="Ask about this career..." 
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              <SendIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerInsightAI;