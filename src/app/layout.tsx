import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify the font weights you need
  variable: "--font-poppins", // Optional: Define a CSS variable
});

export const metadata: Metadata = {
  title: "Tutor App",
  description: "Created by Iqbal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      </head>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <div className="w-full">
          <div className="relative h-screen">
          {children}
          <Toaster position="bottom-center"/>
          </div>
        </div>
      </body>
    </html>
  );
}
