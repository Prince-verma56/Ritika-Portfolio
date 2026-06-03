import type { Metadata } from "next";
import "./globals.css";
import ClientSmoothScroller from "@/components/ClientSmoothScroller";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Developer Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientSmoothScroller>{children}</ClientSmoothScroller>
      </body>
    </html>
  );
}
