"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

interface User {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}

export default function AuthState({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const { name, email, image } = session.user as User;
    }
    if (session === null) {
    }
  }, [session]);

  return children;
}
