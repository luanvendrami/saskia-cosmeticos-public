import Header from "./components/header";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import PromoModal from "./components/PromoModal";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export const metadata = {
  title: "Saskia Cosméticos",
  description: "Produtos de beleza de alta qualidade",
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="light">
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="darkreader-lock" content="true" />
        <Script id="prevent-dark-mode" strategy="beforeInteractive">
          {`
            // Simple function to prevent dark mode
            (function() {
              // Force light mode on the document
              document.documentElement.classList.add('light');
              document.documentElement.classList.remove('dark');
              document.documentElement.style.colorScheme = 'light';
              
              // Periodically check and remove Dark Reader attributes
              setInterval(function() {
                // Remove Dark Reader attributes if they exist
                if (document.documentElement.hasAttribute('data-darkreader-mode')) {
                  document.documentElement.removeAttribute('data-darkreader-mode');
                }
                if (document.documentElement.hasAttribute('data-darkreader-scheme')) {
                  document.documentElement.removeAttribute('data-darkreader-scheme');
                }
                
                // Remove any inline Dark Reader attributes
                document.querySelectorAll('[data-darkreader-inline-bgcolor]').forEach(el => {
                  el.removeAttribute('data-darkreader-inline-bgcolor');
                });
                document.querySelectorAll('[data-darkreader-inline-color]').forEach(el => {
                  el.removeAttribute('data-darkreader-inline-color');
                });
              }, 1000);
            })();
          `}
        </Script>
      </head>
      <body className="light-mode">
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
