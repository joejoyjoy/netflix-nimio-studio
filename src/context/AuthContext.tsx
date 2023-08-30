"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getSignedInUserData } from "@/lib/user.actions";

export interface AuthInterface {
  user: User | undefined;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const defaultState = {
  user: {
    id: "",
    name: "",
    email: "",
    image: "",
    role: "",
  },
  isLoggedIn: false,
  isLoading: true,
} as AuthInterface;

export const AuthContext = createContext(defaultState);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session) {
      const userLoggedIn = async () => {
        try {
          const { email } = session.user as UserSession;

          if (email) {
            const res = await getSignedInUserData({ email });
            if (res) {
              setUser(res);
              setIsLoggedIn(true);
              setIsLoading(false);
            }
          }
        } catch (error: any) {
          throw new Error(
            `Failed to create/update user by checkUser Fn(): ${error.message}`
          );
        }
      };
      userLoggedIn();
    }
    if (session === null) {
      setUser(undefined);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
