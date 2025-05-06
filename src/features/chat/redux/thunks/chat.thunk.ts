import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import Cookies from "js-cookie";
interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
}
export const selectAuthToken = (state: RootState): string | null => {
  return state.auth.user?.tokenManager?.accessToken || null;
};

export const sendMessageToChat = createAsyncThunk<
  ChatResponse,
  ChatRequest,
  { rejectValue: string }
>("chat/sendMessage", async ({ message }, thunkAPI) => {
  const token = Cookies.get("token");

  if (!token) {
    return thunkAPI.rejectWithValue("Token no disponible");
  }
  try {
    const data = await sendChatMessage(message, token);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(
        error.message || "Error al enviar el mensaje"
      );
    }
    return thunkAPI.rejectWithValue("Error desconocido");
  }
});

export const sendChatMessage = async (message: string, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};
