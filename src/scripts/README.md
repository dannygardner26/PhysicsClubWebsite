# Database Seeding Scripts

This directory contains scripts for seeding the Firestore database with initial data.

## Available Scripts

### `seedProblems.ts`

Seeds the Firestore database with 50 physics competition problems from various sources:
- 36 general physics problems covering key topics
- 8 problems from 2023 F=ma exam
- 6 problems from 2022 F=ma exam

**Total**: 50 problems across 13 categories with difficulty ratings from 1-5.

## Setup Instructions

### 1. Enable Firebase

Before running the seed script, you need to enable Firebase:

1. Get Firebase credentials from your Firebase Console
2. Copy `.env.local.example` to `.env.local` and fill in your credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. Uncomment the Firebase initialization code in `src/lib/firebase.ts`

4. Uncomment the seeding code in `src/scripts/seedProblems.ts`

### 2. Run the Seed Script

```bash
npm run seed
```

This will:
- Connect to your Firestore database
- Import all 50 problems from `src/data/seedProblems.ts`
- Add timestamps to each problem
- Display progress and summary

## Problem Structure

Each problem includes:

```typescript
{
  title: string;           // Problem title with identifier
  category: string;        // Physics topic category
  difficulty: number;      // 1-5 difficulty rating
  problemText: string;     // Full problem statement
  solution: string;        // Detailed solution
  hint?: string;          // Optional hint (for advanced problems)
  createdBy: string;      // Creator identifier
  createdAt: Timestamp;   // Auto-generated
  updatedAt: Timestamp;   // Auto-generated
}
```

## Categories

The problems cover these topics:
- Kinematics
- Forces
- Energy
- Momentum
- Rotation
- Oscillations
- Waves
- Thermodynamics
- Electricity
- Magnetism
- Optics
- Modern Physics
- Center of Mass

## Daily Problem Rotation

The problems are designed to work with the daily rotation system defined in `src/lib/dailyProblem.ts`:

- Problems cycle through all 50 problems
- Each problem appears once every 50 days
- The system started on January 1, 2025
- Use `getTodaysProblemNumber()` to get today's problem (1-50)

## Troubleshooting

### Firebase Not Initialized
If you get "Firebase is not initialized" error:
- Check that `.env.local` has all required Firebase credentials
- Verify Firebase initialization code is uncommented in `src/lib/firebase.ts`

### Permission Denied
If you get permission errors:
- Check your Firebase Security Rules
- Ensure your service account has write permissions
- Verify you're authenticated to Firebase

### Module Errors
If you get module resolution errors:
- Run `npm install` to ensure all dependencies are installed
- Check that `ts-node` is installed in devDependencies

## Data Sources

Problems are extracted from:
- F=ma 2023 Exam (Official AAPT Physics Competition)
- F=ma 2022 Exam (Official AAPT Physics Competition)
- USAPhO 2025 Exam Problems
- Standard Physics Competition Problem Sets

All problems include complete solutions and are suitable for high school physics competition preparation.
