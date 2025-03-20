"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CarrosselImagens({
  imageUrl,
  backupImageUrl,
  alt = "Imagem de novidade",
}: {
  imageUrl: string;
  backupImageUrl?: string;
  alt?: string;
}) {
  // Check if the file is a video by extension
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(imageUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
        } else {
          setIsVisible(false);
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

  const handleVideoError = () => {
    console.error("Error loading video:", imageUrl);
    setVideoError(true);
  };

  // Use the provided backup image or a generic fallback
  const fallbackImage = backupImageUrl || "/images/6fs55eT.jpeg";

  return (
    <div ref={containerRef} className="relative w-full h-full">
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
    </div>
  );
}
