import prisma from "./db";
import { generateEmbedding } from "./embeddings";

export async function searchScholarships(query: string, limit = 5) {
  const embedding = await generateEmbedding(query);
  const vectorStr = `[${embedding.join(",")}]`;

  try {
    const results = await prisma.$queryRaw`
      SELECT id, name, provider, amount, eligibility, income_limit, state
      FROM "Scholarship"
      ORDER BY embedding <=> ${vectorStr}::vector
      LIMIT ${limit};
    `;
    return results;
  } catch (error) {
    console.error("Error searching scholarships:", error);
    return [];
  }
}

export async function searchColleges(query: string, limit = 5) {
  const embedding = await generateEmbedding(query);
  const vectorStr = `[${embedding.join(",")}]`;

  try {
    const results = await prisma.$queryRaw`
      SELECT id, name, location, state, courses, fees, placements
      FROM "College"
      ORDER BY embedding <=> ${vectorStr}::vector
      LIMIT ${limit};
    `;
    return results;
  } catch (error) {
    console.error("Error searching colleges:", error);
    return [];
  }
}

export async function searchKnowledgeDocuments(query: string, limit = 3) {
  const embedding = await generateEmbedding(query);
  const vectorStr = `[${embedding.join(",")}]`;

  try {
    const results = await prisma.$queryRaw`
      SELECT id, title, content, category
      FROM "KnowledgeDocument"
      ORDER BY embedding <=> ${vectorStr}::vector
      LIMIT ${limit};
    `;
    return results;
  } catch (error) {
    console.error("Error searching knowledge docs:", error);
    return [];
  }
}

/**
 * Main RAG function: Retrieves context from all tables based on a query.
 */
export async function retrieveContext(query: string) {
  const [scholarships, colleges, docs] = await Promise.all([
    searchScholarships(query, 3),
    searchColleges(query, 3),
    searchKnowledgeDocuments(query, 2),
  ]);

  return { scholarships, colleges, docs };
}
