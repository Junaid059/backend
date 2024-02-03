import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //filesystem

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // else upload the file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded suucessfully
    console.log("file has been uploaded ");
    response.url;
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally temporay file as the upload operation got failed
    return null;
  }
};

cloudinary.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result);
  }
);
