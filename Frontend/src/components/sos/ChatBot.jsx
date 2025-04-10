import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaRobot, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

// This exports the named component 'ChatBot' to fix the import error
export const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm RescueBot. How can I assist you in this emergency?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Show bot is typing
    setIsTyping(true);
    
    // Simulate API call to chatbot backend
    try {
      // In a real implementation, this would be an API call to your backend
      // const response = await axios.post('/api/chatbot/query', { 
      //   query: input,
      //   userId: 'guest-user'  
      // });
      
      // For demo purposes, we'll just simulate a response
      setTimeout(() => {
        const botResponses = {
          'help': "If you need immediate assistance, please use the SOS button on the top right of the screen. What type of emergency are you facing?",
          'fire': "In case of fire: 1) Call emergency services immediately 2) Evacuate the building 3) Do not use elevators 4) Cover your mouth and nose with a wet cloth if there's smoke",
          'flood': "For flooding: 1) Move to higher ground 2) Avoid walking through moving water 3) Do not drive through flooded areas 4) Be prepared to evacuate",
          'earthquake': "During an earthquake: 1) Drop to the ground 2) Take cover under sturdy furniture 3) Hold on until shaking stops 4) Stay away from windows and exterior walls",
          'medical': "For medical emergencies: 1) Call emergency services 2) Stay with the person 3) Do not move them unless necessary 4) If trained, provide first aid"
        };
        
        let botReply = "I'm not sure how to help with that specific issue. Could you provide more details about your emergency situation?";
        
        // Check for keywords in user input
        Object.keys(botResponses).forEach(keyword => {
          if (input.toLowerCase().includes(keyword)) {
            botReply = botResponses[keyword];
          }
        });
        
        const botMessage = {
          id: messages.length + 2,
          text: botReply,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      
      // Handle error with a message
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm having trouble connecting. Please try again or use the emergency number if urgent.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden h-[500px]">
      <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-4">
        <div className="flex items-center">
          <FaRobot className="text-white text-2xl mr-2" />
          <h2 className="text-xl font-bold text-white">Emergency Assistant</h2>
        </div>
        <p className="text-white text-sm opacity-80">Get guidance during emergency situations</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className="flex-shrink-0 mr-2">
                <FaRobot className="h-8 w-8 rounded-full bg-red-100 p-1 text-red-600" />
              </div>
            )}
            
            <div 
              className={`px-4 py-2 rounded-lg max-w-[70%] ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
            
            {message.sender === 'user' && (
              <div className="flex-shrink-0 ml-2">
                <FaUserCircle className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex mb-4 justify-start">
            <div className="flex-shrink-0 mr-2">
              <FaRobot className="h-8 w-8 rounded-full bg-red-100 p-1 text-red-600" />
            </div>
            <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your emergency question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-2 rounded-r-lg hover:from-red-700 hover:to-yellow-600"
          >
            <FaPaperPlane />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Example questions: "What to do in case of fire?", "How to help during flood?"
        </p>
      </form>
      
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          border-radius: 50%;
          background-color: #606060;
          display: inline-block;
          animation: typing 1.4s infinite ease-in-out both;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.6); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

// Also export as default for flexibility
export default ChatBot;