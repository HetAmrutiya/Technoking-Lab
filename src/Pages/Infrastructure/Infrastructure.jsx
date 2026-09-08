import React, { useEffect, useRef, useState } from "react";
import "./Infrastructure.css";
import mineralsBackground from "../../assets/ut.jpg";

const Infrastructure = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [activeCategory, setActiveCategory] = useState("sustainable");
  const sectionRefs = useRef([]);
  const [animatedStats, setAnimatedStats] = useState({
    production: 0,
    quality: 0,
    research: 0,
    delivery: 0,
  });

  const sustainableApproach = [
    {
      icon: "🌱",
      title: "Sustainable Extraction",
      description:
        "Utilizing overburden material in sand processing to mitigate environmental impact and optimize resource utilization.",
      features: [
        "Reduced environmental footprint",
        "Optimal resource utilization",
        "Eco-friendly processing",
      ],
    },
    {
      icon: "🔄",
      title: "Circular Economy",
      description:
        "Transforming traditional extraction methods into sustainable practices by repurposing overburden material.",
      features: [
        "Waste reduction",
        "Material repurposing",
        "Sustainable operations",
      ],
    },
  ];

  const infrastructureHighlights = [
    {
      icon: "⚡",
      title: "Cutting-Edge Technology",
      description:
        "State-of-the-art machinery and seamless operations ensuring superior product quality.",
      delay: "0s",
    },
    {
      icon: "🔬",
      title: "In-House Laboratories",
      description:
        "Advanced testing facilities supported by robust quality control systems.",
      delay: "0.1s",
    },
    {
      icon: "🤝",
      title: "Strategic Partnerships",
      description:
        "Premier packaging and transportation companies ensuring timely delivery.",
      delay: "0.2s",
    },
    {
      icon: "📦",
      title: "End-to-End Services",
      description:
        "Comprehensive tracking from production to your factory floor.",
      delay: "0.3s",
    },
  ];

  const keyFunctionalUnits = [
    {
      icon: "🏭",
      title: "Production Department",
      description:
        "A seamlessly integrated unit designed for high-efficiency operations and elevated production rates.",
      features: [
        "High-efficiency operations",
        "Elevated production rates",
        "Seamless integration",
      ],
    },
    {
      icon: "🔍",
      title: "Quality Testing Unit",
      description:
        "Equipped with advanced testing mechanisms and stringent protocols to ensure every grain meets pinnacle quality standards.",
      features: [
        "Advanced testing mechanisms",
        "Stringent quality protocols",
        "Comprehensive quality assurance",
      ],
    },
    {
      icon: "💡",
      title: "Research and Development Unit",
      description:
        "A center dedicated to innovation and continuous improvement, driving technological advancements and product enhancements.",
      features: [
        "Continuous innovation",
        "Technological advancements",
        "Product enhancement",
      ],
    },
  ];

  const strategicAdvantages = [
    {
      number: "Multi-Location",
      label: "Strategic Setup",
      description: "Positioned at the core of the country's industrial hub",
    },
    {
      number: "Streamlined",
      label: "Accessibility",
      description: "Optimized delivery timelines and accessibility",
    },
    {
      number: "Purpose-Built",
      label: "Infrastructure",
      description:
        "Crafted to exceed production requirements and quality benchmarks",
    },
  ];

  // Animation for number counting
  useEffect(() => {
    const animateNumbers = () => {
      const targets = {
        production: 100,
        quality: 100,
        research: 100,
        delivery: 100,
      };

      setAnimatedStats({
        production: 0,
        quality: 0,
        research: 0,
        delivery: 0,
      });

      let currentProduction = 0;
      let currentQuality = 0;
      let currentResearch = 0;
      let currentDelivery = 0;

      const productionInterval = setInterval(() => {
        currentProduction += 2;
        setAnimatedStats((prev) => ({
          ...prev,
          production: currentProduction,
        }));
        if (currentProduction >= 100) clearInterval(productionInterval);
      }, 20);

      const qualityInterval = setInterval(() => {
        currentQuality += 2;
        setAnimatedStats((prev) => ({ ...prev, quality: currentQuality }));
        if (currentQuality >= 100) clearInterval(qualityInterval);
      }, 20);

      const researchInterval = setInterval(() => {
        currentResearch += 2;
        setAnimatedStats((prev) => ({ ...prev, research: currentResearch }));
        if (currentResearch >= 100) clearInterval(researchInterval);
      }, 20);

      const deliveryInterval = setInterval(() => {
        currentDelivery += 2;
        setAnimatedStats((prev) => ({ ...prev, delivery: currentDelivery }));
        if (currentDelivery >= 100) clearInterval(deliveryInterval);
      }, 20);
    };

    if (visibleSections.stats) {
      animateNumbers();
    }
  }, [visibleSections.stats]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el, index) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="infrastructure-container" id="infrastructure">
      {/* Hero Section */}
      <section
        className="infrastructure-hero"
        ref={(el) => addToRefs(el, 0)}
        data-section="hero"
      >
        <div
          className="hero-background-image"
          style={{ backgroundImage: `url(${mineralsBackground})` }}
        ></div>
        <div className="hero-blur-overlay"></div>
        <div className="hero-dark-overlay"></div>
        <div className="container">
          <div
            className={`hero-content ${
              visibleSections.hero ? "animate-in" : ""
            }`}
          >
            <h1 className="hero-title">
              <span className="title-line">
                Infrastructure&nbsp;
                <span className="title-line highlight">Excellence</span>
              </span>
            </h1>
            <p className="hero-subtitle">
              Cutting-edge technology and seamless operations ensuring superior
              quality and reliability
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="stats-section"
        ref={(el) => addToRefs(el, 1)}
        data-section="stats"
      >
        <div className="container">
          <div className="stats-grid">
            <div
              className={`stat-item ${
                visibleSections.stats ? "animate-in" : ""
              }`}
              style={{ animationDelay: "0s" }}
            >
              <div className="stat-icon">🏭</div>
              <div className="stat-number">{animatedStats.production}%</div>
              <div className="stat-label">Production Efficiency</div>
            </div>
            <div
              className={`stat-item ${
                visibleSections.stats ? "animate-in" : ""
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              <div className="stat-icon">🔬</div>
              <div className="stat-number">{animatedStats.quality}%</div>
              <div className="stat-label">Quality Assurance</div>
            </div>
            <div
              className={`stat-item ${
                visibleSections.stats ? "animate-in" : ""
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="stat-icon">💡</div>
              <div className="stat-number">{animatedStats.research}%</div>
              <div className="stat-label">Research Focus</div>
            </div>
            <div
              className={`stat-item ${
                visibleSections.stats ? "animate-in" : ""
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="stat-icon">🚚</div>
              <div className="stat-number">{animatedStats.delivery}%</div>
              <div className="stat-label">Delivery Reliability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="main-navigations">
        <div className="infrastructure-wrapper">
          <section className="tabs-navigation">
            <div className="container">
              <div className="tabs-container">
                <button
                  className={`tab-button ${
                    activeCategory === "sustainable" ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory("sustainable")}
                >
                  <span className="tab-icon">🌱</span>
                  <span className="tab-text">Sustainable Approach</span>
                  <div className="tab-underline"></div>
                </button>
                <button
                  className={`tab-button ${
                    activeCategory === "excellence" ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory("excellence")}
                >
                  <span className="tab-icon">⚡</span>
                  <span className="tab-text">Infrastructure Excellence</span>
                  <div className="tab-underline"></div>
                </button>
                <button
                  className={`tab-button ${
                    activeCategory === "functional" ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory("functional")}
                >
                  <span className="tab-icon">🏗️</span>
                  <span className="tab-text">Functional Units</span>
                  <div className="tab-underline"></div>
                </button>
              </div>
            </div>
          </section>

          {/* Sustainable Approach Section */}
          {activeCategory === "sustainable" && (
            <section
              className="sustainable-section"
              ref={(el) => addToRefs(el, 2)}
              data-section="sustainable"
            >
              <div className="section-pattern"></div>
              <div className="container">
                <div className="section-header">
                  <div className="header-badge">Eco-Friendly Innovation</div>
                  <h2>Sustainable Approach</h2>
                  <div className="section-divider"></div>
                  <p>
                    Transforming traditional extraction methods into
                    eco-friendly practices through innovation and resource
                    optimization
                  </p>
                </div>

                <div className="sustainable-content">
                  <div className="sustainable-main-text">
                    <div className="approach-card">
                      <div className="card-glow"></div>
                      <div className="approach-icon">🔄</div>
                      <h3>Innovative Resource Utilization</h3>
                      <p>
                        Traditionally, lignite/coal extraction often involves
                        the removal of overburden—the topsoil and vegetation
                        covering the sand deposits. Our sustainable approach
                        focuses on utilizing this overburden material in sand
                        processing, mitigating environmental impact and
                        optimizing resource utilization.
                      </p>
                      <div className="eco-badge">
                        <span className="eco-icon">♻️</span>
                        Environment First Approach
                      </div>
                    </div>
                  </div>

                  <div className="sustainable-grid">
                    {sustainableApproach.map((approach, index) => (
                      <div
                        key={index}
                        className={`sustainable-card ${
                          visibleSections.sustainable ? "animate-in" : ""
                        }`}
                        style={{ animationDelay: `${index * 0.15}s` }}
                      >
                        <div className="card-sparkle"></div>
                        <div className="sustainable-header">
                          <div className="approach-main-icon">
                            {approach.icon}
                          </div>
                          <h3>{approach.title}</h3>
                        </div>
                        <p className="approach-description">
                          {approach.description}
                        </p>
                        <div className="approach-features">
                          <h4>Key Benefits:</h4>
                          <ul>
                            {approach.features.map((feature, featureIndex) => (
                              <li key={featureIndex}>
                                <span className="feature-marker">
                                  <div className="marker-dot"></div>
                                </span>
                                <span className="feature-text">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="card-hover-effect"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Infrastructure Excellence Section */}
          {activeCategory === "excellence" && (
            <section
              className="excellence-section"
              ref={(el) => addToRefs(el, 3)}
              data-section="excellence"
            >
              <div className="excellence-background"></div>
              <div className="container">
                <div className="section-header">
                  <div className="header-badge">Premium Quality</div>
                  <h2>Infrastructure Excellence</h2>
                  <div className="section-divider"></div>
                  <p>
                    State-of-the-art facilities and strategic partnerships
                    ensuring impeccable quality and timely delivery
                  </p>
                </div>

                <div className="excellence-intro">
                  <div className="intro-card">
                    <div className="intro-sparkle"></div>
                    <div className="intro-icon">⭐</div>
                    <p>
                      At Balaji Minerals, our infrastructure stands as a
                      testament to cutting-edge technology and seamless
                      operations. We take immense pride in our state-of-the-art
                      machinery and proficient in-house laboratories, supported
                      by robust partnerships with premier packaging and
                      transportation companies. This synergy ensures the
                      impeccable quality and timely delivery of your shipments.
                    </p>
                  </div>
                </div>

                <div className="highlights-grid">
                  {infrastructureHighlights.map((highlight, index) => (
                    <div
                      key={index}
                      className={`highlight-card ${
                        visibleSections.excellence ? "animate-in" : ""
                      }`}
                      style={{ animationDelay: highlight.delay }}
                    >
                      <div className="card-shine"></div>
                      <div className="highlight-icon-wrapper">
                        <div className="highlight-main-icon">
                          {highlight.icon}
                        </div>
                        <div className="icon-orb"></div>
                      </div>
                      <h3>{highlight.title}</h3>
                      <p>{highlight.description}</p>
                      <div className="highlight-glow"></div>
                      <div className="card-ribbon">Premium</div>
                    </div>
                  ))}
                </div>

                <div className="service-excellence">
                  <div className="service-content">
                    <div className="service-icon">🎯</div>
                    <div className="service-text">
                      <h3>End-to-End Service Excellence</h3>
                      <p>
                        From inception to delivery, our auxiliary services are
                        meticulously orchestrated, guaranteeing not just
                        superior products but also reliable packaging, efficient
                        transport, and comprehensive tracking, right up to your
                        factory floor.
                      </p>
                    </div>
                  </div>
                  <div className="service-features">
                    <div className="service-feature">
                      <div className="feature-dot"></div>
                      <span>Quality Assurance</span>
                    </div>
                    <div className="service-feature">
                      <div className="feature-dot"></div>
                      <span>Timely Delivery</span>
                    </div>
                    <div className="service-feature">
                      <div className="feature-dot"></div>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>

                <div className="strategic-advantages">
                  <h3>Strategic Advantages</h3>
                  <div className="advantages-grid">
                    {strategicAdvantages.map((advantage, index) => (
                      <div
                        key={index}
                        className="advantage-item"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <div className="advantage-glow"></div>
                        <div className="advantage-number">
                          {advantage.number}
                        </div>
                        <div className="advantage-label">{advantage.label}</div>
                        <p>{advantage.description}</p>
                        <div className="advantage-arrow">→</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Functional Units Section */}
          {activeCategory === "functional" && (
            <section
              className="functional-section"
              ref={(el) => addToRefs(el, 4)}
              data-section="functional"
            >
              <div className="functional-pattern"></div>
              <div className="container">
                <div className="section-header">
                  <div className="header-badge">Core Operations</div>
                  <h2>Key Functional Units</h2>
                  <div className="section-divider"></div>
                  <p>
                    Purpose-built infrastructure equipped with cutting-edge
                    machinery ensuring efficiency and highest quality standards
                  </p>
                </div>

                <div className="functional-intro">
                  <div className="intro-content">
                    <div className="intro-ornament"></div>
                    <p>
                      Our technologically advanced infrastructure has been
                      purposefully crafted to meet and exceed production
                      requirements and stringent quality benchmarks. Every facet
                      of our facility is equipped with cutting-edge machinery,
                      ensuring not just efficiency but also maintaining the
                      highest standards of quality control.
                    </p>
                  </div>
                </div>

                <div className="units-grid">
                  {keyFunctionalUnits.map((unit, index) => (
                    <div
                      key={index}
                      className={`unit-card ${
                        visibleSections.functional ? "animate-in" : ""
                      }`}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div className="unit-glow"></div>
                      <div className="unit-header">
                        <div className="unit-icon-wrapper">
                          <div className="unit-icon">{unit.icon}</div>
                          <div className="unit-icon-bg"></div>
                        </div>
                        <h3>{unit.title}</h3>
                      </div>
                      <p className="unit-description">{unit.description}</p>
                      <div className="unit-features">
                        <h4>Core Capabilities:</h4>
                        <ul>
                          {unit.features.map((feature, featureIndex) => (
                            <li key={featureIndex}>
                              <span className="capability-marker">
                                <div className="capability-dot"></div>
                              </span>
                              <span className="capability-text">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="unit-footer">
                        <span className="status-indicator">
                          <span className="status-pulse"></span>
                          Operational Excellence
                        </span>
                      </div>
                      <div className="unit-corner"></div>
                    </div>
                  ))}
                </div>

                <div className="commitment-section">
                  <div className="commitment-card">
                    <div className="commitment-rings">
                      <div className="ring ring-1"></div>
                      <div className="ring ring-2"></div>
                      <div className="ring ring-3"></div>
                    </div>
                    <div className="commitment-icon">🏆</div>
                    <div className="commitment-content">
                      <h3>Our Commitment to Excellence</h3>
                      <p>
                        At Balaji Minerals, our infrastructure isn't just a
                        foundation; it's a commitment to excellence, innovation,
                        and reliability at every step of your journey with us.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;
