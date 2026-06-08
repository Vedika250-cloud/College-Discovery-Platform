export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: "Government" | "Private";
  type: "Merit based" | "Need based" | "Both";
  amount: string;
  deadline: string;
  eligibilityCriteria: {
    min12thPercentage?: number;
    maxBudget?: number;
    exams?: string[];
  };
  applyLink: string;
  description: string;
}

export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  state: string;
  city: string;
  ownership: "Public" | "Private";
  establishedYear: number;
  courses: string[];
  fees: number;
  placements: number;
  highestPackage: number;
  rankings: number;
  rating: number;
  description: string;
  hostelAvailability: boolean;
  website: string;
  logo: string;
  gallery: string[];
  reviews: Review[];
}

import collegesData from './colleges.json';
import scholarshipsData from './scholarships.json';

export const colleges: College[] = collegesData as College[];
export const scholarships: Scholarship[] = scholarshipsData as Scholarship[];
