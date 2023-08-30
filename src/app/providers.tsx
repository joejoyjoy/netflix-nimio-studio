"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/context/AuthContext";

export default function ProvidersComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}
