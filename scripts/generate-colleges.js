/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const uts = [
  "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const allRegions = [...states, ...uts];

const realColleges = [
  { name: "Indian Institute of Technology Bombay", state: "Maharashtra", city: "Mumbai", ownership: "Public" },
  { name: "Indian Institute of Technology Delhi", state: "Delhi", city: "New Delhi", ownership: "Public" },
  { name: "Indian Institute of Technology Madras", state: "Tamil Nadu", city: "Chennai", ownership: "Public" },
  { name: "Indian Institute of Technology Kanpur", state: "Uttar Pradesh", city: "Kanpur", ownership: "Public" },
  { name: "Indian Institute of Technology Kharagpur", state: "West Bengal", city: "Kharagpur", ownership: "Public" },
  { name: "Indian Institute of Technology Roorkee", state: "Uttarakhand", city: "Roorkee", ownership: "Public" },
  { name: "Indian Institute of Technology Guwahati", state: "Assam", city: "Guwahati", ownership: "Public" },
  { name: "National Institute of Technology Trichy", state: "Tamil Nadu", city: "Tiruchirappalli", ownership: "Public" },
  { name: "National Institute of Technology Surathkal", state: "Karnataka", city: "Mangalore", ownership: "Public" },
  { name: "National Institute of Technology Warangal", state: "Telangana", city: "Warangal", ownership: "Public" },
  { name: "Vellore Institute of Technology", state: "Tamil Nadu", city: "Vellore", ownership: "Private" },
  { name: "SRM Institute of Science and Technology", state: "Tamil Nadu", city: "Chennai", ownership: "Private" },
  { name: "Manipal Institute of Technology", state: "Karnataka", city: "Manipal", ownership: "Private" },
  { name: "Amity University", state: "Uttar Pradesh", city: "Noida", ownership: "Private" },
  { name: "Thapar Institute of Engineering and Technology", state: "Punjab", city: "Patiala", ownership: "Private" },
  { name: "Birla Institute of Technology and Science", state: "Rajasthan", city: "Pilani", ownership: "Private" },
  { name: "Bennett University", state: "Uttar Pradesh", city: "Greater Noida", ownership: "Private" },
  { name: "Shiv Nadar University", state: "Uttar Pradesh", city: "Greater Noida", ownership: "Private" },
  { name: "Kalinga Institute of Industrial Technology", state: "Odisha", city: "Bhubaneswar", ownership: "Private" },
  { name: "University of Petroleum and Energy Studies", state: "Uttarakhand", city: "Dehradun", ownership: "Private" },
  { name: "Chandigarh University", state: "Punjab", city: "Mohali", ownership: "Private" }, // Often classified in Punjab
  { name: "Lovely Professional University", state: "Punjab", city: "Phagwara", ownership: "Private" },
  { name: "Jadavpur University", state: "West Bengal", city: "Kolkata", ownership: "Public" },
  { name: "Delhi Technological University", state: "Delhi", city: "New Delhi", ownership: "Public" },
  { name: "College of Engineering Pune", state: "Maharashtra", city: "Pune", ownership: "Public" },
  { name: "Institute of Chemical Technology", state: "Maharashtra", city: "Mumbai", ownership: "Public" },
  { name: "National Institute of Design", state: "Gujarat", city: "Ahmedabad", ownership: "Public" },
  { name: "Indian Institute of Management Ahmedabad", state: "Gujarat", city: "Ahmedabad", ownership: "Public" },
  { name: "Indian Institute of Management Bangalore", state: "Karnataka", city: "Bangalore", ownership: "Public" },
  { name: "Indian Institute of Management Calcutta", state: "West Bengal", city: "Kolkata", ownership: "Public" },
  { name: "All India Institute of Medical Sciences", state: "Delhi", city: "New Delhi", ownership: "Public" },
  { name: "Christian Medical College", state: "Tamil Nadu", city: "Vellore", ownership: "Private" },
  { name: "National Law School of India University", state: "Karnataka", city: "Bangalore", ownership: "Public" },
  { name: "Pondicherry Engineering College", state: "Puducherry", city: "Puducherry", ownership: "Public" },
  { name: "Jawaharlal Institute of Postgraduate Medical Education and Research", state: "Puducherry", city: "Puducherry", ownership: "Public" },
  { name: "National Institute of Technology Srinagar", state: "Jammu and Kashmir", city: "Srinagar", ownership: "Public" },
  { name: "University of Ladakh", state: "Ladakh", city: "Leh", ownership: "Public" },
  { name: "Dr. B. R. Ambedkar Institute of Technology", state: "Andaman and Nicobar Islands", city: "Port Blair", ownership: "Public" },
  { name: "Andaman and Nicobar Islands Institute of Medical Sciences", state: "Andaman and Nicobar Islands", city: "Port Blair", ownership: "Public" },
  { name: "Government Engineering College Daman", state: "Dadra and Nagar Haveli and Daman and Diu", city: "Daman", ownership: "Public" },
  { name: "Punjab Engineering College", state: "Chandigarh", city: "Chandigarh", ownership: "Public" },
  { name: "Lakshadweep Government Polytechnic", state: "Lakshadweep", city: "Kavaratti", ownership: "Public" },
  { name: "Sikkim Manipal University", state: "Sikkim", city: "Gangtok", ownership: "Private" },
  { name: "National Institute of Technology Agartala", state: "Tripura", city: "Agartala", ownership: "Public" },
  { name: "National Institute of Technology Meghalaya", state: "Meghalaya", city: "Shillong", ownership: "Public" },
  { name: "National Institute of Technology Mizoram", state: "Mizoram", city: "Aizawl", ownership: "Public" },
  { name: "National Institute of Technology Nagaland", state: "Nagaland", city: "Dimapur", ownership: "Public" },
  { name: "National Institute of Technology Manipur", state: "Manipur", city: "Imphal", ownership: "Public" },
  { name: "National Institute of Technology Arunachal Pradesh", state: "Arunachal Pradesh", city: "Yupia", ownership: "Public" },
  { name: "National Institute of Technology Goa", state: "Goa", city: "Ponda", ownership: "Public" },
  { name: "Goa Institute of Management", state: "Goa", city: "Sanquelim", ownership: "Private" },
  { name: "Indian Institute of Technology Bhilai", state: "Chhattisgarh", city: "Bhilai", ownership: "Public" },
  { name: "National Institute of Technology Raipur", state: "Chhattisgarh", city: "Raipur", ownership: "Public" },
  { name: "Indian Institute of Technology Patna", state: "Bihar", city: "Patna", ownership: "Public" },
  { name: "National Institute of Technology Patna", state: "Bihar", city: "Patna", ownership: "Public" },
  { name: "Indian Institute of Technology (ISM) Dhanbad", state: "Jharkhand", city: "Dhanbad", ownership: "Public" },
  { name: "Birla Institute of Technology Mesra", state: "Jharkhand", city: "Ranchi", ownership: "Private" },
  { name: "National Institute of Technology Kurukshetra", state: "Haryana", city: "Kurukshetra", ownership: "Public" },
  { name: "Ashoka University", state: "Haryana", city: "Sonipat", ownership: "Private" },
  { name: "Indian Institute of Technology Mandi", state: "Himachal Pradesh", city: "Mandi", ownership: "Public" },
  { name: "National Institute of Technology Hamirpur", state: "Himachal Pradesh", city: "Hamirpur", ownership: "Public" },
  { name: "National Institute of Technology Calicut", state: "Kerala", city: "Kozhikode", ownership: "Public" },
  { name: "Indian Institute of Space Science and Technology", state: "Kerala", city: "Thiruvananthapuram", ownership: "Public" },
  { name: "Indian Institute of Technology Indore", state: "Madhya Pradesh", city: "Indore", ownership: "Public" },
  { name: "Maulana Azad National Institute of Technology", state: "Madhya Pradesh", city: "Bhopal", ownership: "Public" },
  { name: "Andhra University", state: "Andhra Pradesh", city: "Visakhapatnam", ownership: "Public" },
  { name: "Indian Institute of Technology Tirupati", state: "Andhra Pradesh", city: "Tirupati", ownership: "Public" }
];

const coursePools = {
  Engineering: ["Computer Science and Engineering", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Electronics and Communication", "Information Technology", "Artificial Intelligence & Data Science", "Aerospace Engineering", "Chemical Engineering"],
  Medical: ["MBBS", "BDS", "B.Sc Nursing", "B.Pharm", "M.Pharm"],
  MBA: ["MBA Marketing", "MBA Finance", "MBA Human Resources", "PGDM", "MBA Operations"],
  Design: ["B.Des Industrial Design", "B.Des Fashion Design", "M.Des Interaction Design"],
  Law: ["BA LLB", "BBA LLB", "LLM"]
};

// Add procedural colleges to ensure at least 250 colleges (about 6-7 per state/UT)
let colleges = [];
let idCounter = 1;

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const images = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=800"
];

function generateCollege(base) {
  const isEngineering = base.name.includes("Technology") || base.name.includes("Engineering") || base.name.includes("IIT") || base.name.includes("NIT");
  const isMedical = base.name.includes("Medical") || base.name.includes("AIIMS");
  const isMBA = base.name.includes("Management") || base.name.includes("IIM");
  const isLaw = base.name.includes("Law") || base.name.includes("NLSIU");
  const isDesign = base.name.includes("Design");

  let type = "Engineering";
  if (isMedical) type = "Medical";
  else if (isMBA) type = "MBA";
  else if (isLaw) type = "Law";
  else if (isDesign) type = "Design";

  // If generic university, mix courses
  const isGeneric = !isEngineering && !isMedical && !isMBA && !isLaw && !isDesign;
  
  let courses = [];
  if (isGeneric) {
    courses = [
      ...coursePools.Engineering.slice(0, 3),
      ...coursePools.MBA.slice(0, 2),
      ...coursePools.Law.slice(0, 1)
    ];
  } else {
    courses = [...coursePools[type]];
    // randomly remove some to add variety
    courses = courses.sort(() => 0.5 - Math.random()).slice(0, getRandomInt(3, courses.length));
  }

  // Generate realistic stats based on ownership and type
  const isPublic = base.ownership === "Public";
  let fees, placements, highestPackage, rankings, rating;

  if (isPublic) {
    fees = getRandomInt(40000, 250000);
  } else {
    fees = getRandomInt(150000, 800000);
  }

  if (type === "Medical") {
    fees = isPublic ? getRandomInt(10000, 100000) : getRandomInt(1000000, 2500000);
  }

  // Elite institutions stats (IITs, IIMs, AIIMS, BITS, etc.)
  const isElite = base.name.includes("IIT") || base.name.includes("IIM") || base.name.includes("NIT") || base.name.includes("BITS") || base.name.includes("AIIMS") || base.name.includes("NLSIU");
  
  if (isElite) {
    placements = getRandomInt(1200000, 2500000);
    highestPackage = getRandomInt(5000000, 15000000);
    rankings = getRandomInt(1, 40);
    rating = (Math.random() * (5.0 - 4.5) + 4.5);
  } else {
    placements = getRandomInt(300000, 800000);
    highestPackage = getRandomInt(1000000, 4000000);
    rankings = getRandomInt(41, 300);
    rating = (Math.random() * (4.5 - 3.0) + 3.0);
  }

  return {
    id: String(idCounter++),
    name: base.name,
    slug: generateSlug(base.name),
    location: `${base.city}, ${base.state}`,
    state: base.state,
    city: base.city,
    ownership: base.ownership,
    establishedYear: getRandomInt(1950, 2015),
    courses,
    fees,
    placements,
    highestPackage,
    rankings,
    rating: parseFloat(rating.toFixed(1)),
    description: `${base.name} is a premier ${base.ownership.toLowerCase()} institution located in ${base.city}, ${base.state}. It offers state-of-the-art facilities and excellent academic programs.`,
    hostelAvailability: Math.random() > 0.1,
    website: `https://www.${generateSlug(base.name).replace(/-/g, '')}.edu.in`,
    logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(base.name)}&background=random&color=fff&size=128`,
    gallery: [
      getRandomItem(images),
      getRandomItem(images)
    ],
    reviews: [
      {
        user: "Student A",
        rating: Math.min(5, parseFloat((rating + (Math.random() * 0.5)).toFixed(1))),
        comment: "Great faculty and campus life."
      },
      {
        user: "Student B",
        rating: Math.max(1, parseFloat((rating - (Math.random() * 0.5)).toFixed(1))),
        comment: "Good infrastructure but curriculum is rigorous."
      }
    ]
  };
}

// 1. Add all real colleges
realColleges.forEach(c => {
  colleges.push(generateCollege(c));
});

// 2. Procedurally generate enough colleges to ensure 250 total, distributing across all regions
const numToGenerate = 250 - colleges.length;
const types = ["Engineering", "Medical", "Management", "Law", "Design", "University"];

for (let i = 0; i < numToGenerate; i++) {
  // Cycle through regions to ensure even distribution
  const region = allRegions[i % allRegions.length];
  const type = getRandomItem(types);
  const isGovt = Math.random() > 0.5;
  
  let name = "";
  if (type === "University") {
    name = isGovt ? `${region} Central University` : `${region} Global University`;
  } else {
    name = isGovt ? `Government College of ${type} ${region}` : `${region} Institute of ${type} Sciences`;
  }
  
  // ensure unique name
  name = `${name} - Campus ${Math.floor(i/allRegions.length) + 1}`;

  colleges.push(generateCollege({
    name,
    state: region,
    city: `${region} City`,
    ownership: isGovt ? "Public" : "Private"
  }));
}

// Write to files
const fsOutput = `
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

export const colleges: College[] = ${JSON.stringify(colleges, null, 2)};

${fs.readFileSync('scholarships.txt', 'utf8')}
`;

fs.writeFileSync('src/lib/data.ts', fsOutput);
console.log(`Successfully generated ${colleges.length} colleges across ${allRegions.length} states/UTs.`);
