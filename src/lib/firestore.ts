import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Problem, User, UserProgress, CurrentProblem } from '@/types';

// Users collection
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'lastLogin'>, userId: string) => {
  const userRef = doc(db, 'users', userId);
  const now = serverTimestamp();
  await setDoc(userRef, {
    ...userData,
    createdAt: now,
    lastLogin: now,
  });
  return userId;
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  return {
    id: userSnap.id,
    ...userSnap.data(),
  } as User;
};

export const updateUserLastLogin = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    lastLogin: serverTimestamp(),
  });
};

// Problems collection
export const createProblem = async (problemData: Omit<Problem, 'id' | 'createdAt' | 'updatedAt'>) => {
  const problemsRef = collection(db, 'problems');
  const now = serverTimestamp();
  const docRef = await addDoc(problemsRef, {
    ...problemData,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
};

export const getAllProblems = async (): Promise<Problem[]> => {
  const problemsRef = collection(db, 'problems');
  const q = query(problemsRef, orderBy('problemNumber', 'asc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Problem[];
};

export const getProblemById = async (problemId: string): Promise<Problem | null> => {
  const problemRef = doc(db, 'problems', problemId);
  const problemSnap = await getDoc(problemRef);

  if (!problemSnap.exists()) {
    return null;
  }

  return {
    id: problemSnap.id,
    ...problemSnap.data(),
  } as Problem;
};

export const updateProblem = async (problemId: string, updates: Partial<Problem>) => {
  const problemRef = doc(db, 'problems', problemId);
  await updateDoc(problemRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteProblem = async (problemId: string) => {
  const problemRef = doc(db, 'problems', problemId);
  await deleteDoc(problemRef);
};

// Current Problem
export const getCurrentProblem = async (): Promise<CurrentProblem | null> => {
  const currentProblemRef = doc(db, 'metadata', 'currentProblem');
  const currentProblemSnap = await getDoc(currentProblemRef);

  if (!currentProblemSnap.exists()) {
    return null;
  }

  return currentProblemSnap.data() as CurrentProblem;
};

export const setCurrentProblem = async (problemId: string, setBy: string) => {
  const currentProblemRef = doc(db, 'metadata', 'currentProblem');
  await setDoc(currentProblemRef, {
    problemId,
    setBy,
    setAt: serverTimestamp(),
    liveStatus: 'active',
  });
};

export const updateLiveStatus = async (status: string) => {
  const currentProblemRef = doc(db, 'metadata', 'currentProblem');
  await updateDoc(currentProblemRef, {
    liveStatus: status,
  });
};

// User Progress
export const getUserProgress = async (userId: string): Promise<UserProgress[]> => {
  const progressRef = collection(db, 'userProgress');
  const q = query(progressRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as UserProgress[];
};

export const markProblemSolved = async (userId: string, problemId: string) => {
  const progressRef = collection(db, 'userProgress');
  await addDoc(progressRef, {
    userId,
    problemId,
    solved: true,
    solvedAt: serverTimestamp(),
  });
};