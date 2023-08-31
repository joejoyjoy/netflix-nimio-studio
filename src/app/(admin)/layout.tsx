import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ProvidersComponent from "../providers";
import ProtectedRoute from "./protectedRoute";
import Header from "@/components/Header";
import "../globals.css";
import ModalForm from "@/components/UI/ModalForm";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin MOVEA | Nimio Studio | Created by Joe",
  description: "MOVEA Admin Panel made with nextJS and Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvidersComponent>
      <html lang="en">
        <body className={`${montserrat.className}`}>
          <ProtectedRoute>
            <Header role={"ADMIN"} />
            <main className="responsive">
              <div className="responsive_wrapper mb-6">{children}</div>
            </main>
          </ProtectedRoute>
          <ModalForm />
        </body>
      </html>
    </ProvidersComponent>
  );
}
