import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./components/Footer.js"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EventBuzz | Campus Event Management Platform",
  description: "Manage college events effortlessly with EventBuzz - the #1 campus event platform. Schedule, register, track attendance & analyze engagement. Join 1000+ universities today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
