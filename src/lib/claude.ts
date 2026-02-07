import Anthropic from "@anthropic-ai/sdk";
import { buildPortfolioPrompt } from "./prompts";

const anthropic = new Anthropic();

interface GenerateParams {
  resumeText: string;
  description: string;
  industry: string;
  colorScheme: string;
  fullName: string;
  photoBase64: string;
}

export async function generatePortfolio(params: GenerateParams): Promise<string> {
  const prompt = buildPortfolioPrompt({
    resumeText: params.resumeText,
    description: params.description,
    industry: params.industry,
    colorScheme: params.colorScheme,
    fullName: params.fullName,
  });

  let html = "";

  const stream = anthropic.messages.stream({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16000,
    messages: [{ role: "user", content: prompt }],
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      html += event.delta.text;
    }
  }

  // Replace photo placeholder with actual base64 data
  html = html.replace(/__PROFILE_PHOTO__/g, params.photoBase64);

  // Clean up any markdown code fences if Claude wraps the output
  html = html.replace(/^```html?\s*\n?/i, "").replace(/\n?```\s*$/i, "");

  return html;
}
