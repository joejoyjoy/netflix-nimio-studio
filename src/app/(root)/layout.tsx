import "../globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ProvidersComponent from "../providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nimio Studios Netflix App",
  description: "Sencilla replica de netflix con funciones CRUD creado por Joe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvidersComponent>
      <html lang="en">
        <body className={montserrat.className}>{children}</body>
      </html>
    </ProvidersComponent>
  );
}
