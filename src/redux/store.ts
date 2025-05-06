import authReducer from "@features/auth/redux/slices/auth.slice";
import chatReducer from "@features/chat/redux/slices/chat.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
