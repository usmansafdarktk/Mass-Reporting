import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiPlus } from 'react-icons/fi';
import UserProfile from "../images/user/user-01.png";
import ChatbotIcon from '../images/chatbot.png';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const dummyReply = (msg: string) => {
  return `You asked: "${msg}"\n\nThis is a placeholder response. The AI assistant will soon provide relevant violation insights.`;
};

const ChatbotWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: input },
      { role: 'assistant', content: dummyReply(input) },
    ];
    setMessages(newMessages);
    setInput('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex items-start justify-center px-4 text-gray-900 dark:text-white">
      <div className="w-full max-w-3xl bg-white dark:bg-[#1e293b] rounded-lg shadow-lg flex flex-col border border-gray-300 dark:border-gray-700">
        {/* Header */}
        <div className="bg-[#e0f2ff] dark:bg-blue-900/30 border-b border-gray-400 dark:border-gray-600 text-black dark:text-white font-bold text-lg px-6 py-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-2">
            <img src={ChatbotIcon} alt="Chatbot Icon" className="w-8 h-8 object-cover" />
            Violation Assistant
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-700 shadow">
            <img src={UserProfile} alt="User" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Chat Body */}
        <div className="px-4 py-3 h-80 overflow-y-auto space-y-4 bg-gray-50 dark:bg-slate-800">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`rounded-lg px-3 py-2 text-sm whitespace-pre-wrap max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-300 dark:border-gray-600 px-4 py-3 flex items-center gap-2 bg-white dark:bg-[#1e293b] rounded-b-lg">
          {/* + Icon */}
          <button className="cursor-pointer rounded-full border border-gray-300 dark:border-gray-600 w-9 h-9 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700">
            <FiPlus className="text-xl text-gray-700 dark:text-white" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            placeholder="Ask the assistant about a complaint..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-black dark:text-white"
          />

          {/* Send Button */}
          <button
            onClick={sendMessage}
            className="cursor-pointer bg-blue-700 text-white rounded-full p-2 hover:bg-blue-800"
          >
            <FiSend className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;
