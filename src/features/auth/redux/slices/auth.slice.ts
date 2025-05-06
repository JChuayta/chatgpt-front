import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import Cookies from "js-cookie";
import { deserializeUser, SerializableUser } from "../../../../types/authTypes";
import {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
} from "../thunks/auth.thunk";

interface AuthState {
  email: string;
  user: SerializableUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  email: "",
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.loading = false;
      state.error = null;
      if (action.payload) {
        state.user = deserializeUser(action.payload);
      } else {
        state.user = null;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = deserializeUser(action.payload);
        } else {
          state.user = null;
        }
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = deserializeUser(action.payload);
          Cookies.set("token", state.user.tokenManager.accessToken);
          Cookies.set("uid", state.user.uid);
          Cookies.set("displayName", state.user.email as string);
        } else {
          state.user = null;
        }
      })
      .addCase(registerWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = deserializeUser(action.payload);
          Cookies.set("token", state.user.tokenManager.accessToken);
          Cookies.set("uid", state.user.uid);
          Cookies.set("displayName", state.user.email as string);
        } else {
          state.user = null;
        }
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, setError, clearError, logoutSuccess, setEmail } =
  authSlice.actions;

export default authSlice.reducer;
