import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhoneCall } from "react-icons/lu";
import contactImage from "../../assets/contact1.png";
import mineralsBackground from "../../assets/ut.jpg";
import Footer from "../../Components/Footer/Footer";
import { Compass } from "lucide-react";

/* ============================================================
   📍 COMPANY / LOCATION DETAILS  —  EDIT ONLY HERE
   Every place on the page (cards + map + Google Maps button)
   reads from this single object, so nothing can ever mismatch.
   ============================================================ */
/* ============================================================
   📍 COMPANY / LOCATION DETAILS  —  EDIT ONLY HERE
   ============================================================ */
const COMPANY = {
  name: "Technoking Engineers Pvt. Ltd.",
  addressLines: [
    // "Technoking Engineers Pvt. Ltd.,",
    "Shapar Main Rd, near Mama Dev Temple,",
    "Shapar, Gujarat 360024, India",
  ],
  email: "dhaval@ndttesting.co.in",
  phone: "+91 76005 78888",
};

/* Google Maps link built from the SAME address above */
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Technoking Engineers Pvt. Ltd., Shapar Main Rd, near Mama Dev Temple, Shapar, Gujarat 360024"
)}`;

/* Small helper that renders the address with proper line breaks */
const AddressBlock = () => (
  <>
    {COMPANY.addressLines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < COMPANY.addressLines.length - 1 && <br />}
      </React.Fragment>
    ))}
  </>
);

const contactData = [
  {
    icon: <SlLocationPin style={{ fontSize: 30, color: "#235781" }} />,
    title: "Our Address",
    description: <AddressBlock />,
  },
  {
    icon: <HiOutlineMail style={{ fontSize: 30, color: "#235781" }} />,
    title: "Email Us",
    description: (
      <a
        href={`mailto:${COMPANY.email}`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        {COMPANY.email}
      </a>
    ),
  },
  {
    icon: <LuPhoneCall style={{ fontSize: 30, color: "#235781" }} />,
    title: "Call Us",
    description: (
      <a
        href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        {COMPANY.phone}
      </a>
    ),
  },
];

const Contact = () => {
  const cardsRef = useRef([]);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const formRef = useRef(null);
  const heroRef = useRef(null);

  // 🔵 Primary Blue Colors
  const primaryColor = "#235781";
  const primaryLight = "#4A82A8";

  // ============================================
  // 📜 SCROLL PROGRESS
  // ============================================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================
  // 🖱️ MOUSE PARALLAX FOR 3D EFFECT
  // (writes CSS variables directly – no re-renders)
  // ============================================
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      hero.style.setProperty("--mouse-x", `${x}%`);
      hero.style.setProperty("--mouse-y", `${y}%`);
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const addToRefs = (el, index) => {
    sectionRefs.current[index] = el;
  };

  // Enhanced intersection observer with staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.section;
            if (key) {
              setVisibleSections((prev) => ({ ...prev, [key]: true }));
            }

            if (entry.target.classList.contains("qc-contact-card")) {
              setTimeout(() => {
                entry.target.classList.add("qc-card-pop-in");
              }, (Number(entry.target.dataset.index) || 0) * 200);
            } else {
              entry.target.classList.add("qc-fade-in-up");
            }

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.dataset.index = index;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Form submission handler with animation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        form.reset();
        setSuccessMessage("Message sent successfully!");
      } else {
        setSuccessMessage("Something went wrong! Try again.");
      }
    } catch (error) {
      setSuccessMessage("Error sending message!");
    }

    setTimeout(() => setSuccessMessage(""), 2000);
    setIsSubmitting(false);
  };

  // Makes the card glow follow the cursor
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty(
      "--mouse-x",
      `${((e.clientX - rect.left) / rect.width) * 100}%`
    );
    card.style.setProperty(
      "--mouse-y",
      `${((e.clientY - rect.top) / rect.height) * 100}%`
    );
  };

  return (
    <div className="qc-contact-container">
      {/* ==========================================
          📊 SCROLL PROGRESS BAR
          ========================================== */}
      <div
        className="qc-scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* ==========================================
          🎬 HERO SECTION WITH 3D EFFECT
          ========================================== */}
      <section
        className="qc-contact-hero"
        ref={(el) => {
          heroRef.current = el;
          addToRefs(el, 0);
        }}
        data-section="hero"
        style={{
          background: `linear-gradient(135deg, rgba(10, 22, 40, 0.88) 0%, rgba(35, 87, 129, 0.75) 100%), url(${mineralsBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* 3D Floating Particles */}
        <div className="qc-hero-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="qc-hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${12 + Math.random() * 18}s`,
                animationDelay: `${Math.random() * 10}s`,
                width: `${4 + Math.random() * 10}px`,
                height: `${4 + Math.random() * 10}px`,
                background: `rgba(74, 130, 168, ${0.08 + Math.random() * 0.2})`,
              }}
            ></div>
          ))}
        </div>

        <div className="qc-container">
          <div
            className={`qc-hero-content ${
              visibleSections.hero ? "qc-animate-in" : ""
            }`}
          >
            <div className="qc-hero-badge qc-badge-pulse">
              <span className="qc-badge-dot"></span>
              Get In Touch
            </div>

            {/* <h1 className="qc-hero-title">
              <span className="qc-title-line">
                Contact <span className="qc-hero-highlight">Us</span>
              </span>
            </h1> */}

            <p className="qc-hero-subtitle">
              Let&apos;s discuss your testing and inspection needs.
              <br />
              Reliable NDT solutions for quality and safety.
            </p>
          </div>
        </div>

        {/* 3D Scroll Indicator */}
        <div className="qc-hero-scroll qc-scroll-3d">
          <div className="qc-scroll-mouse">
            <div className="qc-scroll-wheel"></div>
          </div>
          <div className="qc-scroll-text">Scroll Down</div>
        </div>
      </section>

      {/* ==========================================
          📝 CONTACT FORM SECTION
          ========================================== */}
      <section
        className="qc-contact-form-section"
        id="contact-form"
        ref={(el) => addToRefs(el, 1)}
        data-section="form"
      >
        <div className="qc-form-pattern"></div>

        <div className="qc-section-header qc-form-header">
          <div className="qc-section-badge" style={{ background: primaryColor }}>
            <MessageSquare size={16} />
            Send Message
          </div>
          <h2 className="qc-form-heading qc-text-shimmer">
            Get in <span style={{ color: primaryColor }}>Touch</span>
          </h2>
          <div className="qc-section-divider">
            <div
              className="qc-divider-line"
              style={{
                background: `linear-gradient(90deg, transparent, ${primaryColor})`,
              }}
            ></div>
            <div
              className="qc-divider-dot qc-pulse-dot"
              style={{ background: primaryColor }}
            ></div>
            <div
              className="qc-divider-line"
              style={{
                background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
              }}
            ></div>
          </div>
          <p className="qc-form-subheading">
            We&apos;ll get back to you within 24 hours
          </p>
        </div>

        <div className="qc-form-container qc-form-3d">
          <div className="qc-form-content">
            <div className="qc-form-image-box qc-image-float">
              <img draggable="false" src={contactImage} alt="Contact" />
              <div
                className="qc-image-glow"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})`,
                }}
              ></div>
            </div>

            <form
              ref={formRef}
              id="qc-contact-form"
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={handleSubmit}
              className="qc-form-slide-in"
            >
              <input
                type="hidden"
                name="access_key"
                value="5162d798-f96f-4824-a967-12cdaad116e8"
              />

              <div className="qc-form-group">
                <div className="qc-form-field qc-input-float">
                  <input type="text" name="name" placeholder=" " required />
                  <label>Full Name</label>
                  <i className="fas fa-user"></i>
                  <div
                    className="qc-input-focus-line"
                    style={{ background: primaryColor }}
                  ></div>
                </div>

                <div className="qc-form-field qc-input-float">
                  <input type="email" name="email" placeholder=" " required />
                  <label>Email Address</label>
                  <i className="fas fa-envelope"></i>
                  <div
                    className="qc-input-focus-line"
                    style={{ background: primaryColor }}
                  ></div>
                </div>

                <div className="qc-form-field qc-input-float">
                  <input type="text" name="phone" placeholder=" " />
                  <label>Phone Number</label>
                  <i className="fas fa-phone-alt"></i>
                  <div
                    className="qc-input-focus-line"
                    style={{ background: primaryColor }}
                  ></div>
                </div>

                <div className="qc-form-message qc-input-float">
                  <textarea name="message" placeholder=" " required />
                  <label>Your Message</label>
                  <i className="fas fa-comment-dots"></i>
                  <div
                    className="qc-input-focus-line"
                    style={{ background: primaryColor }}
                  ></div>
                </div>
              </div>

              <input
                type="checkbox"
                name="botcheck"
                className="qc-hidden"
                style={{ display: "none" }}
              />

              <div className="qc-button-area">
                <button
                  type="submit"
                  className={`qc-btn-magnetic qc-btn-3d ${
                    isSubmitting ? "qc-btn-loading" : ""
                  }`}
                  disabled={isSubmitting}
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})`,
                  }}
                >
                  <span className="qc-btn-text">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <span className="qc-btn-icon">
                    <i className="fa fa-paper-plane"></i>
                  </span>
                  <span className="qc-btn-glow"></span>
                  <span className="qc-btn-ripple"></span>
                </button>
              </div>

              {successMessage && (
                <div className="qc-success-alert">{successMessage}</div>
              )}
            </form>
          </div>
        </div>

     
      </section>

      {/* ==========================================
          📇 CONTACT CARDS WITH 3D EFFECT
          ========================================== */}
      <div className="qc-contact-cards-wrapper">
        <div className="qc-section-header">
          <div className="qc-section-badge" style={{ background: primaryColor }}>
            <Compass size={16} />
            Connect With Us
          </div>
          <h2 className="qc-section-title">
            How to <span style={{ color: primaryColor }}>Reach Us</span>
          </h2>
          <div className="qc-section-divider">
            <div
              className="qc-divider-line"
              style={{
                background: `linear-gradient(90deg, transparent, ${primaryColor})`,
              }}
            ></div>
            <div
              className="qc-divider-dot qc-pulse-dot"
              style={{ background: primaryColor }}
            ></div>
            <div
              className="qc-divider-line"
              style={{
                background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
              }}
            ></div>
          </div>
          <p className="qc-section-subtitle">
            We&apos;re here to help. Reach out to us through any of these
            channels
          </p>
        </div>

        <div className="qc-contact-card-container">
          {contactData.map((item, index) => (
            <div
              key={index}
              className="qc-contact-card"
              ref={(el) => (cardsRef.current[index] = el)}
              data-index={index}
              onMouseMove={handleCardMouseMove}
            >
              <div
                className="qc-card-glow"
                style={{
                  background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${primaryColor}20, transparent 70%)`,
                }}
              ></div>
              <div className="qc-contact-icon qc-icon-pulse">
                {item.icon}
                <div
                  className="qc-icon-ring"
                  style={{ borderColor: primaryColor }}
                ></div>
              </div>
              <h2 className="qc-contact-card-title">{item.title}</h2>
              <p className="qc-contact-card-description">{item.description}</p>
              <div
                className="qc-card-hover-line"
                style={{
                  background: `linear-gradient(90deg, ${primaryColor}, ${primaryLight})`,
                }}
              ></div>
              <div className="qc-card-number">0{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          🔻 FOOTER
          ========================================== */}

             {/* ==========================================
            🗺️ MAP SECTION — uses the SAME address
            ========================================== */}
        <div className="qc-map-section">
          <div className="qc-map-container qc-map-float">
            <div className="qc-map-overlay">
              <div className="qc-map-icon">
                <SlLocationPin size={48} color="#4A82A8" />
              </div>
              <h3>Visit Our Location</h3>
              <p className="qc-map-address">
                <AddressBlock />
              </p>
              <button
                className="qc-map-btn qc-btn-3d"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})`,
                }}
                onClick={() => window.open(MAPS_URL, "_blank")}
              >
                <i className="fas fa-map-marker-alt"></i>
                View on Google Maps
                <span className="qc-map-arrow">→</span>
              </button>
            </div>
            <div
              className="qc-map-glow"
              style={{
                background: `radial-gradient(circle, ${primaryColor}40, transparent 70%)`,
              }}
            ></div>
          </div>
        </div>
     
    </div>
  );
};

// MessageSquare Icon Component
const MessageSquare = ({ size }) => (
  <svg
    width={size || 16}
    height={size || 16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default Contact;