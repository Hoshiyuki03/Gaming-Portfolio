import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A. Dheeraj — Game Designer & Worldbuilder",
  description: "A game design portfolio exploring worlds, choices, and stories.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
