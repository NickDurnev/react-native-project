import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

export const authRegister =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: login });
      const { uid, displayName } = auth.currentUser;
      dispatch(
        authSlice.actions.updateProfile({
          userId: uid,
          nickname: displayName,
        })
      );
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authLogin =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authLogoOut = () => async (dispatch, getState) => {};
