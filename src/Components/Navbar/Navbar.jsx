import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import AuthContainer from "../../Pages/Login/AuthContainer";
import "./Navbar.css";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Inquiry form state
  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    designation: "",
    description: "",
    phoneNumber: "",
  });
  const [inquiryErrors, setInquiryErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const inquiryCardRef = useRef(null);

  const handleNavigation = (path, name) => {
    setActiveMenu(name);
    navigate(path);
    closeMobileMenu();
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
    closeMobileMenu();
  };

  const handleInquiryClick = () => {
    setIsInquiryModalOpen(true);
    closeMobileMenu();
  };

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

  const closeMobileMenu = useCallback(() => {
    setIsSidebarOpen(false);
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
    document.body.style.width = "auto";
  }, []);

  // ===== INQUIRY FORM HANDLERS =====
  const handleInquiryChange = (e) => {
    const { name, value } = e.target;
    setInquiryData((prev) => ({ ...prev, [name]: value }));
    if (inquiryErrors[name]) {
      setInquiryErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateInquiryForm = () => {
    const errors = {};
    if (!inquiryData.name.trim()) errors.name = "Name is required";
    if (!inquiryData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!inquiryData.designation.trim())
      errors.designation = "Designation is required";
    if (!inquiryData.description.trim())
      errors.description = "Description is required";
    if (!inquiryData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(inquiryData.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
    }
    return errors;
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    const errors = validateInquiryForm();
    if (Object.keys(errors).length > 0) {
      setInquiryErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Replace with your actual API endpoint
      // const response = await fetch("/api/inquiry", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(inquiryData),
      // });
      // if (!response.ok) throw new Error("Submission failed");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Inquiry submitted:", inquiryData);

      setSubmitSuccess(true);
      setInquiryData({
        name: "",
        email: "",
        designation: "",
        description: "",
        phoneNumber: "",
      });
      setInquiryErrors({});

      setTimeout(() => {
        setSubmitSuccess(false);
        setIsInquiryModalOpen(false);
      }, 2500);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setInquiryErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeInquiryModal = () => {
    if (isSubmitting) return;
    setIsInquiryModalOpen(false);
    setInquiryErrors({});
    setSubmitSuccess(false);
  };

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUserData = localStorage.getItem("userData");

    if (token && storedUserData) {
      try {
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(storedUserData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      }
    }
  }, []);

  // Update active menu based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveMenu("home");
    } else if (path === "/product") {
      setActiveMenu("product");
    } else if (path === "/industry") {
      setActiveMenu("industry");
    } else if (path === "/contact") {
      setActiveMenu("contact");
    }
  }, [location]);

  // Handle scroll for scrolled state and home page section highlighting
  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    setIsScrolled(offset > 50);

    if (location.pathname === "/") {
      const sections = ["home", "about", "services", "team", "contact"];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveMenu(sec);
            break;
          }
        }
      }
    }
  }, [location.pathname]);

  // Handle click outside
  const handleClickOutside = useCallback(
    (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest(".ne-navbar-mobile-toggle")
      ) {
        closeMobileMenu();
      }
    },
    [closeMobileMenu]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handleScroll, handleClickOutside]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    };
  }, []);

  // ===== LOCK BODY SCROLL WHEN INQUIRY MODAL IS OPEN =====
  useEffect(() => {
    if (isInquiryModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.top = "";
      document.body.style.width = "auto";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [isInquiryModalOpen]);

  // ===== RESET SCROLL POSITION WHEN MODAL OPENS =====
  useEffect(() => {
    if (isInquiryModalOpen && inquiryCardRef.current) {
      inquiryCardRef.current.scrollTop = 0;
    }
  }, [isInquiryModalOpen]);

  // ===== ESC KEY CLOSES INQUIRY MODAL =====
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isInquiryModalOpen) {
        closeInquiryModal();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInquiryModalOpen, isSubmitting]);

  const toggleMobileMenu = () => {
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      closeMobileMenu();
    }
  };

  return (
    <>
      <nav
        className={`ne-navbar ${isScrolled ? "ne-navbar-scrolled" : ""} ${
          isSidebarOpen ? "ne-navbar-mobile-open" : ""
        }`}
      >
        <div className="ne-navbar-container">
          <div
            className="ne-navbar-logo"
            onClick={() => handleNavigation("/", "home")}
            style={{ cursor: "pointer" }}
          >
            <img src={logo} alt="Logo" className="ne-navbar-logo-image" />
          </div>

          <div className="ne-navbar-right-section">
            <ul
              className={`ne-navbar-menu ${
                isSidebarOpen ? "ne-navbar-menu-open" : ""
              }`}
              ref={mobileMenuRef}
            >
              {isSidebarOpen && (
                <button
                  className="ne-navbar-mobile-close-inside"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  <IoCloseSharp />
                </button>
              )}

              <li
                className={`ne-navbar-menu-item ${
                  activeMenu === "home" ? "ne-navbar-menu-item-active" : ""
                }`}
                onClick={() => handleNavigation("/", "home")}
                style={{ "--item-index": 1 }}
              >
                <span className="ne-navbar-menu-text">Home</span>
                <div className="ne-navbar-menu-highlight"></div>
              </li>

              <li
                className={`ne-navbar-menu-item ${
                  activeMenu === "product" ? "ne-navbar-menu-item-active" : ""
                }`}
                onClick={() => handleNavigation("/product", "product")}
                style={{ "--item-index": 2 }}
              >
                <span className="ne-navbar-menu-text">Our Services</span>
                <div className="ne-navbar-menu-highlight"></div>
              </li>

              <li
                className={`ne-navbar-menu-item ${
                  activeMenu === "industry" ? "ne-navbar-menu-item-active" : ""
                }`}
                onClick={() => handleNavigation("/industry", "industry")}
                style={{ "--item-index": 3 }}
              >
                <span className="ne-navbar-menu-text">Industry We Serve</span>
                <div className="ne-navbar-menu-highlight"></div>
              </li>

              <li
                className={`ne-navbar-menu-item ${
                  activeMenu === "contact" ? "ne-navbar-menu-item-active" : ""
                }`}
                onClick={() => handleNavigation("/contact", "contact")}
                style={{ "--item-index": 4 }}
              >
                <span className="ne-navbar-menu-text">Contact Us</span>
                <div className="ne-navbar-menu-highlight"></div>
              </li>

              <li
                className={`ne-navbar-menu-item ${
                  activeMenu === "certificate"
                    ? "ne-navbar-menu-item-active"
                    : ""
                }`}
                onClick={() => handleNavigation("/certificate", "certificate")}
                style={{ "--item-index": 5 }}
              >
                <span className="ne-navbar-menu-text">Certificate</span>
                <div className="ne-navbar-menu-highlight"></div>
              </li>

              {/* Mobile Only Auth Section */}
              <div className="ne-navbar-mobile-auth-section">
                {isLoggedIn ? (
                  <div className="ne-navbar-mobile-user-info">
                    <div className="ne-navbar-mobile-user-avatar">
                      {userInfo?.fullName?.charAt(0) || "U"}
                    </div>
                    <div className="ne-navbar-mobile-user-details">
                      <div className="ne-navbar-mobile-user-name">
                        {userInfo?.fullName || "User"}
                      </div>
                      <div className="ne-navbar-mobile-user-email">
                        {userInfo?.email || "user@example.com"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    className="ne-navbar-mobile-login-btn"
                    onClick={handleInquiryClick}
                  >
                    <span>Inquiry Form</span>
                    <i className="fas fa-sign-in-alt"></i>
                  </button>
                )}
              </div>
            </ul>

            {isLoggedIn ? (
              <div
                className="ne-navbar-user-dropdown-container"
                ref={userMenuRef}
              >
                <button
                  className="ne-navbar-user-toggle"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-expanded={isUserMenuOpen}
                  aria-label="User menu"
                >
                  <div className="ne-navbar-user-avatar">
                    {userInfo?.fullName?.charAt(0) || "U"}
                  </div>
                  <span className="ne-navbar-user-name">
                    {userInfo?.fullName || "User"}
                  </span>
                  <i
                    className={`ne-navbar-user-arrow ${
                      isUserMenuOpen ? "ne-navbar-user-arrow-open" : ""
                    }`}
                  ></i>
                </button>

                <div
                  className={`ne-navbar-user-menu ${
                    isUserMenuOpen ? "ne-navbar-user-menu-open" : ""
                  }`}
                  aria-hidden={!isUserMenuOpen}
                >
                  <div className="ne-navbar-user-header">
                    <div className="ne-navbar-user-avatar ne-navbar-user-avatar-large">
                      {userInfo?.fullName?.charAt(0) || "U"}
                    </div>
                    <div className="ne-navbar-user-info">
                      <div className="ne-navbar-user-fullname">
                        {userInfo?.fullName || "User"}
                      </div>
                      <div className="ne-navbar-user-email">
                        {userInfo?.email || "user@example.com"}
                      </div>
                    </div>
                  </div>

                  <div className="ne-navbar-menu-divider"></div>

                  <button
                    className="ne-navbar-menu-option"
                    onClick={() => {
                      navigate("/dashboard");
                      setIsUserMenuOpen(false);
                      closeMobileMenu();
                    }}
                    aria-label="Dashboard"
                  >
                    <i className="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                  </button>

                  <button
                    className="ne-navbar-menu-option"
                    onClick={() => {
                      navigate("/profile");
                      setIsUserMenuOpen(false);
                      closeMobileMenu();
                    }}
                    aria-label="My Profile"
                  >
                    <i className="fas fa-user"></i>
                    <span>My Profile</span>
                  </button>

                  <button
                    className="ne-navbar-menu-option"
                    onClick={() => {
                      navigate("/orders");
                      setIsUserMenuOpen(false);
                      closeMobileMenu();
                    }}
                    aria-label="My Orders"
                  >
                    <i className="fas fa-shopping-bag"></i>
                    <span>My Orders</span>
                  </button>

                  <div className="ne-navbar-menu-divider"></div>

                  <button
                    className="ne-navbar-menu-option ne-navbar-menu-logout"
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="ne-navbar-login-button"
                onClick={handleInquiryClick}
                aria-label="Inquiry Form"
              >
                <span>Inquiry Form</span>
                <div className="ne-navbar-button-effect"></div>
                <i className="fas fa-sign-in-alt"></i>
              </button>
            )}

            <button
              className={`ne-navbar-mobile-toggle ${
                isSidebarOpen ? "ne-navbar-mobile-toggle-active" : ""
              }`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isSidebarOpen}
            >
              <FiMenu size={28} />
            </button>
          </div>
        </div>

        <div
          className={`ne-navbar-mobile-overlay ${
            isSidebarOpen ? "ne-navbar-mobile-overlay-active" : ""
          }`}
          onClick={closeMobileMenu}
          aria-hidden={!isSidebarOpen}
        ></div>
      </nav>

      {/* Auth Modal */}
      <AuthContainer
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* ============ INQUIRY MODAL ============ */}
      {isInquiryModalOpen && (
        <div
          className="tk-auth-modal-overlay tk-inquiry-overlay-scroll"
          onClick={closeInquiryModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
        >
          <div
            className="tk-auth-container tk-inquiry-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background */}
            <div className="tk-auth-background">
              <div className="tk-auth-floating-shapes">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`tk-auth-shape shape-${i % 4}`}
                    style={{
                      "--delay": `${i * 0.5}s`,
                      "--duration": `${20 + i * 3}s`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `-${i * 2}s`,
                    }}
                  ></div>
                ))}
              </div>
              <div className="tk-auth-gradient-overlay"></div>
            </div>

            {/* Inquiry Card — scrollable */}
            <div
              className="tk-auth-card tk-inquiry-card tk-inquiry-card-scroll"
              ref={inquiryCardRef}
            >
              <div className="tk-auth-card-glow"></div>

              {/* Close Button */}
              <button
                className="tk-auth-close-btn tk-inquiry-close-sticky"
                onClick={closeInquiryModal}
                disabled={isSubmitting}
                aria-label="Close inquiry form"
              >
                <span></span>
                <span></span>
              </button>

              {submitSuccess ? (
                /* ===== SUCCESS STATE ===== */
                <div className="tk-inquiry-success">
                  <div className="tk-inquiry-success-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3 className="tk-auth-title tk-text-shimmer-white">
                    Thank You!
                  </h3>
                  <p className="tk-auth-subtitle">
                    Your inquiry has been submitted successfully.
                    <br />
                    We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="tk-auth-header">
                    <div className="tk-auth-logo">
                      <div className="tk-auth-logo-icon">
                        <i className="fas fa-envelope-open-text"></i>
                      </div>
                      Technoking Engineers Pvt Ltd
                    </div>
                    <h2
                      id="inquiry-modal-title"
                      className="tk-auth-title tk-text-shimmer-white"
                    >
                      Inquiry Form
                    </h2>
                    <p className="tk-auth-subtitle">
                      Fill out the form below and we'll get back to you.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="tk-auth-divider">
                    <span>please share your details</span>
                  </div>

                  {/* Form */}
                  <form
                    className="tk-auth-form"
                    onSubmit={handleInquirySubmit}
                    noValidate
                  >
                    <div className="tk-auth-input-group">
                      {/* Name */}
                      <div className="tk-auth-input-wrapper">
                        <i className="fas fa-user tk-auth-input-icon"></i>
                        <input
                          id="inquiry-name"
                          type="text"
                          name="name"
                          placeholder=" "
                          value={inquiryData.name}
                          onChange={handleInquiryChange}
                          className={`tk-auth-input ${
                            inquiryErrors.name ? "tk-input-error" : ""
                          }`}
                        />
                        <label className="tk-auth-label">Name</label>
                        <div className="tk-auth-input-focus-line"></div>
                        {inquiryErrors.name && (
                          <span className="tk-inquiry-error">
                            {inquiryErrors.name}
                          </span>
                        )}
                      </div>

                      {/* Email */}
                      <div className="tk-auth-input-wrapper">
                        <i className="fas fa-envelope tk-auth-input-icon"></i>
                        <input
                          id="inquiry-email"
                          type="email"
                          name="email"
                          placeholder=" "
                          value={inquiryData.email}
                          onChange={handleInquiryChange}
                          className={`tk-auth-input ${
                            inquiryErrors.email ? "tk-input-error" : ""
                          }`}
                        />
                        <label className="tk-auth-label">Email ID</label>
                        <div className="tk-auth-input-focus-line"></div>
                        {inquiryErrors.email && (
                          <span className="tk-inquiry-error">
                            {inquiryErrors.email}
                          </span>
                        )}
                      </div>

                      {/* Designation */}
                      <div className="tk-auth-input-wrapper">
                        <i className="fas fa-briefcase tk-auth-input-icon"></i>
                        <input
                          id="inquiry-designation"
                          type="text"
                          name="designation"
                          placeholder=" "
                          value={inquiryData.designation}
                          onChange={handleInquiryChange}
                          className={`tk-auth-input ${
                            inquiryErrors.designation ? "tk-input-error" : ""
                          }`}
                        />
                        <label className="tk-auth-label">Designation</label>
                        <div className="tk-auth-input-focus-line"></div>
                        {inquiryErrors.designation && (
                          <span className="tk-inquiry-error">
                            {inquiryErrors.designation}
                          </span>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="tk-auth-input-wrapper">
                        <i className="fas fa-phone-alt tk-auth-input-icon"></i>
                        <input
                          id="inquiry-phone"
                          type="tel"
                          name="phoneNumber"
                          placeholder=" "
                          value={inquiryData.phoneNumber}
                          onChange={handleInquiryChange}
                          className={`tk-auth-input ${
                            inquiryErrors.phoneNumber ? "tk-input-error" : ""
                          }`}
                        />
                        <label className="tk-auth-label">Phone Number</label>
                        <div className="tk-auth-input-focus-line"></div>
                        {inquiryErrors.phoneNumber && (
                          <span className="tk-inquiry-error">
                            {inquiryErrors.phoneNumber}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <div className="tk-auth-input-wrapper">
                        <i className="fas fa-comment-dots tk-auth-input-icon tk-textarea-icon"></i>
                        <textarea
                          id="inquiry-description"
                          name="description"
                          placeholder=" "
                          rows="4"
                          value={inquiryData.description}
                          onChange={handleInquiryChange}
                          className={`tk-auth-input tk-auth-textarea ${
                            inquiryErrors.description ? "tk-input-error" : ""
                          }`}
                        />
                        <label className="tk-auth-label">Description</label>
                        <div className="tk-auth-input-focus-line"></div>
                        {inquiryErrors.description && (
                          <span className="tk-inquiry-error">
                            {inquiryErrors.description}
                          </span>
                        )}
                      </div>
                    </div>

                    {inquiryErrors.submit && (
                      <div className="tk-inquiry-submit-error">
                        {inquiryErrors.submit}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className={`tk-auth-submit-btn ${
                        isSubmitting ? "tk-btn-loading" : ""
                      }`}
                      disabled={isSubmitting}
                    >
                      <span className="tk-auth-btn-text">
                        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                      </span>
                      <div className="tk-auth-btn-loader">
                        <div className="tk-auth-btn-spinner"></div>
                      </div>
                      <div className="tk-auth-btn-glow"></div>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;