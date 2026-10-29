import React, { useEffect, useRef, useState } from "react";
import "./ServiceDetailModal.css";
import {
  X, Waves, Magnet, Droplets, Zap, Scan, Atom, Radio, Diamond, Ruler,
  CheckCircle, Target, BookOpen, Rocket, Award, Clock, Users, Shield,
  TrendingUp, Microscope, Gauge, Factory, Plane, Car, Ship, HardHat,
  ChevronRight, Star, Layers, Activity, BarChart3, FileText, Phone, Mail,
  Calendar, MapPin, ArrowRight, Sparkles, Gem, Globe, Lightbulb, Settings,
  Thermometer, Maximize2, Cpu, Wrench, FlaskConical, TestTube, Beaker,
  Lock, Eye, Crosshair, Fingerprint, Box, Grid3X3, CircleDot, AlertTriangle,
  ThumbsUp, Briefcase, Building2, Truck, Container, Fuel, Wind, Flame,
  Snowflake, Cloud, Sun,
} from "lucide-react";

const iconMap = {
  Waves: <Waves size={24} />, Magnet: <Magnet size={24} />, Droplets: <Droplets size={24} />,
  Zap: <Zap size={24} />, Scan: <Scan size={24} />, Atom: <Atom size={24} />,
  Radio: <Radio size={24} />, Diamond: <Diamond size={24} />, Ruler: <Ruler size={24} />,
};

const ServiceDetailModal = ({ isOpen, onClose, method, allMethods, onSelectMethod }) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animatedItems, setAnimatedItems] = useState([]);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  const primaryColor = "#235781";
  const primaryDark = "#16405F";
  const primaryLight = "#4A82A8";

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      setTimeout(() => setAnimatedItems([1, 2, 3, 4, 5, 6, 7, 8]), 300);
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
      setAnimatedItems([]);
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        setScrollProgress((scrollTop / (scrollHeight - clientHeight)) * 100 || 0);
      }
    };
    const content = contentRef.current;
    if (content) content.addEventListener("scroll", handleScroll);
    return () => { if (content) content.removeEventListener("scroll", handleScroll); };
  }, [isOpen]);

  if (!isOpen || !method) return null;

  const getMethodDetails = (m) => {
    const detailsMap = {
      UT: {
        fullName: "Ultrasonic Testing",
        tagline: "Precision Sound Wave Inspection",
        overview: "Ultrasonic Testing (UT) is an advanced non-destructive testing (NDT) technique that uses high-frequency sound waves to detect internal flaws, measure material thickness, and evaluate material integrity. It identifies discontinuities such as cracks, laminations, inclusions, and lack of fusion in welds and base materials. UT provides accurate defect location, depth, and size assessment without damaging the component. It is widely used for weld inspection, castings, forgings, pipelines, pressure vessels, and structural components to ensure quality, reliability, and operational safety.",
        workingPrinciple: "A transducer generates high-frequency sound waves (0.5-25 MHz) that travel through the material. When these waves encounter a boundary or defect, they reflect back to the transducer. The time taken for the wave to return is analyzed to determine the location, size, and orientation of the defect.",
        equipment: [
          { name: "Digital Flaw Detector", icon: "📡", description: "Advanced signal processing" },
          { name: "Phased Array Probes", icon: "🔍", description: "Multi-element transducers" },
          { name: "Thickness Gauges", icon: "📏", description: "Precision measurement" },
          { name: "Couplants", icon: "💧", description: "Acoustic coupling media" },
          { name: "Calibration Blocks", icon: "⬛", description: "Reference standards" },
          { name: "Scanning Systems", icon: "🔄", description: "Automated scanners" },
        ],
        applicationsDetailed: [
          { name: "Weld Inspection", percent: 95, description: "Critical weld joints in pipelines and pressure vessels" },
          { name: "Corrosion Mapping", percent: 88, description: "Storage tanks, pipelines, and structural components" },
          { name: "Bond Testing", percent: 75, description: "Composite materials and adhesive bonds" },
          { name: "Thickness Measurement", percent: 92, description: "Wall thickness of pipes, tanks, and plates" },
          { name: "Forging Inspection", percent: 85, description: "Internal defects in forged components" },
        ],
        standardsList: [
          { code: "ASTM E317", description: "Evaluating Performance of UT Systems" },
          { code: "ISO 17640", description: "Ultrasonic Testing of Welds" },
          { code: "ASME Section V", description: "Nondestructive Examination" },
          { code: "AWS D1.1", description: "Structural Welding Code" },
          { code: "ASTM E797", description: "Measuring Thickness by UT" },
        ],
        specificationsDetailed: [
          { property: "Frequency Range", value: "0.5 - 25 MHz", icon: "📡" },
          { property: "Penetration Depth", value: "Up to 10 meters", icon: "📏" },
          { property: "Resolution", value: "0.1 mm", icon: "🔍" },
          { property: "Scan Speed", value: "1000 mm/s", icon: "⚡" },
          { property: "Temperature Range", value: "-20°C to 500°C", icon: "🌡️" },
          { property: "Accreditation", value: "NABL Accredited", icon: "🏅" },
          { property: "Data Recording", value: "Full A-Scan", icon: "💾" },
          { property: "Reporting", value: "Digital & PDF", icon: "📊" },
        ],
        advantagesDetailed: [
          { title: "Deep Penetration", description: "Can inspect thick materials up to 10m", icon: "🎯" },
          { title: "High Sensitivity", description: "Detects very small defects", icon: "🔬" },
          { title: "Digital Imaging", description: "A-scan, B-scan, C-scan displays", icon: "📸" },
          { title: "Real-time Results", description: "Immediate on-site interpretation", icon: "⚡" },
          { title: "Portable Equipment", description: "Field-deployable systems", icon: "🎒" },
          { title: "Only One Surface", description: "Access to one side required", icon: "👁️" },
        ],
        industriesDetailed: [
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipelines", "Pressure Vessels", "Storage Tanks"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Fuselage", "Engine Components", "Composite Structures"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Turbine Blades", "Boiler Tubes", "Nuclear Components"] },
          { name: "Automotive", icon: <Car size={20} />, applications: ["Engine Blocks", "Drive Shafts", "Welded Assemblies"] },
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Steel Structures", "Bridges", "High-rise Buildings"] },
        ],
        faqs: [
          { q: "What materials can be tested?", a: "UT works on most solid materials including metals, plastics, ceramics, and composites." },
          { q: "How accurate is UT?", a: "Modern UT equipment can detect defects as small as 0.1mm with proper technique." },
          { q: "Is UT safe?", a: "Yes, UT is completely safe as it uses sound waves, not radiation." },
          { q: "What training is required?", a: "ASNT Level II or III certification is recommended for critical inspections." },
        ],
      },

      MPT: {
        fullName: "Magnetic Particle Testing",
        tagline: "Magnetic Field Flaw Detection",
        overview: "Magnetic Particle Testing (MPT) is an effective non-destructive testing (NDT) technique used to detect surface and near-surface discontinuities in ferromagnetic materials. It works by magnetizing the component and applying magnetic particles that accumulate at leakage fields caused by defects, making discontinuities visible during inspection. MPT is widely used to identify cracks, seams, laps, and other defects in iron, steel, nickel, and cobalt-based alloys. It is commonly applied in weld inspection, castings, forgings, and industrial components to ensure material integrity, quality, and operational safety.",
        workingPrinciple: "The test part is magnetized, creating a magnetic field within the material. When the field encounters a discontinuity perpendicular to its direction, magnetic flux leaks out, creating a local magnetic pole. Iron particles (dry or suspended in liquid) are applied and are attracted to these leakage fields, forming visible indications of the defect.",
        equipment: [
          { name: "Magnetizing Yokes", icon: "🧲", description: "AC/DC electromagnetic yokes" },
          { name: "Prods & Coils", icon: "🔌", description: "Contact and coil magnetization" },
          { name: "UV Lamps", icon: "🔦", description: "Black light for fluorescent particles" },
          { name: "Particle Applicators", icon: "💨", description: "Dry and wet particle dispensers" },
          { name: "Gauss Meters", icon: "📊", description: "Field strength measurement" },
          { name: "Demagnetizers", icon: "❌", description: "Post-inspection demagnetization" },
        ],
        applicationsDetailed: [
          { name: "Weld Inspection", percent: 90, description: "Surface cracks in welds and HAZ" },
          { name: "Forging Inspection", percent: 88, description: "Laps, seams, and cracks in forgings" },
          { name: "Castings", percent: 85, description: "Surface defects in iron castings" },
          { name: "Railway Components", percent: 92, description: "Rails, wheels, and axles" },
          { name: "Automotive Parts", percent: 87, description: "Critical safety components" },
        ],
        standardsList: [
          { code: "ASTM E709", description: "Magnetic Particle Testing" },
          { code: "ISO 9934", description: "Magnetic Particle Testing" },
          { code: "ASME Section V", description: "Nondestructive Examination" },
          { code: "ASTM E1444", description: "Magnetic Particle Testing" },
          { code: "AWS D1.1", description: "Structural Welding Code" },
        ],
        specificationsDetailed: [
          { property: "Magnetizing Current", value: "AC / DC / HWDC", icon: "🧲" },
          { property: "Field Strength", value: "≥ 2400 A/m", icon: "⚡" },
          { property: "Particle Type", value: "Dry / Wet / Fluorescent", icon: "✨" },
          { property: "Sensitivity Level", value: "Level 3-4", icon: "🎯" },
          { property: "UV Light Intensity", value: "1000 μW/cm²", icon: "🔦" },
          { property: "Temperature Range", value: "10-52°C", icon: "🌡️" },
          { property: "Equipment Type", value: "Yoke / Prod / Bench", icon: "🔧" },
          { property: "Accreditation", value: "NABL Accredited", icon: "🏅" },
        ],
        advantagesDetailed: [
          { title: "Immediate Results", description: "Real-time indication formation", icon: "⚡" },
          { title: "Surface & Subsurface", description: "Detects both surface and near-surface defects", icon: "🔍" },
          { title: "Easy Interpretation", description: "Visual indications are straightforward", icon: "👁️" },
          { title: "Cost-Effective", description: "Lower cost than many other methods", icon: "💰" },
          { title: "Portable", description: "Field-deployable equipment", icon: "🎒" },
          { title: "High Sensitivity", description: "Detects very fine defects", icon: "🔬" },
        ],
        industriesDetailed: [
          { name: "Automotive", icon: <Car size={20} />, applications: ["Safety Components", "Engine Parts", "Suspension"] },
          { name: "Railway", icon: <Truck size={20} />, applications: ["Rails", "Wheels", "Axles"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Landing Gear", "Engine Mounts", "Fasteners"] },
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Steel Structures", "Bolts", "Welds"] },
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipelines", "Valves", "Flanges"] },
        ],
        faqs: [
          { q: "What materials can be tested?", a: "MPT only works on ferromagnetic materials like iron, nickel, and cobalt alloys." },
          { q: "Can it detect internal defects?", a: "MPT detects surface and near-surface defects (up to ~3mm deep)." },
          { q: "Is demagnetization required?", a: "Yes, for most applications, parts must be demagnetized after testing." },
          { q: "What is the difference between dry and wet particles?", a: "Wet particles are more sensitive for fine defects; dry particles are better for rough surfaces." },
        ],
      },

      DPT: {
        fullName: "Dye Penetrant Testing",
        tagline: "Liquid Penetrant Surface Inspection",
        overview: "Dye Penetrant Testing (DPT) is a widely used non-destructive testing (NDT) technique for detecting surface-breaking defects in non-porous materials. It uses a colored or fluorescent penetrant that enters surface discontinuities through capillary action, making defects visible during inspection. DPT is effective for identifying cracks, porosity, laps, seams, and other surface imperfections in metals and other suitable non-porous materials. It is widely used in manufacturing, fabrication, welding, and quality control to ensure product integrity, reliability, and compliance with inspection requirements.",
        workingPrinciple: "A liquid penetrant is applied to the clean surface and allowed to dwell. The penetrant enters surface-breaking defects through capillary action. After removing excess penetrant, a developer is applied that draws the penetrant out of defects, creating visible indications. Fluorescent penetrants are viewed under UV light for higher sensitivity.",
        equipment: [
          { name: "Penetrant Sprays", icon: "🌈", description: "Visible and fluorescent penetrants" },
          { name: "Developer", icon: "💨", description: "Dry, water-soluble, and solvent-based" },
          { name: "Cleaners", icon: "🧴", description: "Pre and post-cleaning agents" },
          { name: "UV Lamps", icon: "🔦", description: "Black lights for fluorescent inspection" },
          { name: "Spray Booths", icon: "🏗️", description: "Controlled application environments" },
          { name: "Drying Ovens", icon: "🔥", description: "Controlled temperature drying" },
        ],
        applicationsDetailed: [
          { name: "Weld Inspection", percent: 92, description: "Surface cracks in welds" },
          { name: "Casting Inspection", percent: 88, description: "Porosity, cracks, and shrinkage" },
          { name: "Forging Inspection", percent: 85, description: "Laps, seams, and cracks" },
          { name: "Machined Parts", percent: 90, description: "Grinding cracks, heat treat cracks" },
          { name: "Aerospace Components", percent: 94, description: "Critical safety parts" },
        ],
        standardsList: [
          { code: "ASTM E165", description: "Liquid Penetrant Testing" },
          { code: "ISO 3452", description: "Penetrant Testing" },
          { code: "ASME Section V", description: "Nondestructive Examination" },
          { code: "ASTM E1417", description: "Liquid Penetrant Testing" },
          { code: "AMS 2644", description: "Penetrant Inspection" },
        ],
        specificationsDetailed: [
          { property: "Sensitivity Level", value: "Level 1-4", icon: "🔬" },
          { property: "Developer Type", value: "Dry/Non-aq/Aq", icon: "💧" },
          { property: "Penetrant Type", value: "Fluorescent/Visible", icon: "🌈" },
          { property: "Removal Method", value: "Water/Solvent", icon: "🚿" },
          { property: "Dwell Time", value: "5-60 min", icon: "⏱️" },
          { property: "Temperature Range", value: "10-52°C", icon: "🌡️" },
          { property: "Light Intensity", value: "1000+ lux", icon: "💡" },
          { property: "Accreditation", value: "NABL Accredited", icon: "🏅" },
        ],
        advantagesDetailed: [
          { title: "Portable Equipment", description: "Easy to carry and use in field", icon: "🎒" },
          { title: "High Sensitivity", description: "Detects very fine surface cracks", icon: "🔬" },
          { title: "Low Cost", description: "Economical compared to other methods", icon: "💰" },
          { title: "Quick Results", description: "Fast indication development", icon: "⚡" },
          { title: "Easy to Use", description: "Simple application process", icon: "👌" },
          { title: "All Non-Porous", description: "Works on most non-porous materials", icon: "🧱" },
        ],
        industriesDetailed: [
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Turbine Blades", "Structural Parts", "Fasteners"] },
          { name: "Automotive", icon: <Car size={20} />, applications: ["Engine Parts", "Transmission", "Safety Components"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Turbine Components", "Piping", "Valves"] },
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipelines", "Pressure Vessels", "Valves"] },
          { name: "Manufacturing", icon: <Factory size={20} />, applications: ["Machined Parts", "Castings", "Forgings"] },
        ],
        faqs: [
          { q: "What materials can be tested?", a: "DPT works on any non-porous material including metals, plastics, ceramics, and glass." },
          { q: "How deep can it detect?", a: "DPT only detects surface-breaking defects; it cannot find internal flaws." },
          { q: "What is the difference between visible and fluorescent?", a: "Fluorescent penetrants are more sensitive and require UV light for viewing." },
          { q: "How long does testing take?", a: "Typical dwell time is 5-30 minutes, with total testing time of 30-60 minutes." },
        ],
      },

      ECT: {
        fullName: "Eddy Current Testing",
        tagline: "Electromagnetic Induction Inspection",
        overview: "Eddy Current Testing (ECT) is an advanced non-destructive testing (NDT) technique that uses electromagnetic induction to detect surface and near-surface defects in electrically conductive materials. It identifies discontinuities such as cracks, corrosion, pitting, and material variations without damaging the component. ECT is widely used for heat exchanger tube inspection, aircraft structures, conductive material evaluation, and coating thickness measurement. It offers fast inspection, high sensitivity, and reliable results, helping ensure material quality, component integrity, and operational safety.",
        workingPrinciple: "An alternating current is passed through a coil, creating a changing magnetic field. When brought near a conductive material, this field induces circular currents (eddy currents) in the material. Defects or property changes alter the eddy current flow, changing the coil's impedance, which is measured and analyzed.",
        equipment: [
          { name: "Eddy Current Instruments", icon: "📊", description: "Impedance analyzers" },
          { name: "Probes & Coils", icon: "🔌", description: "Various configurations" },
          { name: "Tube Inspection Systems", icon: "🔧", description: "Heat exchanger testing" },
          { name: "Reference Standards", icon: "⬛", description: "Calibration blocks" },
          { name: "Analysis Software", icon: "💻", description: "Signal processing" },
          { name: "Rotating Probes", icon: "🔄", description: "For hole inspection" },
        ],
        applicationsDetailed: [
          { name: "Heat Exchanger Tubes", percent: 95, description: "Tube wall thinning and cracks" },
          { name: "Aircraft Structures", percent: 90, description: "Skin cracks and corrosion" },
          { name: "Coating Thickness", percent: 88, description: "Non-conductive coatings on metal" },
          { name: "Conductivity Testing", percent: 85, description: "Material sorting and verification" },
          { name: "Hole Inspection", percent: 92, description: "Fastener hole cracks" },
        ],
        standardsList: [
          { code: "ASTM E426", description: "Eddy Current Testing" },
          { code: "ISO 15548", description: "Eddy Current Testing Equipment" },
          { code: "ASME Section V", description: "Nondestructive Examination" },
          { code: "ASTM E243", description: "Eddy Current Testing of Tubes" },
          { code: "NAS 410", description: "Aerospace Certification" },
        ],
        specificationsDetailed: [
          { property: "Frequency Range", value: "10 Hz - 10 MHz", icon: "📡" },
          { property: "Penetration Depth", value: "0.5 - 5 mm", icon: "📏" },
          { property: "Probe Types", value: "Absolute/Differential", icon: "🔌" },
          { property: "Coating Range", value: "0-25 μm", icon: "🎨" },
          { property: "Temperature Range", value: "-20°C to 200°C", icon: "🌡️" },
          { property: "Data Rate", value: "Up to 1 MHz", icon: "⚡" },
          { property: "Channels", value: "1-64 channels", icon: "📊" },
          { property: "Standards", value: "ASTM E426, ISO 15548", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "No Couplant", description: "Doesn't require acoustic coupling", icon: "🚫" },
          { title: "High Speed", description: "Fast scanning for large areas", icon: "⚡" },
          { title: "Automated", description: "Easy to automate for production", icon: "🤖" },
          { title: "Tube Inspection", description: "Excellent for heat exchanger tubes", icon: "🔧" },
          { title: "Portable", description: "Field-deployable systems", icon: "🎒" },
          { title: "Multi-Parameter", description: "Can measure multiple properties", icon: "📊" },
        ],
        industriesDetailed: [
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Heat Exchangers", "Condensers", "Steam Generators"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Skin Inspection", "Bolt Holes", "Engine Components"] },
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipelines", "Heat Exchangers", "Tubing"] },
          { name: "Automotive", icon: <Car size={20} />, applications: ["Surface Hardness", "Case Depth", "Crack Detection"] },
          { name: "Manufacturing", icon: <Factory size={20} />, applications: ["Material Sorting", "Coating Thickness", "Conductivity"] },
        ],
        faqs: [
          { q: "What materials can be tested?", a: "ECT only works on conductive materials like metals and carbon composites." },
          { q: "How deep can it detect?", a: "Typical penetration is 0.5-5mm depending on material and frequency." },
          { q: "Can it inspect hot surfaces?", a: "Yes, with special probes, temperatures up to 200°C can be inspected." },
          { q: "Is it sensitive to lift-off?", a: "Yes, lift-off variation affects readings; special techniques compensate for this." },
        ],
      },

      PAUT: {
        fullName: "Phased Array Ultrasonic Testing",
        tagline: "Advanced Multi-Element UT Imaging",
        overview: "Phased Array Ultrasonic Testing (PAUT) is an advanced ultrasonic technique that uses multiple small elements in a single probe. By controlling the timing of each element, the beam can be steered, focused, and swept electronically, providing detailed 2D and 3D imaging of defects. It enables accurate detection and evaluation of cracks, lack of fusion, lack of penetration, and other internal discontinuities. PAUT offers improved inspection coverage, faster testing, and reliable defect characterization for welds, pipelines, pressure vessels, and other critical industrial components, ensuring quality, safety, and structural integrity.",
        workingPrinciple: "A phased array probe contains 16-128 individual elements. By applying time delays (focal laws) to each element, the ultrasonic beam can be steered at different angles, focused at different depths, and swept electronically without moving the probe. This creates detailed cross-sectional images (S-scan) for accurate defect sizing.",
        equipment: [
          { name: "Phased Array Units", icon: "📡", description: "Multi-channel controllers" },
          { name: "Array Probes", icon: "🔍", description: "16-128 element probes" },
          { name: "Encoders", icon: "📏", description: "Position tracking" },
          { name: "Scanning Systems", icon: "🔄", description: "Manual and automated" },
          { name: "Analysis Software", icon: "💻", description: "Tomoview, UltraVision" },
          { name: "Calibration Blocks", icon: "⬛", description: "ASME, ISO standards" },
        ],
        applicationsDetailed: [
          { name: "Weld Inspection", percent: 96, description: "Critical welds with full imaging" },
          { name: "Corrosion Mapping", percent: 92, description: "Detailed C-scan mapping" },
          { name: "Composite Inspection", percent: 88, description: "Delamination and porosity" },
          { name: "Thick Sections", percent: 90, description: "Up to 500mm thickness" },
          { name: "Complex Geometries", percent: 94, description: "Difficult access areas" },
        ],
        standardsList: [
          { code: "ASME Section V", description: "Phased Array Examination" },
          { code: "ISO 13588", description: "PAUT of Welds" },
          { code: "ASTM E2491", description: "PAUT Characterization" },
          { code: "AWS D1.1", description: "Structural Welding" },
          { code: "ASME BPVC", description: "Boiler & Pressure Vessel" },
        ],
        specificationsDetailed: [
          { property: "Elements", value: "16-128 elements", icon: "📡" },
          { property: "Frequency Range", value: "0.5-18 MHz", icon: "📊" },
          { property: "Beam Steering", value: "±80 degrees", icon: "🎯" },
          { property: "Focus Depth", value: "0-500 mm", icon: "📏" },
          { property: "Scan Types", value: "A/B/C/D/S-scan", icon: "📸" },
          { property: "Data Storage", value: "Full raw data", icon: "💾" },
          { property: "Display", value: "3D imaging", icon: "🖥️" },
          { property: "Standards", value: "ISO 13588, ASME V", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "3D Imaging", description: "Detailed 3D defect visualization", icon: "🎯" },
          { title: "High Resolution", description: "Excellent defect sizing accuracy", icon: "🔬" },
          { title: "Multiple Angles", description: "Electronic beam steering", icon: "📐" },
          { title: "Fast Scanning", description: "Rapid area coverage", icon: "⚡" },
          { title: "Better Sizing", description: "Accurate defect length/height", icon: "📏" },
          { title: "Permanent Record", description: "Full data archival", icon: "💾" },
        ],
        industriesDetailed: [
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipeline Girth Welds", "Pressure Vessels", "Offshore Structures"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Turbine Components", "Piping Welds", "Nuclear Components"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Composite Structures", "Engine Components", "Fuselage"] },
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Steel Bridges", "High-rise Welds", "Stadium Structures"] },
          { name: "Shipbuilding", icon: <Ship size={20} />, applications: ["Hull Welds", "Pressure Vessels", "Piping Systems"] },
        ],
        faqs: [
          { q: "How is PAUT different from conventional UT?", a: "PAUT uses multiple elements for electronic beam control, providing 2D/3D imaging and faster scanning." },
          { q: "What is the advantage over RT?", a: "PAUT provides 3D data, no radiation safety issues, and better defect sizing for planar defects." },
          { q: "How long does inspection take?", a: "Typically faster than conventional UT due to electronic scanning." },
          { q: "What certifications are needed?", a: "ASNT Level II in PAUT, plus specific equipment training." },
        ],
      },

      TOFD: {
        fullName: "Time of Flight Diffraction",
        tagline: "Diffracted-Signal Weld Inspection",
        overview: "Time of Flight Diffraction (TOFD) is an advanced ultrasonic non-destructive testing (NDT) technique that uses diffracted ultrasonic signals from defect tips to detect, locate, and size internal weld defects with high accuracy. It provides reliable defect sizing and through-wall height measurement, making it effective for detecting cracks, lack of fusion, and other internal discontinuities. TOFD offers fast inspection, excellent coverage, and accurate results for welds, pipelines, pressure vessels, and other critical industrial components, ensuring quality, safety, and structural integrity.",
        workingPrinciple: "Two probes — one transmitter, one receiver — are placed on either side of the weld. The diffracted signals from the upper and lower tips of a defect are used to size it independent of amplitude.",
        equipment: [
          { name: "TOFD Scanner", icon: "🔧", description: "Encoded dual-probe scanner" },
          { name: "Dual Probes", icon: "📡", description: "Matching frequency pairs" },
          { name: "Encoders", icon: "📏", description: "Position tracking" },
          { name: "Analysis Software", icon: "💻", description: "D-scan imaging" },
          { name: "Calibration Blocks", icon: "⬛", description: "Reference standards" },
          { name: "Couplant System", icon: "💧", description: "Water or gel feed" },
        ],
        applicationsDetailed: [
          { name: "Weld Inspection", percent: 95, description: "Internal weld defects" },
          { name: "Crack Detection", percent: 92, description: "Planar defects and lack of fusion" },
          { name: "Defect Sizing", percent: 96, description: "Height/length measurement" },
          { name: "Pressure Vessels", percent: 88, description: "Shell and nozzle welds" },
          { name: "Pipeline Inspection", percent: 90, description: "Girth welds" },
        ],
        standardsList: [
          { code: "ASME Section V", description: "TOFD Examination" },
          { code: "ISO 10863", description: "TOFD of Welds" },
          { code: "ASTM E2373", description: "TOFD Practice" },
          { code: "EN ISO 15626", description: "TOFD Acceptance" },
          { code: "ASME BPVC", description: "Boiler & Pressure Vessel" },
        ],
        specificationsDetailed: [
          { property: "Frequency Range", value: "2-10 MHz", icon: "📡" },
          { property: "Wall Thickness", value: "6-300 mm", icon: "📏" },
          { property: "Sizing Accuracy", value: "±1 mm", icon: "🎯" },
          { property: "Scan Speed", value: "50-150 mm/s", icon: "⚡" },
          { property: "Data Storage", value: "Full D-scan", icon: "💾" },
          { property: "Temperature Range", value: "0-200°C", icon: "🌡️" },
          { property: "Probe Angles", value: "45°/60°/70°", icon: "📐" },
          { property: "Standards", value: "ISO 10863, ASME V", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "Accurate Sizing", description: "Height measurement independent of amplitude", icon: "🎯" },
          { title: "High Coverage", description: "Nearly 100% weld volume coverage", icon: "📊" },
          { title: "Digital Records", description: "Permanent D-scan archive", icon: "💾" },
          { title: "Fast Inspection", description: "Single-pass weld scanning", icon: "⚡" },
          { title: "Reliable Crack Detection", description: "Strong at planar defects", icon: "🔬" },
          { title: "Complementary with PAUT", description: "Combines well with phased array", icon: "🔗" },
        ],
        industriesDetailed: [
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipeline Girth Welds", "Pressure Vessels", "Refinery Piping"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Boiler Welds", "Steam Lines", "Nuclear Components"] },
          { name: "Petrochemical", icon: <FlaskConical size={20} />, applications: ["Reactors", "Heat Exchangers", "Process Piping"] },
          { name: "Shipbuilding", icon: <Ship size={20} />, applications: ["Hull Welds", "Pressure Vessels", "Piping"] },
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Steel Bridges", "Structural Welds", "Heavy Fabrication"] },
        ],
        faqs: [
          { q: "What is the main advantage of TOFD?", a: "TOFD sizes defects based on diffraction timing, which is largely independent of signal amplitude — giving very reliable height measurement." },
          { q: "What are TOFD's limitations?", a: "It struggles with near-surface defects (dead zone) and requires smooth weld caps." },
          { q: "Is TOFD a stand-alone method?", a: "Usually combined with PAUT for complete weld coverage." },
          { q: "What certifications are needed?", a: "ASNT Level II in TOFD." },
        ],
      },

      PMI: {
        fullName: "Positive Material Identification",
        tagline: "Material Composition Verification",
        overview: "Positive Material Identification (PMI) is a non-destructive testing (NDT) method used to verify the chemical composition and confirm the alloy grade of metallic materials. It helps identify elements such as chromium, nickel, molybdenum, and other alloying elements to ensure material compliance with specified standards and requirements. PMI is widely used in pipelines, pressure vessels, petrochemical plants, power generation, and other critical industrial applications to prevent material mix-ups, ensure quality, and maintain operational safety and reliability.",
        workingPrinciple: "PMI uses either X-ray Fluorescence (XRF) or Optical Emission Spectrometry (OES) to analyze material composition. XRF measures the characteristic X-rays emitted when a material is exposed to X-rays. OES uses an electric arc to excite atoms, measuring the emitted light spectrum to determine elemental composition.",
        equipment: [
          { name: "XRF Analyzers", icon: "📡", description: "Handheld X-ray fluorescence" },
          { name: "OES Analyzers", icon: "⚡", description: "Optical emission spectrometers" },
          { name: "LIBS Analyzers", icon: "💥", description: "Laser-induced breakdown" },
          { name: "Reference Standards", icon: "⬛", description: "Certified reference materials" },
          { name: "Alloy Libraries", icon: "📚", description: "Grade databases" },
          { name: "Analysis Software", icon: "💻", description: "Composition matching" },
        ],
        applicationsDetailed: [
          { name: "Alloy Verification", percent: 98, description: "Confirm material grade" },
          { name: "Material Certification", percent: 95, description: "Certify incoming materials" },
          { name: "Scrap Sorting", percent: 90, description: "Sort alloys for recycling" },
          { name: "Quality Control", percent: 92, description: "Verify during manufacturing" },
          { name: "Grade Confirmation", percent: 96, description: "Confirm before critical use" },
        ],
        standardsList: [
          { code: "ASTM E1476", description: "Material Identification" },
          { code: "ISO 17025", description: "Testing Laboratory Competence" },
          { code: "ASME Section II", description: "Materials Specifications" },
          { code: "ASTM E1257", description: "XRF Analysis" },
          { code: "API 578", description: "Material Verification" },
        ],
        specificationsDetailed: [
          { property: "Elements Analyzed", value: "Mg to U (XRF)", icon: "⚛️" },
          { property: "Detection Limits", value: "ppm to % levels", icon: "📊" },
          { property: "Analysis Time", value: "1-30 seconds", icon: "⏱️" },
          { property: "XRF Spot Size", value: "1-10 mm", icon: "🔍" },
          { property: "OES Spot Size", value: "~1 mm", icon: "🎯" },
          { property: "Temperature Range", value: "Up to 500°C", icon: "🌡️" },
          { property: "Portability", value: "Handheld available", icon: "🎒" },
          { property: "Standards", value: "ASTM E1476, API 578", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "Non-Destructive", description: "No damage to tested material", icon: "✨" },
          { title: "Quick Results", description: "Results in seconds", icon: "⚡" },
          { title: "Portable", description: "Handheld XRF available", icon: "🎒" },
          { title: "High Accuracy", description: "Laboratory-grade precision", icon: "🎯" },
          { title: "Real-time", description: "Immediate grade identification", icon: "📊" },
          { title: "Alloy Library", description: "Matches thousands of grades", icon: "📚" },
        ],
        industriesDetailed: [
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Piping Materials", "Valves", "Fittings"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Turbine Materials", "Boiler Tubes", "Piping"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Critical Alloys", "Engine Materials", "Fasteners"] },
          { name: "Petrochemical", icon: <FlaskConical size={20} />, applications: ["Reactor Materials", "Heat Exchangers", "Piping"] },
          { name: "Manufacturing", icon: <Factory size={20} />, applications: ["Incoming Inspection", "Process Control", "Final Verification"] },
        ],
        faqs: [
          { q: "What is the difference between XRF and OES?", a: "XRF is more portable and non-destructive; OES is more accurate for light elements and carbon." },
          { q: "Can PMI detect carbon?", a: "XRF cannot detect carbon; OES or LIBS is required for carbon analysis." },
          { q: "How accurate is handheld XRF?", a: "Modern handheld XRF can achieve laboratory-quality results for most alloying elements." },
          { q: "Is PMI required by code?", a: "Yes, API 578 and many other codes require PMI for critical service materials." },
        ],
      },

      SPECTRO: {
        fullName: "Portable Spectrometer Analysis",
        tagline: "Field Chemical Composition Analysis",
        overview: "Portable Spectrometer Analysis is a reliable material testing technique that uses handheld X-ray fluorescence (XRF) or optical emission spectroscopy (OES) technology to identify the chemical composition of metals and alloys directly in the field. It helps verify alloy grades and analyze elements such as chromium, nickel, molybdenum, manganese, and copper to ensure material compliance with specified standards. This technique is widely used for positive material identification (PMI), quality control, incoming material inspection, and scrap sorting across industries such as oil and gas, petrochemical, power generation, and manufacturing, ensuring material traceability, accuracy, and reliability.",
        workingPrinciple: "Optical Emission Spectrometry (OES) uses an electric arc or spark to excite atoms in the material. The excited atoms emit light at characteristic wavelengths, which is analyzed to determine elemental composition. XRF uses X-rays to excite atoms, measuring emitted X-ray fluorescence.",
        equipment: [
          { name: "Handheld OES", icon: "⚡", description: "Battery-operated spectrometers" },
          { name: "Handheld XRF", icon: "📡", description: "X-ray fluorescence analyzers" },
          { name: "LIBS Units", icon: "💥", description: "Laser-induced breakdown" },
          { name: "Probes & Cables", icon: "🔌", description: "Various probe configurations" },
          { name: "Reference Materials", icon: "⬛", description: "Certified standards" },
          { name: "Carrying Cases", icon: "🧰", description: "Field-ready kits" },
        ],
        applicationsDetailed: [
          { name: "Metal Sorting", percent: 95, description: "Rapid alloy identification" },
          { name: "Alloy Analysis", percent: 92, description: "Full composition analysis" },
          { name: "Quality Control", percent: 90, description: "Incoming/outgoing inspection" },
          { name: "Scrap Recycling", percent: 88, description: "Sorting for recycling" },
          { name: "Field Inspection", percent: 94, description: "On-site material verification" },
        ],
        standardsList: [
          { code: "ASTM E415", description: "Optical Emission Analysis" },
          { code: "ISO 17025", description: "Testing Laboratory Competence" },
          { code: "ASTM E1257", description: "XRF Analysis" },
          { code: "ASTM E322", description: "X-Ray Emission Spectrometry" },
          { code: "API 578", description: "Material Verification" },
        ],
        specificationsDetailed: [
          { property: "Analysis Time", value: "1-10 seconds", icon: "⏱️" },
          { property: "Elements", value: "Up to 30+ elements", icon: "⚛️" },
          { property: "Detection Limit", value: "ppm levels", icon: "📊" },
          { property: "Spot Size", value: "1-5 mm", icon: "🎯" },
          { property: "Weight", value: "1.5-3 kg", icon: "⚖️" },
          { property: "Battery Life", value: "8-12 hours", icon: "🔋" },
          { property: "Display", value: "Touchscreen color", icon: "📱" },
          { property: "Standards", value: "ASTM E415, E1257", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "Handheld", description: "True portability for field use", icon: "🎒" },
          { title: "Fast Results", description: "Results in seconds", icon: "⚡" },
          { title: "Multi-Element", description: "Analyzes many elements simultaneously", icon: "📊" },
          { title: "Non-Destructive", description: "XRF is completely non-destructive", icon: "✨" },
          { title: "Field Deployable", description: "Battery-powered operation", icon: "🔋" },
          { title: "Alloy Library", description: "Built-in grade database", icon: "📚" },
        ],
        industriesDetailed: [
          { name: "Manufacturing", icon: <Factory size={20} />, applications: ["Incoming Inspection", "Process Control", "Final QC"] },
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Piping Verification", "Valve Inspection", "Weld Verification"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Critical Alloys", "Fastener Verification", "Engine Parts"] },
          { name: "Recycling", icon: <Container size={20} />, applications: ["Scrap Sorting", "Alloy Separation", "Quality Grading"] },
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Steel Verification", "Bolt Inspection", "Structural Materials"] },
        ],
        faqs: [
          { q: "What is the difference between OES and XRF?", a: "OES is better for light elements and carbon; XRF is better for heavy elements and is non-destructive." },
          { q: "Can it analyze carbon?", a: "Handheld OES can analyze carbon; XRF cannot." },
          { q: "How accurate is it?", a: "Modern portable spectrometers can achieve laboratory-quality results for most elements." },
          { q: "What training is required?", a: "Basic operator training is usually sufficient; advanced interpretation may require more." },
        ],
      },

      Hardness: {
        fullName: "Portable Hardness Testing",
        tagline: "Non-Destructive Hardness Measurement",
        overview: "Portable Hardness Testing is a non-destructive or minimally invasive testing technique used to evaluate the hardness of metallic materials directly at the inspection site. It uses methods such as Ultrasonic Contact Impedance (UCI) and rebound (Leeb) testing to measure material hardness with minimal surface preparation and little to no damage. This technique helps assess material strength, verify heat treatment, and evaluate hardness variations in welds and heat-affected zones. It is widely used for testing large components, pipelines, pressure vessels, castings, forgings, and in-service equipment to ensure material quality, reliability, and compliance with specified requirements.",
        workingPrinciple: "UCI method uses a diamond indenter attached to a vibrating rod. The frequency change when the indenter contacts the material is related to hardness. Leeb method measures the rebound velocity of an impact body. Both methods provide portable, fast hardness readings.",
        equipment: [
          { name: "UCI Hardness Testers", icon: "📊", description: "Ultrasonic contact impedance" },
          { name: "Leeb Testers", icon: "🔨", description: "Rebound hardness testers" },
          { name: "Probes & Indenters", icon: "🔧", description: "Various configurations" },
          { name: "Reference Blocks", icon: "⬛", description: "Calibration standards" },
          { name: "Software", icon: "💻", description: "Data management" },
          { name: "Accessories", icon: "🧰", description: "Support rings, cables" },
        ],
        applicationsDetailed: [
          { name: "Heat Affected Zones", percent: 94, description: "Weld HAZ hardness testing" },
          { name: "Large Components", percent: 92, description: "In-situ testing of large parts" },
          { name: "In-service Inspection", percent: 90, description: "Operating equipment testing" },
          { name: "Weld Hardness", percent: 95, description: "Weld and HAZ hardness" },
          { name: "Coating Hardness", percent: 85, description: "Thin coating measurement" },
        ],
        standardsList: [
          { code: "ASTM A1038", description: "Portable Hardness Testing" },
          { code: "ISO 16859", description: "Leeb Hardness Test" },
          { code: "ASTM E110", description: "Portable Hardness Testers" },
          { code: "ASTM E956", description: "Leeb Hardness Testing" },
          { code: "ASME BPVC", description: "Boiler & Pressure Vessel" },
        ],
        specificationsDetailed: [
          { property: "Hardness Scales", value: "HRC, HB, HV, HL", icon: "📊" },
          { property: "Measurement Range", value: "50-1000 HV", icon: "📏" },
          { property: "Accuracy", value: "±3% or ±5 HL", icon: "🎯" },
          { property: "Min Thickness", value: "0.1 mm (UCI)", icon: "📐" },
          { property: "Weight", value: "0.5-2 kg", icon: "⚖️" },
          { property: "Temperature Range", value: "0-50°C", icon: "🌡️" },
          { property: "Data Storage", value: "1000+ readings", icon: "💾" },
          { property: "Standards", value: "ASTM A1038, E110", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "No Surface Damage", description: "Minimal indentation size", icon: "✨" },
          { title: "Portable", description: "Handheld operation", icon: "🎒" },
          { title: "Quick Results", description: "Instant readings", icon: "⚡" },
          { title: "Large Area", description: "Can test large components", icon: "📏" },
          { title: "Multiple Scales", description: "Converts between scales", icon: "📊" },
          { title: "Field Deployable", description: "Battery-powered", icon: "🔋" },
        ],
        industriesDetailed: [
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipeline HAZ", "Pressure Vessels", "Valve Bodies"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Turbine Components", "Boiler Tubes", "Piping Welds"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Engine Components", "Landing Gear", "Structural Parts"] },
          { name: "Manufacturing", icon: <Factory size={20} />, applications: ["Heat Treated Parts", "Weld Inspection", "Incoming QC"] },
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Steel Structures", "Bolt Hardness", "Weld HAZ"] },
        ],
        faqs: [
          { q: "What is the difference between UCI and Leeb?", a: "UCI is better for thin materials and HAZ; Leeb is better for large, heavy components." },
          { q: "How accurate is portable hardness testing?", a: "Typical accuracy is ±3% when properly calibrated and applied." },
          { q: "Can it replace bench hardness testing?", a: "For many field applications, yes, but bench testing is still needed for critical components." },
          { q: "What surface preparation is needed?", a: "A smooth, clean surface is required; light grinding may be necessary." },
        ],
      },

      Thickness: {
        fullName: "Ultrasonic Thickness Measurement",
        tagline: "Precision Wall Thickness Gauging",
        overview: "Ultrasonic Thickness Measurement (UTM) is a non-destructive testing (NDT) technique that uses high-frequency sound waves to accurately measure material thickness from one accessible side without damaging the component. It is widely used to monitor corrosion, erosion, and wall thinning in metallic structures and equipment. UTM helps assess material condition, identify potential weak points, and evaluate remaining wall thickness in pipelines, storage tanks, pressure vessels, and industrial components. It plays a vital role in preventive maintenance, asset integrity management, and operational safety by ensuring equipment reliability and compliance with inspection requirements.",
        workingPrinciple: "A transducer sends an ultrasonic pulse into the material. The pulse reflects off the back wall, and the time of flight is measured. Knowing the speed of sound in the material, thickness is calculated as: Thickness = (Velocity × Time) / 2.",
        equipment: [
          { name: "Thickness Gauges", icon: "📏", description: "Digital ultrasonic gauges" },
          { name: "Transducers", icon: "🔌", description: "Various frequencies/sizes" },
          { name: "Couplants", icon: "💧", description: "Acoustic coupling media" },
          { name: "Calibration Blocks", icon: "⬛", description: "Step blocks, reference" },
          { name: "Probes", icon: "🎯", description: "Dual, single, delay line" },
          { name: "Software", icon: "💻", description: "Data logging and analysis" },
        ],
        applicationsDetailed: [
          { name: "Corrosion Monitoring", percent: 98, description: "Pipeline and tank wall thinning" },
          { name: "Tank Inspection", percent: 95, description: "Storage tank floor and shell" },
          { name: "Pipeline Assessment", percent: 94, description: "Oil and gas pipeline integrity" },
          { name: "Pressure Vessels", percent: 92, description: "Vessel wall thickness" },
          { name: "Ship Hulls", percent: 90, description: "Hull plate thickness" },
        ],
        standardsList: [
          { code: "ASTM E797", description: "Thickness by Ultrasonic" },
          { code: "ISO 16809", description: "Thickness Measurement" },
          { code: "ASME Section V", description: "Nondestructive Examination" },
          { code: "ASTM E1930", description: "Thickness Measurement" },
          { code: "API 570", description: "Piping Inspection" },
        ],
        specificationsDetailed: [
          { property: "Thickness Range", value: "0.5 - 500 mm", icon: "📏" },
          { property: "Accuracy", value: "±0.01 mm", icon: "🎯" },
          { property: "Frequency Range", value: "1-15 MHz", icon: "📡" },
          { property: "Temperature Range", value: "-20°C to 500°C", icon: "🌡️" },
          { property: "Display", value: "Digital LCD", icon: "📱" },
          { property: "Data Storage", value: "1000+ readings", icon: "💾" },
          { property: "Battery Life", value: "200+ hours", icon: "🔋" },
          { property: "Standards", value: "ASTM E797, ISO 16809", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "Non-Invasive", description: "Measures from one side only", icon: "✨" },
          { title: "Accurate", description: "High precision measurements", icon: "🎯" },
          { title: "Portable", description: "Handheld field operation", icon: "🎒" },
          { title: "Real-time", description: "Instant digital readout", icon: "⚡" },
          { title: "Multiple Materials", description: "Metals, plastics, glass", icon: "🧱" },
          { title: "Data Logging", description: "Store and transfer readings", icon: "💾" },
        ],
        industriesDetailed: [
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipelines", "Storage Tanks", "Pressure Vessels"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Boiler Tubes", "Steam Lines", "Condensers"] },
          { name: "Marine", icon: <Ship size={20} />, applications: ["Hull Plates", "Piping Systems", "Tanks"] },
          { name: "Chemical", icon: <FlaskConical size={20} />, applications: ["Reactors", "Storage Tanks", "Piping"] },
          { name: "Water Treatment", icon: <Droplets size={20} />, applications: ["Pipes", "Tanks", "Valves"] },
        ],
        faqs: [
          { q: "Can it measure through coatings?", a: "Yes, with echo-to-echo mode, coatings up to 6mm can be ignored." },
          { q: "What affects accuracy?", a: "Temperature, material sound velocity, surface condition, and probe selection." },
          { q: "How often should it be calibrated?", a: "Before each use, or at least daily when in continuous use." },
          { q: "Can it measure hot surfaces?", a: "Yes, with special high-temperature probes up to 500°C." },
        ],
      },

      /* ==================== DT METHODS ==================== */

      Tensile: {
        fullName: "Tensile Testing",
        tagline: "Strength & Ductility Evaluation",
        overview: "Tensile Testing is a destructive testing (DT) method used to determine the mechanical properties of materials by applying a uniaxial pulling force until the specimen fractures. It measures key properties such as yield strength, ultimate tensile strength, elongation, and reduction in area, providing critical data on how materials behave under stress. Tensile testing is widely used for material certification, weld qualification, quality control, and failure analysis across industries to ensure compliance with design and safety requirements.",
        workingPrinciple: "A specimen of known dimensions is mounted in a Universal Testing Machine (UTM) and subjected to a gradually increasing axial tensile load until failure. The applied load and elongation are continuously recorded, producing a stress-strain curve from which yield strength, ultimate tensile strength, elongation, and reduction of area are determined.",
        equipment: [
          { name: "Universal Testing Machine", icon: "⚙️", description: "Electromechanical or servo-hydraulic UTM" },
          { name: "Extensometers", icon: "📏", description: "Precise strain measurement" },
          { name: "Grips & Fixtures", icon: "🔧", description: "Wedge, jaw, and chain grips" },
          { name: "Specimen Preparation Tools", icon: "🛠️", description: "Machining and cutting equipment" },
          { name: "Load Calibration Standards", icon: "⬛", description: "Proving rings and load cells" },
          { name: "Data Acquisition Software", icon: "💻", description: "Stress-strain recording & analysis" },
        ],
        applicationsDetailed: [
          { name: "Weld Qualification", percent: 95, description: "Procedure and welder qualification" },
          { name: "Material Certification", percent: 92, description: "Verify compliance to standards" },
          { name: "Quality Control", percent: 88, description: "Batch acceptance testing" },
          { name: "Research & Development", percent: 85, description: "New material characterization" },
          { name: "Failure Analysis", percent: 90, description: "Determine cause of in-service failure" },
        ],
        standardsList: [
          { code: "ASTM E8", description: "Tension Testing of Metallic Materials" },
          { code: "ISO 6892", description: "Tensile Testing of Metallic Materials" },
          { code: "ASME Section IX", description: "Welding & Brazing Qualifications" },
          { code: "ASTM A370", description: "Mechanical Testing of Steel Products" },
          { code: "API 1104", description: "Pipeline Welding" },
        ],
        specificationsDetailed: [
          { property: "Load Capacity", value: "Up to 1000 kN", icon: "⚙️" },
          { property: "Strain Measurement", value: "Extensometer (0.1 µm)", icon: "📏" },
          { property: "Temperature Range", value: "-70°C to 1000°C", icon: "🌡️" },
          { property: "Specimen Types", value: "Round / Flat / Full-Section", icon: "🔧" },
          { property: "Test Speed", value: "0.001 - 500 mm/min", icon: "⚡" },
          { property: "Data Output", value: "Stress-Strain Curve", icon: "📊" },
          { property: "Accreditation", value: "NABL Accredited", icon: "🏅" },
          { property: "Reporting", value: "Digital & PDF", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "Accurate Strength Data", description: "Precise tensile and yield strength", icon: "🎯" },
          { title: "Ductility Measurement", description: "Elongation and reduction of area", icon: "📏" },
          { title: "Standard-Compliant", description: "Follows ASTM, ISO, and ASME", icon: "📋" },
          { title: "Wide Material Range", description: "Metals, polymers, and composites", icon: "🧱" },
          { title: "Detailed Curves", description: "Full stress-strain behavior", icon: "📈" },
          { title: "Quality Assurance", description: "Critical for design validation", icon: "✅" },
        ],
        industriesDetailed: [
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipeline Welds", "Pressure Vessels", "Valves"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Alloy Certification", "Fasteners", "Structural Parts"] },
          { name: "Automotive", icon: <Car size={20} />, applications: ["Body Panels", "Engine Components", "Fasteners"] },
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Structural Steel", "Rebar", "Bolts"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Turbine Materials", "Boiler Tubes", "Piping"] },
        ],
        faqs: [
          { q: "What properties does tensile testing measure?", a: "Yield strength, ultimate tensile strength, elongation, reduction of area, and Young's modulus." },
          { q: "What is the difference between yield and tensile strength?", a: "Yield is the stress at which permanent deformation begins; tensile (ultimate) is the maximum stress the material sustains before fracture." },
          { q: "Can tensile tests be done at high temperature?", a: "Yes, with specialised high-temperature furnaces and grips, from sub-zero up to 1000°C or higher." },
          { q: "Is tensile testing destructive?", a: "Yes, the specimen is pulled to fracture, so it cannot be reused. It is classified as destructive testing (DT)." },
        ],
      },

      Compression: {
        fullName: "Compression Testing",
        tagline: "Compressive Strength & Deformation",
        overview: "Compression Testing is a destructive testing (DT) method used to determine the behavior of materials under compressive loads. The specimen is compressed until it deforms, yields, or fails, producing data on compressive strength, yield point, modulus, and deformation characteristics. It is widely applied to concrete, composites, polymers, ceramics, and structural components to ensure they can withstand the compressive stresses expected in service without failure or excessive deformation.",
        workingPrinciple: "A test specimen is placed between two parallel platens of a Universal Testing Machine and subjected to an increasing axial compressive load. The load and displacement are recorded continuously, producing a stress-strain curve that reveals compressive strength, yield behavior, stiffness, and deformation modes.",
        equipment: [
          { name: "Compression Testing Machine", icon: "⚙️", description: "UTM or dedicated press" },
          { name: "Compression Platens", icon: "⬛", description: "Hardened parallel bearing plates" },
          { name: "Extensometers", icon: "📏", description: "Axial deformation measurement" },
          { name: "Alignment Fixtures", icon: "🔧", description: "Ensures even load distribution" },
          { name: "Specimen Preparation Tools", icon: "🛠️", description: "Cutting and grinding equipment" },
          { name: "Data Acquisition Software", icon: "💻", description: "Load-displacement recording" },
        ],
        applicationsDetailed: [
          { name: "Concrete Testing", percent: 95, description: "Cube and cylinder compressive strength" },
          { name: "Composite Materials", percent: 90, description: "In-plane and through-thickness strength" },
          { name: "Foam & Polymers", percent: 88, description: "Compressive modulus and yield" },
          { name: "Ceramics", percent: 85, description: "Compressive strength and fracture modes" },
          { name: "Structural Components", percent: 92, description: "Full-scale component validation" },
        ],
        standardsList: [
          { code: "ASTM E9", description: "Compression Testing of Metallic Materials" },
          { code: "ISO 604", description: "Compressive Properties of Plastics" },
          { code: "ASTM D695", description: "Compressive Properties of Rigid Plastics" },
          { code: "ASTM C39", description: "Compressive Strength of Concrete" },
          { code: "ASTM D3410", description: "Compression of Polymer Composites" },
        ],
        specificationsDetailed: [
          { property: "Load Capacity", value: "Up to 3000 kN", icon: "⚙️" },
          { property: "Platen Hardness", value: "≥ 55 HRC", icon: "⬛" },
          { property: "Strain Measurement", value: "Extensometer / LVDT", icon: "📏" },
          { property: "Temperature Range", value: "-70°C to 1000°C", icon: "🌡️" },
          { property: "Test Speed", value: "0.001 - 100 mm/min", icon: "⚡" },
          { property: "Specimen Types", value: "Cube / Cylinder / Prism", icon: "🔧" },
          { property: "Accreditation", value: "NABL Accredited", icon: "🏅" },
          { property: "Reporting", value: "Digital & PDF", icon: "📊" },
        ],
        advantagesDetailed: [
          { title: "Accurate Load Data", description: "Precise compressive strength values", icon: "🎯" },
          { title: "Deformation Analysis", description: "Full load-displacement curve", icon: "📈" },
          { title: "Material Behavior Insight", description: "Reveals failure modes and limits", icon: "🔬" },
          { title: "Standard Procedures", description: "Follows ASTM and ISO standards", icon: "📋" },
          { title: "Detailed Reporting", description: "Comprehensive test documentation", icon: "📊" },
          { title: "Wide Material Range", description: "Metals, concrete, polymers, composites", icon: "🧱" },
        ],
        industriesDetailed: [
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Concrete Cubes", "Structural Steel", "Masonry Units"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Composite Panels", "Honeycomb Cores", "Structural Parts"] },
          { name: "Automotive", icon: <Car size={20} />, applications: ["Foams", "Bushings", "Structural Components"] },
          { name: "Manufacturing", icon: <Factory size={20} />, applications: ["Plastics", "Ceramics", "Incoming QC"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Insulators", "Structural Materials", "Turbine Parts"] },
        ],
        faqs: [
          { q: "What is the difference between compression and tensile testing?", a: "Compression pushes the material together to measure compressive strength; tension pulls it apart to measure tensile strength and ductility." },
          { q: "Why is specimen alignment critical?", a: "Off-axis loading causes bending and premature failure, so alignment fixtures are essential for accurate results." },
          { q: "Can concrete be tested in compression?", a: "Yes, this is the standard quality-control method for concrete, typically using cubes or cylinders per ASTM C39 or ISO 4012." },
          { q: "Is compression testing destructive?", a: "Yes, specimens are crushed to failure, so testing is classified as destructive (DT)." },
        ],
      },

      Bend: {
        fullName: "Bend Testing",
        tagline: "Weld Ductility & Soundness Check",
        overview: "Bend Testing is a destructive testing (DT) method used to evaluate the ductility and soundness of welds and materials by bending a specimen to a specified angle. It reveals surface and near-surface defects in the weld or heat-affected zone (HAZ) that may not appear under simple visual inspection. Bend testing is widely used for welder and procedure qualification, plate and pipe testing, and quality assurance to ensure materials can withstand forming operations without cracking.",
        workingPrinciple: "A test specimen is placed on a bending fixture and a load is applied until the specimen reaches a specified bend angle. The outer surface of the bend (the tension side) is then examined for cracks, tears, or open defects. Face, root, and side bends target different regions of a weld joint.",
        equipment: [
          { name: "Bend Testing Machine", icon: "⚙️", description: "Guided bend jig or press" },
          { name: "Mandrels & Rollers", icon: "🔧", description: "Bend radii per standard" },
          { name: "Specimen Cutting Tools", icon: "🛠️", description: "Saws and grinding equipment" },
          { name: "Weld Preparation Tools", icon: "✂️", description: "Weld cap and root dressing" },
          { name: "Visual Inspection Kit", icon: "🔍", description: "Magnifiers and gauges" },
          { name: "Calibration Standards", icon: "⬛", description: "Angle verification" },
        ],
        applicationsDetailed: [
          { name: "Weld Qualification", percent: 96, description: "Welder and procedure qualification" },
          { name: "Plate & Sheet Testing", percent: 90, description: "Ductility of plate and sheet" },
          { name: "Pipe Testing", percent: 88, description: "Girth weld soundness" },
          { name: "Structural Steel", percent: 85, description: "Verification of structural welds" },
          { name: "Quality Assurance", percent: 92, description: "Routine batch acceptance" },
        ],
        standardsList: [
          { code: "ASTM E190", description: "Guided Bend Test for Ductility" },
          { code: "ISO 7438", description: "Bend Testing of Metallic Materials" },
          { code: "ASME Section IX", description: "Welding & Brazing Qualifications" },
          { code: "AWS D1.1", description: "Structural Welding Code" },
          { code: "API 1104", description: "Pipeline Welding" },
        ],
        specificationsDetailed: [
          { property: "Bend Angle", value: "Up to 180°", icon: "📐" },
          { property: "Mandrel Diameter", value: "1T to 10T", icon: "🔧" },
          { property: "Specimen Thickness", value: "1 - 40 mm", icon: "📏" },
          { property: "Test Speed", value: "Controlled (no shock)", icon: "⚡" },
          { property: "Temperature", value: "Ambient (or per spec)", icon: "🌡️" },
          { property: "Bend Types", value: "Face / Root / Side", icon: "🔄" },
          { property: "Accreditation", value: "NABL Accredited", icon: "🏅" },
          { property: "Reporting", value: "Digital & PDF", icon: "📊" },
        ],
        advantagesDetailed: [
          { title: "Weld Ductility Check", description: "Direct evaluation of weld soundness", icon: "🎯" },
          { title: "Simple Procedure", description: "Straightforward setup and execution", icon: "✅" },
          { title: "Quick Results", description: "Fast on-site or lab turnaround", icon: "⚡" },
          { title: "Standard-Compliant", description: "Follows ASME, AWS, API, ISO", icon: "📋" },
          { title: "Cost-Effective", description: "Low cost per test", icon: "💰" },
          { title: "Reveals Fine Defects", description: "Detects fine HAZ cracking", icon: "🔬" },
        ],
        industriesDetailed: [
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipeline Welds", "Pressure Vessels", "Piping"] },
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Structural Welds", "Bridge Fabrication", "Rebar"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Boiler Welds", "Piping", "Turbine Welds"] },
          { name: "Shipbuilding", icon: <Ship size={20} />, applications: ["Hull Welds", "Structural Welds", "Piping"] },
          { name: "Manufacturing", icon: <Factory size={20} />, applications: ["Sheet Metal", "Plate Forming", "Incoming QC"] },
        ],
        faqs: [
          { q: "What is the purpose of bend testing a weld?", a: "It evaluates weld ductility and reveals surface and near-surface defects such as lack of fusion, porosity, or cracks in the weld and HAZ." },
          { q: "What is the difference between face, root, and side bends?", a: "Face bends test the weld cap surface; root bends test the root surface; side bends test the weld cross-section." },
          { q: "What is the usual bend angle?", a: "Most codes require bending to 180° around a specified mandrel; specimens that crack beyond the acceptance limit fail." },
          { q: "Is bend testing destructive?", a: "Yes, specimens are plastically deformed and cannot be reused after testing." },
        ],
      },

      "Re-bend": {
        fullName: "Re-bend Testing",
        tagline: "Reverse-Bend Weld Integrity",
        overview: "Re-bend Testing is a destructive testing (DT) method in which a specimen is first bent in one direction and then bent back in the opposite direction to reveal internal defects and evaluate ductility under reverse loading. It is particularly effective for detecting seams, laps, inclusions, and other internal flaws that may not appear in a single-direction bend. Re-bend testing is widely used for rebar, wire, sheet metal, and weld qualification where reversed forming or service stresses are expected.",
        workingPrinciple: "A specimen is bent to a specified angle in one direction, then bent back in the opposite direction around a mandrel of specified radius. The plastically deformed regions are examined for cracking, opening, or other indications of internal defects. Reverse loading produces severe strain that exposes weaknesses in a single pass.",
        equipment: [
          { name: "Re-bend Testing Machine", icon: "⚙️", description: "Two-direction bend fixture" },
          { name: "Mandrels & Rollers", icon: "🔧", description: "Radii per standard" },
          { name: "Specimen Cutting Tools", icon: "🛠️", description: "Saws and cutters" },
          { name: "Weld Preparation Tools", icon: "✂️", description: "Weld dressing equipment" },
          { name: "Visual Inspection Kit", icon: "🔍", description: "Magnifiers and gauges" },
          { name: "Calibration Standards", icon: "⬛", description: "Angle verification" },
        ],
        applicationsDetailed: [
          { name: "Weld Qualification", percent: 94, description: "Weld and procedure qualification" },
          { name: "Rebar Testing", percent: 92, description: "Rebar bend and re-bend per BS/ASTM" },
          { name: "Wire Testing", percent: 88, description: "Wire ductility and defects" },
          { name: "Sheet Metal", percent: 85, description: "Reverse forming evaluation" },
          { name: "Quality Control", percent: 90, description: "Batch acceptance testing" },
        ],
        standardsList: [
          { code: "ASTM E190", description: "Guided Bend Test for Ductility" },
          { code: "ISO 7438", description: "Bend Testing of Metallic Materials" },
          { code: "BS 4449", description: "Steel for Reinforcement of Concrete" },
          { code: "ASTM A615", description: "Deformed and Plain Carbon-Steel Bars" },
          { code: "ASME Section IX", description: "Welding & Brazing Qualifications" },
        ],
        specificationsDetailed: [
          { property: "Bend Angle", value: "Up to 180° each way", icon: "📐" },
          { property: "Mandrel Diameter", value: "1T to 10T", icon: "🔧" },
          { property: "Specimen Thickness", value: "1 - 40 mm", icon: "📏" },
          { property: "Test Speed", value: "Controlled (no shock)", icon: "⚡" },
          { property: "Temperature", value: "Ambient (or per spec)", icon: "🌡️" },
          { property: "Bend Sequence", value: "Forward then Reverse", icon: "🔄" },
          { property: "Accreditation", value: "NABL Accredited", icon: "🏅" },
          { property: "Reporting", value: "Digital & PDF", icon: "📊" },
        ],
        advantagesDetailed: [
          { title: "Detects Internal Flaws", description: "Reveals seams and laps not seen in single bend", icon: "🔬" },
          { title: "More Severe than Bend", description: "Higher strain exposes hidden weaknesses", icon: "💪" },
          { title: "Standard Procedure", description: "Widely codified in BS, ASTM, ISO", icon: "📋" },
          { title: "Quick Results", description: "Fast turnaround", icon: "⚡" },
          { title: "Simple Interpretation", description: "Crack presence = fail, clean = pass", icon: "👁️" },
          { title: "Cost-Effective", description: "Low cost per test", icon: "💰" },
        ],
        industriesDetailed: [
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Rebar Certification", "Structural Welds", "Wire Mesh"] },
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipeline Welds", "Wire Rope", "Piping"] },
          { name: "Manufacturing", icon: <Factory size={20} />, applications: ["Wire", "Sheet Metal", "Formed Parts"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Rebar", "Structural Welds", "Piping"] },
          { name: "Automotive", icon: <Car size={20} />, applications: ["Wire", "Sheet Steel", "Fasteners"] },
        ],
        faqs: [
          { q: "What is the purpose of re-bending?", a: "To reveal internal defects such as seams, laps, and inclusions by applying reverse plastic strain that opens surface indications." },
          { q: "Where is re-bend testing specified?", a: "Commonly required for rebar per BS 4449 and ASTM A615, and for certain wire and weld qualification procedures." },
          { q: "How is it different from a standard bend test?", a: "Re-bend applies reverse loading, which produces more severe strain than a single-direction bend." },
          { q: "Is it destructive?", a: "Yes, the specimen is permanently deformed in both directions and cannot be reused." },
        ],
      },

      Impact: {
        fullName: "Impact Testing",
        tagline: "Toughness & Fracture Resistance",
        overview: "Impact Testing is a destructive testing (DT) method used to measure the toughness of materials and their resistance to sudden loading. Using Charpy or Izod pendulum tests, it quantifies the energy absorbed during fracture and helps determine the ductile-to-brittle transition temperature. Impact testing is critical for applications where low-temperature toughness, weld qualification, and fracture resistance under dynamic loads are important, such as pressure vessels, pipelines, and structural steel.",
        workingPrinciple: "A notched specimen is struck by a swinging pendulum of known mass and velocity. The energy absorbed by the specimen to fracture is measured as the difference between the pendulum's initial and residual heights. Testing at multiple temperatures reveals the ductile-to-brittle transition behavior.",
        equipment: [
          { name: "Pendulum Impact Tester", icon: "🔨", description: "Charpy or Izod machine" },
          { name: "Notch Broaching Tools", icon: "🔧", description: "V-notch or U-notch preparation" },
          { name: "Specimen Cooling Bath", icon: "❄️", description: "Liquid nitrogen or alcohol bath" },
          { name: "Temperature Controller", icon: "🌡️", description: "Accurate specimen temperature" },
          { name: "Fracture Analysis Tools", icon: "🔬", description: "Fracture surface evaluation" },
          { name: "Calibration Standards", icon: "⬛", description: "Proving ring / energy verification" },
        ],
        applicationsDetailed: [
          { name: "Weld Qualification", percent: 95, description: "Weld and HAZ toughness" },
          { name: "Pressure Vessels", percent: 92, description: "Impact toughness of shell materials" },
          { name: "Piping Systems", percent: 90, description: "Low-temperature service toughness" },
          { name: "Structural Steel", percent: 88, description: "Charpy V-notch requirements" },
          { name: "Low-Temperature Service", percent: 94, description: "Ductile-to-brittle transition" },
        ],
        standardsList: [
          { code: "ASTM E23", description: "Notched Bar Impact Testing" },
          { code: "ISO 148", description: "Charpy Pendulum Impact Test" },
          { code: "ASME Section VIII", description: "Pressure Vessel Impact Requirements" },
          { code: "ASTM A370", description: "Mechanical Testing of Steel Products" },
          { code: "API 5L", description: "Line Pipe Toughness Requirements" },
        ],
        specificationsDetailed: [
          { property: "Pendulum Energy", value: "Up to 750 J", icon: "🔨" },
          { property: "Impact Velocity", value: "5.0 - 5.5 m/s", icon: "⚡" },
          { property: "Temperature Range", value: "-196°C to 200°C", icon: "🌡️" },
          { property: "Notch Type", value: "V-notch / U-notch", icon: "📐" },
          { property: "Specimen Sizes", value: "10×10×55 mm standard", icon: "📏" },
          { property: "Data Output", value: "Energy absorbed + shear %", icon: "📊" },
          { property: "Accreditation", value: "NABL Accredited", icon: "🏅" },
          { property: "Reporting", value: "Digital & PDF", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "Toughness Measurement", description: "Direct energy absorbed by fracture", icon: "🎯" },
          { title: "Transition Temperature Data", description: "Ductile-to-brittle curve", icon: "📈" },
          { title: "Standard-Compliant", description: "ASTM E23, ISO 148", icon: "📋" },
          { title: "Wide Temperature Range", description: "Down to -196°C with LN2", icon: "❄️" },
          { title: "Detailed Energy Data", description: "Joules absorbed + shear %", icon: "📊" },
          { title: "Weld & HAZ Evaluation", description: "Critical for critical welds", icon: "🔬" },
        ],
        industriesDetailed: [
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipeline Steels", "Pressure Vessels", "Line Pipe"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Boiler Steels", "Turbine Materials", "Piping"] },
          { name: "Shipbuilding", icon: <Ship size={20} />, applications: ["Hull Steel", "Low-Temp Materials", "Welds"] },
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Structural Steel", "Bridges", "Cold-Region Applications"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Engine Alloys", "Landing Gear", "Structural Parts"] },
        ],
        faqs: [
          { q: "What is the difference between Charpy and Izod?", a: "Charpy uses a simply supported horizontal beam; Izod uses a vertical cantilever. Charpy is more common in metals." },
          { q: "Why test at multiple temperatures?", a: "To map the ductile-to-brittle transition and identify the temperature at which toughness drops sharply." },
          { q: "What is a typical Charpy requirement?", a: "Depends on the code and application — commonly 27 J or 40 J minimum at a specified temperature." },
          { q: "Is impact testing destructive?", a: "Yes, the specimen is fractured in the test and cannot be reused." },
        ],
      },

      BenchHardness: {
        fullName: "Bench Hardness Testing",
        tagline: "Rockwell, Brinell & Vickers",
        overview: "Bench Hardness Testing is a destructive or semi-destructive testing (DT) method used to measure the hardness of metals and other materials using bench-mounted instruments. It covers Rockwell, Brinell, Vickers, and Knoop methods, and can be performed at macro, micro, or nano scales. Bench hardness testing provides highly accurate readings for material certification, heat-treatment verification, weld evaluation, and quality control. It complements portable hardness testing by offering higher precision and a wider load range for laboratory and shop-floor applications.",
        workingPrinciple: "Depending on the method, a diamond or ball indenter is pressed into the material with a controlled load. Hardness is derived from the depth of penetration (Rockwell), the diameter of the residual impression (Brinell), or the diagonal length of the impression (Vickers/Knoop). Bench instruments provide a controlled environment with precise loading and measurement.",
        equipment: [
          { name: "Rockwell Hardness Tester", icon: "📊", description: "Direct depth reading (HRC/HRB)" },
          { name: "Brinell Hardness Tester", icon: "⚫", description: "Ball indenter, optical reading" },
          { name: "Vickers/Knoop Tester", icon: "🔬", description: "Micro-indentation hardness" },
          { name: "Reference Blocks", icon: "⬛", description: "Certified calibration standards" },
          { name: "Specimen Preparation Tools", icon: "🛠️", description: "Grinding and polishing" },
          { name: "Software", icon: "💻", description: "Data logging and reporting" },
        ],
        applicationsDetailed: [
          { name: "Heat Treated Parts", percent: 96, description: "Verification of heat-treatment cycles" },
          { name: "Weld Evaluation", percent: 92, description: "Hardness across weld and HAZ" },
          { name: "Large Components", percent: 90, description: "Bench-mounted testing of samples" },
          { name: "Incoming QC", percent: 88, description: "Material certification" },
          { name: "Coating Hardness", percent: 84, description: "Micro-hardness of coatings and case" },
        ],
        standardsList: [
          { code: "ASTM E10", description: "Brinell Hardness of Metallic Materials" },
          { code: "ASTM E18", description: "Rockwell Hardness of Metallic Materials" },
          { code: "ASTM E92", description: "Vickers and Knoop Hardness" },
          { code: "ISO 6506", description: "Brinell Hardness Test" },
          { code: "ISO 6507", description: "Vickers Hardness Test" },
        ],
        specificationsDetailed: [
          { property: "Hardness Scales", value: "HRC, HRB, HB, HV, HK", icon: "📊" },
          { property: "Rockwell Loads", value: "60 / 100 / 150 kgf", icon: "⚙️" },
          { property: "Brinell Loads", value: "500 - 3000 kgf", icon: "⚙️" },
          { property: "Vickers Loads", value: "1 - 100 kgf (macro)", icon: "⚙️" },
          { property: "Micro-Vickers", value: "10 g - 1 kgf", icon: "🔬" },
          { property: "Accuracy", value: "±1 HRC typical", icon: "🎯" },
          { property: "Accreditation", value: "NABL Accredited", icon: "🏅" },
          { property: "Reporting", value: "Digital & PDF", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "Multiple Scales", description: "Rockwell, Brinell, Vickers, Knoop", icon: "📊" },
          { title: "Higher Accuracy", description: "Better than portable for precise work", icon: "🎯" },
          { title: "Repeatable Results", description: "Controlled environment", icon: "🔁" },
          { title: "Minimal Surface Damage", description: "Small indents in micro mode", icon: "✨" },
          { title: "Wide Material Range", description: "Metals, ceramics, composites", icon: "🧱" },
          { title: "Standard-Compliant", description: "ASTM E10/E18/E92, ISO 6506/6507", icon: "📋" },
        ],
        industriesDetailed: [
          { name: "Manufacturing", icon: <Factory size={20} />, applications: ["Heat Treatment QC", "Incoming Inspection", "Final Verification"] },
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Weld HAZ", "Pressure Vessels", "Valve Bodies"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Turbine Materials", "Boiler Tubes", "Piping"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Critical Alloys", "Engine Parts", "Fasteners"] },
          { name: "Automotive", icon: <Car size={20} />, applications: ["Gearbox Parts", "Shafts", "Springs"] },
        ],
        faqs: [
          { q: "What is the difference between bench and portable hardness testing?", a: "Bench units offer higher accuracy and repeatability; portable units allow in-situ testing of large or in-service components." },
          { q: "Which scale should I choose?", a: "It depends on material and standard — Rockwell for production QC, Brinell for large castings, Vickers for micro-hardness and thin cases." },
          { q: "Is bench hardness testing destructive?", a: "It leaves a small indent (semi-destructive); destructive in the strict sense if the surface must remain unmarked." },
          { q: "Can it test thin coatings?", a: "Yes, with micro-Vickers or Knoop using very light loads (10 g to 1 kgf)." },
        ],
      },

      Mechanical: {
        fullName: "Mechanical Testing",
        tagline: "Complete Mechanical Property Evaluation",
        overview: "Mechanical Testing is a comprehensive destructive testing (DT) service that evaluates the mechanical properties of metals and structural components by subjecting them to tensile, compressive, bending, impact, hardness, and fastener loads. It provides critical data on strength, ductility, toughness, and hardness that govern material performance in service. Mechanical testing is widely used for material certification, weld qualification, design validation, failure analysis, and batch quality control to ensure compliance with international standards and safety requirements.",
        workingPrinciple: "Test specimens are prepared to standard geometries and loaded using a Universal Testing Machine, impact tester, hardness tester, or shear fixture. The resulting load-displacement (or energy, or indentation) data is analyzed against the applicable ASTM / ISO / ASME standard to determine each mechanical property.",
        equipment: [
          { name: "Universal Testing Machine", icon: "⚙️", description: "Tension / compression / bend" },
          { name: "Pendulum Impact Tester", icon: "🔨", description: "Charpy / Izod toughness" },
          { name: "Bench Hardness Tester", icon: "💎", description: "Rockwell / Brinell / Vickers" },
          { name: "Shear Fixtures", icon: "🔧", description: "Lap, fastener, and punch shear" },
          { name: "Extensometers", icon: "📏", description: "Precise strain measurement" },
          { name: "Data Acquisition Software", icon: "💻", description: "Property calculation & reporting" },
        ],
        applicationsDetailed: [
          { name: "Material Certification", percent: 96, description: "Verify strength, ductility, and toughness" },
          { name: "Weld Qualification", percent: 94, description: "Procedure and welder qualification" },
          { name: "Design Validation", percent: 90, description: "Confirm design allowables" },
          { name: "Failure Analysis", percent: 88, description: "Determine cause of mechanical failure" },
          { name: "Batch Quality Control", percent: 92, description: "Incoming and outgoing acceptance" },
        ],
        standardsList: [
          { code: "ASTM E8", description: "Tension Testing of Metallic Materials" },
          { code: "ASTM E9", description: "Compression Testing of Metallic Materials" },
          { code: "ASTM E23", description: "Notched Bar Impact Testing" },
          { code: "ASTM E10 / E18", description: "Brinell / Rockwell Hardness" },
          { code: "ASTM E190", description: "Guided Bend Test for Ductility" },
        ],
        specificationsDetailed: [
          { property: "Tensile Load", value: "Up to 1000 kN", icon: "⚙️" },
          { property: "Compression Load", value: "Up to 3000 kN", icon: "⚙️" },
          { property: "Impact Energy", value: "Up to 750 J", icon: "🔨" },
          { property: "Hardness Scales", value: "HRC, HB, HV, HL", icon: "💎" },
          { property: "Temperature Range", value: "-196°C to 1000°C", icon: "🌡️" },
          { property: "Specimen Types", value: "Round / Flat / Full-Section", icon: "📏" },
          { property: "Accreditation", value: "NABL Accredited", icon: "🏅" },
          { property: "Reporting", value: "Digital & PDF", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "Single-Vendor Convenience", description: "One lab for all mechanical tests", icon: "✅" },
          { title: "Consolidated Reporting", description: "All properties in one report", icon: "📊" },
          { title: "Wide Property Coverage", description: "Strength, ductility, toughness, hardness", icon: "🎯" },
          { title: "Standard-Compliant", description: "ASTM, ISO, ASME aligned", icon: "📋" },
          { title: "Fast Turnaround", description: "Parallel testing on multiple machines", icon: "⚡" },
          { title: "Expert Interpretation", description: "Metallurgist-reviewed results", icon: "🔬" },
        ],
        industriesDetailed: [
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Pipeline Welds", "Pressure Vessels", "Line Pipe"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Alloy Certification", "Fasteners", "Structural Parts"] },
          { name: "Automotive", icon: <Car size={20} />, applications: ["Body Panels", "Engine Components", "Chassis Parts"] },
          { name: "Construction", icon: <Building2 size={20} />, applications: ["Structural Steel", "Rebar", "Bolts"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Turbine Materials", "Boiler Steels", "Piping"] },
        ],
        faqs: [
          { q: "What mechanical tests are included?", a: "Tensile, compression, bend, re-bend, impact, hardness, and fastener tests — all under one service." },
          { q: "Can I request only one test?", a: "Yes, individual mechanical tests are also available as standalone services (see Tensile, Bend, Impact, etc.)." },
          { q: "How long does a typical suite take?", a: "A standard tensile + impact + hardness suite typically completes in 3–5 working days." },
          { q: "Is mechanical testing destructive?", a: "Yes, all these tests deform or fracture the specimen and are classified as destructive testing (DT)." },
        ],
      },

      Metallurgical: {
        fullName: "Metallurgical Testing",
        tagline: "Microstructural & Failure Investigation",
        overview: "Metallurgical Testing is a destructive testing (DT) service that investigates the internal structure, chemistry, and behavior of metals and alloys. It covers macro and micro examination, grain size, phase identification, inclusion rating, microhardness, case depth, decarburization, coating thickness, corrosion evaluation, and full failure analysis. Metallurgical testing is essential for verifying heat treatment, welding metallurgy, material grade, and root-cause investigation of service failures.",
        workingPrinciple: "Samples are sectioned, mounted, ground, polished, and etched to reveal microstructure. They are examined under optical or electron microscopes; microhardness and phase composition are measured; and corrosion behavior is evaluated using standard immersion or electrochemical methods. Results are correlated with processing history and service conditions.",
        equipment: [
          { name: "Metallurgical Microscope", icon: "🔬", description: "Optical, up to 1000×" },
          { name: "Scanning Electron Microscope", icon: "📡", description: "SEM with EDS for elemental analysis" },
          { name: "Mounting & Polishing Equipment", icon: "🛠️", description: "Specimen preparation" },
          { name: "Microhardness Tester", icon: "💎", description: "Vickers / Knoop (10g–1kg)" },
          { name: "Image Analysis Software", icon: "💻", description: "Grain size, phase %, inclusion rating" },
          { name: "Corrosion Test Cell", icon: "🧪", description: "Immersion, salt spray, electrochemical" },
        ],
        applicationsDetailed: [
          { name: "Microstructure Analysis", percent: 96, description: "Phase identification and grain size" },
          { name: "Weld Metallurgy", percent: 94, description: "HAZ and fusion zone evaluation" },
          { name: "Heat Treatment Verification", percent: 92, description: "Case depth, decarb, hardness profile" },
          { name: "Failure Investigation", percent: 90, description: "Root-cause of fracture or corrosion" },
          { name: "Corrosion Assessment", percent: 88, description: "Intergranular, pitting, SCC" },
        ],
        standardsList: [
          { code: "ASTM E3", description: "Metallographic Specimen Preparation" },
          { code: "ASTM E112", description: "Determining Average Grain Size" },
          { code: "ASTM E407", description: "Microetching of Metals" },
          { code: "ASTM E384", description: "Microindentation Hardness" },
          { code: "ASTM E45", description: "Inclusion Content of Steel" },
        ],
        specificationsDetailed: [
          { property: "Magnification", value: "Up to 1000× (optical)", icon: "🔬" },
          { property: "SEM + EDS", value: "Available (outsourced if needed)", icon: "📡" },
          { property: "Microhardness", value: "10 g – 1 kgf (HV/HK)", icon: "💎" },
          { property: "Grain Size", value: "ASTM E112 (1–12)", icon: "📏" },
          { property: "Case Depth", value: "0.05 – 10 mm", icon: "📐" },
          { property: "Corrosion Tests", value: "ASTM G28 / G48 / G150", icon: "🧪" },
          { property: "Accreditation", value: "NABL Accredited", icon: "🏅" },
          { property: "Reporting", value: "Digital + micrographs", icon: "📋" },
        ],
        advantagesDetailed: [
          { title: "High-Resolution Imaging", description: "Optical & SEM micrographs", icon: "🔬" },
          { title: "Phase & Grain Analysis", description: "Quantitative microstructure", icon: "📊" },
          { title: "Failure Root Cause", description: "Precise failure mechanism ID", icon: "🎯" },
          { title: "Corrosion Diagnosis", description: "Type and severity identification", icon: "🧪" },
          { title: "Heat Treatment Verification", description: "Confirms specified microstructure", icon: "🔥" },
          { title: "Detailed Report", description: "Micrographs + interpretation", icon: "📋" },
        ],
        industriesDetailed: [
          { name: "Oil & Gas", icon: <Fuel size={20} />, applications: ["Weld Metallurgy", "Sour Service (HIC/SSC)", "Failure Analysis"] },
          { name: "Aerospace", icon: <Plane size={20} />, applications: ["Grain Structure", "Coating Evaluation", "Failure Analysis"] },
          { name: "Power Generation", icon: <Zap size={20} />, applications: ["Boiler Tube Failure", "Creep Damage", "Heat Treatment QC"] },
          { name: "Automotive", icon: <Car size={20} />, applications: ["Gear/Shaft Microstructure", "Case Depth", "Weld Metallurgy"] },
          { name: "Manufacturing", icon: <Factory size={20} />, applications: ["Incoming Material", "Heat Treat Verification", "Inclusion Rating"] },
        ],
        faqs: [
          { q: "What is metallurgical testing?", a: "It examines the internal structure of metals — microstructure, grain size, phases, inclusions, and hardness profiles — to verify quality or investigate failures." },
          { q: "What is the difference between macro and micro examination?", a: "Macro examines the surface/cross-section with the naked eye or low magnification; micro uses an optical microscope (up to 1000×) to reveal microstructure." },
          { q: "Can you perform failure analysis?", a: "Yes — full failure analysis including fractography, microstructure, hardness mapping, and root-cause determination is available." },
          { q: "How big should a sample be?", a: "A typical specimen is 20×20×10 mm; the exact size depends on the feature being evaluated." },
        ],
      },
    };

    const shortName = m.shortName;
    const details = detailsMap[shortName] || detailsMap["UT"];

    return {
      ...m,
      ...details,
      iconComponent: iconMap[m.shortName] ? null : m.icon,
    };
  };

  const details = getMethodDetails(method);

  const sections = [
    { id: "overview", label: "Overview", icon: <Eye size={16} /> },
    { id: "principle", label: "How It Works", icon: <Settings size={16} /> },
    { id: "equipment", label: "Equipment", icon: <Wrench size={16} /> },
    { id: "applications", label: "Applications", icon: <Target size={16} /> },
    { id: "specifications", label: "Specifications", icon: <BarChart3 size={16} /> },
    { id: "advantages", label: "Advantages", icon: <ThumbsUp size={16} /> },
    { id: "standards", label: "Standards", icon: <FileText size={16} /> },
    { id: "industries", label: "Industries", icon: <Globe size={16} /> },
    { id: "faqs", label: "FAQs", icon: <Lightbulb size={16} /> },
  ];

  /* Certification color helper */
  const getCertColor = (cert) => {
    if (!cert) return primaryLight;
    if (cert.includes("NABL")) return "#8e44ad";
    if (cert.includes("Level III")) return "#27AE60";
    if (cert.includes("Level II")) return "#E67E22";
    return primaryLight;
  };

  /* ASNT level mapping + NABL methods */
  const ASNT_LEVEL_III = ["UT", "MPT", "DPT", "DR", "CR"];
  const ASNT_LEVEL_II = ["PAUT", "TOFD", "ECT"];
  const NABL_METHODS = ["UT", "MPT", "DPT"];

  const isLevelIII = ASNT_LEVEL_III.includes(details.shortName);
  const isLevelII = ASNT_LEVEL_II.includes(details.shortName);
  const isNABL = NABL_METHODS.includes(details.shortName);

  const showCertStat = isLevelIII || isLevelII;
  const showNABLStat = isNABL;
  const certValue = isLevelIII
    ? "ASNT Level III"
    : isLevelII
      ? "ASNT Level II"
      : null;

  return (
    <div className={`sdm-overlay ${isVisible ? "sdm-visible" : ""}`}>
      <div className="sdm-bg-particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="sdm-particle"
            style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 20}s`, animationDelay: `${Math.random() * 10}s`,
              width: `${2 + Math.random() * 6}px`, height: `${2 + Math.random() * 6}px`,
              background: `rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(primaryColor.slice(5, 7), 16)}, ${0.1 + Math.random() * 0.3})`,
            }}
          />
        ))}
      </div>

      <div className="sdm-modal" ref={modalRef}>
        <div className="sdm-scroll-progress" style={{ width: `${scrollProgress}%` }} />

        {/* HEADER */}
        <div className="sdm-header" style={{ background: `linear-gradient(135deg, ${primaryDark} 0%, ${primaryColor} 50%, ${primaryLight} 100%)` }}>
          <div className="sdm-header-pattern">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="sdm-header-shape"
                style={{
                  left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`, animationDuration: `${8 + Math.random() * 8}s`,
                }}
              />
            ))}
          </div>

          <div className="sdm-header-content">
            <button className="sdm-close-btn" onClick={onClose}>
              <X size={24} /><div className="sdm-close-ring" />
            </button>

            <div className="sdm-header-main">
              <div className="sdm-method-icon-large">
                {method.icon}
                <div className="sdm-icon-pulse-ring" />
                <div className="sdm-icon-pulse-ring sdm-delay-1" />
                <div className="sdm-icon-pulse-ring sdm-delay-2" />
              </div>

              <div className="sdm-header-text">
                <div className="sdm-header-badge">
                  <Sparkles size={14} />{details.shortName} • {details.tagline}
                </div>
                <h1 className="sdm-method-title">{details.fullName}</h1>
                <p className="sdm-method-short-desc">{method.description}</p>

                <div className="sdm-header-stats">
                  {/* NABL Accreditation — only for UT / MPT / DPT */}
                  {showNABLStat && (
                    <>
                      <div className="sdm-header-stat">
                        <div className="sdm-header-stat-icon">
                          <Award size={18} style={{ color: getCertColor("NABL Accredited") }} />
                        </div>
                        <div className="sdm-header-stat-info">
                          <span className="sdm-header-stat-value">NABL</span>
                          <span className="sdm-header-stat-label">Accredited</span>
                        </div>
                      </div>
                      <div className="sdm-header-stat-divider" />
                    </>
                  )}

                  {/* ASNT Level II / III */}
                  {showCertStat && (
                    <>
                      <div className="sdm-header-stat">
                        <div className="sdm-header-stat-icon">
                          <Shield size={18} style={{ color: getCertColor(certValue) }} />
                        </div>
                        <div className="sdm-header-stat-info">
                          <span className="sdm-header-stat-value">{certValue}</span>
                          <span className="sdm-header-stat-label">Certified</span>
                        </div>
                      </div>
                      <div className="sdm-header-stat-divider" />
                    </>
                  )}

                  <div className="sdm-header-stat">
                    <div className="sdm-header-stat-icon"><Clock size={18} /></div>
                    <div className="sdm-header-stat-info">
                      <span className="sdm-header-stat-value">24/7</span>
                      <span className="sdm-header-stat-label">Available</span>
                    </div>
                  </div>
                  <div className="sdm-header-stat-divider" />
                  <div className="sdm-header-stat">
                    <div className="sdm-header-stat-icon"><Award size={18} /></div>
                    <div className="sdm-header-stat-info">
                      <span className="sdm-header-stat-value">ISO 17025</span>
                      <span className="sdm-header-stat-label">Accredited</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NAV TABS */}
        <div className="sdm-nav-tabs">
          {sections.map((section) => (
            <button key={section.id}
              className={`sdm-nav-tab ${activeSection === section.id ? "sdm-nav-tab-active" : ""}`}
              onClick={() => {
                setActiveSection(section.id);
                if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {section.icon}<span>{section.label}</span>
              {activeSection === section.id && <div className="sdm-nav-tab-indicator" />}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="sdm-content" ref={contentRef}>
          {activeSection === "overview" && (
            <div className="sdm-section sdm-animate-in">
              <div className="sdm-section-header">
                <div className="sdm-section-icon"><Eye size={24} /></div>
                <h2>Overview</h2>
              </div>
              <div className="sdm-overview-grid">
                <div className="sdm-overview-text"><p>{details.overview}</p></div>
                <div className="sdm-overview-highlights">
                  {details.applicationsDetailed.slice(0, 5).map((app, i) => (
                    <div key={i} className="sdm-highlight-card" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="sdm-highlight-card-icon"><Target size={18} /></div>
                      <div className="sdm-highlight-card-info">
                        <span className="sdm-highlight-card-name">{app.name}</span>
                        <div className="sdm-highlight-bar">
                          <div className="sdm-highlight-bar-fill" style={{ width: `${app.percent}%` }} />
                        </div>
                      </div>
                      <span className="sdm-highlight-card-percent">{app.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "principle" && (
            <div className="sdm-section sdm-animate-in">
              <div className="sdm-section-header">
                <div className="sdm-section-icon"><Settings size={24} /></div>
                <h2>How It Works</h2>
              </div>
              <div className="sdm-principle-content">
                <div className="sdm-principle-text"><p>{details.workingPrinciple}</p></div>
                <div className="sdm-principle-diagram">
                  <div className="sdm-diagram-container">
                    <div className="sdm-diagram-item sdm-diagram-animate" style={{ animationDelay: "0s" }}>
                      <div className="sdm-diagram-icon"><Zap size={32} /></div><span>Signal Generation</span>
                    </div>
                    <div className="sdm-diagram-arrow"><ChevronRight size={24} /></div>
                    <div className="sdm-diagram-item sdm-diagram-animate" style={{ animationDelay: "0.2s" }}>
                      <div className="sdm-diagram-icon"><Activity size={32} /></div><span>Wave Propagation</span>
                    </div>
                    <div className="sdm-diagram-arrow"><ChevronRight size={24} /></div>
                    <div className="sdm-diagram-item sdm-diagram-animate" style={{ animationDelay: "0.4s" }}>
                      <div className="sdm-diagram-icon"><Box size={32} /></div><span>Material Interaction</span>
                    </div>
                    <div className="sdm-diagram-arrow"><ChevronRight size={24} /></div>
                    <div className="sdm-diagram-item sdm-diagram-animate" style={{ animationDelay: "0.6s" }}>
                      <div className="sdm-diagram-icon"><BarChart3 size={32} /></div><span>Signal Analysis</span>
                    </div>
                    <div className="sdm-diagram-arrow"><ChevronRight size={24} /></div>
                    <div className="sdm-diagram-item sdm-diagram-animate" style={{ animationDelay: "0.8s" }}>
                      <div className="sdm-diagram-icon"><FileText size={32} /></div><span>Result Output</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "equipment" && (
            <div className="sdm-section sdm-animate-in">
              <div className="sdm-section-header">
                <div className="sdm-section-icon"><Wrench size={24} /></div>
                <h2>Equipment Used</h2>
              </div>
              <div className="sdm-equipment-grid">
                {details.equipment.map((eq, i) => (
                  <div key={i} className="sdm-equipment-card" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="sdm-equipment-card-glow" />
                    <div className="sdm-equipment-icon">{eq.icon}</div>
                    <h3>{eq.name}</h3><p>{eq.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "applications" && (
            <div className="sdm-section sdm-animate-in">
              <div className="sdm-section-header">
                <div className="sdm-section-icon"><Target size={24} /></div>
                <h2>Applications</h2>
              </div>
              <div className="sdm-applications-list">
                {details.applicationsDetailed.map((app, i) => (
                  <div key={i} className="sdm-application-item" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="sdm-application-header">
                      <div className="sdm-application-name"><CheckCircle size={18} />{app.name}</div>
                      <span className="sdm-application-percent">{app.percent}%</span>
                    </div>
                    <p className="sdm-application-desc">{app.description}</p>
                    <div className="sdm-application-bar">
                      <div className="sdm-application-bar-fill" style={{ width: `${app.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "specifications" && (
            <div className="sdm-section sdm-animate-in">
              <div className="sdm-section-header">
                <div className="sdm-section-icon"><BarChart3 size={24} /></div>
                <h2>Technical Specifications</h2>
              </div>
              <div className="sdm-specs-grid">
                {details.specificationsDetailed.map((spec, i) => (
                  <div key={i} className="sdm-spec-card" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="sdm-spec-icon">{spec.icon}</div>
                    <div className="sdm-spec-info">
                      <span className="sdm-spec-property">{spec.property}</span>
                      <span className="sdm-spec-value">{spec.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "advantages" && (
            <div className="sdm-section sdm-animate-in">
              <div className="sdm-section-header">
                <div className="sdm-section-icon"><ThumbsUp size={24} /></div>
                <h2>Key Advantages</h2>
              </div>
              <div className="sdm-advantages-grid">
                {details.advantagesDetailed.map((adv, i) => (
                  <div key={i} className="sdm-advantage-card" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="sdm-advantage-icon">{adv.icon}</div>
                    <h3>{adv.title}</h3><p>{adv.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "standards" && (
            <div className="sdm-section sdm-animate-in">
              <div className="sdm-section-header">
                <div className="sdm-section-icon"><FileText size={24} /></div>
                <h2>Applicable Standards</h2>
              </div>
              <div className="sdm-standards-list">
                {details.standardsList.map((std, i) => (
                  <div key={i} className="sdm-standard-item" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="sdm-standard-code">{std.code}</div>
                    <div className="sdm-standard-desc">{std.description}</div>
                    <Shield size={16} className="sdm-standard-shield" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "industries" && (
            <div className="sdm-section sdm-animate-in">
              <div className="sdm-section-header">
                <div className="sdm-section-icon"><Globe size={24} /></div>
                <h2>Industries Served</h2>
              </div>
              <div className="sdm-industries-grid">
                {details.industriesDetailed.map((ind, i) => (
                  <div key={i} className="sdm-industry-card" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="sdm-industry-icon">{ind.icon}</div>
                    <h3>{ind.name}</h3>
                    <ul className="sdm-industry-apps">
                      {ind.applications.map((app, j) => (
                        <li key={j}><ChevronRight size={14} />{app}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "faqs" && (
            <div className="sdm-section sdm-animate-in">
              <div className="sdm-section-header">
                <div className="sdm-section-icon"><Lightbulb size={24} /></div>
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="sdm-faqs-list">
                {details.faqs.map((faq, i) => (
                  <div key={i} className="sdm-faq-item" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="sdm-faq-question">
                      <div className="sdm-faq-number">Q{i + 1}</div>
                      <span>{faq.q}</span>
                    </div>
                    <div className="sdm-faq-answer">
                      <div className="sdm-faq-answer-line" /><p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="sdm-cta-section">
            <div className="sdm-cta-content">
              <h3>Need {details.fullName}?</h3>
              <p>Get a free consultation and quote for your project</p>
              <div className="sdm-cta-buttons">
                <button className="sdm-cta-primary" onClick={onClose}>
                  <Phone size={18} /><span>Contact Us</span><ArrowRight size={18} />
                </button>
                <button className="sdm-cta-secondary">
                  <FileText size={18} /><span>Request Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER — Other Methods */}
        <div className="sdm-footer">
          <div className="sdm-footer-label">Other Testing Methods:</div>
          <div className="sdm-footer-methods">
            {allMethods
              .filter((m) => m.id !== method.id)
              .slice(0, 5)
              .map((m) => (
                <button key={m.id} className="sdm-footer-method-btn" onClick={() => onSelectMethod(m)}>
                  <div className="sdm-footer-method-icon" style={{ background: m.gradient }}>{m.icon}</div>
                  <span>{m.shortName}</span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;