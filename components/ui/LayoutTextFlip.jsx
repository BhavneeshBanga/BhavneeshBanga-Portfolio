"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Engineering",
  words = ["Autonomous Agents", "Intelligent Systems", "Scalable Architectures", "High-Performance RAG"],
  duration = 2800,
  className = "",
  badgeClassName = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className={cn("layout-text-flip-wrapper", className)}>
      <motion.span
        layoutId="subtext"
        className="layout-text-lead"
      >
        {text}
      </motion.span>{" "}
      <motion.span
        layout
        className={cn("layout-text-badge", badgeClassName)}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -30, filter: "blur(8px)", opacity: 0 }}
            animate={{
              y: 0,
              filter: "blur(0px)",
              opacity: 1,
            }}
            exit={{ y: 35, filter: "blur(8px)", opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="layout-text-word"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
};

export default LayoutTextFlip;
