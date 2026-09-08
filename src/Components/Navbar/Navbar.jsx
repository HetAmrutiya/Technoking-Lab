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

  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

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

  // Handle click outside for user menu and mobile menu
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

  // Set up scroll and click listeners
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
            {/* Desktop Menu */}
            <ul
              className={`ne-navbar-menu ${
                isSidebarOpen ? "ne-navbar-menu-open" : ""
              }`}
              ref={mobileMenuRef}
            >
              {/* Close Button Inside Mobile Menu */}
              {isSidebarOpen && (
                <button
                  className="ne-navbar-mobile-close-inside"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  <IoCloseSharp />
                </button>
              )}

              {/* Menu Items */}
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

              {/* Mobile Only Login/User Section */}
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
                    onClick={handleLoginClick}
                  >
                    <span>Login</span>
                    <i className="fas fa-sign-in-alt"></i>
                  </button>
                )}
              </div>
            </ul>

            {/* User Menu or Login Button - Desktop Only */}
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

                {/* User Dropdown Menu */}
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
                onClick={handleLoginClick}
                aria-label="Login"
              >
                <span>Login</span>
                <div className="ne-navbar-button-effect"></div>
                <i className="fas fa-sign-in-alt"></i>
              </button>
            )}

            {/* Mobile Menu Toggle Button (Hamburger) */}
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

        {/* Mobile Overlay */}
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
    </>
  );
};

export default Navbar;
