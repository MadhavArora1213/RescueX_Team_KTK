import React, { useState } from 'react';

const ChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim()) {
            setChatHistory([...chatHistory, { sender: 'User', message: userInput }]);
            // Here you would typically send the user input to your chatbot API
            // For demonstration, we'll just echo the message back
            setChatHistory((prev) => [...prev, { sender: 'Bot', message: `You said: ${userInput}` }]);
            setUserInput('');
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={chat.sender === 'User' ? 'user-message' : 'bot-message'}>
                        <strong>{chat.sender}: </strong>{chat.message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="chat-input-form">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};

export default ChatBot;