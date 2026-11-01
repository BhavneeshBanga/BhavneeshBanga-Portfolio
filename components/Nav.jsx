"use client";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "capabilities", label: "Capabilities" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) {
        bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
      setScrolled(y > 50);

      const line = window.innerHeight * 0.35;
      let cur = "home";
      for (const item of LINKS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) {
          cur = item.id;
        }
      }
      setActive(cur);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-group">
        <a href="#home" className="logo">
          Bhavneesh Banga
        </a>
        <span className="logo-tag">AI Engineer</span>
      </div>

      <nav aria-label="Primary Navigation">
        {LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "active" : ""}
          >
            {label}
          </a>
        ))}
      </nav>

      <a
        href="mailto:bhavibanga505@gmail.com"
        className="nav-cta"
        aria-label="Send Email"
      >
        <span>Get in touch</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>

      <div className="progress" ref={bar} />
    </header>
  );
}
