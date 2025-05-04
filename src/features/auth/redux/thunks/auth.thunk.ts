import { auth, db } from "@lib/firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "@store/store";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { setError, setUser } from "../slices/auth.slice";

const handleFirebaseError = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    return error.code;
  }
  return "auth/unknown-error";
};

export const loginWithGoogle = createAsyncThunk<User | null, void>(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
        });
      }

      return user;
    } catch (error) {
      return rejectWithValue(handleFirebaseError(error));
    }
  }
);

export const loginWithEmail = createAsyncThunk<
  User | null,
  { email: string; password: string }
>("auth/loginWithEmail", async ({ email, password }, { rejectWithValue }) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result,"datos")
    return result.user;
  } catch (error) {
    return rejectWithValue(handleFirebaseError(error));
  }
});


export const registerWithEmail = createAsyncThunk<
  User | null,
  { email: string; password: string; name: string }
>("auth/registerWithEmail", async ({ email, password, name }, { rejectWithValue }) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email: user.email,
      createdAt: serverTimestamp(),
    });

    return user;
  } catch (error) {
    return rejectWithValue(handleFirebaseError(error));
  }
});


export const resetPassword = createAsyncThunk<
  { success: boolean }, // Tipo de retorno en caso de éxito
  string,               // Tipo del argumento (email)
  { rejectValue: { success: boolean; error: string } } // Tipo de retorno en caso de error
>(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue({ success: false, error: error.message });
      } else if (error instanceof Error) {
        return rejectWithValue({ success: false, error: error.message });
      }
      return rejectWithValue({
        success: false,
        error: "An unknown error occurred",
      });
    }
  }
);

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
      return { success: true };
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(setError(error.message));
        return { success: false, error: error.message };
      } else if (error instanceof Error) {
        dispatch(setError(error.message));
        return { success: false, error: error.message };
      }
      dispatch(setError('An unknown error occurred'));
      return { success: false, error: 'An unknown error occurred' };
    }
  };
};