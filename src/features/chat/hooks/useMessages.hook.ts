"use client"
import { db } from "@lib/firebase/config";
import { useAppDispatch } from "@store/hooks/useAppDispatch";
import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { setMessages } from "../redux/slices/chat.slice";

export interface ChatMessage {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  createdAt: Timestamp;
  type: "user" | "bot";
  uidRef: string | null;
}

const MESSAGES_COLLECTION = "messages";

const useMessages = (userUid: string | undefined) => {
  if (typeof window !== "undefined" && userUid === undefined) {
    userUid = localStorage.getItem("uid") as string;
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!userUid) return;

    const messagesRef = collection(db, MESSAGES_COLLECTION);

    const userQuery = query(messagesRef, where("uid", "==", userUid));
    const botQuery = query(messagesRef, where("uidRef", "==", userUid));

    const unsubscribeUser = onSnapshot(userQuery, (userSnap) => {
      const userMessages = userSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ChatMessage[];

      const unsubscribeBot = onSnapshot(botQuery, (botSnap) => {
        const botMessages = botSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ChatMessage[];

      
        const allMessages = [...userMessages, ...botMessages].sort((a, b) => {
          const timeA = a.createdAt ? (a.createdAt.seconds ?? 0) : 0; // Si es un Timestamp, usa `seconds`
          const timeB = b.createdAt ? (b.createdAt.seconds ?? 0) : 0;
          return timeA - timeB;
        });

        dispatch(setMessages(allMessages));
      });

      return () => {
        unsubscribeBot();
      };
    });

    return () => {
      unsubscribeUser();
    };
  }, [userUid, dispatch]);
};

export default useMessages;
