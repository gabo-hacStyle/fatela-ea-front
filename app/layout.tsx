import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Analisis de Datos de Fatela",
  description: "Para analizar los datos de Fatela de manera historica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="main-navbar ">
          <div className="logo">AnReHis</div>
          <div className="platform">PLATAFOMA DE REGISTROS ACADEMICOS 📓</div>
        </nav>
        <div className="lg:flex justify-center h-[95vh] py-[45px] ">
          {children}
      </div>
      </body>
    </html>
  );
}
