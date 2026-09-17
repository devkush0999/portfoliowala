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

export async function uploadImage(file: Buffer) {
  if (!configured()) {
    throw new Error("Cloudinary is not configured");
  }
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "dks-cms/images",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error ?? new Error("Upload failed"));
          return;
        }
        resolve(result.secure_url);
      },
    );
    stream.end(file);
  });
}
