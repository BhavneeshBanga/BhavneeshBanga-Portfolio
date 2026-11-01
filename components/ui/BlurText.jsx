"use client";

import { motion } from "framer-motion";

export function BlurText({
  children,
  as: Component = "div",
  delay = 0,
  duration = 0.8,
  y = 18,
  className = "",
  style = {},
  viewport = { once: true, amount: 0.2 },
}) {
  const MotionComponent = motion.create ? motion.create(Component) : motion[Component] || motion.div;

  return (
    <MotionComponent
      initial={{
        opacity: 0,
        filter: "blur(12px)",
        y,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutCubic
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
}

export default BlurText;
