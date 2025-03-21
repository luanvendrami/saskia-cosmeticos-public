import Header from "./components/header";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import PromoModal from "./components/PromoModal";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased bg-[#ffe1ff]`}>
        <CartProvider>
          <Header />
          {children}
          <PromoModal />
          <SpeedInsights />
        </CartProvider>
      </body>
    </html>
  );
}
