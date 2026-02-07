"use client";

import { PortfolioFormData } from "@/types";
import { MAX_RESUME_SIZE, MAX_PHOTO_SIZE } from "@/lib/constants";

interface Props {
  data: PortfolioFormData;
  onChange: (data: Partial<PortfolioFormData>) => void;
  onNext: () => void;
}

export default function FormStepPersonal({ data, onChange, onNext }: Props) {
  const canProceed = data.fullName && data.resume && data.photo && data.description.trim().length >= 10;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
        <p className="mt-1 text-sm text-slate-500">Tell us about yourself and upload your documents.</p>
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={data.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          placeholder="John Doe"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Resume Upload */}
      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-slate-700">
          Resume (PDF)
        </label>
        <div className="mt-1">
          <label
            htmlFor="resume"
            className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 py-8 transition-colors hover:border-indigo-400"
          >
            <div className="text-center">
              <svg className="mx-auto h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              {data.resume ? (
                <p className="mt-2 text-sm font-medium text-indigo-600">{data.resume.name}</p>
              ) : (
                <p className="mt-2 text-sm text-slate-500">Click to upload your resume (PDF, max 5MB)</p>
              )}
            </div>
          </label>
          <input
            type="file"
            id="resume"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > MAX_RESUME_SIZE) {
                  alert("Resume file is too large. Maximum size is 5MB.");
                  return;
                }
                onChange({ resume: file });
              }
            }}
          />
        </div>
      </div>

      {/* Photo Upload */}
      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-slate-700">
          Profile Photo
        </label>
        <div className="mt-1">
          <label
            htmlFor="photo"
            className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 py-8 transition-colors hover:border-indigo-400"
          >
            <div className="text-center">
              {data.photo ? (
                <div className="flex flex-col items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(data.photo)}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <p className="mt-2 text-sm font-medium text-indigo-600">{data.photo.name}</p>
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                  <p className="mt-2 text-sm text-slate-500">Click to upload your photo (JPG/PNG, max 10MB)</p>
                </>
              )}
            </div>
          </label>
          <input
            type="file"
            id="photo"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > MAX_PHOTO_SIZE) {
                  alert("Photo file is too large. Maximum size is 10MB.");
                  return;
                }
                onChange({ photo: file });
              }
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">
          Brief Description
        </label>
        <p className="mb-1 text-xs text-slate-400">What do you want visitors to know about you? This helps shape the tone.</p>
        <textarea
          id="description"
          rows={3}
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Passionate software engineer with 5 years of experience building web applications..."
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}
