import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Contact.css";
import contactImage from "../../assets/contact1.png";
import mineralsBackground from "../../assets/ut.jpg";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  ExternalLink,
  Layers,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
  User,
  Wrench,
} from "lucide-react";

/* ============================================================
   📍 COMPANY / LOCATION DETAILS  —  EDIT ONLY HERE
   ============================================================ */
const COMPANY = {
  name: "Technoking Testlab Pvt. Ltd.",
  addressLines: ["Plot No. 2, Shyam Industrial Area,", "Bakrol Bujrang, Ahmedabad, Gujarat 382430"],
  email: "info@technokingtestlab.com",
  phone: "+91 95124 00501",
};

const MAP_QUERY =
  "Technoking Testlab Pvt. Ltd., Plot No. 2, Shyam Industrial Area, Bakrol Bujrang, Ahmedabad, Gujarat 382430";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  MAP_QUERY
)}`;
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY
)}&z=15&output=embed`;

/* Web3Forms access key */
const WEB3FORMS_KEY = "5162d798-f96f-4824-a967-12cdaad116e8";

/* Renders the address with line breaks */
const AddressBlock = () => (
  <>
    {COMPANY.addressLines.map((line, index) => (
      <React.Fragment key={line}>
        {line}
        {index < COMPANY.addressLines.length - 1 && <br />}
      </React.Fragment>
    ))}
  </>
);

/* ============================================================
   🔬 NDT & DT TESTING TYPES — used in the form selector
   ============================================================ */
const TESTING_TYPES = [
  {
    id: "ndt",
    name: "NDT Testing",
    Icon: Activity,
    services: [
      "Ultrasonic Testing (UT)",
      "Magnetic Particle Testing (MPT)",
      "Dye Penetrant Testing (DPT)",
      "Phased Array Ultrasonic Testing (PAUT)",
      "Eddy Current Testing (ET)",
      "Portable Spectro Testing (PST)",
    ],
  },
  {
    id: "dt",
    name: "DT Testing",
    Icon: BarChart3,
    services: [
      "Tensile Testing",
      "Compression Testing",
      "Bend Testing",
      "Re-bend Testing",
      "Impact Testing",
      "Hardness Testing",
    ],
  },
  {
    id: "advanced",
    name: "Advanced NDT",
    Icon: Cpu,
    services: [
      "Phased Array UT",
      "Time of Flight Diffraction",
      "Guided Wave Testing",
      "Acoustic Emission Testing",
      "Digital Radiography",
      "Computed Tomography",
    ],
  },
  {
    id: "material",
    name: "Material Testing",
    Icon: Layers,
    services: [
      "Chemical & Corrosion Testing",
      "Metallurgical Testing",
      "Paint & Surface Coating Testing",
      "Positive Material Identification (PMI)",
      "Geological Survey & Consultancy",
      "Water & Geotextile Testing",
    ],
  },
  {
    id: "mechanical",
    name: "Mechanical Testing",
    Icon: Wrench,
    services: [
      "Tensile Testing",
      "Compression Testing",
      "Bend Testing",
      "Impact Testing",
      "Hardness Testing",
      "Shear Testing",
    ],
  },
];

/* ============================================================
   📇 CONTACT CARDS — each card is fully clickable
   ============================================================ */
const CONTACT_CARDS = [
  {
    Icon: MapPin,
    title: "Our Address",
    description: <AddressBlock />,
    href: MAPS_URL,
    external: true,
    actionLabel: "Open in Google Maps",
  },
  {
    Icon: Mail,
    title: "Email Us",
    description: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    external: false,
    actionLabel: "Send an Email",
  },
  {
    Icon: Phone,
    title: "Call Us",
    description: COMPANY.phone,
    href: `tel:${COMPANY.phone.replace(/\s+/g, "")}`,
    external: false,
    actionLabel: "Call Now",
  },
];

const FORM_PERKS = [
  { Icon: Clock, text: "Reply within 24 hours" },
  { Icon: ShieldCheck, text: "Expert NDT & DT team" },
  { Icon: CheckCircle2, text: "Clear, traceable reports" },
];

/* Auto-filled first line of the message */
const buildDefaultMessage = (typeName) => `Testing Type: ${typeName}`;
const isDefaultMessage = (text) =>
  text.trim() === "" || TESTING_TYPES.some((t) => text.trim() === buildDefaultMessage(t.name));

const MESSAGE_MAX = 1000;

/* Shared section header */
const SectionHeader = ({ Icon, badge, before, highlight, subtitle }) => (
  <div className="ct-section-header ct-reveal" style={{ "--d": "0s" }}>
    <div className="ct-section-badge">
      <Icon size={16} />
      {badge}
    </div>
    <h2 className="ct-section-title">
      {before} <span className="ct-title-accent">{highlight}</span>
    </h2>
    <div className="ct-section-divider" aria-hidden="true">
      <span className="ct-divider-line"></span>
      <span className="ct-divider-dot"></span>
      <span className="ct-divider-line ct-divider-line-r"></span>
    </div>
    <p className="ct-section-subtitle">{subtitle}</p>
  </div>
);

/* ============================================================
   📬 PAGE
   ============================================================ */
const Contact = () => {
  const location = useLocation();

  const [visibleSections, setVisibleSections] = useState({});
  const [activeTestingType, setActiveTestingType] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [messageText, setMessageText] = useState(buildDefaultMessage(TESTING_TYPES[0].name));
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [statusText, setStatusText] = useState("");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const [mapLoaded, setMapLoaded] = useState(false);

  const progressRef = useRef(null);
  const heroRef = useRef(null);
  const sectionRefs = useRef([]);
  const formRef = useRef(null);
  const railRef = useRef(null);
  const tabRefs = useRef([]);
  const statusTimer = useRef(null);

  const currentType = TESTING_TYPES[activeTestingType];
  const isSubmitting = status === "sending";

  const addToRefs = (el, index) => {
    sectionRefs.current[index] = el;
  };

  /* Particles generated once */
  const particles = useMemo(
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

  /* ---------- #request-quote / #contact-form → scroll to the form ---------- */
  useEffect(() => {
    const hash = (location.hash || "").replace("#", "").trim();
    if (hash === "request-quote" || hash === "contact-form") {
      const timer = setTimeout(() => {
        const el = document.getElementById("request-quote");
        if (!el) return;
        const NAV_OFFSET = 90;
        const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 250);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [location.hash, location.key]);

  /* ---------- Keep the message's first line in sync, but never overwrite typed text ---------- */
  useEffect(() => {
    setMessageText((prev) =>
      isDefaultMessage(prev) ? buildDefaultMessage(TESTING_TYPES[activeTestingType].name) : prev
    );
  }, [activeTestingType]);

  /* ---------- Scroll progress (no re-render) ---------- */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${p}%`;
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

  /* ---------- Hero spotlight ---------- */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      hero.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  /* ---------- Reveal on scroll ---------- */
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

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  /* ---------- Sliding indicator for testing-type tabs ---------- */
  const measureIndicator = useCallback(() => {
    const tab = tabRefs.current[activeTestingType];
    if (!tab) return;
    setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth, ready: true });
    const rail = railRef.current;
    if (rail && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({
        left: tab.offsetLeft - rail.clientWidth / 2 + tab.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeTestingType]);

  useLayoutEffect(() => {
    measureIndicator();
  }, [measureIndicator]);

  useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    document.fonts?.ready?.then(measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

  const selectType = (index) => {
    setActiveTestingType(index);
    setSelectedService("");
  };

  const onTabKeyDown = (e, index) => {
    let next = null;
    if (e.key === "ArrowRight") next = index + 1;
    if (e.key === "ArrowLeft") next = index - 1;
    if (next === null) return;
    e.preventDefault();
    const wrapped = (next + TESTING_TYPES.length) % TESTING_TYPES.length;
    selectType(wrapped);
    tabRefs.current[wrapped]?.focus();
  };

  /* ---------- Submit (Web3Forms) ---------- */
  const showStatus = (nextStatus, text) => {
    clearTimeout(statusTimer.current);
    setStatus(nextStatus);
    setStatusText(text);
    statusTimer.current = setTimeout(() => {
      setStatus("idle");
      setStatusText("");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    clearTimeout(statusTimer.current);
    setStatus("sending");
    setStatusText("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("testing_type", currentType.name);
    formData.append("service_selected", selectedService);
    formData.append("subject", `New enquiry — ${currentType.name}: ${selectedService}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        form.reset();
        setSelectedService("");
        setMessageText(buildDefaultMessage(currentType.name));
        showStatus("success", "Thank you! Your enquiry has been sent — we'll get back to you soon.");
      } else {
        showStatus("error", "Something went wrong. Please try again or call us directly.");
      }
    } catch (error) {
      showStatus("error", "Couldn't send your message. Check your connection and try again.");
    }
  };

  /* ---------- Pointer effects ---------- */
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

  const scrollToForm = () =>
    document.getElementById("request-quote")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="ct-page">
      <div className="ct-scroll-progress" ref={progressRef}></div>

      {/* ==========================================
          🎬 HERO
          ========================================== */}
      <section
        className={`ct-hero ${visibleSections.hero ? "ct-in" : ""}`}
        ref={(el) => {
          heroRef.current = el;
          addToRefs(el, 0);
        }}
        data-section="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10, 22, 40, 0.9) 0%, rgba(35, 87, 129, 0.76) 100%), url(${mineralsBackground})`,
        }}
      >
        <div className="ct-hero-spotlight" aria-hidden="true"></div>
        <div className="ct-hero-grid" aria-hidden="true"></div>
        <div className="ct-hero-scanline" aria-hidden="true"></div>

        <div className="ct-hero-particles" aria-hidden="true">
          {particles.map((p) => (
            <span
              key={p.id}
              className="ct-hero-particle"
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

        <div className="ct-container">
          <div className="ct-hero-content">
            <div className="ct-hero-badge ct-hero-step" style={{ "--d": "0.05s" }}>
              <span className="ct-badge-dot"></span>
              NDT &amp; DT Services
            </div>

            <p className="ct-hero-subtitle ct-hero-step" style={{ "--d": "0.18s" }}>
              Let&apos;s discuss your NDT &amp; DT testing and inspection needs.
              <br />
              Reliable testing solutions for quality and safety.
            </p>
            
          </div>
        </div>

        <div className="ct-hero-scroll" aria-hidden="true">
          <div className="ct-scroll-mouse">
            <div className="ct-scroll-wheel"></div>
          </div>
          <div className="ct-scroll-text">Scroll Down</div>
        </div>
      </section>

      {/* ==========================================
          📝 FORM — id="request-quote" (ServiceDetailModal scrolls here)
          ========================================== */}
      <section
        className={`ct-form-section ${visibleSections.form ? "ct-in" : ""}`}
        id="request-quote"
        ref={(el) => addToRefs(el, 1)}
        data-section="form"
      >
        <div className="ct-bg-orb ct-bg-orb-1" aria-hidden="true"></div>
        <div className="ct-bg-orb ct-bg-orb-2" aria-hidden="true"></div>

        <div className="ct-container">
          <SectionHeader
            Icon={MessageSquare}
            badge="Send Enquiry"
            before="Request a"
            highlight="Test Quote"
            subtitle="Select your testing type and we'll get back within 24 hours"
          />

          <div className="ct-form-card ct-reveal" style={{ "--d": "0.12s" }}>
            {/* ---------- Left: info panel ---------- */}
            <aside className="ct-form-aside">
              <div className="ct-form-aside-pattern" aria-hidden="true"></div>

              <span className="ct-eyebrow">Get in touch</span>
              <h3 className="ct-aside-title">Tell us what you need tested</h3>
              <p className="ct-aside-text">
                Share a few details about your component and testing requirement — our team will
                reply with the right method and a quotation.
              </p>

              <div className="ct-aside-image">
                <img draggable="false" src={contactImage} alt="" />
                <span className="ct-aside-image-ring" aria-hidden="true"></span>
              </div>

              <ul className="ct-aside-perks">
                {FORM_PERKS.map(({ Icon, text }, i) => (
                  <li key={text} style={{ "--i": i }}>
                    <span>
                      <Icon size={16} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="ct-aside-links">
                <a href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>
                  <Phone size={15} />
                  {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`}>
                  <Mail size={15} />
                  {COMPANY.email}
                </a>
              </div>
            </aside>

            {/* ---------- Right: form ---------- */}
            <form
              ref={formRef}
              id="ct-contact-form"
              className="ct-form"
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
              <input type="hidden" name="from_name" value="Technoking Website — Contact Form" />

              {/* Step 1 — testing type */}
              <div className="ct-step">
                <span className="ct-step-label">
                  <b>1</b> Testing type
                </span>
                <div className="ct-type-rail" ref={railRef}>
                  <div className="ct-type-track" role="tablist" aria-label="Testing type">
                    <span
                      className={`ct-type-indicator ${indicator.ready ? "is-ready" : ""}`}
                      style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
                      aria-hidden="true"
                    ></span>
                    {TESTING_TYPES.map((type, index) => {
                      const isActive = activeTestingType === index;
                      return (
                        <button
                          key={type.id}
                          ref={(el) => (tabRefs.current[index] = el)}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          tabIndex={isActive ? 0 : -1}
                          className={`ct-type-tab ${isActive ? "is-active" : ""}`}
                          onClick={() => selectType(index)}
                          onKeyDown={(e) => onTabKeyDown(e, index)}
                        >
                          <type.Icon size={16} />
                          <span>{type.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 2 — service */}
              <div className="ct-step">
                <label className="ct-step-label" htmlFor="ct-service">
                  <b>2</b> Testing service
                </label>
                <div className="ct-select-wrap" key={currentType.id}>
                  <currentType.Icon size={18} className="ct-select-icon" />
                  <select
                    id="ct-service"
                    name="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                  >
                    <option value="">Select a test / service</option>
                    {currentType.services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3 — details */}
              <div className="ct-step">
                <span className="ct-step-label">
                  <b>3</b> Your details
                </span>

                <div className="ct-fields">
                  <div className="ct-field">
                    <input id="ct-name" type="text" name="name" placeholder=" " autoComplete="name" required />
                    <label htmlFor="ct-name">Full Name</label>
                    <User size={18} className="ct-field-icon" />
                    <span className="ct-field-line" aria-hidden="true"></span>
                  </div>

                  <div className="ct-field">
                    <input id="ct-email" type="email" name="email" placeholder=" " autoComplete="email" required />
                    <label htmlFor="ct-email">Email Address</label>
                    <Mail size={18} className="ct-field-icon" />
                    <span className="ct-field-line" aria-hidden="true"></span>
                  </div>

                  <div className="ct-field ct-field-full">
                    <input id="ct-phone" type="tel" name="phone" placeholder=" " autoComplete="tel" />
                    <label htmlFor="ct-phone">Phone Number (optional)</label>
                    <Phone size={18} className="ct-field-icon" />
                    <span className="ct-field-line" aria-hidden="true"></span>
                  </div>

                  <div className="ct-field ct-field-full ct-field-message">
                    <textarea
                      id="ct-message"
                      name="message"
                      placeholder=" "
                      required
                      maxLength={MESSAGE_MAX}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <label htmlFor="ct-message">Your Message</label>
                    <MessageSquare size={18} className="ct-field-icon" />
                    <span className="ct-field-line" aria-hidden="true"></span>
                    <span className="ct-char-count">
                      {messageText.length}/{MESSAGE_MAX}
                    </span>
                  </div>
                </div>
              </div>

              {/* honeypot */}
              <input type="checkbox" name="botcheck" className="ct-hidden" tabIndex={-1} aria-hidden="true" />

              <div className="ct-submit-row">
                <button
                  type="submit"
                  className={`ct-submit ${isSubmitting ? "is-sending" : ""} ${
                    status === "success" ? "is-success" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  <span className="ct-submit-fill" aria-hidden="true"></span>
                  <span className="ct-submit-text">
                    {isSubmitting ? "Sending…" : status === "success" ? "Sent!" : "Send Enquiry"}
                  </span>
                  <span className="ct-submit-icon">
                    {isSubmitting ? (
                      <Loader2 size={18} className="ct-spin" />
                    ) : status === "success" ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Send size={18} />
                    )}
                  </span>
                </button>
                <p className="ct-submit-note">
                  <ShieldCheck size={14} />
                  Your details are only used to reply to your enquiry.
                </p>
              </div>

              <div className="ct-status-slot" aria-live="polite">
                {statusText && (
                  <div className={`ct-status ct-status-${status}`} role="status">
                    {status === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                    {statusText}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ==========================================
          📇 CONTACT CARDS
          ========================================== */}
      <section
        className={`ct-cards-section ${visibleSections.cards ? "ct-in" : ""}`}
        ref={(el) => addToRefs(el, 2)}
        data-section="cards"
      >
        <div className="ct-container">
          <SectionHeader
            Icon={Compass}
            badge="Connect With Us"
            before="How to"
            highlight="Reach Us"
            subtitle="We're here to help. Reach out through any of these channels — just tap a card."
          />

          <div className="ct-cards">
            {CONTACT_CARDS.map((item, index) => (
              <a
                key={item.title}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="ct-card"
                style={{ "--d": `${0.12 + index * 0.12}s` }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                aria-label={`${item.title}: ${item.actionLabel}`}
              >
                <span className="ct-card-inner">
                  <span className="ct-card-fill" aria-hidden="true"></span>
                  <span className="ct-card-glow" aria-hidden="true"></span>
                  <span className="ct-card-number" aria-hidden="true">
                    0{index + 1}
                  </span>

                  <span className="ct-card-icon">
                    <item.Icon size={30} strokeWidth={1.8} />
                    <span className="ct-card-icon-ring" aria-hidden="true"></span>
                  </span>
                  <span className="ct-card-title">{item.title}</span>
                  <span className="ct-card-text">{item.description}</span>
                  <span className="ct-card-cta">
                    {item.actionLabel}
                    {item.external ? <ExternalLink size={15} /> : <ArrowRight size={15} />}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          🗺️ MAP
          ========================================== */}
      <section
        className={`ct-map-section ${visibleSections.map ? "ct-in" : ""}`}
        ref={(el) => addToRefs(el, 3)}
        data-section="map"
      >
        <div className="ct-container">
          <div className="ct-map-card ct-reveal" style={{ "--d": "0s" }}>
            <div className={`ct-map-frame ${mapLoaded ? "is-loaded" : ""}`}>
              {visibleSections.map && (
                <iframe
                  title={`${COMPANY.name} location map`}
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  onLoad={() => setMapLoaded(true)}
                />
              )}
              <div className="ct-map-placeholder" aria-hidden="true">
                <span className="ct-map-pin">
                  <MapPin size={30} />
                </span>
              </div>
            </div>

            <div className="ct-map-info">
              <span className="ct-map-info-icon">
                <MapPin size={24} />
                <span className="ct-map-info-pulse" aria-hidden="true"></span>
              </span>
              <span className="ct-eyebrow">Visit our laboratory</span>
              <h3>Visit Our Location</h3>
              <p className="ct-map-name">{COMPANY.name}</p>
              <p className="ct-map-address">
                <AddressBlock />
              </p>
              <div className="ct-map-actions">
                <a
                  className="ct-map-btn ct-map-btn-primary"
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation size={16} />
                  Get Directions
                </a>
                <a className="ct-map-btn" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
