import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { fetchHistory, sendMessage } from '../api';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Load chat history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadHistory = async () => {
    try {
      setIsLoadingHistory(true);
      setError(null);
      const history = await fetchHistory();
      setMessages(history);
    } catch (err) {
      setError('Failed to load chat history. Please refresh the page.');
      console.error('Error loading history:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) {
      return;
    }

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);
    setError(null);

    // Optimistically add user message
    const tempUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
      id: `temp-${Date.now()}`,
    };
    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      const response = await sendMessage(userMessage);
      
      // Replace temp message with actual user message and add AI response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== tempUserMessage.id);
        return [
          ...filtered,
          {
            role: 'user',
            content: userMessage,
            timestamp: new Date().toISOString(),
          },
          {
            role: 'ai',
            content: response.response,
            timestamp: response.timestamp,
          },
        ];
      });
    } catch (err) {
      // Remove temp message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== tempUserMessage.id));
      setError(err.message || 'Failed to send message. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md px-4 py-4 md:px-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          💬 AI Chat Assistant
        </h1>
        <p className="text-xs md:text-sm text-gray-600 mt-1">
          Chat with AI - Your conversation history is saved
        </p>
      </div>

      {/* Error Toast */}
      {error && (
        <div className="mx-4 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg animate-slide-down">
          <div className="flex justify-between items-center">
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900 font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
        {isLoadingHistory ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-gray-500">Loading chat history...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-lg mb-2">👋 Start a conversation!</p>
              <p className="text-sm">Send a message to begin chatting with AI.</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble key={message.id || index} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Form */}
      <div className="bg-white border-t border-gray-200 px-4 md:px-6 py-4">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading || isLoadingHistory}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm md:text-base"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading || isLoadingHistory}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200 text-sm md:text-base shadow-md hover:shadow-lg"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

