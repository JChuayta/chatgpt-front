import { ChatMessage } from "@features/chat/hooks/useMessages.hook";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendMessageToChat } from "../thunks/chat.thunk";

interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageToChat.rejected, (state) => {
        state.loading = false;
        state.error = "ocurrio un error";
      })
      .addCase(sendMessageToChat.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setMessages, clearMessages } = chatSlice.actions;

export const selectMessages = (state: { chat: ChatState }) =>
  state.chat.messages;

export default chatSlice.reducer;
