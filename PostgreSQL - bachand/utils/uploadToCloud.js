import cloudinary from "../config/cloudinary.js";

export const uploadPdfToCloud = async (filePath, folder) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "raw"
  });

  return result.secure_url;
};