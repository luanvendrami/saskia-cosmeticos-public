"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CarrosselImagens({
  imageUrl,
  backupImageUrl,
  alt = "Imagem de novidade",
  category,
}: {
  imageUrl: string;
  backupImageUrl?: string;
  alt?: string;
  category?: string;
}) {
  // Check if the file is a video by extension
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(imageUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    // Log for debugging
    if (isVideo) {
      console.log("Attempting to load video:", imageUrl);
    }
  }, [isVideo, imageUrl]);

  // Set up intersection observer to detect when video is visible
  useEffect(() => {
    if (!isVideo || !containerRef.current) return;

    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5, // 50% of the element must be visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // When the video becomes visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            // Reset the video to the beginning and play
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
          // Add a slight delay before showing the button for a nice effect
          setTimeout(() => {
            setButtonVisible(true);
          }, 300);
        } else {
          setIsVisible(false);
          setButtonVisible(false);
          // Optionally pause when not visible
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      });
    }, options);

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isVideo]);

  // Simulate button animation when non-video slide becomes visible
  useEffect(() => {
    if (!isVideo && containerRef.current) {
      // Check if element is in viewport when mounted
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Add a slight delay before showing the button
            setTimeout(() => {
              setButtonVisible(true);
            }, 300);
          } else {
            setButtonVisible(false);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [isVideo]);

  const handleVideoError = () => {
    console.error("Error loading video:", imageUrl);
    setVideoError(true);
  };

  // Use the provided backup image or a generic fallback
  const fallbackImage = backupImageUrl || "/images/6fs55eT.jpeg";

  // Format the category name for display (capitalize first letter)
  const formatCategoryName = (name?: string) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .button-animate-in {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .button-animate-out {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
      `}</style>

      {isVideo && !videoError ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay={isVisible}
          muted
          loop
          playsInline
          onError={handleVideoError}
        >
          <source src={imageUrl} type={`video/${imageUrl.split(".").pop()}`} />
          Seu navegador não suporta vídeos HTML5.
        </video>
      ) : (
        <Image
          src={videoError ? fallbackImage : imageUrl}
          alt={videoError ? "Erro ao carregar o vídeo" : alt}
          fill
          className="object-cover"
          priority={true}
          onError={() => {
            console.warn("Image failed to load:", imageUrl);
          }}
        />
      )}

      {/* Category button - only show if category exists and is not empty */}
      {category && category.trim() !== "" && (
        <div
          className={`absolute bottom-6 left-0 right-0 flex justify-center ${
            buttonVisible ? "button-animate-in" : "button-animate-out"
          }`}
        >
          <Link
            href={`/${category}`}
            className="px-2 py-2 bg-[#ff69b4] hover:bg-[#ff69b4] text-white rounded-lg font-medium shadow-lg transition-all duration-300 text-center flex items-center justify-center transform hover:scale-105"
          >
            <span className="mr-1">Ver produtos para </span>{" "}
            {formatCategoryName(category)}
          </Link>
        </div>
      )}
    </div>
  );
}
