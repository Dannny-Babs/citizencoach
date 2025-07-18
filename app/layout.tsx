import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import { FlashcardProvider } from "../context/FlashcardContext";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CitizenCoach",
  description: "AI-powered study coach that adapts to your learning style. Practice with real test questions, get instant feedback, and track your progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rethinkSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


