"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PreviewFrame from "@/components/PreviewFrame";
import PublishButton from "@/components/PublishButton";
import LoadingSpinner from "@/components/LoadingSpinner";

function PreviewContent() {
  const searchParams = useSearchParams();
  const [html, setHtml] = useState<string | null>(null);
  const isAuthenticated = searchParams.get("auth") === "success";

  useEffect(() => {
    const stored = sessionStorage.getItem("portfolio_html");
    if (stored) {
      setHtml(stored);
    }
  }, []);

  const handleDownload = () => {
    if (!html) return;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!html) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">No portfolio found</h2>
          <p className="mt-2 text-sm text-slate-500">Generate a portfolio first.</p>
          <Link
            href="/create"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Create Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-lg font-bold text-slate-900">
            Portfolio Builder
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Download HTML
            </button>
            <PublishButton html={html} isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Preview Your Portfolio</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review your generated portfolio below. Download it or publish directly to GitHub Pages.
          </p>
        </div>
        <PreviewFrame html={html} />
        <div className="mt-6 flex justify-center">
          <Link
            href="/create"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            &larr; Start over with a new portfolio
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading preview..." />}>
      <PreviewContent />
    </Suspense>
  );
}
