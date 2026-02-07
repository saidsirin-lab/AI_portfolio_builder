import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf-parser";
import { processPhoto } from "@/lib/image-utils";
import { generatePortfolio } from "@/lib/claude";
import { MAX_RESUME_SIZE, MAX_PHOTO_SIZE } from "@/lib/constants";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const resume = formData.get("resume") as File | null;
    const photo = formData.get("photo") as File | null;
    const description = formData.get("description") as string;
    const industry = formData.get("industry") as string;
    const colorScheme = formData.get("colorScheme") as string;
    const fullName = formData.get("fullName") as string;

    if (!resume || !photo || !description || !industry || !colorScheme || !fullName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (resume.size > MAX_RESUME_SIZE) {
      return NextResponse.json(
        { error: "Resume file too large (max 5MB)" },
        { status: 400 }
      );
    }

    if (photo.size > MAX_PHOTO_SIZE) {
      return NextResponse.json(
        { error: "Photo file too large (max 10MB)" },
        { status: 400 }
      );
    }

    // Process PDF
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    const resumeText = await extractTextFromPDF(resumeBuffer);

    if (!resumeText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from PDF. Please ensure it's not a scanned image." },
        { status: 400 }
      );
    }

    // Process photo
    const photoBuffer = Buffer.from(await photo.arrayBuffer());
    const photoBase64 = await processPhoto(photoBuffer);

    // Generate portfolio with Claude
    const html = await generatePortfolio({
      resumeText,
      photoBase64,
      description,
      industry,
      colorScheme,
      fullName,
    });

    return NextResponse.json({ html });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate portfolio. Please try again." },
      { status: 500 }
    );
  }
}
