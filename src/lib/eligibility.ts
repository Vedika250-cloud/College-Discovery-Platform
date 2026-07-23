export interface UserProfile {
  age?: number;
  gender?: string;
  state?: string;
  category?: string;       // e.g. "General", "SC", "ST", "OBC"
  minorityStatus?: boolean;
  disabilityStatus?: boolean;
  annualFamilyIncome?: number;
  marks12th?: number;
  marksGraduation?: number;
  courseLevel?: string;    // e.g. "UG", "PG"
}

export interface EligibilityResult {
  status: "Eligible" | "Maybe Eligible" | "Not Eligible";
  reasons: string[];
}

export function evaluateScholarship(profile: UserProfile, scholarship: any): EligibilityResult {
  const reasons: string[] = [];
  let isEligible = true;
  let isMaybe = false;

  // 1. Check State
  if (scholarship.state && scholarship.state !== "All India" && profile.state) {
    if (scholarship.state.toLowerCase() !== profile.state.toLowerCase()) {
      reasons.push(`Restricted to students from ${scholarship.state}. You are from ${profile.state}.`);
      isEligible = false;
    }
  }

  // 2. Check Income Limit
  if (scholarship.income_limit && profile.annualFamilyIncome !== undefined) {
    if (profile.annualFamilyIncome > scholarship.income_limit) {
      reasons.push(`Family income limit is ₹${scholarship.income_limit}. Your income is ₹${profile.annualFamilyIncome}.`);
      isEligible = false;
    } else {
      reasons.push(`Income criterion met (Limit: ₹${scholarship.income_limit}).`);
    }
  }

  // 3. Check Gender
  if (scholarship.gender && scholarship.gender !== "Any" && profile.gender) {
    if (scholarship.gender.toLowerCase() !== profile.gender.toLowerCase()) {
      reasons.push(`Scholarship is restricted to ${scholarship.gender} students.`);
      isEligible = false;
    }
  }

  // 4. Check Marks
  if (scholarship.minimum_marks && profile.marks12th !== undefined) {
    if (profile.marks12th < scholarship.minimum_marks) {
      reasons.push(`Requires minimum ${scholarship.minimum_marks}% marks. You have ${profile.marks12th}%.`);
      isEligible = false;
    } else {
      reasons.push(`Academic criterion met (Requires ${scholarship.minimum_marks}%+).`);
    }
  }

  // 5. Category (SC/ST/OBC)
  if (scholarship.reserved_category && scholarship.reserved_category.length > 0 && profile.category) {
    if (!scholarship.reserved_category.includes(profile.category)) {
      reasons.push(`Restricted to categories: ${scholarship.reserved_category.join(", ")}.`);
      isEligible = false;
    }
  }

  // 6. Minority Status
  if (scholarship.minority_status && profile.minorityStatus !== undefined) {
    if (scholarship.minority_status && !profile.minorityStatus) {
      reasons.push(`Restricted to minority communities.`);
      isEligible = false;
    }
  }

  // Missing data leads to "Maybe Eligible"
  if (isEligible) {
    if (scholarship.income_limit && profile.annualFamilyIncome === undefined) {
      reasons.push(`Income criteria not checked (please provide family income).`);
      isMaybe = true;
    }
    if (scholarship.minimum_marks && profile.marks12th === undefined) {
      reasons.push(`Academic criteria not checked (please provide 12th marks).`);
      isMaybe = true;
    }
  }

  let status: "Eligible" | "Maybe Eligible" | "Not Eligible" = "Eligible";
  if (!isEligible) status = "Not Eligible";
  else if (isMaybe) status = "Maybe Eligible";
  else if (reasons.length === 0) {
    reasons.push("You meet all standard criteria for this scholarship based on your profile.");
  }

  return { status, reasons };
}
