"use client";

import React from 'react';
import { Loader2, Brain, Sparkles, FileQuestion } from 'lucide-react';

interface QuizGeneratorProps {
  onComplete: () => void;
}

const steps = [
  { icon: Brain, text: 'বিষয়বস্তু বিশ্লেষণ করছি...', delay: 0 },
  { icon: Sparkles, text: 'প্রশ্ন তৈরি করছি...', delay: 1500 },
  { icon: FileQuestion, text: 'কুইজ প্রস্তুত হচ্ছে...', delay: 3000 },
];

export default function QuizGenerator({ onComplete }: QuizGeneratorProps) {
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // 4 seconds

    const intervals = steps.map((step, index) => {
      return setTimeout(() => {
        setCurrentStep(index);
      }, step.delay);
    });

    return () => {
      clearTimeout(timer);
      intervals.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 bengali-text">কুইজ তৈরি হচ্ছে</h2>
            <p className="text-gray-600 bengali-text">অনুগ্রহ করে অপেক্ষা করুন...</p>
          </div>

          <div className="w-full space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                    isActive
                      ? 'bg-indigo-50 border-2 border-indigo-200'
                      : isCompleted
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200 opacity-50'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-600'
                        : isCompleted
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                    )}
                  </div>
                  <span
                    className={`font-medium bengali-text ${
                      isActive ? 'text-indigo-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                    }`}
                  >
                    {step.text}
                  </span>
                  {isActive && (
                    <Loader2 className="w-4 h-4 text-indigo-600 animate-spin ml-auto" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

