"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, Sparkles, FileQuestion, Trash2, Copy, Check } from 'lucide-react';
import StreamingMessage from './StreamingMessage';
import { getPageQuestions, getRandomSuggestion } from '@/app/dashboard/book-reader/_data/pageQuestions';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  quotes?: Array<{ text: string; page: number }>;
  timestamp: Date;
  isStreaming?: boolean;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  contextItems: Array<{ text: string; page: number }>;
  currentPage: number;
  chapterTitle: string;
  onClearContext: () => void;
  onAddContext?: (text: string, page: number) => void;
}

export default function ChatSidebar({
  isOpen,
  onClose,
  contextItems,
  currentPage,
  chapterTitle,
  chapterId = 'ch1',
  onClearContext,
  onAddContext,
}: ChatSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contextLoading, setContextLoading] = useState(false);
  const [contextLoaded, setContextLoaded] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Listen for askAI events
  useEffect(() => {
    const handleAskAI = (e: CustomEvent) => {
      if (e.detail?.text) {
        handleAskAIQuestion(e.detail.text);
      }
    };

    window.addEventListener('askAI' as any, handleAskAI as EventListener);
    return () => {
      window.removeEventListener('askAI' as any, handleAskAI as EventListener);
    };
  }, [currentPage, chapterTitle]);

  const handleAskAIQuestion = (text: string) => {
    const questionMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `এই অংশ সম্পর্কে ব্যাখ্যা করুন: "${text}"`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, questionMessage]);
    setIsLoading(true);
    setSuggestedQuestions([]);

    // Generate response text
    const responseText = `আপনার নির্বাচিত অংশটি ${chapterTitle} অধ্যায়ের একটি গুরুত্বপূর্ণ বিষয় নির্দেশ করে।\n\nএই অংশে আলোচিত বিষয়টি পদার্থবিজ্ঞানের ইতিহাস এবং এর বিকাশের সাথে সম্পর্কিত। এটি দেখায় যে কীভাবে বিজ্ঞানীরা সময়ের সাথে সাথে বিভিন্ন পরিমাপ এবং পর্যবেক্ষণের মাধ্যমে পদার্থবিজ্ঞানের জ্ঞান বৃদ্ধি করেছেন।\n\nএই ধারণাটি বোঝার জন্য:\n• ঐতিহাসিক প্রেক্ষাপট বুঝতে হবে\n• পরিমাপের গুরুত্ব অনুধাবন করতে হবে\n• বিজ্ঞানের ক্রমবিকাশ সম্পর্কে জানতে হবে\n\nআপনি যদি এই বিষয়ের কোনো নির্দিষ্ট দিক সম্পর্কে জানতে চান, তাহলে আমাকে জিজ্ঞাসা করুন।`;

    // Add streaming message
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      role: 'assistant',
      content: responseText,
      quotes: [{ text, page: currentPage }],
      timestamp: new Date(),
      isStreaming: true,
    };
    setMessages(prev => [...prev, aiMessage]);

    // Mark as complete after streaming would finish (approximate)
    setTimeout(() => {
      setMessages(prev => prev.map(msg =>
        msg.id === aiMessageId
          ? { ...msg, isStreaming: false }
          : msg
      ));
      setIsLoading(false);
    }, responseText.length * 30 + 500);
  };

  // Simulate context loading
  useEffect(() => {
    if (isOpen && contextItems.length > 0 && !contextLoaded) {
      setContextLoading(true);
      setTimeout(() => {
        setContextLoading(false);
        setContextLoaded(true);

        // Generate suggested questions if no messages yet - based on current page
        if (messages.length === 0) {
          const pageData = getPageQuestions(chapterId, currentPage);
          if (pageData.suggestions.length > 0) {
            setSuggestedQuestions(pageData.suggestions);
          } else {
            // Fallback suggestions
            setSuggestedQuestions([
              `এই অধ্যায়ে ${chapterTitle} সম্পর্কে মূল ধারণাগুলো কী?`,
              'এই পৃষ্ঠায় কী আলোচনা করা হয়েছে?',
              'এই বিষয়টি আরো বিস্তারিতভাবে ব্যাখ্যা করুন',
            ]);
          }
        }
      }, 2000);
    }
  }, [isOpen, contextItems, contextLoaded, messages.length, chapterTitle, chapterId, currentPage]);

  // Update suggestions when page changes (if no messages)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const pageData = getPageQuestions(chapterId, currentPage);
      if (pageData.suggestions.length > 0) {
        setSuggestedQuestions(pageData.suggestions);
      }
    }
  }, [currentPage, isOpen, messages.length, chapterId]);

  // Scroll to bottom when new messages arrive or when streaming
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-scroll during streaming
  useEffect(() => {
    const hasStreaming = messages.some(m => m.isStreaming);
    if (hasStreaming) {
      const interval = setInterval(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const question = input;
    setInput('');
    setIsLoading(true);
    setSuggestedQuestions([]);

    // Generate response text
    const responseText = generateMockResponse(question, contextItems, currentPage, chapterId);

    // Add streaming message
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      role: 'assistant',
      content: responseText,
      quotes: contextItems.length > 0 ? contextItems.slice(0, 2) : undefined,
      timestamp: new Date(),
      isStreaming: true,
    };
    setMessages(prev => [...prev, aiMessage]);

    // Mark as complete after streaming would finish
    setTimeout(() => {
      setMessages(prev => prev.map(msg =>
        msg.id === aiMessageId
          ? { ...msg, isStreaming: false }
          : msg
      ));
      setIsLoading(false);
    }, responseText.length * 30 + 500);
  };

  const handleSuggestedQuestion = (question: string) => {
    // Add context from page 10 when clicking demo questions
    if (onAddContext) {
      onAddContext(
        `পৃষ্ঠা ১০ থেকে নির্বাচিত কনটেক্সট: ${chapterTitle} অধ্যায়ের গুরুত্বপূর্ণ বিষয়বস্তু`,
        10
      );
    }
    setInput(question);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full w-full bg-white flex flex-col" lang="bn">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="font-bold text-gray-900">AI সহায়ক</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Context Loading Status */}
      {contextLoading && (
        <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>কনটেক্সট লোড হচ্ছে...</span>
          </div>
        </div>
      )}

      {contextLoaded && contextItems.length > 0 && (
        <div className="px-4 py-3 bg-green-50 border-b border-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-green-700">
              <Check className="w-4 h-4" />
              <span>কনটেক্সট লোড হয়েছে ({contextItems.length}টি আইটেম)</span>
            </div>
            <button
              onClick={onClearContext}
              className="text-xs text-green-600 hover:text-green-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Context Items */}
      {contextItems.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 max-h-32 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-600 mb-2">কনটেক্সট:</p>
          <div className="space-y-1">
            {contextItems.map((item, idx) => (
              <div key={idx} className="text-xs text-gray-600 bg-white p-2 rounded border border-gray-200">
                <span className="font-medium bengali-text" lang="bn">পৃষ্ঠা {item.page}:</span> <span className="bengali-text" lang="bn">{item.text.replace(/undefined/g, '').trim().substring(0, 50)}...</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Questions */}
      {suggestedQuestions.length > 0 && messages.length === 0 && (
        <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <FileQuestion className="w-4 h-4 text-indigo-600" />
            <p className="text-xs font-semibold text-indigo-700">প্রস্তাবিত প্রশ্ন:</p>
          </div>
          <div className="space-y-2">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestedQuestion(question)}
                className="w-full text-left text-sm text-indigo-700 bg-white p-2 rounded border border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                {question}
              </button>
            ))}
            <button
              onClick={() => {
                // Generate quiz
                const quizMessage: Message = {
                  id: Date.now().toString(),
                  role: 'user',
                  content: 'এই পৃষ্ঠার জন্য একটি কুইজ তৈরি করুন',
                  timestamp: new Date(),
                };
                setMessages([quizMessage]);
                setIsLoading(true);
                const quizResponseText = generateMockQuiz(currentPage);
                const quizResponseId = (Date.now() + 1).toString();
                const quizResponse: Message = {
                  id: quizResponseId,
                  role: 'assistant',
                  content: quizResponseText,
                  timestamp: new Date(),
                  isStreaming: true,
                };
                setMessages([quizMessage, quizResponse]);

                setTimeout(() => {
                  setMessages(prev => prev.map(msg =>
                    msg.id === quizResponseId
                      ? { ...msg, isStreaming: false }
                      : msg
                  ));
                  setIsLoading(false);
                  setSuggestedQuestions([]);
                }, quizResponseText.length * 30 + 500);
              }}
              className="w-full text-left text-sm font-semibold text-indigo-700 bg-indigo-100 p-2 rounded border border-indigo-300 hover:bg-indigo-200 transition-colors flex items-center gap-2"
            >
              <FileQuestion className="w-4 h-4" />
              এই পৃষ্ঠার জন্য কুইজ তৈরি করুন
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.isStreaming ? (
                <p className="text-sm whitespace-pre-wrap">
                  <StreamingMessage
                    content={message.content}
                    isStreaming={true}
                  />
                </p>
              ) : (
                <p className="text-sm whitespace-pre-wrap bengali-text" lang="bn">{message.content}</p>
              )}

              {/* Quotes */}
              {message.quotes && message.quotes.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.quotes.map((quote, idx) => (
                    <div
                      key={idx}
                      className="bg-white/20 p-2 rounded border-l-2 border-white/40 text-xs"
                    >
                      <span className="font-medium bengali-text" lang="bn">পৃষ্ঠা {quote.page}:</span> <span className="bengali-text" lang="bn">{quote.text.replace(/undefined/g, '').trim()}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleCopy(message.content, message.id)}
                  className="text-xs opacity-70 hover:opacity-100 transition-opacity"
                >
                  {copiedId === message.id ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString('bn-BD', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isLoading && !messages.some(m => m.isStreaming) && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="কোনো প্রশ্ন করুন..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Mock response generator
function generateMockResponse(
  question: string,
  contextItems: Array<{ text: string; page: number }>,
  currentPage: number,
  chapterId: string = 'ch1'
): string {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes('কুইজ') || lowerQuestion.includes('quiz')) {
    return generateMockQuiz(currentPage);
  }

  // Check if there's a page-specific answer
  const pageData = getPageQuestions(chapterId, currentPage);
  const matchingQuestion = pageData.questions.find(q =>
    question.toLowerCase().includes(q.question.toLowerCase().substring(0, 10)) ||
    q.question.toLowerCase().includes(question.toLowerCase().substring(0, 10))
  );

  if (matchingQuestion) {
    return matchingQuestion.answer;
  }

  // Generate independent explanations based on question type
  if (lowerQuestion.includes('মূল ধারণা') || lowerQuestion.includes('ধারণা')) {
    return `এই অধ্যায়ের মূল ধারণাগুলো হলো:\n\n১. ভৌত রাশি: পদার্থবিজ্ঞানে ব্যবহৃত পরিমাপযোগ্য রাশি, যেমন দৈর্ঘ্য, ভর, সময় ইত্যাদি।\n\n২. পরিমাপ: বিভিন্ন ভৌত রাশির সঠিক পরিমাপের পদ্ধতি এবং একক।\n\n৩. পরিমাপের যন্ত্রপাতি: বিভিন্ন রাশি পরিমাপের জন্য ব্যবহৃত যন্ত্র, যেমন স্কেল, থার্মোমিটার, স্টপওয়াচ ইত্যাদি।\n\n৪. নির্ভুলতা ও যথার্থতা: পরিমাপের সঠিকতা বজায় রাখার কৌশল এবং ত্রুটির কারণ।\n\nএই বিষয়গুলো পদার্থবিজ্ঞানের ভিত্তি হিসেবে কাজ করে এবং পরবর্তী অধ্যায়গুলো বুঝতে সহায়তা করে।`;
  }

  if (lowerQuestion.includes('পৃষ্ঠা') || lowerQuestion.includes('আলোচনা')) {
    return `এই পৃষ্ঠায় পদার্থবিজ্ঞানের পরিসর এবং এর ক্রমবিকাশ সম্পর্কে আলোচনা করা হয়েছে। পদার্থবিজ্ঞান একটি প্রাচীন বিজ্ঞান যা পদার্থ, শক্তি এবং তাদের মধ্যকার মিথস্ক্রিয়া নিয়ে আলোচনা করে।\n\nপদার্থবিজ্ঞানের গুরুত্ব:\n- দৈনন্দিন জীবনে ব্যবহৃত প্রযুক্তির ভিত্তি\n- অন্যান্য বিজ্ঞানের সাথে আন্তঃসম্পর্ক\n- সভ্যতার বিকাশে অবদান\n\nএই অধ্যায়ে পরিমাপের গুরুত্ব এবং বিভিন্ন ভৌত রাশির পরিমাপ পদ্ধতি সম্পর্কে বিস্তারিত জানতে পারবেন।`;
  }

  if (lowerQuestion.includes('ব্যাখ্যা') || lowerQuestion.includes('বিস্তারিত')) {
    return `পদার্থবিজ্ঞান হলো প্রকৃতির মৌলিক নিয়মগুলো নিয়ে অধ্যয়ন। এটি আমাদের চারপাশের বিশ্বকে বুঝতে সাহায্য করে।\n\nমূল বিষয়সমূহ:\n\n১. পরিসর: পদার্থবিজ্ঞানের পরিসর অত্যন্ত বিস্তৃত - ক্ষুদ্রতম কণা থেকে বৃহত্তম মহাবিশ্ব পর্যন্ত।\n\n২. উদ্দেশ্য: প্রকৃতির নিয়ম আবিষ্কার এবং ব্যাখ্যা করা, যা প্রযুক্তির উন্নয়নে সাহায্য করে।\n\n৩. পরিমাপ: সঠিক পরিমাপ ছাড়া বিজ্ঞান সম্ভব নয়। তাই পরিমাপের পদ্ধতি এবং যন্ত্রপাতি জানা অত্যন্ত গুরুত্বপূর্ণ।\n\n৪. প্রয়োগ: পদার্থবিজ্ঞানের জ্ঞান দৈনন্দিন জীবনে, প্রযুক্তিতে এবং অন্যান্য বিজ্ঞানে ব্যবহৃত হয়।\n\nএই অধ্যায়ে এই বিষয়গুলো নিয়ে বিস্তারিত আলোচনা করা হবে।`;
  }

  // Default independent response
  return `আমি এই অধ্যায় সম্পর্কে আপনাকে সাহায্য করতে পারি।\n\nএই অধ্যায়ে আলোচিত মূল বিষয়গুলো:\n\n• পদার্থবিজ্ঞানের পরিসর এবং ক্রমবিকাশ\n• ভৌত রাশি এবং তাদের পরিমাপ\n• পরিমাপের যন্ত্রপাতি\n• পরিমাপের নির্ভুলতা এবং যথার্থতা\n\nআপনি যদি কোনো নির্দিষ্ট বিষয় সম্পর্কে জানতে চান, তাহলে আমাকে জিজ্ঞাসা করুন। আমি বিস্তারিত ব্যাখ্যা দিতে পারব।`;
}

function generateMockQuiz(page: number): string {
  return `এই পৃষ্ঠার জন্য কুইজ:\n\n1. এই পৃষ্ঠায় আলোচিত মূল ধারণাটি কী?\n2. উদাহরণ দিয়ে ব্যাখ্যা করুন।\n3. এর প্রয়োগ কোথায় দেখা যায়?\n\nউত্তর জানতে প্রতিটি প্রশ্নের উপর ক্লিক করুন।`;
}

