"use client";

import { ChatInput, GptMessage, MyMessage } from "@features/chat/components";
import useMessages, {
  ChatMessage,
} from "@features/chat/hooks/useMessages.hook";
import { sendMessageToChat } from "@features/chat/redux/thunks/chat.thunk";
import { Box, Paper } from "@mui/material";
import { useAppDispatch } from "@store/hooks/useAppDispatch";
import { useAppSelector } from "@store/hooks/useAppSelector";

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useMessages(user?.uid);
  const { messages, loading } = useAppSelector((state) => state.chat);
  const filteredMessages = typeof window !== "undefined" ? messages : [];

  const handleSendMessage = async (text: string) => {
    if (!user) return;
    void dispatch(sendMessageToChat({ message: text }));
  };
  return (
    <Box display="flex" flexDirection="column" height="100vh" p={2}>
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mb: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* {messages.length === 0 ? (
          <div>Cargando mensajes...</div>
        ) : (
          filteredMessages.map((msg: ChatMessage) => {
            console.log(user?.email, msg.displayName);
            if (msg.type === "bot") {
              return <GptMessage key={msg.id} text={msg.text} />;
            }
            if (msg.displayName === user?.email) {
              return <MyMessage key={msg.id} text={msg.text} />;
            }
            return null;
          })
        )} */}
        {messages.length === 0 && loading ? (
          <div>Cargando mensajes...</div>
        ) : (
          <>
            {filteredMessages.map((msg: ChatMessage) => {
              console.log(user?.email, msg.displayName);
              if (msg.type === "bot") {
                return (
                  <GptMessage
                    key={msg.id}
                    text={msg.text}
                  />
                );
              }
              if (msg.displayName === user?.email) {
                return <MyMessage key={msg.id} text={msg.text} />;
              }
              return null;
            })}
            {loading && <GptMessage text="" isLoading={loading} />}
          </>
        )}
      </Paper>

      <ChatInput onSendMessage={handleSendMessage} />
    </Box>
  );
}
