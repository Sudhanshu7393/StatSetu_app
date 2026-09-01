import { Roommate } from './mock-data';

export interface CompatibilityResult {
  score: number;
  matchedTraits: string[];
}

export function calculateRoommateCompatibility(
  target: Partial<Roommate>,
  candidate: Roommate
): CompatibilityResult {
  let score = 50; // Base score
  const matchedTraits: string[] = [];

  // College match (High priority)
  if (target.collegeId && target.collegeId === candidate.collegeId) {
    score += 20;
    matchedTraits.push('Same College');
  }

  // Budget match
  if (
    target.budgetMin !== undefined &&
    target.budgetMax !== undefined &&
    candidate.budgetMin <= target.budgetMax &&
    candidate.budgetMax >= target.budgetMin
  ) {
    score += 10;
    matchedTraits.push('Similar Budget');
  }

  // Smoking match
  if (target.smoking && target.smoking === candidate.smoking) {
    score += 5;
    if (candidate.smoking === 'No') matchedTraits.push('Non-Smoker');
  }

  // Drinking match
  if (target.drinking && target.drinking === candidate.drinking) {
    score += 5;
  }

  // Sleep schedule
  if (target.sleepSchedule && target.sleepSchedule === candidate.sleepSchedule) {
    score += 5;
    matchedTraits.push('Compatible Sleep Schedule');
  }

  // Cleanliness
  if (target.cleanliness && target.cleanliness === candidate.cleanliness) {
    score += 5;
    matchedTraits.push('Cleanliness Aligned');
  }

  // Study style
  if (target.studyStyle && target.studyStyle === candidate.studyStyle) {
    score += 5;
  }

  // Food preference
  if (target.foodPreference && target.foodPreference === candidate.foodPreference) {
    score += 5;
  }

  // Cap score at 98% for realistic UX
  const finalScore = Math.min(98, score);

  return {
    score: finalScore,
    matchedTraits: matchedTraits.slice(0, 4),
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateTravelEstimates(distanceMeters: number) {
  const walkingMinutes = Math.max(1, Math.round(distanceMeters / 80)); // ~4.8 km/h
  const drivingMinutes = Math.max(1, Math.round(distanceMeters / 300)); // ~18 km/h city
  return {
    walkingMinutes,
    drivingMinutes,
    distanceText: distanceMeters >= 1000 ? `${(distanceMeters / 1000).toFixed(1)} km` : `${distanceMeters} m`,
  };
}
