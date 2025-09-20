import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import BodyWithTheme from "@/components/BodyWithTheme";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "QuillInsight",
  description: "AI-powered insights for your writing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BodyWithTheme>
            <AuthProvider>{children}</AuthProvider>
          </BodyWithTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}
