"use client";

import { PortfolioFormData } from "@/types";
import { INDUSTRIES, COLOR_SCHEMES } from "@/lib/constants";

interface Props {
  data: PortfolioFormData;
  onChange: (data: Partial<PortfolioFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function FormStepIndustry({ data, onChange, onBack, onSubmit, isLoading }: Props) {
  const canSubmit = data.industry && data.colorScheme;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Style Preferences</h2>
        <p className="mt-1 text-sm text-slate-500">Choose your industry and color scheme.</p>
      </div>

      {/* Industry Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Industry</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {INDUSTRIES.map((industry) => (
            <button
              key={industry.id}
              onClick={() => onChange({ industry: industry.id })}
              className={`rounded-lg border-2 px-4 py-3 text-left transition-all ${
                data.industry === industry.id
                  ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="block text-sm font-medium text-slate-900">{industry.name}</span>
              <span className="block text-xs text-slate-500">{industry.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Scheme Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Color Scheme</label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {COLOR_SCHEMES.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => onChange({ colorScheme: scheme.id })}
              className={`flex items-center gap-3 rounded-lg border-2 px-3 py-3 text-left transition-all ${
                data.colorScheme === scheme.id
                  ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex gap-1">
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: scheme.primary }} />
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: scheme.accent }} />
              </div>
              <span className="text-sm font-medium text-slate-900">{scheme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit || isLoading}
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate Portfolio"}
        </button>
      </div>
    </div>
  );
}
