'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  getAllProblems,
  createProblem,
  updateProblem,
  deleteProblem,
  setCurrentProblem,
  getCurrentProblem,
  updateLiveStatus
} from '@/lib/firestore';
import Navigation from '@/components/navigation';
import LaTeXRenderer from '@/components/latex-renderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Problem, ProblemCategory, CurrentProblem } from '@/types';
import {
  Plus,
  Edit,
  Trash2,
  Play,
  Settings,
  Users,
  BookOpen,
  Upload
} from 'lucide-react';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblem, setCurrentProblemState] = useState<CurrentProblem | null>(null);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [liveStatus, setLiveStatus] = useState('');
  const [dataLoading, setDataLoading] = useState(false); // Set to false to avoid hydration issues

  const categories: ProblemCategory[] = [
    'Kinematics', 'Forces', 'Energy', 'Rotation', 'Center of Mass', 'Momentum',
    'Oscillations', 'Thermodynamics', 'Waves', 'Electricity', 'Magnetism', 'Optics', 'Modern Physics'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [problemsData, currentProblemData] = await Promise.all([
          getAllProblems(),
          getCurrentProblem()
        ]);

        setProblems(problemsData);
        setCurrentProblemState(currentProblemData);
        if (currentProblemData?.liveStatus) {
          setLiveStatus(currentProblemData.liveStatus);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateProblem = async (formData: FormData) => {
    if (!user) return;

    // Find the highest problem number and increment by 1
    const maxProblemNumber = problems.length > 0
      ? Math.max(...problems.map(p => p.problemNumber))
      : 0;

    const problemData = {
      problemNumber: maxProblemNumber + 1,
      title: formData.get('title') as string,
      category: formData.get('category') as ProblemCategory,
      difficulty: parseInt(formData.get('difficulty') as string) as 1 | 2 | 3 | 4 | 5,
      problemText: formData.get('problemText') as string,
      hint: formData.get('hint') as string || undefined,
      solution: formData.get('solution') as string,
      imageUrl: formData.get('imageUrl') as string || undefined,
      createdBy: user.id,
    };

    try {
      const newProblemId = await createProblem(problemData);
      const newProblem = {
        id: newProblemId,
        ...problemData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProblems(prev => [newProblem, ...prev]);
      setShowCreateDialog(false);
    } catch (error) {
      console.error('Error creating problem:', error);
    }
  };

  const handleSetCurrentProblem = async (problemId: string) => {
    if (!user) return;

    try {
      await setCurrentProblem(problemId, user.id);
      const newCurrentProblem = {
        problemId,
        isLive: true,
        setAt: new Date(),
        setBy: user.id,
      };
      setCurrentProblemState(newCurrentProblem);
    } catch (error) {
      console.error('Error setting current problem:', error);
    }
  };

  const handleUpdateLiveStatus = async () => {
    try {
      await updateLiveStatus(liveStatus);
      setCurrentProblemState(prev => prev ? { ...prev, liveStatus } : null);
    } catch (error) {
      console.error('Error updating live status:', error);
    }
  };

  const handleDeleteProblem = async (problemId: string) => {
    if (!confirm('Are you sure you want to delete this problem?')) return;

    try {
      await deleteProblem(problemId);
      setProblems(prev => prev.filter(p => p.id !== problemId));
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground">
              You need admin privileges to access this page.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const currentProblemData = currentProblem ? problems.find(p => p.id === currentProblem.problemId) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Problem
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Problem</DialogTitle>
              </DialogHeader>
              <ProblemForm onSubmit={handleCreateProblem} categories={categories} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Problem Management */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Current Problem
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentProblemData ? (
                  <div className="space-y-4">
                    <div className="text-sm">
                      <strong>{currentProblemData.title}</strong>
                      <br />
                      <span className="text-muted-foreground">
                        {currentProblemData.category} • Level {currentProblemData.difficulty}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Live Status Update:</label>
                      <div className="flex space-x-2">
                        <Input
                          value={liveStatus}
                          onChange={(e) => setLiveStatus(e.target.value)}
                          placeholder="e.g., Now solving part (a)..."
                        />
                        <Button size="sm" onClick={handleUpdateLiveStatus}>
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No current problem set
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Problems</span>
                    <span className="font-medium">{problems.length}</span>
                  </div>
                  {categories.map(category => {
                    const count = problems.filter(p => p.category === category).length;
                    return (
                      <div key={category} className="flex justify-between">
                        <span className="text-sm">{category}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Problems List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Problem Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {problems.map(problem => (
                    <div key={problem.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{problem.title}</h3>
                            {currentProblem?.problemId === problem.id && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {problem.category} • Difficulty: {'★'.repeat(problem.difficulty)}
                          </div>
                          <div className="text-sm line-clamp-2">
                            <LaTeXRenderer>{problem.problemText.substring(0, 150) + '...'}</LaTeXRenderer>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSetCurrentProblem(problem.id)}
                            disabled={currentProblem?.problemId === problem.id}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingProblem(problem)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProblem(problem.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Problem Dialog */}
      {editingProblem && (
        <Dialog open={!!editingProblem} onOpenChange={() => setEditingProblem(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Problem</DialogTitle>
            </DialogHeader>
            <ProblemForm
              problem={editingProblem}
              onSubmit={async (formData) => {
                // Handle edit submission
                const updates = {
                  title: formData.get('title') as string,
                  category: formData.get('category') as ProblemCategory,
                  difficulty: parseInt(formData.get('difficulty') as string) as 1 | 2 | 3 | 4 | 5,
                  problemText: formData.get('problemText') as string,
                  hint: formData.get('hint') as string || undefined,
                  solution: formData.get('solution') as string,
                  imageUrl: formData.get('imageUrl') as string || undefined,
                };

                try {
                  await updateProblem(editingProblem.id, updates);
                  setProblems(prev => prev.map(p =>
                    p.id === editingProblem.id ? { ...p, ...updates } : p
                  ));
                  setEditingProblem(null);
                } catch (error) {
                  console.error('Error updating problem:', error);
                }
              }}
              categories={categories}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Problem Form Component
interface ProblemFormProps {
  problem?: Problem;
  onSubmit: (formData: FormData) => void;
  categories: ProblemCategory[];
}

function ProblemForm({ problem, onSubmit, categories }: ProblemFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input name="title" defaultValue={problem?.title} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select name="category" defaultValue={problem?.category} required>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Difficulty (1-5)</label>
        <Select name="difficulty" defaultValue={problem?.difficulty?.toString()} required>
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map(level => (
              <SelectItem key={level} value={level.toString()}>
                {level} {'★'.repeat(level)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Problem Text (LaTeX supported)</label>
        <Textarea
          name="problemText"
          defaultValue={problem?.problemText}
          rows={6}
          placeholder="Enter the problem statement. Use $...$ for inline math and $$...$$ for block math."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Hint (optional)</label>
        <Textarea
          name="hint"
          defaultValue={problem?.hint}
          rows={3}
          placeholder="Optional hint for students"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Solution</label>
        <Textarea
          name="solution"
          defaultValue={problem?.solution}
          rows={6}
          placeholder="Step-by-step solution"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Image URL (optional)</label>
        <Input
          name="imageUrl"
          defaultValue={problem?.imageUrl}
          placeholder="https://example.com/image.png"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">
          {problem ? 'Update Problem' : 'Create Problem'}
        </Button>
      </div>
    </form>
  );
}