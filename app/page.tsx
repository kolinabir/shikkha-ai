import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  BookOpen,
  Phone,
  Calculator,
  Target,
  FileText,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Star,
  Quote,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <Sparkles className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold text-blue-600">Shikkha AI</span>
          </div>

          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/onboarding">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30">
                  Start Onboarding
                </button>
              </Link>
            </SignedIn>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gray-50 -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        <div className="container mx-auto px-6 py-24 md:py-32 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Learning Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Learning with{" "}
              <span className="text-blue-600">AI-Powered Education</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Experience personalized learning in Bangla with voice AI
              assistance, adaptive practice, and intelligent study tools
              designed for Bangladeshi students.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="group px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold text-lg transition-all shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 flex items-center space-x-2">
                    <span>Start Learning Free</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/onboarding">
                  <button className="group px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold text-lg transition-all shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 flex items-center space-x-2">
                    <span>Start Onboarding</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">10K+</div>
              <div className="text-sm text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">Study Materials</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for{" "}
              <span className="text-blue-600">Smarter Learning</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to excel in your studies, all in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Voice AI Call */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Phone className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Voice AI Call
              </h3>
              <p className="text-gray-600 mb-4">
                Learn through voice conversations in Bangla. Perfect for rural
                areas with limited internet. Practice with mock quizzes through
                natural voice interaction.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Bangla language priority
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Works with slow internet
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Interactive mock quizzes
                  </span>
                </li>
              </ul>
            </div>

            {/* Math Solver */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="h-14 w-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calculator className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Smart Math Solver
              </h3>
              <p className="text-gray-600 mb-4">
                Take a picture of any math problem and get detailed step-by-step
                solutions with AI-generated explanations and alternative
                approaches.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Photo-based problem solving
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Step-by-step explanations
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Alternative solutions
                  </span>
                </li>
              </ul>
            </div>

            {/* Adaptive Practice */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-green-300 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="h-14 w-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Adaptive Practice
              </h3>
              <p className="text-gray-600 mb-4">
                AI-generated practice modules that adapt to your skill level.
                Choose subject, chapter, and difficulty to get personalized
                question sets.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Subject & chapter-wise practice
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Easy, medium & hard levels
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    AI-powered suggestions
                  </span>
                </li>
              </ul>
            </div>

            {/* Book Reader */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="h-14 w-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Interactive Book Reader
              </h3>
              <p className="text-gray-600 mb-4">
                Read NCTB books and your own PDFs with an AI chatbot. Highlight
                text to ask questions, get explanations, and generate custom
                quizzes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    NCTB books included
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Upload your own PDFs
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    AI chatbot assistance
                  </span>
                </li>
              </ul>
            </div>

            {/* Admin Panel */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-300 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="h-14 w-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-7 w-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Admin Dashboard
              </h3>
              <p className="text-gray-600 mb-4">
                Comprehensive dashboard for tracking student progress, analyzing
                performance, and providing personalized recommendations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    User tracking & analytics
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Performance scoring
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    AI-driven suggestions
                  </span>
                </li>
              </ul>
            </div>

            {/* Smart Learning Path */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="h-14 w-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Smart Learning Path
              </h3>
              <p className="text-gray-600 mb-4">
                AI creates a personalized learning journey based on your
                performance, goals, and learning style for optimal results.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Personalized curriculum
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Progress tracking
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Adaptive difficulty
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by <span className="text-blue-600">Students</span>
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about Shikkha AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <Quote className="h-8 w-8 text-blue-600 mb-4 opacity-50" />
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;Shikkha AI has completely transformed how I study. The
                voice AI feature is amazing and works perfectly even with slow
                internet!&rdquo;
              </p>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  AR
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Ahmed Rahman
                  </div>
                  <div className="text-sm text-gray-600">Class 10 Student</div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <Quote className="h-8 w-8 text-purple-600 mb-4 opacity-50" />
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;The math solver is incredible! I can just take a picture
                and get step-by-step solutions. It&apos;s like having a tutor
                24/7.&rdquo;
              </p>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  FS
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Fatima Sultana
                  </div>
                  <div className="text-sm text-gray-600">Class 9 Student</div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 border border-green-100 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <Quote className="h-8 w-8 text-green-600 mb-4 opacity-50" />
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;The adaptive practice questions are perfect! They adjust
                to my level and help me improve gradually. Highly
                recommended!&rdquo;
              </p>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  MH
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Mohammad Hasan
                  </div>
                  <div className="text-sm text-gray-600">Class 10 Student</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students already using Shikkha AI to achieve
              their academic goals. Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 font-semibold text-lg transition-all shadow-2xl hover:scale-105 flex items-center space-x-2">
                    <span>Get Started for Free</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 font-semibold text-lg transition-all shadow-2xl hover:scale-105 flex items-center space-x-2">
                    <span>Go to Dashboard</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold text-white">Shikkha AI</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering Bangladeshi students with AI-powered learning tools
                for academic excellence.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Voice AI
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Math Solver
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Book Reader
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Practice Tests
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Study Materials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    NCTB Books
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Practice Questions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 Shikkha AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
