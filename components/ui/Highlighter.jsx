"use client";

import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";

export function Highlighter({
  children,
  action = "highlight",
  color = "#8fa6ff33",
  strokeWidth = 2,
  animationDuration = 900,
  iterations = 2,
  padding = 3,
  multiline = true,
  className = "",
}) {
  const elementRef = useRef(null);
  const annotationRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const annotation = annotate(element, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    });

    annotationRef.current = annotation;

    // Use IntersectionObserver to trigger when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          annotation.show();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (annotationRef.current) {
        annotationRef.current.remove();
      }
    };
  }, [action, color, strokeWidth, animationDuration, iterations, padding, multiline]);

  return (
    <span
      ref={elementRef}
      className={`inline-block relative ${className}`}
      style={{ display: "inline-block" }}
    >
      {children}
    </span>
  );
}

export default Highlighter;
