'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getAllProblems, getUserProgress, markProblemSolved } from '@/lib/firestore';
import Navigation from '@/components/navigation';
import LaTeXRenderer from '@/components/latex-renderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Problem, UserProgress as UserProgressType, ProblemCategory, CategoryProgress } from '@/types';
import { CheckCircle, Circle, Eye, EyeOff, Trophy, Target } from 'lucide-react';

export default function ProgressPage() {
  const { user, loading } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgressType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory | 'All'>('All');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [dataLoading, setDataLoading] = useState(false); // Set to false to avoid hydration issues

  const categories: ProblemCategory[] = [
    'Kinematics', 'Forces', 'Energy', 'Rotation', 'Center of Mass', 'Momentum',
    'Oscillations', 'Thermodynamics', 'Waves', 'Electricity', 'Magnetism', 'Optics', 'Modern Physics'
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const [problemsData, progressData] = await Promise.all([
          getAllProblems(),
          getUserProgress(user.id)
        ]);

        setProblems(problemsData);
        setUserProgress(progressData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getCategoryProgress = (): CategoryProgress[] => {
    return categories.map(category => {
      const categoryProblems = problems.filter(p => p.category === category);
      const solvedProblems = categoryProblems.filter(p =>
        userProgress.some(up => up.problemId === p.id && up.solved)
      );

      return {
        category,
        totalProblems: categoryProblems.length,
        solvedProblems: solvedProblems.length,
        percentage: categoryProblems.length > 0 ? (solvedProblems.length / categoryProblems.length) * 100 : 0
      };
    });
  };

  const getFilteredProblems = () => {
    if (selectedCategory === 'All') return problems;
    return problems.filter(p => p.category === selectedCategory);
  };

  const isProblemSolved = (problemId: string) => {
    return userProgress.some(up => up.problemId === problemId && up.solved);
  };

  const handleMarkSolved = async (problemId: string) => {
    if (!user) return;

    try {
      await markProblemSolved(user.id, problemId);

      // Update local state
      setUserProgress(prev => {
        const existing = prev.find(up => up.problemId === problemId);
        if (existing) {
          return prev.map(up =>
            up.problemId === problemId
              ? { ...up, solved: true, solvedAt: new Date() }
              : up
          );
        } else {
          return [...prev, {
            userId: user.id,
            problemId,
            solved: true,
            solvedAt: new Date(),
            attempts: 1
          }];
        }
      });
    } catch (error) {
      console.error('Error marking problem as solved:', error);
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            <p className="text-muted-foreground">
              You need to sign in to view your progress.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const categoryProgress = getCategoryProgress();
  const totalProblems = problems.length;
  const totalSolved = userProgress.filter(up => up.solved).length;
  const overallProgress = totalProblems > 0 ? (totalSolved / totalProblems) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overall Progress Header */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
              Your Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{totalSolved}</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{totalProblems}</div>
                <div className="text-sm text-muted-foreground">Total Problems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{overallProgress.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
            <Progress value={overallProgress} className="mt-4" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant={selectedCategory === 'All' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory('All')}
                >
                  All Problems ({totalProblems})
                </Button>

                {categoryProgress.map(({ category, totalProblems, solvedProblems, percentage }) => (
                  <div key={category}>
                    <Button
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      className="w-full justify-between mb-1"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <span>{category}</span>
                      <span className="text-xs">
                        {solvedProblems}/{totalProblems}
                      </span>
                    </Button>
                    <Progress value={percentage} className="h-1" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Problems List */}
          <div className="lg:col-span-2">
            {selectedProblem ? (
              // Problem Detail View
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{selectedProblem.title}</CardTitle>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedProblem(null)}
                    >
                      Back to List
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                      {selectedProblem.category}
                    </span>
                    <span>{'★'.repeat(selectedProblem.difficulty)}{'☆'.repeat(5 - selectedProblem.difficulty)}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <LaTeXRenderer className="prose max-w-none">
                    {selectedProblem.problemText}
                  </LaTeXRenderer>

                  {selectedProblem.hint && (
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => setShowHint(!showHint)}
                        className="mb-2"
                      >
                        {showHint ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                        {showHint ? 'Hide Hint' : 'Show Hint'}
                      </Button>
                      {showHint && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <LaTeXRenderer>{selectedProblem.hint}</LaTeXRenderer>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <Button
                      variant="outline"
                      onClick={() => setShowSolution(!showSolution)}
                      className="mb-2"
                    >
                      {showSolution ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                      {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </Button>
                    {showSolution && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <LaTeXRenderer>{selectedProblem.solution}</LaTeXRenderer>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center">
                      {isProblemSolved(selectedProblem.id) ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Solved
                        </div>
                      ) : (
                        <div className="flex items-center text-muted-foreground">
                          <Circle className="h-5 w-5 mr-2" />
                          Not solved
                        </div>
                      )}
                    </div>
                    {!isProblemSolved(selectedProblem.id) && (
                      <Button onClick={() => handleMarkSolved(selectedProblem.id)}>
                        Mark as Solved
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Problems List View
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedCategory === 'All' ? 'All Problems' : `${selectedCategory} Problems`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getFilteredProblems().map(problem => (
                      <div
                        key={problem.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer"
                        onClick={() => setSelectedProblem(problem)}
                      >
                        <div className="flex items-center space-x-3">
                          {isProblemSolved(problem.id) ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <div className="font-medium">{problem.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {problem.category} • {'★'.repeat(problem.difficulty)}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}