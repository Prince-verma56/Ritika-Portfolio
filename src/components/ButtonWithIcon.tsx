import React from 'react';
import Link from 'next/link';

interface ButtonWithIconProps {
  label: string;
  href: string;
  type?: 'orange-gradient' | 'black-stroke'; // Added black stroke for later use
  icon?: React.ReactNode;
}

export default function ButtonWithIcon({ label, href, type = 'orange-gradient' }: ButtonWithIconProps) {
  // Arrow icon used in the reference
  const ArrowIcon = (
    <span className="text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5">
      ↗
    </span>
  );

  return (
    <Link href={href} className="group relative flex-shrink-0 w-fit">
      {/* Button Content */}
      <div className="relative flex items-center justify-center gap-3 bg-[#f04e00] group-hover:bg-[#ff5a1a] px-8 md:px-12 py-4 md:py-5 rounded-full transition-colors duration-300 shadow-2xl shadow-[#f04e00]/20 pointer-events-auto">
        <span className="text-white text-base md:text-lg font-extrabold uppercase tracking-widest leading-none">
          {label}
        </span>
        {ArrowIcon}
      </div>
      
      {/* Subtle border outline as seen in Screenshot 2026-06-05 040604.png */}
      <div className="absolute inset-0 border border-white/10 rounded-full scale-[1.05]" />
    </Link>
  );
}
