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

const { updateUser, updateStateChange, authSignOut } = authSlice.actions;

export const authRegister =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: login });
      const { uid, displayName } = auth.currentUser;
      dispatch(
        updateUser({
          userId: uid,
          nickname: displayName,
        })
      );
    } catch (error) {
      const message = authErrorHandler(error.code);
      Toast.show({
        type: "error",
        text1: message,
      });
      console.log("error", error.message);
      console.log(error.code);
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
      console.log(error.code);
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
      };
      dispatch(updateUser(userUpdateProfile));
      dispatch(updateStateChange({ stateChange: true }));
      return;
    }
    dispatch(updateStateChange({ stateChange: false }));
  });
};
