import React, { useEffect, useRef, useState } from "react";
import "./About.css";

import mineralsBackground from "../../assets/ut.jpg";
const factoryImage =
  "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
const labImage =
  "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

import certificate1 from "../../assets/certificate3.jpeg";
import certificate2 from "../../assets/certificate2.jpeg";
import certificate3 from "../../assets/certificate3.jpeg";
import certificate4 from "../../assets/certificate4.jpeg";
import Footer from "../../Components/Footer/Footer";

const About = () => {
  const certificates = [certificate1, certificate2, certificate3, certificate4];

  const [visibleSections, setVisibleSections] = useState({});
  const [countersAnimated, setCountersAnimated] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRefs = useRef([]);
  const statsRef = useRef(null);
  const modalRef = useRef(null);
  const heroRef = useRef(null);

  const stats = [
    { number: "1", label: "Years of Innovation", suffix: "+" },
    { number: "1800", label: "Monthly Production", suffix: " tons" },
    { number: "50", label: "Sustainable Projects", suffix: "+" },
  ];

  const coreValues = [
    {
      icon: "🌍",
      title: "Sustainability",
      description:
        "Preserving the environment through responsible resource utilization",
    },
    {
      icon: "🔄",
      title: "Circular Economy",
      description:
        "Promoting sustainable practices and reducing ecological impact",
    },
    {
      icon: "⭐",
      title: "Quality",
      description: "A distinct quality culture in everything we do",
    },
    {
      icon: "👥",
      title: "Innovation",
      description:
        "Leveraging cutting-edge technologies for sustainable processing",
    },
    {
      icon: "🏭",
      title: "Industry Excellence",
      description:
        "Meeting demands of glass, foundry, construction, and chemical industries",
    },
    {
      icon: "💎",
      title: "Purity & Precision",
      description:
        "Superior silica sand and bed material without compromising on quality",
    },
  ];

  useEffect(() => {
    const observers = [];

    // Mouse move effect for hero section
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
      }
    };

    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    // Intersection Observer for stats counter
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            startCounters();
            setCountersAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Mouse move event
    if (heroRef.current) {
      heroRef.current.addEventListener("mousemove", handleMouseMove);
    }

    // Observe sections
    sectionRefs.current.forEach((section) => {
      if (section) {
        sectionObserver.observe(section);
      }
    });

    // Observe stats section
    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    // Close modal on escape key press
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    // Close modal on outside click
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (modalVisible) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "hidden";
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
      sectionObserver.disconnect();
      statsObserver.disconnect();
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "unset";

      if (heroRef.current) {
        heroRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [countersAnimated, modalVisible]);

  const startCounters = () => {
    const counterElements = document.querySelectorAll(".stat-number");

    counterElements.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const suffix = counter.getAttribute("data-suffix") || "";
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + suffix;
        }
      }, 16);
    });
  };

  const addToRefs = (el, index) => {
    sectionRefs.current[index] = el;
  };

  const openCertificateModal = (certificateIndex) => {
    setSelectedCertificate(certificateIndex);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setSelectedCertificate(null);
    }, 300);
  };

  const navigateCertificate = (direction) => {
    if (selectedCertificate === null) return;

    if (direction === "next") {
      setSelectedCertificate((prev) =>
        prev === certificates.length - 1 ? 0 : prev + 1
      );
    } else {
      setSelectedCertificate((prev) =>
        prev === 0 ? certificates.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="about-container" id="about">
      {/* Enhanced Hero Section with Parallax */}
      <section
        className="infrastructure-hero"
        ref={(el) => addToRefs(el, 0)}
        data-section="hero"
      >
        <div
          className="hero-background-image"
          style={{ backgroundImage: `url(${mineralsBackground})` }}
        ></div>
        <div className="hero-blur-overlay"></div>
        <div className="hero-dark-overlay"></div>
        <div className="container">
          <div
            className={`hero-content ${
              visibleSections.hero ? "animate-in" : ""
            }`}
          >
            <h1 className="hero-title">
              <span className="title-line">
                About&nbsp;
                <span className="title-line highlight">Us</span>
              </span>
            </h1>
            <p className="hero-subtitle">
              Cutting-edge technology and seamless operations ensuring superior
              quality and reliability
            </p>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="stats-section" ref={statsRef} data-section="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`stat-card ${countersAnimated ? "animate-in" : ""}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="stat-icon-wrapper">
                  <div className="stat-icon-pulse"></div>
                </div>
                <div
                  className="stat-number"
                  data-target={stat.number}
                  data-suffix={stat.suffix}
                >
                  0
                </div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Introduction Section */}
      <section
        className="intro-section"
        ref={(el) => addToRefs(el, 1)}
        data-section="intro"
      >
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Our Vision</div>
            <h2>Sustainable Innovation</h2>
            <div className="section-divider">
              <div className="divider-dot"></div>
            </div>
          </div>
          <div className="intro-grid">
            <div
              className={`intro-content ${
                visibleSections.intro ? "animate-in" : ""
              }`}
            >
              <div className="content-highlight">
                <p>
                  Welcome to the forefront of innovation and sustainability in
                  industrial practices. Our commitment to preserving the
                  environment while meeting the demands of the glass, foundry,
                  construction, and chemical industries has led us to embrace a
                  groundbreaking solution:{" "}
                  <strong className="highlight-text">
                    Sustainable Processing of Overburden Sand
                  </strong>
                  .
                </p>
              </div>
              <p>
                <strong className="highlight-text">
                  Established in 2023, Balaji Minerals stands at the forefront
                  of sustainable sand processing
                </strong>
                , leveraging Overburden Sand to craft superior Silica Sand and
                Bed Material while preserving the environment.
              </p>
              <p>
                By utilizing Overburden Sand, we contribute to reducing
                ecological impact and promoting a circular economy. Our process
                prioritizes sustainability without compromising on the purity,
                precision, or shelf life of our offerings, aligning with our
                ethos of responsible resource utilization.
              </p>
              <div className="intro-features">
                <div className="feature-tag">Sustainable Processing</div>
                <div className="feature-tag">Circular Economy</div>
                <div className="feature-tag">Eco-Conscious</div>
              </div>
            </div>
            <div
              className={`intro-image ${
                visibleSections.intro ? "animate-in" : ""
              }`}
            >
              <div className="image-frame">
                <img
                  src={factoryImage}
                  alt="Balaji Minerals Sustainable Processing"
                />
                <div className="image-reflection"></div>
              </div>
              <div className="image-glow"></div>
              <div className="floating-badge">
                <span>Since 2023</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission & Quality Section */}
      <section
        className="mission-section"
        ref={(el) => addToRefs(el, 3)}
        data-section="mission"
      >
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Excellence</div>
            <h2>Our Mission & Technology</h2>
            <div className="section-divider">
              <div className="divider-dot"></div>
            </div>
          </div>
          <div className="mission-grid">
            <div
              className={`mission-content ${
                visibleSections.mission ? "animate-in" : ""
              }`}
            >
              <div className="mission-statement">
                <p>
                  Operating within a modern infrastructure powered by
                  cutting-edge technologies, we seamlessly integrate
                  sustainability into our sand processing methods. The use of
                  Overburden Sand further solidifies our mission to champion
                  eco-conscious practices in the industry.
                </p>
              </div>
              <div className="quality-features">
                <div className="quality-item">
                  <div className="quality-icon-wrapper">
                    <div className="quality-icon-bg"></div>
                    <span className="quality-icon">🌱</span>
                  </div>
                  <div className="quality-text">
                    <h4>Sustainable Processing</h4>
                    <p>
                      Innovative Overburden Sand utilization for reduced
                      ecological impact
                    </p>
                  </div>
                  <div className="quality-arrow">→</div>
                </div>
                <div className="quality-item">
                  <div className="quality-icon-wrapper">
                    <div className="quality-icon-bg"></div>
                    <span className="quality-icon">🔬</span>
                  </div>
                  <div className="quality-text">
                    <h4>Quality Assurance</h4>
                    <p>
                      Maintaining purity and precision without compromising
                      sustainability
                    </p>
                  </div>
                  <div className="quality-arrow">→</div>
                </div>
                <div className="quality-item">
                  <div className="quality-icon-wrapper">
                    <div className="quality-icon-bg"></div>
                    <span className="quality-icon">⚡</span>
                  </div>
                  <div className="quality-text">
                    <h4>Modern Technology</h4>
                    <p>
                      Cutting-edge processing methods for superior silica sand
                      production
                    </p>
                  </div>
                  <div className="quality-arrow">→</div>
                </div>
              </div>
            </div>
            <div
              className={`mission-image ${
                visibleSections.mission ? "animate-in" : ""
              }`}
            >
              <div className="image-container">
                <img src={labImage} alt="Sustainable Technology" />
                <div className="image-overlay"></div>
              </div>
              <div className="floating-elements">
                <div className="float-element element-1">
                  <div className="element-inner"></div>
                </div>
                <div className="float-element element-2">
                  <div className="element-inner"></div>
                </div>
                <div className="float-element element-3">
                  <div className="element-inner"></div>
                </div>
              </div>
              <div className="rotating-ring"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Core Values Section */}
      <section
        className="values-section"
        ref={(el) => addToRefs(el, 4)}
        data-section="values"
      >
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Foundation</div>
            <h2>Our Core Values</h2>
            <div className="section-divider">
              <div className="divider-dot"></div>
            </div>
            <p>The foundation of our sustainable approach at Balaji Minerals</p>
          </div>
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`value-card ${
                  visibleSections.values ? "animate-in" : ""
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="value-card-inner">
                  <div className="value-icon-container">
                    <div className="value-icon-bg"></div>
                    <div className="value-icon">{value.icon}</div>
                    <div className="value-icon-glow"></div>
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                  <div className="value-hover-effect"></div>
                  <div className="value-corner value-corner-tl"></div>
                  <div className="value-corner value-corner-tr"></div>
                  <div className="value-corner value-corner-bl"></div>
                  <div className="value-corner value-corner-br"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Customer Engagement Section */}
      <section
        className="engagement-section"
        ref={(el) => addToRefs(el, 5)}
        data-section="engagement"
      >
        <div className="engagement-bg-pattern"></div>
        <div className="container">
          <div className="engagement-content">
            <div
              className={`engagement-text ${
                visibleSections.engagement ? "animate-in" : ""
              }`}
            >
              <div className="engagement-badge">Industry Leadership</div>
              <h2>Our Commitment</h2>
              <div className="section-divider">
                <div className="divider-dot"></div>
              </div>
              <p>
                At Balaji Minerals, we are committed to revolutionizing the sand
                processing industry through sustainable practices. Our focus on
                Overburden Sand processing represents our dedication to
                environmental stewardship while maintaining the highest quality
                standards for our clients in various industries.
              </p>
              <p>
                We believe that industrial progress and environmental
                responsibility can go hand in hand. Through our innovative
                processing methods and commitment to circular economy
                principles, we deliver superior products that meet industry
                demands while minimizing ecological impact.
              </p>
              <div className="engagement-stats">
                <div className="engagement-stat">
                  <div className="stat-circle">
                    <span className="stat-highlight">100%</span>
                  </div>
                  <span>Sustainable Processing</span>
                </div>
                <div className="engagement-stat">
                  <div className="stat-circle">
                    <span className="stat-highlight">Eco</span>
                  </div>
                  <span>Friendly Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Certificates Section */}
      <section
        className="certificates-section"
        ref={(el) => addToRefs(el, 6)}
        data-section="certificates"
      >
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Quality Assurance</div>
            <h2>Our Certifications</h2>
            <div className="section-divider">
              <div className="divider-dot"></div>
            </div>
            <p>
              Commitment to quality and sustainable practices through recognized
              standards
            </p>
          </div>
          <div className="certificates-grid">
            {certificates.map((certificate, index) => (
              <div
                key={index}
                className={`certificate-card ${
                  visibleSections.certificates ? "animate-in" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openCertificateModal(index)}
              >
                <div className="certificate-card-inner">
                  <div className="certificate-image">
                    <img src={certificate} alt={`Certificate ${index + 1}`} />
                    <div className="certificate-overlay">
                      <div className="overlay-content">
                        <span className="view-icon">👁️</span>
                        <span className="view-text">View Certificate</span>
                      </div>
                    </div>
                    <div className="certificate-shine"></div>
                  </div>
                  <div className="certificate-number">
                    <span>Certificate {index + 1}</span>
                  </div>
                  <div className="certificate-hover-border"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Certificate Modal */}
      {selectedCertificate !== null && (
        <div
          className={`certificate-modal ${modalVisible ? "modal-visible" : ""}`}
        >
          <div className="modal-backdrop" onClick={closeModal}></div>
          <div className="modal-content" ref={modalRef}>
            <button className="modal-close" onClick={closeModal}>
              <span>×</span>
              <div className="close-ring"></div>
            </button>

            <button
              className="modal-nav modal-prev"
              onClick={() => navigateCertificate("prev")}
            >
              <span>‹</span>
              <div className="nav-glow"></div>
            </button>

            <div className="modal-image-container">
              <img
                src={certificates[selectedCertificate]}
                alt={`Certificate ${selectedCertificate + 1}`}
                className="modal-image"
              />
              <div className="modal-frame"></div>
            </div>

            <button
              className="modal-nav modal-next"
              onClick={() => navigateCertificate("next")}
            >
              <span>›</span>
              <div className="nav-glow"></div>
            </button>

            <div className="modal-indicator">
              <div className="indicator-dots">
                {certificates.map((_, index) => (
                  <div
                    key={index}
                    className={`indicator-dot ${
                      index === selectedCertificate ? "active" : ""
                    }`}
                  ></div>
                ))}
              </div>
              <span>
                {selectedCertificate + 1} / {certificates.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default About;
