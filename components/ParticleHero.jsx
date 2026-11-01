"use client";
import { useEffect, useRef } from "react";

/* ---- particle hero settings ---- */
const CFG = {
  image: "/Bhavneesh.png",
  title: "BHAVNEESH",
  step: 2.5,          // px between samples
  mobileStep: 3.3,
  skip: 0,            // random thinning
  mobileSkip: 0.05,
  keepDark: 0.2,      // min density in shadows
  fill: 0.92,         // particle size as fraction of step
  mono: true,         // cool silver/blue grade
  repelRadius: 85,
  repelForce: 1.9,
  swirl: 0.55,        // sideways push around cursor
  parallax: 10,       // px of depth shift following mouse
  wobble: 0.75,       // idle vibration amplitude
  wobbleNoise: 1.4,
  wobbleSpeed: 0.04,
  waves: 8,
  waveDelay: 80,
  dust: 90,
};

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const loadImg = (src) =>
  new Promise((res) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => res(null);
    i.src = src;
  });

export default function ParticleHero() {
  const heroRef = useRef(null);
  const cvRef = useRef(null);
  const haloRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = cvRef.current;
    const halo = haloRef.current;
    if (!hero || !canvas || !halo) return;

    const ctx = canvas.getContext("2d");
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const letters = titleRef.current ? [...titleRef.current.children] : [];

    let W = 0, H = 0, buckets = [], dust = [], parts = [], img = null;
    let scroll = 0, mx = -9999, my = -9999, pxs = 0, pys = 0, raf = 0, dead = false, run = 0;

    const pulse = () => {
      if (!halo) return;
      halo.classList.remove("pulse");
      void halo.offsetWidth;
      halo.classList.add("pulse");
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const sample = () => {
      if (!img) return [];
      const mobile = W < 768;
      const ph = mobile ? Math.min(H * 0.66, 520) : Math.min(H * 0.84, 780);
      const pw = (img.naturalWidth / img.naturalHeight) * ph;
      const step = mobile ? CFG.mobileStep : CFG.step;
      const cols = Math.floor(pw / step), rows = Math.floor(ph / step);
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true });
      o.imageSmoothingQuality = "high";
      o.drawImage(img, 0, 0, cols, rows);
      const d = o.getImageData(0, 0, cols, rows).data;
      const left = (W - pw) / 2, top = (H - ph) / 2 - (mobile ? 15 : H * 0.035);
      const skip = mobile ? CFG.mobileSkip : CFG.skip;
      const map = new Map(), out = [];
      const q = (v, n) => Math.min(255, Math.round(v / n) * n);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4, a = d[i + 3];
          if (a < 30) continue;
          const r = d[i], g = d[i + 1], b = d[i + 2];
          const l = r * 0.299 + g * 0.587 + b * 0.114;

          const keep = (CFG.keepDark + (1 - CFG.keepDark) * Math.pow(l / 255, 0.8)) * (1 - skip);
          const thr = (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
          if (thr > keep) continue;

          let key;
          if (CFG.mono) {
            const v = Math.min(255, Math.pow(l / 255, 0.78) * 300);
            key = `rgb(${q(v * 0.93, 6)},${q(v * 0.97, 6)},${q(v + (255 - v) * 0.2, 6)})`;
          } else {
            key = `rgb(${q(r, 12)},${q(g, 12)},${q(b, 12)})`;
          }

          const side = Math.floor(Math.random() * 4), far = 220 + Math.random() * 320;
          const ox = side % 2 ? W + far : -far;
          const oy = side < 2 ? -far + Math.random() * H * 0.6 : H * 0.4 + Math.random() * far;
          const tx = left + x * step, ty = top + y * step;
          const p = {
            tx, ty, ox, oy, x: ox, y: oy, vx: 0, vy: 0,
            z: 0.75 + (l / 255) * 0.35,
            s: step * CFG.fill + (l > 170 ? 0.2 : 0),
            ease: 0.04 + Math.random() * 0.014,
            fr: 0.87 + Math.random() * 0.03,
            ang: (tx + ty) * 0.012 + Math.random() * CFG.wobbleNoise,
            spd: CFG.wobbleSpeed * (0.85 + Math.random() * 0.3),
            amp: CFG.wobble * (0.65 + Math.random() * 0.35),
            on: false,
          };
          let bk = map.get(key);
          if (!bk) {
            bk = { c: key, list: [] };
            map.set(key, bk);
          }
          bk.list.push(p);
          out.push(p);
        }
      }
      buckets = [...map.values()];
      return out;
    };

    const makeDust = () =>
      Array.from({ length: CFG.dust }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        s: Math.random() * 2 + 0.5,
        o: Math.random() * 0.3 + 0.05,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.15,
        p: Math.random() * 6.283,
        ps: Math.random() * 0.02 + 0.005,
      }));

    const frame = () => {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#f4f4f6";
      for (const d of dust) {
        d.x += d.vx;
        d.y += d.vy;
        d.p += d.ps;
        if (d.x < 0) d.x = W;
        else if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H;
        else if (d.y > H) d.y = 0;
        ctx.globalAlpha = d.o * (0.5 + 0.5 * Math.sin(d.p));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.s, 0, 6.283);
        ctx.fill();
      }

      const gA = 0.96 * Math.max(0, 1 - scroll * 1.05);
      if (gA < 0.01) return;
      const repel = !touch && scroll < 0.02 && mx > -1000;
      const R = CFG.repelRadius;
      const tpx = mx > -1000 ? (mx / W - 0.5) * CFG.parallax : 0;
      const tpy = mx > -1000 ? (my / H - 0.5) * CFG.parallax : 0;
      pxs += (tpx - pxs) * 0.05;
      pys += (tpy - pys) * 0.05;

      ctx.globalAlpha = gA;
      for (const b of buckets) {
        ctx.fillStyle = b.c;
        for (const p of b.list) {
          if (!p.on) continue;
          p.ang += p.spd;
          const wob = 1 - scroll;
          const gx = p.tx + (p.ox - p.tx) * scroll + (Math.cos(p.ang) * p.amp + pxs * p.z) * wob;
          const gy = p.ty + (p.oy - p.ty) * scroll + (Math.sin(p.ang) * p.amp + pys * p.z) * wob;
          p.vx = (p.vx + (gx - p.x) * p.ease) * p.fr;
          p.vy = (p.vy + (gy - p.y) * p.ease) * p.fr;
          p.x += p.vx;
          p.y += p.vy;
          if (repel) {
            const dx = p.x - mx, dy = p.y - my, dd = Math.hypot(dx, dy);
            if (dd < R && dd > 0) {
              const f = ((R - dd) / R) * CFG.repelForce;
              p.vx += (dx / dd) * f - (dy / dd) * f * CFG.swirl;
              p.vy += (dy / dd) * f + (dx / dd) * f * CFG.swirl;
            }
          }
          ctx.fillRect(p.x, p.y, p.s, p.s);
        }
      }
      ctx.globalAlpha = 1;
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => {
      mx = my = -9999;
    };
    const onScroll = () => {
      scroll = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.7)));
    };

    let rt, lastW = window.innerWidth;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        if (window.innerWidth !== lastW) {
          lastW = window.innerWidth;
          resize();
          parts = sample();
          dust = makeDust();
          for (const p of parts) {
            p.x = p.tx;
            p.y = p.ty;
            p.on = true;
          }
        } else {
          resize();
        }
      }, 200);
    };

    const scramble = (el, ch, ms = 190) =>
      new Promise((done) => {
        const t0 = performance.now();
        el.classList.add("scr");
        const iv = setInterval(() => {
          if (performance.now() - t0 >= ms) {
            clearInterval(iv);
            el.textContent = ch;
            el.classList.remove("scr");
            done();
          } else {
            el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }, 32);
      });

    const intro = async () => {
      img = await loadImg(CFG.image);
      if (dead) return;
      resize();
      onScroll();
      parts = sample();
      dust = makeDust();
      raf = requestAnimationFrame(frame);

      if (reduced) {
        letters.forEach((l) => l.classList.add("on"));
        for (const p of parts) {
          p.x = p.tx;
          p.y = p.ty;
          p.on = true;
        }
        return;
      }

      await sleep(250);
      pulse();
      await Promise.all(
        letters.map(async (l, i) => {
          await sleep(i * 85);
          l.classList.add("on");
          await scramble(l, CFG.title[i]);
          if (i % 3 === 0) pulse();
        })
      );
      await sleep(350);

      const id = ++run, per = Math.ceil(parts.length / CFG.waves);
      pulse();
      for (let w = 0; w < CFG.waves; w++) {
        if (id !== run || dead) return;
        for (let i = w * per; i < Math.min((w + 1) * per, parts.length); i++) {
          parts[i].on = true;
        }
        await sleep(CFG.waveDelay);
      }
    };

    if (!touch) {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseleave", onLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    intro();

    return () => {
      dead = true;
      run++;
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="halo" ref={haloRef} aria-hidden="true" />
      <canvas
        ref={cvRef}
        className="hero-canvas"
        role="img"
        aria-label="Portrait of Bhavneesh Banga made of interactive particles"
      />
      <h1 className="hero-title" ref={titleRef} aria-label={CFG.title}>
        {CFG.title.split("").map((c, i) => (
          <span key={i} aria-hidden="true">
            {c}
          </span>
        ))}
      </h1>
      <div className="hero-bottom">
        <p className="role">
          Full-Stack AI <em>Developer &amp; Engineer</em>
        </p>
        <div className="hero-actions">
          <a href="#about" className="circle" aria-label="Scroll to About">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
          <a href="#projects" className="pill">
            View Projects
          </a>
          <a href="#contact" className="pill primary">
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
