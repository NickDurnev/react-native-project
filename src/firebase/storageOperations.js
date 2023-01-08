import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  updateDoc,
  getDocs,
  doc,
  collection,
  where,
  query,
  getDoc,
} from "firebase/firestore";
import Toast from "react-native-toast-message";
import { customAlphabet } from "nanoid/non-secure";
import { storage, db } from "./config";

export const uploadPhotoToStorage = async (photo) => {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
  const response = await fetch(photo);
  const file = await response.blob();
  const storageRef = await ref(storage, `postImages/${nanoid()}`);
  await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);
  return photoURL;
};

export const uploadUserAvatarsToStorage = async (photo, email) => {
  const response = await fetch(photo);
  const file = await response.blob();
  const storageRef = await ref(storage, `usersAvatars/${email}`);
  await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);
  return photoURL;
};

export const uploadPostToDB = async (post) => {
  try {
    await addDoc(collection(db, "posts"), post);
  } catch (error) {
    console.log(error);
    Toast.show({
      type: "error",
      text1: "Щось пішло не так. Спробуйте ще раз",
    });
  }
};

export const uploadCommentToDB = async ({
  id,
  userId,
  nickname,
  commentsNumber,
  text,
  date,
}) => {
  const docRef = doc(db, "posts", id);
  const colRef = collection(docRef, "comments");
  await addDoc(colRef, { userId, nickname, text, date });
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
