// Professional Adaptive Learning Algorithm

import { Question } from '../_data/physics-questions';

export interface PerformanceMetrics {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  topicPerformance: Record<string, { correct: number; total: number }>;
  difficultyPerformance: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  };
  averageTimePerQuestion: number;
  currentStreak: number;
}

export interface AdaptiveRecommendation {
  nextDifficulty: 'easy' | 'medium' | 'hard';
  focusTopics: string[];
  recommendation: string;
  confidence: number;
  nextAction: 'continue' | 'review' | 'advance';
}

/**
 * Calculate performance score (0-100)
 */
export function calculatePerformanceScore(metrics: PerformanceMetrics): number {
  if (metrics.totalQuestions === 0) return 0;
  return Math.round((metrics.correctAnswers / metrics.totalQuestions) * 100);
}

/**
 * Analyze topic performance and identify weak areas
 */
export function analyzeTopicPerformance(metrics: PerformanceMetrics): {
  strongTopics: string[];
  weakTopics: string[];
  needsReview: string[];
} {
  const topicScores: Array<{ topic: string; score: number }> = [];

  Object.entries(metrics.topicPerformance).forEach(([topic, perf]) => {
    if (perf.total > 0) {
      const score = (perf.correct / perf.total) * 100;
      topicScores.push({ topic, score });
    }
  });

  const strongTopics = topicScores
    .filter(t => t.score >= 80)
    .map(t => t.topic);

  const weakTopics = topicScores
    .filter(t => t.score < 50)
    .map(t => t.topic);

  const needsReview = topicScores
    .filter(t => t.score >= 50 && t.score < 80)
    .map(t => t.topic);

  return { strongTopics, weakTopics, needsReview };
}

/**
 * Determine next difficulty level based on performance
 * Professional adaptive algorithm with confidence scoring
 */
export function determineNextDifficulty(
  metrics: PerformanceMetrics,
  currentDifficulty: 'easy' | 'medium' | 'hard'
): 'easy' | 'medium' | 'hard' {
  const overallScore = calculatePerformanceScore(metrics);
  const currentDiffScore = metrics.difficultyPerformance[currentDifficulty];
  const currentDiffAccuracy = currentDiffScore.total > 0
    ? (currentDiffScore.correct / currentDiffScore.total) * 100
    : 0;

  // Minimum questions threshold for reliable assessment
  const minQuestionsForAssessment = 5;
  const hasEnoughData = metrics.totalQuestions >= minQuestionsForAssessment;

  // If performing excellently (90%+) with consistent performance
  if (hasEnoughData && overallScore >= 90 && currentDiffAccuracy >= 85) {
    // Check streak for consistency
    if (metrics.currentStreak >= 3) {
      if (currentDifficulty === 'easy') return 'medium';
      if (currentDifficulty === 'medium') return 'hard';
    }
    return currentDifficulty; // Stay at hard if already there
  }

  // If performing poorly (< 50%) with consistent struggle
  if (hasEnoughData && (overallScore < 50 || currentDiffAccuracy < 40)) {
    // Check if struggling consistently
    if (metrics.currentStreak === 0 && metrics.incorrectAnswers >= 3) {
      if (currentDifficulty === 'hard') return 'medium';
      if (currentDifficulty === 'medium') return 'easy';
    }
    return currentDifficulty; // Stay at easy if already there
  }

  // Moderate performance (50-90%) - adaptive adjustment
  if (hasEnoughData) {
    // Strong performance with good streak - can advance
    if (overallScore >= 75 && currentDiffAccuracy >= 70 && metrics.currentStreak >= 2) {
      if (currentDifficulty === 'easy' && currentDiffAccuracy >= 75) return 'medium';
      if (currentDifficulty === 'medium' && currentDiffAccuracy >= 75) return 'hard';
    }

    // Weak performance - consider reducing
    if (overallScore < 65 && currentDiffAccuracy < 55 && metrics.currentStreak === 0) {
      if (currentDifficulty === 'hard') return 'medium';
      if (currentDifficulty === 'medium') return 'easy';
    }
  }

  // Default: maintain current difficulty (conservative approach)
  return currentDifficulty;
}

/**
 * Generate adaptive recommendations
 * Professional recommendation engine with detailed analysis
 */
export function generateRecommendations(
  metrics: PerformanceMetrics,
  currentDifficulty: 'easy' | 'medium' | 'hard'
): AdaptiveRecommendation {
  const overallScore = calculatePerformanceScore(metrics);
  const topicAnalysis = analyzeTopicPerformance(metrics);
  const nextDifficulty = determineNextDifficulty(metrics, currentDifficulty);

  let recommendation: string;
  let nextAction: 'continue' | 'review' | 'advance';
  let confidence: number;

  // Professional recommendation logic based on comprehensive analysis
  const hasStrongStreak = metrics.currentStreak >= 3;
  const hasConsistentPerformance = metrics.totalQuestions >= 5;
  const topicMastery = topicAnalysis.strongTopics.length / Math.max(Object.keys(metrics.topicPerformance).length, 1);

  if (overallScore >= 90 && hasConsistentPerformance && hasStrongStreak) {
    recommendation = 'অভিনন্দন! আপনি এই স্তরে উচ্চ দক্ষতা প্রদর্শন করেছেন। পরবর্তী কঠিন স্তরে অগ্রসর হওয়ার জন্য প্রস্তুত।';
    nextAction = 'advance';
    confidence = 0.95;
  } else if (overallScore >= 85 && hasConsistentPerformance) {
    recommendation = 'চমৎকার পারফরম্যান্স! আপনি এই স্তরে ভালো করছেন। পরবর্তী স্তরে চলে যাওয়ার জন্য প্রস্তুত হতে পারেন।';
    nextAction = 'advance';
    confidence = 0.85;
  } else if (overallScore >= 75 && topicMastery >= 0.6) {
    recommendation = 'ভালো পারফরম্যান্স! বেশিরভাগ বিষয়ে আপনি দক্ষ। কিছু দুর্বল বিষয়ে আরো অনুশীলন করুন।';
    nextAction = 'continue';
    confidence = 0.8;
  } else if (overallScore >= 70) {
    recommendation = 'সন্তোষজনক পারফরম্যান্স। দুর্বল বিষয়গুলোতে ফোকাস করুন এবং আরো অনুশীলন করুন।';
    nextAction = 'continue';
    confidence = 0.7;
  } else if (overallScore >= 50) {
    recommendation = 'মাঝারি পারফরম্যান্স। মৌলিক ধারণাগুলো পুনরায় পড়ুন এবং দুর্বল বিষয়গুলোতে বেশি সময় দিন।';
    nextAction = 'review';
    confidence = 0.65;
  } else {
    recommendation = 'মৌলিক ধারণাগুলো আরো ভালোভাবে বুঝতে হবে। সহজ স্তরে ফিরে যান, ধীরে ধীরে অগ্রসর হন এবং প্রতিটি ধারণা ভালোভাবে আয়ত্ত করুন।';
    nextAction = 'review';
    confidence = 0.85;
  }

  // Prioritize weak topics for focus (max 3 topics)
  const focusTopics = topicAnalysis.weakTopics.length > 0
    ? topicAnalysis.weakTopics.slice(0, 3)
    : topicAnalysis.needsReview.length > 0
    ? topicAnalysis.needsReview.slice(0, 3)
    : [];

  return {
    nextDifficulty,
    focusTopics,
    recommendation,
    confidence,
    nextAction
  };
}

/**
 * Select next question based on adaptive logic
 */
export function selectNextQuestion(
  availableQuestions: Question[],
  metrics: PerformanceMetrics,
  currentDifficulty: 'easy' | 'medium' | 'hard',
  answeredQuestionIds: string[]
): Question | null {
  // Filter available questions
  const unanswered = availableQuestions.filter(q =>
    !answeredQuestionIds.includes(q.id) && q.difficulty === currentDifficulty
  );

  if (unanswered.length === 0) {
    // No more questions at this difficulty, try next level
    const allUnanswered = availableQuestions.filter(q =>
      !answeredQuestionIds.includes(q.id)
    );
    return allUnanswered[0] || null;
  }

  // Prioritize questions from weak topics
  const topicAnalysis = analyzeTopicPerformance(metrics);
  const weakTopicQuestions = unanswered.filter(q =>
    topicAnalysis.weakTopics.includes(q.topic)
  );

  if (weakTopicQuestions.length > 0) {
    // Randomly select from weak topics
    return weakTopicQuestions[Math.floor(Math.random() * weakTopicQuestions.length)];
  }

  // If no weak topics, prioritize needs review topics
  const reviewTopicQuestions = unanswered.filter(q =>
    topicAnalysis.needsReview.includes(q.topic)
  );

  if (reviewTopicQuestions.length > 0) {
    return reviewTopicQuestions[Math.floor(Math.random() * reviewTopicQuestions.length)];
  }

  // Default: random selection from available
  return unanswered[Math.floor(Math.random() * unanswered.length)];
}

/**
 * Calculate mastery level for a topic
 */
export function calculateTopicMastery(
  topic: string,
  metrics: PerformanceMetrics
): number {
  const perf = metrics.topicPerformance[topic];
  if (!perf || perf.total === 0) return 0;
  return Math.round((perf.correct / perf.total) * 100);
}

