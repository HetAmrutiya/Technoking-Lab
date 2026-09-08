import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import mineral1 from "../../assets/ut.jpg";
import mineral2 from "../../assets/ut2.jpg";
import mineral3 from "../../assets/ut3.jpg";

const sliderImages = [mineral1, mineral2, mineral3];

const Header = () => {
  const services = [
    "Ultrasonic Testing (UT)",
    "Magnetic Particle Testing (MPT)",
    "Dye Penetrant Testing (DPT)",
    "Phase Array Ultrasonic Testing (PAUT)",
    "Eddy Current Testing(ET)",
    "Portable Spectro Testing()",
    "Positive Material Identification (PMI)",
    "Thickness Gauging & Corrosion Mapping (TT)",
    "Hardness Testing & Metallography(HT)",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState(0);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 30;
      const y = (clientY / window.innerHeight) * 30;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Enhanced Typing Animation
  useEffect(() => {
    const currentService = services[index];

    if (subIndex === currentService.length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % services.length);
      setActiveService((prev) => (prev + 1) % services.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));
        setText(currentService.substring(0, subIndex));
      },
      deleting ? 30 : 80
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, services]);

  // Background Slider with enhanced transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Title animation on load
  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (title && subtitle) {
      setTimeout(() => {
        title.classList.add("animate-in");
        subtitle.classList.add("animate-in");
      }, 500);
    }
  }, []);

  const handleExplore = () => {
    if (window.location.pathname === "/") {
      const element = document.getElementById("products");
      if (element) {
        return element.scrollIntoView({ behavior: "smooth" });
      }
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

  const navigate = useNavigate();

  return (
    <div className="header-container2" id="home">
      {/* Animated Background Layers */}
      <div className="background-layers">
        {sliderImages.map((image, idx) => (
          <div
            key={idx}
            className={`background-layer ${idx === bgIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url(${image})`,
              transform: `translateX(${mousePosition.x * 0.02}px) translateY(${
                mousePosition.y * 0.02
              }px) scale(1.1)`,
            }}
          />
        ))}
      </div>

      {/* Animated Geometric Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1" style={{ animationDelay: "0s" }}></div>
        <div className="shape shape-2" style={{ animationDelay: "2s" }}></div>
        <div className="shape shape-3" style={{ animationDelay: "4s" }}></div>
        <div className="shape shape-4" style={{ animationDelay: "1s" }}></div>
        <div className="shape shape-5" style={{ animationDelay: "3s" }}></div>
      </div>

      {/* Animated Overlay */}
      <div className="dynamic-overlay">
        <div
          className="moving-gradient"
          style={{
            transform: `translateX(${mousePosition.x * 0.03}px) translateY(${
              mousePosition.y * 0.03
            }px)`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="header-content">
        {/* Main Title with Split Animation */}
        <div className="title-wrapper">
          <h1 className="main-title" ref={titleRef}>
            <span className="title-word title-word-1">Technoking</span>
            <span className="title-word title-word-2">Engineers Pvt Ltd</span>
          </h1>
          <div className="title-underline-animated"></div>
        </div>

        {/* Animated Subtitle */}
        <div className="subtitle-wrapper" ref={subtitleRef}>
          <h2 className="main-subtitle">
            <span className="subtitle-prefix">Leading Provider of </span>
            <span className="typing-container">
              <span className="typed-text">{text}</span>
              <span className="typing-cursor">|</span>
            </span>
          </h2>
        </div>

        {/* Service Progress Indicator */}
        <div className="service-indicator">
          <div className="service-progress">
            {services.map((_, idx) => (
              <div
                key={idx}
                className={`service-dot ${
                  idx === activeService ? "active" : ""
                }`}
                onClick={() => {
                  setIndex(idx);
                  setSubIndex(0);
                  setDeleting(false);
                  setActiveService(idx);
                }}
              />
            ))}
          </div>
          <div className="service-counter">
            <span className="current-service">{activeService + 1}</span>
            <span className="total-services">/{services.length}</span>
          </div>
        </div>

        {/* Animated CTA Buttons */}
        <div className="cta-wrapper">
          <button className="explore-btn" onClick={handleExplore}>
            <span className="btn-glow"></span>
            <span className="btn-text">Explore Services</span>
            <span className="btn-arrow">→</span>
            <div className="btn-liquid"></div>
          </button>

          <button className="contact-btn" onClick={handleContact}>
            <span className="btn-text">Get In Touch</span>
            <div className="btn-ripple"></div>
          </button>
        </div>
      </div>

      {/* Bottom Wave Animation */}
      <div className="bottom-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none"></svg>
      </div>
    </div>
  );
};

export default Header;
