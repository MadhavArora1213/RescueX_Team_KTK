import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

// If you want to use the syntax highlighter, install it first:
// npm install react-syntax-highlighter
// For now, we'll use a simpler approach without the syntax highlighter

const initialMessages = [
  {
    id: 1,
    text: "Hello! I'm the RescueGrid Emergency Assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date().toISOString(),
  },
];

const ChatBot = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = processUserQuery(input);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Simple mock response function - in a real app, this would call your backend API
  const processUserQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    let response = '';

    if (lowerQuery.includes('fire') || lowerQuery.includes('burning')) {
      response = `
      If you're experiencing a fire emergency:
      
      1. Evacuate immediately if it's not safe
      2. Call emergency services at 101
      3. Stay low to the ground to avoid smoke
      4. Do not use elevators
      5. Feel doors before opening - if hot, don't open
      
      I've marked your location for emergency responders.
      `;
    }
    else if (lowerQuery.includes('flood') || lowerQuery.includes('water')) {
      response = `
      For flood emergencies:
      
      1. Move to higher ground immediately
      2. Avoid walking or driving through flood waters
      3. Stay away from power lines and electrical wires
      4. If trapped, signal for help and call emergency services
      
      Remember: just 6 inches of moving water can knock you down.
      `;
    }
    else if (lowerQuery.includes('medical') || lowerQuery.includes('hurt') || lowerQuery.includes('injured')) {
      response = `
      For medical emergencies:
      
      1. Call emergency medical services at 112
      2. Check for breathing and pulse
      3. If trained, administer CPR if needed
      4. Control any bleeding with direct pressure
      5. Keep the person still and warm
      
      I've alerted nearby medical responders to your location.
      `;
    }
    else {
      response = `I understand you need assistance. Could you please specify if this is a fire, flood, medical, or other type of emergency? This will help me provide the most relevant guidance.`;
    }

    return {
      id: Date.now() + 1,
      text: response,
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
  };

  const formatMessage = (text) => {
    if (!text.includes('```')) return <p>{text}</p>;

    const parts = text.split('```');
    return (
      <>
        {parts.map((part, index) => {
          if (index % 2 === 0) {
            return <p key={index}>{part}</p>;
          } else {
            // Simple code block without syntax highlighting
            return (
              <div key={index} className="my-2 rounded overflow-hidden">
                <pre className="text-sm p-4 bg-gray-100 rounded font-mono">
                  {part}
                </pre>
              </div>
            );
          }
        })}
      </>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
        <h2 className="text-lg font-semibold flex items-center">
          <FaRobot className="mr-2" /> Emergency AI Assistant
        </h2>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 rounded-lg p-3 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {msg.sender === 'user' ? (
                  <FaUser className="mr-2 text-xs" />
                ) : (
                  <FaRobot className="mr-2 text-xs" />
                )}
                <span className="font-medium text-xs">
                  {msg.sender === 'user' ? 'You' : 'Assistant'}
                </span>
              </div>
              <div className="whitespace-pre-wrap text-sm">
                {formatMessage(msg.text)}
              </div>
              <div className="text-right mt-1">
                <span className="text-xs opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex mb-4">
            <div className="bg-gray-200 text-gray-800 rounded-lg p-3 rounded-bl-none max-w-3/4">
              <div className="flex items-center mb-1">
                <FaRobot className="mr-2 text-xs" />
                <span className="font-medium text-xs">Assistant</span>
              </div>
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
      
      <div className="border-t p-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your emergency question here..."
          className="flex-grow border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className={`bg-blue-600 text-white px-4 py-2 rounded-r flex items-center ${
            !input.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          <FaPaperPlane className="mr-1" /> Send
        </button>
      </div>
    </div>
  );
};

// Add both named and default export to support either import style
export { ChatBot };
export default ChatBot;