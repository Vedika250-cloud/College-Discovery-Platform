import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";
import { generateEmbedding } from "../../../../lib/embeddings";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (query) {
      // Vector search if query exists
      const embedding = await generateEmbedding(query);
      const vectorStr = `[${embedding.join(",")}]`;

      const results = await prisma.$queryRaw`
        SELECT id, name, provider, amount, state, status, eligibility
        FROM "Scholarship"
        ORDER BY embedding <=> ${vectorStr}::vector
        LIMIT 20;
      `;
      return NextResponse.json(results);
    }

    // Standard list
    const scholarships = await prisma.scholarship.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(scholarships);
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    return NextResponse.json({ error: "Failed to fetch scholarships" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create text for embedding
    const textToEmbed = `Scholarship: ${data.name}. Provider: ${data.provider}. State: ${data.state}. Category: ${data.category}. Amount: ${data.amount}. Eligibility: ${data.eligibility}. Academic Requirements: ${data.academic_requirements}.`;
    const embedding = await generateEmbedding(textToEmbed);

    // Using queryRaw for insertion to handle the vector column properly
    const results = await prisma.$queryRaw`
      INSERT INTO "Scholarship" (
        id, name, state, provider, amount, eligibility, income_limit, 
        category, gender, minority_status, disability_eligibility, 
        academic_requirements, minimum_marks, application_dates, 
        official_website, status, "updatedAt"
      ) VALUES (
        gen_random_uuid(), ${data.name}, ${data.state}, ${data.provider}, ${data.amount}, 
        ${data.eligibility}, ${data.income_limit}, ${data.category}, ${data.gender}, 
        ${data.minority_status}, ${data.disability_eligibility}, ${data.academic_requirements}, 
        ${data.minimum_marks}, ${data.application_dates}, ${data.official_website}, 
        ${data.status}, NOW()
      ) RETURNING id, name;
    `;
    
    const newId = (results as any[])[0]?.id;

    // Update the vector
    const vectorStr = `[${embedding.join(",")}]`;
    await prisma.$executeRaw`
      UPDATE "Scholarship"
      SET embedding = ${vectorStr}::vector
      WHERE id = ${newId}
    `;

    return NextResponse.json({ success: true, id: newId }, { status: 201 });
  } catch (error) {
    console.error("Error creating scholarship:", error);
    return NextResponse.json({ error: "Failed to create scholarship" }, { status: 500 });
  }
}
