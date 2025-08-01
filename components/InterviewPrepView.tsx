
import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { createRoBertaChatSession } from '../services/geminiService';
import { ChatMessage, ResumeProfile } from '../types';
import { ChatBubbleIcon, SendIcon, BriefcaseIcon } from './shared/IconComponents';
import LoadingSpinner from './shared/LoadingSpinner';

interface InterviewPrepViewProps {
  resumeProfile: ResumeProfile;
}

const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({ resumeProfile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resumeProfile) {
        chatRef.current = createRoBertaChatSession(resumeProfile);
        setMessages([
          {
            id: 'init',
            sender: 'bot',
            text: `Hello, ${resumeProfile.contactInfo.name}! It's great to connect. I've reviewed your resume and it looks like you have some excellent experience. I'm ready to help you prepare. What's on your mind?`,
          },
        ]);
    }
  }, [resumeProfile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentInput = input.trim();
    if (!currentInput || isThinking || !chatRef.current) return;

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, sender: 'user', text: currentInput };
    const botMessageId = `bot-${Date.now()}`;
    const botPlaceholder: ChatMessage = { id: botMessageId, sender: 'bot', text: '' };
    
    setMessages((prev) => [...prev, userMessage, botPlaceholder]);
    setInput('');
    setIsThinking(true);
    
    try {
        const stream = await chatRef.current.sendMessageStream({ message: currentInput });
        let fullResponse = '';
        for await (const chunk of stream) {
            fullResponse += chunk.text;
            setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: fullResponse } : msg));
        }
        
        if (fullResponse.trim() === '') {
             setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: "That's a great question. Let's think about that..." } : msg));
        }
    } catch (error) {
        console.error("Error sending message:", error);
        setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: 'I apologize, I seem to be having trouble connecting. Please try again.' } : msg));
    } finally {
        setIsThinking(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 h-[calc(100vh-120px)] flex flex-col">
      <div className="bg-dark-card shadow-lg rounded-xl border border-dark-border flex flex-col flex-grow">
        <div className="p-4 border-b border-dark-border flex items-center gap-4">
          <ChatBubbleIcon className="w-8 h-8 text-accent" />
          <div>
            <h2 className="text-2xl font-bold text-white">Prep with RoBERTa</h2>
            <p className="text-dark-text-secondary">Candidate: {resumeProfile.contactInfo.name}</p>
          </div>
        </div>

        <div className="flex-grow p-4 overflow-y-auto bg-gray-900/50">
          <div className="space-y-4">
            {messages.map((msg, index) => {
                const isLastBotMessage = msg.sender === 'bot' && index === messages.length -1;
                return (
                  <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-gray-900 text-sm flex-shrink-0"><BriefcaseIcon className="w-5 h-5"/></div>}
                    <div className={`max-w-md lg:max-w-xl px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-dark-border text-dark-text rounded-bl-none'} flex items-center`}>
                      {msg.text ? <p className="whitespace-pre-wrap">{msg.text}</p> : (isThinking && isLastBotMessage && <LoadingSpinner size={20} className="text-dark-text-secondary m-1" />)}
                      {isThinking && isLastBotMessage && msg.text && <span className="inline-block w-0.5 h-5 bg-dark-text ml-1 animate-pulse" style={{ animationDuration: '1.2s' }}></span>}
                    </div>
                  </div>
                );
             })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 border-t border-dark-border">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for interview advice, practice a question..."
              className="w-full p-3 bg-gray-900 border border-dark-border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition-shadow duration-200"
              disabled={isThinking}
            />
            <button
              type="submit"
              disabled={isThinking || !input.trim()}
              className="p-3 bg-accent text-gray-900 rounded-lg hover:bg-accent-hover disabled:bg-gray-500 disabled:cursor-not-allowed flex-shrink-0 transition-colors duration-200"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepView;
