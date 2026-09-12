import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
// Product.jsx
import "../Product/Product.css";
import testingBackground from "../../assets/ut.jpg";
import mineralsBackground from "../../assets/ut.jpg";
import teamBg from "../../assets/ut.jpg";
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
Radiation,
Waves,
Droplets,
Ruler,
Diamond,
CircleDot,
Atom,
Package,
Truck,
Hammer,
BarChart,
Linkedin,
Mail,
Phone,
Calendar,
MapPin,
ExternalLink,
MessageSquare,
Code,
Palette,
Database,
Cloud,
Smartphone,
Lock,
Server,
GitBranch,
Code2,
Terminal,
Wifi,
ShieldCheck,
Key,
Fingerprint,
Brain,
Users2,
Globe2,
Puzzle,
GitPullRequest,
Eye,
BrainCircuit,
Trophy,
Medal,
Flag,
Microscope,
Magnet,
Scan,
Radio,
BookOpen,
Gauge
} from "lucide-react";

import { useNavigate } from "react-router-dom";

// Team images (You'll need to add these images to your assets folder)
import admin1 from "../../assets/ut.jpg";
import admin2 from "../../assets/ut.jpg";
import admin3 from "../../assets/ut.jpg";
import admin4 from "../../assets/ut.jpg";
import admin5 from "../../assets/ut.jpg";
import admin6 from "../../assets/ut.jpg";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhoneCall } from "react-icons/lu";
import contactImage from "../../assets/contact1.png";

const contactData = [
  {
    icon: <SlLocationPin style={{ fontSize: 30, color: "#D6BB6E" }} />,
    title: "Our Address",
    description: (
      <>
        SH No. 309 Hillton Aristo,
        <br />
        Nr. Gol Trio Mavdi Kankot, Mavdi, Rajkot, Rajkot- 360004, Gujarat.
      </>
    ),
  },
  {
    icon: <HiOutlineMail style={{ fontSize: 30, color: "#D6BB6E" }} />,
    title: "Email Us",
    description: "dhaval@ndttesting.co.in",
  },
  {
    icon: <LuPhoneCall style={{ fontSize: 30, color: "#D6BB6E" }} />,
    title: "Call Us",
    description: "+91 76005 78888",
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("ultrasonic");
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    overview: true, // Set to true by default
    methods: false,
    "dt-methods": false,
    specs: false,
    process: false,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedSteps, setAnimatedSteps] = useState([]);
  const sectionRefs = useRef([]);
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const statsRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [counters, setCounters] = useState({});
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
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                setCounters((prev) => ({
                  ...prev,
                  [id]: Math.floor(current),
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
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
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
      description:
        "High-frequency sound waves detect internal flaws and measure thickness with exceptional precision.",
      icon: <Waves size={28} />,
      color: primaryColor,
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
      applications: [
        "Weld Inspection",
        "Corrosion Mapping",
        "Bond Testing",
        "Thickness Measurement",
        "Composite Inspection",
      ],
      standards: ["ASTM E317", "ISO 17640", "ASME Section V", "AWS D1.1"],
      advantages: [
        "Deep penetration",
        "High sensitivity",
        "Digital imaging",
        "Real-time results",
        "Portable equipment",
      ],
      image: "📡",
    },
    {
      id: 2,
      method: "Magnetic Particle Testing",
      shortName: "MPT",
      description:
        "Magnetic fields detect surface and near-surface flaws in ferromagnetic materials with high reliability.",
      icon: <Magnet size={28} />,
      color: "#009688",
      gradient: "linear-gradient(135deg, #009688 0%, #4db6ac 100%)",
      applications: [
        "Ferrous Materials",
        "Automotive Parts",
        "Structural Steel",
        "Railway Components",
        "Forgings",
      ],
      standards: ["ASTM E709", "ISO 9934", "ASME Section V", "ASTM E1444"],
      advantages: [
        "Immediate results",
        "Surface & subsurface",
        "Easy interpretation",
        "Cost-effective",
        "Portable",
      ],
      image: "🧲",
    },
    {
      id: 3,
      method: "Dye Penetrant Testing",
      shortName: "DPT",
      description:
        "Liquid penetrant reveals surface-breaking defects with exceptional sensitivity and clarity.",
      icon: <Droplets size={28} />,
      color: "#0066cc",
      gradient: "linear-gradient(135deg, #0066cc 0%, #3399ff 100%)",
      applications: [
        "Non-porous Materials",
        "Surface Cracks",
        "Forgings",
        "Machined Parts",
        "Castings",
      ],
      standards: ["ASTM E165", "ISO 3452", "ASME 2782", "ASTM E1417"],
      advantages: [
        "Portable equipment",
        "High sensitivity",
        "Low cost",
        "Quick results",
        "Easy to use",
      ],
      image: "💧",
    },
    {
      id: 4,
      method: "Eddy Current Testing",
      shortName: "ECT",
      description:
        "Electromagnetic induction detects surface and sub-surface flaws in conductive materials with precision.",
      icon: <Zap size={28} />,
      color: "#7B1FA2",
      gradient: "linear-gradient(135deg, #7B1FA2 0%, #AB47BC 100%)",
      applications: [
        "Heat Exchanger Tubes",
        "Aircraft Structures",
        "Conductive Materials",
        "Coating Thickness",
        "Crack Detection",
      ],
      standards: ["ASTM E426", "ISO 15548", "ASME Section V", "ASTM E243"],
      advantages: [
        "No couplant needed",
        "High speed",
        "Automated inspection",
        "Good for tubes",
        "Portable",
      ],
      image: "⚡",
    },
    {
      id: 5,
      method: "Phased Array UT",
      shortName: "PAUT",
      description:
        "Advanced ultrasonic technique with multiple elements for detailed imaging and comprehensive inspection.",
      icon: <Scan size={28} />,
      color: "#E65100",
      gradient: "linear-gradient(135deg, #E65100 0%, #FF9800 100%)",
      applications: [
        "Weld Inspection",
        "Corrosion Mapping",
        "Composite Materials",
        "Thick Sections",
        "Complex Geometries",
      ],
      standards: ["ASME Section V", "ISO 13588", "ASTM E2491", "AWS D1.1"],
      advantages: [
        "3D imaging",
        "High resolution",
        "Multiple angles",
        "Fast scanning",
        "Better defect sizing",
      ],
      image: "🔍",
    },
    {
      id: 6,
      method: "Positive Material Identification",
      shortName: "PMI",
      description:
        "Verifies material composition and alloy grade using XRF or OES analysis with high accuracy.",
      icon: <Atom size={28} />,
      color: "#9C27B0",
      gradient: "linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)",
      applications: [
        "Alloy Verification",
        "Material Certification",
        "Scrap Sorting",
        "Quality Control",
        "Grade Confirmation",
      ],
      standards: ["ASTM E1476", "ISO 9001", "ASME Section II", "ASTM E1257"],
      advantages: [
        "Non-destructive",
        "Quick results",
        "Portable (XRF)",
        "High accuracy",
        "Real-time analysis",
      ],
      image: "⚛️",
    },
    {
      id: 7,
      method: "Portable Spectrometer",
      shortName: "Spectro",
      description:
        "Handheld analysis of chemical composition using optical emission or X-ray fluorescence technology.",
      icon: <Radio size={28} />,
      color: "#FF6F00",
      gradient: "linear-gradient(135deg, #FF6F00 0%, #FFA726 100%)",
      applications: [
        "Metal Sorting",
        "Alloy Analysis",
        "Quality Control",
        "Scrap Recycling",
        "Field Inspection",
      ],
      standards: ["ASTM E415", "ISO 17025", "ASTM E1257", "ASTM E322"],
      advantages: [
        "Handheld",
        "Fast results",
        "Multi-element",
        "Non-destructive",
        "Field deployable",
      ],
      image: "🌈",
    },
    {
      id: 8,
      method: "Hardness Testing",
      shortName: "Hardness",
      description:
        "Measures material hardness without indentation using ultrasonic or rebound methods with precision.",
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
        "No surface damage",
        "Portable",
        "Quick results",
        "Large area coverage",
        "Multiple scales",
      ],
      image: "💎",
    },
    {
      id: 9,
      method: "Thickness Measurement",
      shortName: "Thickness",
      description:
        "Measures material thickness using ultrasonic or electromagnetic methods with exceptional accuracy.",
      icon: <Ruler size={28} />,
      color: "#4CAF50",
      gradient: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
      applications: [
        "Corrosion Monitoring",
        "Tank Inspection",
        "Pipeline Assessment",
        "Pressure Vessels",
        "Ship Hulls",
      ],
      standards: ["ASTM E797", "ISO 16809", "ASME Section V", "ASTM E1930"],
      advantages: [
        "Non-invasive",
        "Accurate",
        "Portable",
        "Real-time data",
        "Multiple materials",
      ],
      image: "📏",
    },
  ];

  // ============================================
  // 🖱️ MOUSE PARALLAX EFFECT
  // ============================================
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();
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

  // ============================================
  // 📋 METHOD TABS FOR SPECS
  // ============================================
  const specTabs = [
    { id: "ultrasonic", label: "UT", icon: "📡" },
    { id: "magnetic", label: "MPT", icon: "🧲" },
    { id: "penetrant", label: "DPT", icon: "🔬" },
  ];

  const secondaryColor = "#0a0a0a";
  const accentColor = "#f0f0f0";

  useEffect(() => {
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
      {
        threshold: 0.1, // Lower threshold
        rootMargin: "0px 0px -100px 0px", // Adjust root margin
      }
    );

    // Set overview as visible immediately
    setVisibleSections((prev) => ({ ...prev, overview: true }));

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Animate certification steps sequentially
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

  const ndtMethods = [
    {
      method: "Ultrasonic Testing (UT)",
      description:
        "High-frequency sound waves detect internal flaws and measure thickness",
      applications: [
        "Weld Inspection",
        "Corrosion Mapping",
        "Bond Testing",
        "Thickness Measurement",
      ],
      icon: <Waves size={28} />,
      color: primaryColor,
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, #ff4d4d 100%)`,
      standards: ["ASTM E317", "ISO 17640", "ASME Section V"],
      advantages: [
        "Deep penetration",
        "High sensitivity",
        "Digital imaging",
        "Real-time results",
      ],
    },
    {
      method: "Radiographic Testing (RT)",
      description:
        "X-ray/Gamma ray imaging reveals internal defects and structures",
      applications: [
        "Casting Inspection",
        "Aerospace Components",
        "Pipeline Welds",
        "Complex Assemblies",
      ],
      icon: <Radiation size={28} />,
      color: "#ff6b00",
      gradient: "linear-gradient(135deg, #ff6b00 0%, #ff8c42 100%)",
      standards: ["ASTM E94", "ISO 17636", "ASME Section V"],
      advantages: [
        "Permanent record",
        "Volumetric inspection",
        "Film/Digital options",
        "All materials",
      ],
    },
    {
      method: "Positive Material Identification (PMI)",
      description:
        "Verifies material composition and alloy grade using XRF or OES analysis",
      applications: [
        "Alloy Verification",
        "Material Certification",
        "Scrap Sorting",
        "Quality Control",
      ],
      icon: <Atom size={28} />,
      color: "#9C27B0",
      gradient: "linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)",
      standards: ["ASTM E1476", "ISO 9001", "ASME Section II"],
      advantages: [
        "Non-destructive",
        "Quick results",
        "Portable (XRF)",
        "High accuracy",
      ],
    },
    {
      method: "Thickness Measurement (UT/EM)",
      description:
        "Measures material thickness using ultrasonic or electromagnetic methods",
      applications: [
        "Corrosion Monitoring",
        "Tank Inspection",
        "Pipeline Assessment",
        "Pressure Vessels",
      ],
      icon: <Ruler size={28} />,
      color: "#4CAF50",
      gradient: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
      standards: ["ASTM E797", "ISO 16809", "ASME Section V"],
      advantages: ["Non-invasive", "Accurate", "Portable", "Real-time data"],
    },
    {
      method: "Hardness Testing (Non-Destructive)",
      description:
        "Measures material hardness without indentation using ultrasonic or rebound methods",
      applications: [
        "Heat Affected Zones",
        "Large Components",
        "In-service Inspection",
        "Weld Hardness",
      ],
      icon: <Diamond size={28} />,
      color: "#607D8B",
      gradient: "linear-gradient(135deg, #607D8B 0%, #90A4AE 100%)",
      standards: ["ASTM A1038", "ISO 16859", "ASTM E110"],
      advantages: [
        "No surface damage",
        "Portable",
        "Quick results",
        "Large area coverage",
      ],
    },
    {
      method: "Spectroscopy (OES/XRF)",
      description:
        "Analyzes chemical composition of metals using optical emission or X-ray fluorescence",
      applications: [
        "Material Grade Verification",
        "Scrap Identification",
        "Coating Analysis",
        "Contamination Detection",
      ],
      icon: <Sparkles size={28} />,
      color: "#FF9800",
      gradient: "linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)",
      standards: ["ASTM E415", "ISO 17025", "ASTM E1257"],
      advantages: [
        "High accuracy",
        "Multi-element analysis",
        "Fast results",
        "Non-destructive (XRF)",
      ],
    },
    {
      method: "Calibration & Certification",
      description:
        "Ensures measurement accuracy and traceability to international standards",
      applications: [
        "Equipment Certification",
        "Laboratory Accreditation",
        "Quality Systems",
        "Regulatory Compliance",
      ],
      icon: <CheckCircle size={28} />,
      color: "#795548",
      gradient: "linear-gradient(135deg, #795548 0%, #A1887F 100%)",
      standards: ["ISO/IEC 17025", "ASTM E1316", "NADCAP"],
      advantages: [
        "Traceability",
        "Accuracy assurance",
        "Compliance",
        "Risk reduction",
      ],
    },
    {
      method: "Dye Penetrant Testing (PT)",
      description:
        "Liquid penetrant reveals surface-breaking defects with high sensitivity",
      applications: [
        "Non-porous Materials",
        "Surface Cracks",
        "Forgings",
        "Machined Parts",
      ],
      icon: <Droplets size={28} />,
      color: "#0066cc",
      gradient: "linear-gradient(135deg, #0066cc 0%, #3399ff 100%)",
      standards: ["ASTM E165", "ISO 3452", "ASME 2782"],
      advantages: [
        "Portable equipment",
        "High sensitivity",
        "Low cost",
        "Quick results",
      ],
    },
    {
      method: "Magnetic Particle Testing (MPT)",
      description:
        "Magnetic fields detect surface and near-surface flaws in ferromagnetic materials",
      applications: [
        "Ferrous Materials",
        "Automotive Parts",
        "Structural Steel",
        "Railway Components",
      ],
      icon: <Zap size={28} />,
      color: "#009688",
      gradient: "linear-gradient(135deg, #009688 0%, #4db6ac 100%)",
      standards: ["ASTM E709", "ISO 9934", "ASME Section V"],
      advantages: [
        "Immediate results",
        "Surface & subsurface",
        "Easy interpretation",
        "Cost-effective",
      ],
    },
  ];

  const dtMethods = [
    {
      method: "Tensile Testing",
      description: "Measures material strength under tension until failure",
      applications: ["Metal Alloys", "Polymers", "Composites", "Welded Joints"],
      icon: "💪",
      color: "#e74c3c",
      gradient: "linear-gradient(135deg, #e74c3c 0%, #eaa29a 100%)",
      standards: ["ASTM E8", "ISO 6892", "ASTM D638"],
      parameters: [
        "Yield Strength",
        "Ultimate Strength",
        "Elongation",
        "Reduction Area",
      ],
    },
    {
      method: "Hardness Testing (Destructive)",
      description:
        "Measures material resistance to indentation using various scales",
      applications: [
        "Heat Treated Parts",
        "Coatings",
        "Forgings",
        "Tool Steels",
      ],
      icon: "💎",
      color: "#9b59b6",
      gradient: "linear-gradient(135deg, #9b59b6 0%, #c39bd3 100%)",
      standards: ["ASTM E10", "ISO 6506", "ASTM E384"],
      parameters: [
        "Brinell Hardness",
        "Rockwell Hardness",
        "Vickers Hardness",
        "Knoop Hardness",
      ],
    },
    {
      method: "Spectrometry Analysis (OES)",
      description:
        "Analyzes chemical composition using optical emission spectrometry",
      applications: [
        "Alloy Identification",
        "Grade Confirmation",
        "Quality Control",
        "Failure Investigation",
      ],
      icon: "🌈",
      color: "#E67E22",
      gradient: "linear-gradient(135deg, #E67E22 0%, #FAD7A0 100%)",
      standards: ["ASTM E415", "ISO 17025", "ASTM E1257"],
      parameters: [
        "Chemical Composition",
        "Elemental Analysis",
        "Impurity Detection",
        "Alloy Classification",
      ],
    },
  ];

  // ============================================
  // 📋 SPECIFICATIONS — FIXED (added `magnetic`)
  // ============================================
  const specifications = {
    ultrasonic: [
      { property: "Frequency Range", value: "0.5-25 MHz", icon: "📡" },
      { property: "Penetration Depth", value: "Up to 10m", icon: "📏" },
      { property: "Resolution", value: "0.1mm", icon: "🔍" },
      { property: "Scan Speed", value: "1000 mm/s", icon: "⚡" },
      { property: "Temperature Range", value: "-20°C to 500°C", icon: "🌡️" },
      { property: "Certification", value: "ASNT Level III", icon: "🏅" },
      { property: "Data Recording", value: "Full A-Scan", icon: "💾" },
      { property: "Reporting", value: "Digital & PDF", icon: "📊" },
    ],
    magnetic: [
      { property: "Magnetizing Current", value: "AC / DC / HWDC", icon: "🧲" },
      { property: "Field Strength", value: "≥ 2400 A/m", icon: "⚡" },
      { property: "Particle Type", value: "Dry / Wet / Fluorescent", icon: "✨" },
      { property: "Sensitivity Level", value: "Level 3-4", icon: "🎯" },
      { property: "UV Light Intensity", value: "1000 μW/cm²", icon: "🔦" },
      { property: "Temperature Range", value: "10-52°C", icon: "🌡️" },
      { property: "Equipment Type", value: "Yoke / Prod / Bench", icon: "🔧" },
      { property: "Standards", value: "ASTM E709, ISO 9934", icon: "📋" },
    ],
    radiographic: [
      { property: "Source Type", value: "X-ray/Gamma", icon: "☢️" },
      { property: "Energy Range", value: "50-300 kV", icon: "⚡" },
      { property: "Sensitivity", value: "2-1T", icon: "🎯" },
      { property: "Film Types", value: "D7, D4, D2", icon: "🎞️" },
      { property: "Digital DR", value: "Available", icon: "📱" },
      { property: "Safety Class", value: "BSS Category", icon: "🛡️" },
      { property: "Image Quality", value: "EN 462-1", icon: "⭐" },
      { property: "Processing", value: "Auto & Manual", icon: "🔄" },
    ],
    penetrant: [
      { property: "Sensitivity Level", value: "Level 4", icon: "🔬" },
      { property: "Developer Type", value: "Dry/Non-aq/Aq", icon: "💧" },
      { property: "Penetrant Type", value: "Fluorescent/Visible", icon: "🌈" },
      { property: "Removal Method", value: "Water/Solvent", icon: "🚿" },
      { property: "Dwell Time", value: "5-60 min", icon: "⏱️" },
      { property: "Temperature Range", value: "10-52°C", icon: "🌡️" },
      { property: "Light Intensity", value: "1000+ lux", icon: "💡" },
      { property: "UV Light", value: "1000 μW/cm²", icon: "🔦" },
    ],
  };

  const certificationProcess = [
    {
      step: 1,
      title: "Client Consultation",
      description: "Understanding testing requirements and specifications",
      icon: "💬",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, #ff4d4d 100%)`,
      duration: "1-2 Days",
    },
    {
      step: 2,
      title: "Method Selection",
      description:
        "Choosing appropriate NDT/DT methods based on material and defect type",
      icon: "📋",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, #ff4d4d 100%)`,
      duration: "1 Day",
    },
    {
      step: 3,
      title: "On-site Inspection",
      description: "Deploying certified technicians with calibrated equipment",
      icon: "🔍",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, #ff4d4d 100%)`,
      duration: "Variable",
    },
    {
      step: 4,
      title: "Data Analysis",
      description: "Expert analysis of test results using advanced software",
      icon: "📊",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, #ff4d4d 100%)`,
      duration: "2-3 Days",
    },
    {
      step: 5,
      title: "Report Generation",
      description: "Comprehensive report with findings and recommendations",
      icon: "📑",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, #ff4d4d 100%)`,
      duration: "1-2 Days",
    },
    {
      step: 6,
      title: "Certification Issuance",
      description: "Official certification and ongoing support",
      icon: "🏆",
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, #ff4d4d 100%)`,
      duration: "1 Day",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();
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
      { threshold: 0.2, rootMargin: "-50px" }
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat, index) => {
              const duration = 2000;
              const steps = 60;
              const increment = stat.max / steps;
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.max) {
                  current = stat.max;
                  clearInterval(timer);
                }
                setStats((prev) => {
                  const newStats = [...prev];
                  newStats[index] = {
                    ...newStats[index],
                    value: Math.floor(current),
                  };
                  return newStats;
                });
              }, duration / steps);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
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
      { threshold: 0.2, rootMargin: "-50px" }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const industries = [
    {
      id: 2,
      name: "Oil & Gas",
      icon: <Factory size={32} />,
      color: "#e67e22",
      gradient: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
      description:
        "Durable materials for extreme conditions in exploration and processing",
      applications: [
        "Pipeline Systems",
        "Pressure Vessels",
        "Drilling Equipment",
        "Refinery Components",
        "Offshore Platforms",
        "Storage Tanks",
      ],
      features: [
        "Corrosion resistance",
        "High pressure tolerance",
        "Temperature stability",
        "Longevity in harsh environments",
      ],
      materials: [
        "Carbon Steel (API 5L)",
        "Stainless Steel (316/317L)",
        "Duplex/Super Duplex",
        "Inconel 625/825",
        "Titanium Alloys",
        "High-Yield Steels",
      ],
    },
    {
      id: 3,
      name: "Power Generation",
      icon: <Zap size={32} />,
      color: "#f1c40f",
      gradient: "linear-gradient(135deg, #f1c40f 0%, #f39c12 100%)",
      description: "Materials for conventional and renewable energy production",
      applications: [
        "Turbine Components",
        "Nuclear Plant Parts",
        "Solar Panel Frames",
        "Wind Turbine Parts",
        "Boiler Systems",
        "Heat Exchangers",
      ],
      features: [
        "Heat resistance",
        "Structural integrity",
        "Vibration damping",
        "Environmental compatibility",
      ],
      materials: [
        "Superalloys (Inconel 718)",
        "Turbine-grade Steels",
        "Aluminum Alloys",
        "Copper Conductors",
        "Ceramic Coatings",
        "Composites (GFRP)",
      ],
    },
    {
      id: 4,
      name: "Automotive",
      icon: <Car size={32} />,
      color: "#3498db",
      gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
      description:
        "Lightweight and durable components for vehicle manufacturing",
      applications: [
        "Engine Blocks",
        "Transmission Parts",
        "Suspension Components",
        "Brake Systems",
        "Chassis Parts",
        "Electrical Components",
      ],
      features: [
        "Weight optimization",
        "High strength-to-weight ratio",
        "Corrosion protection",
        "Precision manufacturing",
      ],
      materials: [
        "Advanced High-Strength Steel",
        "Aluminum 6061/7075",
        "Magnesium Alloys",
        "Carbon Fiber Composites",
        "Titanium Grade 5",
        "Engineering Plastics",
      ],
    },
    {
      id: 5,
      name: "Marine & Shipbuilding",
      icon: <Ship size={32} />,
      color: "#1abc9c",
      gradient: "linear-gradient(135deg, #1abc9c 0%, #16a085 100%)",
      description: "Corrosion-resistant materials for marine environments",
      applications: [
        "Hull Components",
        "Propeller Systems",
        "Deck Equipment",
        "Navigation Systems",
        "Cargo Handling",
        "Offshore Structures",
      ],
      features: [
        "Saltwater corrosion resistance",
        "High durability",
        "Low maintenance",
        "Impact resistance",
      ],
      materials: [
        "Marine-grade Aluminum (5083)",
        "Stainless Steel 316L",
        "Bronze Alloys",
        "Composite Materials",
        "Zinc Anodes",
        "Special Coatings",
      ],
    },
    {
      id: 6,
      name: "Construction",
      icon: <Building size={32} />,
      color: "#9b59b6",
      gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
      description:
        "Structural materials for building and infrastructure projects",
      applications: [
        "Structural Steel",
        "Reinforcement Bars",
        "Precast Concrete",
        "Bridge Components",
        "Tunnel Linings",
        "Architectural Elements",
      ],
      features: [
        "Load-bearing capacity",
        "Weather resistance",
        "Fire retardancy",
        "Long service life",
      ],
      materials: [
        "Structural Steel (A36, A992)",
        "Rebar (Grade 60)",
        "Concrete Mixes",
        "Weathering Steel",
        "Glass Facades",
        "Fireproof Materials",
      ],
    },
    {
      id: 7,
      name: "Heavy Machinery",
      icon: <Wrench size={32} />,
      color: "#e74c3c",
      gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
      description: "Robust components for industrial machinery and equipment",
      applications: [
        "Mining Equipment",
        "Excavator Parts",
        "Conveyor Systems",
        "Crusher Components",
        "Material Handling",
        "Industrial Gearboxes",
      ],
      features: [
        "High wear resistance",
        "Shock absorption",
        "Heavy load capacity",
        "Minimal deformation",
      ],
      materials: [
        "Hardox Wear Plates",
        "Forged Steel Components",
        "Cast Iron Alloys",
        "Bearing Steels",
        "Hard-facing Alloys",
        "Polyurethane Liners",
      ],
    },
  ];

  const industryServices = [
    {
      title: "Material Selection",
      description: "Expert guidance in choosing the right materials",
      icon: <Layers size={28} />,
      features: [
        "Material testing",
        "Cost optimization",
        "Performance evaluation",
        "Compliance verification",
      ],
    },
    {
      title: "Quality Assurance",
      description:
        "Comprehensive testing and inspection to ensure product reliability",
      icon: <Shield size={28} />,
      features: [
        "NDT testing services",
        "Dimensional inspection",
        "Chemical analysis",
        "Mechanical testing",
      ],
    },
    {
      title: "Custom Solutions",
      description:
        "Tailored products designed to meet unique industry specifications",
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
      description:
        "24/7 expert support for installation, maintenance, and troubleshooting",
      icon: <Users size={28} />,
      features: [
        "On-site assistance",
        "Training programs",
        "Technical documentation",
        "Performance monitoring",
      ],
    },
  ];

  const certifications = [
    "ISO 901:2015",
    "ISO 1401:2015",
    "AS9100D",
    "IATF 16949",
    "NADCAP",
    "ASME Certified",
    "API Q1",
    "DNV GL Approved",
  ];

  const cardsRef = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formRef = useRef(null);

  // Enhanced intersection observer with staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));

            // Add different animation classes based on section type
            if (entry.target.classList.contains("tk-contact-card")) {
              setTimeout(() => {
                entry.target.classList.add("tk-card-pop-in");
              }, entry.target.dataset.index * 200);
            } else {
              entry.target.classList.add("tk-fade-in-up");
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

        // 2 second pachi message hide
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      } else {
        setSuccessMessage("Something went wrong! Try again.");

        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      setSuccessMessage("Error sending message!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }

    setIsSubmitting(false);
  };


  const [is3DHover, setIs3DHover] = useState(false);


  // 🔵 Primary Blue Colors
  const primaryLightest = "#8FB8D9";

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

  // ============================================
  // 🏭 INDUSTRIES DATA (UPDATED WITH BLUE THEME)
  // ============================================
 

  // ============================================
  // 🛠️ INDUSTRY SERVICES
  // ============================================
 

  // ============================================
  // 📊 STATS DATA
  // ============================================
  const statsData = [
    { id: 'projects', label: 'Projects Completed', icon: <Briefcase size={24} />, suffix: '+' },
    { id: 'industries', label: 'Industries Served', icon: <Globe size={24} />, suffix: '+' },
    { id: 'experience', label: 'Years Experience', icon: <Clock size={24} />, suffix: '+' },
    { id: 'satisfaction', label: 'Client Satisfaction', icon: <ThumbsUp size={24} />, suffix: '%' },
  ];

   
  
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
  
      if (heroRef.current) {
        heroRef.current.addEventListener("mousemove", handleMouseMove);
      }
  
      return () => {
        if (heroRef.current) {
          heroRef.current.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }, []);
  
   
    // Enhanced intersection observer with staggered animations
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => ({
                ...prev,
                [entry.target.dataset.section]: true,
              }));
  
              if (entry.target.classList.contains("qc-contact-card")) {
                setTimeout(() => {
                  entry.target.classList.add("qc-card-pop-in");
                }, entry.target.dataset.index * 200);
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
    const handleSubmit2 = async (e) => {
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
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        } else {
          setSuccessMessage("Something went wrong! Try again.");
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        }
      } catch (error) {
        setSuccessMessage("Error sending message!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      }
  
      setIsSubmitting(false);
    };
  
  return (
    <div>
      <div id="home" className="header-container">
        <Header />
      </div>

      <div className="prod-page2" id="services">
        {/* Overview Section */}
        <section
          className="prod-overview-section"
          ref={(el) => addToRefs(el, 1)}
          data-section="overview"
        >
          <div className="prod-container-inner">
            <div className="prod-section-header">
              <div
                className="prod-section-badge"
                style={{ background: primaryColor }}
              >
                Certified Testing
              </div>
              <h2 className="prod-section-title">
                Comprehensive Testing Solutions
              </h2>
              <div className="prod-section-divider">
                <div className="prod-divider-line"></div>
                <div className="prod-divider-dot prod-pulse-dot"></div>
                <div className="prod-divider-line"></div>
              </div>
              <p className="prod-section-description">
                ASNT Level III certified testing services with advanced
                equipment and expert analysis
              </p>
            </div>

            <div className="prod-overview-content">
              <div
                className={`prod-overview-text ${
                  visibleSections.overview ? "prod-animate-fade" : ""
                }`}
              >
                <div className="prod-content-highlight prod-float-animation">
                  <p>
                    We provide complete{" "}
                    <strong style={{ color: "#235781" }}>
                      Non-Destructive Testing (NDT)
                    </strong>{" "}
                    and
                    <strong style={{ color: "#235781" }}>
                      {" "}
                      Destructive Testing (DT)
                    </strong>{" "}
                    services for quality assurance and structural integrity
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
                  <div
                    className="prod-highlight-item prod-slide-animation"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CheckCircle color={primaryColor} size={24} />
                    <span>NADCAP Accredited for Aerospace</span>
                  </div>
                  <div
                    className="prod-highlight-item prod-slide-animation"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CheckCircle color={primaryColor} size={24} />
                    <span>24/7 Emergency Inspection Services</span>
                  </div>
                  <div
                    className="prod-highlight-item prod-slide-animation"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <CheckCircle color={primaryColor} size={24} />
                    <span>Worldwide Testing Capabilities</span>
                  </div>
                </div>
              </div>

              <div
                className={`prod-features-grid ${
                  visibleSections.overview ? "prod-animate-slide-right" : ""
                }`}
              >
                {serviceFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="prod-feature-card prod-hover-float"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onMouseEnter={() => setHoveredCard(`feature-${index}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="prod-feature-card-inner">
                      <div
                        className="prod-feature-card-icon"
                        style={{ background: feature.gradient }}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="prod-feature-card-title">
                        {feature.title}
                      </h3>
                      <p className="prod-feature-card-description">
                        {feature.description}
                      </p>
                      <div className="prod-feature-card-hover"></div>
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
              <div
                className="prod-section-badge"
                style={{ background: primaryColor }}
              >
                <Microscope size={16} />
                Testing Methods
              </div>
              <h2 className="prod-section-title">
                Our Testing{" "}
                <span style={{ color: primaryColor }}>Capabilities</span>
              </h2>
              <div className="prod-section-divider">
                <div
                  className="prod-divider-line"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${primaryColor})`,
                  }}
                ></div>
                <div
                  className="prod-divider-dot prod-pulse-dot"
                  style={{ background: primaryColor }}
                ></div>
                <div
                  className="prod-divider-line"
                  style={{
                    background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
                  }}
                ></div>
              </div>
              <p className="prod-section-description">
                Advanced testing techniques for accurate results and quality
                assurance
              </p>
            </div>

            {/* Industry Tags */}
            <div className="prod-industry-tags">
              {industries.map((industry, idx) => (
                <span
                  key={idx}
                  className="prod-industry-tag-hm"
                  style={{ borderColor: industry.color }}
                >
                  {industry.icon}
                  {industry.name}
                </span>
              ))}
            </div>

            <div className="prod-methods-grid">
              {testingMethods.map((method, index) => (
                <div
                  key={method.id}
                  className={`prod-method-card ${
                    visibleSections.methods ? "prod-animate-fade" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div
                    className="prod-method-card-header"
                    style={{ background: method.gradient }}
                  >
                    <div className="prod-method-card-icon prod-icon-pulse">
                      {method.icon}
                    </div>
                    <h3 className="prod-method-card-title">{method.method}</h3>
                    <div className="prod-method-card-number">
                      #{String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="prod-method-card-short">
                      {method.shortName}
                    </div>
                  </div>

                  <div className="prod-method-card-content">
                    <p className="prod-method-card-description">
                      {method.description}
                    </p>

                    <div className="prod-method-card-section">
                      <h4 className="prod-method-card-subtitle">
                        <Target size={16} />
                        Applications:
                      </h4>
                      <div className="prod-applications-list">
                        {(method.applications || []).map((app, i) => (
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
                        {(method.standards || []).map((std, i) => (
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
                        {(method.advantages || []).map((adv, i) => (
                          <li
                            key={i}
                            className="prod-slide-animation"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          >
                            <div
                              className="prod-advantage-dot prod-pulse-dot"
                              style={{ background: method.color }}
                            ></div>
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
              <div
                className="prod-section-badge"
                style={{ background: primaryColor }}
              >
                <Gauge size={16} />
                Equipment Specs
              </div>
              <h2 className="prod-section-title">
                Technical{" "}
                <span style={{ color: primaryColor }}>Specifications</span>
              </h2>
              <div className="prod-section-divider">
                <div
                  className="prod-divider-line"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${primaryColor})`,
                  }}
                ></div>
                <div
                  className="prod-divider-dot prod-pulse-dot"
                  style={{ background: primaryColor }}
                ></div>
                <div
                  className="prod-divider-line"
                  style={{
                    background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
                  }}
                ></div>
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
                    <div
                      className="prod-specs-tab-underline"
                      style={{ background: primaryColor }}
                    ></div>
                  </button>
                ))}
              </div>

              <div className="tk-prod-specs-tabs-content">
                {activeTab === "ultrasonic" && (
                  <div className="tk-prod-specs-content">
                    <div className="tk-prod-specs-content-header">
                      <h3>Ultrasonic Testing (UT) Specifications</h3>
                      <p>High-precision flaw detectors and thickness gauges</p>
                    </div>
                    <div className="tk-prod-specs-content-grid">
                      {(specifications.ultrasonic || []).map((spec, index) => (
                        <div
                          key={index}
                          className="tk-prod-spec-item tk-prod-hover-grow"
                        >
                          <div className="tk-prod-spec-item-icon tk-prod-pulse-animation">
                            {spec.icon}
                          </div>
                          <div className="tk-prod-spec-item-property2">
                            {spec.property}
                          </div>
                          <span
                            className="tk-prod-spec-item-value"
                            style={{ color: primaryColor }}
                          >
                            {spec.value}
                          </span>
                          <div className="tk-prod-spec-item-glow"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "magnetic" && (
                  <div className="tk-prod-specs-content">
                    <div className="tk-prod-specs-content-header">
                      <h3>Magnetic Particle Testing (MPT) Specifications</h3>
                      <p>High-sensitivity magnetic inspection equipment</p>
                    </div>
                    <div className="tk-prod-specs-content-grid">
                      {(specifications.magnetic || []).map((spec, index) => (
                        <div
                          key={index}
                          className="tk-prod-spec-item tk-prod-hover-grow"
                        >
                          <div className="tk-prod-spec-item-icon tk-prod-pulse-animation">
                            {spec.icon}
                          </div>
                          <div className="tk-prod-spec-item-property2">
                            {spec.property}
                          </div>
                          <span
                            className="tk-prod-spec-item-value"
                            style={{ color: primaryColor }}
                          >
                            {spec.value}
                          </span>
                          <div className="tk-prod-spec-item-glow"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "penetrant" && (
                  <div className="tk-prod-specs-content">
                    <div className="tk-prod-specs-content-header">
                      <h3>Dye Penetrant Testing (DPT) Specifications</h3>
                      <p>Sensitive penetrant systems for surface inspection</p>
                    </div>
                    <div className="tk-prod-specs-content-grid">
                      {(specifications.penetrant || []).map((spec, index) => (
                        <div
                          key={index}
                          className="tk-prod-spec-item tk-prod-hover-grow"
                        >
                          <div className="tk-prod-spec-item-icon tk-prod-pulse-animation">
                            {spec.icon}
                          </div>
                          <div className="tk-prod-spec-item-property2">
                            {spec.property}
                          </div>
                          <span
                            className="tk-prod-spec-item-value"
                            style={{ color: primaryColor }}
                          >
                            {spec.value}
                          </span>
                          <div className="tk-prod-spec-item-glow"></div>
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
              <div
                className="prod-section-badge"
                style={{ background: primaryColor }}
              >
                <Crown size={16} />
                Our Process
              </div>
              <h2 className="prod-section-title">
                Certification <span style={{ color: primaryColor }}>Process</span>
              </h2>
              <div className="prod-section-divider">
                <div
                  className="prod-divider-line"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${primaryColor})`,
                  }}
                ></div>
                <div
                  className="prod-divider-dot prod-pulse-dot"
                  style={{ background: primaryColor }}
                ></div>
                <div
                  className="prod-divider-line"
                  style={{
                    background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
                  }}
                ></div>
              </div>
              <p className="prod-section-description">
                Streamlined process from inspection to certification
              </p>
            </div>

            <div className="prod-process-timeline">
              {(certificationProcess || []).map((process, index) => (
                <div
                  key={index}
                  className={`prod-process-step ${
                    animatedSteps.includes(process.step)
                      ? "prod-animate-fade"
                      : ""
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="prod-process-step-indicator">
                    <div
                      className="prod-process-step-number prod-pulse-animation"
                      style={{background:'#235781' }}
                    >
                      {process.step}
                      <div className="prod-process-step-glow"></div>
                    </div>
                    <div className="prod-process-step-icon">{process.icon}</div>
                  </div>

                  <div className="prod-process-step-content prod-hover-float">
                    <h3 className="prod-process-step-title">{process.title}</h3>
                    <p className="prod-process-step-description">
                      {process.description}
                    </p>
                    <div className="prod-process-step-duration">
                      <span className="prod-duration-icon prod-pulse-animation">
                        ⏱️
                      </span>
                      {process.duration}
                    </div>
                    <div className="prod-process-step-hover"></div>
                  </div>

                  {index < certificationProcess.length - 1 && (
                    <div
                      className="prod-process-step-connector prod-pulse-animation"
                      style={{ background: primaryColor }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>


<div className="industry-page" id="industry">
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
              Industries We Serve
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
              Specialized solutions for diverse industrial sectors with unmatched quality and technical support
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

     
</div>

<div className="contact-page4" id="contact">
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
              <div className="qc-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="qc-divider-dot qc-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="qc-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="qc-section-subtitle">
              We're here to help. Reach out to us through any of these channels
            </p>
          </div>
  
          <div className="qc-contact-card-container">
            {contactData.map((item, index) => (
              <div
                key={index}
                className="qc-contact-card"
                ref={(el) => (cardsRef.current[index] = el)}
                data-index={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="qc-card-glow" style={{ background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${primaryColor}20, transparent 70%)` }}></div>
                <div className="qc-contact-icon qc-icon-pulse">
                  {item.icon}
                  <div className="qc-icon-ring" style={{ borderColor: primaryColor }}></div>
                  {/* <div className="qc-icon-shine"></div> */}
                </div>
                <h2 className="qc-contact-card-title">{item.title}</h2>
                <p className="qc-contact-card-description">{item.description}</p>
                <div className="qc-card-hover-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, ${primaryLight})` }}></div>
                <div className="qc-card-number">0{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
  
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
              <div className="qc-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="qc-divider-dot qc-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="qc-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="qc-form-subheading">
              We'll get back to you within 24 hours
            </p>
          </div>
  
          <div className="qc-form-container qc-form-3d">
            <div className="qc-form-content">
              <div className="qc-form-image-box qc-image-float">
                <img draggable="false" src={contactImage} alt="Contact" />
                <div className="qc-image-glow" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})` }}></div>
                {/* <div className="qc-image-ring"></div> */}
              </div>
  
              <form
                ref={formRef}
                id="qc-contact-form"
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleSubmit2}
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
                    <div className="qc-input-focus-line" style={{ background: primaryColor }}></div>
                  </div>
  
                  <div className="qc-form-field qc-input-float">
                    <input type="email" name="email" placeholder=" " required />
                    <label>Email Address</label>
                    <i className="fas fa-envelope"></i>
                    <div className="qc-input-focus-line" style={{ background: primaryColor }}></div>
                  </div>
  
                  <div className="qc-form-field qc-input-float">
                    <input type="text" name="phone" placeholder=" " />
                    <label>Phone Number</label>
                    <i className="fas fa-phone-alt"></i>
                    <div className="qc-input-focus-line" style={{ background: primaryColor }}></div>
                  </div>
  
                  <div className="qc-form-message qc-input-float">
                    <textarea name="message" placeholder=" " required />
                    <label>Your Message</label>
                    <i className="fas fa-comment-dots"></i>
                    <div className="qc-input-focus-line" style={{ background: primaryColor }}></div>
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
                    className={`qc-btn-magnetic qc-btn-3d ${isSubmitting ? "qc-btn-loading" : ""}`}
                    disabled={isSubmitting}
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})` }}
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
  
          {/* Map Section */}
          <div className="qc-map-section">
            <div className="qc-map-container qc-map-float">
              <div className="qc-map-overlay">
                <div className="qc-map-icon">
                  <SlLocationPin size={48} color="#4A82A8" />
                </div>
                <h3>Visit Our Location</h3>
                <p>Shop no. 6, Somnath Complex, Rajpardi</p>
                <button
                  className="qc-map-btn qc-btn-3d"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})` }}
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/dir//Technoking+Test+Lab+Pvt.+Ltd.,+Shyam+Industrail+Park,+Bakrol+Bujrang,+Gujarat+382430/@22.1484557,70.7700749,5666m/data=!3m2!1e3!4b1!4m8!4m7!1m0!1m5!1m1!1s0x395e6300098d72db:0xe77e8e974e146640!2m2!1d72.7492243!2d22.9878418!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D",
                      "_blank"
                    )
                  }
                >
                  <i className="fas fa-map-marker-alt"></i>
                  View on Google Maps
                  <span className="qc-map-arrow">→</span>
                </button>
              </div>
              <div className="qc-map-glow" style={{ background: `radial-gradient(circle, ${primaryColor}40, transparent 70%)` }}></div>
            </div>
          </div>
        </section>

</div>

    </div>
  );
};

// Book Icon Component
const BookIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export default Home;