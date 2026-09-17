import { v2 as cloudinary } from "cloudinary";

function configured() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud_name || !api_key || !api_secret) {
    return false;
  }
  cloudinary.config({ cloud_name, api_key, api_secret });
  return true;
}

export async function uploadImage(file: Buffer, filename: string) {
  if (!configured()) {
    throw new Error("Cloudinary is not configured");
  }
  const ext = filename.split(".").pop()?.toLowerCase() ?? "jpg";
  const mime =
    ext === "png"
      ? "image/png"
      : ext === "webp"
        ? "image/webp"
        : ext === "gif"
          ? "image/gif"
          : "image/jpeg";
  const uploaded = await cloudinary.uploader.upload(
    `data:${mime};base64,${file.toString("base64")}`,
    {
      folder: "dks-cms/images",
      resource_type: "image",
    },
  );
  return uploaded.secure_url as string;
}
