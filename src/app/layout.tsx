import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter, Abyssinica_SIL, Roboto } from 'next/font/google'
const sansation = localFont({
  src: "./fonts/sansation.woff",
  variable: "--sansation",
});
const roboto = Roboto({
  subsets: ['latin'],
  weight:["100","300","500","900"],
  variable: '--roboto',
})
export const metadata: Metadata = {
  title: "Todo AI",
  description: "Get Organized",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`page ${sansation.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
