import axios from "axios";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = "dahamqpre";
  const uploadPreset = "unsigned_preset"; 

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.secure_url;
  } catch (error: any) {
    console.error("Cloudinary upload failed:", error.message);
    throw new Error("Upload failed");
  }
};
