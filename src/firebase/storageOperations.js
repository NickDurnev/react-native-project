import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  addDoc,
  deleteDoc,
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

const nanoidType = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export const uploadImageToStorage = async (
  uri,
  folder,
  name = nanoidType()
) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(storage, `${folder}/${name}`);
  await uploadBytesResumable(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
};

export const deleteImageFromStorage = async (path, name) => {
  console.log(name);
  const firstIndex = name.indexOf("%");
  const secondIndex = name.indexOf("?");
  const parsedName = name.slice(firstIndex + 3, secondIndex);
  console.log(parsedName);
  const fileRef = ref(storage, `${path}/${parsedName}`);
  try {
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      console.log("Image isn't found");
      return;
    }
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

export const deletePostFromDB = async (postId) => {
  try {
    await deleteDoc(doc(db, "posts", postId));
  } catch (error) {
    console.log(error.message);
    Toast.show({
      type: "error",
      text1: "Щось пішло не так. Спробуйте ще раз",
    });
  }
};

export const deleteCommentFromDB = async (postId, commentId) => {
  try {
    const docRef = doc(db, "posts", postId);
    await deleteDoc(doc(docRef, "comments", commentId));
    await updateDoc(docRef, { commentsNumber: commentsNumber - 1 });
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
  let docId = null;
  const docRef = doc(db, "posts", id);
  const colRef = collection(docRef, "likes");
  const userLikes = await query(colRef, where("userId", "==", userId));
  const isLikedSnapshot = await getDocs(userLikes);
  isLikedSnapshot.forEach((doc) => {
    if (doc) {
      docId = doc.id;
    }
  });
  if (docId) {
    deleteLikeFromDB(id, docId);
    await updateDoc(docRef, { likesNumber: likesNumber - 1 });
    return;
  }
  await addDoc(colRef, { userId, nickname });
  await updateDoc(docRef, { likesNumber: likesNumber + 1 });
};

export const deleteLikeFromDB = async (postId, userId) => {
  try {
    await deleteDoc(doc(db, "posts", postId, "likes", userId));
  } catch (error) {
    console.log(error.message);
    Toast.show({
      type: "error",
      text1: "Щось пішло не так. Спробуйте ще раз",
    });
  }
};
