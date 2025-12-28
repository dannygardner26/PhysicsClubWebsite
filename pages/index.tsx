import { useState, useRef } from 'react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Atom, Trophy, BookOpen, CheckCircle2, Loader2, Sparkles, Calendar, ChevronRight } from 'lucide-react';

const PHYSICS_COURSES = [
  'Physics',
  'Hrs Physics',
  'Hrs Physics 2',
  'AP Physics C: EM',
  'AP Physics C: Mech',
  'Other',
];

const MATH_COURSES = [
  'Precalc or below',
  'Calculus',
  'AP Calc AB',
  'AP Calc BC',
  'Linear Algebra',
  'Multivariable Calculus',
  'Other',
];

const GRADES = ['9', '10', '11', '12'];

const EVENTS = [
  { id: 'fma', label: 'F=ma', description: 'First round of USAPhO qualification' },
  { id: 'physics-bowl', label: 'Physics Bowl', description: 'AAPT national physics competition' },
];

const MEETING_PREFERENCES = [
  { id: 'weekly', label: "I'd go to weekly meetings" },
  { id: 'cram', label: "I'd go to a cram session before exams" },
  { id: 'none', label: "I wouldn't go to any meetings" },
  { id: 'sometimes', label: "I'll go sometimes, but I'm busy" },
  { id: 'other', label: 'Other' },
];

const KEY_DATES = [
  { event: 'F=ma Registration', date: 'Jan 13, 2026', urgent: true },
  { event: 'F=ma Exam', date: 'Feb 12, 2026', urgent: false },
  { event: 'Physics Bowl Exam Window', date: 'Mar 18 - Apr 3, 2026', urgent: false },
];

export default function HomePage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    grade: '',
    events: [] as string[],
    physicsCourses: [] as string[],
    physicsOther: '',
    mathCourses: [] as string[],
    mathOther: '',
    meetingPreference: [] as string[],
    meetingOther: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckboxChange = (
    field: 'events' | 'physicsCourses' | 'mathCourses' | 'meetingPreference',
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.grade) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.events.length === 0) {
      setError('Please select at least one event.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid school email.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="mx-auto bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">You&apos;re In!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Thanks for signing up for physics competitions. We&apos;ll be in touch soon with more details.
          </p>
          <Link
            href="/contests"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Learn About the Contests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-xl">
              <Atom className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">GV Physics</span>
          </div>
          <nav className="flex items-center space-x-2">
            <Link
              href="/contests"
              className="flex items-center px-4 py-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Contest Info
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

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center relative">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm mb-8">
            <Sparkles className="h-4 w-4 mr-2" />
            2025-2026 Competition Season
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Great Valley <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Physics Club</span>
          </h1>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Join fellow physics enthusiasts in competing at F=ma and Physics Bowl. Sign up below to participate!
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Sign Up Now
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Key Dates Banner */}
      <div className="bg-white/5 border-y border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-5 w-5 text-blue-400 mr-2" />
            <h2 className="text-lg font-semibold text-white">Key Dates</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {KEY_DATES.map((item, i) => (
              <div key={i} className={`text-center px-4 py-2 rounded-lg ${item.urgent ? 'bg-amber-500/20 border border-amber-400/30' : 'bg-white/5'}`}>
                <div className={`text-sm font-medium ${item.urgent ? 'text-amber-300' : 'text-blue-200'}`}>{item.event}</div>
                <div className={`text-lg font-bold ${item.urgent ? 'text-amber-100' : 'text-white'}`}>{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div ref={formRef} className="max-w-2xl mx-auto px-4 py-12 pb-24">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Sign Up</h2>
            <p className="text-blue-100 mt-1">
              Register your interest in physics competitions.
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Event Selection */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">
                Which events are you interested in? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {EVENTS.map((event) => (
                  <label
                    key={event.id}
                    className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.events.includes(event.label)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <Checkbox
                      id={event.id}
                      checked={formData.events.includes(event.label)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange('events', event.label, checked as boolean)
                      }
                      className="mt-0.5"
                    />
                    <div className="ml-3">
                      <span className="text-base font-medium text-gray-900">{event.label}</span>
                      <p className="text-sm text-gray-500 mt-0.5">{event.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">Contact Information</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    School Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john.doe@school.edu"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                    Grade <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="grade"
                    value={formData.grade}
                    onChange={(e) => setFormData((prev) => ({ ...prev, grade: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors text-gray-900 bg-white"
                  >
                    <option value="">Select grade</option>
                    {GRADES.map((grade) => (
                      <option key={grade} value={grade}>{grade}th Grade</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Meeting Preferences */}
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-900">Meeting Preferences</label>
                <p className="text-sm text-gray-500 mt-1">
                  We&apos;ll use this to decide whether to host group study sessions.
                </p>
              </div>
              <div className="space-y-3">
                {MEETING_PREFERENCES.map((pref) => (
                  <label
                    key={pref.id}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      formData.meetingPreference.includes(pref.label)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <Checkbox
                      id={`meeting-${pref.id}`}
                      checked={formData.meetingPreference.includes(pref.label)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange('meetingPreference', pref.label, checked as boolean)
                      }
                    />
                    <span className="ml-3 text-sm text-gray-700">{pref.label}</span>
                  </label>
                ))}
              </div>
              {formData.meetingPreference.includes('Other') && (
                <input
                  type="text"
                  placeholder="Please specify..."
                  value={formData.meetingOther}
                  onChange={(e) => setFormData((prev) => ({ ...prev, meetingOther: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors text-gray-900 placeholder:text-gray-400"
                />
              )}
            </div>

            {/* Physics Courses */}
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-900">Physics Courses</label>
                <p className="text-sm text-gray-500 mt-1">
                  Select all courses you are currently enrolled in or have completed.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PHYSICS_COURSES.map((course) => (
                  <label
                    key={course}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      formData.physicsCourses.includes(course)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <Checkbox
                      id={`physics-${course}`}
                      checked={formData.physicsCourses.includes(course)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange('physicsCourses', course, checked as boolean)
                      }
                    />
                    <span className="ml-3 text-sm text-gray-700">{course}</span>
                  </label>
                ))}
              </div>
              {formData.physicsCourses.includes('Other') && (
                <input
                  type="text"
                  placeholder="Please specify your physics course..."
                  value={formData.physicsOther}
                  onChange={(e) => setFormData((prev) => ({ ...prev, physicsOther: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors text-gray-900 placeholder:text-gray-400"
                />
              )}
            </div>

            {/* Math Courses */}
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-900">Math Courses</label>
                <p className="text-sm text-gray-500 mt-1">
                  Select all courses you are currently enrolled in or have completed.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MATH_COURSES.map((course) => (
                  <label
                    key={course}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      formData.mathCourses.includes(course)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <Checkbox
                      id={`math-${course}`}
                      checked={formData.mathCourses.includes(course)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange('mathCourses', course, checked as boolean)
                      }
                    />
                    <span className="ml-3 text-sm text-gray-700">{course}</span>
                  </label>
                ))}
              </div>
              {formData.mathCourses.includes('Other') && (
                <input
                  type="text"
                  placeholder="Please specify your math course..."
                  value={formData.mathOther}
                  onChange={(e) => setFormData((prev) => ({ ...prev, mathOther: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors text-gray-900 placeholder:text-gray-400"
                />
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Registration'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center">
        <p className="text-blue-200/60 text-sm">GV Physics - Preparing students for physics competitions</p>
      </footer>
    </div>
  );
}
