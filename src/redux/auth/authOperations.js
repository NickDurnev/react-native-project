import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import Toast from "react-native-toast-message";
import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";
import authErrorHandler from "./authErrorHandler";

const { updateUser, updateStateChange, authSignOut, changeAvatar } =
  authSlice.actions;

export const authRegister =
  ({ login, email, password, imageURL = null }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: imageURL,
      });
      const { uid, displayName, photoURL } = auth.currentUser;
      dispatch(
        updateUser({
          userId: uid,
          nickname: displayName,
          email: email,
          avatarURL: photoURL,
        })
      );
    } catch (error) {
      const message = authErrorHandler(error.code);
      Toast.show({
        type: "error",
        text1: message,
      });
    }
  };

export const authLogin =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const message = authErrorHandler(error.code);
      Toast.show({
        type: "error",
        text1: message,
      });
    }
  };

export const authLogoOut = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateUserChange = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickname: user.displayName,
        email: user.email,
        avatarURL: user.photoURL,
      };
      dispatch(updateUser(userUpdateProfile));
      dispatch(updateStateChange({ stateChange: true }));
      return;
    }
    dispatch(updateStateChange({ stateChange: false }));
  });
};

export const changeUserPhotoURL =
  ({ newAvatarURL }) =>
  async (dispatch, getState) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: newAvatarURL,
      });
      dispatch(changeAvatar({ avatarURL: newAvatarURL }));
    } catch (error) {
      console.log(error.code);
    }
  };
