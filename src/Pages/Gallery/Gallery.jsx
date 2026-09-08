import React, { useState, useEffect, useRef } from "react";
import {
  FiZoomIn,
  FiX,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiStar,
} from "react-icons/fi";
import {
  FaIndustry,
  FaMountain,
  FaWater,
  FaBox,
  FaFlask,
} from "react-icons/fa";
import "./Gallery.css";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedImages, setLikedImages] = useState([]);
  const modalRef = useRef(null);

  // Color palette based on #DFC15F (golden)
  const colors = {
    primary: "#DFC15F", // Golden
    primaryLight: "#F5DE9D", // Light golden
    primaryDark: "#B89A3C", // Dark golden
    secondary: "#2C3E50", // Dark blue
    secondaryLight: "#34495E", // Light blue
    accent: "#E74C3C", // Red accent
    light: "#ECF0F1", // Light gray
    background: "#F9F5EB", // Cream background
    text: "#2C3E50", // Dark text
    textLight: "#7F8C8D", // Light text
  };

  // Gallery images data
  const galleryImages = [
    {
      id: 1,
      title: "Silica Sand Processing Plant",
      category: "plant",
      src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description:
        "State-of-the-art silica sand processing facility with automated systems.",
      details: {
        Capacity: "500 TPD",
        Automation: "Full Automation",
        Technology: "German Technology",
        Location: "Ahmedabad, Gujarat",
      },
      icon: <FaIndustry />,
    },
    {
      id: 2,
      title: "Premium Silica Sand",
      category: "sand",
      src: "https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "High-purity silica sand with 99.5% SiO₂ content.",
      details: {
        Purity: "99.5% SiO₂",
        "Grain Size": "0.1-0.5mm",
        Color: "Pure White",
        Application: "Glass Manufacturing",
      },
      icon: <FiStar />,
    },
    {
      id: 3,
      title: "Sand Washing Unit",
      category: "plant",
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Advanced multi-stage sand washing system.",
      details: {
        Process: "5-Stage Washing",
        Efficiency: "95% Recovery",
        "Water Recycle": "90%",
        Capacity: "300 TPD",
      },
      icon: <FaWater />,
    },
    {
      id: 4,
      title: "Industrial Grade Sand",
      category: "sand",
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Perfectly graded sand for industrial applications.",
      details: {
        Grade: "A-1",
        "Mesh Size": "20-40",
        Hardness: "7 Mohs",
        Usage: "Foundry & Construction",
      },
      icon: <FaMountain />,
    },
    {
      id: 5,
      title: "Quality Control Laboratory",
      category: "plant",
      src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Advanced testing facility for quality assurance.",
      details: {
        Tests: "20+ Parameters",
        Accuracy: "99.9%",
        Certification: "NABL Approved",
        Equipment: "Latest Technology",
      },
      icon: <FaFlask />,
    },
    {
      id: 6,
      title: "Filter Grade Sand",
      category: "sand",
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Special grade sand for water filtration systems.",
      details: {
        Type: "Filter Media",
        Size: "0.8-1.2mm",
        Uniformity: "90%",
        Lifespan: "5-7 Years",
      },
      icon: <FiStar />,
    },
    {
      id: 7,
      title: "Packaging Unit",
      category: "plant",
      src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Automated packaging and dispatch facility.",
      details: {
        Capacity: "1000 bags/hour",
        Automation: "Robotic System",
        Packaging: "25kg, 50kg, 1Ton",
        Dispatch: "24/7 Operation",
      },
      icon: <FaBox />,
    },
    {
      id: 8,
      title: "Construction Sand",
      category: "sand",
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "High-quality sand for construction industry.",
      details: {
        Type: "Construction Grade",
        Strength: "High",
        Fineness: "Controlled",
        Purity: "98%",
      },
      icon: <FaMountain />,
    },
  ];

  // Filter categories
  const categories = [
    { id: "all", name: "All", icon: <FiFilter /> },
    { id: "plant", name: "Plant", icon: <FaIndustry /> },
    { id: "sand", name: "Sand", icon: <FaMountain /> },
  ];

  // Filter images
  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  // Handle image click
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  // Navigate images
  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Handle like
  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedImages((prev) =>
      prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <div
      className="gallery-container"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <header className="gallery-header">
        <div className="header-content">
          <h1 className="gallery-title" style={{ color: colors.text }}>
            Silica Sand & Plant Gallery
          </h1>
          <p className="gallery-subtitle" style={{ color: colors.textLight }}>
            Explore our manufacturing facilities and premium products
          </p>
        </div>
      </header>

      {/* Filter Buttons */}
      <div className="filter-section">
        <div className="filter-container">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${filter === category.id ? "active" : ""}`}
              onClick={() => setFilter(category.id)}
              style={{
                backgroundColor:
                  filter === category.id ? colors.primary : colors.light,
                color: filter === category.id ? colors.text : colors.textLight,
                borderColor: colors.primary,
              }}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-text">{category.name}</span>
              <span className="filter-count">
                {category.id === "all"
                  ? galleryImages.length
                  : galleryImages.filter((img) => img.category === category.id)
                      .length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="gallery-card"
            onClick={() => handleImageClick(image, index)}
            style={{
              animationDelay: `${index * 0.1}s`,
              borderColor: colors.light,
            }}
          >
            <div className="card-image">
              <img src={image.src} alt={image.title} loading="lazy" />
              <div className="image-overlay">
                <div className="overlay-content">
                  <span
                    className="category-badge"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {image.category === "plant" ? "Plant" : "Sand"}
                  </span>
                  <FiZoomIn
                    className="zoom-icon"
                    style={{ color: colors.primary }}
                  />
                </div>
              </div>
            </div>

            <div className="card-content">
              <div className="card-header">
                <div className="card-icon" style={{ color: colors.primary }}>
                  {image.icon}
                </div>
                <h3 className="card-title" style={{ color: colors.text }}>
                  {image.title}
                </h3>
                <button
                  className={`like-btn ${
                    likedImages.includes(image.id) ? "liked" : ""
                  }`}
                  onClick={(e) => toggleLike(image.id, e)}
                  style={{
                    color: likedImages.includes(image.id)
                      ? colors.accent
                      : colors.textLight,
                  }}
                >
                  <FiHeart />
                </button>
              </div>

              <p
                className="card-description"
                style={{ color: colors.textLight }}
              >
                {image.description}
              </p>

              <div className="card-tags">
                {Object.keys(image.details)
                  .slice(0, 2)
                  .map((key) => (
                    <span
                      key={key}
                      className="tag"
                      style={{
                        backgroundColor: colors.primary + "20",
                        color: colors.primaryDark,
                      }}
                    >
                      {image.details[key]}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="gallery-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content" ref={modalRef}>
            <div className="modal-header">
              <div className="modal-title">
                <h2 style={{ color: colors.text }}>{selectedImage.title}</h2>
                <div
                  className="modal-category"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.text,
                  }}
                >
                  {selectedImage.category === "plant"
                    ? "Plant Facility"
                    : "Sand Product"}
                </div>
              </div>
              <button
                className="modal-close"
                onClick={closeModal}
                style={{ color: colors.text }}
              >
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-image-container">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="modal-image"
                />

                <div className="modal-navigation">
                  <button
                    className="nav-btn prev"
                    onClick={prevImage}
                    style={{ backgroundColor: colors.primary }}
                  >
                    <FiChevronLeft />
                  </button>
                  <div className="image-counter" style={{ color: colors.text }}>
                    {currentIndex + 1} / {filteredImages.length}
                  </div>
                  <button
                    className="nav-btn next"
                    onClick={nextImage}
                    style={{ backgroundColor: colors.primary }}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>

              <div className="modal-info">
                <div className="modal-description">
                  <p style={{ color: colors.text }}>
                    {selectedImage.description}
                  </p>
                </div>

                <div className="modal-details">
                  <h3 style={{ color: colors.text }}>Specifications</h3>
                  <div className="details-grid">
                    {Object.entries(selectedImage.details).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="detail-item"
                          style={{ borderColor: colors.light }}
                        >
                          <span
                            className="detail-label"
                            style={{ color: colors.textLight }}
                          >
                            {key}
                          </span>
                          <span
                            className="detail-value"
                            style={{ color: colors.text }}
                          >
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    className={`action-btn ${
                      likedImages.includes(selectedImage.id) ? "liked" : ""
                    }`}
                    onClick={() =>
                      toggleLike(selectedImage.id, {
                        stopPropagation: () => {},
                      })
                    }
                    style={{
                      backgroundColor: likedImages.includes(selectedImage.id)
                        ? colors.accent
                        : colors.light,
                      color: likedImages.includes(selectedImage.id)
                        ? "white"
                        : colors.text,
                    }}
                  >
                    <FiHeart />{" "}
                    {likedImages.includes(selectedImage.id) ? "Liked" : "Like"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className="gallery-footer"
        style={{ backgroundColor: colors.secondary, color: colors.light }}
      >
        <div className="footer-content">
          <p>
            © 2024 Silica Sand Gallery. All images are for demonstration
            purposes.
          </p>
          <div className="footer-stats">
            <span>Total Images: {galleryImages.length}</span>
            <span>•</span>
            <span>Liked: {likedImages.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
