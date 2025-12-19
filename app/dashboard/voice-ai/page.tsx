"use client";
import React, { useState } from 'react';
import { Phone, Mic, ArrowRight, PhoneCall, History, X, FileText } from 'lucide-react';
import Link from 'next/link';

export default function VoiceAIPage() {
  const [requestSent, setRequestSent] = React.useState(false);
  const [showTranscript, setShowTranscript] = useState<number | null>(null);

  const handleCallback = () => {
    setRequestSent(true);
    // Simulate API call
    setTimeout(() => {
      // toast or other feedback
    }, 1000);
  };

  const handleViewTranscript = (id: number) => {
    setShowTranscript(id);
  };

  const closeTranscript = () => {
    setShowTranscript(null);
  };

  // Mock Transcript Data
  const mockTranscript = [
      { role: 'user', text: "স্যার, নিউটনের ৩য় সূত্রটা একটু বুঝিয়ে বলবেন?" },
      { role: 'ai', text: "অবশ্যই! নিউটনের ৩য় সূত্র হলো: প্রত্যেক ক্রিয়ারই একটি সমান ও বিপরীত প্রতিক্রিয়া আছে।" },
      { role: 'user', text: "উদাহরণ হিসেবে কী বলা যায়?" },
      { role: 'ai', text: "যেমন, তুমি যখন মাটিতে হাঁটো, তুমি পেছনের দিকে মাটিতে ধাক্কা দাও (ক্রিয়া), আর মাটি তোমাকে সামনের দিকে ধাক্কা দেয় (প্রতিক্রিয়া)।" },
      { role: 'ai', text: "এই কারণেই আমরা হাঁটতে পারি। বুঝতে পেরেছ?" },
      { role: 'user', text: "জি স্যার, একদম ক্লিয়ার!" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 relative">
      {/* Transcript Modal */}
      {showTranscript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl relative">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                      <div>
                          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-indigo-600" />
                              কথন ইতিহাস (Transcript)
                          </h3>
                          <p className="text-sm text-gray-500">পদার্থবিজ্ঞান - ৩য় অধ্যায় • গতকাল, ৫:৩০</p>
                      </div>
                      <button onClick={closeTranscript} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                          <X className="w-6 h-6 text-gray-500" />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                      {mockTranscript.map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                              <div className={`max-w-[80%] p-4 rounded-2xl ${
                                  msg.role === 'ai'
                                  ? 'bg-gray-100 text-gray-800 rounded-tl-none'
                                  : 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                              }`}>
                                  <p className="font-bold text-xs mb-1 opacity-70 uppercase tracking-wider">
                                      {msg.role === 'ai' ? 'AI শিক্ষক' : 'আপনি'}
                                  </p>
                                  <p className="text-sm md:text-base leading-relaxed">
                                      {msg.text}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>

                  <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                      <button onClick={closeTranscript} className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors">
                          বন্ধ করুন
                      </button>
                      <button className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                          ডাউনলোড
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex p-3 rounded-full bg-indigo-100 text-indigo-600 mb-4">
          <Phone className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">AI শিক্ষক</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          যেকোনো সময়, যেকোনো বিষয়ে কথা বলুন আমাদের AI শিক্ষকের সাথে।
          পড়াশোনা এখন হবে গল্পের ছলে।
        </p>
      </div>

      {/* Main Options */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Start Online Call */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl hover:shadow-2xl hover:border-indigo-300 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>

          <div className="relative z-10 flex flex-col h-full items-center text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
              <Mic className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">সরাসরি কথা বলুন</h2>
            <p className="text-gray-600 mb-8">
              ইন্টারনেটের মাধ্যমে সরাসরি আমাদের AI শিক্ষকের সাথে কানেক্ট হোন। কথা বলুন একদম মানুষের মতো।
            </p>

            <Link
              href="/dashboard/voice-ai/live"
              className="mt-auto w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
            >
              কল শুরু করুন
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Request Call Back / Call Number */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl hover:shadow-2xl hover:border-emerald-300 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -ml-32 -mt-32 transition-transform group-hover:scale-110"></div>

          <div className="relative z-10 flex flex-col h-full items-center text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
              <PhoneCall className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">ফোনে কথা বলুন</h2>
            <p className="text-gray-600 mb-6">
              ইন্টারনেট নেই? সমস্যা নেই! আমাদের হটলাইন নম্বরে কল দিন অথবা আপনার নম্বর দিন, আমরা কল করবো।
            </p>

            <div className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 text-left">
               <p className="text-xs text-gray-500 font-bold uppercase mb-1">হটলাইন নম্বর (BD)</p>
               <p className="text-2xl font-mono font-bold text-gray-900">09610-998877</p>
            </div>

            <button
              onClick={handleCallback}
              disabled={requestSent}
              className={`mt-auto w-full py-4 border-2 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
                ${requestSent
                  ? 'bg-emerald-100 border-emerald-100 text-emerald-700 cursor-default'
                  : 'bg-white border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                }
              `}
            >
              {requestSent ? 'রিকোয়েস্ট রিসিভ করা হয়েছে ✓' : 'কল ব্যাক রিকোয়েস্ট'}
            </button>
          </div>
        </div>
      </div>

      {/* History / Previous Calls */}
      <div className="max-w-4xl mx-auto pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-gray-500" />
            পূর্ববর্তী কথোপকথন
        </h3>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
             {[1, 2].map((i) => (
                 <div key={i} className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            AI
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">পদার্থবিজ্ঞান - ৩য় অধ্যায় নিয়ে আলোচনা</p>
                            <p className="text-xs text-gray-500">গতকাল, বিকাল ৫:৩০ • ১০ মিনিট</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleViewTranscript(i)}
                        className="text-sm text-indigo-600 font-semibold hover:underline"
                    >
                        ট্রান্সক্রিপ্ট দেখুন
                    </button>
                 </div>
             ))}
        </div>
      </div>
    </div>
  );
}
