"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  html: string;
  isAuthenticated: boolean;
}

export default function PublishButton({ html, isAuthenticated }: Props) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePublish = async () => {
    if (!isAuthenticated) {
      // Save HTML before redirecting to OAuth
      sessionStorage.setItem("portfolio_html", html);
      window.location.href = "/api/auth/github";
      return;
    }

    setIsPublishing(true);
    setError(null);

    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Publishing failed");
      }

      const { pagesUrl, repoUrl } = await response.json();

      // Store URLs for success page
      sessionStorage.setItem("portfolio_pages_url", pagesUrl);
      sessionStorage.setItem("portfolio_repo_url", repoUrl);

      router.push("/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePublish}
        disabled={isPublishing}
        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 disabled:opacity-50"
      >
        {isPublishing ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Publishing...
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {isAuthenticated ? "Publish to GitHub Pages" : "Sign in with GitHub & Publish"}
          </>
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
