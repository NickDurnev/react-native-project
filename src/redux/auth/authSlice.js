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
      firstEnter: true,
    };
  },
  updateStateChange: (state, { payload }) => ({
    ...state,
    stateChange: payload.stateChange,
  }),
  authSignOut: () => ({
    ...initialState,
    stateChange: false,
    firstEnter: false,
  }),
  changeAvatar: (state, { payload }) => ({
    ...state,
    avatarURL: payload.avatarURL,
  }),
  changeFirstEner: (state) => ({
    ...state,
    firstEnter: false,
  }),
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: actions,
});
