import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { retrieveContext } from "../../../lib/rag";
// import { openai } from "@ai-sdk/openai"; // Uncomment for OpenAI

export const maxDuration = 60; // Allow up to 60 seconds for response

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the latest user message
    const latestMessage = messages[messages.length - 1];
    const userQuery = latestMessage.content;

    // Retrieve context using pgvector
    const context = await retrieveContext(userQuery);

    // Build the Context String
    let contextStr = "### RETRIEVED CONTEXT FROM DATABASE ###\n\n";

    if (context.colleges.length > 0) {
      contextStr += "COLLEGES:\n";
      context.colleges.forEach((c: any) => {
        contextStr += `- ${c.name} (${c.location}, ${c.state}). Courses: ${c.courses?.join(", ") || "N/A"}. Fees: ${c.fees ? "₹" + c.fees : "N/A"}. Placements: ${c.placements ? "₹" + c.placements : "N/A"}.\n`;
      });
      contextStr += "\n";
    }

    if (context.scholarships.length > 0) {
      contextStr += "SCHOLARSHIPS:\n";
      context.scholarships.forEach((s: any) => {
        contextStr += `- ${s.name} (Provider: ${s.provider}, State: ${s.state || "All India"}). Amount: ${s.amount || "N/A"}. Eligibility: ${s.eligibility || "N/A"}. Income Limit: ${s.income_limit ? "₹" + s.income_limit : "N/A"}.\n`;
      });
      contextStr += "\n";
    }

    if (context.docs.length > 0) {
      contextStr += "GENERAL KNOWLEDGE:\n";
      context.docs.forEach((d: any) => {
        contextStr += `- ${d.title}: ${d.content}\n`;
      });
      contextStr += "\n";
    }

    const systemPrompt = `You are EduGuide AI, an intelligent Education Assistant built for a College Discovery Platform.
Your goal is to answer questions about colleges, admissions, fees, placements, and scholarships in India.

CRITICAL RULES:
1. Answer ONLY using the supplied database context below.
2. NEVER hallucinate information or guess college details. 
3. If information isn't available in the context, clearly state: "I don't have verified information for this. Please refer to the official college website."
4. When answering scholarship questions, try to explain eligibility, amount, and application period.
5. When comparing colleges, format the comparison using Markdown tables.
6. Always be concise, factual, and helpful.

${contextStr}
`;

    // Swap provider based on env
    const providerStr = process.env.AI_PROVIDER || "google";
    let model;
    
    if (providerStr === "google") {
      model = google("gemini-2.5-flash");
    } else {
      // Fallback
      // model = openai("gpt-4o-mini");
      throw new Error("Only google is configured right now. Provide GEMINI_API_KEY.");
    }

    // Call the LLM with streaming
    const result = streamText({
      model: model,
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in AI Chat:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
