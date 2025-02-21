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
      <body
        className={`${poppins.variable} antialiased`}
      >
        <div className="w-full">
          <div className="relative max-w-[500px] h-screen">
          {children}
          <Toaster position="bottom-center"/>
          </div>
        </div>
      </body>
    </html>
  );
}
