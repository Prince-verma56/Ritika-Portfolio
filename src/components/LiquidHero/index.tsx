"use client";
import { useRef, useEffect, useState } from "react";
import { useFluidSim } from "./useFluidSim";

type LiquidHeroProps = {
  imageUrl?: string;
  videoUrl?: string;
  strength?: number;
  brushRadius?: number;
  dissipation?: number;
  children?: React.ReactNode;
};

export default function LiquidHero({
  imageUrl,
  videoUrl,
  strength = 0.12,
  brushRadius = 0.18,
  dissipation = 0.97,
  children,
}: LiquidHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);

  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseCoordsRef = useRef({ x: 0, y: 0 });
  const currentCoordsRef = useRef({ x: 0, y: 0 });
  const isPressedRef = useRef(false);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      setVideoEl(videoRef.current);
    }
  }, [videoUrl]);

  useFluidSim({
    canvasRef,
    imageUrl: videoUrl ? undefined : imageUrl,
    videoEl,
    strength,
    brushRadius,
    dissipation,
  });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    let animId: number;
    const updateCursor = () => {
      const targetX = mouseCoordsRef.current.x;
      const targetY = mouseCoordsRef.current.y;

      // LERP outer circle
      currentCoordsRef.current.x += (targetX - currentCoordsRef.current.x) * 0.16;
      currentCoordsRef.current.y += (targetY - currentCoordsRef.current.y) * 0.16;

      if (cursorOuterRef.current) {
        const dx = targetX - currentCoordsRef.current.x;
        const dy = targetY - currentCoordsRef.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        
        // Stretch based on speed and angle
        const stretch = Math.min(1.5, 1.0 + speed * 0.015);
        const rotate = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Scale up on click
        const scale = isPressedRef.current ? 1.8 : 1.0;

        cursorOuterRef.current.style.transform = `translate3d(${currentCoordsRef.current.x}px, ${currentCoordsRef.current.y}px, 0) scale(${scale}) scaleX(${stretch}) rotate(${rotate}deg)`;
      }

      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      animId = requestAnimationFrame(updateCursor);
    };

    updateCursor();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseCoordsRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    mouseCoordsRef.current = { x: e.clientX, y: e.clientY };
    currentCoordsRef.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black cursor-none select-none"
      onMouseMove={handleMouseMove}
      onMouseDown={() => {
        isPressedRef.current = true;
        setIsPressed(true);
      }}
      onMouseUp={() => {
        isPressedRef.current = false;
        setIsPressed(false);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        setIsHovered(false);
        isPressedRef.current = false;
        setIsPressed(false);
      }}
    >
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute opacity-0 pointer-events-none"
          style={{ width: 1, height: 1 }}
        />
      )}

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* Custom interactive cursor */}
      {!isTouch && (
        <>
          <div
            ref={cursorOuterRef}
            className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-white/60 bg-white/5 backdrop-blur-[1px] -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-difference"
            style={{
              width: "36px",
              height: "36px",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.2s ease, border-color 0.2s ease",
            }}
          />
          <div
            ref={cursorInnerRef}
            className="pointer-events-none fixed top-0 left-0 z-50 w-2 h-2 rounded-full bg-white -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-difference"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          />
        </>
      )}

      {/* Overlay content (nav, headline, CTA etc.) */}
      <div className="relative z-10 flex flex-col items-start justify-end h-full p-8 md:p-16 pointer-events-none select-none">
        {children}
      </div>
    </section>
  );
}
