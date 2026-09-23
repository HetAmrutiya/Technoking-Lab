import React, { useState, useEffect } from "react";
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
  FaHeadset,
} from "react-icons/fa";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const path = location.pathname;
    if (path === "/") setActiveLink("Home");
    else if (path === "/about") setActiveLink("About Us");
    else if (path === "/products") setActiveLink("Products");
    else if (path === "/industries") setActiveLink("Industries");
    else if (path === "/infrastructure") setActiveLink("Infrastructure");
    else if (path === "/contact") setActiveLink("Contact Us");

    return () => clearTimeout(timer);
  }, [location]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  const handleNavigation = (path, linkName) => {
    setActiveLink(linkName);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/product" },
    { name: "Industries", path: "/industry" },
    { name: "Contact Us", path: "/contact" },
  ];

  // ============================================
  // 🔬 SERVICES — NDT + DT
  // ============================================
  const services = [
    // ---------- NDT ----------
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

  return (
    <footer className={`footer ${isVisible ? "footer--visible" : ""}`}>
      {/* Animated Background */}
      <div className="footer__bg">
        <div className="footer__particle footer__particle--1"></div>
        <div className="footer__particle footer__particle--2"></div>
        <div className="footer__particle footer__particle--3"></div>
        <div className="footer__particle footer__particle--4"></div>
        <div className="footer__glow footer__glow--left"></div>
        <div className="footer__glow footer__glow--right"></div>
      </div>

      {/* Main Footer Content */}
      <div className="footer__main">
        <div className="footer__container">
          {/* Company Info Column */}
          <div className="footer__column footer__column--main">
            <div className="footer__brand">
              <div className="footer__logo">
                <div className="footer__logo-icon">⚡</div>
                <h2
                  className="footer__logo-text"
                  onClick={() => handleNavigation("/", "Home")}
                  style={{ cursor: "pointer" }}
                >
                  Technoking Testlab Pvt Ltd
                </h2>
              </div>
              <div className="footer__logo-glow"></div>
            </div>

            <p className="footer__description">
              Expert in Non-Destructive Testing (NDT) & Destructive Testing (DT),
              providing certified inspection, testing, analysis, and quality
              assurance solutions for industrial components and equipment.
            </p>

            {/* Contact Info */}
            <div className="footer__contact-info">
              <div
                className="contact-item"
                onClick={() => handleNavigation("/contact", "Contact Us")}
                style={{ cursor: "pointer" }}
              >
                <FaPhone className="contact-item__icon" />
                <span className="contact-item__text">+91 95124 00501</span>
              </div>
              <div
                className="contact-item"
                onClick={() => handleNavigation("/contact", "Contact Us")}
                style={{ cursor: "pointer" }}
              >
                <FaEnvelope className="contact-item__icon" />
                <span className="contact-item__text">
                  info@technokingtestlab.com
                </span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-item__icon" />
                <span className="contact-item__text">
                  Bakrol Bujrang, Gujarat 382430
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer__column">
            <h3 className="footer__title">
              <span className="footer__title-text">Quick Links</span>
              <div className="footer__title-underline"></div>
            </h3>
            <ul className="footer__links">
              {quickLinks.map((link, index) => (
                <li key={index} className="footer__link-item">
                  <div
                    className={`footer__link ${
                      activeLink === link.name ? "footer__link--active" : ""
                    }`}
                    onClick={() => handleNavigation(link.path, link.name)}
                  >
                    <span className="footer__link-icon">›</span>
                    <span className="footer__link-text">{link.name}</span>
                    <div className="footer__link-hover"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services Column — NDT + DT */}
          <div className="footer__column">
            <h3 className="footer__title">
              <span className="footer__title-text">Our Services</span>
              <div className="footer__title-underline"></div>
            </h3>
            <ul className="footer__links">
              {services.map((service, index) => (
                <li key={index} className="footer__link-item">
                  {service.isHeader ? (
                    <div
                      className="footer__link footer__link--section"
                      style={{
                        fontWeight: 700,
                        color: "var(--prod-primary-color)",
                        paddingTop: index === 0 ? "0" : "12px",
                        paddingBottom: "6px",
                        cursor: "default",
                      }}
                    >
                      <span
                        className="footer__link-icon"
                        style={{ color: "var(--prod-primary-color)" }}
                      >
                        {service.name === "NDT Testing" ? "🔬" : "🔨"}
                      </span>
                      <span className="footer__link-text">{service.name}</span>
                    </div>
                  ) : (
                    <div
                      className="footer__link"
                      onClick={() => handleNavigation("/product", "Products")}
                    >
                      <span className="footer__link-icon">⚙️</span>
                      <span className="footer__link-text">{service.name}</span>
                      <div className="footer__link-hover"></div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer__column">
            <h3 className="footer__title">
              <span className="footer__title-text">Stay Updated</span>
              <div className="footer__title-underline"></div>
            </h3>

            <div className="footer__newsletter">
              <p className="newsletter__text">
                Get the latest updates on our products and industry insights
              </p>

              <form className="newsletter__form" onSubmit={handleSubscribe}>
                <div className="newsletter__input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="newsletter__input"
                    required
                  />
                  <button type="submit" className="newsletter__button">
                    <span className="newsletter__button-text">Subscribe</span>
                    <FaArrowRight className="newsletter__button-icon" />
                    <div className="newsletter__button-glow"></div>
                  </button>
                </div>
              </form>

              {/* Support Info */}
              <div
                className="footer__support"
                onClick={() => handleNavigation("/contact", "Contact Us")}
                style={{ cursor: "pointer" }}
              >
                <FaHeadset className="support__icon" />
                <div className="support__info">
                  <div className="support__title">24/7 Support</div>
                  <div className="support__number">+91 95124 00501</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <div className="footer__socials">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--social-color": social.color }}
                aria-label={social.name}
              >
                <div className="social-link__icon">
                  <social.icon />
                </div>
                <div className="social-link__ring"></div>
                <div className="social-link__glow"></div>
              </a>
            ))}
          </div>

          <div className="footer__copyright">
            <p className="copyright__text">
              © 2025{" "}
              <span
                className="copyright__highlight"
                onClick={() => handleNavigation("/", "Home")}
                style={{ cursor: "pointer" }}
              >
                Technoking Testlab Pvt Ltd
              </span>{" "}
              • All Rights Reserved • Crafted with Excellence
            </p>
          </div>

          <div className="footer__legal">
            <div
              className="legal-link"
              onClick={() => handleNavigation("/privacy", "Privacy Policy")}
            >
              Privacy Policy
            </div>
            <span className="legal-separator">•</span>
            <div
              className="legal-link"
              onClick={() => handleNavigation("/terms", "Terms of Service")}
            >
              Terms of Service
            </div>
            <span className="legal-separator">•</span>
            <div
              className="legal-link"
              onClick={() => handleNavigation("/quality", "Quality Policy")}
            >
              Quality Policy
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="footer__floating-cta">
        <div
          className="floating-cta__bubble"
          onClick={() => handleNavigation("/contact", "Contact Us")}
        >
          <span className="floating-cta__text">Get Quote</span>
          <div className="floating-cta__pulse"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;