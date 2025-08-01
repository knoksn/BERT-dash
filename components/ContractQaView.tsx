
import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { createContractBertChatSession } from '../services/geminiService';
import { ChatMessage, ContractAnalysis } from '../types';
import { ChatBubbleIcon, SendIcon, FileCheckIcon } from './shared/IconComponents';
import LoadingSpinner from './shared/LoadingSpinner';

interface ContractQaViewProps {
  contractAnalysis: ContractAnalysis;
  contractText: string;
}

const ContractQaView: React.FC<ContractQaViewProps> = ({ contractAnalysis, contractText }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialMessageSent = useRef(false);

  useEffect(() => {
    if (contractText) {
        chatRef.current = createContractBertChatSession(contractText);
        isInitialMessageSent.current = false;
        setMessages([]); // Clear previous messages
    }
  }, [contractText]);

  useEffect(() => {
    const sendInitialMessage = async () => {
      if (chatRef.current && !isInitialMessageSent.current && messages.length === 0) {
        isInitialMessageSent.current = true;
        setIsThinking(true);

        const botMessageId = `bot-init-${Date.now()}`;
        setMessages(prev => [...prev, { id: botMessageId, sender: 'bot', text: '' }]);

        try {
          // Send a starter message to trigger the AI's first response, including the disclaimer.
          const stream = await chatRef.current.sendMessageStream({ message: "I'm ready to discuss this contract." });
          let fullResponse = '';
          for await (const chunk of stream) {
            fullResponse += chunk.text;
            setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: fullResponse } : msg));
          }
        } catch (error) {
          console.error("Error sending initial message:", error);
          const errorMessage = 'An error occurred while starting the session.';
          setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: errorMessage } : msg));
        } finally {
          setIsThinking(false);
        }
      }
    };
    sendInitialMessage();
  }, [messages, contractText]);

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
             setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: "I'm not sure how to answer that based on the document. Can you ask in a different way?" } : msg));
        }
    } catch (error) {
        console.error("Error sending message:", error);
        setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: 'I apologize, I am unable to process that request at this time.' } : msg));
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
            <h2 className="text-2xl font-bold text-white">Q&A with ContractBERT</h2>
            <p className="text-dark-text-secondary truncate pr-4">Document: {contractAnalysis.documentType}</p>
          </div>
        </div>

        <div className="flex-grow p-4 overflow-y-auto bg-gray-900/50">
          <div className="space-y-4">
            {messages.map((msg, index) => {
                const isLastBotMessage = msg.sender === 'bot' && index === messages.length -1;
                return (
                  <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-gray-900 text-sm flex-shrink-0"><FileCheckIcon className="w-5 h-5"/></div>}
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
              placeholder="Ask about a specific clause or obligation..."
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

export default ContractQaView;