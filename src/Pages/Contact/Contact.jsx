import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhoneCall } from "react-icons/lu";
import contactImage from "../../assets/contact1.png";
import mineralsBackground from "../../assets/ut.jpg";
import { Compass, Activity, BarChart3, Layers, Cpu, Wrench } from "lucide-react";

/* ============================================================
   📍 COMPANY / LOCATION DETAILS  —  EDIT ONLY HERE
   ============================================================ */
const COMPANY = {
  name: "Technoking Testlab Pvt. Ltd.",
  addressLines: [
    "Plot No. 2, Shyam Industrial Area,",
    "Bakrol Bujrang, Ahm, Guj 382430",
  ],
  email: "info@technokingtestlab.com",
  phone: "+91 95124 00501",
};

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Technoking Testlab Pvt. Ltd., Plot No. 2, Shyam Industrial Area, Bakrol Bujrang, Ahmedabad, Gujarat 382430"
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

/* ============================================================
   🔬 NDT & DT TESTING TYPES — used in the form selector
   ============================================================ */
const testingTypes = [
  {
    id: "ndt",
    name: "NDT Testing",
    icon: <Activity size={16} />,
    services: [
      "Ultrasonic Testing (UT)",
      "Magnetic Particle Testing (MPT)",
      "Dye Penetrant Testing (DPT)",
      "Phase Array Ultrasonic Testing (PAUT)",
      "Eddy Current Testing (ET)",
      "Portable Spectro Testing (PST)",
    ],
  },
  {
    id: "dt",
    name: "DT Testing",
    icon: <BarChart3 size={16} />,
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
    id: "material",
    name: "Material Testing",
    icon: <Layers size={16} />,
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
    id: "advanced",
    name: "Advanced NDT",
    icon: <Cpu size={16} />,
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
    id: "mechanical",
    name: "Mechanical Testing",
    icon: <Wrench size={16} />,
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
   href  →  what opens on click
   external  →  true = opens in a new tab (Google Maps)
   ============================================================ */
const contactData = [
  {
    icon: <SlLocationPin style={{ fontSize: 30, color: "#235781" }} />,
    title: "Our Address",
    description: <AddressBlock />,
    href: MAPS_URL,
    external: true,
    actionLabel: "Open in Google Maps",
  },
  {
    icon: <HiOutlineMail style={{ fontSize: 30, color: "#235781" }} />,
    title: "Email Us",
    description: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    external: false,
    actionLabel: "Send an Email",
  },
  {
    icon: <LuPhoneCall style={{ fontSize: 30, color: "#235781" }} />,
    title: "Call Us",
    description: COMPANY.phone,
    href: `tel:${COMPANY.phone.replace(/\s+/g, "")}`,
    external: false,
    actionLabel: "Call Now",
  },
];

/* Helper: builds the default auto-filled message for a given type */
const buildDefaultMessage = (typeName) => `Testing Type: ${typeName}`;

const Contact = () => {
  const cardsRef = useRef([]);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // 🎯 Testing type + selected service
  const [activeTestingType, setActiveTestingType] = useState(0);
  const [selectedService, setSelectedService] = useState("");

  // 📝 Controlled message — auto updates with the active testing type
  const [messageText, setMessageText] = useState(
    buildDefaultMessage(testingTypes[0].name)
  );

  const formRef = useRef(null);
  const heroRef = useRef(null);

  // 🔵 Primary Blue Colors
  const primaryColor = "#235781";
  const primaryLight = "#4A82A8";

  // ============================================
  // 📝 KEEP "Your Message" IN SYNC WITH TESTING TYPE
  // ============================================
  useEffect(() => {
    setMessageText(buildDefaultMessage(testingTypes[activeTestingType].name));
  }, [activeTestingType]);

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

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    formData.append("testing_type", testingTypes[activeTestingType].name);
    formData.append("service_selected", selectedService);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        form.reset();
        setSelectedService("");
        setSuccessMessage("Message sent successfully!");
        setMessageText(buildDefaultMessage(testingTypes[activeTestingType].name));
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

  const currentTestingType = testingTypes[activeTestingType];

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
              NDT & DT Services
            </div>

            <p className="qc-hero-subtitle">
              Let&apos;s discuss your NDT & DT testing and inspection needs.
              <br />
              Reliable testing solutions for quality and safety.
            </p>
          </div>
        </div>

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
            Send Enquiry
          </div>
          <h2 className="qc-form-heading qc-text-shimmer">
            Request a <span style={{ color: primaryColor }}>Test Quote</span>
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
            Select your testing type and we&apos;ll get back within 24 hours
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

              {/* ==========================================
                  🔬 TESTING TYPE SELECTOR (COMPACT TABS)
                  ========================================== */}
              <div className="qc-testing-type-selector">
                {testingTypes.map((type, index) => (
                  <button
                    key={type.id}
                    type="button"
                    className={`qc-testing-tab ${
                      activeTestingType === index ? "qc-testing-tab-active" : ""
                    }`}
                    onClick={() => {
                      setActiveTestingType(index);
                      setSelectedService("");
                    }}
                    style={
                      activeTestingType === index
                        ? {
                            borderColor: primaryColor,
                            color: primaryColor,
                            background: `${primaryColor}10`,
                            boxShadow: `0 6px 18px ${primaryColor}25`,
                          }
                        : {}
                    }
                    title={type.name}
                  >
                    <span className="qc-tab-icon-wrap">{type.icon}</span>
                    <span className="qc-tab-label">{type.name}</span>
                  </button>
                ))}
              </div>

              {/* ==========================================
                  🔬 SERVICE DROPDOWN FOR SELECTED TYPE
                  ========================================== */}
              <div className="qc-service-select">
                <label className="qc-service-label">Testing Service</label>
                <select
                  name="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  required
                >
                  <option value="">Select a test / service</option>
                  {currentTestingType.services.map((service, idx) => (
                    <option key={idx} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

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

                {/* ==========================================
                    📝 YOUR MESSAGE — controlled + auto-filled
                    ========================================== */}
                <div className="qc-form-message qc-input-float">
                  <textarea
                    name="message"
                    placeholder=" "
                    required
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
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
                    {isSubmitting ? "Sending..." : "Send Enquiry"}
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
          📇 CONTACT CARDS — entire card is clickable
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
            channels — just tap a card
          </p>
        </div>

        <div className="qc-contact-card-container">
          {contactData.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="qc-contact-card qc-contact-card-link"
              ref={(el) => (cardsRef.current[index] = el)}
              data-index={index}
              onMouseMove={handleCardMouseMove}
              aria-label={item.actionLabel}
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

              {/* Small "action" hint that appears on hover */}
              <span className="qc-contact-card-cta">
                {item.actionLabel} <span className="qc-cta-arrow">→</span>
              </span>

              <div
                className="qc-card-hover-line"
                style={{
                  background: `linear-gradient(90deg, ${primaryColor}, ${primaryLight})`,
                }}
              ></div>
              <div className="qc-card-number">0{index + 1}</div>
            </a>
          ))}
        </div>
      </div>

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