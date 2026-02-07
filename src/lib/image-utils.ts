import sharp from "sharp";
import { PHOTO_MAX_DIMENSION } from "./constants";

export async function processPhoto(buffer: Buffer): Promise<string> {
  const processed = await sharp(buffer)
    .resize(PHOTO_MAX_DIMENSION, PHOTO_MAX_DIMENSION, {
      fit: "cover",
      position: "top",
    })
    .jpeg({ quality: 85 })
    .toBuffer();

  const base64 = processed.toString("base64");
  return `data:image/jpeg;base64,${base64}`;
}
