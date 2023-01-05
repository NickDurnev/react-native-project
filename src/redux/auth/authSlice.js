import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickname: null,
  stateChange: false,
};

const actions = {
  updateUser: (state, { payload }) => ({
    ...state,
    userId: payload.userId,
    nickname: payload.nickname,
  }),
  updateStateChange: (state, { payload }) => ({
    ...state,
    stateChange: payload.stateChange,
  }),
  authSignOut: () => initialState,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: actions,
});
