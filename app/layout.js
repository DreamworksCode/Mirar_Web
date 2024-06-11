import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MIRAR AI",
  description: "An AI tool to assist you always",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` body ${inter.className}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
