import Header from "./components/header";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import PromoModal from "./components/PromoModal";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CartProvider>
            <Header />
            {children}
            <PromoModal />
            <SpeedInsights />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
