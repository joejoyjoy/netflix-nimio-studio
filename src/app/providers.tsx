"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/context/AuthContext";
import ModalProvider from "@/context/ModalContext";
import DialogProvider from "@/context/DialogContext";

export default function ProvidersComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ModalProvider>
          <DialogProvider>{children}</DialogProvider>
        </ModalProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
