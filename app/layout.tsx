import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { dark } from "@clerk/themes";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";

export const metadata: Metadata = {
  title: "LiveDocs",
  description: "A Collaborative documentation platform",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3371FF",
          fontSize: "16px",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
