import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./Industry.css";
import mineralsBackground from "../../assets/ut.jpg";
import eng from "../../assets/eng.png";
import ent from "../../assets/ent.png";
import ndt from "../../assets/ndt.png";
import testlab from "../../assets/logo.png";
import weldcast from "../../assets/weldcast.png";
import qixp from "../../assets/qixp.png";
import cns from "../../assets/cns.png";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Box,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cog,
  Cpu,
  Layers,
  Rocket,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ============================================================
   🎨 THEME
   ============================================================ */
const PRIMARY = "#235781";
const PRIMARY_DARK = "#16405F";
const PRIMARY_LIGHT = "#4A82A8";

/* ============================================================
   🏢 GROUP OF COMPANIES — EDIT ONLY HERE
   ============================================================ */
const GROUP_COMPANIES = [
  { id: "ttpl", name: "Technoking Testlab Pvt Ltd", initials: "TT", logo: testlab },
  { id: "tepl", name: "Technoking Engineers Pvt Ltd", initials: "TE", logo: eng },
  { id: "te", name: "Technoking Enterprise", initials: "TE", logo: ent },
  { id: "tns", name: "Technoking NDT Services", initials: "TNS", logo: ndt },
  { id: "qixs", name: "Quality Industrial X-Ray Company Pvt Ltd", initials: "QX", logo: qixp },
  { id: "cndt", name: "Capital NDT Services", initials: "CN", logo: cns },
  { id: "wndt", name: "Weldcast NDT Pvt Ltd", initials: "WN", logo: weldcast },
];

const INDUSTRIES = [
  {
    id: 1,
    name: "NDT Services",
    Icon: Activity,
    color: PRIMARY,
    colorLight: PRIMARY_LIGHT,
    description:
      "Non-Destructive Testing services for flaw detection and material integrity without damaging the component.",
    applications: [
      "Weld Inspection",
      "Casting & Forging Inspection",
      "Pipeline Integrity",
      "Pressure Vessel Testing",
      "Structural Steel Inspection",
      "Aerospace Component Testing",
    ],
    features: [
      "No damage to components",
      "Real-time defect detection",
      "Cost-effective inspection",
      "Compliance with international standards",
    ],
    materials: [
      "Ultrasonic Testing (UT)",
      "Magnetic Particle Testing (MPT)",
      "Dye Penetrant Testing (DPT)",
      "Phased Array Ultrasonic Testing (PAUT)",
      "Eddy Current Testing (ET)",
      "Portable Spectro Testing (PST)",
    ],
  },
  {
    id: 2,
    name: "DT Services",
    Icon: BarChart3,
    color: "#0F766E",
    colorLight: "#2DA79A",
    description:
      "Destructive Testing services to evaluate mechanical properties and material performance under stress.",
    applications: [
      "Tensile Strength Testing",
      "Compression Testing",
      "Bend & Re-bend Testing",
      "Impact Testing",
      "Hardness Testing",
      "Fastener Testing",
    ],
    features: [
      "Accurate mechanical property data",
      "Quality verification",
      "Material certification",
      "Failure analysis support",
    ],
    materials: [
      "Tensile Testing",
      "Compression Testing",
      "Bend Testing",
      "Re-bend Testing",
      "Impact Testing",
      "Hardness Testing",
    ],
  },
  {
    id: 3,
    name: "Material Testing",
    Icon: Layers,
    // ✅ CHANGED → burgundy (deep wine red)
    color: "#7B1E2B",
    colorLight: "#A93A4C",
    description:
      "Comprehensive material characterization and analysis for quality assurance and R&D.",
    applications: [
      "Chemical Composition Analysis",
      "Metallurgical Testing",
      "Corrosion Testing",
      "Paint & Coating Testing",
      "PMI Testing",
      "Geological Survey",
    ],
    features: [
      "Precise chemical analysis",
      "Microstructure evaluation",
      "Corrosion resistance data",
      "Coating performance metrics",
    ],
    materials: [
      "Chemical & Corrosion Testing",
      "Metallurgical Testing",
      "Paint & Surface Coating Testing",
      "Positive Material Identification (PMI)",
      "Geological Survey & Consultancy",
      "Water & Geotextile Testing",
    ],
  },
  {
    id: 4,
    name: "NDT & DT Combined",
    Icon: Shield,
    // ✅ CHANGED → dark purple
    color: "#3F1D5C",
    colorLight: "#6B3E8E",
    description:
      "Integrated NDT and DT solutions for complete material and component qualification.",
    applications: [
      "Full Weld Qualification",
      "Pressure Equipment Certification",
      "Structural Integrity Assessment",
      "Material Qualification",
      "Fitness-for-Service Evaluation",
      "Remaining Life Assessment",
    ],
    features: [
      "Complete testing coverage",
      "Single-point coordination",
      "Comprehensive reporting",
      "Faster project turnaround",
    ],
    materials: [
      "UT + Tensile Testing",
      "MPT + Impact Testing",
      "DPT + Hardness Testing",
      "PAUT + Bend Testing",
      "ET + Chemical Analysis",
      "PST + Metallurgical Testing",
    ],
  },
  {
    id: 5,
    name: "Advanced NDT",
    Icon: Cpu,
    color: "#0369A1",
    colorLight: "#38A3D6",
    description: "Advanced non-destructive techniques for critical and complex applications.",
    applications: [
      "Phased Array UT",
      "Time of Flight Diffraction",
      "Guided Wave Testing",
      "Acoustic Emission Testing",
      "Digital Radiography",
      "Computed Tomography",
    ],
    features: [
      "High-resolution imaging",
      "Complex geometry capability",
      "Volumetric inspection",
      "Digital data archiving",
    ],
    materials: [
      "Phased Array Ultrasonic Testing (PAUT)",
      "Eddy Current Testing (ET)",
      "Portable Spectro Testing (PST)",
      "Positive Material Identification (PMI)",
      "Ultrasonic Testing (UT)",
      "Magnetic Particle Testing (MPT)",
    ],
  },
  {
    id: 6,
    name: "Mechanical Testing",
    Icon: Wrench,
    color: "#C2410C",
    colorLight: "#F07A3A",
    description:
      "Destructive mechanical testing to determine material strength and performance characteristics.",
    applications: [
      "Tensile Testing",
      "Compression Testing",
      "Bend Testing",
      "Impact Testing",
      "Hardness Testing",
      "Shear Testing",
    ],
    features: [
      "Accurate load measurement",
      "Standard-compliant procedures",
      "Detailed stress-strain data",
      "Failure mode analysis",
    ],
    materials: [
      "Tensile Testing",
      "Compression Testing",
      "Bend Testing",
      "Re-bend Testing",
      "Impact Testing",
      "Hardness Testing",
    ],
  },
];

/* ============================================================
   🛠️ SOLUTIONS — EDIT ONLY HERE
   ============================================================ */
const INDUSTRY_SERVICES = [
  {
    title: "Material Selection",
    description: "Expert guidance in choosing the right materials for your application.",
    Icon: Layers,
    features: [
      "Material testing & analysis",
      "Cost optimization strategies",
      "Performance evaluation",
      "Compliance verification",
    ],
  },
  {
    title: "Quality Assurance",
    description: "Comprehensive testing and inspection to ensure product reliability.",
    Icon: ShieldCheck,
    features: [
      "NDT & DT testing services",
      "Dimensional inspection",
      "Chemical analysis",
      "Mechanical testing",
    ],
  },
  {
    title: "Custom Solutions",
    description: "Tailored products designed to meet unique industry specifications.",
    Icon: Cog,
    features: [
      "Custom alloy development",
      "Specialized coatings",
      "Unique geometries",
      "Prototype development",
    ],
  },
  {
    title: "Technical Support",
    description: "24/7 expert support for installation, maintenance, and troubleshooting.",
    Icon: Users,
    features: [
      "On-site assistance",
      "Training programs",
      "Technical documentation",
      "Performance monitoring",
    ],
  },
];

const DETAIL_COLUMNS = [
  { key: "applications", title: "Applications", Icon: Box },
  { key: "features", title: "Key Features", Icon: Award },
  { key: "materials", title: "Test Methods", Icon: Shield },
];

const pad = (n) => String(n).padStart(2, "0");

/* Shared section header (same look on every section) */
const SectionHeader = ({ Icon, badge, before, highlight, after, subtitle }) => (
  <div className="tk-section-header tk-reveal" style={{ "--d": "0s" }}>
    <div className="tk-section-badge">
      <Icon size={16} />
      {badge}
    </div>
    <h2 className="tk-section-title-iws">
      {before} <span className="tk-title-accent">{highlight}</span>
      {after ? ` ${after}` : ""}
    </h2>
    <div className="tk-section-divider" aria-hidden="true">
      <span className="tk-divider-line"></span>
      <span className="tk-divider-dot"></span>
      <span className="tk-divider-line tk-divider-line-r"></span>
    </div>
    <p className="tk-section-subtitle">{subtitle}</p>
  </div>
);

/* ============================================================
   🏭 PAGE
   ============================================================ */
const Industry = () => {
  const navigate = useNavigate();

  const [visibleSections, setVisibleSections] = useState({});
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  const progressRef = useRef(null);
  const heroRef = useRef(null);
  const sectionRefs = useRef([]);
  const railRef = useRef(null);
  const tabRefs = useRef([]);

  const current = INDUSTRIES[activeIndustry];

  const addToRefs = (el, index) => {
    sectionRefs.current[index] = el;
  };

  /* Particles are generated once (no jumping on re-render) */
  const heroParticles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${12 + Math.random() * 18}s`,
        delay: `${Math.random() * 10}s`,
        size: `${4 + Math.random() * 9}px`,
        alpha: 0.1 + Math.random() * 0.22,
      })),
    []
  );

  const ctaParticles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${8 + Math.random() * 12}s`,
        delay: `${Math.random() * 5}s`,
        size: `${4 + Math.random() * 8}px`,
      })),
    []
  );

  /* ---------- Scroll progress (no re-render per scroll) ---------- */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${progress}%`;
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

  /* ---------- Hero spotlight follows the mouse (CSS vars only) ---------- */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      hero.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  /* ---------- Reveal sections once they enter the viewport ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.section;
            setVisibleSections((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    sectionRefs.current.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ---------- Sliding tab indicator ---------- */
  const measureIndicator = useCallback(() => {
    const tab = tabRefs.current[activeIndustry];
    if (!tab) return;
    setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth, ready: true });

    const rail = railRef.current;
    if (rail && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({
        left: tab.offsetLeft - rail.clientWidth / 2 + tab.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeIndustry]);

  useLayoutEffect(() => {
    measureIndicator();
  }, [measureIndicator]);

  useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    // fonts can change tab widths after first paint
    document.fonts?.ready?.then(measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

  const goToIndustry = (index) => {
    const next = (index + INDUSTRIES.length) % INDUSTRIES.length;
    setActiveIndustry(next);
  };

  const onTabKeyDown = (e, index) => {
    let next = null;
    if (e.key === "ArrowRight") next = index + 1;
    if (e.key === "ArrowLeft") next = index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = INDUSTRIES.length - 1;
    if (next === null) return;
    e.preventDefault();
    const wrapped = (next + INDUSTRIES.length) % INDUSTRIES.length;
    setActiveIndustry(wrapped);
    tabRefs.current[wrapped]?.focus();
  };

  /* ---------- Pointer effects for cards ---------- */
  const handleTilt = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const resetTilt = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  const handleSpotlight = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const scrollToId = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const heroLinks = [
    { id: "industry-overview", count: INDUSTRIES.length, label: "Service Areas" },
    { id: "industry-services", count: INDUSTRY_SERVICES.length, label: "Solutions" },
    { id: "group-companies", count: GROUP_COMPANIES.length, label: "Group Companies" },
  ];

  return (
    <div className="tk-industry-container" id="industry">
      {/* ==========================================
          📊 SCROLL PROGRESS BAR
          ========================================== */}
      <div className="tk-scroll-progress" ref={progressRef}></div>

      {/* ==========================================
          🎬 HERO
          ========================================== */}
      <section
        className={`tk-industry-hero ${visibleSections.hero ? "tk-in" : ""}`}
        ref={(el) => {
          heroRef.current = el;
          addToRefs(el, 0);
        }}
        data-section="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10, 22, 40, 0.9) 0%, rgba(35, 87, 129, 0.76) 100%), url(${mineralsBackground})`,
        }}
      >
        <div className="tk-hero-spotlight" aria-hidden="true"></div>
        <div className="tk-hero-grid" aria-hidden="true"></div>
        <div className="tk-hero-scanline" aria-hidden="true"></div>

        <div className="tk-hero-particles" aria-hidden="true">
          {heroParticles.map((p) => (
            <span
              key={p.id}
              className="tk-hero-particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
                background: `rgba(143, 184, 217, ${p.alpha})`,
              }}
            ></span>
          ))}
        </div>

        <div className="tk-container">
          <div className="tk-hero-content">
            <div className="tk-hero-badge tk-hero-step" style={{ "--d": "0.05s" }}>
              <span className="tk-badge-dot"></span>
              NDT &amp; DT Services
            </div>

            <p className="tk-hero-subtitle tk-hero-step" style={{ "--d": "0.18s" }}>
              Cutting-edge NDT and DT testing services ensuring superior quality and reliability
              across all industrial sectors
            </p>

           
          </div>
        </div>

        <div className="tk-hero-scroll" aria-hidden="true">
          <div className="tk-scroll-mouse">
            <div className="tk-scroll-wheel"></div>
          </div>
          <div className="tk-scroll-text">Scroll Down</div>
        </div>
      </section>

      {/* ==========================================
          🏭 SERVICE AREAS OVERVIEW
          ========================================== */}
      <section
        id="industry-overview"
        className={`tk-industries-overview ${visibleSections.overview ? "tk-in" : ""}`}
        ref={(el) => addToRefs(el, 1)}
        data-section="overview"
      >
        <div className="tk-bg-orb tk-bg-orb-1" aria-hidden="true"></div>
        <div className="tk-bg-orb tk-bg-orb-2" aria-hidden="true"></div>

        <div className="tk-container">
          <SectionHeader
            Icon={Target}
            badge="NDT & DT Services"
            before="Powering"
            highlight="Industrial"
            after="Excellence"
            subtitle="Specialized NDT and DT testing solutions for diverse industrial sectors with unmatched quality and technical support"
          />

          {/* Tabs — sliding indicator, scrollable on mobile */}
          <div className="tk-tabs-rail tk-reveal" ref={railRef} style={{ "--d": "0.1s" }}>
            <div className="tk-tabs-track" role="tablist" aria-label="Service areas">
              <span
                className={`tk-tabs-indicator ${indicator.ready ? "is-ready" : ""}`}
                style={{
                  transform: `translateX(${indicator.left}px)`,
                  width: indicator.width,
                  background: `linear-gradient(135deg, ${current.color}, ${current.colorLight})`,
                  boxShadow: `0 10px 26px ${current.color}55`,
                }}
                aria-hidden="true"
              ></span>
              {INDUSTRIES.map((industry, index) => {
                const isActive = activeIndustry === index;
                return (
                  <button
                    key={industry.id}
                    ref={(el) => (tabRefs.current[index] = el)}
                    type="button"
                    role="tab"
                    id={`tk-tab-${industry.id}`}
                    aria-selected={isActive}
                    aria-controls="tk-industry-panel"
                    tabIndex={isActive ? 0 : -1}
                    className={`tk-industry-tab ${isActive ? "tk-active" : ""}`}
                    style={{ "--tab-color": industry.color }}
                    onClick={() => setActiveIndustry(index)}
                    onKeyDown={(e) => onTabKeyDown(e, index)}
                  >
                    <span className="tk-tab-icon">
                      <industry.Icon size={18} />
                    </span>
                    <span className="tk-tab-name">{industry.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel — re-mounts on tab change to replay animations */}
          <div
            key={current.id}
            id="tk-industry-panel"
            role="tabpanel"
            aria-labelledby={`tk-tab-${current.id}`}
            className="tk-detail-panel"
            style={{ "--ind": current.color, "--ind-light": current.colorLight }}
          >
            <aside className="tk-detail-hero">
              <div className="tk-detail-hero-pattern" aria-hidden="true"></div>
              <div className="tk-detail-hero-top">
                <span className="tk-detail-index">
                  {pad(activeIndustry + 1)}
                  <small> / {pad(INDUSTRIES.length)}</small>
                </span>
                <div className="tk-detail-arrows">
                  <button
                    type="button"
                    onClick={() => goToIndustry(activeIndustry - 1)}
                    aria-label="Previous service area"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToIndustry(activeIndustry + 1)}
                    aria-label="Next service area"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="tk-detail-icon">
                <current.Icon size={30} />
                <span className="tk-detail-icon-ring" aria-hidden="true"></span>
              </div>

              <h3 className="tk-industry-name">{current.name}</h3>
              <p className="tk-industry-description">{current.description}</p>

              <ul className="tk-detail-stats">
                {DETAIL_COLUMNS.map((col) => (
                  <li key={col.key}>
                    <strong>{current[col.key].length}</strong>
                    <span>{col.title}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="tk-detail-cta"
                onClick={() => navigate("/contact")}
              >
                Request a quote
                <ArrowRight size={17} />
              </button>
            </aside>

            <div className="tk-detail-grid">
              {DETAIL_COLUMNS.map((col, ci) => (
                <div key={col.key} className="tk-detail-card" style={{ "--c": ci }}>
                  <h4 className="tk-detail-card-title">
                    <span className="tk-detail-card-icon">
                      <col.Icon size={18} />
                    </span>
                    {col.title}
                    <span className="tk-detail-card-count">{current[col.key].length}</span>
                  </h4>
                  <ul className="tk-detail-list">
                    {current[col.key].map((item, idx) => (
                      <li key={item} className="tk-detail-item" style={{ "--i": idx }}>
                        <CheckCircle2 size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          🛠️ SOLUTIONS
          ========================================== */}
      <section
        id="industry-services"
        className={`tk-industry-services ${visibleSections.services ? "tk-in" : ""}`}
        ref={(el) => addToRefs(el, 2)}
        data-section="services"
      >
        <div className="tk-container">
          <SectionHeader
            Icon={Briefcase}
            badge="Our Services"
            before="Comprehensive"
            highlight="Industry"
            after="Solutions"
            subtitle="End-to-end support from material selection to after-sales service"
          />

          <div className="tk-services-grid">
            {INDUSTRY_SERVICES.map((service, index) => (
              <article
                key={service.title}
                className="tk-service-card"
                style={{ "--d": `${0.12 + index * 0.1}s` }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <div className="tk-service-card-inner">
                  <span className="tk-service-glow" aria-hidden="true"></span>
                  <span className="tk-service-number" aria-hidden="true">
                    {pad(index + 1)}
                  </span>

                  <div className="tk-service-icon">
                    <service.Icon size={26} />
                  </div>
                  <h3 className="tk-service-title">{service.title}</h3>
                  <p className="tk-service-description">{service.description}</p>

                  <ul className="tk-service-features">
                    {service.features.map((feature) => (
                      <li key={feature}>
                        <ChevronRight size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="tk-service-button"
                    onClick={() => navigate("/contact")}
                  >
                    <span>Learn More</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          🏢 GROUP OF COMPANIES
          ========================================== */}
      <section
        id="group-companies"
        className={`tk-group-section ${visibleSections.groupCompanies ? "tk-in" : ""}`}
        ref={(el) => addToRefs(el, 3)}
        data-section="groupCompanies"
      >
        <div className="tk-container">
          <SectionHeader
            Icon={Users}
            badge="Group of Companies"
            before="Our"
            highlight="Group of Companies"
            subtitle="Providing reliable NDT and DT testing services for quality, safety and structural integrity."
          />

          <div className="tk-group-grid">
            {GROUP_COMPANIES.map((company, i) => (
              <article
                key={company.id}
                className="tk-company-card"
                style={{ "--d": `${0.1 + i * 0.08}s`, "--float-delay": `${i * 0.45}s` }}
                onMouseMove={handleSpotlight}
              >
                <span className="tk-company-spot" aria-hidden="true"></span>
                <div className="tk-company-logo">
                  <span className="tk-company-orbit" aria-hidden="true"></span>
                  <div className="tk-company-logo-inner">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        draggable="false"
                        loading="lazy"
                      />
                    ) : (
                      <span className="tk-company-initials">{company.initials}</span>
                    )}
                  </div>
                </div>
                <h3 className="tk-company-name">{company.name}</h3>
                <span className="tk-company-tag">
                  <Building2 size={12} />
                  Group Company
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          🎯 CTA BANNER
          ========================================== */}
      <section
        className={`tk-cta-banner ${visibleSections.cta ? "tk-in" : ""}`}
        ref={(el) => addToRefs(el, 4)}
        data-section="cta"
        style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_DARK})` }}
      >
        <div className="tk-cta-grid" aria-hidden="true"></div>
        <div className="tk-cta-orb tk-cta-orb-1" aria-hidden="true"></div>
        <div className="tk-cta-orb tk-cta-orb-2" aria-hidden="true"></div>

        <div className="tk-cta-content">
          <div className="tk-cta-icon tk-reveal" style={{ "--d": "0s" }}>
            <Rocket size={40} />
            <span className="tk-cta-icon-ring" aria-hidden="true"></span>
          </div>
          <h2 className="tk-cta-title tk-reveal" style={{ "--d": "0.1s" }}>
            Ready to <span>Transform</span> Your Industry?
          </h2>
          <p className="tk-cta-description tk-reveal" style={{ "--d": "0.2s" }}>
            Contact us today for expert NDT &amp; DT solutions tailored to your needs
          </p>
          <div className="tk-cta-actions tk-reveal" style={{ "--d": "0.3s" }}>
            <button type="button" className="tk-cta-button" onClick={() => navigate("/contact")}>
              <span>Get Started</span>
              <ArrowRight size={18} className="tk-cta-arrow" />
            </button>
            <button
              type="button"
              className="tk-cta-button tk-cta-button-ghost"
              onClick={() => scrollToId("industry-overview")}
            >
              <Sparkles size={17} />
              <span>Explore Services</span>
            </button>
          </div>
        </div>

        <div className="tk-cta-particles" aria-hidden="true">
          {ctaParticles.map((p) => (
            <span
              key={p.id}
              className="tk-cta-particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            ></span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Industry;
