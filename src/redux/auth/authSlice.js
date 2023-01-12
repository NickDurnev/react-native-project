import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickname: null,
  stateChange: null,
};

const actions = {
  updateUser: (state, { payload }) => {
    return {
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
      email: payload.email,
      avatarURL: payload.avatarURL,
    };
  },
  updateStateChange: (state, { payload }) => ({
    ...state,
    stateChange: payload.stateChange,
  }),
  authSignOut: () => ({ ...initialState, stateChange: false }),
  changeAvatar: (state, { payload }) => ({
    ...state,
    avatarURL: payload.avatarURL,
  }),
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: actions,
});
