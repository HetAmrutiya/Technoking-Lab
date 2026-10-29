import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import "../Product/Product.css";
import "../Contact/Contact.css";
import "../Industry-Serve/Industry.css";
import testingBackground from "../../assets/ut.jpg";
import mineralsBackground from "../../assets/ut.jpg";
import teamBg from "../../assets/ut.jpg";
import {
  Factory,
  ZapIcon,
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
  Gauge,
} from "lucide-react";
import ServiceDetailModal from "../ServiceDetail/ServiceDetailModal";
import { useNavigate } from "react-router-dom";
import ajk from "../../assets/ajk.png";
import amcon from "../../assets/amcon.jpeg";
import balkrishna from "../../assets/balkrishna.jpg";
import bmw from "../../assets/bmw.jpeg";
import captain from "../../assets/captain.jpg";
import delta from "../../assets/delta.jpg";
import gn from "../../assets/gn.jpg";
import ghanshyam from "../../assets/ghanshyam.png";
import gail from "../../assets/gail.png";
import epp from "../../assets/epp.png";
import kanungo from "../../assets/kanungo.png";
import indianoil from "../../assets/indianoil.jpg";
import flowjet from "../../assets/flowjet.png";
import gmvalve from "../../assets/gmvalve.jpg";
import grasim from "../../assets/grasim.png";
import gpcl from "../../assets/gpcl.jpg";
import heben from "../../assets/heben.jpg";
import iceburg from "../../assets/iceburg.jpg";
import jyoti from "../../assets/jyoti.png";
import kanex from "../../assets/kanex.jpg";
import lt from "../../assets/l&t.jpg";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhoneCall } from "react-icons/lu";
import contactImage from "../../assets/contact1.png";

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
   📇 CONTACT CARDS — each card is fully clickable
   ============================================================ */
const contactData = [
  {
    icon: <SlLocationPin style={{ fontSize: 30, color: "#D6BB6E" }} />,
    title: "Our Address",
    description: <AddressBlock />,
    href: MAPS_URL,
    external: true,
    actionLabel: "Open in Google Maps",
  },
  {
    icon: <HiOutlineMail style={{ fontSize: 30, color: "#D6BB6E" }} />,
    title: "Email Us",
    description: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    external: false,
    actionLabel: "Send an Email",
  },
  {
    icon: <LuPhoneCall style={{ fontSize: 30, color: "#D6BB6E" }} />,
    title: "Call Us",
    description: COMPANY.phone,
    href: `tel:${COMPANY.phone.replace(/\s+/g, "")}`,
    external: false,
    actionLabel: "Call Now",
  },
];

const buildDefaultMessage = (typeName) => `Testing Type: ${typeName}`;

/* ============================================================
   🏢 OUR CLIENTS — EDIT ONLY HERE
   ============================================================ */
const clientsData = [
  { id: 1, name: "AJK FORGE PVT LTD", logo: ajk },
  { id: 2, name: "AMCON CASTING PVT LTD", logo: amcon },
  { id: 3, name: "BALKRISHNA STEEL FORGE PRIVATE LIMITED", logo: balkrishna },
  { id: 4, name: "BMW GEARS", logo: bmw },
  { id: 5, name: "CAPTAIN TRACTORS PVT LTD", logo: captain },
  { id: 6, name: "DELTA TECHNOCAST PVT LTD", logo: delta },
  { id: 7, name: "GN ALTECH PRIVATE LIMITED", logo: gn },
  { id: 8, name: "GHANSHYAM VALVES PVT LTD (GVPL)", logo: ghanshyam },
  { id: 9, name: "GAIL INDIA LTD", logo: gail },
  { id: 10, name: "EPP COMPOSITES PVT LTD", logo: epp },
  { id: 11, name: "KANUNGO FERROMET PVT LTD", logo: kanungo },
  { id: 12, name: "INDIAN OIL CORPORATION LIMITED", logo: indianoil },
  { id: 13, name: "FLOWJET VALVES PVT LTD", logo: flowjet },
  { id: 14, name: "G M VALVE PVT LTD", logo: gmvalve },
  { id: 15, name: "GRASIM INDUSTRIES LTD", logo: grasim },
  { id: 16, name: "GUJARAT PRECISION CAST PVT LTD", logo: gpcl },
  { id: 17, name: "HEBEN CRAIN PVT LTD", logo: heben },
  { id: 18, name: "ICEBURG TECHNOCAST PVT LTD", logo: iceburg },
  { id: 19, name: "JYOTI CNC AUTOMATION LTD", logo: jyoti },
  { id: 20, name: "KANEX FIRE SOLUTIONS LTD", logo: kanex },
  { id: 21, name: "L&T VALVES LIMITED", logo: lt },
];

/* ============================================================
   🔬 NDT & DT TESTING TYPES — used in the home contact form
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
   🔢 STAT COUNTER CONFIG — EDIT NUMBERS HERE
   ============================================================ */
const COUNTER_CONFIG = {
  projects: { target: 5000, duration: 2000 },
  industries: { target: 1200, duration: 2000 },
  experience: { target: 15, duration: 2000 },
  satisfaction: { target: 99, duration: 2000 },
};

const Home = () => {
  const [activeTab, setActiveTab] = useState("ndt");
  const [visibleSections, setVisibleSections] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedSteps, setAnimatedSteps] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [counters, setCounters] = useState({});
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [is3DHover, setIs3DHover] = useState(false);

  const [activeTestingType, setActiveTestingType] = useState(0);
  const [selectedService, setSelectedService] = useState("");

  const [messageText, setMessageText] = useState(
    buildDefaultMessage(testingTypes[0].name)
  );

  const sectionRefs = useRef([]);
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const cardsRef = useRef([]);
  const formRef = useRef(null);

  const primaryColor = "#235781";
  const primaryDark = "#16405F";
  const primaryLight = "#4A82A8";
  const primaryLighter = "#6BA0C9";
  const secondaryColor = "#0a0a0a";
  const accentColor = "#f0f0f0";
  const primaryLightest = "#8FB8D9";

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
      title: "NABL Accredited",
      description: "NABL accredited for UT, MT and PT testing",
      color: "#8e44ad",
      gradient: "linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)",
    },
  ];

  // ============================================
  // 🔬 TESTING SERVICE GROUPS — NDT & DT
  // (synced with Product.jsx — unique IDs 1-12 for NDT, 13-20 for DT)
  // ============================================
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
          id: 2,
          method: "Time of Flight Diffraction",
          shortName: "TOFD",
          description:
            "Advanced ultrasonic technique that uses diffracted signals to detect, locate, and size internal weld defects accurately.",
          icon: <Waves size={28} />,
          color: "#00838F",
          gradient: "linear-gradient(135deg, #00838F 0%, #4DD0E1 100%)",
          applications: [
            "Weld Inspection",
            "Crack Detection",
            "Defect Sizing",
            "Pressure Vessels",
            "Pipeline Inspection",
          ],
          standards: ["ASME Section V", "ISO 10863", "ASTM E2373", "EN ISO 15626"],
          advantages: [
            "Accurate defect sizing",
            "High inspection coverage",
            "Permanent digital records",
            "Fast weld inspection",
            "Reliable crack detection",
          ],
          image: "📐",
        },
        {
          id: 3,
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
          id: 4,
          method: "Digital Radiography",
          shortName: "DR",
          description:
            "Digital radiographic inspection using electronic detectors to produce images for evaluating internal discontinuities in components and welds.",
          icon: <Scan size={28} />,
          color: "#6A1B9A",
          gradient: "linear-gradient(135deg, #6A1B9A 0%, #AB47BC 100%)",
          applications: [
            "Weld Inspection",
            "Casting Inspection",
            "Pipeline Inspection",
            "Porosity Detection",
            "Pressure Vessel Inspection",
          ],
          standards: ["ASME Section V", "ISO 17636-2", "ASTM E2698", "ASTM E2737"],
          advantages: [
            "Real-time image acquisition",
            "Fast inspection workflow",
            "Digital image enhancement",
            "Easy image storage",
            "Efficient defect evaluation",
          ],
          image: "📷",
        },
        {
          id: 5,
          method: "Computed Radiography",
          shortName: "CR",
          description:
            "Digital radiographic technique that uses reusable imaging plates to capture and evaluate internal defects in materials and welds.",
          icon: <Scan size={28} />,
          color: "#1565C0",
          gradient: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
          applications: [
            "Weld Inspection",
            "Casting Inspection",
            "Pipeline Radiography",
            "Porosity Detection",
            "Internal Defect Evaluation",
          ],
          standards: ["ASME Section V", "ISO 17636-2", "ASTM E2446", "ASTM E2033"],
          advantages: [
            "Reusable imaging plates",
            "Digital image processing",
            "Reduced chemical waste",
            "Permanent image storage",
            "Efficient image review",
          ],
          image: "🩻",
        },
        {
          id: 6,
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
          id: 7,
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
          id: 8,
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
          id: 9,
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
          description:
            "Measures material strength, ductility, and elasticity by pulling a specimen until failure.",
          icon: <TrendingUp size={28} />,
          color: "#009688",
          gradient: "linear-gradient(135deg, #009688 0%, #4db6ac 100%)",
          applications: [
            "Weld Qualification",
            "Material Certification",
            "Quality Control",
            "Research & Development",
            "Failure Analysis",
          ],
          standards: ["ASTM E8", "ISO 6892", "ASME Section IX", "ASTM A370"],
          advantages: [
            "Accurate strength data",
            "Ductility measurement",
            "Standard-compliant",
            "Wide material range",
            "Detailed stress-strain curves",
          ],
          image: "📈",
        },
        {
          id: 14,
          method: "Compression Testing",
          shortName: "Compression",
          description:
            "Determines compressive strength, yield behavior, and deformation characteristics of materials.",
          icon: <Layers size={28} />,
          color: "#2196f3",
          gradient: "linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)",
          applications: [
            "Concrete Testing",
            "Composite Materials",
            "Foam & Polymers",
            "Ceramics",
            "Structural Components",
          ],
          standards: ["ASTM E9", "ISO 604", "ASTM D695", "ASTM C39"],
          advantages: [
            "Accurate load data",
            "Deformation analysis",
            "Material behavior insight",
            "Standard procedures",
            "Detailed reporting",
          ],
          image: "🔽",
        },
        {
          id: 15,
          method: "Bend Testing",
          shortName: "Bend",
          description:
            "Evaluates ductility and soundness of welds and materials by bending to a specified angle.",
          icon: <GitBranch size={28} />,
          color: "#7B1FA2",
          gradient: "linear-gradient(135deg, #7B1FA2 0%, #AB47BC 100%)",
          applications: [
            "Weld Qualification",
            "Plate & Sheet Testing",
            "Pipe Testing",
            "Structural Steel",
            "Quality Assurance",
          ],
          standards: ["ASTM E190", "ISO 7438", "ASME Section IX", "AWS D1.1"],
          advantages: [
            "Weld ductility check",
            "Simple procedure",
            "Quick results",
            "Standard-compliant",
            "Cost-effective",
          ],
          image: "↩️",
        },
        {
          id: 16,
          method: "Re-bend Testing",
          shortName: "Re-bend",
          description:
            "Bends a specimen in the opposite direction after initial bend to reveal internal defects.",
          icon: <GitBranch size={28} />,
          color: "#E65100",
          gradient: "linear-gradient(135deg, #E65100 0%, #FF9800 100%)",
          applications: [
            "Weld Qualification",
            "Rebar Testing",
            "Wire Testing",
            "Sheet Metal",
            "Quality Control",
          ],
          standards: ["ASTM E190", "ISO 7438", "BS 4449", "ASTM A615"],
          advantages: [
            "Detects internal flaws",
            "More severe than bend test",
            "Standard procedure",
            "Quick results",
            "Simple interpretation",
          ],
          image: "🔄",
        },
        {
          id: 17,
          method: "Impact Testing",
          shortName: "Impact",
          description:
            "Measures material toughness and resistance to sudden loading using Charpy or Izod methods.",
          icon: <ZapIcon size={28} />,
          color: "#FF6F00",
          gradient: "linear-gradient(135deg, #FF6F00 0%, #FFA726 100%)",
          applications: [
            "Weld Qualification",
            "Pressure Vessels",
            "Piping Systems",
            "Structural Steel",
            "Low-Temperature Service",
          ],
          standards: ["ASTM E23", "ISO 148", "ASME Section VIII", "ASTM A370"],
          advantages: [
            "Toughness measurement",
            "Transition temperature data",
            "Standard-compliant",
            "Wide temperature range",
            "Detailed energy data",
          ],
          image: "💥",
        },
        {
          id: 18,
          method: "Hardness Testing",
          shortName: "BenchHardness",
          description:
            "Measures material hardness using Brinell, Rockwell, Vickers, or Leeb methods.",
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
          standards: ["ASTM E10", "ASTM E18", "ASTM E92", "ISO 6506"],
          advantages: [
            "Multiple scales",
            "Portable options",
            "Quick results",
            "Minimal surface damage",
            "Wide material range",
          ],
          image: "💎",
        },
        {
          id: 19,
          method: "Mechanical Testing",
          shortName: "Mechanical",
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
        {
          id: 20,
          method: "Metallurgical Testing",
          shortName: "Metallurgical",
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
    { step: 1, title: "Client Consultation", description: "Understanding testing requirements and specifications for accurate results", icon: "💬", gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`, duration: "1-2 Days" },
    { step: 2, title: "Method Selection", description: "Choosing appropriate testing methods based on material and defect type", icon: "📋", gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`, duration: "1 Day" },
    { step: 3, title: "On-site Inspection", description: "Deploying certified technicians with calibrated equipment for precise testing", icon: "🔍", gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`, duration: "Variable" },
    { step: 4, title: "Data Analysis", description: "Expert analysis of test results using advanced software and AI tools", icon: "📊", gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`, duration: "2-3 Days" },
    { step: 5, title: "Report Generation", description: "Comprehensive report with findings, analysis, and actionable recommendations", icon: "📑", gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`, duration: "1-2 Days" },
    { step: 6, title: "Certification Issuance", description: "Official certification, quality stamp, and ongoing technical support", icon: "🏆", gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`, duration: "1 Day" },
  ];

  const industries = [
    {
      id: 1,
      name: "NDT Services",
      icon: <Activity size={20} />,
      color: primaryColor,
      gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryLight} 100%)`,
      description:
        "Non-Destructive Testing services for flaw detection and material integrity without damaging the component",
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
      description:
        "Destructive Testing services to evaluate mechanical properties and material performance under stress",
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
      description:
        "Comprehensive material characterization and analysis for quality assurance and R&D",
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
      description:
        "Integrated NDT and DT solutions for complete material and component qualification",
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
      description:
        "Advanced non-destructive techniques for critical and complex applications",
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
      description:
        "Destructive mechanical testing to determine material strength and performance characteristics",
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

  const specTabs = [
    { id: "ultrasonic", label: "UT", icon: "📡" },
    { id: "magnetic", label: "MPT", icon: "🧲" },
    { id: "penetrant", label: "DPT", icon: "🔬" },
  ];

  const industryServices = [
    {
      title: "Material Selection",
      description: "Expert guidance in choosing the right materials",
      icon: <Layers size={28} />,
      features: ["Material testing", "Cost optimization", "Performance evaluation", "Compliance verification"],
    },
    {
      title: "Quality Assurance",
      description: "Comprehensive testing and inspection to ensure product reliability",
      icon: <Shield size={28} />,
      features: ["NDT & DT testing services", "Dimensional inspection", "Chemical analysis", "Mechanical testing"],
    },
    {
      title: "Custom Solutions",
      description: "Tailored products designed to meet unique industry specifications",
      icon: <Cog size={28} />,
      features: ["Custom alloy development", "Specialized coatings", "Unique geometries", "Prototype development"],
    },
    {
      title: "Technical Support",
      description: "24/7 expert support for installation, maintenance, and troubleshooting",
      icon: <Users size={28} />,
      features: ["On-site assistance", "Training programs", "Technical documentation", "Performance monitoring"],
    },
  ];

  const certifications = [
    "ISO 901:2015",
    "ISO 1401:2015",
    "AS9100D",
    "IATF 16949",
    "NABL (UT, MT, PT)",
    "ASME Certified",
    "API Q1",
    "DNV GL Approved",
  ];

  const statsData = [
    { id: "projects", label: "Projects Completed", icon: <Briefcase size={24} />, suffix: "+" },
    { id: "industries", label: "Industries Served", icon: <Globe size={24} />, suffix: "+" },
    { id: "experience", label: "Years Experience", icon: <Clock size={24} />, suffix: "+" },
    { id: "satisfaction", label: "Client Satisfaction", icon: <ThumbsUp size={24} />, suffix: "%" },
  ];

  const allTestingMethods = testingGroups.flatMap((group) => group.methods);
  const currentTestingType = testingTypes[activeTestingType];

  useEffect(() => {
    setMessageText(buildDefaultMessage(testingTypes[activeTestingType].name));
  }, [activeTestingType]);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    let timers = [];

    const startCounters = () => {
      Object.entries(COUNTER_CONFIG).forEach(([id, { target, duration }]) => {
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters((prev) => ({ ...prev, [id]: Math.floor(current) }));
        }, duration / steps);
        timers.push(timer);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      timers.forEach((t) => clearInterval(t));
      timers = [];
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const stepTimer = setTimeout(() => setAnimatedSteps([1]), 1000);
    const stepInterval = setInterval(() => {
      setAnimatedSteps((prev) => (prev.length < 6 ? [...prev, prev.length + 1] : prev));
    }, 300);
    return () => {
      clearTimeout(stepTimer);
      clearInterval(stepInterval);
    };
  }, []);

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
          const key = entry.target.dataset.section;
          if (entry.isIntersecting && key) {
            setVisibleSections((prev) => ({ ...prev, [key]: true }));
          }
        });
      },
      { threshold: 0.15, rootMargin: "-30px" }
    );

    if (heroRef.current) heroRef.current.addEventListener("mousemove", handleMouseMove);
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
      if (heroRef.current) heroRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.section;
            if (key) setVisibleSections((prev) => ({ ...prev, [key]: true }));

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
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
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

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleRequestService = (method) => {
    setSelectedMethod(method);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMethod(null), 300);
  };

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  const handleSubmit2 = async (e) => {
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
        setTimeout(() => setSuccessMessage(""), 2000);
      } else {
        setSuccessMessage("Something went wrong! Try again.");
        setTimeout(() => setSuccessMessage(""), 2000);
      }
    } catch (error) {
      setSuccessMessage("Error sending message!");
      setTimeout(() => setSuccessMessage(""), 2000);
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <div id="home" className="header-container">
        <Header />
      </div>

      <div className="prod-page2" id="services">
        <section className="prod-overview-section" ref={addToRefs} data-section="prodOverview">
          <div className="prod-container-inner">
            <div className="prod-section-header">
              <div className="prod-section-badge" style={{ background: primaryColor }}>
                <Shield size={16} />
                Our Services
              </div>
              <h2 className="prod-section-title">
                Comprehensive <span style={{ color: primaryColor }}>Testing Solutions</span>
              </h2>
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
              <div className={`prod-overview-text ${visibleSections.prodOverview ? "prod-animate-fade" : ""}`}>
                <div className="prod-content-highlight prod-float-animation">
                  <div className="prod-highlight-icon">
                    <Star size={24} style={{ color: primaryColor }} />
                  </div>
                  <p>
                    We provide complete{" "}
                    <strong className="prod-highlight-text" style={{ color: primaryColor }}>
                      NDT &amp; DT Testing
                    </strong>{" "}
                    services for quality assurance and structural integrity evaluation. Our certified technicians use state-of-the-art equipment to detect flaws, measure material properties, and ensure compliance with international standards.
                  </p>
                </div>

                <div className="prod-service-highlights">
                  <div className="prod-highlight-item prod-slide-animation">
                    <CheckCircle color={primaryColor} size={24} />
                    <span>ISO 9712 &amp; ASNT SNT-TC-1A Certified</span>
                  </div>
                  <div className="prod-highlight-item prod-slide-animation" style={{ animationDelay: "0.1s" }}>
                    <CheckCircle color={primaryColor} size={24} />
                    <span>NABL Accredited for Aerospace</span>
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

              <div className={`prod-features-grid ${visibleSections.prodOverview ? "prod-animate-slide-right" : ""}`}>
                {serviceFeatures.map((feature, index) => (
                  <div key={index} className="prod-feature-card prod-hover-float prod-card-glow" style={{ animationDelay: `${index * 0.1}s` }}>
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

        <section className="prod-methods-section" ref={addToRefs} data-section="methods">
          <div className="prod-container-inner">
            <div className="prod-section-header">
              <div className="prod-section-badge" style={{ background: primaryColor }}>
                <Microscope size={16} />
                Testing Services
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
                Advanced NDT and DT testing techniques for accurate results and quality assurance
              </p>
            </div>

            <div className="prod-industry-tags">
              {industries.map((industry, idx) => (
                <span key={idx} className="prod-industry-tag" style={{ borderColor: industry.color }}>
                  {industry.icon}
                  {industry.name}
                </span>
              ))}
            </div>

            <div className="prod-testing-group-tabs">
              {testingGroups.map((group) => (
                <button
                  key={group.id}
                  className={`prod-group-tab ${activeTab === group.id ? "prod-group-tab-active" : ""}`}
                  onClick={() => setActiveTab(group.id)}
                  style={
                    activeTab === group.id
                      ? {
                          borderColor: group.color,
                          background: `${group.color}12`,
                          color: group.color,
                          boxShadow: `0 8px 25px ${group.color}30`,
                        }
                      : {}
                  }
                >
                  <span className="prod-group-tab-icon">{group.icon}</span>
                  <span className="prod-group-tab-text">
                    <strong>{group.name}</strong>
                    <small>{group.fullName}</small>
                  </span>
                </button>
              ))}
            </div>

            {testingGroups
              .filter((g) => g.id === activeTab)
              .map((group) => (
                <div key={group.id} className="prod-active-group-info">
                  <p className="prod-active-group-desc">{group.description}</p>
                  <div className="prod-active-group-meta">
                    <span
                      className="prod-group-count"
                      style={{
                        background: `${group.color}15`,
                        color: group.color,
                        borderColor: `${group.color}30`,
                      }}
                    >
                      {group.methods.length} Testing Methods
                    </span>
                  </div>
                </div>
              ))}

            <div className="prod-methods-grid" key={activeTab}>
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
                              <span key={i} className="prod-standard-badge prod-pop-animation" style={{ animationDelay: `${i * 0.1}s` }}>
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
                              <li key={i} className="prod-slide-animation" style={{ animationDelay: `${i * 0.1}s` }}>
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
                            onClick={() => handleRequestService(method)}
                          >
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

        <section className="prod-certification-section" ref={addToRefs} data-section="process">
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
              <p className="prod-section-description">Streamlined process from inspection to certification</p>
            </div>

            <div className="prod-process-timeline">
              {certificationProcess.map((process, index) => (
                <div
                  key={index}
                  className={`prod-process-step ${animatedSteps.includes(process.step) ? "prod-animate-fade" : ""}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
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
                    <div className="prod-process-step-hover"></div>
                  </div>

                  {index < certificationProcess.length - 1 && (
                    <div className="prod-process-step-connector prod-pulse-animation" style={{ background: primaryColor }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          method={selectedMethod}
          allMethods={allTestingMethods}
          onSelectMethod={handleSelectMethod}
        />
      </div>

      <div className="industry-page" id="industry">
        <section className="tk-stats-section" ref={statsRef} data-section="stats">
          <div className="tk-container">
            <div className="tk-stats-grid">
              {statsData.map((stat, index) => (
                <div key={stat.id} className="tk-stat-card tk-stat-3d" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="tk-stat-icon" style={{ color: primaryColor }}>{stat.icon}</div>
                  <span className="tk-stat-number" style={{ color: primaryColor }}>
                    {counters[stat.id] || 0}
                    {stat.suffix}
                  </span>
                  <span className="tk-stat-label">{stat.label}</span>
                  <div className="tk-stat-glow" style={{ background: primaryColor }}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tk-industries-overview" ref={addToRefs} data-section="industriesOverview">
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

            <div className="tk-industries-nav tk-nav-3d">
              {industries.map((industry, index) => (
                <button
                  key={industry.id}
                  className={`tk-industry-tab ${activeIndustry === index ? "tk-active" : ""} tk-tab-3d`}
                  onClick={() => setActiveIndustry(index)}
                  style={activeIndustry === index ? { borderColor: industry.color, boxShadow: `0 8px 30px ${industry.color}40` } : {}}
                >
                  <div className="tk-tab-icon" style={{ color: industry.color }}>{industry.icon}</div>
                  <span className="tk-tab-name">{industry.name}</span>
                  {activeIndustry === index && (
                    <div className="tk-tab-active-indicator" style={{ background: industry.color }}></div>
                  )}
                </button>
              ))}
            </div>

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
                      <p className="tk-industry-description">{industries[activeIndustry].description}</p>
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

        <section className="tk-industry-services" ref={addToRefs} data-section="services">
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
                      style={{ borderColor: primaryColor, color: primaryColor }}
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
        <section className="qc-contact-form-section" id="contact-form" ref={addToRefs} data-section="contactForm">
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
              <div className="qc-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="qc-divider-dot qc-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="qc-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
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
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})` }}
                ></div>
              </div>

              <form
                ref={formRef}
                id="qc-contact-form"
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleSubmit2}
                className="qc-form-slide-in"
              >
                <input type="hidden" name="access_key" value="5162d798-f96f-4824-a967-12cdaad116e8" />

                <div className="qc-testing-type-selector">
                  {testingTypes.map((type, index) => (
                    <button
                      key={type.id}
                      type="button"
                      className={`qc-testing-tab ${activeTestingType === index ? "qc-testing-tab-active" : ""}`}
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
                    <textarea
                      name="message"
                      placeholder=" "
                      required
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <label>Your Message</label>
                    <i className="fas fa-comment-dots"></i>
                    <div className="qc-input-focus-line" style={{ background: primaryColor }}></div>
                  </div>
                </div>

                <input type="checkbox" name="botcheck" className="qc-hidden" style={{ display: "none" }} />

                <div className="qc-button-area">
                  <button
                    type="submit"
                    className={`qc-btn-magnetic qc-btn-3d ${isSubmitting ? "qc-btn-loading" : ""}`}
                    disabled={isSubmitting}
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})` }}
                  >
                    <span className="qc-btn-text">{isSubmitting ? "Sending..." : "Send Enquiry"}</span>
                    <span className="qc-btn-icon"><i className="fa fa-paper-plane"></i></span>
                    <span className="qc-btn-glow"></span>
                    <span className="qc-btn-ripple"></span>
                  </button>
                </div>

                {successMessage && <div className="qc-success-alert">{successMessage}</div>}
              </form>
            </div>
          </div>
        </section>

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
              We&apos;re here to help. Reach out to us through any of these channels — just tap a card
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
                  <div className="qc-icon-ring" style={{ borderColor: primaryColor }}></div>
                </div>
                <h2 className="qc-contact-card-title">{item.title}</h2>
                <p className="qc-contact-card-description">{item.description}</p>
                <span className="qc-contact-card-cta">
                  {item.actionLabel} <span className="qc-cta-arrow">→</span>
                </span>
                <div
                  className="qc-card-hover-line"
                  style={{ background: `linear-gradient(90deg, ${primaryColor}, ${primaryLight})` }}
                ></div>
                <div className="qc-card-number">0{index + 1}</div>
              </a>
            ))}
          </div>
        </div>

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
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})` }}
                onClick={() => window.open(MAPS_URL, "_blank")}
              >
                <i className="fas fa-map-marker-alt"></i>
                View on Google Maps
                <span className="qc-map-arrow">→</span>
              </button>
            </div>
            <div
              className="qc-map-glow"
              style={{ background: `radial-gradient(circle, ${primaryColor}40, transparent 70%)` }}
            ></div>
          </div>
        </div>
      </div>

      <section className="tk-clients-section" id="clients">
        <div className="tk-container">
          <div className="tk-section-header">
            <div className="tk-section-badge" style={{ background: primaryColor }}>
              <Users size={16} />
              Our Clients
            </div>
            <h2 className="tk-section-title-iws">
              Trusted by <span style={{ color: primaryColor }}>Industry Leaders</span>
            </h2>
            <div className="tk-section-divider">
              <div className="tk-divider-line" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}></div>
              <div className="tk-divider-dot tk-pulse-dot" style={{ background: primaryColor }}></div>
              <div className="tk-divider-line" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}></div>
            </div>
            <p className="tk-section-subtitle">
              We proudly serve leading companies across diverse industries
            </p>
          </div>

          <div className="tk-clients-marquee">
            <div className="tk-clients-track">
              {clientsData.map((client) => (
                <div key={`client-a-${client.id}`} className="tk-client-logo-card" title={client.name}>
                  <img src={client.logo} alt={client.name} draggable="false" loading="lazy" />
                  <span className="tk-client-name">{client.name}</span>
                </div>
              ))}
              {clientsData.map((client) => (
                <div key={`client-b-${client.id}`} className="tk-client-logo-card" title={client.name} aria-hidden="true">
                  <img src={client.logo} alt={client.name} draggable="false" loading="lazy" />
                  <span className="tk-client-name">{client.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export default Home;