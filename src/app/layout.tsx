import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import PromoModal from "@/components/promo-modal";
import { CartProvider } from "@/context/cartContext";
import { ThemeProvider } from "@/context/themeContext";

import HeaderPage from "../components/ui/header";

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
    <html lang="pt-BR" suppressHydrationWarning className="light h-full">
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
      <body className="light-mode min-h-screen flex flex-col bg-[var(--primary-light)]">
        <CartProvider>
          <ThemeProvider>
            <HeaderPage />
            <main className="flex-grow flex flex-col">{children}</main>
            <PromoModal />
            <SpeedInsights />
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
