"use client";

import { auth } from "@lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthListener({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const currentPath = window.location.pathname;
      const isAuthPage = ["/login", "/register"].includes(currentPath);

      if (user && isAuthPage) {
        router.push("/chat");
      } else if (!user && !isAuthPage) {
        router.push("/login");
      }
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [router]);

  if (!initialized) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
}
