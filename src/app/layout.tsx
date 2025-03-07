import Header from "./components/header";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

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
          <Header/>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
