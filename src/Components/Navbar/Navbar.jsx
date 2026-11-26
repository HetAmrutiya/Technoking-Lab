import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Atom,
  Award,
  BarChart3,
  Briefcase,
  Check,
  ChevronDown,
  Clock,
  Diamond,
  Droplets,
  GitBranch,
  Home,
  Layers,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Magnet,
  MessageSquareText,
  Microscope,
  Phone,
  Ruler,
  Scan,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  User,
  Waves,
  Wrench,
  X,
  Zap,
  Factory,
} from "lucide-react";
import logoDesktop from "../../assets/logo-ls.png";
import logoMobile from "../../assets/logo.png";
import AuthContainer from "../../Pages/Login/AuthContainer";
import "./Navbar.css";

/* ============================================================
   📞 CONTACT + FORM SETTINGS — EDIT ONLY HERE
   ============================================================ */
const COMPANY = {
  name: "Technoking Testlab Pvt Ltd",
  phone: "+91 95124 00501",
  email: "info@technokingtestlab.com",
};

/* Same Web3Forms key as the Contact page — inquiries arrive by email */
const WEB3FORMS_KEY = "5162d798-f96f-4824-a967-12cdaad116e8";

/* ============================================================
   🧭 MAIN LINKS
   ============================================================ */
const NAV_LINKS = [
  { key: "home", label: "Home", path: "/", Icon: Home },
  { key: "product", label: "Our Services", path: "/product", Icon: Layers, hasMega: true },
  { key: "industry", label: "Industry We Serve", path: "/industry", Icon: Factory },
  { key: "contact", label: "Contact Us", path: "/contact", Icon: Phone },
  { key: "certificate", label: "Certificate", path: "/certificate", Icon: Award },
];

const PATH_TO_KEY = {
  "/": "home",
  "/product": "product",
  "/industry": "industry",
  "/contact": "contact",
  "/certificate": "certificate",
};

/* ============================================================
   🔬 SERVICES — slug MUST match method.shortName.toLowerCase()
   ============================================================ */
const SERVICES_DATA = [
  {
    title: "Advanced NDT",
    Icon: Sparkles,
    services: [
      { label: "Phased Array Ultrasonic Testing (PAUT)", slug: "paut", Icon: Scan },
      { label: "Time of Flight Diffraction (TOFD)", slug: "tofd", Icon: Waves },
      { label: "Eddy Current Testing (ET)", slug: "ect", Icon: Zap },
      { label: "Portable Spectro Testing (PST)", slug: "spectro", Icon: Microscope },
      { label: "Computed Radiography (CR)", slug: "cr", Icon: Scan },
      { label: "Digital Radiography (DR)", slug: "dr", Icon: Scan },
    ],
  },
  {
    title: "Conventional NDT",
    Icon: Activity,
    services: [
      { label: "Ultrasonic Testing (UT)", slug: "ut", Icon: Waves },
      { label: "Magnetic Particle Testing (MPT)", slug: "mpt", Icon: Magnet },
      { label: "Dye Penetrant Testing (DPT)", slug: "dpt", Icon: Droplets },
      { label: "Positive Material Identification (PMI)", slug: "pmi", Icon: Atom },
      { label: "Hardness Testing", slug: "hardness", Icon: Diamond },
      { label: "Thickness Measurement", slug: "thickness", Icon: Ruler },
    ],
  },
  {
    title: "Destructive Testing",
    Icon: BarChart3,
    services: [
      { label: "Tensile Testing", slug: "tensile", Icon: TrendingUp },
      { label: "Compression Testing", slug: "compression", Icon: Layers },
      { label: "Bend Testing", slug: "bend", Icon: GitBranch },
      { label: "Re-bend Testing", slug: "re-bend", Icon: GitBranch },
      { label: "Impact Testing", slug: "impact", Icon: Zap },
      { label: "Bench Hardness Testing", slug: "benchhardness", Icon: Diamond },
      { label: "Mechanical Testing", slug: "mechanical", Icon: Wrench },
      { label: "Metallurgical Testing", slug: "metallurgical", Icon: Microscope },
    ],
  },
];

const TOTAL_SERVICES = new Set(SERVICES_DATA.flatMap((c) => c.services.map((s) => s.slug))).size;

/* ============================================================
   📝 INQUIRY FORM
   ============================================================ */
const EMPTY_INQUIRY = { name: "", email: "", designation: "", phoneNumber: "", description: "" };
const DESCRIPTION_MAX = 600;

const INQUIRY_FIELDS = [
  { name: "name", label: "Full Name", type: "text", Icon: User, autoComplete: "name" },
  { name: "email", label: "Email Address", type: "email", Icon: Mail, autoComplete: "email" },
  { name: "designation", label: "Designation", type: "text", Icon: Briefcase, autoComplete: "organization-title" },
  { name: "phoneNumber", label: "Phone Number", type: "tel", Icon: Phone, autoComplete: "tel" },
];

const validateInquiry = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address";
  if (!data.designation.trim()) errors.designation = "Designation is required";
  if (!data.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
  else if (!/^[0-9+\-\s()]{7,15}$/.test(data.phoneNumber)) errors.phoneNumber = "Please enter a valid phone number";
  if (!data.description.trim()) errors.description = "Please describe your requirement";
  return errors;
};

/* ---------- page scroll lock that keeps the scroll position ---------- */
let lockCount = 0;
const lockScroll = () => {
  lockCount += 1;
  if (lockCount === 1) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
  }
};
const unlockScroll = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
};

/* ============================================================
   📝 INQUIRY MODAL
   ============================================================ */
const InquiryModal = ({ open, onClose }) => {
  const [data, setData] = useState(EMPTY_INQUIRY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [shakeKey, setShakeKey] = useState(0);
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);

  const firstFieldRef = useRef(null);
  const returnFocusRef = useRef(null);
  const closeTimer = useRef(null);

  const isSending = status === "sending";

  /* enter / exit animation */
  useEffect(() => {
    let raf = 0;
    let t = 0;
    if (open) {
      returnFocusRef.current = document.activeElement;
      setRendered(true);
      raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      t = setTimeout(() => setRendered(false), 320);
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!rendered) return undefined;
    lockScroll();
    return () => {
      unlockScroll();
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [rendered]);

  useEffect(() => {
    if (visible && status !== "success") firstFieldRef.current?.focus({ preventScroll: true });
  }, [visible, status]);

  /* reset after closing */
  useEffect(() => {
    if (!rendered) {
      setErrors({});
      setStatus("idle");
    }
  }, [rendered]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const requestClose = useCallback(() => {
    if (isSending) return;
    clearTimeout(closeTimer.current);
    onClose();
  }, [isSending, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, requestClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.submit) setErrors((prev) => ({ ...prev, [name]: "", submit: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;
    const found = validateInquiry(data);
    if (Object.keys(found).length) {
      setErrors(found);
      setShakeKey((k) => k + 1);
      const firstBad = INQUIRY_FIELDS.find((f) => found[f.name])?.name || "description";
      document.getElementById(`iq-${firstBad}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_KEY);
      formData.append("subject", `New website inquiry — ${data.name}`);
      formData.append("from_name", "Technoking Website — Inquiry Form");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("designation", data.designation);
      formData.append("phone", data.phoneNumber);
      formData.append("message", data.description);

      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Submission failed");

      setStatus("success");
      setData(EMPTY_INQUIRY);
      setErrors({});
      closeTimer.current = setTimeout(() => onClose(), 3200);
    } catch (err) {
      setStatus("idle");
      setErrors({ submit: "Couldn't send your inquiry. Please try again, or call us directly." });
      setShakeKey((k) => k + 1);
    }
  };

  if (!rendered) return null;

  return (
    <div
      className={`iq-overlay ${visible ? "is-visible" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div className="iq-modal" role="dialog" aria-modal="true" aria-labelledby="iq-title">
        {/* ---------- left info panel ---------- */}
        <aside className="iq-aside">
          <div className="iq-aside-grid" aria-hidden="true" />
          <div className="iq-aside-orb" aria-hidden="true" />

          <div className="iq-brand">
            <span className="iq-brand-icon">
              <MessageSquareText size={20} />
            </span>
            {COMPANY.name}
          </div>

          <h2 className="iq-aside-title">
            Let&apos;s talk about <span>your testing</span> needs.
          </h2>
          <p className="iq-aside-text">
            Share a few details and our team will get back to you with the right method and a
            quotation.
          </p>

          <ul className="iq-perks">
            {[
              { Icon: Clock, text: "Quick response from our team" },
              { Icon: ShieldCheck, text: "Expert NDT & DT guidance" },
              { Icon: Check, text: "No obligation quotation" },
            ].map(({ Icon, text }, i) => (
              <li key={text} style={{ "--i": i }}>
                <span>
                  <Icon size={15} />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <div className="iq-aside-contact">
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

        {/* ---------- right: form / success ---------- */}
        <div className="iq-main">
          <button
            type="button"
            className="iq-close"
            onClick={requestClose}
            disabled={isSending}
            aria-label="Close inquiry form"
          >
            <X size={20} />
          </button>

          {status === "success" ? (
            <div className="iq-success" role="status">
              <svg className="iq-check" viewBox="0 0 52 52" aria-hidden="true">
                <circle className="iq-check-circle" cx="26" cy="26" r="24" />
                <path className="iq-check-mark" d="M15 27 l7 7 l15 -16" />
              </svg>
              <h3>Thank you!</h3>
              <p>
                Your inquiry has been sent successfully.
                <br />
                We&apos;ll get back to you soon.
              </p>
              <button type="button" className="iq-btn-ghost" onClick={requestClose}>
                Close
              </button>
            </div>
          ) : (
            <>
              <header className="iq-head">
                <span className="iq-eyebrow">Inquiry Form</span>
                <h2 id="iq-title">How can we help?</h2>
                <p>All fields are required.</p>
              </header>

              <form
                className={`iq-form ${shakeKey > 0 ? "is-retry" : ""}`}
                onSubmit={handleSubmit}
                noValidate
                key={shakeKey}
              >
                <div className="iq-grid">
                  {INQUIRY_FIELDS.map((f, i) => (
                    <div
                      key={f.name}
                      className={`iq-field ${errors[f.name] ? "has-error" : ""}`}
                      style={{ "--i": i }}
                    >
                      <input
                        ref={i === 0 ? firstFieldRef : undefined}
                        id={`iq-${f.name}`}
                        name={f.name}
                        type={f.type}
                        placeholder=" "
                        autoComplete={f.autoComplete}
                        value={data[f.name]}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors[f.name])}
                        aria-describedby={errors[f.name] ? `iq-${f.name}-err` : undefined}
                      />
                      <label htmlFor={`iq-${f.name}`}>{f.label}</label>
                      <f.Icon size={18} className="iq-field-icon" />
                      <span className="iq-field-line" aria-hidden="true" />
                      {errors[f.name] && (
                        <span className="iq-error" id={`iq-${f.name}-err`}>
                          <AlertCircle size={13} />
                          {errors[f.name]}
                        </span>
                      )}
                    </div>
                  ))}

                  <div
                    className={`iq-field iq-field-full iq-field-area ${errors.description ? "has-error" : ""}`}
                    style={{ "--i": 4 }}
                  >
                    <textarea
                      id="iq-description"
                      name="description"
                      placeholder=" "
                      rows={4}
                      maxLength={DESCRIPTION_MAX}
                      value={data.description}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.description)}
                      aria-describedby={errors.description ? "iq-description-err" : undefined}
                    />
                    <label htmlFor="iq-description">Describe your requirement</label>
                    <MessageSquareText size={18} className="iq-field-icon" />
                    <span className="iq-field-line" aria-hidden="true" />
                    <span className="iq-counter">
                      {data.description.length}/{DESCRIPTION_MAX}
                    </span>
                    {errors.description && (
                      <span className="iq-error" id="iq-description-err">
                        <AlertCircle size={13} />
                        {errors.description}
                      </span>
                    )}
                  </div>
                </div>

                {errors.submit && (
                  <div className="iq-submit-error" role="alert">
                    <AlertCircle size={16} />
                    {errors.submit}
                  </div>
                )}

                <button type="submit" className={`iq-submit ${isSending ? "is-sending" : ""}`} disabled={isSending}>
                  <span className="iq-submit-fill" aria-hidden="true" />
                  <span>{isSending ? "Sending…" : "Submit Inquiry"}</span>
                  {isSending ? <Loader2 size={18} className="iq-spin" /> : <Send size={18} className="iq-send" />}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   🧭 NAVBAR
   ============================================================ */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState(PATH_TO_KEY[location.pathname] || "home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  const linksRef = useRef(null);
  const itemRefs = useRef({});
  const userMenuRef = useRef(null);
  const megaRef = useRef(null);
  const servicesTimer = useRef(null);
  const drawerRef = useRef(null);

  /* ---------- services mega menu open/close with grace delay ---------- */
  const openServices = useCallback(() => {
    clearTimeout(servicesTimer.current);
    setIsServicesOpen(true);
  }, []);
  const closeServices = useCallback(() => {
    clearTimeout(servicesTimer.current);
    servicesTimer.current = setTimeout(() => setIsServicesOpen(false), 180);
  }, []);

  /* ---------- drawer ---------- */
  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setIsMobileServicesOpen(false);
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) return undefined;
    lockScroll();
    return unlockScroll;
  }, [isDrawerOpen]);

  /* ---------- navigation ---------- */
  const handleNavigation = (path, key) => {
    setActiveMenu(key);
    setIsServicesOpen(false);
    closeDrawer();
    navigate(path);
  };

  /* Click a service → /product opens its detail modal (key makes repeat clicks work) */
  const handleServiceClick = (service) => {
    setActiveMenu("product");
    setIsServicesOpen(false);
    closeDrawer();
    navigate("/product", { state: { openService: service.slug, key: Date.now() } });
  };

  const openInquiry = () => {
    setIsServicesOpen(false);
    closeDrawer();
    setIsInquiryOpen(true);
  };

  /* ---------- auth (unchanged behaviour) ---------- */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    setIsUserMenuOpen(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUserInfo(userData);
    setIsAuthModalOpen(false);
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const stored = localStorage.getItem("userData");
    if (token && stored) {
      try {
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(stored));
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      }
    }
  }, []);

  /* ---------- active link from route ---------- */
  useEffect(() => {
    const key = PATH_TO_KEY[location.pathname];
    if (key) setActiveMenu(key);
  }, [location.pathname]);

  /* /product without a service → start at top */
  useEffect(() => {
    if (location.pathname === "/product" && !location.state?.openService) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.state]);

  /* ---------- scroll: compact navbar + home-page section spy ---------- */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 40);
      if (location.pathname === "/") {
        for (const sec of ["home", "about", "services", "team", "contact"]) {
          const el = document.getElementById(sec);
          if (el) {
            const r = el.getBoundingClientRect();
            if (r.top <= 100 && r.bottom >= 100) {
              setActiveMenu(sec);
              break;
            }
          }
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  /* ---------- click outside / Escape ---------- */
  useEffect(() => {
    const onDown = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setIsUserMenuOpen(false);
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target) &&
        !e.target.closest?.(".nv-link-has-mega")
      ) {
        setIsServicesOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setIsServicesOpen(false);
      setIsUserMenuOpen(false);
      closeDrawer();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [closeDrawer]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 992) closeDrawer();
      else setIsServicesOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeDrawer]);

  useEffect(() => () => clearTimeout(servicesTimer.current), []);

  /* ---------- sliding "pill" behind desktop links ---------- */
  const movePillTo = useCallback((key) => {
    const el = itemRefs.current[key];
    if (!el) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, []);

  const activeKeyForPill = NAV_LINKS.some((l) => l.key === activeMenu) ? activeMenu : null;

  useLayoutEffect(() => {
    movePillTo(activeKeyForPill);
  }, [activeKeyForPill, isScrolled, movePillTo]);

  useEffect(() => {
    const onResize = () => movePillTo(activeKeyForPill);
    window.addEventListener("resize", onResize);
    document.fonts?.ready?.then(onResize);
    // logo image loading can shift the links
    const t = setTimeout(onResize, 400);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, [activeKeyForPill, movePillTo]);

  const initials = useMemo(() => userInfo?.fullName?.charAt(0)?.toUpperCase() || "U", [userInfo]);

  return (
    <>
      <header
        className={`nv ${isScrolled ? "nv-scrolled" : ""} ${isServicesOpen ? "nv-mega-open" : ""}`}
      >
        <div className="nv-shell">
          <div className="nv-inner">
            {/* Logo */}
            <button type="button" className="nv-logo" onClick={() => handleNavigation("/", "home")} aria-label="Home">
              <img src={logoDesktop} alt="Technoking" className="nv-logo-img nv-logo-desktop" />
              <img src={logoMobile} alt="Technoking" className="nv-logo-img nv-logo-mobile" />
            </button>

            {/* Desktop links */}
            <nav className="nv-links-wrap" aria-label="Main">
              <ul
                className="nv-links"
                ref={linksRef}
                onMouseLeave={() => movePillTo(activeKeyForPill)}
              >
                <span
                  className={`nv-pill ${pill.visible ? "is-visible" : ""}`}
                  style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
                  aria-hidden="true"
                />
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeMenu === link.key;
                  return (
                    <li
                      key={link.key}
                      ref={(el) => (itemRefs.current[link.key] = el)}
                      className={`nv-link ${isActive ? "is-active" : ""} ${link.hasMega ? "nv-link-has-mega" : ""} ${
                        link.hasMega && isServicesOpen ? "is-open" : ""
                      }`}
                      style={{ "--i": i }}
                      onMouseEnter={() => {
                        movePillTo(link.key);
                        if (link.hasMega) openServices();
                      }}
                      onMouseLeave={() => {
                        if (link.hasMega) closeServices();
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavigation(link.path, link.key)}
                        onFocus={() => {
                          movePillTo(link.key);
                          if (link.hasMega) openServices();
                        }}
                        aria-current={isActive ? "page" : undefined}
                        aria-haspopup={link.hasMega ? "true" : undefined}
                        aria-expanded={link.hasMega ? isServicesOpen : undefined}
                      >
                        {link.label}
                        {link.hasMega && <ChevronDown size={15} className="nv-chevron" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right side */}
            <div className="nv-actions">
              {isLoggedIn ? (
                <div className="nv-user" ref={userMenuRef}>
                  <button
                    type="button"
                    className={`nv-user-toggle ${isUserMenuOpen ? "is-open" : ""}`}
                    onClick={() => setIsUserMenuOpen((o) => !o)}
                    aria-expanded={isUserMenuOpen}
                    aria-label="User menu"
                  >
                    <span className="nv-avatar">{initials}</span>
                    <span className="nv-user-name">{userInfo?.fullName || "User"}</span>
                    <ChevronDown size={15} className="nv-chevron" />
                  </button>

                  <div className={`nv-user-menu ${isUserMenuOpen ? "is-open" : ""}`} aria-hidden={!isUserMenuOpen}>
                    <div className="nv-user-head">
                      <span className="nv-avatar nv-avatar-lg">{initials}</span>
                      <div>
                        <strong>{userInfo?.fullName || "User"}</strong>
                        <small>{userInfo?.email || ""}</small>
                      </div>
                    </div>
                    {[
                      { label: "Dashboard", path: "/dashboard", Icon: LayoutDashboard },
                      { label: "My Profile", path: "/profile", Icon: User },
                      { label: "My Orders", path: "/orders", Icon: ShoppingBag },
                    ].map(({ label, path, Icon }) => (
                      <button
                        key={path}
                        type="button"
                        className="nv-user-option"
                        onClick={() => {
                          navigate(path);
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <Icon size={17} />
                        {label}
                      </button>
                    ))}
                    <button type="button" className="nv-user-option nv-user-logout" onClick={handleLogout}>
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" className="nv-cta" onClick={openInquiry}>
                  <span className="nv-cta-shine" aria-hidden="true" />
                  <MessageSquareText size={17} />
                  <span>Inquiry Form</span>
                </button>
              )}

              <button
                type="button"
                className={`nv-burger ${isDrawerOpen ? "is-open" : ""}`}
                onClick={() => (isDrawerOpen ? closeDrawer() : setIsDrawerOpen(true))}
                aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
                aria-expanded={isDrawerOpen}
                aria-controls="nv-drawer"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          {/* ================= DESKTOP MEGA MENU ================= */}
          <div
            ref={megaRef}
            className={`nv-mega ${isServicesOpen ? "is-open" : ""}`}
            onMouseEnter={openServices}
            onMouseLeave={closeServices}
          >
            <div className="nv-mega-feature">
              <div className="nv-mega-feature-grid" aria-hidden="true" />
              <span className="nv-mega-eyebrow">Our Services</span>
              <h3>
                {TOTAL_SERVICES} testing services,
                <br />
                one trusted lab.
              </h3>
              <p>Advanced NDT, conventional NDT and destructive testing — pick a method to see full details.</p>
              <div className="nv-mega-feature-actions">
                <button type="button" className="nv-mega-all" onClick={() => handleNavigation("/product", "product")}>
                  View all services
                  <ArrowRight size={16} />
                </button>
                <button type="button" className="nv-mega-quote" onClick={openInquiry}>
                  Request a quote
                </button>
              </div>
            </div>

            <div className="nv-mega-cols">
              {SERVICES_DATA.map((cat, ci) => (
                <div key={cat.title} className="nv-mega-col" style={{ "--c": ci }}>
                  <h4>
                    <cat.Icon size={15} />
                    {cat.title}
                  </h4>
                  <ul>
                    {cat.services.map((service, si) => (
                      <li key={service.slug} style={{ "--s": si }}>
                        <button type="button" onClick={() => handleServiceClick(service)}>
                          <span className="nv-mega-ico">
                            <service.Icon size={14} />
                          </span>
                          <span className="nv-mega-label">{service.label}</span>
                          <ArrowRight size={14} className="nv-mega-arrow" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`nv-backdrop ${isDrawerOpen ? "is-open" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        id="nv-drawer"
        ref={drawerRef}
        className={`nv-drawer ${isDrawerOpen ? "is-open" : ""}`}
        aria-hidden={!isDrawerOpen}
        aria-label="Menu"
      >
        <div className="nv-drawer-head">
          <img src={logoMobile} alt="Technoking" className="nv-drawer-logo" />
          <button type="button" className="nv-drawer-close" onClick={closeDrawer} aria-label="Close menu" tabIndex={isDrawerOpen ? 0 : -1}>
            <X size={20} />
          </button>
        </div>

        {isLoggedIn && (
          <div className="nv-drawer-user">
            <span className="nv-avatar nv-avatar-lg">{initials}</span>
            <div>
              <strong>{userInfo?.fullName || "User"}</strong>
              <small>{userInfo?.email || ""}</small>
            </div>
          </div>
        )}

        <ul className="nv-drawer-links">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeMenu === link.key;
            if (link.hasMega) {
              return (
                <li key={link.key} style={{ "--i": i }} className={isMobileServicesOpen ? "is-expanded" : ""}>
                  <button
                    type="button"
                    className={`nv-drawer-link ${isActive ? "is-active" : ""}`}
                    onClick={() => setIsMobileServicesOpen((o) => !o)}
                    aria-expanded={isMobileServicesOpen}
                    tabIndex={isDrawerOpen ? 0 : -1}
                  >
                    <span className="nv-drawer-ico">
                      <link.Icon size={18} />
                    </span>
                    {link.label}
                    <ChevronDown size={18} className="nv-drawer-chevron" />
                  </button>

                  <div className="nv-drawer-services">
                    <div>
                      {SERVICES_DATA.map((cat) => (
                        <div key={cat.title} className="nv-drawer-group">
                          <span className="nv-drawer-group-title">{cat.title}</span>
                          {cat.services.map((service) => (
                            <button
                              key={service.slug}
                              type="button"
                              className="nv-drawer-service"
                              onClick={() => handleServiceClick(service)}
                              tabIndex={isDrawerOpen && isMobileServicesOpen ? 0 : -1}
                            >
                              <service.Icon size={14} />
                              {service.label}
                            </button>
                          ))}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="nv-drawer-all"
                        onClick={() => handleNavigation("/product", "product")}
                        tabIndex={isDrawerOpen && isMobileServicesOpen ? 0 : -1}
                      >
                        View all services
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            }
            return (
              <li key={link.key} style={{ "--i": i }}>
                <button
                  type="button"
                  className={`nv-drawer-link ${isActive ? "is-active" : ""}`}
                  onClick={() => handleNavigation(link.path, link.key)}
                  tabIndex={isDrawerOpen ? 0 : -1}
                >
                  <span className="nv-drawer-ico">
                    <link.Icon size={18} />
                  </span>
                  {link.label}
                  <ArrowRight size={16} className="nv-drawer-arrow" />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="nv-drawer-foot">
          {isLoggedIn ? (
            <button type="button" className="nv-drawer-cta nv-drawer-cta-ghost" onClick={handleLogout} tabIndex={isDrawerOpen ? 0 : -1}>
              <LogOut size={17} />
              Logout
            </button>
          ) : (
            <button type="button" className="nv-drawer-cta" onClick={openInquiry} tabIndex={isDrawerOpen ? 0 : -1}>
              <MessageSquareText size={17} />
              Inquiry Form
            </button>
          )}
          <div className="nv-drawer-contact">
            <a href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`} tabIndex={isDrawerOpen ? 0 : -1}>
              <Phone size={15} />
              Call us
            </a>
            <a href={`mailto:${COMPANY.email}`} tabIndex={isDrawerOpen ? 0 : -1}>
              <Mail size={15} />
              Email us
            </a>
          </div>
        </div>
      </aside>

      <AuthContainer
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <InquiryModal open={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </>
  );
};

export default Navbar;