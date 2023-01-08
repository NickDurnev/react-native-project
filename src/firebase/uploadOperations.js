import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { customAlphabet } from "nanoid/non-secure";
import { storage } from "./config";

export const uploadPhotoToStorage = async (photo) => {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
  const response = await fetch(photo);
  const file = await response.blob();
  const storageRef = await ref(storage, `postImages/${nanoid()}`);
  await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);
  return photoURL;
};
