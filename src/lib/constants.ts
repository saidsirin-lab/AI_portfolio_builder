import { ColorScheme, Industry } from "@/types";

export const INDUSTRIES: Industry[] = [
  { id: "tech", name: "Technology / Software", description: "Software engineering, data science, IT" },
  { id: "design", name: "Design / Creative", description: "UI/UX, graphic design, illustration" },
  { id: "business", name: "Business / Finance", description: "Consulting, finance, management" },
  { id: "marketing", name: "Marketing / Communications", description: "Marketing, PR, content strategy" },
  { id: "academic", name: "Academic / Research", description: "Research, teaching, publications" },
  { id: "healthcare", name: "Healthcare", description: "Medicine, nursing, health sciences" },
  { id: "engineering", name: "Engineering", description: "Mechanical, electrical, civil engineering" },
  { id: "other", name: "Other", description: "General professional portfolio" },
];

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    id: "midnight",
    name: "Midnight Blue",
    primary: "#1e3a5f",
    secondary: "#f0f4f8",
    accent: "#4a90d9",
    preview: "bg-blue-900",
  },
  {
    id: "forest",
    name: "Forest Green",
    primary: "#1a4d2e",
    secondary: "#f0f7f2",
    accent: "#2d8a56",
    preview: "bg-green-900",
  },
  {
    id: "slate",
    name: "Modern Slate",
    primary: "#1e293b",
    secondary: "#f8fafc",
    accent: "#6366f1",
    preview: "bg-slate-800",
  },
  {
    id: "burgundy",
    name: "Classic Burgundy",
    primary: "#5a1a2a",
    secondary: "#fdf2f4",
    accent: "#c2185b",
    preview: "bg-red-900",
  },
  {
    id: "ocean",
    name: "Ocean Teal",
    primary: "#134e5e",
    secondary: "#f0fdfa",
    accent: "#0d9488",
    preview: "bg-teal-800",
  },
  {
    id: "charcoal",
    name: "Charcoal & Gold",
    primary: "#1c1c1c",
    secondary: "#fafaf9",
    accent: "#d4a843",
    preview: "bg-neutral-900",
  },
];

export const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_PHOTO_SIZE = 10 * 1024 * 1024; // 10MB
export const PHOTO_MAX_DIMENSION = 400;
