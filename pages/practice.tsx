import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Atom, ArrowLeft, BookOpen, ChevronDown, ChevronUp, Zap, Target, ArrowRight, RotateCcw, CheckCircle2, XCircle, Filter } from 'lucide-react';
import { Problem, Difficulty, DIFFICULTIES, getTopicsByExam, filterProblems, getRandomFilteredProblem } from '@/data/problems';
import { Checkbox } from '@/components/ui/checkbox';
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

type ExamFilter = 'fma' | 'physics-bowl' | 'both';

export default function PracticePage() {
  // Filters
  const [examFilter, setExamFilter] = useState<ExamFilter>('both');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Available topics based on exam filter
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);

  // Session tracking
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  // Current problem state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Get matching problems count
  const matchingProblems = filterProblems(examFilter, selectedTopics, selectedDifficulties);
  const matchingCount = matchingProblems.length;

  // Update available topics when exam filter changes
  useEffect(() => {
    const topics = getTopicsByExam(examFilter);
    setAvailableTopics(topics);
    // Clear selected topics that are no longer available
    setSelectedTopics(prev => prev.filter(t => topics.includes(t)));
  }, [examFilter]);

  // Load first problem on mount
  useEffect(() => {
    const problem = getRandomFilteredProblem('both', [], [], []);
    if (problem) {
      setCurrentProblem(problem);
    }
  }, []);

  // When filters change, get a new problem and reset session
  const applyFilters = () => {
    const problem = getRandomFilteredProblem(examFilter, selectedTopics, selectedDifficulties, []);
    setCurrentProblem(problem);
    setAnsweredIds(new Set());
    setCorrectCount(0);
    setIncorrectCount(0);
    setSelectedAnswer(null);
    setShowSolution(false);
    setHasAnswered(false);
    setShowFilters(false);
  };

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleDifficultyToggle = (difficulty: Difficulty) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleAnswerSelect = (index: number) => {
    if (hasAnswered) return;

    setSelectedAnswer(index);
    setHasAnswered(true);

    if (currentProblem) {
      setAnsweredIds(prev => new Set(prev).add(currentProblem.id));
      if (index === currentProblem.correctAnswer) {
        setCorrectCount(prev => prev + 1);
      } else {
        setIncorrectCount(prev => prev + 1);
      }
    }
  };

  const nextProblem = () => {
    const excludeIds = Array.from(answeredIds);
    const problem = getRandomFilteredProblem(examFilter, selectedTopics, selectedDifficulties, excludeIds);

    if (problem) {
      setCurrentProblem(problem);
      setSelectedAnswer(null);
      setShowSolution(false);
      setHasAnswered(false);
    } else {
      setCurrentProblem(null);
    }
  };

  const resetSession = () => {
    const problem = getRandomFilteredProblem(examFilter, selectedTopics, selectedDifficulties, []);
    setCurrentProblem(problem);
    setAnsweredIds(new Set());
    setCorrectCount(0);
    setIncorrectCount(0);
    setSelectedAnswer(null);
    setShowSolution(false);
    setHasAnswered(false);
  };

  const remainingProblems = matchingCount - answeredIds.size;

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
              href="/contests"
              className="flex items-center px-4 py-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Contest Info
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Problems</span>
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center space-x-3">
              {/* Exam Type Quick Buttons */}
              <button
                onClick={() => { setExamFilter('fma'); }}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  examFilter === 'fma'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-blue-200 hover:bg-white/20'
                }`}
              >
                <Zap className="h-4 w-4 mr-1" />
                F=ma
              </button>
              <button
                onClick={() => { setExamFilter('physics-bowl'); }}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  examFilter === 'physics-bowl'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                <Target className="h-4 w-4 mr-1" />
                Physics Bowl
              </button>
              <button
                onClick={() => { setExamFilter('both'); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  examFilter === 'both'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Both
              </button>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <Filter className="h-4 w-4 mr-2" />
              More Filters
              {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-2 p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
              {/* Topics */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Topics <span className="text-blue-200/60 font-normal">(leave empty for all)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTopics.map(topic => (
                    <label
                      key={topic}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        selectedTopics.includes(topic)
                          ? 'bg-blue-500/30 border border-blue-400/50'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Checkbox
                        checked={selectedTopics.includes(topic)}
                        onCheckedChange={() => handleTopicToggle(topic)}
                      />
                      <span className="text-blue-100 text-sm">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Difficulty <span className="text-blue-200/60 font-normal">(leave empty for all)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map(difficulty => (
                    <label
                      key={difficulty}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        selectedDifficulties.includes(difficulty)
                          ? difficulty === 'easy' ? 'bg-emerald-500/30 border border-emerald-400/50' :
                            difficulty === 'medium' ? 'bg-amber-500/30 border border-amber-400/50' :
                            'bg-red-500/30 border border-red-400/50'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Checkbox
                        checked={selectedDifficulties.includes(difficulty)}
                        onCheckedChange={() => handleDifficultyToggle(difficulty)}
                      />
                      <span className={`text-sm font-medium capitalize ${
                        difficulty === 'easy' ? 'text-emerald-300' :
                        difficulty === 'medium' ? 'text-amber-300' :
                        'text-red-300'
                      }`}>
                        {difficulty}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-blue-200/80 text-sm">
                  <span className="font-semibold text-white">{matchingCount}</span> problems match
                </span>
                <button
                  onClick={applyFilters}
                  disabled={matchingCount === 0}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    matchingCount > 0
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Bar */}
        {answeredIds.size > 0 && (
          <div className="flex items-center justify-between mb-4 p-3 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center space-x-4">
              <span className="text-blue-100/80 text-sm">
                <span className="font-semibold text-white">{answeredIds.size}</span> answered
              </span>
              <div className="flex items-center text-emerald-400 text-sm">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                <span className="font-semibold">{correctCount}</span>
              </div>
              <div className="flex items-center text-red-400 text-sm">
                <XCircle className="h-4 w-4 mr-1" />
                <span className="font-semibold">{incorrectCount}</span>
              </div>
            </div>
            <button
              onClick={resetSession}
              className="flex items-center px-3 py-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </button>
          </div>
        )}

        {/* Problem Card */}
        {currentProblem ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Problem Header */}
            <div className={`bg-gradient-to-r ${
              currentProblem.exam === 'fma'
                ? 'from-blue-600 to-blue-700'
                : 'from-purple-600 to-purple-700'
            } px-6 py-4`}>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center">
                  {currentProblem.exam === 'fma'
                    ? <Zap className="h-5 w-5 text-white mr-2" />
                    : <Target className="h-5 w-5 text-white mr-2" />
                  }
                  <span className="text-white font-semibold">
                    {currentProblem.exam === 'fma' ? 'F=ma' : 'Physics Bowl'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentProblem.exam === 'fma'
                      ? 'bg-blue-500/50 text-blue-100'
                      : 'bg-purple-500/50 text-purple-100'
                  }`}>
                    {currentProblem.topic}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    currentProblem.difficulty === 'easy' ? 'bg-emerald-500/50 text-emerald-100' :
                    currentProblem.difficulty === 'medium' ? 'bg-amber-500/50 text-amber-100' :
                    'bg-red-500/50 text-red-100'
                  }`}>
                    {currentProblem.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Problem Content */}
            <div className="p-6">
              <p className="text-gray-800 text-lg mb-6">{renderWithLatex(currentProblem.question)}</p>

              {/* Answer Choices */}
              <div className="space-y-3">
                {currentProblem.choices.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerSelect(i)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      hasAnswered
                        ? i === currentProblem.correctAnswer
                          ? 'border-emerald-500 bg-emerald-50'
                          : selectedAnswer === i
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <span className="font-medium text-gray-700 mr-3">{String.fromCharCode(65 + i)}.</span>
                    <span className="text-gray-800">{renderWithLatex(choice)}</span>
                    {hasAnswered && i === currentProblem.correctAnswer && (
                      <span className="ml-2 font-semibold text-emerald-600">Correct!</span>
                    )}
                    {hasAnswered && selectedAnswer === i && i !== currentProblem.correctAnswer && (
                      <span className="ml-2 font-semibold text-red-600">Incorrect</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Solution Toggle */}
              {hasAnswered && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className={`flex items-center font-medium ${
                      currentProblem.exam === 'fma'
                        ? 'text-blue-600 hover:text-blue-700'
                        : 'text-purple-600 hover:text-purple-700'
                    }`}
                  >
                    {showSolution ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </button>
                  {showSolution && (
                    <div className={`mt-4 p-4 rounded-xl border ${
                      currentProblem.exam === 'fma'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-purple-50 border-purple-200'
                    }`}>
                      <p className="text-gray-700 whitespace-pre-line">{renderWithLatex(currentProblem.solution)}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Next Problem Button */}
              {hasAnswered && (
                <div className="mt-8">
                  {remainingProblems > 0 ? (
                    <button
                      onClick={nextProblem}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                      Next Problem
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </button>
                  ) : (
                    <div className="text-center p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/20">
                      <p className="text-gray-700 font-semibold text-lg mb-4">
                        You&apos;ve completed all {answeredIds.size} matching problems!
                      </p>
                      <button
                        onClick={resetSession}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Start Over
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* No problem available */
          <div className="text-center p-12 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-blue-100 text-lg mb-4">No problems match your current filters.</p>
            <button
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
            >
              <Filter className="h-4 w-4 mr-2" />
              Adjust Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16 text-center">
        <p className="text-blue-200/60 text-sm">GV Physics - Preparing students for physics competitions</p>
      </footer>
    </div>
  );
}
