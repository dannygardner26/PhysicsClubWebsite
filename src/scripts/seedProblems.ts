/**
 * Firestore Seeding Script
 *
 * This script seeds the Firestore database with physics problems from seedProblems.ts
 *
 * To run this script:
 * npm run seed
 */

// Load environment variables
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { seedProblems } from '../data/seedProblems';

// Initialize Firebase directly in the seed script
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedFirestore() {
  console.log('🌱 Starting Firestore seeding process...');
  console.log(`📚 Found ${seedProblems.length} problems to import`);

  // Verify Firebase configuration
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_api_key_here') {
    console.error('❌ Firebase is not configured!');
    console.error('Please add your Firebase credentials to .env.local');
    console.error('\nExpected environment variables:');
    console.error('  NEXT_PUBLIC_FIREBASE_API_KEY');
    console.error('  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
    console.error('  NEXT_PUBLIC_FIREBASE_PROJECT_ID');
    console.error('  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
    console.error('  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
    console.error('  NEXT_PUBLIC_FIREBASE_APP_ID');
    process.exit(1);
  }

  console.log(`\n🔥 Connected to Firebase project: ${firebaseConfig.projectId}`);

  const problemsCollection = collection(db, 'problems');
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < seedProblems.length; i++) {
    const problem = seedProblems[i];

    try {
      // Add timestamps and problem number
      const problemWithTimestamps = {
        ...problem,
        problemNumber: i + 1, // Sequential problem number for daily rotation
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(problemsCollection, problemWithTimestamps);
      successCount++;
      console.log(`✅ [${i + 1}/${seedProblems.length}] Added: ${problem.title} (ID: ${docRef.id})`);
    } catch (error) {
      errorCount++;
      console.error(`❌ [${i + 1}/${seedProblems.length}] Error adding ${problem.title}:`, error);
    }
  }

  console.log('\n📊 Seeding Summary:');
  console.log(`   ✅ Successfully added: ${successCount} problems`);
  console.log(`   ❌ Errors: ${errorCount} problems`);
  console.log(`   📝 Total: ${seedProblems.length} problems`);

  if (successCount === seedProblems.length) {
    console.log('\n🎉 All problems successfully seeded to Firestore!');
  } else {
    console.log('\n⚠️  Some problems failed to seed. Check the errors above.');
  }

  const categories = Array.from(new Set(seedProblems.map(p => p.category)));
  console.log(`\n📋 Categories covered: ${categories.join(', ')}`);
  const difficulties = seedProblems.map(p => p.difficulty);
  console.log(`🎯 Difficulty range: ${Math.min(...difficulties)} - ${Math.max(...difficulties)}`);
}

// Run the seeding function
seedFirestore()
  .then(() => {
    console.log('\n✨ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });
