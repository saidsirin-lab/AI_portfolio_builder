import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { publishToGitHub } from "@/lib/github";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated. Please sign in with GitHub first." },
        { status: 401 }
      );
    }

    const { html } = await request.json();

    if (!html) {
      return NextResponse.json(
        { error: "No HTML content provided" },
        { status: 400 }
      );
    }

    const result = await publishToGitHub({
      token: session.githubToken,
      username: session.githubUsername,
      html,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Publish error:", error);
    return NextResponse.json(
      { error: "Failed to publish. Please try again." },
      { status: 500 }
    );
  }
}
