"use client";

interface Props {
  html: string;
}

export default function PreviewFrame({ html }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4 py-2">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-slate-400">Portfolio Preview</span>
      </div>
      <iframe
        srcDoc={html}
        className="h-[600px] w-full"
        sandbox="allow-scripts"
        title="Portfolio Preview"
      />
    </div>
  );
}
