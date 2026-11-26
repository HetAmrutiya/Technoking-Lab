import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import mineral1 from "../../assets/ut.jpg";
import mineral2 from "../../assets/ut2.jpg";
import mineral3 from "../../assets/ut3.jpg";

const sliderImages = [mineral1, mineral2, mineral3];

/* ============================================
   🔬 NDT & DT SERVICES LIST — EDIT ONLY HERE
   (kept outside the component so it isn't rebuilt on every render)
   ============================================ */
const services = [
  "Phased Array Ultrasonic Testing (PAUT)",
  "Time of Flight Diffraction (TOFD)",
  "Computed Radiography (CR)",
  "Digital Radiography (DR)",
  "Eddy Current Testing (ET)",
  "Portable Spectro Testing (PST)",
  "Tensile Testing",
  "Compression Testing",
  "Bend Testing",
  "Re-bend Testing",
  "Impact Testing",
  "Hardness Testing",
  "Shear Testing",
  "Fastener Testing",
  "Paint & Surface Coating Testing",
  "Metallurgical Testing",
  "Chemical & Corrosion Testing",
  "Geological Survey & Consultancy",
  "Water & Geotextile Testing",
  "Ultrasonic Testing (UT)",
  "Magnetic Particle Testing (MPT)",
  "Dye Penetrant Testing (DPT)",
  "Positive Material Identification (PMI)",
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 30;
const HOLD_TIME = 2000;
const SLIDE_TIME = 5000;
const DOTS_PER_PAGE = 7;

const pad = (n) => String(n).padStart(2, "0");

const Header = () => {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0); // service being typed
  const [subIndex, setSubIndex] = useState(0); // characters shown
  const [deleting, setDeleting] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const heroRef = useRef(null);

  const text = services[index].substring(0, subIndex);
  const activeService = index;

  /* Particles generated once (no jumping on re-render) */
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${2 + Math.random() * 5}px`,
        duration: `${10 + Math.random() * 16}s`,
        delay: `${-Math.random() * 20}s`,
      })),
    []
  );

  /* ---------- entrance ---------- */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  /* ---------- typing animation ---------- */
  useEffect(() => {
    const current = services[index];
    let timeout;

    if (!deleting && subIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), HOLD_TIME);
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % services.length);
    } else {
      timeout = setTimeout(
        () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
        deleting ? DELETE_SPEED : TYPE_SPEED
      );
    }
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  /* ---------- background slider ---------- */
  useEffect(() => {
    const interval = setInterval(() => setBgIndex((prev) => (prev + 1) % sliderImages.length), SLIDE_TIME);
    return () => clearInterval(interval);
  }, []);

  /* ---------- mouse parallax + spotlight (CSS variables, no re-render) ---------- */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    let frame = 0;
    let last = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      const r = hero.getBoundingClientRect();
      const x = (last.clientX - r.left) / r.width;
      const y = (last.clientY - r.top) / r.height;
      hero.style.setProperty("--px", (x - 0.5).toFixed(3));
      hero.style.setProperty("--py", (y - 0.5).toFixed(3));
      hero.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      hero.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    };
    const onMove = (e) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    hero.addEventListener("mousemove", onMove);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* ---------- scroll-linked fade / lift of the content ---------- */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = hero.offsetHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / h));
      hero.style.setProperty("--sp", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* ---------- navigation (same behaviour as before) ---------- */
  const handleExplore = () => {
    if (window.location.pathname === "/") {
      const element = document.getElementById("products") || document.getElementById("services");
      if (element) return element.scrollIntoView({ behavior: "smooth" });
    }
    navigate("/product");
  };

  const handleContact = () => {
    if (window.location.pathname === "/") {
      const el = document.getElementById("contact");
      if (el) return el.scrollIntoView({ behavior: "smooth" });
    }
    navigate("/contact");
  };

  const scrollPastHero = () => {
    const hero = heroRef.current;
    if (!hero) return;
    const y = hero.getBoundingClientRect().bottom + window.pageYOffset - 70;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const goToService = useCallback((i) => {
    setIndex(i);
    setSubIndex(0);
    setDeleting(false);
  }, []);

  /* ripple that starts where the pointer touches a button */
  const ripple = (e) => {
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect();
    btn.style.setProperty("--rx", `${e.clientX - r.left}px`);
    btn.style.setProperty("--ry", `${e.clientY - r.top}px`);
  };

  /* ============================================
     🎯 ONLY 7 DOTS — PAGINATED WINDOW
     ============================================ */
  const currentPage = Math.floor(activeService / DOTS_PER_PAGE);
  const startIndex = currentPage * DOTS_PER_PAGE;
  const visibleDots = services.slice(startIndex, startIndex + DOTS_PER_PAGE).map((_, i) => startIndex + i);

  const nextService = services[(activeService + 1) % services.length];
  const typingProgress = services[index].length ? subIndex / services[index].length : 0;

  return (
    <div className={`header-container2 hd-hero ${loaded ? "hd-loaded" : ""}`} id="home" ref={heroRef}>
      {/* ---------- animated background slider ---------- */}
      <div className="background-layers hd-bg" aria-hidden="true">
        {sliderImages.map((image, idx) => (
          <div
            key={idx}
            className={`background-layer hd-bg-layer ${idx === bgIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* ---------- overlays & decoration ---------- */}
      <div className="dynamic-overlay hd-overlay" aria-hidden="true">
        <div className="moving-gradient hd-moving-gradient"></div>
      </div>
      <div className="hd-aurora" aria-hidden="true">
        <span className="hd-aurora-blob hd-aurora-1"></span>
        <span className="hd-aurora-blob hd-aurora-2"></span>
        <span className="hd-aurora-blob hd-aurora-3"></span>
      </div>
      <div className="hd-grid" aria-hidden="true"></div>
      <div className="hd-spotlight" aria-hidden="true"></div>
      <div className="hd-scanline" aria-hidden="true"></div>

      <div className="floating-shapes hd-shapes" aria-hidden="true">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      <div className="hd-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ---------- floating glass cards (desktop) ---------- */}
      <aside className="hd-float-card hd-float-left" aria-hidden="true">
        <span className="hd-float-label">
          <span className="hd-live-dot"></span>
          Now showing
        </span>
        <strong key={`now-${activeService}`} className="hd-float-value">
          {services[activeService]}
        </strong>
        <span className="hd-float-bar">
          <span style={{ transform: `scaleX(${typingProgress})` }}></span>
        </span>
      </aside>

      <aside className="hd-float-card hd-float-right" aria-hidden="true">
        <span className="hd-float-label">Up next</span>
        <strong key={`next-${activeService}`} className="hd-float-value">
          {nextService}
        </strong>
        <span className="hd-float-count">
          {pad(((activeService + 1) % services.length) + 1)} / {pad(services.length)}
        </span>
      </aside>

      {/* ---------- main content ---------- */}
      <div className="header-content hd-content">
        <div className="hd-badge hd-enter" style={{ "--d": "0.1s" }}>
          <span className="hd-badge-dot"></span>
          NDT &amp; DT Testing Laboratory
        </div>

        {/* Main Title */}
        <div className="title-wrapper hd-title-wrap">
          <h1 className="main-title hd-title">
            <span className="title-word title-word-1 hd-word">
              <span className="hd-word-inner" style={{ "--d": "0.25s" }}>
                Technoking
              </span>
            </span>
            <span className="title-word title-word-2 hd-word">
              <span className="hd-word-inner" style={{ "--d": "0.45s" }}>
                Testlab Pvt Ltd
              </span>
            </span>
          </h1>
          <div className="title-underline-animated hd-underline">
            <span className="hd-underline-spark"></span>
          </div>
        </div>

        {/* Animated Subtitle */}
        <div className="subtitle-wrapper hd-subtitle-wrap hd-enter" style={{ "--d": "0.85s" }}>
          <h2 className="main-subtitle hd-subtitle">
            <span className="subtitle-prefix">Leading Provider of </span>
            <span className="typing-container hd-typing">
              <span
                className={`typed-text ${text === "NDT Testing" || text === "DT Testing" ? "typed-header" : ""}`}
              >
                {text}
              </span>
              <span className="typing-cursor">|</span>
            </span>
          </h2>
        </div>

        {/* SERVICE PROGRESS INDICATOR — ONLY 7 DOTS */}
        <div className="service-indicator hd-indicator hd-enter" style={{ "--d": "1.05s" }}>
          <div className="service-progress" key={`page-${currentPage}`}>
            {visibleDots.map((globalIndex, i) => (
              <button
                type="button"
                key={globalIndex}
                className={`service-dot ${globalIndex === activeService ? "active" : ""}`}
                style={{ "--i": i }}
                onClick={() => goToService(globalIndex)}
                aria-label={`Show ${services[globalIndex]}`}
                title={services[globalIndex]}
              />
            ))}
          </div>
          <div className="service-counter">
            <span className="current-service" key={activeService}>
              {activeService + 1}
            </span>
            <span className="total-services">/{services.length}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="cta-wrapper hd-cta hd-enter" style={{ "--d": "1.25s" }}>
          <button className="explore-btn" onClick={handleExplore} onMouseEnter={ripple}>
            <span className="btn-glow"></span>
            <span className="btn-text">Explore Services</span>
            <span className="btn-arrow">→</span>
            <div className="btn-liquid"></div>
          </button>

          <button className="contact-btn" onClick={handleContact} onMouseEnter={ripple}>
            <span className="btn-text">Get In Touch</span>
            <div className="btn-ripple"></div>
          </button>
        </div>
      </div>

      {/* ---------- slide indicators ---------- */}
      <div className="hd-slides" aria-label="Background images">
        {sliderImages.map((_, idx) => (
          <button
            type="button"
            key={idx}
            className={`hd-slide-btn ${idx === bgIndex ? "is-active" : ""}`}
            onClick={() => setBgIndex(idx)}
            aria-label={`Show background ${idx + 1}`}
          >
            <span key={idx === bgIndex ? `on-${bgIndex}` : "off"}></span>
          </button>
        ))}
      </div>

      {/* ---------- scroll indicator ---------- */}
      <button type="button" className="scroll-indicator-animated hd-scroll" onClick={scrollPastHero} aria-label="Scroll down">
        <span className="hd-scroll-mouse">
          <span className="hd-scroll-wheel"></span>
        </span>
        <span className="scroll-label">Scroll</span>
      </button>

      {/* ---------- bottom wave ---------- */}
      <div className="bottom-wave hd-wave" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            className="hd-wave-back"
            d="M0,64 C150,104 350,24 600,56 C850,88 1050,30 1200,58 L1200,120 L0,120 Z"
          />
          <path
            className="hd-wave-front"
            d="M0,84 C200,54 400,114 600,86 C800,58 1000,110 1200,82 L1200,120 L0,120 Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Header;