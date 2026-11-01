"use client";

import { motion } from "framer-motion";

export function ScrollReveal({
  children,
  direction = "up", // 'up' | 'down' | 'left' | 'right' | 'none'
  delay = 0,
  duration = 0.75,
  blur = true,
  distance = 50,
  scale = 0.96,
  className = "",
  style = {},
  viewport = { once: true, amount: 0.15, margin: "0px 0px -40px 0px" },
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -distance, y: 0 };
      case "right":
        return { x: distance, y: 0 };
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialPos.x,
        y: initialPos.y,
        scale: scale,
        filter: blur ? "blur(12px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // easeOutQuint
      }}
      className={className}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
