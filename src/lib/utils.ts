import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserProfile } from "./store";
import { College, Scholarship } from "./data";

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

export function calculateAdmissionChance(profile: UserProfile | null, college: College) {
  if (!profile) return { chance: 0, category: "Ambitious", recommendations: ["Please complete your profile to predict admission chances."] };

  let chance = 50;
  const recommendations: string[] = [];

  const tenth = parseInt(profile.class10Percentage || "0");
  const twelfth = parseInt(profile.class12Percentage || "0");

  if (tenth > 0 && tenth < 60) {
    chance -= 15;
    recommendations.push("10th marks are below 60%, which limits options at strict institutions.");
  } else if (tenth >= 90) {
    chance += 5;
    recommendations.push("Excellent 10th marks provide a strong foundation.");
  }

  if (twelfth > 0 && twelfth < 60) {
    chance -= 20;
    recommendations.push("12th board marks below 60% significantly impact admission chances. Focus on entrance exams.");
  } else if (twelfth >= 90) {
    chance += 10;
    recommendations.push("Outstanding 12th board marks improve your profile for merit-based admissions.");
  } else if (twelfth > 75) {
    chance += 5;
  }

  // Top IITs
  if (college.name.includes("IIT") || college.name.includes("Indian Institute of Technology")) {
    const advRank = parseInt(profile.exams?.jeeAdvancedRank || "999999");
    if (advRank < 5000) {
      chance = 95;
      recommendations.push("Your JEE Advanced rank is highly competitive for top IITs.");
    } else if (advRank < 15000) {
      chance = 60;
      recommendations.push("Your JEE Advanced rank is moderate. Core branches might be difficult, consider newer IITs.");
    } else {
      chance = 15;
      recommendations.push("JEE Advanced rank is above typical cutoffs for IITs. Consider NITs or IIITs.");
    }
  } 
  // Top NITs / IIITs
  else if (college.name.includes("NIT") || college.name.includes("National") || college.name.includes("IIIT") || college.name.includes("Delhi Technological") || college.name.includes("Netaji")) {
    const mainPerc = parseFloat(profile.exams?.jeeMainPercentile || "0");
    if (mainPerc >= 99) {
      chance = 95;
      recommendations.push("Outstanding JEE Main percentile ensures admission in top NITs/IIITs.");
    } else if (mainPerc >= 95) {
      chance = 70;
      recommendations.push("Good JEE Main percentile. Branch selection might be slightly restricted.");
    } else if (mainPerc >= 90) {
      chance = 45;
      recommendations.push("Borderline JEE Main percentile. Consider state counseling or lower-tier NITs.");
    } else {
      chance = 20;
      recommendations.push("JEE Main percentile is too low for most NITs/IIITs. Prepare for state-level exams or private institutions.");
    }
  }
  // BITS
  else if (college.name.includes("BITS")) {
    const bitsScore = parseInt(profile.exams?.bitsatScore || "0");
    if (bitsScore > 300) {
      chance = 95;
      recommendations.push("Strong BITSAT score, high chance of securing preferred branch.");
    } else if (bitsScore > 240) {
      chance = 65;
      recommendations.push("Moderate BITSAT score. You have a chance at Goa or Hyderabad campuses.");
    } else {
      chance = 25;
      recommendations.push("BITSAT score is below the safe threshold of 240. Chances are ambitious.");
    }
  }
  // VIT
  else if (college.name.includes("VIT") || college.name.includes("Vellore")) {
    const vitRank = parseInt(profile.exams?.viteeeRank || "999999");
    if (vitRank < 20000) {
      chance = 90;
      recommendations.push("Strong VITEEE rank ensures a seat in Category 1 or 2.");
    } else if (vitRank < 60000) {
      chance = 60;
      recommendations.push("Moderate VITEEE rank. You may need to opt for Category 3 or 4 fees.");
    } else {
      chance = 30;
      recommendations.push("VITEEE rank is high. Admission might only be possible in lower branches or higher fee categories.");
    }
  }
  // Private / State Colleges
  else {
    const mainPerc = parseFloat(profile.exams?.jeeMainPercentile || "0");
    if (mainPerc >= 90 || twelfth >= 85) {
      chance += 30;
      recommendations.push("Strong academic/exam profile easily clears cutoffs for this institution.");
    } else if (mainPerc >= 75 || twelfth >= 70) {
      chance += 10;
      recommendations.push("Profile meets general requirements. Good chance of admission.");
    } else {
      chance -= 15;
      recommendations.push("Marks are borderline. A strong state exam score would help.");
    }
  }

  // Normalize chance
  chance = Math.max(5, Math.min(99, chance));

  let category: "Safe" | "Moderate" | "Ambitious" = "Ambitious";
  if (chance >= 75) category = "Safe";
  else if (chance >= 40) category = "Moderate";

  if (recommendations.length === 0) {
    if (category === "Safe") recommendations.push("You are a very strong candidate for this college.");
    else if (category === "Moderate") recommendations.push("You have a fair chance, but have backup options ready.");
    else recommendations.push("This is a reach college based on your current academic profile.");
  }

  return { chance, category, recommendations };
}

export function calculateScholarshipMatch(profile: UserProfile | null, scholarship: Scholarship): { isEligible: boolean; reasons: string[] } {
  if (!profile) return { isEligible: false, reasons: ["Profile incomplete"] };

  const reasons: string[] = [];
  let isEligible = true;

  // 1. Merit Check
  if (scholarship.eligibilityCriteria.min12thPercentage) {
    const p12 = parseFloat(profile.class12Percentage);
    if (!isNaN(p12)) {
      if (p12 >= scholarship.eligibilityCriteria.min12thPercentage) {
        reasons.push(`Meets 12th percentage requirement (${scholarship.eligibilityCriteria.min12thPercentage}%+)`);
      } else {
        isEligible = false;
        reasons.push(`Requires ${scholarship.eligibilityCriteria.min12thPercentage}% in 12th (You have ${p12}%)`);
      }
    } else {
      isEligible = false;
      reasons.push(`12th marks missing for merit check`);
    }
  }

  // 2. Exam Check
  if (scholarship.eligibilityCriteria.exams && scholarship.eligibilityCriteria.exams.length > 0) {
    const requiredExams = scholarship.eligibilityCriteria.exams;
    const hasTakenExam = requiredExams.some(exam => {
      if (exam.includes("JEE Main") && profile.exams.jeeMainPercentile) return true;
      if (exam.includes("JEE Advanced") && profile.exams.jeeAdvancedRank) return true;
      if (exam.includes("NEET") && profile.exams.otherExams.toLowerCase().includes("neet")) return true;
      if (exam.includes("CLAT") && profile.exams.otherExams.toLowerCase().includes("clat")) return true;
      if (exam.includes("CAT") && profile.exams.catPercentile) return true;
      return false;
    });

    if (hasTakenExam) {
      reasons.push(`Matches required entrance exam (${requiredExams.join(" or ")})`);
    } else {
      isEligible = false;
      reasons.push(`Requires one of: ${requiredExams.join(", ")}`);
    }
  }

  // 3. Need-based Check (Mapped to budget)
  if (scholarship.eligibilityCriteria.maxBudget) {
    let budgetValue = 100; // default very high
    if (profile.preferences.budget.includes("Less than 5 Lakhs")) budgetValue = 4;
    else if (profile.preferences.budget.includes("5 - 10 Lakhs")) budgetValue = 8;
    else if (profile.preferences.budget.includes("10 - 20 Lakhs")) budgetValue = 15;
    
    if (budgetValue <= scholarship.eligibilityCriteria.maxBudget) {
      reasons.push(`Meets financial criteria based on selected budget`);
    } else {
      isEligible = false;
      reasons.push(`Financial criteria not met (Targeting lower income brackets)`);
    }
  }

  if (isEligible && reasons.length === 0) {
    reasons.push("Generally eligible based on your profile.");
  }

  return { isEligible, reasons };
}

export function generateCollegeAnalytics(college: College) {
  const seed = college.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const years = ["2020", "2021", "2022", "2023", "2024"];
  
  const placementTrends = years.map((year, i) => {
    // Trend up slightly, with noise
    const noise = ((seed + i) % 10 - 5) * 50000;
    const value = college.placements - (4 - i) * 150000 + noise;
    return { year, ctc: Math.max(value, 300000) };
  });

  const feeTrends = years.map((year, i) => {
    // Fee increases over time
    const noise = ((seed * i) % 5) * 10000;
    const value = college.fees - (4 - i) * 20000 + noise;
    return { year, fees: Math.max(value, 10000) };
  });

  const cutoffTrends = years.map((year, i) => {
    // Ranking/Cutoff rank
    const baseRank = college.rankings * 500; 
    const noise = ((seed + i) % 20 - 10) * 100;
    return { year, rank: Math.max(baseRank + noise, 1) };
  });

  const competitiveness = [
    { name: "Accepted", value: 10 + (seed % 20) },
    { name: "Rejected", value: 90 - (seed % 20) }
  ];

  return { placementTrends, feeTrends, cutoffTrends, competitiveness };
}
