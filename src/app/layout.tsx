import Header from "./components/header";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import PromoModal from "./components/PromoModal";

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
        </CartProvider>
      </body>
    </html>
  );
}
