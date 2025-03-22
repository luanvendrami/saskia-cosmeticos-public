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
  colorScheme: "light only",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="light">
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="force-color-scheme" content="light" />
        <meta name="darkreader-lock" content="true" />
        <Script id="prevent-dark-mode" strategy="beforeInteractive">
          {`
            // Force light mode and prevent dark mode extensions like Dark Reader
            (function() {
              // Override CSS filter property to prevent dark mode filters
              const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
              CSSStyleDeclaration.prototype.setProperty = function(propertyName, value) {
                if (propertyName.toLowerCase().includes('filter') || 
                    propertyName.toLowerCase().includes('color-scheme') || 
                    propertyName.toLowerCase().includes('background') || 
                    propertyName.toLowerCase().includes('color')) {
                  // Check if the value might be from a dark mode extension
                  if (value && typeof value === 'string' && 
                     (value.includes('invert') || value.includes('brightness') || 
                      value.includes('contrast') || value.includes('hue-rotate') ||
                      value.includes('dark'))) {
                    // Don't apply these properties
                    return;
                  }
                }
                return originalSetProperty.call(this, propertyName, value);
              };
              
              // Force light mode on the document
              document.documentElement.style.filter = 'none !important';
              document.documentElement.style.backgroundColor = '#ffffff';
              document.documentElement.style.colorScheme = 'light';
              
              // Periodically check and force light mode
              setInterval(function() {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                document.documentElement.style.colorScheme = 'light';
                document.documentElement.style.filter = 'none';
                document.documentElement.style.backgroundColor = '#ffffff';
                
                // Remove Dark Reader attributes if they exist
                if (document.documentElement.hasAttribute('data-darkreader-mode')) {
                  document.documentElement.removeAttribute('data-darkreader-mode');
                }
                if (document.documentElement.hasAttribute('data-darkreader-scheme')) {
                  document.documentElement.removeAttribute('data-darkreader-scheme');
                }
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
