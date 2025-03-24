import React from "react";

export const metadata = {
  title: "Cart Page | Saskia Cosmetics",
  description: "Manage and checkout your shopping cart at Saskia Cosmetics",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--primary-light)]">
      <main className="container mx-auto py-8 px-4">{children}</main>
    </div>
  );
}
