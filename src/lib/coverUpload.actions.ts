import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function savePhotosToLocal(formData: any) {
  const images = formData.getAll("cover");
  const image = images[0];

  const buffersPromise = images.map((pic: any) =>
    pic.arrayBuffer().then(async (data: any) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = image.type.split("/")[1];

      const tmpdir = os.tmpdir();
      const uploadDir = path.join(tmpdir, `/${name}.${ext}`);

      await fs.writeFile(uploadDir, buffer);

      return {
        filepath: uploadDir,
        filename: image.name,
      };
    })
  );
  return await Promise.all(buffersPromise);
}

async function uploadPhotoToCloudinary(newPicture: any) {
  const photosPromise = newPicture.map((pic: any) =>
    cloudinary.v2.uploader.upload(pic.filepath, {
      folder: "Netflix_NimioStudio_NextJS",
    })
  );
  return await Promise.all(photosPromise);
}

export async function uploadPhoto(formData: any) {
  try {
    // Save photo files to temporally folder
    const newPicture = await savePhotosToLocal(formData);

    // Upload to the cloud after saving the photo file to the temp folder
    const photo = await uploadPhotoToCloudinary(newPicture);

    // Delete photo files in temp folder after successful upload
    setTimeout(() => {
      newPicture.map((pic) => fs.unlink(pic.filepath));
    }, 2500);

    revalidatePath("/");

    const imageArr = {
      public_id: photo[0].public_id,
      secure_url: photo[0].secure_url,
    };

    return imageArr;
  } catch (error: any) {
    throw new Error(
      `Failed to uploadPhoto by admin. Fn() uploadPhoto: ${error.message}`
    );
  }
}

export async function deletePhotoOfCloudinary(public_id: string) {
  try {
    cloudinary.v2.uploader.destroy(public_id);

    return;
  } catch (error: any) {
    throw new Error(
      `Failed to uploadPhoto by admin. Fn() uploadPhoto: ${error.message}`
    );
  }
}
