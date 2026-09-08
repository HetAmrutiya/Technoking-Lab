import React, { useState, useEffect, useRef } from "react";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlinePhone,
} from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import "./Auth.css";

const SignUp = ({ onToggleMode, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
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
      // Handle signup logic here
    }, 2000);
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
    // Handle social signup
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
        className="tk-auth-card tk-signup-card"
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
          {/* ⚪ WHITE TITLE - Create Account */}
          <h2 className="tk-auth-title tk-text-shimmer-white">Create Account</h2>
          {/* ⚪ WHITE SUBTITLE */}
          <p className="tk-auth-subtitle">
            Join us to explore premium mineral solutions
          </p>
        </div>

        {/* Divider */}
        <div className="tk-auth-divider">
          <span>or sign up with email</span>
        </div>

        {/* Signup Form */}
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

            <div className="tk-auth-input-wrapper">
              <HiOutlineLockClosed className="tk-auth-input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder=" "
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="tk-auth-input"
              />
              <label className="tk-auth-label">Confirm Password</label>
              <div className="tk-auth-input-focus-line"></div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="tk-auth-terms">
            <label className="tk-auth-remember">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="tk-auth-checkbox"
                required
              />
              <span className="tk-auth-checkmark"></span>I agree to the{" "}
              <button type="button" className="tk-auth-link">
                Terms of Service
              </button>{" "}
              and{" "}
              <button type="button" className="tk-auth-link">
                Privacy Policy
              </button>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`tk-auth-submit-btn ${
              isLoading ? "tk-btn-loading" : ""
            }`}
            disabled={isLoading || !agreeTerms}
          >
            <span className="tk-auth-btn-text">
              {isLoading ? "Creating Account..." : "Create Account"}
            </span>
            <div className="tk-auth-btn-loader">
              <div className="tk-auth-btn-spinner"></div>
            </div>
            <div className="tk-auth-btn-glow"></div>
          </button>
        </form>

        {/* Switch to Login */}
        <div className="tk-auth-switch">
          <p>
            Already have an account?{" "}
            <button onClick={onToggleMode} className="tk-auth-switch-btn">
              Sign in
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

export default SignUp;