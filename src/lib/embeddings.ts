import { GoogleGenAI } from "@google/genai";
import { generateText, embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

/**
 * We use the standard Vercel AI SDK to abstract over models.
 * If you want to swap to OpenAI, you can import { openai } from "@ai-sdk/openai"
 * and conditionally use it based on process.env.AI_PROVIDER
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const provider = process.env.AI_PROVIDER || "google";
  
  if (provider === "google") {
    const { embedding } = await embed({
      model: google.textEmbeddingModel("text-embedding-004"),
      value: text.replace(/\n/g, " "),
    });
    return embedding;
  }
  
  // Fallback for openai
  // const { openai } = await import("@ai-sdk/openai");
  // const { embedding } = await embed({
  //   model: openai.embedding("text-embedding-3-small"),
  //   value: text.replace(/\n/g, " ")
  // });
  // return embedding;
  
  throw new Error(`Unsupported AI Provider: ${provider}`);
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const provider = process.env.AI_PROVIDER || "google";
  
  if (provider === "google") {
    const { embeddings } = await embedMany({
      model: google.textEmbeddingModel("text-embedding-004"),
      values: texts.map(t => t.replace(/\n/g, " ")),
    });
    return embeddings;
  }
  
  throw new Error(`Unsupported AI Provider: ${provider}`);
}
