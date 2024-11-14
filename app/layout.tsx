import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import Navbar from "@/components/shared/Navbar";
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

export default async function LocaleLayout({
  children,
  
}: Readonly<{
  children: React.ReactNode;

}>) {

    // Ensure that the incoming `locale` is valid
 

  
  const locale = await getLocale();
  if (!locale) {
    notFound();
  }
  const messages = await getMessages();
  // console.log('Locale en el layout de la app', locale);
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
        <div className="lg:flex justify-center  py-[45px] ">
          {children}
        </div>
        {/* <footer>
        <div className="bg-black text-white py-4 px-8 relative z-50">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">Contacto</h2>
              <p>Email: zzz@zxxx.om</p>
              <p>Teléfono: +1213141414141</p>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">Síguenos</h2>
              <p>Facebook</p>
              <p>Twitter</p>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>

        </footer> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}