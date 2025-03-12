import Header from "./components/header";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import PromoModal from "./components/PromoModal";
import { ToastProvider } from "./context/ToastContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-[#ffe1ff]`}
      >
        <CartProvider>
          <ToastProvider>
            <Header/>
            {children}
            <PromoModal />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
