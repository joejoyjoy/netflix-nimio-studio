"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import Loader from "@/components/UI/Loader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoggedIn || !user?.role) {
    redirect("/");
  }

  return children;
}
