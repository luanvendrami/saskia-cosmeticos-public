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
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the video and prepare it
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    // Log for debugging
    console.log("Setting up video:", imageUrl);

    // Preload the video
    videoRef.current.load();

    // Set up event listeners for the video
    const videoElement = videoRef.current;

    const handleCanPlay = () => {
      setIsLoaded(true);
      console.log("Video can play now:", imageUrl);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && videoElement) {
        // When tab becomes visible, reset and play video
        videoElement.currentTime = 0;
        videoElement
          .play()
          .catch((e) => console.warn("Couldn't play video:", e));
      }
    };

    // Listen for when the video is ready to play
    videoElement.addEventListener("canplay", handleCanPlay);

    // Handle tab visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      videoElement.removeEventListener("canplay", handleCanPlay);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isVideo, imageUrl]);

  const handleVideoError = () => {
    console.error("Error loading video:", imageUrl);
    setVideoError(true);
  };

  // Use the provided backup image or a generic fallback
  const fallbackImage = backupImageUrl || "/images/6fs55eT.jpeg";

  return (
    <div ref={containerRef} className="relative w-full h-full aspect-square">
      {isVideo && !videoError ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
