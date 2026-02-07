import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            AI-Powered Portfolio Builder
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Your professional portfolio,{" "}
            <span className="text-indigo-600">in under 2 minutes</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Upload your resume and photo. Our AI crafts a polished, responsive
            portfolio website — and publishes it to GitHub Pages with one click.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/create"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
            >
              Get Started
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900"
            >
              How it works &darr;
            </a>
          </div>
        </div>
      </main>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-slate-200 bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            Three simple steps
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Upload",
                desc: "Add your resume PDF, profile photo, and a brief description about yourself.",
              },
              {
                step: "2",
                title: "Generate",
                desc: "Our AI analyzes your resume and creates a beautiful, responsive portfolio site.",
              },
              {
                step: "3",
                title: "Publish",
                desc: "Preview your site and publish it to GitHub Pages with a single click.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
        Built with Claude AI &middot; Portfolio Builder
      </footer>
    </div>
  );
}
