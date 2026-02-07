import PortfolioForm from "@/components/PortfolioForm";
import Link from "next/link";

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="text-lg font-bold text-slate-900">
            Portfolio Builder
          </Link>
          <span className="text-sm text-slate-500">Step 1 of 2</span>
        </div>
      </header>

      <main className="px-4 py-12">
        <PortfolioForm />
      </main>
    </div>
  );
}
