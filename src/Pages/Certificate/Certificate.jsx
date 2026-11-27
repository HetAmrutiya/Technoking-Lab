import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./Certificate.css";
import {
  Activity,
  ArrowRight,
  AudioWaveform,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Droplets,
  ExternalLink,
  Eye,
  FileText,
  FlaskConical,
  Gauge,
  Globe,
  Hammer,
  Hash,
  Headphones,
  Layers,
  Loader2,
  Magnet,
  Mail,
  MapPin,
  Microscope,
  Monitor,
  Phone,
  Ruler,
  Scan,
  ScanEye,
  ScanLine,
  ShieldCheck,
  Sigma,
  Target,
  Atom,
  User,
  Waves,
  Wind,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import mineralsBackground from "../../assets/ut.jpg";

/* ============================================================
   📁 FILE LOCATIONS (inside `public/`)
   ------------------------------------------------------------
   public/certificates/asnt-level-3/   → ASNT Level III PDFs
   public/certificates/nabl/           → NABL Scope + Certificate
   public/certificates/en-iso-9712/    → EN ISO 9712 Level 2 PDFs
   public/certificates/previews/       → page images (OPTIONAL)
   ------------------------------------------------------------
   💡 If preview images are missing, the UI now falls back to
      showing the actual PDF in an iframe — the certificate
      is ALWAYS visible.
   ============================================================ */

const PUBLIC = "";
const pdf = (path) => `${PUBLIC}/certificates/${path}`;
const pages = (prefix, count) =>
  Array.from({ length: count }, (_, i) => `${PUBLIC}/certificates/previews/${prefix}-${i + 1}.jpg`);

/* 🎨 One colour per NDT method — used for icons & labels only */
const METHODS = {
  UT: { code: "UT", name: "Ultrasonic Testing", color: "#235781", Icon: Activity },
  RT: { code: "RT", name: "Radiographic Testing", color: "#B45309", Icon: Scan },
  MPT: { code: "MPT", name: "Magnetic Particle Testing", color: "#B91C1C", Icon: Magnet },
  DPT: { code: "DPT", name: "Dye / Liquid Penetrant Testing", color: "#0E7490", Icon: Droplets },
  SCOPE: { code: "SCOPE", name: "Scope of Accreditation", color: "#1E3A8A", Icon: FileText },
  NABL: { code: "NABL", name: "Accreditation Certificate", color: "#1E3A8A", Icon: ShieldCheck },
  PAUT: { code: "PAUT", name: "Phased Array Ultrasonic Testing", color: "#4338CA", Icon: Layers },
  TOFD: { code: "TOFD", name: "Time-of-Flight Diffraction", color: "#7C3AED", Icon: Waves },
  UTM: { code: "UTM", name: "Ultrasonic Thickness Measurement", color: "#0F766E", Icon: Ruler },
  ECT: { code: "ECT", name: "Eddy Current Testing", color: "#C2410C", Icon: Zap },
  PMI: { code: "PMI", name: "Positive Material Identification", color: "#047857", Icon: FlaskConical },
  LT: { code: "LT", name: "Helium Leak Testing", color: "#0369A1", Icon: Wind },
  VT: { code: "VT", name: "Visual Testing", color: "#0F766E", Icon: Eye },
  CR: { code: "CR", name: "Computed Radiography", color: "#B45309", Icon: ScanLine },
  DR: { code: "DR", name: "Digital Radiography", color: "#92400E", Icon: Monitor },
  HARDNESS: { code: "HT", name: "Portable Hardness Testing", color: "#A16207", Icon: Gauge },
  FMT: { code: "FMT", name: "Ferrite Metal Testing", color: "#9D174D", Icon: Atom },
  FM: { code: "FM", name: "Ferrite Measurement", color: "#BE185D", Icon: Sigma },
  BORO: { code: "BORO", name: "Boroscopy Testing", color: "#EA580C", Icon: ScanEye },
  VA: { code: "VA", name: "Vibration Analysis", color: "#6D28D9", Icon: AudioWaveform },
  ISM: { code: "ISM", name: "In-Situ Metallography", color: "#475569", Icon: Microscope },
  SPECTRO: { code: "SPECTRO", name: "Portable Spectrometer", color: "#065F46", Icon: FlaskConical },
  CATALOG: { code: "CATALOG", name: "Company Catalog", color: "#1C3553", Icon: BookOpen },
};

/* ============================================================
   📚 CATALOG & BROCHURES
   ------------------------------------------------------------
   public/certificates/catalog/    → brochure PDFs ("<NAME> BROCHURE.pdf")
   public/catalog/previews/        → page images ({prefix}-{n}.jpg, 12 per brochure)
   ------------------------------------------------------------
   To add a brochure: drop the PDF in public/certificates/catalog/,
   add its 12 page images to public/catalog/previews/ and add one
   brochure({...}) entry to BROCHURES below.
   ============================================================ */
const catalogFile = (name) => `${PUBLIC}/certificates/catalog/${encodeURIComponent(name)}`;
const catalogPages = (prefix, count) =>
  Array.from({ length: count }, (_, i) => `${PUBLIC}/catalog/previews/${prefix}-${i + 1}.jpg`);

const COMPANY = {
  name: "Technoking Testlab Pvt. Ltd.",
  motto: ["Accuracy", "Reliability", "Trust"],
  about:
    "Precision is more than a standard — it is our commitment. A team of skilled, experienced professionals delivering dependable Destructive (DT) and Non-Destructive Testing (NDT) solutions that help industries make confident quality and engineering decisions.",
  phone: "+91 95124 00501",
  email: "info@technokingtestlab.com",
  web: "www.technokinglab.com",
  address: "Plot No. 2, Shyam Industrial Park, Bakrol Bujrang, Gujarat 382430",
};

const COMPANY_CATALOG = {
  id: "catalog-company",
  method: "CATALOG",
  title: "Company Catalog — 2026 Edition",
  holder: COMPANY.name,
  file: catalogFile("TESTLAB CATALOG.pdf"),
  previews: catalogPages("testlab-catalog", 3),
};

const ADVANTAGES = [
  {
    Icon: ShieldCheck,
    title: "Commitment to Quality",
    text: "Accuracy and reliability in every test, following established standards and rigorous practice.",
  },
  {
    Icon: Target,
    title: "Technical Expertise",
    text: "Skilled professionals bringing industry knowledge and practical experience to every project.",
  },
  {
    Icon: Headphones,
    title: "Customer-Focused Service",
    text: "Clear communication, timely support and long-term partnerships built on trust.",
  },
];

const SERVICE_GROUPS = [
  {
    key: "ndt",
    title: "Non-Destructive Testing",
    Icon: Scan,
    items: [
      { name: "Ultrasonic Testing (UT)", brochure: "brochure-ut" },
      { name: "Magnetic Particle Testing (MT)", brochure: "brochure-mpt" },
      { name: "Liquid Penetrant Testing (PT/DPT)", brochure: "brochure-dpt" },
      { name: "Eddy Current Testing (ET)", brochure: "brochure-ect" },
      { name: "Phased Array UT (PAUT)", brochure: "brochure-paut" },
      { name: "Time of Flight Diffraction (TOFD)", brochure: "brochure-tofd" },
      { name: "Helium Leak Testing (LT)", brochure: "brochure-lt" },
      { name: "Visual Testing (VT)", brochure: "brochure-vt" },
      { name: "Positive Material Identification (PMI)", brochure: "brochure-pmi" },
      { name: "Ultrasonic Thickness Measurement (UTM)", brochure: "brochure-utm" },
      { name: "Computed Radiography (CR)", brochure: "brochure-cr" },
      { name: "Digital Radiography (DR)", brochure: "brochure-dr" },
      { name: "Boroscopy Testing", brochure: "brochure-boro" },
      { name: "Portable Hardness Testing", brochure: "brochure-hardness" },
      { name: "Ferrite Metal Testing", brochure: "brochure-fmt" },
      { name: "Ferrite Measurement", brochure: "brochure-fm" },
      { name: "Vibration Analysis", brochure: "brochure-va" },
    ],
  },
  {
    key: "dt",
    title: "Destructive Testing",
    Icon: Hammer,
    items: [
      "Tensile Testing",
      "Compression Testing",
      "Bend Testing",
      "Re-bend Testing",
      "Flattening Testing",
      "Impact Testing",
      "Hardness Testing",
      "Proof Load Testing",
      "Shear Testing",
      "Fastener Testing",
      "Paint & Surface Coating Testing",
    ].map((name) => ({ name })),
  },
  {
    key: "other",
    title: "Other Testing",
    Icon: FlaskConical,
    items: [
      { name: "Metallurgical Testing", detail: "Microscopic & macroscopic evaluation" },
      { name: "Corrosion Testing", detail: "Salt spray, salt fog" },
      { name: "Chemical Testing", detail: "PMI, OES, portable spectrometer", brochure: "brochure-spectro" },
      { name: "Geological Survey & Consultancy" },
      { name: "Water Testing" },
      { name: "Coating, Plating & Painting" },
      { name: "Geotextile Testing" },
    ],
  },
  {
    key: "metallography",
    title: "Metallography",
    Icon: Microscope,
    items: [
      { name: "Microscopic Evaluation" },
      { name: "Macroscopic Evaluation" },
      { name: "On-Site Metallography", brochure: "brochure-ism" },
    ],
  },
];

const BROCHURE_CONTENTS = ["Capabilities", "Applications", "Procedure", "Standards", "Industries"];

const brochure = ({ code, file, prefix, family, title, coverLines, tagline }) => ({
  id: `brochure-${code.toLowerCase()}`,
  method: code,
  family,
  label: "Brochure",
  title,
  coverLines,
  holder: COMPANY.name,
  tagline,
  file: catalogFile(file),
  previews: catalogPages(prefix, 12),
});

const BROCHURES = [
  brochure({
    code: "UT",
    file: "UT BROCHURE.pdf",
    prefix: "ut",
    family: "ultrasonic",
    title: "Ultrasonic Testing",
    coverLines: ["Ultrasonic", "Testing"],
    tagline:
      "Straight and angle beam inspection of welds, plates, pipes, forgings and castings for internal discontinuities.",
  }),
  brochure({
    code: "PAUT",
    file: "PAUT BROCHURE.pdf",
    prefix: "paut",
    family: "ultrasonic",
    title: "Phased Array Ultrasonic Testing",
    coverLines: ["Phased Array", "Ultrasonic Testing"],
    tagline:
      "Multi-element probes and electronically steered beams with detailed weld mapping and imaging.",
  }),
  brochure({
    code: "TOFD",
    file: "TOFD BROCHURE.pdf",
    prefix: "tofd",
    family: "ultrasonic",
    title: "Time-of-Flight Diffraction",
    coverLines: ["Time-of-Flight", "Diffraction"],
    tagline:
      "Paired-probe diffraction technique with recorded B-scan imaging to detect and accurately size weld flaws.",
  }),
  brochure({
    code: "UTM",
    file: "UTM BROCHURE.pdf",
    prefix: "utm",
    family: "ultrasonic",
    title: "Ultrasonic Thickness Measurement",
    coverLines: ["Ultrasonic Thickness", "Measurement"],
    tagline:
      "Wall-thickness verification and corrosion monitoring for pipes, tanks, pressure vessels and valves.",
  }),
  brochure({
    code: "MPT",
    file: "MPT BROCHURE.pdf",
    prefix: "mpt",
    family: "surface",
    title: "Magnetic Particle Testing",
    coverLines: ["Magnetic Particle", "Testing"],
    tagline:
      "Yoke and prod methods for surface and near-surface discontinuities in ferromagnetic components.",
  }),
  brochure({
    code: "DPT",
    file: "DPT BROCHURE.pdf",
    prefix: "dpt",
    family: "surface",
    title: "Dye Penetrant Testing",
    coverLines: ["Dye Penetrant", "Testing"],
    tagline:
      "Visible and fluorescent (UV-A) penetrant inspection to reveal fine surface-breaking discontinuities.",
  }),
  brochure({
    code: "ECT",
    file: "ECT BROCHURE.pdf",
    prefix: "ect",
    family: "surface",
    title: "Eddy Current Testing",
    coverLines: ["Eddy Current", "Testing"],
    tagline:
      "Electromagnetic inspection of conductive parts, plus conductivity evaluation and material sorting.",
  }),
  brochure({
    code: "PMI",
    file: "PMI BROCHURE.pdf",
    prefix: "pmi",
    family: "material",
    title: "Positive Material Identification",
    coverLines: ["Positive Material", "Identification"],
    tagline:
      "Handheld XRF analysis to verify alloy grades and chemical composition of critical components.",
  }),
  brochure({
    code: "CR",
    file: "CR BROCHURE.pdf",
    prefix: "cr",
    family: "radiography",
    title: "Computed Radiography",
    coverLines: ["Computed", "Radiography"],
    tagline:
      "Reusable imaging plates and laser scanning for digital radiographs of welds, pipes and castings.",
  }),
  brochure({
    code: "DR",
    file: "DR BROCHURE.pdf",
    prefix: "dr",
    family: "radiography",
    title: "Digital Radiography",
    coverLines: ["Digital", "Radiography"],
    tagline:
      "Flat panel detectors for fast, real-time radiographic imaging and corrosion profiling.",
  }),
  brochure({
    code: "VT",
    file: "VT BROCHURE.pdf",
    prefix: "vt",
    family: "visual",
    title: "Visual Testing",
    coverLines: ["Visual", "Testing"],
    tagline:
      "Direct and remote visual examination of welds and surfaces with weld gauges and proper lighting.",
  }),
  brochure({
    code: "BORO",
    file: "BOROSCOPY BROCHURE.pdf",
    prefix: "boroscopy",
    family: "visual",
    title: "Boroscopy Testing",
    coverLines: ["Boroscopy", "Testing"],
    tagline:
      "Videoscope inspection of pipe internals, weld roots, tubes and machinery through small access points.",
  }),
  brochure({
    code: "LT",
    file: "LT BROCHURE.pdf",
    prefix: "lt",
    family: "visual",
    title: "Helium Leak Testing",
    coverLines: ["Helium Leak", "Testing"],
    tagline:
      "Vacuum, sniffer, spray and accumulation methods to locate and measure leaks with helium tracer gas.",
  }),
  brochure({
    code: "SPECTRO",
    file: "PORTABLE SPECTROMETER BROCHURE.pdf",
    prefix: "spectrometer",
    family: "material",
    title: "Portable Spectrometer",
    coverLines: ["Portable", "Spectrometer"],
    tagline:
      "Mobile OES and handheld XRF analysis to identify alloy grades and verify chemical composition on site.",
  }),
  brochure({
    code: "HARDNESS",
    file: "PORTABLE HARDNESS BROCHURE.pdf",
    prefix: "hardness",
    family: "material",
    title: "Portable Hardness Testing",
    coverLines: ["Hardness", "Testing"],
    tagline:
      "UCI and rebound (Leeb) hardness testing of welds, HAZ, forgings and castings, including PWHT checks.",
  }),
  brochure({
    code: "FMT",
    file: "FERRITE METAL TESTING BROCHURE.pdf",
    prefix: "ferrite-metal",
    family: "material",
    title: "Ferrite Metal Testing",
    coverLines: ["Ferrite Metal", "Testing"],
    tagline:
      "Ferrite content verification of austenitic and duplex stainless steel welds, cladding and castings.",
  }),
  brochure({
    code: "FM",
    file: "FERRITE MEASUREMENT BROCHURE.pdf",
    prefix: "ferrite-measurement",
    family: "material",
    title: "Ferrite Measurement",
    coverLines: ["Ferrite", "Measurement"],
    tagline:
      "Calibrated ferritescope measurement of Ferrite Number (FN) and ferrite mapping across welds.",
  }),
  brochure({
    code: "ISM",
    file: "IN-SITU METALLOGRAPHY BROCHURE.pdf",
    prefix: "metallography",
    family: "material",
    title: "In-Situ Metallography",
    coverLines: ["In-Situ", "Metallography"],
    tagline:
      "Field polishing, etching and replicas to evaluate microstructure and creep damage without cutting samples.",
  }),
  brochure({
    code: "VA",
    file: "VIBRATION ANALYSIS BROCHURE.pdf",
    prefix: "vibration",
    family: "condition",
    title: "Vibration Analysis",
    coverLines: ["Vibration", "Analysis"],
    tagline:
      "FFT spectrum analysis of motors, pumps, fans and gearboxes to detect machine faults early.",
  }),
];

const BROCHURE_FILTERS = [
  { key: "all", label: "All" },
  { key: "ultrasonic", label: "Ultrasonic" },
  { key: "radiography", label: "Radiography" },
  { key: "surface", label: "Surface & Electromagnetic" },
  { key: "visual", label: "Visual & Leak" },
  { key: "material", label: "Material Analysis" },
  { key: "condition", label: "Condition Monitoring" },
];

const CERT_SECTIONS = [
  {
    key: "nabl",
    navLabel: "NABL Scope",
    badge: "NABL Accreditation",
    BadgeIcon: ShieldCheck,
    titleStart: "NABL",
    titleHighlight: "Scope",
    subtitle:
      "ISO/IEC 17025:2017 accredited testing laboratory — Technoking Engineers Pvt. Ltd., Shapar, Rajkot.",
    issuer: "National Accreditation Board for Testing and Calibration Laboratories",
    certificates: [
      {
        id: "nabl-certificate",
        method: "NABL",
        label: "NABL",
        title: "NABL Accreditation Certificate",
        holder: "Technoking Engineers Pvt. Ltd. (Testing Laboratory)",
        holderIcon: "org",
        certNo: "NABLT1026GJ19712",
        standard: "ISO/IEC 17025:2017",
        issued: "2026-10-09",
        validUntil: "2030-10-08",
        file: pdf("nabl/NABL.pdf"),
        previews: pages("nabl-cert", 1),
      },
      {
        id: "nabl-scope",
        method: "SCOPE",
        label: "NABL",
        title: "NABL Scope of Accreditation",
        holder: "Technoking Engineers Pvt. Ltd. (Testing Laboratory)",
        holderIcon: "org",
        certNo: "NABLT1026GJ19712",
        standard: "ISO/IEC 17025:2017",
        validUntil: "2030-10-08",
        note: "UT · MPT · DPT test methods (4 pages)",
        file: pdf("nabl/SCOPE.pdf"),
        previews: pages("nabl-scope", 4),
      },
    ],
  },
  {
    key: "asnt",
    navLabel: "ASNT Level III",
    badge: "ASNT Level III",
    BadgeIcon: Award,
    titleStart: "ASNT",
    titleHighlight: "Level III",
    subtitle:
      "NDT Level III certifications issued by ASNT Certification Services LLC (ANAB accredited, ISO/IEC 17024).",
    issuer: "ASNT Certification Services LLC",
    certificates: [
      {
        id: "asnt-ut",
        method: "UT",
        label: "ASNT Level III",
        title: "NDT Level III Ultrasonic Testing",
        holder: "Parth Amrutiya",
        certNo: "281821",
        issued: "2025-02-11",
        validUntil: "2030-02-28",
        file: pdf("asnt-level-3/UT.pdf"),
        previews: pages("asnt-ut", 1),
      },
      {
        id: "asnt-rt",
        method: "RT",
        label: "ASNT Level III",
        title: "NDT Level III Radiographic Testing",
        holder: "Amrutiya Parth Atulbhai",
        certNo: "281821",
        issued: "2024-10-23",
        validUntil: "2029-10-31",
        file: pdf("asnt-level-3/RT.pdf"),
        previews: pages("asnt-rt", 1),
      },
      {
        id: "asnt-mpt",
        method: "MPT",
        label: "ASNT Level III",
        title: "NDT Level III Magnetic Particle Testing",
        holder: "Parth Amrutiya",
        certNo: "281821",
        issued: "2025-05-13",
        validUntil: "2030-05-31",
        file: pdf("asnt-level-3/MT.pdf"),
        previews: pages("asnt-mt", 1),
      },
      {
        id: "asnt-dpt",
        method: "DPT",
        label: "ASNT Level III",
        title: "NDT Level III Liquid Penetrant Testing",
        holder: "Parth Amrutiya",
        certNo: "281821",
        issued: "2026-03-12",
        validUntil: "2031-03-31",
        file: pdf("asnt-level-3/PT.pdf"),
        previews: pages("asnt-pt", 1),
      },
    ],
  },
  {
    key: "iso",
    navLabel: "EN ISO 9712 Level II",
    badge: "EN ISO 9712 Level II",
    BadgeIcon: BadgeCheck,
    titleStart: "EN ISO 9712",
    titleHighlight: "Level II",
    subtitle:
      "Level 2 personnel certifications (Sector MS) issued by TÜV NORD Czech — EN ISO 9712:2022.",
    issuer: "TÜV NORD Czech, s.r.o. (Certification Body No. 3197)",
    certificates: [
      {
        id: "iso-ut",
        method: "UT",
        label: "EN ISO 9712 · L2",
        title: "Ultrasonic Testing — Level 2",
        holder: "Parth Atulbhai Amrutiya",
        certNo: "3197-CERT-NDT-0095-20",
        issued: "2025-12-12",
        validUntil: "2030-03-05",
        file: pdf("en-iso-9712/UT.pdf"),
        previews: pages("iso-ut", 2),
      },
      {
        id: "iso-rt",
        method: "RT",
        label: "EN ISO 9712 · L2",
        title: "Radiographic Testing — Level 2",
        holder: "Vadaliya Yashkumar Ashvinbhai",
        certNo: "3197-CERT-NDT-0541-25",
        issued: "2026-07-09",
        validUntil: "2031-07-08",
        file: pdf("en-iso-9712/RT.pdf"),
        previews: pages("iso-rt", 2),
      },
      {
        id: "iso-mpt",
        method: "MPT",
        label: "EN ISO 9712 · L2",
        title: "Magnetic Testing — Level 2",
        holder: "Vadaliya Yashkumar Ashvinbhai",
        certNo: "3197-CERT-NDT-0541-25",
        issued: "2025-12-12",
        validUntil: "2030-12-11",
        file: pdf("en-iso-9712/MT.pdf"),
        previews: pages("iso-mt", 2),
      },
      {
        id: "iso-dpt-het",
        method: "DPT",
        label: "EN ISO 9712 · L2",
        title: "Penetrant Testing — Level 2",
        holder: "Amrutiya Het Narotambhai",
        certNo: "3197-CERT-NDT-0263-26",
        issued: "2026-06-24",
        validUntil: "2031-06-23",
        file: pdf("en-iso-9712/PT.pdf"),
        previews: pages("iso-pt-het", 2),
      },
      {
        id: "iso-dpt-parth",
        method: "DPT",
        label: "EN ISO 9712 · L2",
        title: "Penetrant Testing — Level 2",
        holder: "Parth Atulbhai Amrutiya",
        certNo: "3197-CERT-NDT-0095-20",
        issued: "2026-06-24",
        validUntil: "2031-06-23",
        file: pdf("en-iso-9712/PT2.pdf"),
        previews: pages("iso-pt-parth", 2),
      },
    ],
  },
];

/* Tabs + hero stats — page order:
   1. Company Catalog · 2. NABL Scope · 3. ASNT Level III · 4. EN ISO 9712 Level II */
const NAV_ITEMS = [
  { key: "catalog", navLabel: "Company Catalog", BadgeIcon: BookOpen, count: BROCHURES.length + 1 },
  ...CERT_SECTIONS.map((s) => ({
    key: s.key,
    navLabel: s.navLabel,
    BadgeIcon: s.BadgeIcon,
    count: s.certificates.length,
  })),
];

/* Catalog is section 1, certificate sections follow */
const CATALOG_SECTION_NO = 1;
const CERT_SECTION_OFFSET = 2;

/* ============================================================
   🧰 HELPERS
   ============================================================ */
const formatDate = (iso) =>
  iso
    ? new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const getValidity = (validUntil) => {
  if (!validUntil) return null;
  const days = Math.ceil((new Date(`${validUntil}T23:59:59`) - new Date()) / 86400000);
  if (days < 0) return { text: "Expired", tone: "expired" };
  if (days <= 90) return { text: "Expiring soon", tone: "soon" };
  return { text: "Valid", tone: "valid" };
};

const downloadName = (cert) => decodeURIComponent(cert.file.split("/").pop());

/* ============================================================
   🔍 PREVIEW MODAL (image → iframe fallback)
   ============================================================ */
const PreviewModal = ({ cert, onClose, onDownload, downloading }) => {
  const previews = Array.isArray(cert.previews) ? cert.previews : [];
  const total = previews.length;

  const [page, setPage] = useState(() =>
    Math.max(0, Math.min(total - 1, Number(cert.startPage) || 0))
  );
  const [loaded, setLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [closing, setClosing] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const closeBtnRef = useRef(null);
  const touchX = useRef(null);

  const thumbsRef = useRef(null);

  const method = METHODS[cert.method] || METHODS.UT;
  const showIframe = total === 0 || imgFailed;
  const isBrochure = cert.method === "CATALOG" || Boolean(cert.family);
  const showStrip = isBrochure && !showIframe && total > 1;

  const jumpTo = (i) => {
    if (i === page) return;
    setLoaded(false);
    setZoomed(false);
    setPage(i);
  };

  // preload neighbouring pages so flipping feels instant
  useEffect(() => {
    if (showIframe) return;
    [page + 1, page - 1].forEach((i) => {
      if (previews[i]) {
        const img = new Image();
        img.src = previews[i];
      }
    });
  }, [page, previews, showIframe]);

  // keep the active thumbnail in view
  useEffect(() => {
    const strip = thumbsRef.current;
    const active = strip?.querySelector(`[data-thumb="${page}"]`);
    if (strip && active) {
      strip.scrollTo({
        left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [page]);

  const requestClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 220);
  }, [onClose]);

  const go = useCallback(
    (dir) => {
      setPage((p) => {
        const next = Math.min(total - 1, Math.max(0, p + dir));
        if (next !== p) {
          setLoaded(false);
          setZoomed(false);
        }
        return next;
      });
    },
    [total]
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
      if (!showIframe && e.key === "ArrowRight") go(1);
      if (!showIframe && e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, requestClose, showIframe]);

  const onTouchStart = (e) => {
    if (zoomed || showIframe) return;
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (zoomed || showIframe || touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div
      className={`qc-preview-overlay ${closing ? "qc-preview-closing" : ""}`}
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${cert.title}`}
    >
      <div
        className={`qc-preview-modal ${showStrip ? "qc-preview-has-strip" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="qc-preview-header">
          <div className="qc-preview-heading">
            <span className="qc-preview-method" style={{ background: method.color }}>
              <method.Icon size={16} />
              {method.code === "SCOPE" || method.code === "NABL"
                ? "NABL"
                : method.code === "CATALOG"
                ? "Catalog"
                : method.code}
            </span>
            <div className="qc-preview-titles">
              <h3>{cert.title}</h3>
              <p>{cert.holder}</p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            className="qc-preview-icon-btn"
            onClick={requestClose}
            aria-label="Close preview"
          >
            <X size={20} />
          </button>
        </div>

        {/* Document stage */}
        <div
          className={`qc-preview-stage ${zoomed ? "qc-preview-zoomed" : ""} ${
            showIframe ? "qc-preview-stage-pdf" : ""
          }`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {showIframe ? (
            <div className="qc-preview-pdf-wrap">
              <iframe
                src={`${cert.file}#view=FitH&navpanes=0`}
                className="qc-preview-iframe"
                title={`${cert.title} — PDF preview`}
              />
              <p className="qc-preview-pdf-note">
                <FileText size={13} />
                Can&apos;t see the PDF?{" "}
                <a href={cert.file} target="_blank" rel="noopener noreferrer">
                  Open in a new tab
                </a>
                .
              </p>
            </div>
          ) : (
            <>
              {!loaded && (
                <div className="qc-preview-loader">
                  <Loader2 size={34} className="qc-spin" />
                  <span>Loading preview…</span>
                </div>
              )}
              <img
                key={previews[page]}
                src={previews[page]}
                alt={`${cert.title} — page ${page + 1} of ${total}`}
                className={`qc-preview-image ${loaded ? "qc-preview-image-in" : ""}`}
                onLoad={() => setLoaded(true)}
                onError={() => {
                  setLoaded(true);
                  setImgFailed(true);
                }}
                onDoubleClick={() => setZoomed((z) => !z)}
                draggable={false}
              />

              {total > 1 && (
                <>
                  <button
                    className="qc-preview-nav qc-preview-prev"
                    onClick={() => go(-1)}
                    disabled={page === 0}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    className="qc-preview-nav qc-preview-next"
                    onClick={() => go(1)}
                    disabled={page === total - 1}
                    aria-label="Next page"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Page strip (brochures / catalog) */}
        {showStrip && (
          <div className="qc-preview-strip" ref={thumbsRef}>
            {previews.map((src, i) => (
              <button
                key={src}
                type="button"
                data-thumb={i}
                className={`qc-preview-strip-thumb ${i === page ? "active" : ""}`}
                onClick={() => jumpTo(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === page ? "page" : undefined}
              >
                <img src={src} alt="" loading="lazy" draggable={false} />
                <span>{i + 1}</span>
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="qc-preview-footer">
          <div className="qc-preview-pages">
            {showIframe ? (
              <span>PDF preview</span>
            ) : showStrip ? (
              <span>
                Page {page + 1} / {total}
              </span>
            ) : total > 1 ? (
              <div className="qc-preview-dots">
                {previews.map((_, i) => (
                  <button
                    key={i}
                    className={`qc-preview-dot ${i === page ? "active" : ""}`}
                    onClick={() => {
                      if (i !== page) {
                        setLoaded(false);
                        setZoomed(false);
                        setPage(i);
                      }
                    }}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
                <span>
                  Page {page + 1} / {total}
                </span>
              </div>
            ) : (
              <span>1 page</span>
            )}
          </div>

          <div className="qc-preview-actions">
            {!showIframe && (
              <button
                className="qc-preview-icon-btn"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
                title={zoomed ? "Zoom out" : "Zoom in"}
              >
                {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </button>
            )}
            <a
              className="qc-preview-icon-btn"
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open original PDF in a new tab"
              title="Open original PDF"
            >
              <ExternalLink size={18} />
            </a>
            <button
              className="qc-preview-download"
              onClick={() => onDownload(cert)}
              disabled={downloading}
            >
              {downloading ? <Loader2 size={18} className="qc-spin" /> : <Download size={18} />}
              <span>{downloading ? "Downloading…" : "Download PDF"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   🏆 PAGE
   ============================================================ */
const Certificate = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [downloadingId, setDownloadingId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].key);
  const [previewCert, setPreviewCert] = useState(null);
  const [toast, setToast] = useState(null);
  const [thumbErrors, setThumbErrors] = useState({});
  const [catalogFilter, setCatalogFilter] = useState("all");

  const sectionRefs = useRef([]);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const toastTimer = useRef(null);

  const primaryColor = "#235781";
  const primaryLight = "#4A82A8";

  const totalDocs = NAV_ITEMS.reduce((n, s) => n + s.count, 0);

  const filteredBrochures = useMemo(
    () =>
      catalogFilter === "all" ? BROCHURES : BROCHURES.filter((b) => b.family === catalogFilter),
    [catalogFilter]
  );

  const addToRefs = (el, index) => {
    sectionRefs.current[index] = el;
  };

  const markThumbError = (id) =>
    setThumbErrors((prev) => (prev[id] ? prev : { ...prev, [id]: true }));

  /* hero particles — generated once (same as Contact) */
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${12 + Math.random() * 18}s`,
        delay: `${Math.random() * 10}s`,
        size: `${4 + Math.random() * 9}px`,
        alpha: 0.1 + Math.random() * 0.22,
      })),
    []
  );

  const showToast = (message, tone = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ message, tone });
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  };
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // scroll progress
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // hero mouse spotlight (same as Contact)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      hero.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  // reveal animations
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
              }, (Number(entry.target.dataset.index) || 0) * 120);
            } else if (key !== "hero") {
              // the hero runs its own staggered entrance
              entry.target.classList.add("qc-fade-in-up");
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    document.querySelectorAll(".qc-certificate-card").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // scroll-spy
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.dataset.spy);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    document.querySelectorAll("[data-spy]").forEach((el) => spy.observe(el));
    return () => spy.disconnect();
  }, []);

  // keep active tab visible
  useEffect(() => {
    const tab = navRef.current?.querySelector(`[data-tab="${activeSection}"]`);
    if (tab && navRef.current) {
      const nav = navRef.current;
      const target = tab.offsetLeft - nav.clientWidth / 2 + tab.clientWidth / 2;
      nav.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [activeSection]);

  const scrollToSection = (key) => {
    const el = document.getElementById(`cert-${key}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDownload = async (cert) => {
    if (downloadingId) return;
    setDownloadingId(cert.id);
    try {
      const res = await fetch(cert.file);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      if (blob.type && !blob.type.includes("pdf") && blob.type.includes("html")) {
        throw new Error("File not found");
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = downloadName(cert);
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      showToast(`${cert.title} downloaded`);
    } catch (err) {
      console.error("Certificate download failed:", err);
      if (err.message === "File not found") {
        showToast("Certificate file not found. Please contact us.", "error");
      } else {
        window.open(cert.file, "_blank", "noopener,noreferrer");
        showToast("Opened the PDF — use your browser's save option.", "info");
      }
    } finally {
      setTimeout(() => setDownloadingId(null), 600);
    }
  };

  const openPreview = (cert, startPage = 0) => setPreviewCert({ ...cert, startPage });

  const openBrochureById = (id) => {
    const b = BROCHURES.find((x) => x.id === id);
    if (b) openPreview(b);
  };

  // subtle 3D tilt for brochure covers
  const handleBookMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${px * 14}deg`);
    el.style.setProperty("--rx", `${-py * 10}deg`);
    el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
  };
  const handleBookLeave = (e) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };

  const renderBrochureCover = (b) => {
    const method = METHODS[b.method] || METHODS.UT;
    const hasImage = !thumbErrors[b.id];
    return hasImage ? (
      <img
        src={b.previews[0]}
        alt={`${b.title} brochure cover`}
        loading="lazy"
        draggable={false}
        onError={() => markThumbError(b.id)}
      />
    ) : (
      /* Designed fallback cover in the brochure's own style */
      <div className="qc-brochure-fallback">
        <span className="qc-brochure-fallback-brand">
          Technoking
          <small>Testlab Pvt Ltd</small>
        </span>
        <span className="qc-brochure-fallback-title">
          {b.coverLines.map((line, i) => (
            <span key={line} className={i === b.coverLines.length - 1 ? "strong" : ""}>
              {line}
            </span>
          ))}
        </span>
        <span className="qc-brochure-fallback-panel">
          <method.Icon size={22} />
        </span>
        <span className="qc-brochure-fallback-year">
          20
          <br />
          26
        </span>
      </div>
    );
  };

  const renderBrochureCard = (b, i) => {
    const method = METHODS[b.method] || METHODS.UT;
    const isDownloading = downloadingId === b.id;
    return (
      <article
        key={b.id}
        id={b.id}
        className="qc-brochure-card"
        style={{ "--i": i, "--method-color": method.color }}
      >
        <button
          type="button"
          className="qc-brochure-cover"
          onClick={() => openPreview(b)}
          onMouseMove={handleBookMove}
          onMouseLeave={handleBookLeave}
          aria-label={`Preview ${b.title} brochure`}
        >
          <span className="qc-brochure-book">
            {renderBrochureCover(b)}
            <span className="qc-brochure-spine" aria-hidden="true"></span>
            <span className="qc-brochure-sheen" aria-hidden="true"></span>
          </span>
          <span className="qc-brochure-pagestack" aria-hidden="true"></span>
          <span className="qc-brochure-open">
            <BookOpen size={16} />
            Open brochure
          </span>
        </button>

        <div className="qc-brochure-body">
          <div className="qc-brochure-meta">
            <span className="qc-brochure-code">
              <method.Icon size={14} />
              {method.code}
            </span>
            <span className="qc-brochure-pages">{b.previews.length} pages</span>
          </div>
          <h4 className="qc-brochure-title">{b.title}</h4>
          <p className="qc-brochure-tagline">{b.tagline}</p>

          <div className="qc-brochure-actions">
            <button
              type="button"
              className="qc-brochure-btn qc-brochure-btn-ghost"
              onClick={() => openPreview(b)}
            >
              <Eye size={16} />
              Preview
            </button>
            <button
              type="button"
              className="qc-brochure-btn qc-brochure-btn-solid"
              onClick={() => handleDownload(b)}
              disabled={isDownloading}
              aria-label={`Download ${b.title} brochure`}
            >
              {isDownloading ? <Loader2 size={16} className="qc-spin" /> : <Download size={16} />}
              {isDownloading ? "Saving…" : "PDF"}
            </button>
          </div>
        </div>
      </article>
    );
  };

  const renderCatalogSection = () => {
    const catalogDownloading = downloadingId === COMPANY_CATALOG.id;
    const spreadOk = !thumbErrors[COMPANY_CATALOG.id];
    const sectionNo = CATALOG_SECTION_NO;

    return (
      <section
        id="cert-catalog"
        className={`qc-catalog-section ${visibleSections.catalog ? "qc-catalog-in" : ""}`}
        ref={(el) => addToRefs(el, CATALOG_SECTION_NO)}
        data-section="catalog"
        data-spy="catalog"
      >
        <div className="qc-catalog-bg" aria-hidden="true">
          <span className="qc-catalog-shape qc-catalog-shape-1"></span>
          <span className="qc-catalog-shape qc-catalog-shape-2"></span>
        </div>

        {/* Header */}
        <div className="qc-section-header">
          <div className="qc-section-badge" style={{ background: primaryColor }}>
            <BookOpen size={16} />
            {sectionNo}. Company Catalog
          </div>
          <h2 className="qc-section-title">
            Service <span style={{ color: primaryColor }}>Catalog</span>
          </h2>
          <div className="qc-section-divider">
            <div
              className="qc-divider-line"
              style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}
            ></div>
            <div className="qc-divider-dot qc-pulse-dot" style={{ background: primaryColor }}></div>
            <div
              className="qc-divider-line"
              style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}
            ></div>
          </div>
          <p className="qc-section-subtitle">
            Our company profile and method-wise brochures — capabilities, procedures, standards
            and the industries we serve.
          </p>
          <p className="qc-section-issuer">
            <Building2 size={14} />
            Published by {COMPANY.name} · 2026 Edition
          </p>
        </div>

        <div className="qc-catalog-inner">
          {/* ---------- Featured company profile ---------- */}
          <div className="qc-catalog-feature qc-catalog-reveal" style={{ "--d": "0s" }}>
            <div className="qc-catalog-feature-media">
              <button
                type="button"
                className="qc-catalog-spread"
                onClick={() => openPreview(COMPANY_CATALOG)}
                aria-label="Preview company catalog"
              >
                {spreadOk ? (
                  <img
                    src={COMPANY_CATALOG.previews[0]}
                    alt="Technoking Testlab company catalog"
                    draggable={false}
                    onError={() => markThumbError(COMPANY_CATALOG.id)}
                  />
                ) : (
                  <span className="qc-catalog-spread-fallback">
                    <BookOpen size={40} />
                    <strong>Technoking Testlab</strong>
                    <small>Company Catalog · 2026</small>
                  </span>
                )}
                <span className="qc-catalog-spread-fold" aria-hidden="true"></span>
                <span className="qc-catalog-spread-overlay">
                  <Eye size={18} />
                  View catalog
                </span>
              </button>

              <span className="qc-catalog-edition">2026 Edition</span>

              {spreadOk && (
                <div className="qc-catalog-pages-row">
                  {COMPANY_CATALOG.previews.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      className="qc-catalog-page-thumb"
                      onClick={() => openPreview(COMPANY_CATALOG, i)}
                      aria-label={`Open catalog page ${i + 1}`}
                    >
                      <img src={src} alt="" loading="lazy" draggable={false} />
                      <span>0{i + 1}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="qc-catalog-feature-body">
              <span className="qc-catalog-eyebrow">Company Profile</span>
              <h3 className="qc-catalog-company">{COMPANY.name}</h3>
              <p className="qc-catalog-motto">
                {COMPANY.motto.map((m, i) => (
                  <React.Fragment key={m}>
                    {i > 0 && <span className="qc-catalog-motto-dot">•</span>}
                    {m}
                  </React.Fragment>
                ))}
              </p>
              <p className="qc-catalog-about">{COMPANY.about}</p>

              <ul className="qc-catalog-advantages">
                {ADVANTAGES.map(({ Icon, title, text }) => (
                  <li key={title}>
                    <span className="qc-catalog-adv-icon">
                      <Icon size={18} />
                    </span>
                    <div>
                      <strong>{title}</strong>
                      <span>{text}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="qc-catalog-feature-actions">
                <button
                  type="button"
                  className="qc-catalog-cta qc-catalog-cta-primary"
                  onClick={() => openPreview(COMPANY_CATALOG)}
                >
                  <BookOpen size={18} />
                  View Catalog
                </button>
                <button
                  type="button"
                  className="qc-catalog-cta qc-catalog-cta-ghost"
                  onClick={() => handleDownload(COMPANY_CATALOG)}
                  disabled={catalogDownloading}
                >
                  {catalogDownloading ? (
                    <Loader2 size={18} className="qc-spin" />
                  ) : (
                    <Download size={18} />
                  )}
                  {catalogDownloading ? "Downloading…" : "Download PDF"}
                </button>
              </div>
            </div>
          </div>

          {/* ---------- Our services (brochure-style panel) ---------- */}
          <div className="qc-catalog-services qc-catalog-reveal" style={{ "--d": "0.1s" }}>
            <div className="qc-catalog-ribbon">
              <span>Our Services</span>
            </div>
            <div className="qc-catalog-services-grid">
              {SERVICE_GROUPS.map((g, gi) => (
                <div
                  key={g.key}
                  className={`qc-catalog-service qc-catalog-service-${g.key}`}
                  style={{ "--d": `${0.15 + gi * 0.08}s` }}
                >
                  <div className="qc-catalog-service-head">
                    <span className="qc-catalog-service-icon">
                      <g.Icon size={18} />
                    </span>
                    <h4>{g.title}</h4>
                    <span className="qc-catalog-service-count">{g.items.length}</span>
                  </div>
                  <ul>
                    {g.items.map((item) => (
                      <li key={item.name}>
                        <span className="qc-catalog-bullet" aria-hidden="true"></span>
                        <span className="qc-catalog-service-name">
                          {item.name}
                          {item.detail && <small>{item.detail}</small>}
                        </span>
                        {item.brochure && (
                          <button
                            type="button"
                            className="qc-catalog-service-link"
                            onClick={() => openBrochureById(item.brochure)}
                            aria-label={`Open ${item.name} brochure`}
                            title="Open brochure"
                          >
                            <BookOpen size={13} />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Brochure library ---------- */}
          <div className="qc-catalog-library-head qc-catalog-reveal" style={{ "--d": "0.15s" }}>
            <div>
              <span className="qc-catalog-eyebrow">Method Brochures</span>
              <h3 className="qc-catalog-library-title">Explore each testing method in detail</h3>
              <p className="qc-catalog-library-sub">
                Every brochure covers {BROCHURE_CONTENTS.join(" · ").toLowerCase()}.
              </p>
            </div>
            <div className="qc-catalog-filters" role="tablist" aria-label="Filter brochures">
              {BROCHURE_FILTERS.map((f) => {
                const count =
                  f.key === "all"
                    ? BROCHURES.length
                    : BROCHURES.filter((b) => b.family === f.key).length;
                return (
                  <button
                    key={f.key}
                    type="button"
                    role="tab"
                    aria-selected={catalogFilter === f.key}
                    className={`qc-catalog-filter ${catalogFilter === f.key ? "active" : ""}`}
                    onClick={() => setCatalogFilter(f.key)}
                  >
                    {f.label}
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="qc-brochure-grid" key={catalogFilter}>
            {filteredBrochures.map((b, i) => renderBrochureCard(b, i))}
          </div>

          {/* ---------- Contact strip ---------- */}
          <div className="qc-catalog-contact qc-catalog-reveal" style={{ "--d": "0.2s" }}>
            <div className="qc-catalog-contact-text">
              <h3>Thank you for getting to know us better.</h3>
              <p>
                Need a test plan, a quotation or a printed copy of our catalog? Our team is happy
                to help.
              </p>
            </div>
            <ul className="qc-catalog-contact-list">
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>
                  <Phone size={16} />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`}>
                  <Mail size={16} />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={`https://${COMPANY.web}`} target="_blank" rel="noopener noreferrer">
                  <Globe size={16} />
                  {COMPANY.web}
                </a>
              </li>
              <li>
                <span>
                  <MapPin size={16} />
                  {COMPANY.address}
                </span>
              </li>
            </ul>
            <a className="qc-catalog-contact-cta" href={`mailto:${COMPANY.email}`}>
              Send an enquiry
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    );
  };

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleCardAnimationEnd = (e) => {
    if (e.animationName === "qc-certPopIn") {
      e.currentTarget.classList.add("qc-cert-visible");
      e.currentTarget.classList.remove("qc-cert-pop-in");
    }
  };

  const renderCard = (cert, index) => {
    const method = METHODS[cert.method] || METHODS.UT;
    const validity = getValidity(cert.validUntil);
    const isDownloading = downloadingId === cert.id;
    const HolderIcon = cert.holderIcon === "org" ? Building2 : User;
    const showMethodCode = cert.method !== "SCOPE" && cert.method !== "NABL";
    const previewList = Array.isArray(cert.previews) ? cert.previews : [];
    const showThumbImage = previewList.length > 0 && !thumbErrors[cert.id];

    return (
      <article
        key={cert.id}
        className="qc-certificate-card"
        data-index={index}
        onMouseMove={handleCardMouseMove}
        onAnimationEnd={handleCardAnimationEnd}
        style={{ "--method-color": method.color }}
      >
        <div
          className="qc-cert-glow"
          style={{
            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${primaryColor}20, transparent 70%)`,
          }}
        ></div>

        <div className="qc-cert-badge">{cert.label}</div>

        {/* Thumbnail → opens preview */}
        <button
          type="button"
          className="qc-cert-thumb"
          onClick={() => openPreview(cert)}
          aria-label={`Preview ${cert.title}`}
        >
          {showThumbImage ? (
            <img
              src={previewList[0]}
              alt={`${cert.title} preview`}
              loading="lazy"
              draggable={false}
              onError={() => markThumbError(cert.id)}
            />
          ) : (
            <div className="qc-cert-thumb-fallback">
              <div className="qc-cert-thumb-fallback-icon">
                <method.Icon size={30} />
              </div>
              <span className="qc-cert-thumb-fallback-code">{method.code}</span>
              <span className="qc-cert-thumb-fallback-text">Official PDF</span>
            </div>
          )}
          <span className="qc-cert-thumb-overlay">
            <Eye size={20} />
            Preview
          </span>
          {previewList.length > 1 && (
            <span className="qc-cert-thumb-pages">{previewList.length} pages</span>
          )}
        </button>

        {/* Method label */}
        <div className="qc-cert-method-row">
          <div className="qc-cert-icon qc-cert-icon-sm">
            <method.Icon size={22} />
            <div className="qc-cert-icon-ring" style={{ borderColor: method.color }}></div>
          </div>
          <div className="qc-cert-method-text">
            {showMethodCode && <span className="qc-cert-method-code">{method.code}</span>}
            <span className="qc-cert-method-name">{method.name}</span>
          </div>
        </div>

        <h3 className="qc-cert-title">{cert.title}</h3>

        <ul className="qc-cert-meta">
          <li>
            <HolderIcon size={15} />
            <span className="qc-cert-meta-value">{cert.holder}</span>
          </li>
          <li>
            <Hash size={15} />
            <span>
              Cert. No. <strong>{cert.certNo}</strong>
            </span>
          </li>
          {cert.standard && (
            <li>
              <BadgeCheck size={15} />
              <span>{cert.standard}</span>
            </li>
          )}
          <li>
            <Calendar size={15} />
            <span>
              {cert.issued ? `${formatDate(cert.issued)} – ` : "Valid until "}
              <strong>{formatDate(cert.validUntil)}</strong>
            </span>
          </li>
        </ul>

        {cert.note && <p className="qc-cert-description">{cert.note}</p>}

        {validity && (
          <span className={`qc-cert-status qc-cert-status-${validity.tone}`}>
            <span className="qc-cert-status-dot"></span>
            {validity.text}
          </span>
        )}

        <div className="qc-cert-actions">
          <button
            type="button"
            className="qc-cert-preview-btn"
            onClick={() => openPreview(cert)}
            style={{ color: primaryColor, borderColor: `${primaryColor}55` }}
          >
            <Eye size={18} />
            <span>Preview</span>
          </button>

          <button
            type="button"
            className={`qc-cert-download-btn ${isDownloading ? "qc-cert-downloading" : ""}`}
            onClick={() => handleDownload(cert)}
            disabled={isDownloading}
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})`,
            }}
          >
            <span className="qc-cert-btn-text">{isDownloading ? "Downloading..." : "Download"}</span>
            <span className="qc-cert-btn-icon">
              {isDownloading ? <Loader2 size={18} /> : <Download size={18} />}
            </span>
            <span className="qc-cert-btn-glow"></span>
          </button>
        </div>

        <div
          className="qc-cert-hover-line"
          style={{
            background: `linear-gradient(90deg, ${method.color}, ${primaryLight})`,
          }}
        ></div>
      </article>
    );
  };

  return (
    <div className="qc-certificate-container">
      <div className="qc-scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* HERO — same design as the Contact Us hero */}
      <section
        className={`qch-hero ${visibleSections.hero ? "qch-in" : ""}`}
        ref={(el) => {
          heroRef.current = el;
          addToRefs(el, 0);
        }}
        data-section="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10, 22, 40, 0.9) 0%, rgba(35, 87, 129, 0.76) 100%), url(${mineralsBackground})`,
        }}
      >
        <div className="qch-hero-spotlight" aria-hidden="true"></div>
        <div className="qch-hero-grid" aria-hidden="true"></div>
        <div className="qch-hero-scanline" aria-hidden="true"></div>

        <div className="qch-hero-particles" aria-hidden="true">
          {particles.map((p) => (
            <span
              key={p.id}
              className="qch-hero-particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
                background: `rgba(143, 184, 217, ${p.alpha})`,
              }}
            ></span>
          ))}
        </div>

        <div className="qch-container">
          <div className="qch-hero-content">
            <div className="qch-hero-badge qch-hero-step" style={{ "--d": "0.05s" }}>
              <span className="qch-badge-dot"></span>
              Our Certifications
            </div>

            <p className="qch-hero-subtitle qch-hero-step" style={{ "--d": "0.18s" }}>
              Certified, accredited and trusted for quality.
              <br />
              Explore our catalog and download our certificates.
            </p>

          </div>
        </div>

        <div className="qch-hero-scroll" aria-hidden="true">
          <div className="qch-scroll-mouse">
            <div className="qch-scroll-wheel"></div>
          </div>
          <div className="qch-scroll-text">Scroll Down</div>
        </div>
      </section>

      {/* TABS */}
      <nav className="qc-cert-tabs-wrap" aria-label="Certificate sections">
        <div className="qc-cert-tabs" ref={navRef}>
          {NAV_ITEMS.map((s, i) => (
            <button
              key={s.key}
              type="button"
              data-tab={s.key}
              className={`qc-cert-tab ${activeSection === s.key ? "active" : ""}`}
              onClick={() => scrollToSection(s.key)}
              aria-current={activeSection === s.key ? "true" : undefined}
            >
              <span className="qc-cert-tab-num">{i + 1}</span>
              <s.BadgeIcon size={16} />
              <span className="qc-cert-tab-label">{s.navLabel}</span>
              <span className="qc-cert-tab-count">{s.count}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* SECTIONS */}
      <div id="certificates" className="qc-certificates-wrapper">
        {/* 1. Company Catalog */}
        {renderCatalogSection()}

        {/* 2. NABL Scope · 3. ASNT Level III · 4. EN ISO 9712 Level II */}
        {CERT_SECTIONS.map((section, sIndex) => (
          <section
            key={section.key}
            id={`cert-${section.key}`}
            className={`qc-certificates-section qc-cert-section-${section.key}`}
            ref={(el) => addToRefs(el, sIndex + CERT_SECTION_OFFSET)}
            data-section={section.key}
            data-spy={section.key}
          >
            <div className="qc-cert-pattern"></div>

            <div className="qc-section-header">
              <div className="qc-section-badge" style={{ background: primaryColor }}>
                <section.BadgeIcon size={16} />
                {sIndex + CERT_SECTION_OFFSET}. {section.badge}
              </div>
              <h2 className="qc-section-title">
                {section.titleStart}{" "}
                <span style={{ color: primaryColor }}>{section.titleHighlight}</span>
              </h2>
              <div className="qc-section-divider">
                <div
                  className="qc-divider-line"
                  style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }}
                ></div>
                <div
                  className="qc-divider-dot qc-pulse-dot"
                  style={{ background: primaryColor }}
                ></div>
                <div
                  className="qc-divider-line"
                  style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}
                ></div>
              </div>
              <p className="qc-section-subtitle">{section.subtitle}</p>
              <p className="qc-section-issuer">
                <ShieldCheck size={14} />
                Issued by {section.issuer}
              </p>
            </div>

            <div className={`qc-cert-grid qc-cert-grid-${section.certificates.length}`}>
              {section.certificates.map((cert, i) => renderCard(cert, i))}
            </div>
          </section>
        ))}

        <p className="qc-cert-footnote">
          {totalDocs} official documents · Tap <strong>Preview</strong> to view any certificate or
          brochure, or <strong>Download</strong> to save the original PDF.
        </p>
      </div>

      {/* MODAL */}
      {previewCert && (
        <PreviewModal
          key={`${previewCert.id}-${previewCert.startPage || 0}`}
          cert={previewCert}
          onClose={() => setPreviewCert(null)}
          onDownload={handleDownload}
          downloading={downloadingId === previewCert.id}
        />
      )}

      {/* TOAST */}
      {toast && (
        <div className={`qc-cert-toast qc-cert-toast-${toast.tone}`} role="status">
          {toast.tone === "error" ? <X size={16} /> : <BadgeCheck size={16} />}
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Certificate;