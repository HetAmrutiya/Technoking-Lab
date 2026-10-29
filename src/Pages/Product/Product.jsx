import React, { useEffect, useRef, useState } from "react";
import "./Product.css";
import testingBackground from "../../assets/ut.jpg";
import {
  Shield, Clock, Users, Award, Waves, Magnet, Droplets, Zap, Scan, Atom,
  Radio, Diamond, Cog, Ruler, CheckCircle, Target, BookOpen, Rocket, Crown,
  Star, TrendingUp, Layers, Gauge, Microscope, Factory, Plane, Car, Ship,
  HardHat, Zap as ZapIcon, Sparkles, Gem as GemIcon, Heart, Globe, Lightbulb,
  GitBranch, Code, Palette, ShieldCheck, Activity, BarChart3, Cpu, Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServiceDetailModal from "../ServiceDetail/ServiceDetailModal";

const Product = () => {
  const [activeTab, setActiveTab] = useState("ndt");
  const [visibleSections, setVisibleSections] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedSteps, setAnimatedSteps] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [counters, setCounters] = useState({});
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRefs = useRef([]);
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const counterRef = useRef(null);

  const primaryColor = "#235781";
  const primaryDark = "#16405F";
  const primaryLight = "#4A82A8";
  const primaryLighter = "#6BA0C9";

  /* ---------------- COUNTERS ---------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = [
              { id: "projects", target: 5000, duration: 2000 },
              { id: "clients", target: 1200, duration: 2000 },
              { id: "countries", target: 25, duration: 2000 },
              { id: "experience", target: 15, duration: 2000 },
            ];
            targets.forEach(({ id, target, duration }) => {
              const steps = 60;
              const increment = target / steps;
              let current = 0;
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) { current = target; clearInterval(timer); }
                setCounters((prev) => ({ ...prev, [id]: Math.floor(current) }));
              }, duration / steps);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------------- SCROLL PROGRESS ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- STEPS ---------------- */
  useEffect(() => {
    const stepTimer = setTimeout(() => setAnimatedSteps([1]), 1000);
    const stepInterval = setInterval(() => {
      setAnimatedSteps((prev) => (prev.length < 6 ? [...prev, prev.length + 1] : prev));
    }, 300);
    return () => { clearTimeout(stepTimer); clearInterval(stepInterval); };
  }, []);

  /* ---------------- FEATURES ---------------- */
  const serviceFeatures = [
    { icon: <Shield size={32} />, title: "Quality Assurance", description: "Certified testing ensuring structural integrity and safety compliance", color: primaryColor, gradient: `linear-gradient(135deg, #cc1616 0%, #ff4d4d 100%)` },
    { icon: <Clock size={32} />, title: "24/7 Emergency Service", description: "Round-the-clock testing for critical infrastructure emergencies", color: "#0066cc", gradient: "linear-gradient(135deg, #0066cc 0%, #3399ff 100%)" },
    { icon: <Users size={32} />, title: "ASNT Certified", description: "Level III certified inspectors with 15+ years experience", color: "#009688", gradient: "linear-gradient(135deg, #009688 0%, #4db6ac 100%)" },
    { icon: <Award size={32} />, title: "NABL Accredited", description: "Industry-recognized accreditation for aerospace testing", color: "#8e44ad", gradient: "linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)" },
  ];

  /* ==========================================================
     🔬 TESTING GROUPS — with certification levels
     ========================================================== */
  const testingGroups = [
    {
      id: "ndt",
      name: "NDT Testing",
      fullName: "Non-Destructive Testing",
      icon: <Activity size={28} />,
      color: primaryColor,
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
      description:
        "Non-Destructive Testing services for flaw detection and material integrity without damaging the component",
      methods: [
        {
          id: 1,
          method: "Phased Array UT",
          shortName: "PAUT",
          certification: "ASNT Level II",
          description:
            "Advanced ultrasonic technique with multiple elements for detailed imaging and comprehensive inspection.",
          icon: <Scan size={28} />,
          color: "#E65100",
          gradient: "linear-gradient(135deg, #E65100 0%, #FF9800 100%)",
          applications: ["Weld Inspection", "Corrosion Mapping", "Composite Materials", "Thick Sections", "Complex Geometries"],
          standards: ["ASME Section V", "ISO 13588", "ASTM E2491", "AWS D1.1"],
          advantages: ["3D imaging", "High resolution", "Multiple angles", "Fast scanning", "Better defect sizing"],
          image: "🔍",
        },
        {
          id: 2,
          method: "Time of Flight Diffraction",
          shortName: "TOFD",
          certification: "ASNT Level II",
          description:
            "Advanced ultrasonic technique that uses diffracted signals to detect, locate, and size internal weld defects accurately.",
          icon: <Waves size={28} />,
          color: "#00838F",
          gradient: "linear-gradient(135deg, #00838F 0%, #4DD0E1 100%)",
          applications: ["Weld Inspection", "Crack Detection", "Defect Sizing", "Pressure Vessels", "Pipeline Inspection"],
          standards: ["ASME Section V", "ISO 10863", "ASTM E2373", "EN ISO 15626"],
          advantages: ["Accurate defect sizing", "High inspection coverage", "Permanent digital records", "Fast weld inspection", "Reliable crack detection"],
          image: "📐",
        },
        {
          id: 3,
          method: "Eddy Current Testing",
          shortName: "ECT",
          certification: "ASNT Level II",
          description:
            "Electromagnetic induction detects surface and sub-surface flaws in conductive materials with precision.",
          icon: <Zap size={28} />,
          color: "#7B1FA2",
          gradient: "linear-gradient(135deg, #7B1FA2 0%, #AB47BC 100%)",
          applications: ["Heat Exchanger Tubes", "Aircraft Structures", "Conductive Materials", "Coating Thickness", "Crack Detection"],
          standards: ["ASTM E426", "ISO 15548", "ASME Section V", "ASTM E243"],
          advantages: ["No couplant needed", "High speed", "Automated inspection", "Good for tubes", "Portable"],
          image: "⚡",
        },
        {
          id: 4,
          method: "Digital Radiography",
          shortName: "DR",
          certification: "ASNT Level III",
          description:
            "Digital radiographic inspection using electronic detectors to produce images for evaluating internal discontinuities in components and welds.",
          icon: <Scan size={28} />,
          color: "#6A1B9A",
          gradient: "linear-gradient(135deg, #6A1B9A 0%, #AB47BC 100%)",
          applications: ["Weld Inspection", "Casting Inspection", "Pipeline Inspection", "Porosity Detection", "Pressure Vessel Inspection"],
          standards: ["ASME Section V", "ISO 17636-2", "ASTM E2698", "ASTM E2737"],
          advantages: ["Real-time image acquisition", "Fast inspection workflow", "Digital image enhancement", "Easy image storage", "Efficient defect evaluation"],
          image: "📷",
        },
        {
          id: 5,
          method: "Computed Radiography",
          shortName: "CR",
          certification: "ASNT Level III",
          description:
            "Digital radiographic technique that uses reusable imaging plates to capture and evaluate internal defects in materials and welds.",
          icon: <Scan size={28} />,
          color: "#1565C0",
          gradient: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
          applications: ["Weld Inspection", "Casting Inspection", "Pipeline Radiography", "Porosity Detection", "Internal Defect Evaluation"],
          standards: ["ASME Section V", "ISO 17636-2", "ASTM E2446", "ASTM E2033"],
          advantages: ["Reusable imaging plates", "Digital image processing", "Reduced chemical waste", "Permanent image storage", "Efficient image review"],
          image: "🩻",
        },
        {
          id: 6,
          method: "Ultrasonic Testing",
          shortName: "UT",
          certification: "ASNT Level III",
          description:
            "High-frequency sound waves detect internal flaws and measure thickness with exceptional precision.",
          icon: <Waves size={28} />,
          color: primaryColor,
          gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
          applications: ["Weld Inspection", "Corrosion Mapping", "Bond Testing", "Thickness Measurement", "Composite Inspection"],
          standards: ["ASTM E317", "ISO 17640", "ASME Section V", "AWS D1.1"],
          advantages: ["Deep penetration", "High sensitivity", "Digital imaging", "Real-time results", "Portable equipment"],
          image: "📡",
        },
        {
          id: 7,
          method: "Magnetic Particle Testing",
          shortName: "MPT",
          certification: "ASNT Level III",
          description:
            "Magnetic fields detect surface and near-surface flaws in ferromagnetic materials with high reliability.",
          icon: <Magnet size={28} />,
          color: "#009688",
          gradient: "linear-gradient(135deg, #009688 0%, #4db6ac 100%)",
          applications: ["Ferrous Materials", "Automotive Parts", "Structural Steel", "Railway Components", "Forgings"],
          standards: ["ASTM E709", "ISO 9934", "ASME Section V", "ASTM E1444"],
          advantages: ["Immediate results", "Surface & subsurface", "Easy interpretation", "Cost-effective", "Portable"],
          image: "🧲",
        },
        {
          id: 8,
          method: "Dye Penetrant Testing",
          shortName: "DPT",
          certification: "ASNT Level III",
          description:
            "Liquid penetrant reveals surface-breaking defects with exceptional sensitivity and clarity.",
          icon: <Droplets size={28} />,
          color: "#0066cc",
          gradient: "linear-gradient(135deg, #0066cc 0%, #3399ff 100%)",
          applications: ["Non-porous Materials", "Surface Cracks", "Forgings", "Machined Parts", "Castings"],
          standards: ["ASTM E165", "ISO 3452", "ASME 2782", "ASTM E1417"],
          advantages: ["Portable equipment", "High sensitivity", "Low cost", "Quick results", "Easy to use"],
          image: "💧",
        },
        {
          id: 9,
          method: "Positive Material Identification",
          shortName: "PMI",
          description:
            "Verifies material composition and alloy grade using XRF or OES analysis with high accuracy.",
          icon: <Atom size={28} />,
          color: "#9C27B0",
          gradient: "linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)",
          applications: ["Alloy Verification", "Material Certification", "Scrap Sorting", "Quality Control", "Grade Confirmation"],
          standards: ["ASTM E1476", "ISO 9001", "ASME Section II", "ASTM E1257"],
          advantages: ["Non-destructive", "Quick results", "Portable (XRF)", "High accuracy", "Real-time analysis"],
          image: "⚛️",
        },
        {
          id: 10,
          method: "Portable Spectrometry",
          shortName: "SPECTRO",
          description:
            "Field-portable OES/XRF analysers verify alloy grade and chemical composition including carbon and light elements.",
          icon: <Microscope size={28} />,
          color: "#2E7D32",
          gradient: "linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)",
          applications: [
            "Alloy Grade Verification",
            "PMI on Piping & Valves",
            "Material Certification",
            "Weld Consumable Verification",
            "Scrap Sorting",
          ],
          standards: ["ASTM E415", "ASTM E1086", "ASTM E1257", "API 578"],
          advantages: [
            "Field-portable",
            "Carbon & light element analysis",
            "Fast alloy identification",
            "High accuracy for metals",
            "Complements XRF (adds C, Si, Al)",
          ],
          image: "🔬",
        },
        {
          id: 11,
          method: "Portable Hardness Testing",
          shortName: "Hardness",
          certification: "ASNT Level II",
          description:
            "Non-destructive portable hardness testing using UCI or Leeb rebound methods for in-situ measurement of large components and heat-affected zones.",
          icon: <Diamond size={28} />,
          color: "#607D8B",
          gradient: "linear-gradient(135deg, #607D8B 0%, #90A4AE 100%)",
          applications: [
            "Heat Affected Zones",
            "Large Components",
            "In-service Inspection",
            "Weld Hardness",
            "Coating Hardness",
          ],
          standards: ["ASTM A1038", "ISO 16859", "ASTM E110", "ASTM E956"],
          advantages: [
            "Minimal surface damage",
            "Portable",
            "Quick results",
            "Multiple scales",
            "Field deployable",
          ],
          image: "💎",
        },
        {
          id: 12,
          method: "Ultrasonic Thickness Measurement",
          shortName: "Thickness",
          certification: "ASNT Level II",
          description:
            "Ultrasonic thickness gauging to monitor corrosion, erosion, and wall thinning in pipelines, storage tanks, and pressure vessels from one side.",
          icon: <Ruler size={28} />,
          color: "#00838F",
          gradient: "linear-gradient(135deg, #00838F 0%, #26C6DA 100%)",
          applications: [
            "Corrosion Monitoring",
            "Tank Inspection",
            "Pipeline Assessment",
            "Pressure Vessels",
            "Ship Hulls",
          ],
          standards: ["ASTM E797", "ISO 16809", "ASME Section V", "API 570"],
          advantages: [
            "Non-invasive (one side)",
            "Accuracy ±0.01 mm",
            "Portable",
            "Real-time readout",
            "Data logging",
          ],
          image: "📏",
        },
      ],
    },
    {
      id: "dt",
      name: "DT Testing",
      fullName: "Destructive Testing",
      icon: <BarChart3 size={28} />,
      color: "#009688",
      gradient: "linear-gradient(135deg, #009688 0%, #4db6ac 100%)",
      description:
        "Destructive Testing services to evaluate mechanical properties and material performance under stress",
      methods: [
        {
          id: 13,
          method: "Tensile Testing",
          shortName: "Tensile",
          certification: "NABL Accredited",
          description: "Measures material strength, ductility, and elasticity by pulling a specimen until failure.",
          icon: <TrendingUp size={28} />,
          color: "#009688",
          gradient: "linear-gradient(135deg, #009688 0%, #4db6ac 100%)",
          applications: ["Weld Qualification", "Material Certification", "Quality Control", "Research & Development", "Failure Analysis"],
          standards: ["ASTM E8", "ISO 6892", "ASME Section IX", "ASTM A370"],
          advantages: ["Accurate strength data", "Ductility measurement", "Standard-compliant", "Wide material range", "Detailed stress-strain curves"],
          image: "📈",
        },
        {
          id: 14,
          method: "Compression Testing",
          shortName: "Compression",
          certification: "NABL Accredited",
          description: "Determines compressive strength, yield behavior, and deformation characteristics of materials.",
          icon: <Layers size={28} />,
          color: "#2196f3",
          gradient: "linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)",
          applications: ["Concrete Testing", "Composite Materials", "Foam & Polymers", "Ceramics", "Structural Components"],
          standards: ["ASTM E9", "ISO 604", "ASTM D695", "ASTM C39"],
          advantages: ["Accurate load data", "Deformation analysis", "Material behavior insight", "Standard procedures", "Detailed reporting"],
          image: "🔽",
        },
        {
          id: 15,
          method: "Bend Testing",
          shortName: "Bend",
          certification: "NABL Accredited",
          description: "Evaluates ductility and soundness of welds and materials by bending to a specified angle.",
          icon: <GitBranch size={28} />,
          color: "#7B1FA2",
          gradient: "linear-gradient(135deg, #7B1FA2 0%, #AB47BC 100%)",
          applications: ["Weld Qualification", "Plate & Sheet Testing", "Pipe Testing", "Structural Steel", "Quality Assurance"],
          standards: ["ASTM E190", "ISO 7438", "ASME Section IX", "AWS D1.1"],
          advantages: ["Weld ductility check", "Simple procedure", "Quick results", "Standard-compliant", "Cost-effective"],
          image: "↩️",
        },
        {
          id: 16,
          method: "Re-bend Testing",
          shortName: "Re-bend",
          certification: "NABL Accredited",
          description: "Bends a specimen in the opposite direction after initial bend to reveal internal defects.",
          icon: <GitBranch size={28} />,
          color: "#E65100",
          gradient: "linear-gradient(135deg, #E65100 0%, #FF9800 100%)",
          applications: ["Weld Qualification", "Rebar Testing", "Wire Testing", "Sheet Metal", "Quality Control"],
          standards: ["ASTM E190", "ISO 7438", "BS 4449", "ASTM A615"],
          advantages: ["Detects internal flaws", "More severe than bend test", "Standard procedure", "Quick results", "Simple interpretation"],
          image: "🔄",
        },
        {
          id: 17,
          method: "Impact Testing",
          shortName: "Impact",
          certification: "NABL Accredited",
          description: "Measures material toughness and resistance to sudden loading using Charpy or Izod methods.",
          icon: <ZapIcon size={28} />,
          color: "#FF6F00",
          gradient: "linear-gradient(135deg, #FF6F00 0%, #FFA726 100%)",
          applications: ["Weld Qualification", "Pressure Vessels", "Piping Systems", "Structural Steel", "Low-Temperature Service"],
          standards: ["ASTM E23", "ISO 148", "ASME Section VIII", "ASTM A370"],
          advantages: ["Toughness measurement", "Transition temperature data", "Standard-compliant", "Wide temperature range", "Detailed energy data"],
          image: "💥",
        },
        {
          id: 18,
          method: "Hardness Testing",
          shortName: "BenchHardness",
          certification: "NABL Accredited",
          description: "Measures material hardness using Brinell, Rockwell, Vickers, or Leeb methods.",
          icon: <Diamond size={28} />,
          color: "#607D8B",
          gradient: "linear-gradient(135deg, #607D8B 0%, #90A4AE 100%)",
          applications: ["Heat Affected Zones", "Large Components", "In-service Inspection", "Weld Hardness", "Coating Hardness"],
          standards: ["ASTM E10", "ASTM E18", "ASTM E92", "ISO 6506"],
          advantages: ["Multiple scales", "Portable options", "Quick results", "Minimal surface damage", "Wide material range"],
          image: "💎",
        },
        /* ============ MECHANICAL TESTING ============ */
        {
          id: 19,
          method: "Mechanical Testing",
          shortName: "Mechanical",
          certification: "NABL Accredited",
          description:
            "Comprehensive mechanical property evaluation covering tensile, compression, bend, impact, hardness, and fastener tests on metals and structural components.",
          icon: <Wrench size={28} />,
          color: "#455A64",
          gradient: "linear-gradient(135deg, #455A64 0%, #78909C 100%)",
          applications: [
            "Material Certification",
            "Weld Qualification",
            "Design Validation",
            "Failure Analysis",
            "Batch Quality Control",
          ],
          standards: ["ASTM E8", "ASTM E9", "ASTM E23", "ASTM E10", "ASTM E190"],
          advantages: [
            "Single-vendor convenience",
            "Consolidated reporting",
            "Wide property coverage",
            "Standard-compliant",
            "Fast turnaround",
          ],
          image: "⚙️",
        },
        /* ============ METALLURGICAL TESTING ============ */
        {
          id: 20,
          method: "Metallurgical Testing",
          shortName: "Metallurgical",
          certification: "NABL Accredited",
          description:
            "Microstructural and metallurgical evaluation including macro/micro examination, grain size, phase analysis, microhardness, case depth, corrosion, and failure investigation.",
          icon: <Microscope size={28} />,
          color: "#6A1B9A",
          gradient: "linear-gradient(135deg, #6A1B9A 0%, #BA68C8 100%)",
          applications: [
            "Microstructure Analysis",
            "Weld Metallurgy",
            "Heat Treatment Verification",
            "Failure Investigation",
            "Corrosion Assessment",
          ],
          standards: ["ASTM E3", "ASTM E112", "ASTM E407", "ASTM E384", "ASTM E45"],
          advantages: [
            "High-resolution imaging",
            "Phase & grain analysis",
            "Failure root cause",
            "Corrosion diagnosis",
            "Detailed metallurgical report",
          ],
          image: "🔬",
        },
      ],
    },
  ];

  /* ---------------- INDUSTRIES ---------------- */
  const industries = [
    { name: "Oil & Gas", icon: <Factory size={20} />, color: primaryColor },
    { name: "Aerospace", icon: <Plane size={20} />, color: "#2196f3" },
    { name: "Automotive", icon: <Car size={20} />, color: "#1a8cff" },
    { name: "Marine", icon: <Ship size={20} />, color: "#009688" },
    { name: "Construction", icon: <HardHat size={20} />, color: "#7B1FA2" },
    { name: "Power", icon: <ZapIcon size={20} />, color: "#E65100" },
  ];

  /* ---------------- MOUSE + OBSERVER ---------------- */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        setMousePosition({ x: ((e.clientX - left) / width) * 100, y: ((e.clientY - top) / height) * 100 });
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.dataset.section]: true }));
          }
        });
      },
      { threshold: 0.15, rootMargin: "-30px" }
    );
    if (heroRef.current) heroRef.current.addEventListener("mousemove", handleMouseMove);
    sectionRefs.current.forEach((s) => { if (s) observer.observe(s); });
    return () => {
      observer.disconnect();
      if (heroRef.current) heroRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const addToRefs = (el, index) => { sectionRefs.current[index] = el; };

  const specTabs = [
    { id: "ultrasonic", label: "UT", icon: "📡" },
    { id: "magnetic", label: "MPT", icon: "🧲" },
    { id: "penetrant", label: "DPT", icon: "🔬" },
  ];

  const handleRequestService = (method) => { setSelectedMethod(method); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setTimeout(() => setSelectedMethod(null), 300); };
  const handleSelectMethod = (method) => { setSelectedMethod(method); };

  const allTestingMethods = testingGroups.flatMap((g) => g.methods);

  return (
    <div className="prod-page" id="services">
      {/* SCROLL PROGRESS */}
      <div className="prod-scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* HERO */}
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
        <div className="prod-hero-particles">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="prod-hero-particle"
              style={{
                left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                animationDuration: `${12 + Math.random() * 18}s`, animationDelay: `${Math.random() * 10}s`,
                width: `${3 + Math.random() * 8}px`, height: `${3 + Math.random() * 8}px`,
                background: `rgba(74, 130, 168, ${0.08 + Math.random() * 0.2})`,
              }}
            ></div>
          ))}
        </div>
        <div className="prod-container">
          <div className="prod-hero-content">
            <div className="prod-hero-badge prod-badge-pulse">
              <span className="prod-badge-dot"></span>
              NDT &amp; DT Testing Solutions
            </div>
            <h1 className="prod-hero-title">NDT &amp; DT <span className="prod-hero-highlight">Testing</span> Services</h1>
            <p className="prod-hero-subtitle">
              ASNT Level III certified NDT and DT testing services with advanced equipment and expert analysis
            </p>
            <div className="prod-hero-buttons">
              <button className="prod-primary-button prod-btn-shimmer"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})` }}
                onClick={() => navigate("/contact")}>
                <span>Request Inspection</span><div className="prod-btn-glow"></div>
              </button>
              <button className="prod-secondary-button">View Certifications<span className="prod-btn-arrow">→</span></button>
            </div>
            <div className="prod-hero-stats" ref={counterRef}>
              <div className="prod-stat-item prod-stat-glow"><span className="prod-stat-number" style={{ color: primaryLight }}>{counters.projects || 0}+</span><span className="prod-stat-label">Projects Completed</span></div>
              <div className="prod-stat-divider"></div>
              <div className="prod-stat-item prod-stat-glow"><span className="prod-stat-number" style={{ color: primaryLight }}>{counters.clients || 0}+</span><span className="prod-stat-label">Happy Clients</span></div>
              <div className="prod-stat-divider"></div>
              <div className="prod-stat-item prod-stat-glow"><span className="prod-stat-number" style={{ color: primaryLight }}>{counters.countries || 0}+</span><span className="prod-stat-label">Countries Served</span></div>
              <div className="prod-stat-divider"></div>
              <div className="prod-stat-item prod-stat-glow"><span className="prod-stat-number" style={{ color: primaryLight }}>{counters.experience || 0}+</span><span className="prod-stat-label">Years Experience</span></div>
            </div>
          </div>
        </div>
        <div className="prod-hero-scroll">
          <div className="prod-scroll-mouse"><div className="prod-scroll-wheel"></div></div>
          <div className="prod-scroll-text">Scroll Down</div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="prod-overview-section" ref={(el) => addToRefs(el, 1)} data-section="overview">
        <div className="prod-container-inner">
          <div className="prod-section-header">
            <div className="prod-section-badge" style={{ background: primaryColor }}><Shield size={16} />Our Services</div>
            <h2 className="prod-section-title">Comprehensive <span style={{ color: primaryColor }}>Testing Solutions</span></h2>
            <div className="prod-section-divider">
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="prod-divider-dot prod-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="prod-section-description">
              ASNT Level III certified NDT and DT testing services with advanced equipment and expert analysis
            </p>
          </div>
          <div className="prod-overview-content">
            <div className={`prod-overview-text ${visibleSections.overview ? "prod-animate-fade" : ""}`}>
              <div className="prod-content-highlight prod-float-animation">
                <div className="prod-highlight-icon"><Star size={24} style={{ color: primaryColor }} /></div>
                <p>
                  We provide complete <strong className="prod-highlight-text" style={{ color: primaryColor }}>NDT &amp; DT Testing</strong> services for quality assurance and structural integrity evaluation. Our certified technicians use state-of-the-art equipment to detect flaws, measure material properties, and ensure compliance with international standards.
                </p>
              </div>
              <div className="prod-service-highlights">
                <div className="prod-highlight-item prod-slide-animation"><CheckCircle color={primaryColor} size={24} /><span>ISO 9712 &amp; ASNT SNT-TC-1A Certified</span></div>
                <div className="prod-highlight-item prod-slide-animation" style={{ animationDelay: "0.1s" }}><CheckCircle color={primaryColor} size={24} /><span>NABL Accredited for Aerospace</span></div>
                <div className="prod-highlight-item prod-slide-animation" style={{ animationDelay: "0.2s" }}><CheckCircle color={primaryColor} size={24} /><span>24/7 Emergency Inspection Services</span></div>
                <div className="prod-highlight-item prod-slide-animation" style={{ animationDelay: "0.3s" }}><CheckCircle color={primaryColor} size={24} /><span>Worldwide Testing Capabilities</span></div>
              </div>
            </div>
            <div className={`prod-features-grid ${visibleSections.overview ? "prod-animate-slide-right" : ""}`}>
              {serviceFeatures.map((feature, index) => (
                <div key={index} className="prod-feature-card prod-hover-float prod-card-glow" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="prod-feature-card-inner">
                    <div className="prod-feature-card-icon" style={{ background: feature.gradient }}>
                      {feature.icon}<div className="prod-icon-ring"></div>
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

      {/* METHODS */}
      <section className="prod-methods-section" ref={(el) => addToRefs(el, 2)} data-section="methods">
        <div className="prod-container-inner">
          <div className="prod-section-header">
            <div className="prod-section-badge" style={{ background: primaryColor }}><Microscope size={16} />Testing Services</div>
            <h2 className="prod-section-title">Our Testing <span style={{ color: primaryColor }}>Capabilities</span></h2>
            <div className="prod-section-divider">
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="prod-divider-dot prod-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="prod-section-description">
              Advanced NDT and DT testing techniques for accurate results and quality assurance
            </p>
          </div>

          <div className="prod-industry-tags">
            {industries.map((industry, idx) => (
              <span key={idx} className="prod-industry-tag" style={{ borderColor: industry.color }}>
                {industry.icon}{industry.name}
              </span>
            ))}
          </div>

          <div className="prod-testing-group-tabs">
            {testingGroups.map((group) => (
              <button
                key={group.id}
                className={`prod-group-tab ${activeTab === group.id ? "prod-group-tab-active" : ""}`}
                onClick={() => setActiveTab(group.id)}
                style={activeTab === group.id ? { borderColor: group.color, background: `${group.color}12`, color: group.color, boxShadow: `0 8px 25px ${group.color}30` } : {}}
              >
                <span className="prod-group-tab-icon">{group.icon}</span>
                <span className="prod-group-tab-text"><strong>{group.name}</strong><small>{group.fullName}</small></span>
              </button>
            ))}
          </div>

          {testingGroups.filter((g) => g.id === activeTab).map((group) => (
            <div key={group.id} className="prod-active-group-info">
              <p className="prod-active-group-desc">{group.description}</p>
              <div className="prod-active-group-meta">
                <span className="prod-group-count" style={{ background: `${group.color}15`, color: group.color, borderColor: `${group.color}30` }}>
                  {group.methods.length} Testing Methods
                </span>
              </div>
            </div>
          ))}

          <div className="prod-methods-grid">
            {testingGroups
              .filter((g) => g.id === activeTab)
              .flatMap((group) =>
                group.methods.map((method, index) => (
                  <div
                    key={method.id}
                    className={`prod-method-card ${visibleSections.methods ? "prod-animate-fade" : ""}`}
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="prod-method-card-header" style={{ background: method.gradient }}>
                      <div className="prod-method-card-icon prod-icon-pulse">{method.icon}</div>
                      <h3 className="prod-method-card-title">{method.method}</h3>
                      <div className="prod-method-card-number">#{String(index + 1).padStart(2, "0")}</div>
                      <div className="prod-method-card-short">{method.shortName}</div>
                    </div>

                    <div className="prod-method-card-content">
                      <p className="prod-method-card-description">{method.description}</p>

                      <div className="prod-method-card-section">
                        <h4 className="prod-method-card-subtitle"><Target size={16} />Applications:</h4>
                        <div className="prod-applications-list">
                          {method.applications.map((app, i) => (
                            <span key={i} className="prod-application-tag prod-slide-animation"
                              style={{ background: method.color + "15", color: method.color, borderColor: method.color + "30", animationDelay: `${i * 0.05}s` }}>
                              <CheckCircle size={12} />{app}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="prod-method-card-section">
                        <h4 className="prod-method-card-subtitle"><BookOpen size={16} />Standards:</h4>
                        <div className="prod-standards-list">
                          {method.standards.map((std, i) => (
                            <span key={i} className="prod-standard-badge prod-pop-animation" style={{ animationDelay: `${i * 0.1}s` }}>{std}</span>
                          ))}
                        </div>
                      </div>

                      <div className="prod-method-card-section">
                        <h4 className="prod-method-card-subtitle"><Rocket size={16} />Advantages:</h4>
                        <ul className="prod-advantages-list">
                          {method.advantages.map((adv, i) => (
                            <li key={i} className="prod-slide-animation" style={{ animationDelay: `${i * 0.1}s` }}>
                              <div className="prod-advantage-dot prod-pulse-dot" style={{ background: method.color }}></div>
                              <span className="prod-advantage-text">{adv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="prod-button-container">
                        <button className="prod-method-card-button" style={{ background: method.gradient }} onClick={() => handleRequestService(method)}>
                          <span>Request Service</span>
                          <div className="prod-button-arrow">→</div>
                          <div className="prod-btn-ripple"></div>
                        </button>
                      </div>
                    </div>

                    <div className="prod-method-card-hover-effect"></div>
                  </div>
                ))
              )}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="prod-certification-section" ref={(el) => addToRefs(el, 6)} data-section="process">
        <div className="prod-container-inner">
          <div className="prod-section-header">
            <div className="prod-section-badge" style={{ background: primaryColor }}><Crown size={16} />Our Process</div>
            <h2 className="prod-section-title">Certification <span style={{ color: primaryColor }}>Process</span></h2>
            <div className="prod-section-divider">
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="prod-divider-dot prod-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="prod-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="prod-section-description">Streamlined process from inspection to certification</p>
          </div>

          <div className="prod-process-timeline">
            {[
              { step: 1, title: "Client Consultation", description: "Understanding testing requirements and specifications for accurate results", icon: "💬", duration: "1-2 Days" },
              { step: 2, title: "Method Selection", description: "Choosing appropriate testing methods based on material and defect type", icon: "📋", duration: "1 Day" },
              { step: 3, title: "On-site Inspection", description: "Deploying certified technicians with calibrated equipment for precise testing", icon: "🔍", duration: "Variable" },
              { step: 4, title: "Data Analysis", description: "Expert analysis of test results using advanced software and AI tools", icon: "📊", duration: "2-3 Days" },
              { step: 5, title: "Report Generation", description: "Comprehensive report with findings, analysis, and actionable recommendations", icon: "📑", duration: "1-2 Days" },
              { step: 6, title: "Certification Issuance", description: "Official certification, quality stamp, and ongoing technical support", icon: "🏆", duration: "1 Day" },
            ].map((process, index) => (
              <div
                key={index}
                className={`prod-process-step ${animatedSteps.includes(process.step) ? "prod-animate-fade" : ""}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="prod-process-step-indicator">
                  <div className="prod-process-step-number prod-pulse-animation" style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)` }}>
                    {process.step}<div className="prod-process-step-glow"></div>
                  </div>
                  <div className="prod-process-step-icon">{process.icon}</div>
                </div>
                <div className="prod-process-step-content prod-hover-float">
                  <h3 className="prod-process-step-title">{process.title}</h3>
                  <p className="prod-process-step-description">{process.description}</p>
                  <div className="prod-process-step-duration">
                    <span className="prod-duration-icon prod-pulse-animation">⏱️</span>{process.duration}
                  </div>
                  <div className="prod-process-step-hover"></div>
                </div>
                {index < 5 && <div className="prod-process-step-connector prod-pulse-animation" style={{ background: primaryColor }}></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <ServiceDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        method={selectedMethod}
        allMethods={allTestingMethods}
        onSelectMethod={handleSelectMethod}
      />
    </div>
  );
};

export default Product;