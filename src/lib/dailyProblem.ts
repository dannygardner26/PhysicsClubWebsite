/**
 * Daily Problem System
 *
 * Calculates which problem should be displayed each day by cycling through
 * the 50 problems in the seed data. The system uses a fixed start date
 * and calculates the number of days elapsed to determine the current problem.
 */

// Fixed start date for the daily problem cycle (January 1, 2025)
const START_DATE = new Date('2025-01-01T00:00:00Z');

// Total number of problems available
const TOTAL_PROBLEMS = 50;

/**
 * Get the problem number (1-50) for today
 * @returns The problem number for today (1-50)
 */
export function getTodaysProblemNumber(): number {
  const today = new Date();
  // Reset time to midnight for consistent day calculation
  today.setHours(0, 0, 0, 0);

  // Calculate days elapsed since start date
  const daysElapsed = Math.floor(
    (today.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate problem number (1-50), cycling through all problems
  const problemNumber = (daysElapsed % TOTAL_PROBLEMS) + 1;

  return problemNumber;
}

/**
 * Get the problem number for a specific date
 * @param date The date to get the problem for
 * @returns The problem number for that date (1-50)
 */
export function getProblemNumberForDate(date: Date): number {
  // Reset time to midnight for consistent day calculation
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  // Calculate days elapsed since start date
  const daysElapsed = Math.floor(
    (targetDate.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate problem number (1-50), cycling through all problems
  const problemNumber = (daysElapsed % TOTAL_PROBLEMS) + 1;

  return problemNumber;
}

/**
 * Get the array index (0-49) for today's problem
 * @returns The array index for today's problem
 */
export function getTodaysProblemIndex(): number {
  return getTodaysProblemNumber() - 1;
}

/**
 * Get the array index for a specific date's problem
 * @param date The date to get the problem index for
 * @returns The array index for that date's problem
 */
export function getProblemIndexForDate(date: Date): number {
  return getProblemNumberForDate(date) - 1;
}

/**
 * Calculate how many days until a specific problem number appears
 * @param problemNumber The problem number (1-50)
 * @returns Number of days until that problem appears (0 if it's today)
 */
export function daysUntilProblem(problemNumber: number): number {
  if (problemNumber < 1 || problemNumber > TOTAL_PROBLEMS) {
    throw new Error(`Problem number must be between 1 and ${TOTAL_PROBLEMS}`);
  }

  const today = getTodaysProblemNumber();

  if (today === problemNumber) {
    return 0;
  }

  // Calculate forward distance
  let daysAhead = problemNumber - today;
  if (daysAhead < 0) {
    daysAhead += TOTAL_PROBLEMS;
  }

  return daysAhead;
}

/**
 * Get the date when a specific problem number will appear next
 * @param problemNumber The problem number (1-50)
 * @returns The date when that problem will appear
 */
export function getDateForProblemNumber(problemNumber: number): Date {
  const daysAhead = daysUntilProblem(problemNumber);
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysAhead);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate;
}
