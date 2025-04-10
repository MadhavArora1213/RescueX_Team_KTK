import React, { useState, useEffect, useRef } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { FaPaperPlane, FaUserCircle, FaEllipsisV, FaSearch, FaCheckDouble } from 'react-icons/fa';
import { db } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  
  // Fetch conversations
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const conversationsData = [];
      
      snapshot.forEach(doc => {
        conversationsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setConversations(conversationsData);
      
      // Set active conversation if none is selected
      if (!activeConversation && conversationsData.length > 0) {
        setActiveConversation(conversationsData[0]);
      }
    });

    return () => unsubscribe();
  }, [user, activeConversation]);

  // Fetch messages for active conversation
  useEffect(() => {
    if (!activeConversation) return;

    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', activeConversation.id),
      orderBy('timestamp', 'asc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = [];
      
      snapshot.forEach(doc => {
        messagesData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [activeConversation]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    try {
      await addDoc(collection(db, 'messages'), {
        conversationId: activeConversation.id,
        senderId: user.uid,
        text: newMessage,
        timestamp: serverTimestamp(),
        status: 'sent'
      });
      
      // Update conversation's last message
      // In a real app, you might use a Cloud Function for this
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation);
  };

  const getOtherParticipant = (conversation) => {
    if (!conversation || !conversation.participants) return { name: 'Unknown' };
    
    const otherParticipantId = conversation.participants.find(id => id !== user?.uid);
    return conversation.participantsData?.[otherParticipantId] || { name: 'Agency' };
  };

  const filteredConversations = conversations.filter(conversation => {
    const otherParticipant = getOtherParticipant(conversation);
    return otherParticipant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatTime = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return '';
    
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Conversation List */}
      <div className="w-1/3 border-r border-gray-200 bg-gray-50">
        <div className="p-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
          <div className="mt-2 relative">
            <input
              type="text"
              placeholder="Search agencies..."
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-2.5 top-2.5 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => {
              const otherParticipant = getOtherParticipant(conversation);
              const isActive = activeConversation?.id === conversation.id;
              
              return (
                <div
                  key={conversation.id}
                  className={`p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${
                    isActive ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleConversationClick(conversation)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {otherParticipant.photoURL ? (
                        <img
                          src={otherParticipant.photoURL}
                          alt={otherParticipant.name}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <FaUserCircle className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {otherParticipant.name}
                        </p>
                        {conversation.lastMessage?.timestamp && (
                          <p className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage?.text || 'Start a conversation'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-gray-500">
              {searchTerm ? 'No matching conversations' : 'No conversations yet'}
            </div>
          )}
        </div>
      </div>
      
      {/* Message Thread */}
      <div className="flex flex-col w-2/3">
        {activeConversation ? (
          <>
            <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {getOtherParticipant(activeConversation).photoURL ? (
                    <img
                      src={getOtherParticipant(activeConversation).photoURL}
                      alt={getOtherParticipant(activeConversation).name}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-900">
                    {getOtherParticipant(activeConversation).name}
                  </p>
                  <div className="flex items-center">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-1"></span>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <FaEllipsisV />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.length > 0 ? (
                <div className="space-y-3">
                  {messages.map((message) => {
                    const isSender = message.senderId === user?.uid;
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            isSender
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div
                            className={`flex items-center justify-end mt-1 text-xs ${
                              isSender ? 'text-blue-200' : 'text-gray-500'
                            }`}
                          >
                            <span>{formatTime(message.timestamp)}</span>
                            {isSender && (
                              <FaCheckDouble className="ml-1 text-xs" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No messages yet. Start a conversation!</p>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-center">
              <FaUserCircle className="mx-auto h-16 w-16 text-gray-300" />
              <p className="mt-4 text-lg text-gray-600">Select a conversation</p>
              <p className="mt-2 text-sm text-gray-500">
                Choose a contact to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;