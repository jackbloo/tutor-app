import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import BottomNavbar from "@/components/BottomNavbar";


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
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <div className="w-full">
          <div className="relative max-w-[500px] h-screen">
          {children}
          </div>
        </div>
      </body>
    </html>
  );
}
