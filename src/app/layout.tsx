import ReduxProvider from "@store/provider";
import type { Metadata } from "next";
import { EmotionProvider } from "../theme/EmotionProvider";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat with Gpt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <EmotionProvider>{children}</EmotionProvider>
          {/* <AuthListener> */}
          {/* {children} */}
          {/* </AuthListener> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
