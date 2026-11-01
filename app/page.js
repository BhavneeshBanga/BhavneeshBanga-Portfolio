"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import ParticleHero from "@/components/ParticleHero";
import { MorphingText } from "@/components/ui/MorphingText";
import { LayoutTextFlip } from "@/components/ui/LayoutTextFlip";
import { Highlighter } from "@/components/ui/Highlighter";
import { GlowCard } from "@/components/ui/SpotlightCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BlurText } from "@/components/ui/BlurText";
const MORPH_TEXTS = [
  "Autonomous Agentic Architect",
  "Full-Stack AI Developer",
  "Production RAG Specialist",
  "450+ LeetCode DSA Solver",
  "Creator of BhavAI",
];

const FLIP_WORDS = [
  "Autonomous ReAct Agents",
  "Custom Vector RAG Pipelines",
  "High-Performance Full-Stack Systems",
  "Low-Latency Reverse Engineering",
  "Sandboxed Execution Engines",
];

const STATS = [
  {
    number: "450+",
    label: "DSA Problems Solved",
    sub: "LeetCode, Codeforces, SPOJ, HackerEarth",
    glow: "blue",
  },
  {
    number: "8.19",
    label: "B.Tech CSE CGPA",
    sub: "CGC Landran (2024–2028) • 93.8% Intermediate",
    glow: "cyan",
  },
  {
    number: "45+",
    label: "Certificates Earned",
    sub: "Data Science, ML & LLM Fundamentals",
    glow: "purple",
  },
  {
    number: "0-Dep",
    label: "First-Principles AI",
    sub: "Custom ReAct agents without LangChain/LangGraph",
    glow: "green",
  },
];

const SKILL_CATEGORIES = [
  {
    title: "Core & Algorithms",
    glow: "blue",
    description: "Deep theoretical foundation in algorithms, systems, and memory efficiency.",
    skills: [
      "Data Structures & Algorithms",
      "C++",
      "System Design",
      "Operating Systems",
      "Computer Networks",
      "DBMS",
      "Object-Oriented Design (OOP)",
    ],
  },
  {
    title: "AI & Agentic Systems",
    glow: "purple",
    description: "Autonomous agents, planning loops, and semantic retrieval from first principles.",
    skills: [
      "Python",
      "LLM Orchestration",
      "ReAct Framework",
      "End-to-End RAG",
      "Vector Embeddings",
      "FastAPI",
      "Sandboxing & Guardrails",
      "Prompt Architecture",
    ],
  },
  {
    title: "Frontend Engineering",
    glow: "cyan",
    description: "Modern, responsive, high-performance web applications with kinetic animations.",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5 Canvas",
      "Framer Motion",
      "State Management",
    ],
  },
  {
    title: "Backend & Infrastructure",
    glow: "green",
    description: "Scalable backend services, relational/document storage, and continuous deployment.",
    skills: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "RESTful APIs",
      "Git & GitHub",
      "Vercel Deployment",
    ],
  },
];

const CAPABILITIES = [
  {
    title: "Autonomous Agentic Engineering",
    glow: "purple",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    description:
      "Design and deploy production-ready autonomous ReAct agents capable of step-by-step reasoning, dynamic tool selection, safe file execution, and self-correction without relying on bloated abstractions.",
  },
  {
    title: "Custom RAG & Semantic Retrieval",
    glow: "blue",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    description:
      "Construct end-to-end Retrieval-Augmented Generation pipelines from scratch. Implementing custom document chunking, dense vector embeddings, hybrid semantic lookup, and precise context-injected generation.",
  },
  {
    title: "Full-Stack Web Architectures",
    glow: "cyan",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    description:
      "Architect resilient full-stack applications with Next.js, Node.js, and FastAPI. Integrating production payment gateways (Razorpay), user authentication, bank payouts, and modern kinetic interfaces.",
  },
  {
    title: "Algorithmic & Systems Optimization",
    glow: "orange",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    description:
      "Solve intricate engineering bottlenecks with algorithmic rigor. Reverse-engineer legacy application layers, replace redundant sequential queries with batch concurrencies, and reduce latency drastically.",
  },
];

const PROJECTS = [
  {
    title: "BhavAI: Sandboxed CLI Agentic Tool",
    badge: "Flagship Agent",
    glow: "purple",
    desc: "Production-ready AI terminal assistant using the ReAct framework with autonomous planning and execution capabilities.",
    points: [
      "Engineered a secure sandbox with workspace isolation, path validation, command blocklists, and zero-deletion safeguards.",
      "Developed a modular CLI architecture with Gitignore-aware context generation, Rich terminal UI, and dynamic tool orchestration.",
      "Built entirely from scratch without using LangChain or LangGraph, giving full transparency and maximum speed.",
    ],
    tags: ["Python", "FastAPI", "ReAct Framework", "LLM Orchestration", "Rich CLI", "Security Sandbox"],
    github: "https://github.com/BhavneeshBanga/Bhavai-terminal-edition",
  },
  {
    title: "BhavAI: Telegram Edition",
    badge: "Multi-Agent Bot",
    glow: "blue",
    desc: "Remote AI assistant interface enabling multi-agent orchestration and safe command execution directly via chat.",
    points: [
      "Extended BhavAI into a full Telegram bot interface for remote access to AI workflows from any device.",
      "Implemented multi-agent orchestration and LLM-based command dispatching via Telegram messages.",
      "Integrated secure sandboxing and stateful session management to support safe remote code and file actions.",
    ],
    tags: ["Python", "Telegram Bot API", "FastAPI", "Multi-Agent Orchestration", "Session Manager"],
    github: "https://github.com/BhavneeshBanga",
  },
  {
    title: "Custom End-to-End RAG Pipeline",
    badge: "First-Principles AI",
    glow: "cyan",
    desc: "Zero-framework Retrieval-Augmented Generation architecture built from the ground up for high-precision knowledge grounding.",
    points: [
      "Engineered custom document ingestion, token-aware chunking, vector embeddings, and storage.",
      "Implemented dense semantic retrieval with re-ranking and context-injected prompting to eliminate hallucinations.",
      "Designed for extreme modularity, allowing drop-in swapping of embedding models and vector databases.",
    ],
    tags: ["Python", "Vector DB", "Embeddings", "Semantic Search", "LLM Grounding", "RAG"],
    github: "https://github.com/BhavneeshBanga",
  },
  {
    title: "Reverse-Engineered Live Bus Tracking",
    badge: "Low-Latency Optimization",
    glow: "orange",
    desc: "Reverse-engineered and restructured a live transit application to eliminate massive sequential query delays.",
    points: [
      "Identified and dismantled bottleneck where the original app queried buses one-by-one with 5-15s captcha delays.",
      "Implemented automated batch querying across all bus fleets concurrently in a single algorithmic loop.",
      "Reduced user lookup wait time by 20 minutes per commute, transforming user experience.",
    ],
    tags: ["Flutter", "Dart", "Reverse Engineering", "Low-Latency", "API Optimization"],
    github: "https://github.com/BhavneeshBanga",
  },
  {
    title: "Get Me a Chai: Creator Patronage Platform",
    badge: "Full-Stack Monetization",
    glow: "green",
    desc: "Full-stack creator monetization platform enabling creators to showcase projects and receive financial support directly.",
    points: [
      "Integrated Razorpay Payment Gateway for seamless, secure transactions and automated creator payouts.",
      "Engineered creator onboarding flows, bank detail management, and backend database schemas.",
      "Designed an intuitive, responsive user experience tailored for both creators and their supporters.",
    ],
    tags: ["Next.js", "React.js", "Node.js", "MongoDB", "Razorpay Gateway", "Tailwind CSS"],
    github: "https://github.com/BhavneeshBanga",
  },
];

const TIMELINE = [
  {
    title: "Bachelor of Technology in Computer Science & Engineering",
    org: "Chandigarh Group of Colleges (CGC), Landran, Punjab",
    date: "Jul 2024 – Jul 2028",
    glow: "blue",
    content:
      "Current CGPA: 8.19 / 10.0. Core focus on Data Structures & Algorithms, Operating Systems, Computer Networks, Database Management Systems, and Object-Oriented Software Design.",
  },
  {
    title: "Intermediate & Matriculation (PSEB)",
    org: "Punjab School Education Board",
    date: "2022 – 2023",
    glow: "cyan",
    content:
      "Class 10th: 10 CGPA | Intermediate Percentage: 93.8%. Strong mathematical and analytical foundation.",
  },
  {
    title: "Competitive Programming & Problem Solving",
    org: "LeetCode • Codeforces • SPOJ • HackerEarth",
    date: "Continuous Practice",
    glow: "purple",
    content:
      "Solved 450+ algorithmic and data structure problems with emphasis on time and space complexity, dynamic programming, graphs, and system modeling.",
  },
  {
    title: "Data Science with Python & Machine Learning",
    org: "CodeWithHarry & 45+ Verified Professional Certifications",
    date: "Completed",
    glow: "green",
    content:
      "Deep dive into Machine Learning algorithms, statistical modeling, LLM fundamentals, and Python software engineering.",
  },
];

export default function Home() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2200);
  };

  return (
    <main>
      <Nav />
      <ParticleHero />

      {/* Morphing Role Banner */}
      <section className="py-12 px-6 border-t border-[#171720] bg-[#070709] relative overflow-hidden">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "1rem 0" }}>
          <BlurText
            as="p"
            delay={0.1}
            style={{
              textAlign: "center",
              fontSize: "0.82rem",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "#8fa6ff",
              marginBottom: "1rem",
              fontWeight: 600,
            }}
          >
            Engineering Capabilities
          </BlurText>
          <ScrollReveal direction="up" delay={0.2} blur={true}>
            <MorphingText texts={MORPH_TEXTS} />
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="sec">
        <div className="sec-header">
          <BlurText as="span" delay={0.05} className="sec-tag">
            About Bhavneesh
          </BlurText>
          <BlurText as="h2" delay={0.15}>
            Bridging{" "}
            <Highlighter action="highlight" color="rgba(143, 166, 255, 0.28)">
              Algorithms
            </Highlighter>{" "}
            and{" "}
            <Highlighter action="underline" color="#8fa6ff">
              Intelligent Systems
            </Highlighter>
          </BlurText>

          <LayoutTextFlip
            text="Specialized in building"
            words={FLIP_WORDS}
            duration={2700}
          />

          <BlurText as="p" delay={0.2} className="sec-desc">
            Product-minded Computer Science undergraduate at Chandigarh Group of Colleges (CGPA: 8.19 / 10.0) with a
            rigorous foundation in Data Structures &amp; Algorithms and core engineering principles (Operating Systems,
            Computer Networks, DBMS, OOP).
          </BlurText>
          <BlurText as="p" delay={0.25} className="sec-desc" style={{ marginTop: "1rem" }}>
            I bridge theoretical computer science and practical product engineering, constructing scalable full-stack
            applications, intelligent multi-agent systems, and zero-framework RAG pipelines. Driven by first principles,
            I avoid opaque wrappers to build transparent, high-performance software.
          </BlurText>
        </div>

        {/* Highlight Stats */}
        <div className="grid-4">
          {STATS.map((stat, idx) => {
            const dir = idx === 0 ? "left" : idx === 3 ? "right" : "up";
            return (
              <ScrollReveal key={idx} direction={dir} delay={0.1 * idx} blur={true}>
                <GlowCard glowColor={stat.glow} showPixels={true}>
                  <div className="stat-card">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-sub">{stat.sub}</div>
                  </div>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="sec" style={{ background: "#060608" }}>
        <div className="sec-header">
          <BlurText as="span" delay={0.05} className="sec-tag">
            Technical Mastery
          </BlurText>
          <BlurText as="h2" delay={0.15}>
            Engineered from{" "}
            <Highlighter action="box" color="rgba(56, 189, 248, 0.35)">
              Core Principles
            </Highlighter>
          </BlurText>
          <BlurText as="p" delay={0.25} className="sec-desc">
            A comprehensive engineering repertoire spanning low-level system fundamentals, algorithmic problem solving,
            modern reactive frontends, and intelligent autonomous AI agents.
          </BlurText>
        </div>

        <div className="grid-2">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const dir = idx % 2 === 0 ? "left" : "right";
            return (
              <ScrollReveal key={idx} direction={dir} delay={0.12 * (idx % 2)} blur={true}>
                <GlowCard glowColor={cat.glow} showPixels={true}>
                  <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "1rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>
                        {cat.title}
                      </h3>
                      <p style={{ fontSize: "0.88rem", color: "#9c9ca8", lineHeight: 1.5 }}>
                        {cat.description}
                      </p>
                    </div>
                    <div className="tag-list" style={{ borderTop: "none", paddingTop: "0.5rem" }}>
                      {cat.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="tag" style={{ color: "#e2e2ec" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="sec">
        <div className="sec-header">
          <BlurText as="span" delay={0.05} className="sec-tag">
            Core Capabilities
          </BlurText>
          <BlurText as="h2" delay={0.15}>
            What I Can Build &amp;{" "}
            <Highlighter action="highlight" color="rgba(168, 85, 247, 0.28)">
              Scale
            </Highlighter>
          </BlurText>
          <BlurText as="p" delay={0.25} className="sec-desc">
            Combining algorithmic precision, modern frameworks, and autonomous intelligence to build real, impactful software.
          </BlurText>
        </div>

        <div className="grid-2">
          {CAPABILITIES.map((cap, idx) => {
            const dir = idx % 2 === 0 ? "left" : "right";
            return (
              <ScrollReveal key={idx} direction={dir} delay={0.12 * (idx % 2)} blur={true}>
                <GlowCard glowColor={cap.glow} showPixels={true}>
                  <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        background: "rgba(143, 166, 255, 0.08)",
                        border: "1px solid rgba(143, 166, 255, 0.2)",
                        color: "#8fa6ff",
                        flexShrink: 0,
                      }}
                    >
                      {cap.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.22rem", fontWeight: 700, color: "#fff", marginBottom: "0.6rem" }}>
                        {cap.title}
                      </h3>
                      <p style={{ fontSize: "0.92rem", color: "#a5a5b2", lineHeight: 1.6 }}>
                        {cap.description}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="sec" style={{ background: "#060608" }}>
        <div className="sec-header">
          <BlurText as="span" delay={0.05} className="sec-tag">
            Portfolio Showcase
          </BlurText>
          <BlurText as="h2" delay={0.15}>
            Featured{" "}
            <Highlighter action="underline" color="#8fa6ff">
              Engineering Projects
            </Highlighter>
          </BlurText>
          <BlurText as="p" delay={0.25} className="sec-desc">
            Production-grade autonomous AI tooling, first-principles RAG architectures, low-latency optimizations, and
            full-stack creator platforms.
          </BlurText>
        </div>

        <div className="grid-2">
          {PROJECTS.map((proj, idx) => {
            const dir = idx === 4 ? "up" : idx % 2 === 0 ? "left" : "right";
            return (
              <ScrollReveal
                key={idx}
                direction={dir}
                delay={0.12 * (idx % 2)}
                blur={true}
                className={idx === 4 ? "md:col-span-2" : ""}
              >
                <GlowCard glowColor={proj.glow} showPixels={true}>
                  <div className="project-card">
                    <div className="project-top">
                      <div className="project-header-row">
                        <h3 className="project-title">{proj.title}</h3>
                        <span className="project-badge">{proj.badge}</span>
                      </div>
                      <p className="project-desc">{proj.desc}</p>
                      <ul className="project-points">
                        {proj.points.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="tag-list">
                        {proj.tags.map((t, tIdx) => (
                          <span key={tIdx} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>

                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-btn"
                        >
                          <span>Explore Repository</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Resume & Education Section */}
      <section id="resume" className="sec">
        <div className="sec-header">
          <BlurText as="span" delay={0.05} className="sec-tag">
            Background &amp; Credentials
          </BlurText>
          <BlurText as="h2" delay={0.15}>
            Education &amp;{" "}
            <Highlighter action="highlight" color="rgba(143, 166, 255, 0.25)">
              Milestones
            </Highlighter>
          </BlurText>
          <BlurText as="p" delay={0.25} className="sec-desc">
            Academic credentials, competitive programming dedication, and professional certifications.
          </BlurText>
        </div>

        <div className="timeline">
          {TIMELINE.map((item, idx) => {
            const dir = idx % 2 === 0 ? "left" : "right";
            return (
              <ScrollReveal key={idx} direction={dir} delay={0.12} blur={true}>
                <GlowCard glowColor={item.glow} showPixels={true}>
                  <div className="timeline-item">
                    <div className="timeline-meta">
                      <h3 className="timeline-title">{item.title}</h3>
                      <span className="timeline-date">{item.date}</span>
                    </div>
                    <div className="timeline-org">{item.org}</div>
                    <p className="timeline-content">{item.content}</p>
                  </div>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="sec" style={{ background: "#060608" }}>
        <div className="sec-header">
          <BlurText as="span" delay={0.05} className="sec-tag">
            Start a Conversation
          </BlurText>
          <BlurText as="h2" delay={0.15}>
            Let&apos;s Build{" "}
            <Highlighter action="box" color="rgba(143, 166, 255, 0.4)">
              Next-Gen Software
            </Highlighter>
          </BlurText>
          <BlurText as="p" delay={0.25} className="sec-desc">
            Looking for a passionate, product-minded Full-Stack &amp; AI Developer ready to deliver high-impact software?
            Reach out via email, phone, or direct socials.
          </BlurText>
        </div>

        <div className="contact-grid">
          <ScrollReveal direction="left" delay={0.1} blur={true}>
            <GlowCard glowColor="blue" showPixels={true}>
              <div className="contact-card">
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-title ">Email</div>
                <a href="mailto:bhavibanga505@gmail.com" className="contact-value">
                  bhavibanga505@gmail.com
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard("bhavibanga505@gmail.com", "email")}
                  className="pill"
                  style={{ padding: "8px 16px", fontSize: "0.82rem", marginTop: "0.5rem", width: "fit-content" }}
                >
                  {copied === "email" ? "Copied!" : "Copy Email"}
                </button>
              </div>
            </GlowCard>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} blur={true}>
            <GlowCard glowColor="cyan" showPixels={true}>
              <div className="contact-card">
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-title">Phone</div>
                <a href="tel:+917973054047" className="contact-value">
                  +91 7973054047
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard("+91 7973054047", "phone")}
                  className="pill"
                  style={{ padding: "8px 16px", fontSize: "0.82rem", marginTop: "0.5rem", width: "fit-content" }}
                >
                  {copied === "phone" ? "Copied!" : "Copy Phone"}
                </button>
              </div>
            </GlowCard>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3} blur={true}>
            <GlowCard glowColor="purple" showPixels={true}>
              <div className="contact-card">
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-title">Location &amp; Profiles</div>
                <p className="contact-value">Sirhind, Punjab, India</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem", flexWrap: "wrap" }}>
                  <a
                    href="https://github.com/BhavneeshBanga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill"
                    style={{ padding: "8px 14px", fontSize: "0.82rem" }}
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://linkedin.com/in/bhavneesh-banga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill"
                    style={{ padding: "8px 14px", fontSize: "0.82rem" }}
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </GlowCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="logo-group">
            <span className="logo">Bhavneesh Banga</span>
            <span className="logo-tag">Portfolio</span>
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <a href="#home" className="tag" style={{ color: "#d8d8de" }}>Home</a>
            <a href="#about" className="tag" style={{ color: "#d8d8de" }}>About</a>
            <a href="#stack" className="tag" style={{ color: "#d8d8de" }}>Stack</a>
            <a href="#projects" className="tag" style={{ color: "#d8d8de" }}>Projects</a>
            <a href="#resume" className="tag" style={{ color: "#d8d8de" }}>Resume</a>
            <a href="#contact" className="tag" style={{ color: "#d8d8de" }}>Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Bhavneesh Banga. All rights reserved.</p>
          <p>Full-Stack AI Developer • Engineered with First-Principles Precision</p>
        </div>
      </footer>
    </main>
  );
}
