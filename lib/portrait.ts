import fs from "node:fs";
import path from "node:path";

const files = ["portrait.jpg", "portrait.jpeg", "portrait.webp", "portrait.png"];

export function getPortraitSrc() {
  for (const file of files) {
    if (fs.existsSync(path.join(process.cwd(), "public", file))) {
      return `/${file}`;
    }
  }
  return null;
}
