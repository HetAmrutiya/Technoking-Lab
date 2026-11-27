import React, { useEffect, useRef, useState } from "react";
import "./Loader.css";

/* ------------------------------------------------------------------
   Technoking Testlab — Ultrasonic (UT) Scan Loader
   - Splash mode (default): shows once per browser session, tracks the
     real page load (window "load" + web fonts), then fades out.
   - Fallback mode (<Loader fallback />): for React.Suspense / data
     loading. Always shows, progress creeps to 90% until unmounted.
------------------------------------------------------------------- */

const SESSION_KEY = "tk-loader-shown";

const STAGES = [
  { at: 0, label: "Calibrating probe" },
  { at: 30, label: "Scanning surface" },
  { at: 60, label: "Analysing echoes" },
  { at: 95, label: "Inspection complete" },
];

const TICKS = Array.from({ length: 60 }, (_, i) => i);
const RADIUS = 86;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* A-scan trace: initial pulse → small flaw echo → back-wall echo */
const A_SCAN =
  "M0 34 L14 34 L16 4 L18 34 L20 10 L22 34 L24 24 L26 34 " +
  "L108 34 L110 28 L112 18 L114 28 L116 34 " +
  "L186 34 L188 20 L190 6 L192 22 L194 30 L196 34 L240 34";

const alreadyShown = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
};

const Loader = ({
  logoSrc = "/logo.png",
  fallback = false,
  oncePerSession = true,
  minDuration = 1200, // avoids a jarring flash on fast connections
  maxDuration = 7000, // never block the site longer than this
  onFinish,
}) => {
  const [active] = useState(
    () => fallback || !oncePerSession || !alreadyShown()
  );
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(!active);
  const [logoFailed, setLogoFailed] = useState(false);

  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    if (!active) {
      onFinishRef.current?.();
      return undefined;
    }

    const prevOverflow = document.body.style.overflow;
    if (!fallback) document.body.style.overflow = "hidden";

    const timers = [];
    const start = performance.now();
    let raf;
    let value = 0;
    let shown = 0;
    let ready = false;
    let finished = false;

    if (!fallback) {
      const pageLoaded = new Promise((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", resolve, { once: true });
      });
      const fontsReady = document.fonts?.ready
        ? document.fonts.ready.catch(() => {})
        : Promise.resolve();

      Promise.all([pageLoaded, fontsReady]).then(() => {
        ready = true;
      });
      timers.push(setTimeout(() => (ready = true), maxDuration));
    }

    const finish = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* storage blocked — ignore */
      }
      timers.push(
        setTimeout(() => {
          setExiting(true);
          document.body.style.overflow = prevOverflow; // site usable during fade
        }, 300)
      );
      timers.push(
        setTimeout(() => {
          setGone(true);
          onFinishRef.current?.();
        }, 300 + 800)
      );
    };

    const tick = (now) => {
      const canFinish = ready && now - start >= minDuration;
      const target = canFinish ? 100 : 90;
      const ease = canFinish ? 0.08 : 0.012;

      value += Math.max((target - value) * ease, canFinish ? 0.6 : 0);
      if (value > target) value = target;

      const rounded = Math.floor(value);
      if (rounded !== shown) {
        shown = rounded;
        setProgress(rounded);
      }

      if (value >= 100) {
        finish();
        return;
      }
      // In fallback mode, stop the loop once parked at 90%
      if (fallback && target - value < 0.05) return;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, fallback, minDuration, maxDuration]);

  if (gone) return null;

  const stage = [...STAGES].reverse().find((s) => progress >= s.at).label;

  return (
    <div
      className={`tk-loader${exiting ? " tk-loader--exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading website"
    >
      <div className="tk-loader__grid" aria-hidden="true" />
      <div className="tk-loader__glow" aria-hidden="true" />

      <div className="tk-loader__content">
        {/* ---------- UT scanner ---------- */}
        <div className="tk-scanner" aria-hidden="true">
          <span className="tk-scanner__echo" />
          <span className="tk-scanner__echo" />
          <span className="tk-scanner__echo" />

          <div className="tk-scanner__sweep" />

          <svg className="tk-scanner__svg" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="tkRingGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9fd3fa" />
                <stop offset="55%" stopColor="#4fa3e0" />
                <stop offset="100%" stopColor="#235781" />
              </linearGradient>
            </defs>

            <g className="tk-scanner__ticks">
              {TICKS.map((i) => (
                <line
                  key={i}
                  x1="100"
                  y1={i % 5 === 0 ? 1 : 4}
                  x2="100"
                  y2="8"
                  transform={`rotate(${i * 6} 100 100)`}
                  className={i % 5 === 0 ? "tk-tick tk-tick--major" : "tk-tick"}
                />
              ))}
            </g>

            <circle cx="100" cy="100" r={RADIUS} className="tk-scanner__track" />
            <circle
              cx="100"
              cy="100"
              r={RADIUS}
              className="tk-scanner__progress"
              stroke="url(#tkRingGrad)"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
              transform="rotate(-90 100 100)"
            />

            <circle cx="100" cy="100" r="66" className="tk-scanner__inner" />
            <line x1="100" y1="24" x2="100" y2="176" className="tk-scanner__cross" />
            <line x1="24" y1="100" x2="176" y2="100" className="tk-scanner__cross" />
          </svg>

          <span className="tk-scanner__blip" />

          <div className="tk-scanner__core">
            {logoFailed ? (
              <span className="tk-scanner__logo-text">TK</span>
            ) : (
              <img
                src={logoSrc}
                alt=""
                draggable="false"
                onError={() => setLogoFailed(true)}
              />
            )}
          </div>
        </div>

        {/* ---------- Progress info ---------- */}
        <div className="tk-loader__info">
          <div className="tk-loader__percent">
            {progress}
            <span>%</span>
          </div>
          <div className="tk-loader__stage">{stage}</div>

          <svg
            className="tk-loader__ascan"
            viewBox="0 0 240 40"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={A_SCAN} className="tk-ascan__base" vectorEffect="non-scaling-stroke" />
            <path
              d={A_SCAN}
              pathLength="100"
              className="tk-ascan__trace"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div
            className="tk-loader__bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span style={{ width: `${progress}%` }} />
          </div>

          <p className="tk-loader__text">
            Preparing Your Experience
            <span className="tk-dots" aria-hidden="true">
              <i>.</i>
              <i>.</i>
              <i>.</i>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;