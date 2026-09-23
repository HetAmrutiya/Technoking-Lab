import React, { useState, useEffect, useRef } from "react";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import "./Auth.css";

const Login = ({ onToggleMode, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [animateElements, setAnimateElements] = useState({});
  const sectionRefs = useRef([]);

  const addToRefs = (el, index) => {
    sectionRefs.current[index] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateElements((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
    }, 2000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Handle social login
  };

  return (
    <div className="tk-auth-container">
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

      {/* Auth Card */}
      <div
        className="tk-auth-card"
        ref={(el) => addToRefs(el, 0)}
        data-section="card"
      >
        <div className="tk-auth-card-glow"></div>

        {/* Close Button */}
        <button className="tk-auth-close-btn" onClick={onClose}>
          <span></span>
          <span></span>
        </button>

        {/* Header */}
        <div className="tk-auth-header">
          <div className="tk-auth-logo">
            <div className="tk-auth-logo-icon">
              <HiOutlineUser />
            </div>
            Technoking Testlab Pvt Ltd
            <span></span>
          </div>
          {/* ⚪ WHITE TITLE - Welcome Back */}
          <h2 className="tk-auth-title tk-text-shimmer-white">Welcome Back</h2>
          {/* ⚪ WHITE SUBTITLE */}
          <p className="tk-auth-subtitle">
            Sign in to your account to continue
          </p>
        </div>

        {/* Social Login Buttons */}
        {/* <div className="tk-auth-social-buttons">
          <button
            className="tk-social-btn tk-google-btn"
            onClick={() => handleSocialLogin("google")}
          >
            <FaGoogle className="tk-social-icon" />
            <span>Google</span>
          </button>
          <button
            className="tk-social-btn tk-facebook-btn"
            onClick={() => handleSocialLogin("facebook")}
          >
            <FaFacebook className="tk-social-icon" />
            <span>Facebook</span>
          </button>
          <button
            className="tk-social-btn tk-github-btn"
            onClick={() => handleSocialLogin("github")}
          >
            <FaGithub className="tk-social-icon" />
            <span>GitHub</span>
          </button>
        </div> */}

        {/* Divider */}
        <div className="tk-auth-divider">
          <span>or continue with email</span>
        </div>

        {/* Login Form */}
        <form className="tk-auth-form" onSubmit={handleSubmit}>
          <div className="tk-auth-input-group">
            <div className="tk-auth-input-wrapper">
              <HiOutlineMail className="tk-auth-input-icon" />
              <input
                type="email"
                name="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
                className="tk-auth-input"
              />
              <label className="tk-auth-label">Email Address</label>
              <div className="tk-auth-input-focus-line"></div>
            </div>

            <div className="tk-auth-input-wrapper">
              <HiOutlineLockClosed className="tk-auth-input-icon" />
              <input
                type="password"
                name="password"
                placeholder=" "
                value={formData.password}
                onChange={handleChange}
                required
                className="tk-auth-input"
              />
              <label className="tk-auth-label">Password</label>
              <div className="tk-auth-input-focus-line"></div>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="tk-auth-options">
            <label className="tk-auth-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="tk-auth-checkbox"
              />
              <span className="tk-auth-checkmark"></span>
              Remember me
            </label>
            <button type="button" className="tk-auth-forgot">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`tk-auth-submit-btn ${
              isLoading ? "tk-btn-loading" : ""
            }`}
            disabled={isLoading}
          >
            <span className="tk-auth-btn-text">
              {isLoading ? "Signing In..." : "Sign In"}
            </span>
            <div className="tk-auth-btn-loader">
              <div className="tk-auth-btn-spinner"></div>
            </div>
            <div className="tk-auth-btn-glow"></div>
          </button>
        </form>

        {/* Switch to Sign Up */}
        <div className="tk-auth-switch">
          <p>
            Don't have an account?{" "}
            <button onClick={onToggleMode} className="tk-auth-switch-btn">
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* Success Animation Overlay */}
      {isLoading && (
        <div className="tk-auth-loading-overlay">
          <div className="tk-auth-loading-spinner">
            <div className="tk-auth-loading-circle"></div>
            <div className="tk-auth-loading-circle"></div>
            <div className="tk-auth-loading-circle"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;