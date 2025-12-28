import Link from 'next/link';
import { Atom, ArrowLeft, BookOpen, Clock, Target, Zap, Calendar, ChevronRight, Trophy, ExternalLink } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Helper to render text with LaTeX
function renderWithLatex(text: string) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, i) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      const latex = part.slice(1, -1);
      return <InlineMath key={i} math={latex} />;
    }
    return <span key={i}>{part}</span>;
  });
}

const FMA_EXAMPLE = {
  question: 'A block of mass $m$ is placed on a frictionless inclined plane of angle $\\theta$. What is the acceleration of the block down the incline?',
  choices: ['$g$', '$g\\cos\\theta$', '$g\\sin\\theta$', '$g\\tan\\theta$'],
  answer: 2,
};

const PB_EXAMPLE = {
  question: 'A photon has energy $E = 3.0$ eV. What is its wavelength? (Use $hc = 1240$ eV$\\cdot$nm)',
  choices: ['207 nm', '413 nm', '620 nm', '826 nm'],
  answer: 1,
};

export default function ContestsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-xl">
              <Atom className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">GV Physics</span>
          </Link>
          <nav className="flex items-center space-x-2">
            <Link
              href="/"
              className="flex items-center px-4 py-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Sign Up
            </Link>
            <Link
              href="/practice"
              className="flex items-center px-4 py-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Practice
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Contest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Information</span>
          </h1>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Everything you need to know about F=ma and Physics Bowl competitions.
          </p>
        </div>
      </div>

      {/* Quick Nav */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#fma"
            className="flex items-center px-6 py-3 bg-blue-600/20 border border-blue-400/30 rounded-xl text-blue-200 hover:bg-blue-600/30 transition-all duration-200"
          >
            <Zap className="h-5 w-5 mr-2" />
            F=ma Exam
          </a>
          <a
            href="#physics-bowl"
            className="flex items-center px-6 py-3 bg-purple-600/20 border border-purple-400/30 rounded-xl text-purple-200 hover:bg-purple-600/30 transition-all duration-200"
          >
            <Target className="h-5 w-5 mr-2" />
            Physics Bowl
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">

        {/* F=ma Section */}
        <section id="fma" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-4 rounded-2xl shadow-lg shadow-blue-500/25">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white">F=ma Exam</h2>
                <p className="text-blue-200/70 text-lg">First round of USAPhO qualification</p>
              </div>
            </div>
            <a
              href="https://aapt.org/physicsteam/PT-exams.cfm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-200 hover:bg-blue-500/30 transition-all"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Official Website
            </a>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-5">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-white mr-3" />
                <h3 className="text-xl font-bold text-white">Key Dates - 2026</h3>
              </div>
            </div>
            <div className="p-8">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                <div className="space-y-6">
                  <div className="relative pl-12">
                    <div className="absolute left-2 w-5 h-5 bg-amber-500 rounded-full border-4 border-white"></div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="font-bold text-amber-800">January 13, 2026</div>
                      <div className="text-amber-700">Registration Deadline (sign up by this date!)</div>
                    </div>
                  </div>
                  <div className="relative pl-12">
                    <div className="absolute left-2 w-5 h-5 bg-gray-300 rounded-full border-4 border-white"></div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <div className="font-bold text-gray-700">January 20, 2026</div>
                      <div className="text-gray-600">School Registration Deadline (handled by club)</div>
                    </div>
                  </div>
                  <div className="relative pl-12">
                    <div className="absolute left-2 w-5 h-5 bg-blue-500 rounded-full border-4 border-white"></div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="font-bold text-blue-800">February 12, 2026</div>
                      <div className="text-blue-700">F=ma Exam Day (1:00 PM - 4:00 PM EST)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Format Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <Clock className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Duration</h3>
              <p className="text-gray-300">75 minutes</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <BookOpen className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Format</h3>
              <p className="text-gray-300">25 multiple choice questions</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <Target className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Topics</h3>
              <p className="text-gray-300">Classical mechanics only. No calculator.</p>
            </div>
          </div>

          {/* Example Problem */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Sample Problem</h3>
              <Link href="/practice" className="text-blue-100 hover:text-white flex items-center text-sm">
                More problems <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="p-8">
              <p className="text-gray-800 text-lg mb-6">{renderWithLatex(FMA_EXAMPLE.question)}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {FMA_EXAMPLE.choices.map((choice, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border-2 text-center ${
                      i === FMA_EXAMPLE.answer
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <span className="font-medium text-gray-700 mr-2">{String.fromCharCode(65 + i)}.</span>
                    <span className="text-gray-800">{renderWithLatex(choice)}</span>
                    {i === FMA_EXAMPLE.answer && (
                      <div className="text-emerald-600 text-sm font-semibold mt-1">Correct!</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* Physics Bowl Section */}
        <section id="physics-bowl" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500 p-4 rounded-2xl shadow-lg shadow-purple-500/25">
                <Target className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white">Physics Bowl</h2>
                <p className="text-purple-200/70 text-lg">AAPT national physics competition</p>
              </div>
            </div>
            <a
              href="https://aapt.org/programs/physicsbowl/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-lg text-purple-200 hover:bg-purple-500/30 transition-all"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Official Website
            </a>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-5">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-white mr-3" />
                <h3 className="text-xl font-bold text-white">Key Dates - 2026</h3>
              </div>
            </div>
            <div className="p-8">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-200"></div>
                <div className="space-y-6">
                  <div className="relative pl-12">
                    <div className="absolute left-2 w-5 h-5 bg-amber-500 rounded-full border-4 border-white"></div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="font-bold text-amber-800">TBD</div>
                      <div className="text-amber-700">Registration Deadline (sign up by this date!)</div>
                    </div>
                  </div>
                  <div className="relative pl-12">
                    <div className="absolute left-2 w-5 h-5 bg-purple-500 rounded-full border-4 border-white"></div>
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <div className="font-bold text-purple-800">March 18 - April 3, 2026</div>
                      <div className="text-purple-700">Exam Window (exact date chosen by school)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Format Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <Clock className="h-8 w-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Duration</h3>
              <p className="text-gray-300">45 minutes</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <BookOpen className="h-8 w-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Format</h3>
              <p className="text-gray-300">40 multiple choice questions</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <Target className="h-8 w-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Topics</h3>
              <p className="text-gray-300">All physics topics. Calculator allowed.</p>
            </div>
          </div>

          {/* Example Problem */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Sample Problem</h3>
              <Link href="/practice" className="text-purple-100 hover:text-white flex items-center text-sm">
                More problems <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="p-8">
              <p className="text-gray-800 text-lg mb-6">{renderWithLatex(PB_EXAMPLE.question)}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PB_EXAMPLE.choices.map((choice, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border-2 text-center ${
                      i === PB_EXAMPLE.answer
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <span className="font-medium text-gray-700 mr-2">{String.fromCharCode(65 + i)}.</span>
                    <span className="text-gray-800">{choice}</span>
                    {i === PB_EXAMPLE.answer && (
                      <div className="text-emerald-600 text-sm font-semibold mt-1">Correct!</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* USAPhO Section (for qualifiers) */}
        <section className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">For F=ma Qualifiers: USAPhO</h3>
          <p className="text-amber-100 mb-6">
            If you qualify through F=ma (top ~400 scorers nationally), you can participate in USAPhO!
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-amber-300 font-medium">Registration Deadline</div>
              <div className="text-white font-bold">February 16, 2026</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-amber-300 font-medium">School Deadline</div>
              <div className="text-white font-bold">February 23, 2026</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-amber-300 font-medium">Exam Date</div>
              <div className="text-white font-bold">Late Mar/Early Apr 2026 (TBA)</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Compete?</h3>
            <p className="text-xl text-white/80 mb-8 max-w-lg mx-auto">
              Sign up now and start practicing for these competitions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Sign Up Now
              </Link>
              <Link
                href="/practice"
                className="inline-flex items-center px-8 py-4 bg-white/20 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-white/30 transition-all duration-200"
              >
                <Trophy className="h-5 w-5 mr-2" />
                Practice Problems
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16 text-center">
        <p className="text-blue-200/60 text-sm">GV Physics - Preparing students for physics competitions</p>
      </footer>
    </div>
  );
}
