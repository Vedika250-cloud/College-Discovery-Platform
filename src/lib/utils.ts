import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserProfile } from "./store";
import { College } from "./data";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

export function calculateFitScore(profile: UserProfile | null, college: College) {
 if (!profile) return { score: 0, strengths: [], tradeoffs: [], level: "Unknown", eligibility: "Reach" };

 let score = 50; // Base score
 const strengths: string[] = [];
 const tradeoffs: string[] = [];

 // Budget
 if (profile.preferences?.budget) {
 const userBudget = parseInt(profile.preferences.budget);
 if (college.fees <= userBudget) {
 score += 15;
 strengths.push("Within budget");
 } else {
 score -= 10;
 tradeoffs.push("Exceeds budget");
 }
 }

 // State
 if (profile.preferences?.preferredState) {
 if (college.location.toLowerCase().includes(profile.preferences.preferredState.toLowerCase())) {
 score += 10;
 strengths.push("Preferred location");
 }
 }

 // Ownership
 if (profile.preferences?.ownershipType) {
 if (college.ownership === profile.preferences.ownershipType) {
 score += 5;
 strengths.push(`Matches ${profile.preferences.ownershipType} preference`);
 } else {
 tradeoffs.push(`Is ${college.ownership}, you preferred ${profile.preferences.ownershipType}`);
 }
 }

 // Course Match
 if (profile.preferences?.coursePreference) {
 const prefers = profile.preferences.coursePreference.toLowerCase();
 const hasCourse = college.courses.some(c => c.toLowerCase().includes(prefers));
 if (hasCourse) {
 score += 10;
 strengths.push("Offers your preferred course");
 } else {
 score -= 20;
 tradeoffs.push("Does not offer your exact preferred course");
 }
 }

 // Placements
 if (profile.preferences?.placementExpectation) {
 const expectation = parseInt(profile.preferences.placementExpectation);
 if (college.placements >= expectation) {
 score += 10;
 strengths.push("Meets placement expectations");
 } else {
 tradeoffs.push("Average placements below expectations");
 }
 }

 // Eligibility Engine (Safe / Moderate / Reach)
 let eligibility: "Safe" | "Moderate" | "Reach" = "Reach";
 
 const tenth = parseInt(profile.class10Percentage || "0");
 const twelfth = parseInt(profile.class12Percentage || "0");
 
 if (tenth < 60 || twelfth < 60) {
 tradeoffs.push("Low board marks might restrict admission");
 eligibility = "Reach";
 score -= 10;
 }

 // Top IITs
 if (college.name.includes("IIT") || college.name.includes("Indian Institute of Technology")) {
 const advRank = parseInt(profile.exams?.jeeAdvancedRank || "999999");
 if (advRank < 5000) {
 eligibility = "Safe";
 strengths.push("Excellent JEE Advanced rank for IITs");
 score += 20;
 } else if (advRank < 15000) {
 eligibility = "Moderate";
 strengths.push("Competitive JEE Advanced rank");
 score += 10;
 } else {
 eligibility = "Reach";
 tradeoffs.push("JEE Advanced rank might be too low for this IIT");
 score -= 10;
 }
 } 
 // Top NITs / IIITs
 else if (college.name.includes("NIT") || college.name.includes("National") || college.name.includes("IIIT") || college.name.includes("Delhi Technological") || college.name.includes("Netaji")) {
 const mainPerc = parseFloat(profile.exams?.jeeMainPercentile || "0");
 if (mainPerc >= 99) {
 eligibility = "Safe";
 strengths.push("Excellent JEE Main percentile");
 score += 20;
 } else if (mainPerc >= 95) {
 eligibility = "Moderate";
 strengths.push("Competitive JEE Main percentile");
 score += 10;
 } else {
 eligibility = "Reach";
 tradeoffs.push("JEE Main percentile is below competitive range");
 score -= 10;
 }
 }
 // BITS
 else if (college.name.includes("BITS")) {
 const bitsScore = parseInt(profile.exams?.bitsatScore || "0");
 if (bitsScore > 300) {
 eligibility = "Safe";
 strengths.push("Strong BITSAT score");
 score += 20;
 } else if (bitsScore > 240) {
 eligibility = "Moderate";
 strengths.push("Moderate BITSAT score");
 score += 10;
 } else {
 eligibility = "Reach";
 tradeoffs.push("BITSAT score is below typical cutoff");
 score -= 10;
 }
 }
 // VIT
 else if (college.name.includes("VIT") || college.name.includes("Vellore")) {
 const vitRank = parseInt(profile.exams?.viteeeRank || "999999");
 if (vitRank < 20000) {
 eligibility = "Safe";
 strengths.push("Strong VITEEE rank");
 score += 15;
 } else if (vitRank < 50000) {
 eligibility = "Moderate";
 score += 5;
 } else {
 eligibility = "Reach";
 tradeoffs.push("VITEEE rank might restrict main campus admission");
 }
 }
 // Others
 else {
 const mainPerc = parseFloat(profile.exams?.jeeMainPercentile || "0");
 if (mainPerc > 90 || twelfth > 90) {
 eligibility = "Safe";
 strengths.push("Strong profile for this institution");
 score += 15;
 } else if (mainPerc > 75 || twelfth > 80) {
 eligibility = "Moderate";
 score += 5;
 } else {
 eligibility = "Reach";
 tradeoffs.push("Academic profile is a reach for this institution");
 }
 }

 // Normalize score
 score = Math.max(0, Math.min(100, score));

 let level = "Low";
 if (score >= 80) level = "High Match";
 else if (score >= 60) level = "Good Fit";
 else if (score >= 40) level = "Reach Fit";

 return { score, strengths, tradeoffs, level, eligibility };
}
