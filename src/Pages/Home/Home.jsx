import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../../Components/Header/Header";
import ServiceDetailModal from "../ServiceDetail/ServiceDetailModal";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Atom,
  Award,
  BarChart3,
  BookOpen,
  Box,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cog,
  Compass,
  Cpu,
  Diamond,
  Droplets,
  ExternalLink,
  GitBranch,
  Layers,
  Loader2,
  Magnet,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Microscope,
  Phone,
  Rocket,
  Ruler,
  Scan,
  Send,
  Shield,
  Sparkles,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Waves,
  Wrench,
  Zap,
} from "lucide-react";

import contactImage from "../../assets/contact1.png";
import qixp from "../../assets/qixp.png";
import eng from "../../assets/eng.png";
import ent from "../../assets/ent.png";
import ndt from "../../assets/ndt.png";
import testlab from "../../assets/logo.png";
import weldcast from "../../assets/weldcast.png";
import cns from "../../assets/cns.png";
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

/* ============================================================
   🎨 THEME (one blue palette — same as the other pages)
   ============================================================ */
const PRIMARY = "#235781";
const PRIMARY_DARK = "#16405F";
const PRIMARY_LIGHT = "#4A82A8";
const PRIMARY_GRADIENT = `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_LIGHT} 100%)`;

/* ============================================================
   📍 COMPANY / LOCATION DETAILS — EDIT ONLY HERE
   ============================================================ */
const COMPANY = {
  name: "Technoking Testlab Pvt. Ltd.",
  addressLines: ["Plot No. 2, Shyam Industrial Area,", "Bakrol Bujrang, Ahmedabad, Gujarat 382430"],
  email: "info@technokingtestlab.com",
  phone: "+91 95124 00501",
};

const MAP_QUERY =
  "Technoking Testlab Pvt. Ltd., Plot No. 2, Shyam Industrial Area, Bakrol Bujrang, Ahmedabad, Gujarat 382430";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`;

/* Same Web3Forms key as the Contact page */
const WEB3FORMS_KEY = "5162d798-f96f-4824-a967-12cdaad116e8";

const AddressBlock = () => (
  <>
    {COMPANY.addressLines.map((line, index) => (
      <React.Fragment key={line}>
        {line}
        {index < COMPANY.addressLines.length - 1 && <br />}
      </React.Fragment>
    ))}
  </>
);

/* ============================================================
   📇 CONTACT CARDS — each card is fully clickable
   ============================================================ */
const CONTACT_CARDS = [
  {
    Icon: MapPin,
    title: "Our Address",
    description: <AddressBlock />,
    href: MAPS_URL,
    external: true,
    actionLabel: "Open in Google Maps",
  },
  {
    Icon: Mail,
    title: "Email Us",
    description: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    external: false,
    actionLabel: "Send an Email",
  },
  {
    Icon: Phone,
    title: "Call Us",
    description: COMPANY.phone,
    href: `tel:${COMPANY.phone.replace(/\s+/g, "")}`,
    external: false,
    actionLabel: "Call Now",
  },
];

/* ============================================================
   ⭐ OVERVIEW — EDIT ONLY HERE
   ============================================================ */
const SERVICE_HIGHLIGHTS = [
  "ISO 9712 & ASNT SNT-TC-1A Certified",
  "NABL Accredited for Aerospace",
  "24/7 Emergency Inspection Services",
  "Worldwide Testing Capabilities",
];

const SERVICE_FEATURES = [
  { Icon: Shield, title: "Quality Assurance", description: "Certified testing ensuring structural integrity and safety compliance" },
  { Icon: Clock, title: "24/7 Emergency Service", description: "Round-the-clock testing for critical infrastructure emergencies" },
  { Icon: Users, title: "ASNT Certified", description: "Level III certified inspectors with 15+ years experience" },
  { Icon: Award, title: "NABL Accredited", description: "NABL accredited for UT, MT and PT testing" },
];

/* ============================================================
   🔬 TESTING GROUPS — same data as Product.jsx
   (method objects are passed unchanged to ServiceDetailModal)
   ============================================================ */
const TESTING_GROUPS = [
  {
    id: "ndt",
    name: "NDT Testing",
    fullName: "Non-Destructive Testing",
    icon: <Activity size={28} />,
    color: PRIMARY,
    gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
        applications: ["Alloy Grade Verification", "PMI on Piping & Valves", "Material Certification", "Weld Consumable Verification", "Scrap Sorting"],
        standards: ["ASTM E415", "ASTM E1086", "ASTM E1257", "API 578"],
        advantages: ["Field-portable", "Carbon & light element analysis", "Fast alloy identification", "High accuracy for metals", "Complements XRF (adds C, Si, Al)"],
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
        applications: ["Heat Affected Zones", "Large Components", "In-service Inspection", "Weld Hardness", "Coating Hardness"],
        standards: ["ASTM A1038", "ISO 16859", "ASTM E110", "ASTM E956"],
        advantages: ["Minimal surface damage", "Portable", "Quick results", "Multiple scales", "Field deployable"],
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
        applications: ["Corrosion Monitoring", "Tank Inspection", "Pipeline Assessment", "Pressure Vessels", "Ship Hulls"],
        standards: ["ASTM E797", "ISO 16809", "ASME Section V", "API 570"],
        advantages: ["Non-invasive (one side)", "Accuracy ±0.01 mm", "Portable", "Real-time readout", "Data logging"],
        image: "📏",
      },
    ],
  },
  {
    id: "dt",
    name: "DT Testing",
    fullName: "Destructive Testing",
    icon: <BarChart3 size={28} />,
    color: PRIMARY,
    gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        icon: <Zap size={28} />,
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
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
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
        applications: ["Heat Affected Zones", "Large Components", "In-service Inspection", "Weld Hardness", "Coating Hardness"],
        standards: ["ASTM E10", "ASTM E18", "ASTM E92", "ISO 6506"],
        advantages: ["Multiple scales", "Portable options", "Quick results", "Minimal surface damage", "Wide material range"],
        image: "💎",
      },
      {
        id: 19,
        method: "Mechanical Testing",
        shortName: "Mechanical",
        certification: "NABL Accredited",
        description:
          "Comprehensive mechanical property evaluation covering tensile, compression, bend, impact, hardness, and fastener tests on metals and structural components.",
        icon: <Wrench size={28} />,
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
        applications: ["Material Certification", "Weld Qualification", "Design Validation", "Failure Analysis", "Batch Quality Control"],
        standards: ["ASTM E8", "ASTM E9", "ASTM E23", "ASTM E10", "ASTM E190"],
        advantages: ["Single-vendor convenience", "Consolidated reporting", "Wide property coverage", "Standard-compliant", "Fast turnaround"],
        image: "⚙️",
      },
      {
        id: 20,
        method: "Metallurgical Testing",
        shortName: "Metallurgical",
        certification: "NABL Accredited",
        description:
          "Microstructural and metallurgical evaluation including macro/micro examination, grain size, phase analysis, microhardness, case depth, corrosion, and failure investigation.",
        icon: <Microscope size={28} />,
        color: PRIMARY,
        gradient: PRIMARY_GRADIENT,
        applications: ["Microstructure Analysis", "Weld Metallurgy", "Heat Treatment Verification", "Failure Investigation", "Corrosion Assessment"],
        standards: ["ASTM E3", "ASTM E112", "ASTM E407", "ASTM E384", "ASTM E45"],
        advantages: ["High-resolution imaging", "Phase & grain analysis", "Failure root cause", "Corrosion diagnosis", "Detailed metallurgical report"],
        image: "🔬",
      },
    ],
  },
];

const ALL_METHODS = TESTING_GROUPS.flatMap((g) => g.methods);

/* ============================================================
   🔄 PROCESS — EDIT ONLY HERE
   ============================================================ */
const PROCESS_STEPS = [
  { title: "Client Consultation", description: "Understanding testing requirements and specifications for accurate results", icon: "💬", duration: "1-2 Days" },
  { title: "Method Selection", description: "Choosing appropriate testing methods based on material and defect type", icon: "📋", duration: "1 Day" },
  { title: "On-site Inspection", description: "Deploying certified technicians with calibrated equipment for precise testing", icon: "🔍", duration: "Variable" },
  { title: "Data Analysis", description: "Expert analysis of test results using advanced software and AI tools", icon: "📊", duration: "2-3 Days" },
  { title: "Report Generation", description: "Comprehensive report with findings, analysis, and actionable recommendations", icon: "📑", duration: "1-2 Days" },
  { title: "Certification Issuance", description: "Official certification, quality stamp, and ongoing technical support", icon: "🏆", duration: "1 Day" },
];

/* ============================================================
   🏭 INDUSTRIES WE SERVE — EDIT ONLY HERE
   ============================================================ */
const INDUSTRIES = [
  {
    id: 1,
    name: "NDT Services",
    Icon: Activity,
    color: PRIMARY,
    colorLight: PRIMARY_LIGHT,
    description: "Non-Destructive Testing services for flaw detection and material integrity without damaging the component",
    applications: ["Weld Inspection", "Casting & Forging Inspection", "Pipeline Integrity", "Pressure Vessel Testing", "Structural Steel Inspection", "Aerospace Component Testing"],
    features: ["No damage to components", "Real-time defect detection", "Cost-effective inspection", "Compliance with international standards"],
    methods: ["Ultrasonic Testing (UT)", "Magnetic Particle Testing (MPT)", "Dye Penetrant Testing (DPT)", "Phased Array Ultrasonic Testing (PAUT)", "Eddy Current Testing (ET)", "Portable Spectro Testing (PST)"],
  },
  {
    id: 2,
    name: "DT Services",
    Icon: BarChart3,
    color: "#0F766E",
    colorLight: "#2DA79A",
    description: "Destructive Testing services to evaluate mechanical properties and material performance under stress",
    applications: ["Tensile Strength Testing", "Compression Testing", "Bend & Re-bend Testing", "Impact Testing", "Hardness Testing", "Fastener Testing"],
    features: ["Accurate mechanical property data", "Quality verification", "Material certification", "Failure analysis support"],
    methods: ["Tensile Testing", "Compression Testing", "Bend Testing", "Re-bend Testing", "Impact Testing", "Hardness Testing"],
  },
  {
    id: 3,
    name: "Material Testing",
    Icon: Layers,
    color: "#7B1E2B",
    colorLight: "#A93A4C",
    description: "Comprehensive material characterization and analysis for quality assurance and R&D",
    applications: ["Chemical Composition Analysis", "Metallurgical Testing", "Corrosion Testing", "Paint & Coating Testing", "PMI Testing", "Geological Survey"],
    features: ["Precise chemical analysis", "Microstructure evaluation", "Corrosion resistance data", "Coating performance metrics"],
    methods: ["Chemical & Corrosion Testing", "Metallurgical Testing", "Paint & Surface Coating Testing", "Positive Material Identification (PMI)", "Geological Survey & Consultancy", "Water & Geotextile Testing"],
  },
  {
    id: 4,
    name: "NDT & DT Combined",
    Icon: Shield,
    color: "#3F1D5C",
    colorLight: "#6B3E8E",
    description: "Integrated NDT and DT solutions for complete material and component qualification",
    applications: ["Full Weld Qualification", "Pressure Equipment Certification", "Structural Integrity Assessment", "Material Qualification", "Fitness-for-Service Evaluation", "Remaining Life Assessment"],
    features: ["Complete testing coverage", "Single-point coordination", "Comprehensive reporting", "Faster project turnaround"],
    methods: ["UT + Tensile Testing", "MPT + Impact Testing", "DPT + Hardness Testing", "PAUT + Bend Testing", "ET + Chemical Analysis", "PST + Metallurgical Testing"],
  },
  {
    id: 5,
    name: "Advanced NDT",
    Icon: Cpu,
    color: "#0369A1",
    colorLight: "#38A3D6",
    description: "Advanced non-destructive techniques for critical and complex applications",
    applications: ["Phased Array UT", "Time of Flight Diffraction", "Guided Wave Testing", "Acoustic Emission Testing", "Digital Radiography", "Computed Tomography"],
    features: ["High-resolution imaging", "Complex geometry capability", "Volumetric inspection", "Digital data archiving"],
    methods: ["Phased Array Ultrasonic Testing (PAUT)", "Eddy Current Testing (ET)", "Portable Spectro Testing (PST)", "Positive Material Identification (PMI)", "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MPT)"],
  },
  {
    id: 6,
    name: "Mechanical Testing",
    Icon: Wrench,
    color: "#C2410C",
    colorLight: "#F07A3A",
    description: "Destructive mechanical testing to determine material strength and performance characteristics",
    applications: ["Tensile Testing", "Compression Testing", "Bend Testing", "Impact Testing", "Hardness Testing", "Shear Testing"],
    features: ["Accurate load measurement", "Standard-compliant procedures", "Detailed stress-strain data", "Failure mode analysis"],
    methods: ["Tensile Testing", "Compression Testing", "Bend Testing", "Re-bend Testing", "Impact Testing", "Hardness Testing"],
  },
];

const DETAIL_COLUMNS = [
  { key: "applications", title: "Applications", Icon: Box },
  { key: "features", title: "Key Features", Icon: Award },
  { key: "methods", title: "Test Methods", Icon: Shield },
];

/* ============================================================
   🛠 INDUSTRY SOLUTIONS — EDIT ONLY HERE
   ============================================================ */
const INDUSTRY_SERVICES = [
  { title: "Material Selection", description: "Expert guidance in choosing the right materials", Icon: Layers, features: ["Material testing", "Cost optimization", "Performance evaluation", "Compliance verification"] },
  { title: "Quality Assurance", description: "Comprehensive testing and inspection to ensure product reliability", Icon: Shield, features: ["NDT & DT testing services", "Dimensional inspection", "Chemical analysis", "Mechanical testing"] },
  { title: "Custom Solutions", description: "Tailored products designed to meet unique industry specifications", Icon: Cog, features: ["Custom alloy development", "Specialized coatings", "Unique geometries", "Prototype development"] },
  { title: "Technical Support", description: "24/7 expert support for installation, maintenance, and troubleshooting", Icon: Users, features: ["On-site assistance", "Training programs", "Technical documentation", "Performance monitoring"] },
];

/* ============================================================
   🔬 QUOTE FORM — TESTING TYPES — EDIT ONLY HERE
   ============================================================ */
const TESTING_TYPES = [
  {
    id: "ndt",
    name: "NDT Testing",
    Icon: Activity,
    services: ["Ultrasonic Testing (UT)", "Magnetic Particle Testing (MPT)", "Dye Penetrant Testing (DPT)", "Phased Array Ultrasonic Testing (PAUT)", "Eddy Current Testing (ET)", "Portable Spectro Testing (PST)"],
  },
  {
    id: "dt",
    name: "DT Testing",
    Icon: BarChart3,
    services: ["Tensile Testing", "Compression Testing", "Bend Testing", "Re-bend Testing", "Impact Testing", "Hardness Testing"],
  },
  {
    id: "advanced",
    name: "Advanced NDT",
    Icon: Cpu,
    services: ["Phased Array UT", "Time of Flight Diffraction", "Guided Wave Testing", "Acoustic Emission Testing", "Digital Radiography", "Computed Tomography"],
  },
  {
    id: "material",
    name: "Material Testing",
    Icon: Layers,
    services: ["Chemical & Corrosion Testing", "Metallurgical Testing", "Paint & Surface Coating Testing", "Positive Material Identification (PMI)", "Geological Survey & Consultancy", "Water & Geotextile Testing"],
  },
  {
    id: "mechanical",
    name: "Mechanical Testing",
    Icon: Wrench,
    services: ["Tensile Testing", "Compression Testing", "Bend Testing", "Impact Testing", "Hardness Testing", "Shear Testing"],
  },
];

const buildDefaultMessage = (typeName) => `Testing Type: ${typeName}`;
const isDefaultMessage = (text) =>
  text.trim() === "" || TESTING_TYPES.some((t) => text.trim() === buildDefaultMessage(t.name));
const MESSAGE_MAX = 1000;

const FORM_PERKS = [
  { Icon: Clock, text: "Reply within 24 hours" },
  { Icon: ShieldCheck, text: "Expert NDT & DT team" },
  { Icon: CheckCircle2, text: "Clear, traceable reports" },
];

/* ============================================================
   🏢 GROUP OF COMPANIES — EDIT ONLY HERE
   ============================================================ */
const GROUP_COMPANIES = [
  { id: "ttpl", name: "Technoking Testlab Pvt Ltd", initials: "TT", logo: testlab },
  { id: "tepl", name: "Technoking Engineers Pvt Ltd", initials: "TE", logo: eng },
  { id: "tent", name: "Technoking Enterprise", initials: "TE", logo: ent },
  { id: "tns", name: "Technoking NDT Services", initials: "TNS", logo: ndt },
  { id: "qixs", name: "Quality Industrial X-Ray Company Pvt Ltd", initials: "QX", logo: qixp },
  { id: "cndt", name: "Capital NDT Services", initials: "CN", logo: cns },
  { id: "wndt", name: "Weldcast NDT Pvt Ltd", initials: "WN", logo: weldcast },
];

/* ============================================================
   🤝 OUR CLIENTS — EDIT ONLY HERE
   ============================================================ */
const CLIENTS = [
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

/* two marquee rows that run in opposite directions */
const CLIENT_ROWS = [
  CLIENTS.slice(0, Math.ceil(CLIENTS.length / 2)),
  CLIENTS.slice(Math.ceil(CLIENTS.length / 2)),
];

const pad = (n) => String(n).padStart(2, "0");

/* ---------- mouse spotlight + gentle 3D tilt for cards ---------- */
const trackPointer = (e, tilt = 0) => {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  card.style.setProperty("--mx", `${x * 100}%`);
  card.style.setProperty("--my", `${y * 100}%`);
  if (tilt) {
    card.style.setProperty("--rx", `${(0.5 - y) * tilt}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * tilt}deg`);
  }
};
const resetPointer = (e) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};

/* ---------- shared section header ---------- */
const SectionHeader = ({ Icon, badge, before, highlight, after, subtitle }) => (
  <div className="hm-section-header hm-reveal" style={{ "--d": "0s" }}>
    <div className="hm-section-badge">
      <Icon size={16} />
      {badge}
    </div>
    <h2 className="hm-section-title">
      {before} <span className="hm-title-accent">{highlight}</span>
      {after ? ` ${after}` : ""}
    </h2>
    <div className="hm-section-divider" aria-hidden="true">
      <span className="hm-divider-line"></span>
      <span className="hm-divider-dot"></span>
      <span className="hm-divider-line hm-divider-line-r"></span>
    </div>
    {subtitle && <p className="hm-section-subtitle">{subtitle}</p>}
  </div>
);

/* ============================================================
   🏠 HOME
   ============================================================ */
const Home = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("ndt");
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupIndicator, setGroupIndicator] = useState({ left: 0, width: 0, ready: false });

  /* quote form — same behaviour as the Contact page */
  const [activeTestingType, setActiveTestingType] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [messageText, setMessageText] = useState(buildDefaultMessage(TESTING_TYPES[0].name));
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [statusText, setStatusText] = useState("");
  const [typeIndicator, setTypeIndicator] = useState({ left: 0, width: 0, ready: false });
  const [mapVisible, setMapVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const groupTabRefs = useRef({});
  const typeTabRefs = useRef([]);
  const railRef = useRef(null);
  const mapRef = useRef(null);
  const statusTimer = useRef(null);

  const activeGroup = TESTING_GROUPS.find((g) => g.id === activeTab) || TESTING_GROUPS[0];
  const industry = INDUSTRIES[activeIndustry];
  const currentType = TESTING_TYPES[activeTestingType];
  const isSubmitting = status === "sending";

  /* ---------- reveal sections once they scroll into view (no re-render) ---------- */
  useEffect(() => {
    const sections = document.querySelectorAll("[data-hm-section]");
    if (!("IntersectionObserver" in window)) {
      sections.forEach((s) => s.classList.add("hm-in"));
      setMapVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hm-in");
            if (entry.target === mapRef.current) setMapVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  /* ---------- NDT / DT sliding tab indicator ---------- */
  const measureGroup = useCallback(() => {
    const tab = groupTabRefs.current[activeTab];
    if (!tab) return;
    setGroupIndicator({ left: tab.offsetLeft, width: tab.offsetWidth, ready: true });
  }, [activeTab]);

  useLayoutEffect(() => {
    measureGroup();
  }, [measureGroup]);

  useEffect(() => {
    window.addEventListener("resize", measureGroup);
    document.fonts?.ready?.then(measureGroup);
    return () => window.removeEventListener("resize", measureGroup);
  }, [measureGroup]);

  /* ============================================================
     🏭 INDUSTRIES — tabs with sliding indicator (Industry page)
     ============================================================ */
  const [indIndicator, setIndIndicator] = useState({ left: 0, width: 0, ready: false });
  const indRailRef = useRef(null);
  const indTabRefs = useRef([]);

  const ctaParticles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${8 + Math.random() * 12}s`,
        delay: `${Math.random() * 5}s`,
        size: `${4 + Math.random() * 8}px`,
      })),
    []
  );

  const measureIndustry = useCallback(() => {
    const tab = indTabRefs.current[activeIndustry];
    if (!tab) return;
    setIndIndicator({ left: tab.offsetLeft, width: tab.offsetWidth, ready: true });
    const rail = indRailRef.current;
    if (rail && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: tab.offsetLeft - rail.clientWidth / 2 + tab.offsetWidth / 2, behavior: "smooth" });
    }
  }, [activeIndustry]);

  useLayoutEffect(() => {
    measureIndustry();
  }, [measureIndustry]);

  useEffect(() => {
    window.addEventListener("resize", measureIndustry);
    document.fonts?.ready?.then(measureIndustry);
    return () => window.removeEventListener("resize", measureIndustry);
  }, [measureIndustry]);

  const goToIndustry = (index) => setActiveIndustry((index + INDUSTRIES.length) % INDUSTRIES.length);

  const onIndustryKeyDown = (e, index) => {
    let next = null;
    if (e.key === "ArrowRight") next = index + 1;
    if (e.key === "ArrowLeft") next = index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = INDUSTRIES.length - 1;
    if (next === null) return;
    e.preventDefault();
    const wrapped = (next + INDUSTRIES.length) % INDUSTRIES.length;
    setActiveIndustry(wrapped);
    indTabRefs.current[wrapped]?.focus();
  };

  const handleSpotlight = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* ---------- service modal ---------- */
  const openMethod = (method) => {
    setSelectedMethod(method);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMethod(null), 300);
  };

  /* ============================================================
     📝 QUOTE FORM (identical behaviour to the Contact page)
     ============================================================ */

  /* keep the message's first line in sync, but never overwrite typed text */
  useEffect(() => {
    setMessageText((prev) =>
      isDefaultMessage(prev) ? buildDefaultMessage(TESTING_TYPES[activeTestingType].name) : prev
    );
  }, [activeTestingType]);

  /* sliding indicator for the testing-type tabs */
  const measureType = useCallback(() => {
    const tab = typeTabRefs.current[activeTestingType];
    if (!tab) return;
    setTypeIndicator({ left: tab.offsetLeft, width: tab.offsetWidth, ready: true });
  }, [activeTestingType]);

  useLayoutEffect(() => {
    measureType();
  }, [measureType]);

  useEffect(() => {
    window.addEventListener("resize", measureType);
    document.fonts?.ready?.then(measureType);
    return () => window.removeEventListener("resize", measureType);
  }, [measureType]);

  const selectType = (index) => {
    setActiveTestingType(index);
    setSelectedService("");
  };

  const onTabKeyDown = (e, index) => {
    let next = null;
    if (e.key === "ArrowRight") next = index + 1;
    if (e.key === "ArrowLeft") next = index - 1;
    if (next === null) return;
    e.preventDefault();
    const wrapped = (next + TESTING_TYPES.length) % TESTING_TYPES.length;
    selectType(wrapped);
    typeTabRefs.current[wrapped]?.focus();
  };

  const showStatus = (nextStatus, text) => {
    clearTimeout(statusTimer.current);
    setStatus(nextStatus);
    setStatusText(text);
    statusTimer.current = setTimeout(() => {
      setStatus("idle");
      setStatusText("");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    clearTimeout(statusTimer.current);
    setStatus("sending");
    setStatusText("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("testing_type", currentType.name);
    formData.append("service_selected", selectedService);
    formData.append("subject", `New enquiry — ${currentType.name}: ${selectedService}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const result = await response.json();

      if (result.success) {
        form.reset();
        setSelectedService("");
        setMessageText(buildDefaultMessage(currentType.name));
        showStatus("success", "Thank you! Your enquiry has been sent — we'll get back to you soon.");
      } else {
        showStatus("error", "Something went wrong. Please try again or call us directly.");
      }
    } catch (error) {
      showStatus("error", "Couldn't send your message. Check your connection and try again.");
    }
  };

  /* ---------- pointer tilt for the contact cards ---------- */
  const handleTilt = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  return (
    <div className="hm-page">
      {/* ============================ HERO ============================ */}
      <div id="home" className="header-container">
        <Header />
      </div>

      {/* ============================ OVERVIEW ============================ */}
      <section className="hm-section hm-overview" id="services" data-hm-section>
        <span className="hm-orb hm-orb-a" aria-hidden="true" />
        <span className="hm-orb hm-orb-b" aria-hidden="true" />
        <div className="hm-container">
          <SectionHeader
            Icon={Shield}
            badge="Our Services"
            before="Comprehensive"
            highlight="Testing Solutions"
            subtitle="ASNT Level III certified NDT and DT testing services with advanced equipment and expert analysis"
          />

          <div className="hm-overview-grid">
            <div className="hm-overview-text">
              <div className="hm-intro-card hm-reveal" style={{ "--d": "0.1s" }}>
                <span className="hm-intro-icon">
                  <Star size={22} />
                </span>
                <p>
                  We provide complete <strong>NDT &amp; DT Testing</strong> services for quality assurance and
                  structural integrity evaluation. Our certified technicians use state-of-the-art equipment to
                  detect flaws, measure material properties, and ensure compliance with international standards.
                </p>
              </div>

              <ul className="hm-highlights">
                {SERVICE_HIGHLIGHTS.map((text, i) => (
                  <li key={text} className="hm-reveal" style={{ "--d": `${0.2 + i * 0.08}s` }}>
                    <span className="hm-check">
                      <CheckCircle2 size={18} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hm-features">
              {SERVICE_FEATURES.map(({ Icon, title, description }, i) => (
                <article
                  key={title}
                  className="hm-feature hm-reveal hm-spot"
                  style={{ "--d": `${0.15 + i * 0.1}s` }}
                  onMouseMove={(e) => trackPointer(e, 8)}
                  onMouseLeave={resetPointer}
                >
                  <span className="hm-feature-no">{pad(i + 1)}</span>
                  <span className="hm-feature-icon">
                    <Icon size={26} />
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ TESTING METHODS ============================ */}
      <section className="hm-section hm-methods" data-hm-section>
        <div className="hm-container">
          <SectionHeader
            Icon={Microscope}
            badge="Testing Services"
            before="Our Testing"
            highlight="Capabilities"
            subtitle="Advanced NDT and DT testing techniques for accurate results and quality assurance"
          />

          <div className="hm-group-tabs hm-reveal" style={{ "--d": "0.1s" }} role="tablist">
            <span
              className={`hm-group-indicator ${groupIndicator.ready ? "is-ready" : ""}`}
              style={{ transform: `translateX(${groupIndicator.left}px)`, width: groupIndicator.width }}
              aria-hidden="true"
            />
            {TESTING_GROUPS.map((group) => (
              <button
                key={group.id}
                ref={(el) => (groupTabRefs.current[group.id] = el)}
                type="button"
                role="tab"
                aria-selected={activeTab === group.id}
                className={`hm-group-tab ${activeTab === group.id ? "is-active" : ""}`}
                onClick={() => setActiveTab(group.id)}
              >
                <span className="hm-group-tab-icon">{group.icon}</span>
                <span className="hm-group-tab-text">
                  <strong>{group.name}</strong>
                  <small>{group.fullName}</small>
                </span>
                <span className="hm-group-count">{group.methods.length}</span>
              </button>
            ))}
          </div>

          <p className="hm-group-desc" key={`desc-${activeTab}`}>
            {activeGroup.description}
          </p>

          <div className="hm-method-grid" key={activeTab}>
            {activeGroup.methods.map((method, i) => (
              <article
                key={method.id}
                className="hm-method hm-spot"
                style={{ "--d": `${i * 0.06}s` }}
                onMouseMove={(e) => trackPointer(e, 6)}
                onMouseLeave={resetPointer}
              >
                <header className="hm-method-head">
                  <span className="hm-method-grid-bg" aria-hidden="true" />
                  <span className="hm-method-icon">{method.icon}</span>
                  <span className="hm-method-no">#{pad(i + 1)}</span>
                  <h3>{method.method}</h3>
                  <span className="hm-method-short">{method.shortName}</span>
                </header>

                <div className="hm-method-body">
                  <p className="hm-method-desc">{method.description}</p>

                  <div className="hm-method-label">
                    <Target size={14} />
                    Applications
                  </div>
                  <div className="hm-chips">
                    {method.applications.slice(0, 3).map((app) => (
                      <span key={app} className="hm-chip">
                        <CheckCircle2 size={12} />
                        {app}
                      </span>
                    ))}
                    {method.applications.length > 3 && (
                      <span className="hm-chip hm-chip-more">+{method.applications.length - 3}</span>
                    )}
                  </div>

                  <div className="hm-method-label">
                    <BookOpen size={14} />
                    Standards
                  </div>
                  <div className="hm-standards">
                    {method.standards.slice(0, 3).map((std) => (
                      <span key={std}>{std}</span>
                    ))}
                  </div>

                  <button type="button" className="hm-method-btn" onClick={() => openMethod(method)}>
                    <span className="hm-method-btn-fill" aria-hidden="true" />
                    <span>View Details</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="hm-center hm-reveal" style={{ "--d": "0.2s" }}>
            <button type="button" className="hm-btn-outline" onClick={() => navigate("/product")}>
              Explore all services
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* ============================ CERTIFICATION PROCESS (Product page design) ============================ */}
      <section className="hm-certification-section" data-hm-section>
        <div className="hm-container">
          <SectionHeader
            Icon={Rocket}
            badge="Our Process"
            before="Certification"
            highlight="Process"
            subtitle="Streamlined process from inspection to certification"
          />

          <div className="hm-process-timeline">
            {PROCESS_STEPS.map((process, index) => (
              <div key={process.title} className="hm-process-step" style={{ "--d": `${index * 0.2}s` }}>
                <div className="hm-process-step-indicator">
                  <div className="hm-process-step-number hm-pulse-animation" style={{ background: PRIMARY_GRADIENT }}>
                    {index + 1}
                    <div className="hm-process-step-glow"></div>
                  </div>
                  <div className="hm-process-step-icon">{process.icon}</div>
                </div>

                <div className="hm-process-step-content">
                  <h3 className="hm-process-step-title">{process.title}</h3>
                  <p className="hm-process-step-description">{process.description}</p>
                  <div className="hm-process-step-duration">
                    <span className="hm-duration-icon hm-pulse-animation">⏱️</span>
                    {process.duration}
                  </div>
                  <div className="hm-process-step-hover"></div>
                </div>

                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hm-process-step-connector hm-pulse-animation" style={{ background: PRIMARY }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ INDUSTRIES (Industry page design) ============================ */}
      <section id="industry" className="hm-industries-overview" data-hm-section>
        <div className="hm-bg-orb hm-bg-orb-1" aria-hidden="true"></div>
        <div className="hm-bg-orb hm-bg-orb-2" aria-hidden="true"></div>

        <div className="hm-container">
          <SectionHeader
            Icon={Target}
            badge="Industries We Serve"
            before="Powering"
            highlight="Industrial"
            after="Excellence"
            subtitle="Specialized solutions for diverse industrial sectors with unmatched quality and technical support"
          />

          {/* Tabs — sliding indicator, scrollable on mobile */}
          <div className="hm-tabs-rail hm-reveal" ref={indRailRef} style={{ "--d": "0.1s" }}>
            <div className="hm-tabs-track" role="tablist" aria-label="Service areas">
              <span
                className={`hm-tabs-indicator ${indIndicator.ready ? "is-ready" : ""}`}
                style={{
                  transform: `translateX(${indIndicator.left}px)`,
                  width: indIndicator.width,
                  background: `linear-gradient(135deg, ${industry.color}, ${industry.colorLight})`,
                  boxShadow: `0 10px 26px ${industry.color}55`,
                }}
                aria-hidden="true"
              ></span>
              {INDUSTRIES.map((item, index) => {
                const isActive = activeIndustry === index;
                return (
                  <button
                    key={item.id}
                    ref={(el) => (indTabRefs.current[index] = el)}
                    type="button"
                    role="tab"
                    id={`hm-ind-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls="hm-industry-panel"
                    tabIndex={isActive ? 0 : -1}
                    className={`hm-industry-tab ${isActive ? "hm-active" : ""}`}
                    style={{ "--tab-color": item.color }}
                    onClick={() => setActiveIndustry(index)}
                    onKeyDown={(e) => onIndustryKeyDown(e, index)}
                  >
                    <span className="hm-tab-icon">
                      <item.Icon size={18} />
                    </span>
                    <span className="hm-tab-name">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel — re-mounts on tab change to replay animations */}
          <div
            key={industry.id}
            id="hm-industry-panel"
            role="tabpanel"
            aria-labelledby={`hm-ind-tab-${industry.id}`}
            className="hm-detail-panel"
            style={{ "--ind": industry.color, "--ind-light": industry.colorLight }}
          >
            <aside className="hm-detail-hero">
              <div className="hm-detail-hero-pattern" aria-hidden="true"></div>
              <div className="hm-detail-hero-top">
                <span className="hm-detail-index">
                  {pad(activeIndustry + 1)}
                  <small> / {pad(INDUSTRIES.length)}</small>
                </span>
                <div className="hm-detail-arrows">
                  <button type="button" onClick={() => goToIndustry(activeIndustry - 1)} aria-label="Previous service area">
                    <ChevronLeft size={18} />
                  </button>
                  <button type="button" onClick={() => goToIndustry(activeIndustry + 1)} aria-label="Next service area">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="hm-detail-icon">
                <industry.Icon size={30} />
                <span className="hm-detail-icon-ring" aria-hidden="true"></span>
              </div>

              <h3 className="hm-industry-name">{industry.name}</h3>
              <p className="hm-industry-description">{industry.description}</p>

              <ul className="hm-detail-stats">
                {DETAIL_COLUMNS.map((col) => (
                  <li key={col.key}>
                    <strong>{industry[col.key].length}</strong>
                    <span>{col.title}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className="hm-detail-cta" onClick={() => navigate("/contact")}>
                Request a quote
                <ArrowRight size={17} />
              </button>
            </aside>

            <div className="hm-detail-grid">
              {DETAIL_COLUMNS.map((col, ci) => (
                <div key={col.key} className="hm-detail-card" style={{ "--c": ci }}>
                  <h4 className="hm-detail-card-title">
                    <span className="hm-detail-card-icon">
                      <col.Icon size={18} />
                    </span>
                    {col.title}
                    <span className="hm-detail-card-count">{industry[col.key].length}</span>
                  </h4>
                  <ul className="hm-detail-list">
                    {industry[col.key].map((item, idx) => (
                      <li key={item} className="hm-detail-item" style={{ "--i": idx }}>
                        <CheckCircle2 size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ SOLUTIONS (Industry page design) ============================ */}
      <section id="industry-services" className="hm-industry-services" data-hm-section>
        <div className="hm-container">
          <SectionHeader
            Icon={Briefcase}
            badge="Our Services"
            before="Comprehensive"
            highlight="Industry"
            after="Solutions"
            subtitle="End-to-end support from material selection to after-sales service"
          />

          <div className="hm-services-grid">
            {INDUSTRY_SERVICES.map((service, index) => (
              <article
                key={service.title}
                className="hm-service-card"
                style={{ "--d": `${0.12 + index * 0.1}s` }}
                onMouseMove={handleTilt}
                onMouseLeave={resetPointer}
              >
                <div className="hm-service-card-inner">
                  <span className="hm-service-glow" aria-hidden="true"></span>
                  <span className="hm-service-number" aria-hidden="true">
                    {pad(index + 1)}
                  </span>

                  <div className="hm-service-icon">
                    <service.Icon size={26} />
                  </div>
                  <h3 className="hm-service-title">{service.title}</h3>
                  <p className="hm-service-description">{service.description}</p>

                  <ul className="hm-service-features">
                    {service.features.map((feature) => (
                      <li key={feature}>
                        <ChevronRight size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button type="button" className="hm-service-button" onClick={() => navigate("/contact")}>
                    <span>Learn More</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ QUOTE FORM (Contact page design) ============================ */}
      <div id="contact">
        <section className="hm-form-section" id="contact-form" data-hm-section>
          <div className="hm-bg-orb hm-bg-orb-1" aria-hidden="true"></div>
          <div className="hm-bg-orb hm-bg-orb-2" aria-hidden="true"></div>

          <div className="hm-container">
            <SectionHeader
              Icon={MessageSquare}
              badge="Send Enquiry"
              before="Request a"
              highlight="Test Quote"
              subtitle="Select your testing type and we'll get back within 24 hours"
            />

            <div className="hm-form-card hm-reveal" style={{ "--d": "0.12s" }}>
              {/* ---------- Left: info panel ---------- */}
              <aside className="hm-form-aside">
                <div className="hm-form-aside-pattern" aria-hidden="true"></div>

                <span className="hm-eyebrow">Get in touch</span>
                <h3 className="hm-aside-title">Tell us what you need tested</h3>
                <p className="hm-aside-text">
                  Share a few details about your component and testing requirement — our team will reply
                  with the right method and a quotation.
                </p>

                <div className="hm-aside-image">
                  <img draggable="false" src={contactImage} alt="" />
                  <span className="hm-aside-image-ring" aria-hidden="true"></span>
                </div>

                <ul className="hm-aside-perks">
                  {FORM_PERKS.map(({ Icon, text }, i) => (
                    <li key={text} style={{ "--i": i }}>
                      <span>
                        <Icon size={16} />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>

                <div className="hm-aside-links">
                  <a href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>
                    <Phone size={15} />
                    {COMPANY.phone}
                  </a>
                  <a href={`mailto:${COMPANY.email}`}>
                    <Mail size={15} />
                    {COMPANY.email}
                  </a>
                </div>
              </aside>

              {/* ---------- Right: form ---------- */}
              <form
                id="hm-contact-form"
                className="hm-form"
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                <input type="hidden" name="from_name" value="Technoking Website — Home Enquiry Form" />

                {/* Step 1 — testing type */}
                <div className="hm-step">
                  <span className="hm-step-label">
                    <b>1</b> Testing type
                  </span>
                  <div className="hm-type-rail" ref={railRef}>
                    <div className="hm-type-track" role="tablist" aria-label="Testing type">
                      <span
                        className={`hm-type-indicator ${typeIndicator.ready ? "is-ready" : ""}`}
                        style={{ transform: `translateX(${typeIndicator.left}px)`, width: typeIndicator.width }}
                        aria-hidden="true"
                      ></span>
                      {TESTING_TYPES.map((type, index) => {
                        const isActive = activeTestingType === index;
                        return (
                          <button
                            key={type.id}
                            ref={(el) => (typeTabRefs.current[index] = el)}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            tabIndex={isActive ? 0 : -1}
                            className={`hm-type-tab ${isActive ? "is-active" : ""}`}
                            onClick={() => selectType(index)}
                            onKeyDown={(e) => onTabKeyDown(e, index)}
                          >
                            <type.Icon size={16} />
                            <span>{type.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Step 2 — service */}
                <div className="hm-step">
                  <label className="hm-step-label" htmlFor="hm-service">
                    <b>2</b> Testing service
                  </label>
                  <div className="hm-select-wrap" key={currentType.id}>
                    <currentType.Icon size={18} className="hm-select-icon" />
                    <select
                      id="hm-service"
                      name="service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      required
                    >
                      <option value="">Select a test / service</option>
                      {currentType.services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 3 — details */}
                <div className="hm-step">
                  <span className="hm-step-label">
                    <b>3</b> Your details
                  </span>

                  <div className="hm-fields">
                    <div className="hm-field">
                      <input id="hm-name" type="text" name="name" placeholder=" " autoComplete="name" required />
                      <label htmlFor="hm-name">Full Name</label>
                      <User size={18} className="hm-field-icon" />
                      <span className="hm-field-line" aria-hidden="true"></span>
                    </div>

                    <div className="hm-field">
                      <input id="hm-email" type="email" name="email" placeholder=" " autoComplete="email" required />
                      <label htmlFor="hm-email">Email Address</label>
                      <Mail size={18} className="hm-field-icon" />
                      <span className="hm-field-line" aria-hidden="true"></span>
                    </div>

                    <div className="hm-field hm-field-full">
                      <input id="hm-phone" type="tel" name="phone" placeholder=" " autoComplete="tel" />
                      <label htmlFor="hm-phone">Phone Number (optional)</label>
                      <Phone size={18} className="hm-field-icon" />
                      <span className="hm-field-line" aria-hidden="true"></span>
                    </div>

                    <div className="hm-field hm-field-full hm-field-message">
                      <textarea
                        id="hm-message"
                        name="message"
                        placeholder=" "
                        required
                        maxLength={MESSAGE_MAX}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      />
                      <label htmlFor="hm-message">Your Message</label>
                      <MessageSquare size={18} className="hm-field-icon" />
                      <span className="hm-field-line" aria-hidden="true"></span>
                      <span className="hm-char-count">
                        {messageText.length}/{MESSAGE_MAX}
                      </span>
                    </div>
                  </div>
                </div>

                {/* honeypot */}
                <input type="checkbox" name="botcheck" className="hm-hidden" tabIndex={-1} aria-hidden="true" />

                <div className="hm-submit-row">
                  <button
                    type="submit"
                    className={`hm-submit ${isSubmitting ? "is-sending" : ""} ${status === "success" ? "is-success" : ""}`}
                    disabled={isSubmitting}
                  >
                    <span className="hm-submit-fill" aria-hidden="true"></span>
                    <span className="hm-submit-text">
                      {isSubmitting ? "Sending…" : status === "success" ? "Sent!" : "Send Enquiry"}
                    </span>
                    <span className="hm-submit-icon">
                      {isSubmitting ? (
                        <Loader2 size={18} className="hm-spin" />
                      ) : status === "success" ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <Send size={18} />
                      )}
                    </span>
                  </button>
                  <p className="hm-submit-note">
                    <ShieldCheck size={14} />
                    Your details are only used to reply to your enquiry.
                  </p>
                </div>

                <div className="hm-status-slot" aria-live="polite">
                  {statusText && (
                    <div className={`hm-status hm-status-${status}`} role="status">
                      {status === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                      {statusText}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ============================ CONTACT CARDS (Contact page design) ============================ */}
        <section className="hm-cards-section" data-hm-section>
          <div className="hm-container">
            <SectionHeader
              Icon={Compass}
              badge="Connect With Us"
              before="How to"
              highlight="Reach Us"
              subtitle="We're here to help. Reach out through any of these channels — just tap a card."
            />

            <div className="hm-cards">
              {CONTACT_CARDS.map((item, index) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="hm-card"
                  style={{ "--d": `${0.12 + index * 0.12}s` }}
                  onMouseMove={handleTilt}
                  onMouseLeave={resetPointer}
                  aria-label={`${item.title}: ${item.actionLabel}`}
                >
                  <span className="hm-card-inner">
                    <span className="hm-card-fill" aria-hidden="true"></span>
                    <span className="hm-card-glow" aria-hidden="true"></span>
                    <span className="hm-card-number" aria-hidden="true">
                      0{index + 1}
                    </span>

                    <span className="hm-card-icon">
                      <item.Icon size={30} strokeWidth={1.8} />
                      <span className="hm-card-icon-ring" aria-hidden="true"></span>
                    </span>
                    <span className="hm-card-title">{item.title}</span>
                    <span className="hm-card-text">{item.description}</span>
                    <span className="hm-card-cta">
                      {item.actionLabel}
                      {item.external ? <ExternalLink size={15} /> : <ArrowRight size={15} />}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ MAP (Contact page design) ============================ */}
        <section className="hm-map-section" ref={mapRef} data-hm-section>
          <div className="hm-container">
            <div className="hm-map-card hm-reveal" style={{ "--d": "0s" }}>
              <div className={`hm-map-frame ${mapLoaded ? "is-loaded" : ""}`}>
                {mapVisible && (
                  <iframe
                    title={`${COMPANY.name} location map`}
                    src={MAP_EMBED_URL}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    onLoad={() => setMapLoaded(true)}
                  />
                )}
                <div className="hm-map-placeholder" aria-hidden="true">
                  <span className="hm-map-pin">
                    <MapPin size={30} />
                  </span>
                </div>
              </div>

              <div className="hm-map-info">
                <span className="hm-map-info-icon">
                  <MapPin size={24} />
                  <span className="hm-map-info-pulse" aria-hidden="true"></span>
                </span>
                <span className="hm-eyebrow">Visit our laboratory</span>
                <h3>Visit Our Location</h3>
                <p className="hm-map-name">{COMPANY.name}</p>
                <p className="hm-map-address">
                  <AddressBlock />
                </p>
                <div className="hm-map-actions">
                  <a className="hm-map-btn hm-map-btn-primary" href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                    <Navigation size={16} />
                    Get Directions
                  </a>
                  <a className="hm-map-btn" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                    Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* ============================ GROUP OF COMPANIES (Industry page design) ============================ */}
      <section id="group-companies" className="hm-group-section" data-hm-section>
        <div className="hm-container">
          <SectionHeader
            Icon={Users}
            badge="Group of Companies"
            before="Our"
            highlight="Group of Companies"
            subtitle="Providing reliable NDT and DT testing services for quality, safety and structural integrity."
          />

          <div className="hm-group-grid">
            {GROUP_COMPANIES.map((company, i) => (
              <article
                key={company.id}
                className="hm-company-card"
                style={{ "--d": `${0.1 + i * 0.08}s`, "--float-delay": `${i * 0.45}s` }}
                onMouseMove={handleSpotlight}
              >
                <span className="hm-company-spot" aria-hidden="true"></span>
                <div className="hm-company-logo">
                  <span className="hm-company-orbit" aria-hidden="true"></span>
                  <div className="hm-company-logo-inner">
                    {company.logo ? (
                      <img src={company.logo} alt={`${company.name} logo`} draggable="false" loading="lazy" />
                    ) : (
                      <span className="hm-company-initials">{company.initials}</span>
                    )}
                  </div>
                </div>
                <h3 className="hm-company-name">{company.name}</h3>
                <span className="hm-company-tag">
                  <Building2 size={12} />
                  Group Company
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CLIENTS ============================ */}
      <section className="hm-section hm-clients" id="clients" data-hm-section>
        {/* decorative background */}
        <div className="hm-cl-bg" aria-hidden="true">
          <span className="hm-cl-orb hm-cl-orb-1"></span>
          <span className="hm-cl-orb hm-cl-orb-2"></span>
          <span className="hm-cl-orb hm-cl-orb-3"></span>
          <span className="hm-cl-grid"></span>
          <span className="hm-cl-beam"></span>
        </div>

        <div className="hm-container hm-cl-head">
          <SectionHeader
            Icon={Users}
            badge="Our Clients"
            before="Trusted by"
            highlight="Industry Leaders"
            subtitle="We proudly serve leading companies across diverse industries"
          />

          <ul className="hm-cl-stats" aria-label="Client highlights">
            <li className="hm-cl-stat hm-reveal" style={{ "--d": "0.1s" }}>
              <span className="hm-cl-stat-icon"><Building2 size={18} /></span>
              <span className="hm-cl-stat-text">
                <strong>{CLIENTS.length}+</strong> Valued Clients
              </span>
            </li>
            <li className="hm-cl-stat hm-reveal" style={{ "--d": "0.2s" }}>
              <span className="hm-cl-stat-icon"><Layers size={18} /></span>
              <span className="hm-cl-stat-text">
                <strong>{INDUSTRIES.length}</strong> Industries Served
              </span>
            </li>
            <li className="hm-cl-stat hm-reveal" style={{ "--d": "0.3s" }}>
              <span className="hm-cl-stat-icon"><ShieldCheck size={18} /></span>
              <span className="hm-cl-stat-text">
                <strong>Trusted</strong> Testing Partner
              </span>
            </li>
          </ul>
        </div>

        <div className="hm-cl-stage">
          {CLIENT_ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`hm-cl-row ${rowIndex % 2 ? "hm-cl-row-rev" : ""}`}
              style={{ "--d": `${0.25 + rowIndex * 0.15}s` }}
            >
              <div className="hm-cl-track">
                {[0, 1, 2, 3].map((copy) => (
                  <div
                    key={copy}
                    className="hm-cl-set"
                    aria-hidden={copy > 0 ? "true" : undefined}
                  >
                    {row.map((client) => (
                      <div
                        key={`${copy}-${client.id}`}
                        className="hm-cl-card"
                        title={client.name}
                        onMouseMove={(e) => trackPointer(e, 14)}
                        onMouseLeave={resetPointer}
                      >
                        <span className="hm-cl-glow" aria-hidden="true"></span>
                        <div className="hm-cl-inner">
                          <span className="hm-cl-spot" aria-hidden="true"></span>
                          <span className="hm-cl-shine" aria-hidden="true"></span>
                          <span className="hm-cl-index" aria-hidden="true">{pad(client.id)}</span>
                          <div className="hm-cl-logo">
                            <img
                              src={client.logo}
                              alt={copy === 0 ? client.name : ""}
                              draggable="false"
                              loading="lazy"
                            />
                          </div>
                          <span className="hm-cl-name">{client.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="hm-cl-hint hm-reveal" style={{ "--d": "0.5s" }}>
          <Sparkles size={14} />
          Hover over a logo to pause and explore
        </p>
      </section>


      {/* ============================ CTA BANNER (Industry page design) ============================ */}
      {/* <section
        className="hm-cta-banner"
        data-hm-section
        style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_DARK})` }}
      >
        <div className="hm-cta-grid" aria-hidden="true"></div>
        <div className="hm-cta-orb hm-cta-orb-1" aria-hidden="true"></div>
        <div className="hm-cta-orb hm-cta-orb-2" aria-hidden="true"></div>

        <div className="hm-cta-content">
          <div className="hm-cta-icon hm-reveal" style={{ "--d": "0s" }}>
            <Rocket size={40} />
            <span className="hm-cta-icon-ring" aria-hidden="true"></span>
          </div>
          <h2 className="hm-cta-title hm-reveal" style={{ "--d": "0.1s" }}>
            Ready to <span>Transform</span> Your Industry?
          </h2>
          <p className="hm-cta-description hm-reveal" style={{ "--d": "0.2s" }}>
            Contact us today for expert NDT &amp; DT solutions tailored to your needs
          </p>
          <div className="hm-cta-actions hm-reveal" style={{ "--d": "0.3s" }}>
            <button type="button" className="hm-cta-button" onClick={() => navigate("/contact")}>
              <span>Get Started</span>
              <ArrowRight size={18} className="hm-cta-arrow" />
            </button>
            <button type="button" className="hm-cta-button hm-cta-button-ghost" onClick={() => scrollToId("industry")}>
              <Sparkles size={17} />
              <span>Explore Services</span>
            </button>
          </div>
        </div>

        <div className="hm-cta-particles" aria-hidden="true">
          {ctaParticles.map((p) => (
            <span
              key={p.id}
              className="hm-cta-particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            ></span>
          ))}
        </div>
      </section> */}
      <ServiceDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        method={selectedMethod}
        allMethods={ALL_METHODS}
        onSelectMethod={setSelectedMethod}
      />
    </div>
  );
};

export default Home;