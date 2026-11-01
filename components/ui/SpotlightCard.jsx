"use client";

import React, { useEffect, useRef, useState } from "react";
import PixelCanvas from "./PixelCanvas";

export const glowColorMap = {
  multicolor: {
    base: 220,
    hue: 260,
    spread: 280,
    hex: "#38bdf8",
    borderGradient:
      "radial-gradient(320px circle at var(--local-x, 50%) var(--local-y, 50%), #38bdf8 0%, #818cf8 28%, #c084fc 55%, #f472b6 80%, transparent 100%)",
    outerGradient:
      "radial-gradient(380px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(56, 189, 248, 0.45) 0%, rgba(129, 140, 248, 0.4) 30%, rgba(192, 132, 252, 0.35) 60%, rgba(244, 114, 182, 0.25) 85%, transparent 100%)",
    bgGradient:
      "radial-gradient(400px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(56, 189, 248, 0.14) 0%, rgba(192, 132, 252, 0.1) 45%, rgba(244, 114, 182, 0.05) 75%, transparent 100%)",
    shadow:
      "0 25px 55px -12px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(56, 189, 248, 0.35), 0 0 45px -8px rgba(168, 85, 247, 0.35), 0 0 30px -5px rgba(244, 114, 182, 0.25)",
    pixels: ["#38bdf8", "#818cf8", "#a855f7", "#ec4899", "#34d399", "#fbbf24"],
  },
  blue: {
    base: 215,
    hue: 215,
    spread: 200,
    hex: "#38bdf8",
    borderGradient:
      "radial-gradient(320px circle at var(--local-x, 50%) var(--local-y, 50%), #38bdf8 0%, #60a5fa 30%, #818cf8 60%, #c084fc 85%, transparent 100%)",
    outerGradient:
      "radial-gradient(380px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(56, 189, 248, 0.45) 0%, rgba(96, 165, 250, 0.35) 40%, rgba(129, 140, 248, 0.3) 70%, transparent 100%)",
    bgGradient:
      "radial-gradient(400px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(56, 189, 248, 0.14) 0%, rgba(129, 140, 248, 0.08) 50%, transparent 80%)",
    shadow:
      "0 25px 55px -12px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(56, 189, 248, 0.35), 0 0 40px -8px rgba(129, 140, 248, 0.3), 0 0 25px -5px rgba(192, 132, 252, 0.2)",
    pixels: ["#0284c7", "#38bdf8", "#818cf8", "#c084fc", "#67e8f9"],
  },
  purple: {
    base: 275,
    hue: 275,
    spread: 260,
    hex: "#a855f7",
    borderGradient:
      "radial-gradient(320px circle at var(--local-x, 50%) var(--local-y, 50%), #c084fc 0%, #a855f7 30%, #e879f9 60%, #38bdf8 85%, transparent 100%)",
    outerGradient:
      "radial-gradient(380px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(192, 132, 252, 0.45) 0%, rgba(168, 85, 247, 0.4) 40%, rgba(232, 121, 249, 0.3) 70%, transparent 100%)",
    bgGradient:
      "radial-gradient(400px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(168, 85, 247, 0.14) 0%, rgba(232, 121, 249, 0.08) 50%, transparent 80%)",
    shadow:
      "0 25px 55px -12px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(168, 85, 247, 0.35), 0 0 40px -8px rgba(236, 72, 153, 0.3), 0 0 25px -5px rgba(56, 189, 248, 0.2)",
    pixels: ["#7e22ce", "#a855f7", "#c084fc", "#e879f9", "#38bdf8"],
  },
  cyan: {
    base: 190,
    hue: 190,
    spread: 180,
    hex: "#06b6d4",
    borderGradient:
      "radial-gradient(320px circle at var(--local-x, 50%) var(--local-y, 50%), #06b6d4 0%, #22d3ee 30%, #38bdf8 60%, #818cf8 85%, transparent 100%)",
    outerGradient:
      "radial-gradient(380px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(6, 182, 212, 0.45) 0%, rgba(56, 189, 248, 0.4) 40%, rgba(129, 140, 248, 0.3) 70%, transparent 100%)",
    bgGradient:
      "radial-gradient(400px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(6, 182, 212, 0.14) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 80%)",
    shadow:
      "0 25px 55px -12px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(6, 182, 212, 0.35), 0 0 40px -8px rgba(56, 189, 248, 0.3), 0 0 25px -5px rgba(129, 140, 248, 0.2)",
    pixels: ["#0891b2", "#06b6d4", "#67e8f9", "#38bdf8", "#a5f3fc"],
  },
  green: {
    base: 145,
    hue: 145,
    spread: 200,
    hex: "#22c55e",
    borderGradient:
      "radial-gradient(320px circle at var(--local-x, 50%) var(--local-y, 50%), #34d399 0%, #10b981 30%, #06b6d4 60%, #38bdf8 85%, transparent 100%)",
    outerGradient:
      "radial-gradient(380px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(52, 211, 153, 0.45) 0%, rgba(16, 185, 129, 0.4) 40%, rgba(6, 182, 212, 0.3) 70%, transparent 100%)",
    bgGradient:
      "radial-gradient(400px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(16, 185, 129, 0.14) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 80%)",
    shadow:
      "0 25px 55px -12px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(16, 185, 129, 0.35), 0 0 40px -8px rgba(6, 182, 212, 0.3), 0 0 25px -5px rgba(56, 189, 248, 0.2)",
    pixels: ["#15803d", "#22c55e", "#86efac", "#34d399", "#38bdf8"],
  },
  orange: {
    base: 30,
    hue: 30,
    spread: 200,
    hex: "#f97316",
    borderGradient:
      "radial-gradient(320px circle at var(--local-x, 50%) var(--local-y, 50%), #fb923c 0%, #f97316 30%, #f43f5e 60%, #c084fc 85%, transparent 100%)",
    outerGradient:
      "radial-gradient(380px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(251, 146, 60, 0.45) 0%, rgba(249, 115, 22, 0.4) 40%, rgba(244, 63, 94, 0.3) 70%, transparent 100%)",
    bgGradient:
      "radial-gradient(400px circle at var(--local-x, 50%) var(--local-y, 50%), rgba(249, 115, 22, 0.14) 0%, rgba(244, 63, 94, 0.08) 50%, transparent 80%)",
    shadow:
      "0 25px 55px -12px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(249, 115, 22, 0.35), 0 0 40px -8px rgba(244, 63, 94, 0.3), 0 0 25px -5px rgba(192, 132, 252, 0.2)",
    pixels: ["#c2410c", "#f97316", "#fdba74", "#fb923c", "#f43f5e"],
  },
};

export const GlowCard = ({
  children,
  className = "",
  glowColor = "multicolor",
  size = "md",
  width,
  height,
  customSize = true,
  showPixels = true,
  onClick,
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = glowColorMap[glowColor] || glowColorMap.multicolor;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handlePointerMove = (e) => {
      const rect = card.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      card.style.setProperty("--local-x", `${localX.toFixed(1)}px`);
      card.style.setProperty("--local-y", `${localY.toFixed(1)}px`);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      card.style.setProperty("--spot-opacity", "1");
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      card.style.setProperty("--spot-opacity", "0");
    };

    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    card.style.setProperty("--local-x", "50%");
    card.style.setProperty("--local-y", "50%");
    card.style.setProperty("--spot-opacity", "0");

    return () => {
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const getInlineStyles = () => {
    const styles = {
      "--border-gradient": config.borderGradient,
      "--outer-gradient": config.outerGradient,
      "--bg-gradient": config.bgGradient,
      "--hover-shadow": config.shadow,
      position: "relative",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      backgroundColor: "rgba(11, 11, 16, 0.78)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      overflow: "hidden",
      transition: "border-color 0.25s ease, box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s ease",
    };

    if (width !== undefined) {
      styles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      styles.height = typeof height === "number" ? `${height}px` : height;
    }

    return styles;
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={getInlineStyles()}
      className={`glow-card-container ${className} ${isHovered ? "is-hovered" : ""}`}
    >
      {/* Outer atmospheric blur */}
      <div data-glow-outer aria-hidden="true" />

      {/* Dynamic mouse-following background glow */}
      <div data-glow-bg aria-hidden="true" />

      {/* Interactive pixel matrix */}
      {showPixels && (
        <PixelCanvas
          gap={10}
          speed={30}
          colors={config.pixels}
          noFocus
        />
      )}

      {/* Card Content */}
      <div className="glow-content relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export const SpotlightCard = GlowCard;
export default GlowCard;
