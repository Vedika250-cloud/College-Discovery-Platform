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

// read data.ts, extract colleges JSON
const content = fs.readFileSync('src/lib/data.ts', 'utf8');
const match = content.match(/export const colleges: College\[\] = (\[[\s\S]*?\]);/);
if (!match) {
  console.error("Could not find colleges array in data.ts");
  process.exit(1);
}

const colleges = JSON.parse(match[1]);

const coverage = {};
colleges.forEach(c => {
  if (!coverage[c.state]) coverage[c.state] = 0;
  coverage[c.state]++;
});

let missing = false;

console.log("\n--- STATE COVERAGE ---");
states.forEach(s => {
  if (!coverage[s]) {
    console.error(`❌ MISSING STATE: ${s}`);
    missing = true;
  } else {
    console.log(`✅ ${s}: ${coverage[s]} colleges`);
  }
});

console.log("\n--- UT COVERAGE ---");
uts.forEach(s => {
  if (!coverage[s]) {
    console.error(`❌ MISSING UT: ${s}`);
    missing = true;
  } else {
    console.log(`✅ ${s}: ${coverage[s]} colleges`);
  }
});

console.log(`\nTotal Colleges: ${colleges.length}`);

if (missing) {
  console.error("\nFAILED: Not all states and UTs are covered!");
  process.exit(1);
} else {
  console.log("\nSUCCESS: All 28 States and 8 UTs are covered perfectly!");
  process.exit(0);
}
