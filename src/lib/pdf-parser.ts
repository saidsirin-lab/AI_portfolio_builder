import { PDFParse } from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // pdf-parse v2 marks load/getText/destroy as private in types but they are the public API
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parser = new PDFParse({ verbosity: 0, data: new Uint8Array(buffer) }) as any;
  await parser.load();
  const result = await parser.getText();
  await parser.destroy();
  return result.text;
}
