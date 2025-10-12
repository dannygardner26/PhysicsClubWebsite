'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getCurrentProblem, getProblemById, getUserProgress } from '@/lib/firestore';
import Navigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Problem, CurrentProblem, UserProgress } from '@/types';
import {
  BookOpen,
  Target,
  Trophy,
  Users,
  ChevronRight,
  Play,
  BarChart3,
  Clock
} from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const [currentProblem, setCurrentProblem] = useState<CurrentProblem | null>(null);
  const [currentProblemData, setCurrentProblemData] = useState<Problem | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [dataLoading, setDataLoading] = useState(false); // Set to false to avoid hydration issues

  useEffect(() => {
    const fetchData = async () => {
      try {
        const current = await getCurrentProblem();
        setCurrentProblem(current);

        if (current) {
          const problemData = await getProblemById(current.problemId);
          setCurrentProblemData(problemData);
        }

        if (user) {
          const progress = await getUserProgress(user.id);
          setUserProgress(progress);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const totalSolved = userProgress.filter(up => up.solved).length;

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Physics Club
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Master F=ma and USAPhO Problems Together
            </p>
            {!user ? (
              <p className="text-lg opacity-80">
                Sign in to start solving physics problems and track your progress
              </p>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">{totalSolved}</div>
                  <div className="text-sm opacity-80">Problems Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {Math.round((totalSolved / Math.max(userProgress.length, 1)) * 100)}%
                  </div>
                  <div className="text-sm opacity-80">Progress</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {user ? (
          // Signed-in user dashboard
          <div className="space-y-8">
            {/* Current Problem Section */}
            {currentProblem && currentProblemData ? (
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-primary">
                      <Play className="h-6 w-6 mr-2" />
                      Current Class Problem
                    </CardTitle>
                    {currentProblem.liveStatus && (
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {currentProblem.liveStatus}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-semibold mb-2">{currentProblemData.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                          {currentProblemData.category}
                        </span>
                        <span>Difficulty: {'★'.repeat(currentProblemData.difficulty)}</span>
                      </div>
                      <p className="text-muted-foreground">
                        {currentProblemData.problemText.substring(0, 200)}...
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Link href="/current-problem">
                        <Button size="lg" className="w-full md:w-auto">
                          View Problem
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-muted">
                <CardContent className="flex items-center justify-center py-12 text-center">
                  <div>
                    <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No Current Problem</h3>
                    <p className="text-muted-foreground">
                      Check back later when your instructor sets a new problem for the class.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link href="/progress">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-6 w-6 mr-2" />
                      My Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      View your solved problems, track progress by category, and practice past problems.
                    </p>
                    <div className="flex items-center text-primary">
                      <span className="text-2xl font-bold mr-2">{totalSolved}</span>
                      <span>problems solved</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>

              {user.isAdmin && (
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <Link href="/admin">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="h-6 w-6 mr-2" />
                        Admin Dashboard
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Manage problems, set current problems, and control live classroom features.
                      </p>
                      <div className="text-primary font-medium">
                        Access admin tools →
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              )}
            </div>
          </div>
        ) : (
          // Not signed in - feature overview
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Everything You Need for Physics Problem Solving
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Designed specifically for high school Physics Club students preparing for F=ma and USAPhO competitions.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Current Problem</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Follow along with the problem your instructor is teaching live in class.
                    Includes LaTeX support for mathematical equations and optional hints.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Track your progress across different physics categories. See which areas
                    you&apos;re strong in and which need more practice.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Problem Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Access a curated collection of F=ma and USAPhO problems organized by
                    difficulty and topic. Practice at your own pace.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Categories Preview */}
            <div className="bg-muted/50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Physics Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  'Kinematics', 'Forces', 'Energy', 'Rotation',
                  'Momentum', 'Oscillations', 'Thermodynamics', 'Waves',
                  'Electricity', 'Magnetism', 'Optics', 'Modern Physics'
                ].map(category => (
                  <div key={category} className="p-3 bg-background rounded border">
                    {category}
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="text-center py-12">
                <h3 className="text-2xl font-bold mb-4">Ready to Start Solving?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Sign in with your Google account to access all features and start tracking your progress.
                </p>
                <p className="text-sm opacity-80">
                  Perfect for F=ma preparation and USAPhO training
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}