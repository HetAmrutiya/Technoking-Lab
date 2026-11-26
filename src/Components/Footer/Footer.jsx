import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaArrowUp,
  FaHeadset,
  FaBolt,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaCogs,
} from "react-icons/fa";

/* ============================================
   📍 COMPANY DETAILS — EDIT ONLY HERE
   ============================================ */
const COMPANY = {
  name: "Technoking Testlab Pvt Ltd",
  phone: "+91 95124 00501",
  email: "info@technokingtestlab.com",
  address: "Bakrol Bujrang, Gujarat 382430",
};

/* Same Web3Forms key as the Contact page (newsletter sign-ups arrive by email) */
const WEB3FORMS_KEY = "5162d798-f96f-4824-a967-12cdaad116e8";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Products", path: "/product" },
  { name: "Industries", path: "/industry" },
  { name: "Contact Us", path: "/contact" },
];

/* 🔬 SERVICES — NDT + DT */
const services = [
  { name: "NDT & DT Testing" },
  { name: "Metallurgical Testing" },
  { name: "Chemical & Corrosion Testing" },
  { name: "Geological Survey & Consultancy" },
  { name: "Water & Geotextile Testing" },
];

const socialLinks = [
  { icon: FaFacebook, color: "#1877F2", name: "Facebook", url: "https://facebook.com" },
  { icon: FaInstagram, color: "#E4405F", name: "Instagram", url: "https://instagram.com" },
  { icon: FaLinkedin, color: "#0A66C2", name: "LinkedIn", url: "https://linkedin.com" },
  { icon: FaTwitter, color: "#1DA1F2", name: "Twitter", url: "https://twitter.com" },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [showTop, setShowTop] = useState(false);

  const footerRef = useRef(null);
  const ringRef = useRef(null);
  const statusTimer = useRef(null);

  /* active quick link follows the current route */
  const activeLink = quickLinks.find((l) => l.path === location.pathname)?.name || "";

  /* ---------- reveal when the footer scrolls into view ---------- */
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("ft-in");
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ft-in");
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ---------- back-to-top button + scroll progress ring ---------- */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setShowTop(window.scrollY > 500);
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(126 - 126 * p);
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

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- newsletter ---------- */
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || status === "sending") return;
    setStatus("sending");
    clearTimeout(statusTimer.current);
    try {
      const data = new FormData();
      data.append("access_key", WEB3FORMS_KEY);
      data.append("subject", "New newsletter subscription — website footer");
      data.append("from_name", "Technoking Website — Footer");
      data.append("email", email);
      data.append("message", `Please add ${email} to the newsletter / updates list.`);
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
    statusTimer.current = setTimeout(() => setStatus("idle"), 5000);
  };

  /* links get a light that follows the pointer */
  const spot = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const year = new Date().getFullYear();
  const telHref = `tel:${COMPANY.phone.replace(/\s+/g, "")}`;

  return (
    <footer className="footer ft" ref={footerRef}>
      {/* ---------- animated background ---------- */}
      <div className="footer__bg ft-bg" aria-hidden="true">
        <span className="ft-blob ft-blob-1"></span>
        <span className="ft-blob ft-blob-2"></span>
        <span className="ft-blob ft-blob-3"></span>
        <span className="ft-dots"></span>
        <span className="ft-ring ft-ring-1"></span>
        <span className="ft-ring ft-ring-2"></span>
      </div>

      {/* ---------- CTA band ---------- */}
      <div className="ft-cta-wrap">
        <div className="ft-cta ft-reveal" style={{ "--d": "0s" }}>
          <span className="ft-cta-grid" aria-hidden="true"></span>
          <span className="ft-cta-orb" aria-hidden="true"></span>
          <div className="ft-cta-text">
            <span className="ft-cta-eyebrow">Let&apos;s work together</span>
            <h3>
              Have a component that needs <span>testing?</span>
            </h3>
            <p>Talk to our NDT &amp; DT experts and get the right method and a quotation.</p>
          </div>
          <div className="ft-cta-actions">
            <button type="button" className="ft-btn ft-btn-light" onClick={() => handleNavigation("/contact")}>
              Get Quote
              <FaArrowRight />
            </button>
            <a className="ft-btn ft-btn-ghost" href={telHref}>
              <FaPhone />
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* ---------- main footer content ---------- */}
      <div className="footer__main ft-main">
        <div className="footer__container ft-container">
          {/* Company info */}
          <div className="footer__column footer__column--main ft-col ft-reveal" style={{ "--d": "0.1s" }}>
            <button type="button" className="ft-brand" onClick={() => handleNavigation("/")}>
              <span className="ft-brand-icon">
                <FaBolt />
                <span className="ft-brand-ring" aria-hidden="true"></span>
              </span>
              <span className="ft-brand-text">{COMPANY.name}</span>
            </button>

            <p className="footer__description ft-desc">
              Expert in Non-Destructive Testing (NDT) &amp; Destructive Testing (DT), providing certified
              inspection, testing, analysis, and quality assurance solutions for industrial components and
              equipment.
            </p>

            <div className="footer__contact-info ft-contact">
              <a className="ft-contact-item" href={telHref} onMouseMove={spot}>
                <span className="ft-contact-icon">
                  <FaPhone />
                </span>
                <span className="ft-contact-text">
                  <small>Call us</small>
                  {COMPANY.phone}
                </span>
              </a>
              <a className="ft-contact-item" href={`mailto:${COMPANY.email}`} onMouseMove={spot}>
                <span className="ft-contact-icon">
                  <FaEnvelope />
                </span>
                <span className="ft-contact-text">
                  <small>Email us</small>
                  {COMPANY.email}
                </span>
              </a>
              <div className="ft-contact-item" onMouseMove={spot}>
                <span className="ft-contact-icon">
                  <FaMapMarkerAlt />
                </span>
                <span className="ft-contact-text">
                  <small>Visit us</small>
                  {COMPANY.address}
                </span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer__column ft-col ft-reveal" style={{ "--d": "0.2s" }}>
            <h3 className="ft-title">
              Quick Links
              <span className="ft-title-line" aria-hidden="true"></span>
            </h3>
            <ul className="ft-links">
              {quickLinks.map((link, i) => (
                <li key={link.name} style={{ "--i": i }}>
                  <button
                    type="button"
                    className={`ft-link ${activeLink === link.name ? "is-active" : ""}`}
                    onClick={() => handleNavigation(link.path)}
                    onMouseMove={spot}
                    aria-current={activeLink === link.name ? "page" : undefined}
                  >
                    <span className="ft-link-arrow">
                      <FaArrowRight />
                    </span>
                    <span className="ft-link-text">{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__column ft-col ft-reveal" style={{ "--d": "0.3s" }}>
            <h3 className="ft-title">
              Our Services
              <span className="ft-title-line" aria-hidden="true"></span>
            </h3>
            <ul className="ft-links">
              {services.map((service, i) => (
                <li key={service.name} style={{ "--i": i }}>
                  <button type="button" className="ft-link" onClick={() => handleNavigation("/product")} onMouseMove={spot}>
                    <span className="ft-link-gear">
                      <FaCogs />
                    </span>
                    <span className="ft-link-text">{service.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__column ft-col ft-reveal" style={{ "--d": "0.4s" }}>
            <h3 className="ft-title">
              Stay Updated
              <span className="ft-title-line" aria-hidden="true"></span>
            </h3>

            <p className="ft-news-text">Get the latest updates on our products and industry insights</p>

            <form className={`ft-news-form is-${status}`} onSubmit={handleSubscribe}>
              <div className="ft-news-group">
                <FaEnvelope className="ft-news-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="ft-news-input"
                  aria-label="Email address"
                  required
                />
                <button type="submit" className="ft-news-btn" disabled={status === "sending"}>
                  <span className="ft-news-btn-shine" aria-hidden="true"></span>
                  <span>{status === "sending" ? "Sending" : "Subscribe"}</span>
                  {status === "sending" ? <FaSpinner className="ft-spin" /> : <FaArrowRight className="ft-news-arrow" />}
                </button>
              </div>
              <div className="ft-news-status" aria-live="polite">
                {status === "success" && (
                  <span className="ft-status ft-status-ok">
                    <FaCheckCircle /> Thank you for subscribing!
                  </span>
                )}
                {status === "error" && (
                  <span className="ft-status ft-status-err">
                    <FaExclamationCircle /> Couldn&apos;t subscribe. Please try again.
                  </span>
                )}
              </div>
            </form>

            <a className="ft-support" href={telHref}>
              <span className="ft-support-icon">
                <FaHeadset />
                <span className="ft-support-pulse" aria-hidden="true"></span>
              </span>
              <span className="ft-support-info">
                <span className="ft-support-title">24/7 Support</span>
                <span className="ft-support-number">{COMPANY.phone}</span>
              </span>
              <FaArrowRight className="ft-support-arrow" />
            </a>
          </div>
        </div>
      </div>

      {/* ---------- footer bottom ---------- */}
      <div className="footer__bottom ft-bottom">
        <div className="ft-bottom-line" aria-hidden="true"></div>
        <div className="footer__bottom-container ft-bottom-inner">
          <div className="ft-socials">
            {socialLinks.map((social, i) => (
              <a
                key={social.name}
                href={social.url}
                className="ft-social"
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--social-color": social.color, "--i": i }}
                aria-label={social.name}
                title={social.name}
              >
                <span className="ft-social-fill" aria-hidden="true"></span>
                <social.icon className="ft-social-icon" />
              </a>
            ))}
          </div>

          <p className="ft-copy">
            © {year}{" "}
            <button type="button" className="ft-copy-name" onClick={() => handleNavigation("/")}>
              {COMPANY.name}
            </button>{" "}
            • All Rights Reserved • Crafted with Excellence
          </p>

          <div className="ft-legal">
            <button type="button" className="ft-legal-link" onClick={() => handleNavigation("/privacy")}>
              Privacy Policy
            </button>
            <span className="ft-legal-sep">•</span>
            <button type="button" className="ft-legal-link" onClick={() => handleNavigation("/terms")}>
              Terms of Service
            </button>
            <span className="ft-legal-sep">•</span>
            <button type="button" className="ft-legal-link" onClick={() => handleNavigation("/quality")}>
              Quality Policy
            </button>
          </div>
        </div>
      </div>

      {/* ---------- floating buttons ---------- */}
      <div className="footer__floating-cta ft-floating">
        {/* <button
          type="button"
          className={`ft-top ${showTop ? "is-visible" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          tabIndex={showTop ? 0 : -1}
        >
          <svg className="ft-top-progress" viewBox="0 0 44 44" aria-hidden="true">
            <circle className="ft-top-track" cx="22" cy="22" r="20" />
            <circle className="ft-top-ring" ref={ringRef} cx="22" cy="22" r="20" />
          </svg>
          <FaArrowUp className="ft-top-icon" />
        </button> */}

        <button type="button" className="ft-quote" onClick={() => handleNavigation("/contact")}>
          <span className="ft-quote-pulse" aria-hidden="true"></span>
          <span className="ft-quote-shine" aria-hidden="true"></span>
          <span className="ft-quote-text">Get Quote</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;