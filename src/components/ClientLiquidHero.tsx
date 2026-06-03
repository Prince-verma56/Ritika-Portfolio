"use client";
import dynamic from "next/dynamic";

const LiquidHero = dynamic(() => import("./LiquidHero"), {
  ssr: false,
});

export default function ClientLiquidHero({
  imageUrl,
  videoUrl,
  strength,
  brushRadius,
  dissipation,
  children,
}: {
  imageUrl?: string;
  videoUrl?: string;
  strength?: number;
  brushRadius?: number;
  dissipation?: number;
  children?: React.ReactNode;
}) {
  return (
    <LiquidHero
      imageUrl={imageUrl}
      videoUrl={videoUrl}
      strength={strength}
      brushRadius={brushRadius}
      dissipation={dissipation}
    >
      {children}
    </LiquidHero>
  );
}
