"use client";

export default function LoadingSpinner({ message = "Generating your portfolio..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600"></div>
      </div>
      <p className="text-sm text-slate-600">{message}</p>
    </div>
  );
}
