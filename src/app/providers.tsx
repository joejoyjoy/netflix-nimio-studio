"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/context/AuthContext";
import ModalProvider from "@/context/ModalContext";

export default function ProvidersComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
