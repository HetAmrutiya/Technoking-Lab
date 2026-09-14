import React, { useEffect, useRef, useState } from "react";
import "./Certificate.css";
import { Award, Download, FileText, ShieldCheck } from "lucide-react";
import mineralsBackground from "../../assets/ut.jpg";

/* ============================================================
   📜 CERTIFICATES DATA  —  ADD / REMOVE HERE
   file: apni PDF ne `public/certificates/` folder ma rakho
   Example: public/certificates/nabl.pdf
   ============================================================ */
const certificatesData = [
  {
    id: 1,
    title: "NABL Certificate",
    subtitle: "UT, MT & PT Accreditation",
    description:
      "National Accreditation Board for Testing and Calibration Laboratories — accredited for Ultrasonic, Magnetic Particle and Dye Penetrant Testing.",
    icon: <ShieldCheck size={28} />,
    file: "/certificates/nabl.pdf",
    badge: "NABL",
  },
  {
    id: 2,
    title: "ISO 9001:2015",
    subtitle: "Quality Management System",
    description:
      "Certified for quality management systems covering all NDT service operations.",
    icon: <Award size={28} />,
    file: "/certificates/iso-9001.pdf",
    badge: "ISO",
  },
  {
    id: 3,
    title: "ASNT Certification",
    subtitle: "Level II & Level III Personnel",
    description:
      "American Society for Nondestructive Testing certified inspectors for all major NDT methods.",
    icon: <FileText size={28} />,
    file: "/certificates/asnt.pdf",
    badge: "ASNT",
  },
  {
    id: 4,
    title: "ASME Certification",
    subtitle: "Pressure Vessel & Boiler Code",
    description:
      "ASME certified for pressure vessel and boiler inspection services.",
    icon: <Award size={28} />,
    file: "/certificates/asme.pdf",
    badge: "ASME",
  },
];

const Certificate = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [downloadingId, setDownloadingId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRefs = useRef([]);
  const heroRef = useRef(null);

  const primaryColor = "#235781";
  const primaryLight = "#4A82A8";

  const addToRefs = (el, index) => {
    sectionRefs.current[index] = el;
  };

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

  // ============================================
  // 👁️ INTERSECTION OBSERVER (Animations)
  // ============================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.section;
            if (key) {
              setVisibleSections((prev) => ({ ...prev, [key]: true }));
            }

            if (entry.target.classList.contains("qc-certificate-card")) {
              setTimeout(() => {
                entry.target.classList.add("qc-cert-pop-in");
              }, (Number(entry.target.dataset.index) || 0) * 150);
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

    const certCards = document.querySelectorAll(".qc-certificate-card");
    certCards.forEach((card, index) => {
      card.dataset.index = index;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // ============================================
  // 📥 CERTIFICATE DOWNLOAD HANDLER
  // ============================================
  const handleDownload = (cert) => {
    setDownloadingId(cert.id);

    const link = document.createElement("a");
    link.href = cert.file;
    link.download = `${cert.title.replace(/\s+/g, "_")}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadingId(null), 1500);
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
    <div className="qc-certificate-container">
      {/* ==========================================
          📊 SCROLL PROGRESS BAR
          ========================================== */}
      <div
        className="qc-scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* ==========================================
          🎬 HERO SECTION WITH 3D EFFECT
          (SAME AS CONTACT US)
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
              Our Certifications
            </div>

            <p className="qc-hero-subtitle">
              Certified &amp; accredited for quality and reliability.
              <br />
              Download our official certificates and documents.
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
          🏆 CERTIFICATES SECTION
          ========================================== */}
      <section
        className="qc-certificates-section"
        id="certificates"
        ref={(el) => addToRefs(el, 1)}
        data-section="certificates"
      >
        <div className="qc-cert-pattern"></div>

        {/* 👇 SAME-TO-SAME HEADER AS CONTACT US */}
        <div className="qc-section-header">
          <div
            className="qc-section-badge"
            style={{ background: primaryColor }}
          >
            <Award size={16} />
            Our Certifications
          </div>
          <h2 className="qc-section-title">
            Certified &{" "}
            <span style={{ color: primaryColor }}>Accredited</span>
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
            Download our official certificates and accreditation documents
          </p>
        </div>

        <div className="qc-cert-grid">
          {certificatesData.map((cert, index) => (
            <div
              key={cert.id}
              className="qc-certificate-card"
              data-index={index}
              onMouseMove={handleCardMouseMove}
            >
              <div
                className="qc-cert-glow"
                style={{
                  background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${primaryColor}20, transparent 70%)`,
                }}
              ></div>

              <div className="qc-cert-badge">{cert.badge}</div>

              <div className="qc-cert-icon">
                {cert.icon}
                <div
                  className="qc-cert-icon-ring"
                  style={{ borderColor: primaryColor }}
                ></div>
              </div>

              <h3 className="qc-cert-title">{cert.title}</h3>
              <p className="qc-cert-subtitle">{cert.subtitle}</p>
              <p className="qc-cert-description">{cert.description}</p>

              <button
                className={`qc-cert-download-btn ${
                  downloadingId === cert.id ? "qc-cert-downloading" : ""
                }`}
                onClick={() => handleDownload(cert)}
                disabled={downloadingId === cert.id}
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})`,
                }}
              >
                <span className="qc-cert-btn-text">
                  {downloadingId === cert.id ? "Downloading..." : "Download"}
                </span>
                <span className="qc-cert-btn-icon">
                  <Download size={18} />
                </span>
                <span className="qc-cert-btn-glow"></span>
              </button>

              <div
                className="qc-cert-hover-line"
                style={{
                  background: `linear-gradient(90deg, ${primaryColor}, ${primaryLight})`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Certificate;