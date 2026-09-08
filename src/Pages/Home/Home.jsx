import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
// Product.jsx
import "../Product/Product.css";
import testingBackground from "../../assets/ut.jpg";
import mineralsBackground from "../../assets/ut.jpg";
import teamBg from "../../assets/ut.jpg";
import {
  Radiation,
  Waves,
  Droplets,
  Zap,
  Ruler,
  Diamond,
  Sparkles,
  CircleDot,
  Shield,
  CheckCircle,
  Award,
  Clock,
  Users,
  Building,
  Factory,
  Atom,
  Car,
  Ship,
  Plane,
  HardHat,
  Target,
  Wrench,
  Cog,
  Layers,
  Box,
  Briefcase,
  ChevronRight,
  Package,
  Truck,
  Hammer,
  BarChart,
  Globe,
  Cpu,
  Battery,
  Wind,
  Sun,
  Droplet,
  Flame,
  Linkedin,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  Heart,
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
  Rocket,
  Lightbulb,
  Users2,
  Target as TargetIcon,
  BarChart3,
  Globe2,
  Puzzle,
  GitPullRequest,
  Eye,
  BrainCircuit,
  Crown,
  Trophy,
  Medal,
  Flag,
  Gem,
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
        Nr. Gol Trio Mavdi Kankot, Mavdi, Rajkot, Rajkot- 360004, Gujarat.
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

  const primaryColor = "#235781";
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
                    <strong style={{color:'#235781'}}>
                      Non-Destructive Testing (NDT)
                    </strong>{" "}
                    and
                    <strong style={{color:'#235781'}}>
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

                {/* <div className="prod-certifications-section">
                      <h3 className="prod-certifications-title">
                        Our Certifications
                      </h3>
                      <div className="prod-certification-badges">
                        <span className="prod-certification-badge prod-pop-animation">
                          ISO 9001:2015
                        </span>
                        <span
                          className="prod-certification-badge prod-pop-animation"
                          style={{ animationDelay: "0.1s" }}
                        >
                          ISO 14001:2015
                        </span>
                        <span
                          className="prod-certification-badge prod-pop-animation"
                          style={{ animationDelay: "0.2s" }}
                        >
                          ASNT Level III
                        </span>
                        <span
                          className="prod-certification-badge prod-pop-animation"
                          style={{ animationDelay: "0.3s" }}
                        >
                          NADCAP
                        </span>
                        <span
                          className="prod-certification-badge prod-pop-animation"
                          style={{ animationDelay: "0.4s" }}
                        >
                          AWS Certified
                        </span>
                        <span
                          className="prod-certification-badge prod-pop-animation"
                          style={{ animationDelay: "0.5s" }}
                        >
                          ASME Certified
                        </span>
                      </div>
                    </div> */}
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
