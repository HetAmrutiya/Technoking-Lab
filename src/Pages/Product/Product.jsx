import React, { useEffect, useRef, useState } from "react";
import "./Product.css";
import testingBackground from "../../assets/ut.jpg";
import {
  Shield,
  Clock,
  Users,
  Award,
  Waves,
  Magnet,
  Droplets,
  Zap,
  Scan,
  Atom,
  Radio,
  Diamond,
  Ruler,
  CheckCircle,
  Target,
  BookOpen,
  Rocket,
  Crown,
  Star,
  TrendingUp,
  Layers,
  Gauge,
  Microscope,
  Factory,
  Plane,
  Car,
  Ship,
  HardHat,
  Zap as ZapIcon,
  Sparkles,
  Gem as GemIcon,
  Heart,
  Globe,
  Lightbulb,
  GitBranch,
  Code,
  Palette,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [activeTab, setActiveTab] = useState("ultrasonic");
  const [visibleSections, setVisibleSections] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedSteps, setAnimatedSteps] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [counters, setCounters] = useState({});
  const sectionRefs = useRef([]);
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const counterRef = useRef(null);

  // 🔵 Primary Colors - Blue Theme
  const primaryColor = "#235781";
  const primaryDark = "#16405F";
  const primaryLight = "#4A82A8";
  const primaryLighter = "#6BA0C9";

  // ============================================
  // 📊 COUNTER ANIMATION
  // ============================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = [
              { id: 'projects', target: 5000, duration: 2000 },
              { id: 'clients', target: 1200, duration: 2000 },
              { id: 'countries', target: 25, duration: 2000 },
              { id: 'experience', target: 15, duration: 2000 },
            ];
            
            targets.forEach(({ id, target, duration }) => {
              const steps = 60;
              const increment = target / steps;
              let current = 0;
              
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                setCounters(prev => ({
                  ...prev,
                  [id]: Math.floor(current)
                }));
              }, duration / steps);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ============================================
  // 📜 SCROLL PROGRESS
  // ============================================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================
  // 🔄 STEP ANIMATION
  // ============================================
  useEffect(() => {
    const stepTimer = setTimeout(() => {
      setAnimatedSteps([1]);
    }, 1000);

    const stepInterval = setInterval(() => {
      setAnimatedSteps((prev) => {
        if (prev.length < 6) {
          return [...prev, prev.length + 1];
        }
        return prev;
      });
    }, 300);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(stepInterval);
    };
  }, []);

  // ============================================
  // 🎯 SERVICE FEATURES
  // ============================================
 const serviceFeatures = [
    {
      icon: <Shield size={32} />,
      title: "Quality Assurance",
      description:
        "Certified testing ensuring structural integrity and safety compliance",
      color: primaryColor,
      gradient: `linear-gradient(135deg, #cc1616 0%, #ff4d4d 100%)`,
    },
    {
      icon: <Clock size={32} />,
      title: "24/7 Emergency Service",
      description:
        "Round-the-clock testing for critical infrastructure emergencies",
      color: "#0066cc",
      gradient: "linear-gradient(135deg, #0066cc 0%, #3399ff 100%)",
    },
    {
      icon: <Users size={32} />,
      title: "ASNT Certified",
      description: "Level III certified inspectors with 15+ years experience",
      color: "#009688",
      gradient: "linear-gradient(135deg, #009688 0%, #4db6ac 100%)",
    },
    {
      icon: <Award size={32} />,
      title: "NADCAP Accredited",
      description: "Industry-recognized accreditation for aerospace testing",
      color: "#8e44ad",
      gradient: "linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)",
    },
  ];

  // ============================================
  // 🔬 TESTING METHODS (ONLY 9 METHODS - NO NDT, DT, RT)
  // ============================================
  const testingMethods = [
    {
      id: 1,
      method: "Ultrasonic Testing",
      shortName: "UT",
      description: "High-frequency sound waves detect internal flaws and measure thickness with exceptional precision.",
      icon: <Waves size={28} />,
      color: primaryColor,
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
      applications: ["Weld Inspection", "Corrosion Mapping", "Bond Testing", "Thickness Measurement", "Composite Inspection"],
      standards: ["ASTM E317", "ISO 17640", "ASME Section V", "AWS D1.1"],
      advantages: ["Deep penetration", "High sensitivity", "Digital imaging", "Real-time results", "Portable equipment"],
      image: "📡",
    },
    {
      id: 2,
      method: "Magnetic Particle Testing",
      shortName: "MPT",
      description: "Magnetic fields detect surface and near-surface flaws in ferromagnetic materials with high reliability.",
      icon: <Magnet size={28} />,
      color: "#009688",
      gradient: "linear-gradient(135deg, #009688 0%, #4db6ac 100%)",
      applications: ["Ferrous Materials", "Automotive Parts", "Structural Steel", "Railway Components", "Forgings"],
      standards: ["ASTM E709", "ISO 9934", "ASME Section V", "ASTM E1444"],
      advantages: ["Immediate results", "Surface & subsurface", "Easy interpretation", "Cost-effective", "Portable"],
      image: "🧲",
    },
    {
      id: 3,
      method: "Dye Penetrant Testing",
      shortName: "DPT",
      description: "Liquid penetrant reveals surface-breaking defects with exceptional sensitivity and clarity.",
      icon: <Droplets size={28} />,
      color: "#0066cc",
      gradient: "linear-gradient(135deg, #0066cc 0%, #3399ff 100%)",
      applications: ["Non-porous Materials", "Surface Cracks", "Forgings", "Machined Parts", "Castings"],
      standards: ["ASTM E165", "ISO 3452", "ASME 2782", "ASTM E1417"],
      advantages: ["Portable equipment", "High sensitivity", "Low cost", "Quick results", "Easy to use"],
      image: "💧",
    },
    {
      id: 4,
      method: "Eddy Current Testing",
      shortName: "ECT",
      description: "Electromagnetic induction detects surface and sub-surface flaws in conductive materials with precision.",
      icon: <Zap size={28} />,
      color: "#7B1FA2",
      gradient: "linear-gradient(135deg, #7B1FA2 0%, #AB47BC 100%)",
      applications: ["Heat Exchanger Tubes", "Aircraft Structures", "Conductive Materials", "Coating Thickness", "Crack Detection"],
      standards: ["ASTM E426", "ISO 15548", "ASME Section V", "ASTM E243"],
      advantages: ["No couplant needed", "High speed", "Automated inspection", "Good for tubes", "Portable"],
      image: "⚡",
    },
    {
      id: 5,
      method: "Phased Array UT",
      shortName: "PAUT",
      description: "Advanced ultrasonic technique with multiple elements for detailed imaging and comprehensive inspection.",
      icon: <Scan size={28} />,
      color: "#E65100",
      gradient: "linear-gradient(135deg, #E65100 0%, #FF9800 100%)",
      applications: ["Weld Inspection", "Corrosion Mapping", "Composite Materials", "Thick Sections", "Complex Geometries"],
      standards: ["ASME Section V", "ISO 13588", "ASTM E2491", "AWS D1.1"],
      advantages: ["3D imaging", "High resolution", "Multiple angles", "Fast scanning", "Better defect sizing"],
      image: "🔍",
    },
    {
      id: 6,
      method: "Positive Material Identification",
      shortName: "PMI",
      description: "Verifies material composition and alloy grade using XRF or OES analysis with high accuracy.",
      icon: <Atom size={28} />,
      color: "#9C27B0",
      gradient: "linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)",
      applications: ["Alloy Verification", "Material Certification", "Scrap Sorting", "Quality Control", "Grade Confirmation"],
      standards: ["ASTM E1476", "ISO 9001", "ASME Section II", "ASTM E1257"],
      advantages: ["Non-destructive", "Quick results", "Portable (XRF)", "High accuracy", "Real-time analysis"],
      image: "⚛️",
    },
    {
      id: 7,
      method: "Portable Spectrometer",
      shortName: "Spectro",
      description: "Handheld analysis of chemical composition using optical emission or X-ray fluorescence technology.",
      icon: <Radio size={28} />,
      color: "#FF6F00",
      gradient: "linear-gradient(135deg, #FF6F00 0%, #FFA726 100%)",
      applications: ["Metal Sorting", "Alloy Analysis", "Quality Control", "Scrap Recycling", "Field Inspection"],
      standards: ["ASTM E415", "ISO 17025", "ASTM E1257", "ASTM E322"],
      advantages: ["Handheld", "Fast results", "Multi-element", "Non-destructive", "Field deployable"],
      image: "🌈",
    },
    {
      id: 8,
      method: "Hardness Testing",
      shortName: "Hardness",
      description: "Measures material hardness without indentation using ultrasonic or rebound methods with precision.",
      icon: <Diamond size={28} />,
      color: "#607D8B",
      gradient: "linear-gradient(135deg, #607D8B 0%, #90A4AE 100%)",
      applications: ["Heat Affected Zones", "Large Components", "In-service Inspection", "Weld Hardness", "Coating Hardness"],
      standards: ["ASTM A1038", "ISO 16859", "ASTM E110", "ASTM E956"],
      advantages: ["No surface damage", "Portable", "Quick results", "Large area coverage", "Multiple scales"],
      image: "💎",
    },
    {
      id: 9,
      method: "Thickness Measurement  ",
      shortName: "Thickness",
      description: "Measures material thickness using ultrasonic or electromagnetic methods with exceptional accuracy.",
      icon: <Ruler size={28} />,
      color: "#4CAF50",
      gradient: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
      applications: ["Corrosion Monitoring", "Tank Inspection", "Pipeline Assessment", "Pressure Vessels", "Ship Hulls"],
      standards: ["ASTM E797", "ISO 16809", "ASME Section V", "ASTM E1930"],
      advantages: ["Non-invasive", "Accurate", "Portable", "Real-time data", "Multiple materials"],
      image: "📏",
    },
  ];

  // ============================================
  // 📋 SPECIFICATIONS
  // ============================================
  // ============================================
// 📋 SPECIFICATIONS - UPDATED WITH MORE DATA
// ============================================
const specifications = {
  ultrasonic: [
    { property: "Frequency Range", value: "0.5-25 MHz", icon: "📡" },
    { property: "Penetration Depth", value: "Up to 10m", icon: "📏" },
    { property: "Resolution", value: "0.1mm", icon: "🔍" },
    { property: "Scan Speed", value: "1000 mm/s", icon: "⚡" },
    { property: "Temperature Range", value: "-20°C to 500°C", icon: "🌡️" },
    { property: "Transducer Types", value: "Contact, Delay, Immersion", icon: "🎯" },
    { property: "Wave Modes", value: "Longitudinal, Shear, Lamb", icon: "🌊" },
    { property: "Display Modes", value: "A-Scan, B-Scan, C-Scan", icon: "📊" },
    { property: "Data Recording", value: "Full A-Scan, TOFD", icon: "💾" },
    { property: "Certification", value: "ASNT Level III", icon: "🏅" },
    { property: "Standards Compliance", value: "ASTM E317, ISO 17640", icon: "📋" },
    { property: "Portability", value: "Handheld & Trolley Mount", icon: "🛄" },
  ],
  magnetic: [
    { property: "Field Strength", value: "0.5-2.5 Tesla", icon: "🧲" },
    { property: "Field Types", value: "AC, DC, Half-Wave", icon: "⚡" },
    { property: "Sensitivity", value: "High (0.1mm cracks)", icon: "🎯" },
    { property: "Demagnetization", value: "Automatic Cycle", icon: "🔄" },
    { property: "Particle Types", value: "Fluorescent, Visible, Dual", icon: "✨" },
    { property: "Particle Colors", value: "Red, Black, Grey, Fluorescent", icon: "🎨" },
    { property: "Temperature Range", value: "-10°C to 50°C", icon: "🌡️" },
    { property: "Inspection Methods", value: "Yoke, Prod, Coil", icon: "🔧" },
    { property: "Certification", value: "ASNT Level III", icon: "🏅" },
    { property: "Standards Compliance", value: "ASTM E709, ISO 9934", icon: "📋" },
    { property: "Equipment Types", value: "Portable & Stationary", icon: "🛄" },
    { property: "Power Supply", value: "220V AC / Battery", icon: "🔋" },
  ],
  penetrant: [
    { property: "Sensitivity Level", value: "Level 1-4 (Ultra)", icon: "🔬" },
    { property: "Penetrant Types", value: "Water Washable, Post-Emulsifiable, Solvent", icon: "💧" },
    { property: "Developer Types", value: "Dry, Non-aqueous, Aqueous", icon: "🧪" },
    { property: "Penetrant Colors", value: "Red, Fluorescent, Dual", icon: "🌈" },
    { property: "Removal Methods", value: "Water, Solvent, Emulsifier", icon: "🚿" },
    { property: "Dwell Time", value: "5-60 minutes", icon: "⏱️" },
    { property: "Developer Time", value: "5-30 minutes", icon: "⏳" },
    { property: "Temperature Range", value: "10°C to 52°C", icon: "🌡️" },
    { property: "UV Light Intensity", value: "1000 μW/cm² @ 15 in", icon: "🔦" },
    { property: "UV Light Wavelength", value: "365 nm (Long Wave)", icon: "💡" },
    { property: "Light Intensity", value: "1000+ lux (Visible)", icon: "☀️" },
    { property: "Water Tolerance", value: "Up to 30% Water", icon: "💦" },
    { property: "Certification", value: "ASNT Level III", icon: "🏅" },
    { property: "Standards Compliance", value: "ASTM E165, ISO 3452", icon: "📋" },
  ],
};

  // ============================================
  // 🔄 CERTIFICATION PROCESS
  // ============================================
  const certificationProcess = [
    {
      step: 1,
      title: "Client Consultation",
      description: "Understanding testing requirements and specifications for accurate results",
      icon: "💬",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
      duration: "1-2 Days",
    },
    {
      step: 2,
      title: "Method Selection",
      description: "Choosing appropriate testing methods based on material and defect type",
      icon: "📋",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
      duration: "1 Day",
    },
    {
      step: 3,
      title: "On-site Inspection",
      description: "Deploying certified technicians with calibrated equipment for precise testing",
      icon: "🔍",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
      duration: "Variable",
    },
    {
      step: 4,
      title: "Data Analysis",
      description: "Expert analysis of test results using advanced software and AI tools",
      icon: "📊",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
      duration: "2-3 Days",
    },
    {
      step: 5,
      title: "Report Generation",
      description: "Comprehensive report with findings, analysis, and actionable recommendations",
      icon: "📑",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
      duration: "1-2 Days",
    },
    {
      step: 6,
      title: "Certification Issuance",
      description: "Official certification, quality stamp, and ongoing technical support",
      icon: "🏆",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
      duration: "1 Day",
    },
  ];

  // ============================================
  // 🏭 INDUSTRIES
  // ============================================
  const industries = [
    { name: "Oil & Gas", icon: <Factory size={20} />, color: primaryColor },
    { name: "Aerospace", icon: <Plane size={20} />, color: "#2196f3" },
    { name: "Automotive", icon: <Car size={20} />, color: "#1a8cff" },
    { name: "Marine", icon: <Ship size={20} />, color: "#009688" },
    { name: "Construction", icon: <HardHat size={20} />, color: "#7B1FA2" },
    { name: "Power", icon: <ZapIcon size={20} />, color: "#E65100" },
  ];

  // ============================================
  // 🖱️ MOUSE PARALLAX EFFECT
  // ============================================
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
      }
    };

    const observer = new IntersectionObserver(
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
      { threshold: 0.15, rootMargin: "-30px" }
    );

    if (heroRef.current) {
      heroRef.current.addEventListener("mousemove", handleMouseMove);
    }

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
      if (heroRef.current) {
        heroRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const addToRefs = (el, index) => {
    sectionRefs.current[index] = el;
  };

  // ============================================
  // 📋 METHOD TABS FOR SPECS
  // ============================================
  const specTabs = [
    { id: "ultrasonic", label: "UT", icon: "📡" },
    { id: "magnetic", label: "MPT", icon: "🧲" },
    { id: "penetrant", label: "DPT", icon: "🔬" },
  ];

  return (
    <div className="prod-page" id="services">
      {/* ==========================================
          📊 SCROLL PROGRESS BAR
          ========================================== */}
      <div className="prod-scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* ==========================================
          🎬 HERO SECTION WITH PARALLAX
          ========================================== */}
      <section
        className="prod-hero-section"
        ref={heroRef}
        data-section="hero"
        style={{
          background: `linear-gradient(135deg, rgba(10, 22, 40, 0.88) 0%, rgba(35, 87, 129, 0.75) 100%), url(${testingBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Floating Particles */}
        <div className="prod-hero-particles">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="prod-hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${12 + Math.random() * 18}s`,
                animationDelay: `${Math.random() * 10}s`,
                width: `${3 + Math.random() * 8}px`,
                height: `${3 + Math.random() * 8}px`,
                background: `rgba(74, 130, 168, ${0.08 + Math.random() * 0.2})`,
              }}
            ></div>
          ))}
        </div>

        <div className="prod-container">
          <div className="prod-hero-content">
            <div className="prod-hero-badge prod-badge-pulse">
              <span className="prod-badge-dot"></span>
              Advanced Testing Solutions
            </div>

            <h1 className="prod-hero-title">
              NDT <span className="prod-hero-highlight">Testing</span> &amp; Inspection
            </h1>

            <p className="prod-hero-subtitle">
              ASNT Level III certified testing services with advanced equipment and expert analysis
            </p>

            <div className="prod-hero-buttons">
              <button
                className="prod-primary-button prod-btn-shimmer"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})` }}
                onClick={() => navigate("/contact")}
              >
                <span>Request Inspection</span>
                <div className="prod-btn-glow"></div>
              </button>
              <button className="prod-secondary-button">
                View Certifications
                <span className="prod-btn-arrow">→</span>
              </button>
            </div>

            {/* Stats with Counter Animation */}
            <div className="prod-hero-stats" ref={counterRef}>
              <div className="prod-stat-item prod-stat-glow">
                <span className="prod-stat-number" style={{ color: primaryLight }}>
                  {counters.projects || 0}+
                </span>
                <span className="prod-stat-label">Projects Completed</span>
              </div>
              <div className="prod-stat-divider"></div>
              <div className="prod-stat-item prod-stat-glow">
                <span className="prod-stat-number" style={{ color: primaryLight }}>
                  {counters.clients || 0}+
                </span>
                <span className="prod-stat-label">Happy Clients</span>
              </div>
              <div className="prod-stat-divider"></div>
              <div className="prod-stat-item prod-stat-glow">
                <span className="prod-stat-number" style={{ color: primaryLight }}>
                  {counters.countries || 0}+
                </span>
                <span className="prod-stat-label">Countries Served</span>
              </div>
              <div className="prod-stat-divider"></div>
              <div className="prod-stat-item prod-stat-glow">
                <span className="prod-stat-number" style={{ color: primaryLight }}>
                  {counters.experience || 0}+
                </span>
                <span className="prod-stat-label">Years Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="prod-hero-scroll">
          <div className="prod-scroll-mouse">
            <div className="prod-scroll-wheel"></div>
          </div>
          <div className="prod-scroll-text">Scroll Down</div>
        </div>
      </section>

      {/* ==========================================
          📋 OVERVIEW SECTION
          ========================================== */}
      <section
        className="prod-overview-section"
        ref={(el) => addToRefs(el, 1)}
        data-section="overview"
      >
        <div className="prod-container-inner">
          <div className="prod-section-header">
            <div className="prod-section-badge" style={{ background: primaryColor }}>
              <Shield size={16} />
              Our Services
            </div>
            <h2 className="prod-section-title">
              Comprehensive Testing <span style={{ color: primaryColor }}>Solutions</span>
            </h2>
            <div className="prod-section-divider">
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="prod-divider-dot prod-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="prod-section-description">
              ASNT Level III certified testing services with advanced equipment and expert analysis
            </p>
          </div>

          <div className="prod-overview-content">
            <div
              className={`prod-overview-text ${visibleSections.overview ? "prod-animate-fade" : ""}`}
            >
              <div className="prod-content-highlight prod-float-animation">
                <div className="prod-highlight-icon">
                  <Star size={24} style={{ color: primaryColor }} />
                </div>
                <p>
                  We provide complete <strong className="prod-highlight-text" style={{ color: primaryColor }}>
                    Non-Destructive Testing (NDT)
                  </strong> services for quality assurance and structural integrity
                  evaluation. Our certified technicians use state-of-the-art
                  equipment to detect flaws, measure material properties, and
                  ensure compliance with international standards.
                </p>
              </div>

              <div className="prod-service-highlights">
                <div className="prod-highlight-item prod-slide-animation">
                  <CheckCircle color={primaryColor} size={24} />
                  <span>ISO 9712 & ASNT SNT-TC-1A Certified</span>
                </div>
                <div className="prod-highlight-item prod-slide-animation" style={{ animationDelay: "0.1s" }}>
                  <CheckCircle color={primaryColor} size={24} />
                  <span>NADCAP Accredited for Aerospace</span>
                </div>
                <div className="prod-highlight-item prod-slide-animation" style={{ animationDelay: "0.2s" }}>
                  <CheckCircle color={primaryColor} size={24} />
                  <span>24/7 Emergency Inspection Services</span>
                </div>
                <div className="prod-highlight-item prod-slide-animation" style={{ animationDelay: "0.3s" }}>
                  <CheckCircle color={primaryColor} size={24} />
                  <span>Worldwide Testing Capabilities</span>
                </div>
              </div>
            </div>

            <div
              className={`prod-features-grid ${visibleSections.overview ? "prod-animate-slide-right" : ""}`}
            >
              {serviceFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="prod-feature-card prod-hover-float prod-card-glow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="prod-feature-card-inner">
                    <div className="prod-feature-card-icon" style={{ background: feature.gradient }}>
                      {feature.icon}
                      <div className="prod-icon-ring"></div>
                    </div>
                    <h3 className="prod-feature-card-title">{feature.title}</h3>
                    <p className="prod-feature-card-description">{feature.description}</p>
                    <div className="prod-feature-card-shine"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          🔬 TESTING METHODS SECTION (ONLY 9 METHODS)
          ========================================== */}
      <section
        className="prod-methods-section"
        ref={(el) => addToRefs(el, 2)}
        data-section="methods"
      >
        <div className="prod-container-inner">
          <div className="prod-section-header">
            <div className="prod-section-badge" style={{ background: primaryColor }}>
              <Microscope size={16} />
              Testing Methods
            </div>
            <h2 className="prod-section-title">
              Our Testing <span style={{ color: primaryColor }}>Capabilities</span>
            </h2>
            <div className="prod-section-divider">
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="prod-divider-dot prod-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="prod-section-description">
              Advanced testing techniques for accurate results and quality assurance
            </p>
          </div>

          {/* Industry Tags */}
          <div className="prod-industry-tags">
            {industries.map((industry, idx) => (
              <span key={idx} className="prod-industry-tag" style={{ borderColor: industry.color }}>
                {industry.icon}
                {industry.name}
              </span>
            ))}
          </div>

          <div className="prod-methods-grid">
         {testingMethods.map((method, index) => (
  <div
    key={method.id}
    className={`prod-method-card ${visibleSections.methods ? "prod-animate-fade" : ""}`}
    style={{ animationDelay: `${index * 0.08}s` }}
  >
    <div className="prod-method-card-header" style={{ background: method.gradient }}>
      <div className="prod-method-card-icon prod-icon-pulse">{method.icon}</div>
      {/* ✅ FIX: Method Title with proper wrapping */}
      <h3 className="prod-method-card-title">{method.method}</h3>
      <div className="prod-method-card-number">#{String(index + 1).padStart(2, '0')}</div>
      <div className="prod-method-card-short">{method.shortName}</div>
    </div>

    <div className="prod-method-card-content">
      <p className="prod-method-card-description">{method.description}</p>

      <div className="prod-method-card-section">
        <h4 className="prod-method-card-subtitle">
          <Target size={16} />
          Applications:
        </h4>
        <div className="prod-applications-list">
          {method.applications.map((app, i) => (
            <span
              key={i}
              className="prod-application-tag prod-slide-animation"
              style={{
                background: method.color + "15",
                color: method.color,
                borderColor: method.color + "30",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <CheckCircle size={12} />
              {app}
            </span>
          ))}
        </div>
      </div>

      <div className="prod-method-card-section">
        <h4 className="prod-method-card-subtitle">
          <BookOpen size={16} />
          Standards:
        </h4>
        <div className="prod-standards-list">
          {method.standards.map((std, i) => (
            <span
              key={i}
              className="prod-standard-badge prod-pop-animation"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {std}
            </span>
          ))}
        </div>
      </div>

      <div className="prod-method-card-section">
        <h4 className="prod-method-card-subtitle">
          <Rocket size={16} />
          Advantages:
        </h4>
        <ul className="prod-advantages-list">
          {method.advantages.map((adv, i) => (
            <li
              key={i}
              className="prod-slide-animation"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="prod-advantage-dot prod-pulse-dot" style={{ background: method.color }}></div>
              <span className="prod-advantage-text">{adv}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="prod-button-container">
        <button
          className="prod-method-card-button"
          style={{ background: method.gradient }}
          onClick={() => navigate("/contact")}
        >
          <span>Request Service</span>
          <div className="prod-button-arrow">→</div>
          <div className="prod-btn-ripple"></div>
        </button>
      </div>
    </div>

    <div className="prod-method-card-hover-effect"></div>
  </div>
))}
          </div>
        </div>
      </section>

      {/* ==========================================
          📋 TECHNICAL SPECIFICATIONS
          ========================================== */}
      <section
        className="prod-tech-specs-section"
        ref={(el) => addToRefs(el, 4)}
        data-section="specs"
      >
        <div className="prod-container-inner">
          <div className="prod-section-header">
            <div className="prod-section-badge" style={{ background: primaryColor }}>
              <Gauge size={16} />
              Equipment Specs
            </div>
            <h2 className="prod-section-title">
              Technical <span style={{ color: primaryColor }}>Specifications</span>
            </h2>
            <div className="prod-section-divider">
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="prod-divider-dot prod-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="prod-section-description">
              Advanced equipment with precise measurement capabilities
            </p>
          </div>

          <div className="prod-specs-tabs-container">
            <div className="prod-specs-tabs-header">
              {specTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`prod-specs-tab-button prod-hover-grow ${
                    activeTab === tab.id ? "prod-specs-tab-button-active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  style={
                    activeTab === tab.id
                      ? { borderColor: primaryColor, color: primaryColor }
                      : {}
                  }
                >
                  <span className="prod-tab-icon">{tab.icon}</span>
                  {tab.label}
                  <div className="prod-specs-tab-underline" style={{ background: primaryColor }}></div>
                </button>
              ))}
            </div>

            <div className="prod-specs-tabs-content">
              {activeTab === "ultrasonic" && (
                <div className="prod-specs-content">
                  <div className="prod-specs-content-header">
                    <h3>Ultrasonic Testing (UT) Specifications</h3>
                    <p>High-precision flaw detectors and thickness gauges</p>
                  </div>
                  <div className="prod-specs-content-grid">
                    {specifications.ultrasonic.map((spec, index) => (
                      <div key={index} className="prod-spec-item prod-hover-grow">
                        <div className="prod-spec-item-icon prod-pulse-animation">
                          {spec.icon}
                        </div>
                        <div className="prod-spec-item-property2">{spec.property}</div>
                        <span className="prod-spec-item-value" style={{ color: primaryColor }}>{spec.value}</span>
                        <div className="prod-spec-item-glow"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "magnetic" && (
                <div className="prod-specs-content">
                  <div className="prod-specs-content-header">
                    <h3>Magnetic Particle Testing (MPT) Specifications</h3>
                    <p>High-sensitivity magnetic inspection equipment</p>
                  </div>
                  <div className="prod-specs-content-grid">
                    {specifications.magnetic.map((spec, index) => (
                      <div key={index} className="prod-spec-item prod-hover-grow">
                        <div className="prod-spec-item-icon prod-pulse-animation">
                          {spec.icon}
                        </div>
                        <div className="prod-spec-item-property2">{spec.property}</div>
                        <span className="prod-spec-item-value" style={{ color: primaryColor }}>{spec.value}</span>
                        <div className="prod-spec-item-glow"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "penetrant" && (
                <div className="prod-specs-content">
                  <div className="prod-specs-content-header">
                    <h3>Dye Penetrant Testing (DPT) Specifications</h3>
                    <p>Sensitive penetrant systems for surface inspection</p>
                  </div>
                  <div className="prod-specs-content-grid">
                    {specifications.penetrant.map((spec, index) => (
                      <div key={index} className="prod-spec-item prod-hover-grow">
                        <div className="prod-spec-item-icon prod-pulse-animation">
                          {spec.icon}
                        </div>
                        <div className="prod-spec-item-property2">{spec.property}</div>
                        <span className="prod-spec-item-value" style={{ color: primaryColor }}>{spec.value}</span>
                        <div className="prod-spec-item-glow"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          🔄 CERTIFICATION PROCESS
          ========================================== */}
      <section
        className="prod-certification-section"
        ref={(el) => addToRefs(el, 6)}
        data-section="process"
      >
        <div className="prod-container-inner">
          <div className="prod-section-header">
            <div className="prod-section-badge" style={{ background: primaryColor }}>
              <Crown size={16} />
              Our Process
            </div>
            <h2 className="prod-section-title">
              Certification <span style={{ color: primaryColor }}>Process</span>
            </h2>
            <div className="prod-section-divider">
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="prod-divider-dot prod-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="prod-section-description">
              Streamlined process from inspection to certification
            </p>
          </div>

          <div className="prod-process-timeline">
            {certificationProcess.map((process, index) => (
              <div
                key={index}
                className={`prod-process-step ${animatedSteps.includes(process.step) ? "prod-animate-fade" : ""}`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="prod-process-step-indicator">
                  <div className="prod-process-step-number prod-pulse-animation" style={{ background: process.gradient }}>
                    {process.step}
                    <div className="prod-process-step-glow"></div>
                  </div>
                  <div className="prod-process-step-icon">{process.icon}</div>
                </div>
                <div className="prod-process-step-content prod-hover-float">
                  <h3 className="prod-process-step-title">{process.title}</h3>
                  <p className="prod-process-step-description">{process.description}</p>
                  <div className="prod-process-step-duration">
                    <span className="prod-duration-icon prod-pulse-animation">⏱️</span>
                    {process.duration}
                  </div>
                  <div className="prod-process-step-shine"></div>
                </div>
                {index < certificationProcess.length - 1 && (
                  <div className="prod-process-step-connector prod-pulse-animation" style={{ background: primaryColor }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          🎯 CTA BANNER
          ========================================== */}
      {/* <section className="prod-cta-banner" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})` }}>
        <div className="prod-cta-content">
          <h2 className="prod-cta-title">Ready for <span>Reliable Testing</span>?</h2>
          <p className="prod-cta-description">Contact us today for expert inspection and certification services</p>
          <button className="prod-cta-button" onClick={() => navigate("/contact")}>
            Get a Free Quote
            <span className="prod-cta-arrow">→</span>
          </button>
        </div>
        <div className="prod-cta-particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="prod-cta-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${8 + Math.random() * 12}s`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default Product;