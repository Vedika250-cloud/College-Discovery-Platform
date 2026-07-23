import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";
import { evaluateScholarship, UserProfile } from "../../../../lib/eligibility";

export async function POST(req: Request) {
  try {
    const profile: UserProfile = await req.json();

    // Fetch all open scholarships
    const allScholarships = await prisma.scholarship.findMany({
      where: { status: "Open" }
    });

    const results = allScholarships.map(s => {
      const evaluation = evaluateScholarship(profile, s);
      return {
        scholarship: s,
        status: evaluation.status,
        reasons: evaluation.reasons
      };
    });

    return NextResponse.json({
      eligible: results.filter(r => r.status === "Eligible"),
      maybe: results.filter(r => r.status === "Maybe Eligible"),
      notEligible: results.filter(r => r.status === "Not Eligible")
    });
  } catch (error) {
    console.error("Error evaluating eligibility:", error);
    return NextResponse.json({ error: "Failed to evaluate eligibility" }, { status: 500 });
  }
}
