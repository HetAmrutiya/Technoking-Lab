import React, { useEffect, useRef, useState } from "react";
import "./ServiceDetailModal.css";
import {
  X,
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
  Award,
  Clock,
  Users,
  Shield,
  TrendingUp,
  Microscope,
  Gauge,
  Factory,
  Plane,
  Car,
  Ship,
  HardHat,
  ChevronRight,
  Star,
  Layers,
  Activity,
  BarChart3,
  FileText,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  Gem,
  Globe,
  Lightbulb,
  Settings,
  Thermometer,
  Maximize2,
  Cpu,
  Wrench,
  FlaskConical,
  TestTube,
  Beaker,
  Lock,
  Eye,
  Crosshair,
  Fingerprint,
  Box,
  Grid3X3,
  CircleDot,
  AlertTriangle,
  ThumbsUp,
  Briefcase,
  Building2,
  Truck,
  Container,
  Fuel,
  Wind,
  Flame,
  Snowflake,
  Cloud,
  Sun,
} from "lucide-react";

const iconMap = {
  Waves: <Waves size={24} />,
  Magnet: <Magnet size={24} />,
  Droplets: <Droplets size={24} />,
  Zap: <Zap size={24} />,
  Scan: <Scan size={24} />,
  Atom: <Atom size={24} />,
  Radio: <Radio size={24} />,
  Diamond: <Diamond size={24} />,
  Ruler: <Ruler size={24} />,
};

const ServiceDetailModal = ({ isOpen, onClose, method, allMethods, onSelectMethod }) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animatedItems, setAnimatedItems] = useState([]);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Primary colors
  const primaryColor = "#235781";
  const primaryDark = "#16405F";
  const primaryLight = "#4A82A8";

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      // Animate items on open
      setTimeout(() => {
        setAnimatedItems([1, 2, 3, 4, 5, 6, 7, 8]);
      }, 300);
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
      setAnimatedItems([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle scroll progress within modal
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress || 0);
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (content) {
        content.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isOpen]);

  if (!isOpen || !method) return null;

  // Extended detail data for each method
  const getMethodDetails = (m) => {
    const detailsMap = {
      UT: {
        fullName: "Ultrasonic Testing",
        tagline: "Precision Sound Wave Inspection",
        overview: "Ultrasonic Testing (UT) uses high-frequency sound waves to detect internal flaws, measure material thickness, and evaluate material properties. This method is exceptionally effective for detecting planar defects like cracks, laminations, and lack of fusion in welds and base materials.",
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
          { property: "Certification", value: "ASNT Level III", icon: "🏅" },
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
        overview: "Magnetic Particle Testing (MPT) is a nondestructive testing method used to detect surface and near-surface discontinuities in ferromagnetic materials. It's highly effective for finding cracks, seams, laps, and other defects in iron, nickel, and cobalt alloys.",
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
          { property: "Standards", value: "ASTM E709, ISO 9934", icon: "📋" },
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
        overview: "Dye Penetrant Testing (DPT) is a widely used nondestructive testing method for detecting surface-breaking defects in non-porous materials. It's particularly effective for finding cracks, porosity, and other surface discontinuities in metals, plastics, ceramics, and glass.",
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
          { property: "UV Light", value: "1000 μW/cm²", icon: "🔦" },
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
        overview: "Eddy Current Testing (ECT) uses electromagnetic induction to detect surface and near-surface defects in conductive materials. It's widely used for heat exchanger tube inspection, aircraft structure testing, and coating thickness measurement.",
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
        overview: "Phased Array Ultrasonic Testing (PAUT) is an advanced ultrasonic technique that uses multiple small elements in a single probe. By controlling the timing of each element, the beam can be steered, focused, and swept electronically, providing detailed 2D and 3D imaging of defects.",
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
          { q: "What certifications are needed?", a: "ASNT Level II/III in PAUT, plus specific equipment training." },
        ],
      },
      PMI: {
        fullName: "Positive Material Identification",
        tagline: "Material Composition Verification",
        overview: "Positive Material Identification (PMI) is a nondestructive testing method used to verify the chemical composition and alloy grade of materials. It's critical for ensuring that the correct materials are used in critical applications, preventing catastrophic failures due to material mix-ups.",
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
      Spectro: {
        fullName: "Portable Spectrometer Analysis",
        tagline: "Field Chemical Composition Analysis",
        overview: "Portable Spectrometer Analysis uses handheld optical emission or X-ray fluorescence technology to determine the chemical composition of metals and alloys in the field. It's essential for material verification, quality control, and scrap sorting.",
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
        overview: "Portable Hardness Testing uses ultrasonic contact impedance (UCI) or rebound (Leeb) methods to measure material hardness without significant surface damage. It's ideal for testing large components, heat-affected zones, and in-service equipment.",
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
        overview: "Ultrasonic Thickness Measurement uses high-frequency sound waves to measure the thickness of materials from one side. It's essential for monitoring corrosion, erosion, and wall thinning in pipelines, tanks, and pressure vessels.",
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

  // Sections for navigation
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

  return (
    <div className={`sdm-overlay ${isVisible ? "sdm-visible" : ""}`}>
      {/* Animated Background */}
      <div className="sdm-bg-particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="sdm-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
              width: `${2 + Math.random() * 6}px`,
              height: `${2 + Math.random() * 6}px`,
              background: `rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(primaryColor.slice(5, 7), 16)}, ${0.1 + Math.random() * 0.3})`,
            }}
          />
        ))}
      </div>

      {/* Main Modal */}
      <div className="sdm-modal" ref={modalRef}>
        {/* Scroll Progress */}
        <div
          className="sdm-scroll-progress"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Header */}
        <div
          className="sdm-header"
          style={{
            background: `linear-gradient(135deg, ${primaryDark} 0%, ${primaryColor} 50%, ${primaryLight} 100%)`,
          }}
        >
          {/* Animated Header Background */}
          <div className="sdm-header-pattern">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="sdm-header-shape"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${8 + Math.random() * 8}s`,
                }}
              />
            ))}
          </div>

          <div className="sdm-header-content">
            <button className="sdm-close-btn" onClick={onClose}>
              <X size={24} />
              <div className="sdm-close-ring" />
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
                  <Sparkles size={14} />
                  {details.shortName} • {details.tagline}
                </div>
                <h1 className="sdm-method-title">{details.fullName}</h1>
                <p className="sdm-method-short-desc">{method.description}</p>

                <div className="sdm-header-stats">
                  <div className="sdm-header-stat">
                    <div className="sdm-header-stat-icon">
                      <Shield size={18} />
                    </div>
                    <div className="sdm-header-stat-info">
                      <span className="sdm-header-stat-value">ASNT Level III</span>
                      <span className="sdm-header-stat-label">Certified</span>
                    </div>
                  </div>
                  <div className="sdm-header-stat-divider" />
                  <div className="sdm-header-stat">
                    <div className="sdm-header-stat-icon">
                      <Clock size={18} />
                    </div>
                    <div className="sdm-header-stat-info">
                      <span className="sdm-header-stat-value">24/7</span>
                      <span className="sdm-header-stat-label">Available</span>
                    </div>
                  </div>
                  <div className="sdm-header-stat-divider" />
                  <div className="sdm-header-stat">
                    <div className="sdm-header-stat-icon">
                      <Award size={18} />
                    </div>
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

        {/* Navigation Tabs */}
        <div className="sdm-nav-tabs">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`sdm-nav-tab ${activeSection === section.id ? "sdm-nav-tab-active" : ""}`}
              onClick={() => {
                setActiveSection(section.id);
                if (contentRef.current) {
                  contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              {section.icon}
              <span>{section.label}</span>
              {activeSection === section.id && <div className="sdm-nav-tab-indicator" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="sdm-content" ref={contentRef}>
          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="sdm-section sdm-animate-in">
              <div className="sdm-section-header">
                <div className="sdm-section-icon"><Eye size={24} /></div>
                <h2>Overview</h2>
              </div>
              <div className="sdm-overview-grid">
                <div className="sdm-overview-text">
                  <p>{details.overview}</p>
                </div>
                <div className="sdm-overview-highlights">
                  {details.applicationsDetailed.slice(0, 5).map((app, i) => (
                    <div key={i} className="sdm-highlight-card" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="sdm-highlight-card-icon">
                        <Target size={18} />
                      </div>
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

          {/* Working Principle */}
          {activeSection === "principle" && (
            <div className="sdm-section sdm-animate-in">
              <div className="sdm-section-header">
                <div className="sdm-section-icon"><Settings size={24} /></div>
                <h2>How It Works</h2>
              </div>
              <div className="sdm-principle-content">
                <div className="sdm-principle-text">
                  <p>{details.workingPrinciple}</p>
                </div>
                <div className="sdm-principle-diagram">
                  <div className="sdm-diagram-container">
                    <div className="sdm-diagram-item sdm-diagram-animate" style={{ animationDelay: "0s" }}>
                      <div className="sdm-diagram-icon"><Zap size={32} /></div>
                      <span>Signal Generation</span>
                    </div>
                    <div className="sdm-diagram-arrow">
                      <ChevronRight size={24} />
                    </div>
                    <div className="sdm-diagram-item sdm-diagram-animate" style={{ animationDelay: "0.2s" }}>
                      <div className="sdm-diagram-icon"><Activity size={32} /></div>
                      <span>Wave Propagation</span>
                    </div>
                    <div className="sdm-diagram-arrow">
                      <ChevronRight size={24} />
                    </div>
                    <div className="sdm-diagram-item sdm-diagram-animate" style={{ animationDelay: "0.4s" }}>
                      <div className="sdm-diagram-icon"><Box size={32} /></div>
                      <span>Material Interaction</span>
                    </div>
                    <div className="sdm-diagram-arrow">
                      <ChevronRight size={24} />
                    </div>
                    <div className="sdm-diagram-item sdm-diagram-animate" style={{ animationDelay: "0.6s" }}>
                      <div className="sdm-diagram-icon"><BarChart3 size={32} /></div>
                      <span>Signal Analysis</span>
                    </div>
                    <div className="sdm-diagram-arrow">
                      <ChevronRight size={24} />
                    </div>
                    <div className="sdm-diagram-item sdm-diagram-animate" style={{ animationDelay: "0.8s" }}>
                      <div className="sdm-diagram-icon"><FileText size={32} /></div>
                      <span>Result Output</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Equipment */}
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
                    <h3>{eq.name}</h3>
                    <p>{eq.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applications */}
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
                      <div className="sdm-application-name">
                        <CheckCircle size={18} />
                        {app.name}
                      </div>
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

          {/* Specifications */}
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

          {/* Advantages */}
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
                    <h3>{adv.title}</h3>
                    <p>{adv.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Standards */}
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

          {/* Industries */}
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
                        <li key={j}>
                          <ChevronRight size={14} />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
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
                      <div className="sdm-faq-answer-line" />
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="sdm-cta-section">
            <div className="sdm-cta-content">
              <h3>Need {details.fullName}?</h3>
              <p>Get a free consultation and quote for your project</p>
              <div className="sdm-cta-buttons">
                <button className="sdm-cta-primary" onClick={() => { onClose(); }}>
                  <Phone size={18} />
                  <span>Contact Us</span>
                  <ArrowRight size={18} />
                </button>
                <button className="sdm-cta-secondary">
                  <FileText size={18} />
                  <span>Request Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Methods Navigation */}
        <div className="sdm-footer">
          <div className="sdm-footer-label">Other Testing Methods:</div>
          <div className="sdm-footer-methods">
            {allMethods
              .filter((m) => m.id !== method.id)
              .slice(0, 5)
              .map((m) => (
                <button
                  key={m.id}
                  className="sdm-footer-method-btn"
                  onClick={() => onSelectMethod(m)}
                >
                  <div className="sdm-footer-method-icon" style={{ background: m.gradient }}>
                    {m.icon}
                  </div>
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