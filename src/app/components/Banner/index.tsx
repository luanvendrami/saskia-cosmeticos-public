"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface BannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

/**
 * Banner component for promotional content
 * Uses our CSS variables and utility classes
 */
export default function Banner({
  title,
  subtitle,
  ctaText,
  ctaLink,
  variant = "primary",
  size = "medium",
}: BannerProps) {
  // Determine padding based on size
  const paddingClass = {
    small: "p-4",
    medium: "p-6 md:p-8",
    large: "p-8 md:p-12",
  }[size];

  // Determine background color based on variant
  const bgColorClass = {
    primary: "bg-[var(--primary-light)]",
    secondary: "bg-[var(--secondary-light)]",
  }[variant];

  // Determine text color based on variant
  const titleColorClass = {
    primary: "text-[var(--primary-dark)]",
    secondary: "text-[var(--secondary-dark)]",
  }[variant];

  // Determine button class based on variant
  const buttonClass = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
  }[variant];

  return (
    <div className={`card ${bgColorClass} ${paddingClass} mb-4 fade-in`}>
      <div className="text-center md:text-left">
        <h2
          className={`${titleColorClass} text-2xl md:text-3xl font-bold mb-2`}
        >
          {title}
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">{subtitle}</p>
        <Link
          href={ctaLink}
          className={`${buttonClass} inline-flex items-center justify-center`}
        >
          {ctaText}
          <FiArrowRight className="ml-2" suppressHydrationWarning />
        </Link>
      </div>
    </div>
  );
}
