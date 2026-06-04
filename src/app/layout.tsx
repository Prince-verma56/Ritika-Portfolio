import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientSmoothScroller from "@/components/ClientSmoothScroller";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Ritika Rawat — Portfolio",
  description: "B.Tech AI & Data Analytics — Developer, Designer, Builder",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body
        className="bg-black text-white antialiased"
        style={{ fontFamily: "var(--font-space), sans-serif" }}
        suppressHydrationWarning
      >
        <ClientSmoothScroller>{children}</ClientSmoothScroller>
      </body>
    </html>
  );
}
