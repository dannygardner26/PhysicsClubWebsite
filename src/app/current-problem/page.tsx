'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getCurrentProblem, getProblemById } from '@/lib/firestore';
import Navigation from '@/components/navigation';
import LaTeXRenderer from '@/components/latex-renderer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Problem, CurrentProblem } from '@/types';
import { Eye, EyeOff, Clock, Users } from 'lucide-react';
import Image from 'next/image';

export default function CurrentProblemPage() {
  const { user, loading } = useAuth();
  const [currentProblem, setCurrentProblem] = useState<CurrentProblem | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [problemLoading, setProblemLoading] = useState(false); // Set to false to avoid hydration issues

  useEffect(() => {
    const fetchCurrentProblem = async () => {
      try {
        const current = await getCurrentProblem();
        setCurrentProblem(current);

        if (current) {
          const problemData = await getProblemById(current.problemId);
          setProblem(problemData);
        }
      } catch (error) {
        console.error('Error fetching current problem:', error);
      } finally {
        setProblemLoading(false);
      }
    };

    fetchCurrentProblem();
  }, []);

  if (loading || problemLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading current problem...</p>
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
              You need to sign in to access the current problem.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentProblem || !problem) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-4">No Current Problem</h1>
            <p className="text-muted-foreground">
              There is no problem currently set for the class. Check back later or contact your instructor.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const difficultyStars = '★'.repeat(problem.difficulty) + '☆'.repeat(5 - problem.difficulty);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Live Status Banner */}
        {currentProblem.liveStatus && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-medium">Live Status: </span>
              <span>{currentProblem.liveStatus}</span>
            </div>
          </div>
        )}

        {/* Problem Header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                  {problem.category}
                </span>
                <span>Difficulty: {difficultyStars}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              <p>Set for class on {new Date(currentProblem.setAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Problem Image */}
          {problem.imageUrl && (
            <div className="mb-6">
              <Image
                src={problem.imageUrl}
                alt="Problem diagram"
                width={600}
                height={400}
                className="rounded-lg border max-w-full h-auto"
              />
            </div>
          )}

          {/* Problem Text */}
          <div className="prose max-w-none">
            <LaTeXRenderer className="text-lg leading-relaxed">
              {problem.problemText}
            </LaTeXRenderer>
          </div>
        </Card>

        {/* Hint Section */}
        {problem.hint && (
          <Card className="p-6 mb-6">
            <Button
              variant="outline"
              onClick={() => setShowHint(!showHint)}
              className="mb-4"
            >
              {showHint ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide Hint
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Show Hint
                </>
              )}
            </Button>

            {showHint && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Hint:</h3>
                <LaTeXRenderer className="text-yellow-700">
                  {problem.hint}
                </LaTeXRenderer>
              </div>
            )}
          </Card>
        )}

        {/* Solution Section */}
        <Card className="p-6">
          <Button
            variant="outline"
            onClick={() => setShowSolution(!showSolution)}
            className="mb-4"
          >
            {showSolution ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Solution
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Solution
              </>
            )}
          </Button>

          {showSolution && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Solution:</h3>
              <LaTeXRenderer className="text-blue-700">
                {problem.solution}
              </LaTeXRenderer>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}