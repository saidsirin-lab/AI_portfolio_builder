import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "GitHub OAuth not configured" }, { status: 500 });
  }

  // Generate CSRF state
  const state = crypto.randomUUID();
  const cookieStore = await cookies();
  cookieStore.set("github_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10 minutes
    path: "/",
  });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    scope: "public_repo",
    state,
  });

  return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params}`);
}
