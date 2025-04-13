"use client";
import "./globals.css";
import "./resets.css";
import { RoleProvider } from "./GlobalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <RoleProvider>
        <body>{children}</body>
      </RoleProvider>
    </html>
  );
}
