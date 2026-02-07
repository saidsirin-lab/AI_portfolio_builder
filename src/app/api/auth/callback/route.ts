import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSession } from "@/lib/session";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("github_oauth_state")?.value;

  // Verify CSRF state
  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/preview?error=invalid_state`
    );
  }

  // Clean up state cookie
  cookieStore.delete("github_oauth_state");

  if (!code) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/preview?error=no_code`
    );
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/preview?error=token_exchange_failed`
      );
    }

    // Fetch GitHub username
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    // Store in encrypted session
    await createSession({
      githubToken: tokenData.access_token,
      githubUsername: userData.login,
    });

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/preview?auth=success`
    );
  } catch {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/preview?error=auth_failed`
    );
  }
}
