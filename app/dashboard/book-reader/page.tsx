"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Upload,
  FileText,
  ChevronRight,
  Zap,
  BookMarked
} from 'lucide-react';
import { NCTB_BOOKS } from './_data/books';

export default function BookReaderPage() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl text-white">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            বই পাঠক
          </h1>
          <p className="text-gray-600 text-lg">
            NCTB বই পড়ুন এবং আপনার নিজের PDF আপলোড করুন
          </p>
        </div>
      </div>

      {/* Book Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* NCTB Books */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <BookMarked className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">NCTB বই</h2>
              <p className="text-sm text-gray-500">জাতীয় পাঠ্যপুস্তক</p>
            </div>
          </div>

          <div className="space-y-4">
            {NCTB_BOOKS.map((book) => (
              <Link
                key={book.id}
                href={`/dashboard/book-reader/${book.id}`}
                className="block p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg text-white">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-500">শ্রেণী {book.class}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {book.chapters.length}টি অধ্যায়
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upload Your Own PDF */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-xl">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">আপনার PDF</h2>
              <p className="text-sm text-gray-500">নিজের বই আপলোড করুন</p>
            </div>
          </div>

          <div
            onClick={() => setShowUpload(true)}
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-gray-400 group-hover:text-indigo-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">PDF আপলোড করুন</h3>
            <p className="text-sm text-gray-500">
              আপনার নিজের বই বা নোট আপলোড করে পড়ুন
            </p>
            <p className="text-xs text-gray-400 mt-2">PDF ফরম্যাট সমর্থিত</p>
          </div>

          {showUpload && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">
                ⚠️ আপলোড ফিচার শীঘ্রই আসছে। এখন NCTB বই ব্যবহার করুন।
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Books */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">সাম্প্রতিক বই</h2>
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>কোনো সাম্প্রতিক বই নেই</p>
        </div>
      </div>
    </div>
  );
}
