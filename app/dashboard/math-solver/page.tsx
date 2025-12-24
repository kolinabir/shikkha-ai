"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Calculator, Upload, Scan, RotateCcw, Play, Pause,
  Lightbulb, CheckCircle2, Split, FunctionSquare,
  ChevronDown, ChevronUp, Search, Info, TrendingUp, Layers, BadgeHelp
} from 'lucide-react';

// Types
type SolveMethod = 'factorization' | 'formula';
type ViewMode = 'steps' | 'graph' | 'concepts';
type ProcessingStage = 'idle' | 'ocr' | 'analyzing' | 'computing' | 'completed';

interface MathStep {
  id: number;
  latex: string;
  title: string;
  explanation: string;
  deepDive?: string;
  rule?: string;
  highlight?: string;
}

export default function MathSolverPage() {
  const [stage, setStage] = useState<ProcessingStage>('idle');
  const [activeMethod, setActiveMethod] = useState<SolveMethod>('factorization');
  const [viewMode, setViewMode] = useState<ViewMode>('steps');
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // Simulation Logic: The "Backend" Process
  const handleUpload = () => {
    setStage('ocr');
    setLogs([]);

    // Simulate complex backend processing pipeline
    addLog("Initializing Image Processing Engine...", 0);
    addLog("Detecting Equation Coordinates...", 800);
    addLog("OCR Extraction: 'x^2 - 5x + 6 = 0'", 1500);

    setTimeout(() => {
        setStage('analyzing');
        addLog("Context Analysis: Algebra / Quadratic Equation", 0);
        addLog("Checking Mathematical Solvability...", 800);
        addLog("Identifying Optimal Methods: Factorization, Formula", 1500);
    }, 2500);

    setTimeout(() => {
        setStage('computing');
        addLog("Executing Solver Algorithm v2.4...", 0);
        addLog("Verifying Roots against Discriminant...", 1200);
        addLog("Generating Natural Language Explanations (BN)...", 2000);
    }, 5000);

    setTimeout(() => {
        setStage('completed');
    }, 8000); // Total wait ~8 seconds of "Real" work feeling
  };

  const addLog = (msg: string, delay: number) => {
      setTimeout(() => {
          setLogs(prev => [...prev, `> ${msg}`]);
      }, delay);
  };

  // Content Data
  const stepsFactorization: MathStep[] = [
    {
        id: 1,
        latex: "x^2 - 5x + 6 = 0",
        title: "সমীকরণ শনাক্তকরণ",
        explanation: "এটি একটি দ্বিঘাত সমীকরণ (Quadratic Equation)।",
        deepDive: "এখানে x এর সর্বোচ্চ ঘাত ২, তাই এটি দ্বিঘাত। আমাদের লক্ষ্য হলো বাম পক্ষকে দুটি রাশির গুণফল আকারে প্রকাশ করা।",
        rule: "Standard Form"
    },
    {
        id: 2,
        latex: "x^2 - 2x - 3x + 6 = 0",
        title: "মিডল টার্ম ব্রেক (Middle Term Break)",
        explanation: "মাঝের পদ -5x কে ভেঙে -2x এবং -3x করা হলো।",
        deepDive: "আমাদের এমন দুটি সংখ্যা খুঁজতে হবে যাদের গুণফল ৬ (ধ্রুবক) এবং যোগফল -৫ (x এর সহগ)। সংখ্যা দুটি হলো -২ এবং -৩। তাই -5x = -2x - 3x।",
        rule: "Factorization Logic"
    },
    {
        id: 3,
        latex: "x(x - 2) - 3(x - 2) = 0",
        title: "কমন নেওয়া",
        explanation: "প্রথম অংশ থেকে x এবং দ্বিতীয় অংশ থেকে -3 কমন নেওয়া হয়েছে।",
        deepDive: "x²-2x থেকে x কমন নিলে থাকে (x-2)। আবার -3x+6 থেকে -3 কমন নিলে থাকে (x-2)। লক্ষ্য করুন, উভয় বন্ধনীর ভেতর একই রাশি (x-2) চলে এসেছে।",
        rule: "Distributive Law"
    },
    {
        id: 4,
        latex: "(x - 2)(x - 3) = 0",
        title: "উৎপাদক গঠন",
        explanation: "উভয় পদ থেকে (x-2) সাধারণ উৎপাদক হিসেবে নেওয়া হলো।",
        rule: "Common Factor"
    },
    {
        id: 5,
        latex: "x = 2, x = 3",
        title: "শূনায়ন পদ্ধতি (Zero Product Property)",
        explanation: "দুটি সংখ্যার গুণফল শূন্য হলে, তাদের অন্তত একটি শূন্য হবে। হয় x-2=0 অথবা x-3=0।",
        deepDive: "যদি (x-2)=0 হয়, তবে x=2। আর যদি (x-3)=0 হয়, তবে x=3। এভাবেই আমরা দুটি সমাধান পাই।",
        rule: "Roots Calculation"
    },
  ];

  const stepsFormula: MathStep[] = [
    {
      id: 1,
      latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      title: "দ্বিঘাত সূত্র প্রয়োগ",
      explanation: "আমরা জানি, দ্বিঘাত সমীকরণের আদর্শ রূপ ax² + bx + c = 0 এর সমাধান এই সূত্রের মাধ্যমে পাওয়া যায়।",
      rule: "Formula Definition"
    },
    {
      id: 2,
      latex: "x = \\frac{-(-5) \\pm \\sqrt{(-5)^2 - 4(1)(6)}}{2(1)}",
      title: "মান বসানো (Substitution)",
      explanation: "এখানে a=1, b=-5, এবং c=6। এই মানগুলো সূত্রে বসানো হলো।",
      deepDive: "লক্ষ্য করুন, b এর মান -5, তাই -b হবে -(-5) বা +5। এটি একটি সাধারণ ভুলের জায়গা।",
      rule: "Substitution"
    },
    {
      id: 3,
      latex: "x = \\frac{5 \\pm \\sqrt{25 - 24}}{2}",
      title: "সরলীকরণ (Simplification)",
      explanation: "রুটের ভেতরের অংশ হিসাব করা হলো: (-5)² = 25 এবং 4(1)(6) = 24।",
      rule: "Arithmetic"
    },
    {
      id: 4,
      latex: "x = \\frac{5 \\pm 1}{2}",
      title: "বর্গমূল নির্ণয়",
      explanation: "25 থেকে 24 বিয়োগ করলে থাকে 1, যার বর্গমূল 1।",
      deepDive: "এখন আমাদের হাতে দুটি পথ: একটি যোগের জন্য (5+1)/2, অন্যটি বিয়োগের জন্য (5-1)/2।",
      rule: "Square Root"
    },
    {
      id: 5,
      latex: "x_1 = 3, x_2 = 2",
      title: "চূড়ান্ত সমাধান",
      explanation: "যোগ করে পাই 6/2 = 3 এবং বিয়োগ করে পাই 4/2 = 2।",
      rule: "Final Roots"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl text-white shadow-lg shadow-indigo-200">
              <Calculator className="w-6 h-6" />
            </div>
            Math Solver <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-bold tracking-wider">PRO</span>
          </h1>
          
        </div>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* VIEW 1: IDLE / UPLOAD */}
        {stage === 'idle' && (
          <div
            onClick={handleUpload}
            className="group relative overflow-hidden border-2 border-dashed border-slate-300 rounded-[2rem] bg-white p-16 text-center cursor-pointer transition-all hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-100"
          >
            <div className="absolute inset-0 bg-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                    <Upload className="w-10 h-10 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-3">Drop Equation Here</h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        Supports handwritten math, quadratic equations, calculus, and geometry problems.
                    </p>
                </div>
                <div className="pt-4 flex justify-center gap-4 text-sm text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> JPG, PNG</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> LaTeX Support</span>
                </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PROCESSING SIMULATION (The "Backend Engineer" Feel) */}
        {(stage === 'ocr' || stage === 'analyzing' || stage === 'computing') && (
           <div className="bg-slate-950 rounded-[2rem] overflow-hidden shadow-2xl relative h-[600px] flex flex-col font-mono">
               {/* Terminal Header */}
               <div className="bg-slate-900 px-6 py-4 flex items-center gap-2 border-b border-slate-800">
                   <div className="flex gap-2 mr-4">
                       <div className="w-3 h-3 rounded-full bg-red-500"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   </div>
                   <span className="text-slate-400 text-xs">shikkha-ai-engine — bash — 80x24</span>
               </div>

               {/* Terminal Body */}
               <div className="flex-1 p-8 text-green-400 space-y-2 overflow-y-auto">
                   {logs.map((log, i) => (
                       <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                           <span className="opacity-50 mr-3">[{new Date().toLocaleTimeString()}]</span>
                           {log}
                       </div>
                   ))}
                   <div className="w-3 h-5 bg-green-400 animate-pulse inline-block mt-2"></div>
               </div>

               {/* Progress Status */}
               <div className="bg-slate-900 p-6 border-t border-slate-800">
                    <div className="flex justify-between text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">
                        <span>Status: {stage}</span>
                        <span>{stage === 'ocr' ? '30%' : stage === 'analyzing' ? '60%' : '90%'}</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                            style={{ width: stage === 'ocr' ? '30%' : stage === 'analyzing' ? '60%' : '95%' }}
                        ></div>
                    </div>
               </div>
           </div>
        )}

        {/* VIEW 3: RESULT DASHBOARD */}
        {stage === 'completed' && (
           <div className="grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">

               {/* Sidebar: Equation Info */}
               <div className="col-span-12 md:col-span-4 space-y-6">
                   <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Input Equation</p>
                       <div className="text-3xl font-mono font-bold text-slate-800 py-4 border-b border-slate-100 mb-4">
                           x² - 5x + 6 = 0
                       </div>
                       <div className="flex gap-2 justify-center">
                           <button onClick={() => setStage('idle')} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-600 transition-colors">
                               <RotateCcw className="w-4 h-4" /> New Scan
                           </button>
                           <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-xl text-sm font-bold text-indigo-600 transition-colors">
                               <Search className="w-4 h-4" /> Similar
                           </button>
                       </div>
                   </div>

                   {/* Graph Preview Card */}
                   <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer" onClick={() => setViewMode('graph')}>
                       <div className="flex justify-between items-center mb-4 relative z-10">
                           <h3 className="font-bold text-slate-700 flex items-center gap-2">
                               <TrendingUp className="w-5 h-5 text-indigo-500" /> Graph Visual
                           </h3>
                           <ChevronDown className="w-4 h-4 text-slate-400 -rotate-90" />
                       </div>
                       {/* Abstract Parabola CSS */}
                       <div className="h-32 border-l border-b border-slate-200 relative">
                           <div className="absolute inset-0 flex items-center justify-center">
                               {/* Simple CSS curve representing x^2 - 5x + 6 */}
                               <div className="w-32 h-32 border-b-2 border-r-2 border-indigo-500 rounded-br-[100px] -rotate-45 translate-y-[-20%] opacity-50"></div>
                           </div>
                           <div className="absolute bottom-[-10px] left-[40%] w-2 h-2 bg-red-500 rounded-full"></div>
                           <div className="absolute bottom-[-10px] left-[60%] w-2 h-2 bg-red-500 rounded-full"></div>
                       </div>
                   </div>

                   {/* Related Concepts */}
                   <div className="bg-indigo-900 rounded-3xl p-6 text-white">
                        <h3 className="font-bold flex items-center gap-2 mb-4">
                            <Layers className="w-5 h-5" /> Related Concepts
                        </h3>
                        <div className="space-y-2">
                        <div className="space-y-2">
                            {[
                                { label: 'Quadratic Formula', slug: 'quadratic-formula' },
                                { label: 'Parabolas', slug: 'parabolas' },
                                { label: 'Factorization', slug: 'factorization' }
                            ].map((item) => (
                                <a
                                    key={item.slug}
                                    href={`/dashboard/math-solver/concepts/${item.slug}`}
                                    className="flex items-center justify-between p-3 bg-white/10 rounded-xl hover:bg-white/20 cursor-pointer transition-colors group"
                                >
                                    <span className="text-sm font-medium group-hover:pl-2 transition-all">{item.label}</span>
                                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-50 group-hover:translate-x-1 transition-transform" />
                                </a>
                            ))}
                        </div>
                        </div>
                   </div>
               </div>

               {/* Main Content: Steps and Explanations */}
               <div className="col-span-12 md:col-span-8 space-y-6">

                   {/* Tab Switcher */}
                   <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm inline-flex w-full mb-2">
                        {(['factorization', 'formula'] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => setActiveMethod(m)}
                                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeMethod === m ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                {m === 'factorization' ? 'উৎপাদক বিশ্লেষণ' : 'দ্বিঘাত সূত্র'}
                            </button>
                        ))}
                   </div>

                   {/* Step List */}
                   {activeMethod === 'factorization' && (
                       <div className="space-y-4">
                           {stepsFactorization.map((step, idx) => (
                               <div
                                 key={step.id}
                                 className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${expandedStep === step.id ? 'border-indigo-500 shadow-xl ring-2 ring-indigo-100' : 'border-slate-200 shadow-sm hover:border-indigo-300'}`}
                               >
                                   {/* Header Section */}
                                   <div
                                     onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                                     className="p-6 cursor-pointer flex items-start gap-4"
                                   >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-1 transition-colors ${expandedStep === step.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{step.title}</h4>
                                                {step.rule && <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">{step.rule}</span>}
                                            </div>
                                            <div className="text-xl font-mono font-bold text-slate-800">
                                                {step.latex}
                                            </div>
                                        </div>
                                        <button className="text-slate-400">
                                            {expandedStep === step.id ? <ChevronUp /> : <ChevronDown />}
                                        </button>
                                   </div>

                                   {/* Deep Dive Section */}
                                   {expandedStep === step.id && (
                                       <div className="bg-indigo-50/50 p-6 border-t border-indigo-100 animate-in slide-in-from-top-2">
                                           <div className="flex gap-4">
                                               <div className="shrink-0 mt-1">
                                                   <Lightbulb className="w-5 h-5 text-indigo-600" />
                                               </div>
                                               <div className="space-y-3">
                                                   <p className="text-slate-700 font-medium leading-relaxed">
                                                       {step.explanation}
                                                   </p>
                                                   {step.deepDive && (
                                                       <div className="bg-white p-4 rounded-xl border border-indigo-100 text-sm text-slate-600 leading-relaxed shadow-sm">
                                                           <span className="font-bold text-indigo-600 block mb-1">যুক্তি (Reasoning):</span>
                                                           {step.deepDive}
                                                       </div>
                                                   )}
                                                   <button className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 mt-2">
                                                       <BadgeHelp className="w-3 h-3" /> আরো বিস্তারিত জানতে চাও?
                                                   </button>
                                               </div>
                                           </div>
                                       </div>
                                   )}
                               </div>
                           ))}

                           {/* Success Banner */}
                           <div className="bg-green-500 text-white p-6 rounded-3xl flex items-center justify-between shadow-lg shadow-green-200 mt-8">
                               <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                       <CheckCircle2 className="w-6 h-6 text-white" />
                                   </div>
                                   <div>
                                       <h3 className="font-bold text-lg">Solution Verified</h3>
                                       <p className="text-green-100 text-sm">All steps are mathematically correct.</p>
                                   </div>
                               </div>
                               <button className="px-6 py-2 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors">
                                   Download PDF
                               </button>
                           </div>
                       </div>
                   )}

                   {/* Step List: Formula Method */}
                   {activeMethod === 'formula' && (
                       <div className="space-y-4">

                           {/* Variable Dashboard - The "Backend Parsed" View */}
                           <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-lg mb-6 animate-in slide-in-from-top-4">
                               <div className="flex items-center gap-2 mb-4 opacity-70 border-b border-slate-700 pb-2">
                                   <FunctionSquare className="w-4 h-4" />
                                   <span className="text-xs font-bold uppercase tracking-widest">Variable Extraction</span>
                               </div>
                               <div className="grid grid-cols-3 gap-4 text-center">
                                   <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                                       <p className="text-xs text-slate-400 font-bold mb-1">Coeff A</p>
                                       <p className="text-2xl font-mono font-bold text-green-400">1</p>
                                   </div>
                                   <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                                       <p className="text-xs text-slate-400 font-bold mb-1">Coeff B</p>
                                       <p className="text-2xl font-mono font-bold text-yellow-400">-5</p>
                                   </div>
                                   <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                                       <p className="text-xs text-slate-400 font-bold mb-1">Const C</p>
                                       <p className="text-2xl font-mono font-bold text-blue-400">6</p>
                                   </div>
                               </div>
                           </div>

                           {stepsFormula.map((step, idx) => (
                               <div
                                 key={step.id}
                                 className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${expandedStep === step.id ? 'border-indigo-500 shadow-xl ring-2 ring-indigo-100' : 'border-slate-200 shadow-sm hover:border-indigo-300'}`}
                               >
                                   {/* Header Section */}
                                   <div
                                     onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                                     className="p-6 cursor-pointer flex items-start gap-4"
                                   >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-1 transition-colors ${expandedStep === step.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{step.title}</h4>
                                                {step.rule && <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">{step.rule}</span>}
                                            </div>
                                            <div className="text-xl font-mono font-bold text-slate-800">
                                                {step.latex}
                                            </div>
                                        </div>
                                        <button className="text-slate-400">
                                            {expandedStep === step.id ? <ChevronUp /> : <ChevronDown />}
                                        </button>
                                   </div>

                                   {/* Deep Dive Section */}
                                   {expandedStep === step.id && (
                                       <div className="bg-indigo-50/50 p-6 border-t border-indigo-100 animate-in slide-in-from-top-2">
                                           <div className="flex gap-4">
                                               <div className="shrink-0 mt-1">
                                                   <Lightbulb className="w-5 h-5 text-indigo-600" />
                                               </div>
                                               <div className="space-y-3">
                                                   <p className="text-slate-700 font-medium leading-relaxed">
                                                       {step.explanation}
                                                   </p>
                                                   {step.deepDive && (
                                                       <div className="bg-white p-4 rounded-xl border border-indigo-100 text-sm text-slate-600 leading-relaxed shadow-sm">
                                                           <span className="font-bold text-indigo-600 block mb-1">যুক্তি (Reasoning):</span>
                                                           {step.deepDive}
                                                       </div>
                                                   )}
                                               </div>
                                           </div>
                                       </div>
                                   )}
                               </div>
                           ))}

                           {/* Success Banner */}
                           <div className="bg-green-500 text-white p-6 rounded-3xl flex items-center justify-between shadow-lg shadow-green-200 mt-8">
                               <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                       <CheckCircle2 className="w-6 h-6 text-white" />
                                   </div>
                                   <div>
                                       <h3 className="font-bold text-lg">Solution Verified</h3>
                                       <p className="text-green-100 text-sm">All steps are mathematically correct.</p>
                                   </div>
                               </div>
                               <button className="px-6 py-2 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors">
                                   Download PDF
                               </button>
                           </div>
                       </div>
                   )}
               </div>
           </div>
        )}
      </div>
    </div>
  );
}
