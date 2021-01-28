import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserData } from "./types";

const initialState = null as UserData | null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<UserData | null>) => payload,
    logout: (state) => null,
  },
});

const errorSlice = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    newError: (state, { payload }: PayloadAction<string>) => payload,
    removeError: (state) => "",
  },
});

const dialogSlice = createSlice({
  name: "dialog",
  initialState: "",
  reducers: {
    open: (state, { payload }: PayloadAction<string>) => payload,
    close: (state) => "",
  },
});

export const {
  login: loginActionCreator,
  logout: logoutActionCreator,
} = authSlice.actions;
export const {
  newError: newErrorActionCreator,
  removeError: removeErrorActionCreator,
} = errorSlice.actions;
export const {
  open: openActionCreator,
  close: closeActionCreator,
} = dialogSlice.actions;

const reducer = {
  auth: authSlice.reducer,
  dialog: dialogSlice.reducer,
  error: errorSlice.reducer,
};

export default configureStore({
  reducer,
});
