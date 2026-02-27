import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/common/navbar";
import Footer from "./_components/common/footer";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopMart - Your Ultimate Online Shopping Destination",
  description: "Discover a world of endless possibilities at ShopMart, your ultimate online shopping destination. From the latest fashion trends to cutting-edge electronics, we offer a curated selection of high-quality products that cater to every style and need. Experience seamless shopping with our user-friendly interface, secure payment options, and fast delivery. Join our vibrant community of shoppers and elevate your lifestyle with ShopMart today!",
};
export type RootLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  <AuthProvider>
    <Navbar />
  <main className="min-h-screen space-y-4">
    {children}
  </main>
  <Toaster position="top-center" richColors />
  <Footer />
  </AuthProvider>
</body>
    </html>
  );
}
