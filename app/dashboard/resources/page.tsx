"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Filter,
  BookMarked,
  FileText,
  ExternalLink,
  Zap,
  Calculator,
  Globe,
  Atom,
  FlaskConical,
  Leaf,
  MapPin,
  TrendingUp,
  Sprout,
  Languages,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { NCTB_BOOKS } from '@/app/dashboard/book-reader/_data/books';

// Subject icons mapping
const subjectIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Bengali: Languages,
  English: Globe,
  Mathematics: Calculator,
  Physics: Atom,
  Chemistry: FlaskConical,
  Biology: Leaf,
  Science: Zap,
  ICT: Zap,
  Geography: MapPin,
  Economics: TrendingUp,
  Agriculture: Sprout,
};

// Subject colors mapping
const subjectColors: Record<string, string> = {
  Bengali: 'from-blue-500 to-cyan-500',
  English: 'from-purple-500 to-pink-500',
  Mathematics: 'from-green-500 to-emerald-500',
  Physics: 'from-orange-500 to-red-500',
  Chemistry: 'from-yellow-500 to-amber-500',
  Biology: 'from-green-600 to-teal-600',
  Science: 'from-indigo-500 to-blue-500',
  ICT: 'from-cyan-500 to-blue-500',
  Geography: 'from-teal-500 to-green-500',
  Economics: 'from-rose-500 to-pink-500',
  Agriculture: 'from-lime-500 to-green-500',
};

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Get unique subjects and classes
  const subjects = useMemo(() => {
    const uniqueSubjects = Array.from(new Set(NCTB_BOOKS.map(book => book.subject)));
    return uniqueSubjects.sort();
  }, []);

  const classes = useMemo(() => {
    const uniqueClasses = Array.from(new Set(NCTB_BOOKS.map(book => book.class)));
    return uniqueClasses.sort();
  }, []);

  // Filter books based on search, subject, and class
  const filteredBooks = useMemo(() => {
    return NCTB_BOOKS.filter(book => {
      const matchesSearch =
        searchQuery === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.class.includes(searchQuery);

      const matchesSubject = selectedSubject === null || book.subject === selectedSubject;
      const matchesClass = selectedClass === null || book.class === selectedClass;

      return matchesSearch && matchesSubject && matchesClass;
    });
  }, [searchQuery, selectedSubject, selectedClass]);

  // Group books by subject
  const booksBySubject = useMemo(() => {
    const grouped: Record<string, typeof NCTB_BOOKS> = {};
    filteredBooks.forEach(book => {
      if (!grouped[book.subject]) {
        grouped[book.subject] = [];
      }
      grouped[book.subject].push(book);
    });
    return grouped;
  }, [filteredBooks]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubject(null);
    setSelectedClass(null);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl text-white">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            শিক্ষা সম্পদ
          </h1>
          <p className="text-gray-600 text-lg">
            NCTB পাঠ্যপুস্তক এবং শিক্ষা উপকরণ ব্রাউজ করুন
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="বই, বিষয় বা শ্রেণী অনুসন্ধান করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Subject Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedSubject || ''}
              onChange={(e) => setSelectedSubject(e.target.value || null)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white"
            >
              <option value="">সব বিষয়</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Class Filter */}
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedClass || ''}
              onChange={(e) => setSelectedClass(e.target.value || null)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white"
            >
              <option value="">সব শ্রেণী</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  শ্রেণী {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(selectedSubject || selectedClass || searchQuery) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Active Filters Display */}
        {(selectedSubject || selectedClass || searchQuery) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchQuery && (
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-2">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')} className="hover:text-indigo-900">
                  ×
                </button>
              </span>
            )}
            {selectedSubject && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                Subject: {selectedSubject}
                <button onClick={() => setSelectedSubject(null)} className="hover:text-purple-900">
                  ×
                </button>
              </span>
            )}
            {selectedClass && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
                Class: {selectedClass}
                <button onClick={() => setSelectedClass(null)} className="hover:text-green-900">
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredBooks.length}টি বই পাওয়া গেছে
      </div>

      {/* Books by Subject */}
      {Object.keys(booksBySubject).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(booksBySubject).map(([subject, books]) => {
            const SubjectIcon = subjectIcons[subject] || BookOpen;
            const colorClass = subjectColors[subject] || 'from-gray-500 to-gray-600';

            return (
              <div key={subject} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-br ${colorClass} rounded-xl text-white`}>
                    <SubjectIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{subject}</h2>
                    <p className="text-sm text-gray-500">{books.length}টি বই</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {books.map((book) => (
                    <Link
                      key={book.id}
                      href={`/dashboard/book-reader/${book.id}`}
                      className="group block p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-500">শ্রেণী {book.class}</p>
                        </div>
                        <div className={`p-2 bg-gradient-to-br ${colorClass} rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity`}>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {book.chapters.length} অধ্যায়
                        </span>
                        {book.chapters.some(ch => ch.isExternal) && (
                          <span className="flex items-center gap-1 text-indigo-600">
                            <ExternalLink className="w-3 h-3" />
                            Online
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-sm text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">কোনো বই পাওয়া যায়নি</h3>
          <p className="text-gray-600 mb-4">
            অনুসন্ধানের মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            সব ফিল্টার সরান
          </button>
        </div>
      )}

      {/* Quick Links */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">দ্রুত লিংক</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://nctb.portal.gov.bd/site/page/3a96de78-a64d-49e0-8a24-df9a1d305d87"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors flex items-center gap-3"
          >
            <BookMarked className="w-5 h-5" />
            <span>NCTB অফিসিয়াল ওয়েবসাইট</span>
            <ExternalLink className="w-4 h-4 ml-auto" />
          </a>
          <Link
            href="/dashboard/book-reader"
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors flex items-center gap-3"
          >
            <BookOpen className="w-5 h-5" />
            <span>বই পাঠক</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Link>
          <Link
            href="/dashboard/practice"
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors flex items-center gap-3"
          >
            <Zap className="w-5 h-5" />
            <span>অনুশীলন</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}
