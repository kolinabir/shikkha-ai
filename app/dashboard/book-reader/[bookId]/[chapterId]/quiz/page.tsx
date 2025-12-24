"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Trophy } from 'lucide-react';
import { getBookById, getChapterById } from '../../../_data/books';
import { getPageQuestions } from '../../../_data/pageQuestions';

interface QuizQuestion {
  question: string;
  answer: string;
  options?: string[];
}

function generateOptions(correctAnswer: string): string[] {
  // Simple option generation - in real app, this would use AI
  const options = [correctAnswer.substring(0, 50) + '...'];
  // Add some dummy options
  options.push('উপরের কোনোটিই নয়');
  options.push('উভয়ই');
  options.push('নির্দিষ্ট করা যায়নি');
  return options.sort(() => Math.random() - 0.5);
}

export default function BookReaderQuizPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = params.bookId as string;
  const chapterId = params.chapterId as string;
  const page = parseInt(searchParams.get('page') || '1');

  const book = getBookById(bookId);
  const chapter = getChapterById(bookId, chapterId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeStarted] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Generate quiz questions from page data - memoized to prevent regeneration on re-renders
  // Use chapterId and page as dependencies to ensure stability
  const quizQuestions: QuizQuestion[] = useMemo(() => {
    const pageData = getPageQuestions(chapterId, page);
    return pageData.questions.slice(0, 5).map(q => ({
      question: q.question,
      answer: q.answer,
      options: generateOptions(q.answer),
    }));
  }, [chapterId, page]); // Only regenerate if chapter or page changes

  useEffect(() => {
    if (!showResults) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - timeStarted) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showResults, timeStarted]);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, index) => {
      const selected = selectedAnswers[index];
      if (selected && q.answer.includes(selected)) {
        correct++;
      }
    });
    return {
      correct,
      total: quizQuestions.length,
      percentage: Math.round((correct / quizQuestions.length) * 100),
    };
  };

  const score = showResults ? calculateScore() : null;

  if (!book || !chapter) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">কুইজ খুঁজে পাওয়া যায়নি</h1>
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:underline"
        >
          ফিরে যান
        </button>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">এই পৃষ্ঠার জন্য কুইজ নেই</h1>
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:underline"
        >
          ফিরে যান
        </button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50" lang="bn">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">{chapter.title}</h1>
              <p className="text-sm text-gray-500">{book.title} - পৃষ্ঠা {page}</p>
            </div>
          </div>
          {!showResults && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {!showResults ? (
          <>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 bengali-text">
                  প্রশ্ন {currentQuestionIndex + 1} / {quizQuestions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Object.keys(selectedAnswers).length} / {quizQuestions.length} উত্তর দেওয়া হয়েছে
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8 mb-6">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 rounded-full mb-4">
                  <span className="text-sm font-semibold text-indigo-700">প্রশ্ন {currentQuestionIndex + 1}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 bengali-text leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options?.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === option;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(currentQuestionIndex, option)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                          : 'border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-indigo-500 bg-indigo-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="bengali-text font-medium">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>পূর্ববর্তী</span>
              </button>

              <div className="flex gap-2">
                {quizQuestions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      idx === currentQuestionIndex
                        ? 'bg-indigo-600 text-white'
                        : selectedAnswers[idx]
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
              >
                <span>{currentQuestionIndex === quizQuestions.length - 1 ? 'সমাপ্ত করুন' : 'পরবর্তী'}</span>
                {currentQuestionIndex < quizQuestions.length - 1 && <ArrowLeft className="w-5 h-5 rotate-180" />}
              </button>
            </div>
          </>
        ) : (
          /* Results Screen */
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                score && score.percentage >= 70
                  ? 'bg-green-100'
                  : score && score.percentage >= 50
                  ? 'bg-yellow-100'
                  : 'bg-red-100'
              }`}>
                <Trophy className={`w-12 h-12 ${
                  score && score.percentage >= 70
                    ? 'text-green-600'
                    : score && score.percentage >= 50
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 bengali-text">কুইজ সম্পন্ন!</h2>
              <p className="text-gray-600 bengali-text">আপনার স্কোর</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-6 bg-indigo-50 rounded-xl">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {score?.correct}/{score?.total}
                </div>
                <div className="text-sm text-gray-600 bengali-text">সঠিক উত্তর</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {score?.percentage}%
                </div>
                <div className="text-sm text-gray-600 bengali-text">স্কোর</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600 bengali-text">সময়</div>
              </div>
            </div>

            {/* Question Review */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 bengali-text">উত্তর পর্যালোচনা</h3>
              {quizQuestions.map((q, idx) => {
                const selected = selectedAnswers[idx];
                const isCorrect = selected && q.answer.includes(selected);
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border-2 ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-2 bengali-text">{q.question}</p>
                        {selected && (
                          <p className={`text-sm mb-1 bengali-text ${
                            isCorrect ? 'text-green-700' : 'text-red-700'
                          }`}>
                            আপনার উত্তর: {selected}
                          </p>
                        )}
                        {!isCorrect && (
                          <p className="text-sm text-gray-700 bengali-text">
                            <span className="font-semibold">সঠিক উত্তর:</span> {q.answer.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-medium"
              >
                বই পড়া চালিয়ে যান
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                }}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
              >
                আবার করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

