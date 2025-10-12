'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from './ui/button';
import { UserCircle, LogOut, Settings } from 'lucide-react';

export default function Navigation() {
  const { user, signOut, signInWithGoogle } = useAuth();

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              Physics Club
            </Link>
            {user && (
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/current-problem"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Current Problem
                </Link>
                <Link
                  href="/progress"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  My Progress
                </Link>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    className="hover:text-primary-foreground/80 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <UserCircle className="h-5 w-5" />
                  <span className="hidden md:inline text-sm">
                    {user.displayName}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-primary-foreground hover:text-primary-foreground/80"
                >
                  <LogOut className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button
                variant="secondary"
                onClick={signInWithGoogle}
                className="text-primary"
              >
                Sign In with Google
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}