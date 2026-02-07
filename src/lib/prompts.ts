import { INDUSTRIES, COLOR_SCHEMES } from "./constants";

interface PromptParams {
  resumeText: string;
  description: string;
  industry: string;
  colorScheme: string;
  fullName: string;
}

export function buildPortfolioPrompt(params: PromptParams): string {
  const industryInfo = INDUSTRIES.find((i) => i.id === params.industry);
  const colorInfo = COLOR_SCHEMES.find((c) => c.id === params.colorScheme);

  return `You are an expert web developer and designer. Generate a complete, single-file HTML portfolio website for the following person.

## Person Details
- **Name**: ${params.fullName}
- **Industry**: ${industryInfo?.name || params.industry} (${industryInfo?.description || ""})
- **Self-description**: ${params.description}

## Resume Content
${params.resumeText}

## Design Requirements
- **Color Scheme**: "${colorInfo?.name || params.colorScheme}"
  - Primary: ${colorInfo?.primary || "#1e293b"}
  - Secondary/Background: ${colorInfo?.secondary || "#f8fafc"}
  - Accent: ${colorInfo?.accent || "#6366f1"}
- Modern, clean, professional design
- Fully responsive (mobile-first)
- Smooth scroll behavior
- Subtle animations on scroll (CSS only, use @keyframes and intersection observer via a small inline script)

## Structure
1. **Hero section**: Name, title/role, brief tagline, profile photo (use \`__PROFILE_PHOTO__\` as the img src placeholder — it will be replaced later)
2. **About**: Expanded bio based on description and resume
3. **Experience**: Work history from resume, nicely formatted with company, role, dates, and bullet points
4. **Skills**: Extracted from resume, displayed as tags/pills or a visual layout
5. **Education**: Degrees, certifications from resume
6. **Projects** (if any mentioned in resume): Showcase with descriptions
7. **Contact**: Email and links from resume, with a simple contact prompt

## Technical Requirements
- Single HTML file with all CSS inline in a <style> tag
- All JavaScript inline in a <script> tag (minimal, only for scroll animations and mobile nav)
- Use system fonts: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- NO external dependencies (no CDN links, no Google Fonts, no Font Awesome)
- Use SVG icons inline for social links / contact items
- The photo should be displayed as a circular image in the hero section
- Include a mobile hamburger menu
- Include proper meta tags (viewport, description, title)
- Use semantic HTML (header, nav, main, section, footer)

## Important
- Output ONLY the complete HTML file, nothing else. No markdown code fences.
- Start with <!DOCTYPE html> and end with </html>
- Make it look polished and professional — this is someone's personal brand
- Use the exact placeholder __PROFILE_PHOTO__ for the profile image src attribute
- Extract ALL relevant information from the resume — don't skip sections`;
}
