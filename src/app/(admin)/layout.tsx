import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ProvidersComponent from "../providers";
import ProtectedRoute from "./protectedRoute";
import Header from "@/components/Header";
import "../globals.css";

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
        <body className={`${montserrat.className} bg-gray-3`}>
          <ProtectedRoute>
            <Header role={"ADMIN"} />
            <main className="responsive">
              <span className="responsive_wrapper mb-6">{children}</span>
            </main>
          </ProtectedRoute>
        </body>
      </html>
    </ProvidersComponent>
  );
}
