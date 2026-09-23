import React, { useEffect, useRef, useState } from "react";
import "./Industry.css";
import mineralsBackground from "../../assets/ut.jpg";
import {
  Factory,
  Zap,
  Car,
  Ship,
  Building,
  Wrench,
  Layers,
  Shield,
  Cog,
  Users,
  CheckCircle,
  ChevronRight,
  Target,
  Briefcase,
  Award,
  Box,
  Globe,
  Rocket,
  Star,
  Sparkles,
  TrendingUp,
  Heart,
  Crown,
  Gem,
  Compass,
  Anchor,
  Plane,
  HardHat,
  Cpu,
  Battery,
  Droplet,
  Wind,
  Sun,
  Flame,
  Activity,
  BarChart3,
  Clock,
  Coffee,
  Smile,
  ThumbsUp,
  Zap as ZapIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Industry = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [counters, setCounters] = useState({
    projects: 0,
    industries: 0,
    experience: 0,
    satisfaction: 0,
  });
  const [is3DHover, setIs3DHover] = useState(false);

  const sectionRefs = useRef([]);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  // 🔵 Primary Blue Colors
  const primaryColor = "#235781";
  const primaryDark = "#16405F";
  const primaryLight = "#4A82A8";
  const primaryLighter = "#6BA0C9";
  const primaryLightest = "#8FB8D9";
  const secondaryColor = "#0a1628";

  // ============================================
  // 📊 COUNTER ANIMATION
  // ============================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = [
              { id: 'projects', target: 5000, duration: 2500 },
              { id: 'industries', target: 25, duration: 2000 },
              { id: 'experience', target: 15, duration: 2000 },
              { id: 'satisfaction', target: 98, duration: 2000 },
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

    if (statsRef.current) {
      observer.observe(statsRef.current);
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
  // 🖱️ MOUSE PARALLAX FOR 3D EFFECT
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
  // 🏭 INDUSTRIES DATA — NDT & DT SERVICES
  // ============================================
  // ============================================
  // 🏭 INDUSTRIES DATA — NDT & DT SERVICES
  // ============================================
  const industries = [
    {
      id: 1,
      name: "NDT Services",
      icon: <Activity size={20} />,
      color: primaryColor,
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
      description: "Non-Destructive Testing services for flaw detection and material integrity without damaging the component",
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
        "Phase Array Ultrasonic Testing (PAUT)",
        "Eddy Current Testing (ET)",
        "Portable Spectro Testing (PST)",
      ],
    },
    {
      id: 2,
      name: "DT Services",
      icon: <BarChart3 size={20} />,
      color: "#009688",
      gradient: "linear-gradient(135deg, #009688 0%, #4db6ac 100%)",
      description: "Destructive Testing services to evaluate mechanical properties and material performance under stress",
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
      icon: <Layers size={20} />,
      color: "#2196f3",
      gradient: "linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)",
      description: "Comprehensive material characterization and analysis for quality assurance and R&D",
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
      icon: <Shield size={20} />,
      color: "#7B1FA2",
      gradient: "linear-gradient(135deg, #7B1FA2 0%, #AB47BC 100%)",
      description: "Integrated NDT and DT solutions for complete material and component qualification",
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
      icon: <Cpu size={20} />,
      color: "#1a8cff",
      gradient: "linear-gradient(135deg, #1a8cff 0%, #4a9eff 100%)",
      description: "Advanced non-destructive techniques for critical and complex applications",
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
        "Phase Array Ultrasonic Testing (PAUT)",
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
      icon: <Wrench size={20} />,
      color: "#E65100",
      gradient: "linear-gradient(135deg, #E65100 0%, #FF9800 100%)",
      description: "Destructive mechanical testing to determine material strength and performance characteristics",
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

  // ============================================
  // 🛠️ INDUSTRY SERVICES
  // ============================================
  const industryServices = [
    {
      title: "Material Selection",
      description: "Expert guidance in choosing the right materials for your application",
      icon: <Layers size={28} />,
      features: [
        "Material testing & analysis",
        "Cost optimization strategies",
        "Performance evaluation",
        "Compliance verification",
      ],
    },
    {
      title: "Quality Assurance",
      description: "Comprehensive testing and inspection to ensure product reliability",
      icon: <Shield size={28} />,
      features: [
        "NDT & DT testing services",
        "Dimensional inspection",
        "Chemical analysis",
        "Mechanical testing",
      ],
    },
    {
      title: "Custom Solutions",
      description: "Tailored products designed to meet unique industry specifications",
      icon: <Cog size={28} />,
      features: [
        "Custom alloy development",
        "Specialized coatings",
        "Unique geometries",
        "Prototype development",
      ],
    },
    {
      title: "Technical Support",
      description: "24/7 expert support for installation, maintenance, and troubleshooting",
      icon: <Users size={28} />,
      features: [
        "On-site assistance",
        "Training programs",
        "Technical documentation",
        "Performance monitoring",
      ],
    },
  ];

  // ============================================
  // 📊 STATS DATA
  // ============================================
  const statsData = [
    { id: 'projects', label: 'Projects Completed', icon: <Briefcase size={24} />, suffix: '+' },
    { id: 'industries', label: 'Industries Served', icon: <Globe size={24} />, suffix: '+' },
    { id: 'experience', label: 'Years Experience', icon: <Clock size={24} />, suffix: '+' },
    { id: 'satisfaction', label: 'Client Satisfaction', icon: <ThumbsUp size={24} />, suffix: '%' },
  ];

  return (
    <div className="tk-industry-container" id="industry">
      {/* ==========================================
          📊 SCROLL PROGRESS BAR
          ========================================== */}
      <div className="tk-scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* ==========================================
          🎬 HERO SECTION WITH 3D EFFECT
          ========================================== */}
      <section
        className="tk-industry-hero"
        ref={(el) => { heroRef.current = el; addToRefs(el, 0); }}
        data-section="hero"
        style={{
          background: `linear-gradient(135deg, rgba(10, 22, 40, 0.88) 0%, rgba(35, 87, 129, 0.75) 100%), url(${mineralsBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* 3D Floating Particles */}
        <div className="tk-hero-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="tk-hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${12 + Math.random() * 18}s`,
                animationDelay: `${Math.random() * 10}s`,
                width: `${4 + Math.random() * 10}px`,
                height: `${4 + Math.random() * 10}px`,
                background: `rgba(74, 130, 168, ${0.08 + Math.random() * 0.2})`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            ></div>
          ))}
        </div>

        <div className="tk-container">
          <div
            className={`tk-hero-content ${visibleSections.hero ? "tk-animate-in" : ""}`}
          >
            <div className="tk-hero-badge tk-badge-pulse">
              <span className="tk-badge-dot"></span>
              NDT & DT Services
            </div>

            <p className="tk-hero-subtitle">
              Cutting-edge NDT and DT testing services ensuring superior
              quality and reliability across all industrial sectors
            </p>
          </div>
        </div>

        {/* 3D Scroll Indicator */}
        <div className="tk-hero-scroll tk-scroll-3d">
          <div className="tk-scroll-mouse">
            <div className="tk-scroll-wheel"></div>
          </div>
          <div className="tk-scroll-text">Scroll Down</div>
        </div>
      </section>

      {/* ==========================================
          📊 STATS SECTION WITH COUNTER
          ========================================== */}
      <section
        className="tk-stats-section"
        ref={statsRef}
        data-section="stats"
      >
        <div className="tk-container">
          <div className="tk-stats-grid">
            {statsData.map((stat, index) => (
              <div
                key={stat.id}
                className="tk-stat-card tk-stat-3d"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="tk-stat-icon" style={{ color: primaryColor }}>
                  {stat.icon}
                </div>
                <span className="tk-stat-number" style={{ color: primaryColor }}>
                  {counters[stat.id] || 0}{stat.suffix}
                </span>
                <span className="tk-stat-label">{stat.label}</span>
                <div className="tk-stat-glow" style={{ background: primaryColor }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          🏭 INDUSTRIES OVERVIEW SECTION
          ========================================== */}
      <section
        className="tk-industries-overview"
        ref={(el) => addToRefs(el, 1)}
        data-section="overview"
      >
        <div className="tk-container">
          <div className="tk-section-header">
            <div className="tk-section-badge" style={{ background: primaryColor }}>
              <Target size={16} />
              NDT & DT Services
            </div>
            <h2 className="tk-section-title-iws">
              Powering <span style={{ color: primaryColor }}>Industrial</span> Excellence
            </h2>
            <div className="tk-section-divider">
              <div className="tk-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="tk-divider-dot tk-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="tk-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="tk-section-subtitle">
              Specialized NDT and DT testing solutions for diverse industrial sectors with unmatched quality and technical support
            </p>
          </div>

          {/* Industry Navigation Tabs - 3D Style */}
          <div className="tk-industries-nav tk-nav-3d">
            {industries.map((industry, index) => (
              <button
                key={industry.id}
                className={`tk-industry-tab ${activeIndustry === index ? "tk-active" : ""} tk-tab-3d`}
                onClick={() => setActiveIndustry(index)}
                style={
                  activeIndustry === index
                    ? { 
                        borderColor: industry.color,
                        boxShadow: `0 8px 30px ${industry.color}40`,
                      }
                    : {}
                }
              >
                <div className="tk-tab-icon" style={{ color: industry.color }}>
                  {industry.icon}
                </div>
                <span className="tk-tab-name">{industry.name}</span>
                {activeIndustry === index && (
                  <div className="tk-tab-active-indicator" style={{ background: industry.color }}></div>
                )}
              </button>
            ))}
          </div>

          {/* Industry Detail - 3D Card */}
          <div className="tk-industry-detail tk-detail-3d">
            {industries[activeIndustry] && (
              <div className="tk-detail-content">
                <div className="tk-detail-header">
                  <div
                    className="tk-industry-icon-large tk-icon-3d"
                    style={{ 
                      color: industries[activeIndustry].color,
                      background: `${industries[activeIndustry].color}15`,
                      borderColor: industries[activeIndustry].color,
                    }}
                  >
                    {industries[activeIndustry].icon}
                  </div>
                  <div>
                    <h3 className="tk-industry-name" style={{ color: industries[activeIndustry].color }}>
                      {industries[activeIndustry].name}
                    </h3>
                    <p className="tk-industry-description">
                      {industries[activeIndustry].description}
                    </p>
                  </div>
                </div>

                <div className="tk-detail-grid">
                  <div className="tk-detail-card tk-card-3d">
                    <h4 className="tk-detail-card-title">
                      <Box size={20} style={{ color: primaryColor }} />
                      Applications
                    </h4>
                    <ul className="tk-applications-list">
                      {industries[activeIndustry].applications.map((app, idx) => (
                        <div key={idx} className="tk-feature-item2 tk-feature-3d">
                          <CheckCircle size={16} style={{ color: primaryColor }} />
                          {app}
                        </div>
                      ))}
                    </ul>
                  </div>

                  <div className="tk-detail-card tk-card-3d">
                    <h4 className="tk-detail-card-title">
                      <Award size={20} style={{ color: primaryColor }} />
                      Key Features
                    </h4>
                    <div className="tk-features-grid">
                      {industries[activeIndustry].features.map((feature, idx) => (
                        <div key={idx} className="tk-feature-item tk-feature-3d">
                          <CheckCircle size={16} style={{ color: primaryColor }} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="tk-detail-card tk-card-3d">
                    <h4 className="tk-detail-card-title">
                      <Shield size={20} style={{ color: primaryColor }} />
                      Materials
                    </h4>
                    <div className="tk-features-grid">
                      {industries[activeIndustry].materials.map((materials, idx) => (
                        <div key={idx} className="tk-feature-item tk-feature-3d">
                          <CheckCircle size={16} style={{ color: primaryColor }} />
                          {materials}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          🛠️ INDUSTRY SERVICES SECTION
          ========================================== */}
      <section
        className="tk-industry-services"
        ref={(el) => addToRefs(el, 2)}
        data-section="services"
      >
        <div className="tk-container">
          <div className="tk-section-header">
            <div className="tk-section-badge" style={{ background: primaryColor }}>
              <Briefcase size={16} />
              Our Services
            </div>
            <h2 className="tk-section-title-iws">
              Comprehensive <span style={{ color: primaryColor }}>Industry</span> Solutions
            </h2>
            <div className="tk-section-divider">
              <div className="tk-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="tk-divider-dot tk-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="tk-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="tk-section-subtitle">
              End-to-end support from material selection to after-sales service
            </p>
          </div>

          <div className="tk-services-grid">
            {industryServices.map((service, index) => (
              <div
                key={index}
                className={`tk-service-card ${visibleSections.services ? "tk-animate-slide-up" : ""}`}
                style={{ animationDelay: `${index * 0.12}s` }}
                onMouseEnter={() => setHoveredCard(`service-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="tk-service-card-inner tk-card-3d">
                  <div
                    className="tk-service-icon tk-icon-float"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}10)`,
                      borderColor: primaryColor,
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="tk-service-title">{service.title}</h3>
                  <p className="tk-service-description">{service.description}</p>

                  <ul className="tk-service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="tk-feature-3d">
                        <ChevronRight size={14} style={{ color: primaryColor }} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="tk-service-button tk-btn-3d"
                    style={{
                      borderColor: primaryColor,
                      color: primaryColor,
                    }}
                    onClick={() => navigate("/contact")}
                  >
                    <span>Learn More</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          🎯 CTA BANNER
          ========================================== */}
      <section className="tk-cta-banner" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})` }}>
        <div className="tk-cta-content">
          <div className="tk-cta-icon">
            <Rocket size={48} style={{ color: 'white' }} />
          </div>
          <h2 className="tk-cta-title">Ready to <span>Transform</span> Your Industry?</h2>
          <p className="tk-cta-description">Contact us today for expert NDT & DT solutions tailored to your needs</p>
          <button className="tk-cta-button tk-btn-3d" onClick={() => navigate("/contact")}>
            <span>Get Started</span>
            <span className="tk-cta-arrow">→</span>
          </button>
        </div>
        <div className="tk-cta-particles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="tk-cta-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${8 + Math.random() * 12}s`,
                animationDelay: `${Math.random() * 5}s`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
              }}
            ></div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Industry;