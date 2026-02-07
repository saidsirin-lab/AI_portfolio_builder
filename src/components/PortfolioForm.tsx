"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PortfolioFormData } from "@/types";
import FormStepPersonal from "./FormStepPersonal";
import FormStepIndustry from "./FormStepIndustry";
import LoadingSpinner from "./LoadingSpinner";

export default function PortfolioForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<PortfolioFormData>({
    resume: null,
    photo: null,
    description: "",
    industry: "",
    colorScheme: "",
    fullName: "",
  });

  const updateFormData = (partial: Partial<PortfolioFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const handleSubmit = async () => {
    if (!formData.resume || !formData.photo) return;

    setIsLoading(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("resume", formData.resume);
      body.append("photo", formData.photo);
      body.append("description", formData.description);
      body.append("industry", formData.industry);
      body.append("colorScheme", formData.colorScheme);
      body.append("fullName", formData.fullName);

      const response = await fetch("/api/generate", {
        method: "POST",
        body,
      });

      const text = await response.text();

      if (!response.ok) {
        let message = "Generation failed";
        try {
          const data = JSON.parse(text);
          message = data.error || message;
        } catch {
          // response wasn't JSON
        }
        throw new Error(message);
      }

      if (!text) {
        throw new Error("Empty response from server. Please try again.");
      }

      const { html } = JSON.parse(text);

      // Store generated HTML in sessionStorage for the preview page
      sessionStorage.setItem("portfolio_html", html);
      router.push("/preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-xl">
        <LoadingSpinner message="Crafting your portfolio... This usually takes 30-60 seconds." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${step >= 1 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
          1
        </div>
        <div className={`h-0.5 w-12 ${step >= 2 ? "bg-indigo-600" : "bg-slate-200"}`} />
        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${step >= 2 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
          2
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {step === 1 && (
        <FormStepPersonal
          data={formData}
          onChange={updateFormData}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <FormStepIndustry
          data={formData}
          onChange={updateFormData}
          onBack={() => setStep(1)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
