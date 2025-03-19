import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import { Inter, Poppins, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Ebra",
  description: "Ebra - Made by Muhammad Abdul Nafay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} text-foreground`}
      >
        <Navbar />
        <div className="md:py-3 py-1.5 md:px-32 px-4">{children}</div>
      </body>
    </html>
  );
}
