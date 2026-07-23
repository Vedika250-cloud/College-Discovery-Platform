import { PrismaClient } from "@prisma/client";
import { generateEmbedding } from "../src/lib/embeddings";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting DB seed...");

  // 1. Seed Scholarships
  const scholarshipsPath = path.join(__dirname, "../scholarships.json");
  if (fs.existsSync(scholarshipsPath)) {
    const rawData = fs.readFileSync(scholarshipsPath, "utf-8");
    const scholarships = JSON.parse(rawData);

    for (const s of scholarships) {
      // Check if exists
      const exists = await prisma.scholarship.findFirst({ where: { name: s.name } });
      if (!exists) {
        // Prepare text for embedding
        const textToEmbed = `Scholarship: ${s.name}. Provider: ${s.provider}. State: ${s.state}. Category: ${s.category}. Amount: ${s.amount}. Eligibility: ${s.eligibility}. Academic Requirements: ${s.academic_requirements}.`;
        
        console.log(`Generating embedding for scholarship: ${s.name}`);
        const embedding = await generateEmbedding(textToEmbed);

        // Insert using queryRaw to handle vector column properly
        // Note: Prisma 5.20+ supports Typed Vectors but we fall back to RAW for maximum compatibility
        await prisma.$executeRaw`
          INSERT INTO "Scholarship" (
            id, name, state, provider, amount, eligibility, income_limit, 
            category, gender, minority_status, disability_eligibility, 
            academic_requirements, minimum_marks, application_dates, 
            official_website, status, "updatedAt"
          ) VALUES (
            gen_random_uuid(), ${s.name}, ${s.state}, ${s.provider}, ${s.amount}, 
            ${s.eligibility}, ${s.income_limit}, ${s.category}, ${s.gender}, 
            ${s.minority_status}, ${s.disability_eligibility}, ${s.academic_requirements}, 
            ${s.minimum_marks}, ${s.application_dates}, ${s.official_website}, 
            ${s.status}, NOW()
          )
        `;
        
        // Update the embedding separately
        const vectorStr = `[${embedding.join(",")}]`;
        await prisma.$executeRaw`
          UPDATE "Scholarship"
          SET embedding = ${vectorStr}::vector
          WHERE name = ${s.name}
        `;
        console.log(`Inserted scholarship: ${s.name}`);
      } else {
        console.log(`Scholarship already exists: ${s.name}`);
      }
    }
  }

  // 2. Seed Colleges
  const collegesPath = path.join(__dirname, "../public/data/colleges.json");
  if (fs.existsSync(collegesPath)) {
    const rawData = fs.readFileSync(collegesPath, "utf-8");
    const colleges = JSON.parse(rawData);

    for (const c of colleges) {
      const exists = await prisma.college.findUnique({ where: { slug: c.id } });
      if (!exists) {
        const textToEmbed = `College: ${c.name}. Location: ${c.city}, ${c.state}. Type: ${c.ownership}. Courses: ${c.courses.join(", ")}. Average Fees: ${c.fees}. Placements: ${c.placements}.`;
        
        console.log(`Generating embedding for college: ${c.name}`);
        const embedding = await generateEmbedding(textToEmbed);
        
        await prisma.$executeRaw`
          INSERT INTO "College" (
            id, name, slug, location, state, city, ownership, fees, placements, "updatedAt"
          ) VALUES (
            gen_random_uuid(), ${c.name}, ${c.id}, ${c.location || ""}, ${c.state}, 
            ${c.city}, ${c.ownership}, ${c.fees}, ${c.placements}, NOW()
          )
        `;

        const vectorStr = `[${embedding.join(",")}]`;
        await prisma.$executeRaw`
          UPDATE "College"
          SET embedding = ${vectorStr}::vector
          WHERE slug = ${c.id}
        `;
        console.log(`Inserted college: ${c.name}`);
      } else {
        console.log(`College already exists: ${c.name}`);
      }
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
