import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  addDoc,
  updateDoc,
  getDocs,
  doc,
  collection,
  where,
  query,
} from "firebase/firestore";
import Toast from "react-native-toast-message";
import { customAlphabet } from "nanoid/non-secure";
import { storage, db } from "./config";

export const uploadPhotoToStorage = async (photo) => {
  try {
    const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
    const response = await fetch(photo);
    const file = await response.blob();
    const storageRef = await ref(storage, `postImages/${nanoid()}`);
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    return photoURL;
  } catch (error) {
    console.log(error.message);
    Toast.show({
      type: "error",
      text1: "Щось пішло не так. Спробуйте ще раз",
    });
  }
};

export const uploadUserAvatarsToStorage = async (photo, email) => {
  try {
    const response = await fetch(photo);
    const file = await response.blob();
    const storageRef = await ref(storage, `usersAvatars/${email}`);
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    return photoURL;
  } catch (error) {
    console.log(error.message);
    console.log(error.code);
    Toast.show({
      type: "error",
      text1: "Щось пішло не так. Спробуйте ще раз",
    });
  }
};

export const deleteFileFromStorage = async (name) => {
  const fileRef = ref(storage, `usersAvatars/${name}`);
  if (!fileRef) {
    return;
  }
  try {
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadPostToDB = async (post) => {
  try {
    await addDoc(collection(db, "posts"), post);
  } catch (error) {
    console.log(error.message);
    Toast.show({
      type: "error",
      text1: "Щось пішло не так. Спробуйте ще раз",
    });
  }
};

export const uploadCommentToDB = async ({
  id,
  userId,
  avatarURL,
  nickname,
  commentsNumber,
  text,
  date,
}) => {
  const docRef = doc(db, "posts", id);
  const colRef = collection(docRef, "comments");
  await addDoc(colRef, { userId, avatarURL, nickname, text, date });
  await updateDoc(docRef, { commentsNumber: commentsNumber + 1 });
};

export const uploadLikeToDB = async (id, userId, nickname, likesNumber) => {
  let isLiked = false;
  const docRef = doc(db, "posts", id);
  const colRef = collection(docRef, "likes");
  const userLikes = await query(colRef, where("userId", "==", userId));
  const isLikedSnapshot = await getDocs(userLikes);
  isLikedSnapshot.forEach((doc) => {
    if (doc) {
      isLiked = true;
    }
  });
  if (isLiked) {
    return;
  }
  await addDoc(colRef, { userId, nickname });
  await updateDoc(docRef, { likesNumber: likesNumber + 1 });
};
