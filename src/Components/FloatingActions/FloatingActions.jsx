import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaArrowUp, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import "./FloatingActions.css";

/* ------------------------------------------------------------------
   ⚙️  CONFIG
   ------------------------------------------------------------------ */
const WHATSAPP_NUMBER = "919512400501";
const WHATSAPP_TEXT = encodeURIComponent(
  "Hi! I found you online and I'd like to know more about your services."
);
const LINKEDIN_URL = "https://www.linkedin.com/company/111133967/";

const FloatingActions = () => {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const wrapRef = useRef(null);

  /* ---------- show "back to top" only after scrolling ---------- */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- close on outside click / Escape ---------- */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onMouseDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  /* ---------- actions ---------- */
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`,
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  const handleLinkedIn = () => {
    window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  /* buttons are only tabbable when the menu is pinned open */
  const tab = open ? 0 : -1;

  return (
    <div ref={wrapRef} className={`fab ${open ? "open" : ""}`}>
      <div className="fab-menu">
        {/* Back to top — only exists after scrolling */}
        <button
          type="button"
          className={`fab-btn fab-top ${showTop ? "" : "is-hidden"}`}
          onClick={handleTop}
          aria-label="Back to top"
          data-tooltip="Back to top"
          tabIndex={tab}
        >
          <FaArrowUp />
        </button>

        {/* LinkedIn company page */}
        <button
          type="button"
          className="fab-btn fab-linkedin"
          onClick={handleLinkedIn}
          aria-label="Open our LinkedIn company profile"
          data-tooltip="LinkedIn"
          tabIndex={tab}
        >
          <FaLinkedinIn />
        </button>

        {/* WhatsApp chat */}
        <button
          type="button"
          className="fab-btn fab-whatsapp"
          onClick={handleWhatsApp}
          aria-label="Chat with us on WhatsApp"
          data-tooltip="WhatsApp"
          tabIndex={tab}
        >
          <FaWhatsapp />
        </button>
      </div>

      {/* main toggle */}
      <button
        type="button"
        className="fab-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close quick actions" : "Open quick actions"}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default FloatingActions;