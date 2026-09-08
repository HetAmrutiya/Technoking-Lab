import React, { useEffect, useRef, useState } from "react";
import "./Team.css";
import {
  Users,
  Award,
  Shield,
  Target,
  Linkedin,
  Mail,
  Phone,
  Globe,
  Briefcase,
  Calendar,
  MapPin,
  Star,
  ChevronRight,
  Sparkles,
  Zap,
  TrendingUp,
  Heart,
  Clock,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Code,
  Palette,
  Database,
  Cloud,
  Smartphone,
  Lock,
  Server,
  Cpu,
  GitBranch,
  Code2,
  Layers,
  Terminal,
  Wifi,
  ShieldCheck,
  Key,
  Fingerprint,
  Brain,
  Rocket,
  Lightbulb,
  Users2,
  Target as TargetIcon,
  BarChart3,
  Globe2,
  Building,
  Puzzle,
  GitPullRequest,
  Eye,
  BrainCircuit,
  Crown,
  Trophy,
  Medal,
  Flag,
  Gem,
  Diamond,
} from "lucide-react";
import mineralsBackground from "../../assets/ut.jpg";

// Team images (You'll need to add these images to your assets folder)
import admin1 from "../../assets/ut.jpg";
import admin2 from "../../assets/ut.jpg";
import admin3 from "../../assets/ut.jpg";
import admin4 from "../../assets/ut.jpg";
import admin5 from "../../assets/ut.jpg";
import admin6 from "../../assets/ut.jpg";
import teamBg from "../../assets/ut.jpg";

const Team = () => {
  const [activeMember, setActiveMember] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    clients: 0,
    awards: 0,
  });

  const sectionRefs = useRef([]);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  const primaryColor = "#cc1616";
  const secondaryColor = "#0a0a0a";
  const accentColor = "#f0f0f0";

  // Animation for stats counting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate stats counting
            const targetStats = {
              projects: 1500,
              experience: 25,
              clients: 500,
              awards: 87,
            };

            const duration = 2000;
            const steps = 60;

            Object.keys(targetStats).forEach((key) => {
              const increment = targetStats[key] / steps;
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= targetStats[key]) {
                  current = targetStats[key];
                  clearInterval(timer);
                }
                setStats((prev) => ({
                  ...prev,
                  [key]: Math.floor(current),
                }));
              }, duration / steps);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for animations
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
      { threshold: 0.1, rootMargin: "-50px" }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el, index) => {
    sectionRefs.current[index] = el;
  };

  // Team Data
  const teamMembers = [
    {
      id: 1,
      name: "Dhaval Amrutiya",
      role: "Chief Executive Officer",
      image: admin1,
      department: "Leadership",
      color: "#cc1616",
      gradient: "linear-gradient(135deg, #cc1616 0%, #a01212 100%)",
      experience: 15,
      description:
        "Visionary leader with 15+ years in business strategy and digital transformation",
      skills: [
        "Strategic Planning",
        "Business Development",
        "Digital Transformation",
        "Leadership",
      ],
      education: "MBA - Indian Institute of Management, Ahmedabad",
      certifications: ["PMP", "Six Sigma Black Belt", "Digital Strategy"],
      social: {
        linkedin: "https://linkedin.com/in/dhaval-amrutiya",
        email: "dhaval@company.com",
        phone: "+91 98765 43210",
      },
      achievements: [
        "Led company to 400% growth in 5 years",
        "Entrepreneur of the Year 2023",
        "Digital Innovation Award 2022",
      ],
      funFact: "National level chess player",
      joinDate: "2015",
      projects: 280,
      quote: "Success is not about ideas. It's about making ideas happen.",
    },
    {
      id: 2,
      name: "Parth Amrutiya",
      role: "Chief Technology Officer",
      image: admin2,
      department: "Leadership",
      color: "#3498db",
      gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
      experience: 12,
      description:
        "Tech visionary with expertise in scalable systems and emerging technologies",
      skills: ["System Architecture", "AI/ML", "Cloud Computing", "DevOps"],
      education: "M.Tech Computer Science - IIT Bombay",
      certifications: [
        "AWS Solutions Architect",
        "Google Cloud Architect",
        "Azure Expert",
      ],
      social: {
        linkedin: "https://linkedin.com/in/parth-amrutiya",
        email: "parth@company.com",
        phone: "+91 98765 43211",
      },
      achievements: [
        "Built platforms handling 2M+ concurrent users",
        "Open Source Contributor of the Year",
        "10+ Technology Patents",
      ],
      funFact: "Built first mobile app at age 14",
      joinDate: "2016",
      projects: 195,
      quote: "Technology is best when it brings people together.",
    },
    {
      id: 3,
      name: "Harsh Gandhi",
      role: "Chief Operations Officer",
      image: admin3,
      department: "Marketing",
      color: "#2ecc71",
      gradient: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
      experience: 11,
      description:
        "Operations specialist focused on efficiency, scalability and process excellence",
      skills: [
        "Process Optimization",
        "Supply Chain Management",
        "Quality Assurance",
        "Team Leadership",
      ],
      education: "MBA Operations - Symbiosis Institute of Business Management",
      certifications: [
        "Lean Six Sigma Master",
        "ISO 9001 Lead Auditor",
        "SCM Pro",
      ],
      social: {
        linkedin: "https://linkedin.com/in/harsh-gandhi",
        email: "harsh@company.com",
        phone: "+91 98765 43212",
      },
      achievements: [
        "Improved operational efficiency by 45%",
        "Awarded Best Operations Team 2023",
        "Successfully scaled operations to 5 countries",
      ],
      funFact: "Ultra marathon runner and mountaineer",
      joinDate: "2017",
      projects: 135,
      quote: "Operations is the engine that drives business forward.",
    },
    {
      id: 4,
      name: "Sanjay Patel",
      role: "Head of Research & Development",
      image: admin4,
      department: "Sales",
      color: "#9b59b6",
      gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
      experience: 9,
      description:
        "Innovation leader driving cutting-edge research in AI and emerging technologies",
      skills: [
        "Research Methodology",
        "Data Science",
        "Product Innovation",
        "Intellectual Property",
      ],
      education: "Ph.D. Artificial Intelligence - IIT Delhi",
      certifications: ["Research Methodology", "Patent Law", "AI Ethics"],
      social: {
        linkedin: "https://linkedin.com/in/sanjay-patel",
        email: "sanjay@company.com",
        phone: "+91 98765 43213",
      },
      achievements: [
        "25+ Patents Filed in AI Technology",
        "Published 30+ Research Papers",
        "National Innovation Award 2023",
      ],
      funFact: "Published science fiction novelist",
      joinDate: "2018",
      projects: 105,
      quote: "Innovation distinguishes between a leader and a follower.",
    },
    {
      id: 5,
      name: "Kaushik Patel",
      role: "Head of Marketing",
      image: admin5,
      department: "Operations",
      color: "#f39c12",
      gradient: "linear-gradient(135deg, #f39c12 0%, #d35400 100%)",
      experience: 8,
      description:
        "Creative marketing strategist with expertise in digital brand building and growth marketing",
      skills: [
        "Digital Marketing",
        "Brand Strategy",
        "Content Marketing",
        "Performance Analytics",
      ],
      education: "MBA Marketing - SP Jain Institute of Management",
      certifications: [
        "Google Analytics Expert",
        "HubSpot Certified",
        "Facebook Blueprint",
      ],
      social: {
        linkedin: "https://linkedin.com/in/kaushik-shah",
        email: "kaushik@company.com",
        phone: "+91 98765 43214",
      },
      achievements: [
        "Grew brand presence by 700% in 2 years",
        "Awarded Best Digital Campaign 2023",
        "Increased social media engagement by 300%",
      ],
      funFact: "Professional wildlife photographer",
      joinDate: "2019",
      projects: 85,
      quote: "Marketing is not about selling. It's about creating value.",
    },
    {
      id: 6,
      name: "Yash Vadaliya",
      role: "Head of Finance",
      image: admin6,
      department: "Technology",
      color: "#1abc9c",
      gradient: "linear-gradient(135deg, #1abc9c 0%, #16a085 100%)",
      experience: 10,
      description:
        "Financial strategist with expertise in corporate finance, investments and financial planning",
      skills: [
        "Financial Planning",
        "Risk Management",
        "Investment Strategy",
        "Mergers & Acquisitions",
      ],
      education: "CA & CFA - The Institute of Chartered Accountants of India",
      certifications: ["Chartered Accountant", "CFA", "FRM"],
      social: {
        linkedin: "https://linkedin.com/in/yash-desai",
        email: "yash@company.com",
        phone: "+91 98765 43215",
      },
      achievements: [
        "Secured ₹500 Crores in funding",
        "Financial Excellence Award 2023",
        "Successfully led 5 major acquisitions",
      ],
      funFact: "International chess tournament winner",
      joinDate: "2016",
      projects: 125,
      quote:
        "Finance is not merely about making money. It's about achieving our deep goals.",
    },
    {
      id: 7,
      name: "Haresh Amrutiya",
      role: "Head of Sales",
      image: admin1,
      department: "Sales",
      color: "#e74c3c",
      gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
      experience: 9,
      description:
        "Sales leader with proven track record in enterprise sales and client relationship management",
      skills: [
        "Enterprise Sales",
        "Client Relations",
        "Sales Strategy",
        "Negotiation",
      ],
      education:
        "MBA Sales & Marketing - Narsee Monjee Institute of Management",
      certifications: ["Sales Leadership", "CRM Expert", "Strategic Selling"],
      social: {
        linkedin: "https://linkedin.com/in/haresh-mehta",
        email: "haresh@company.com",
        phone: "+91 98765 43216",
      },
      achievements: [
        "Achieved 200% sales growth in 3 years",
        "Top Sales Leader Award 2022-2023",
        "Built enterprise client base of 500+ companies",
      ],
      funFact: "National level badminton player",
      joinDate: "2018",
      projects: 150,
      quote: "Sales is not about selling. It's about building relationships.",
    },
    {
      id: 8,
      name: "Gaurav Manvar",
      role: "Head of Product",
      image: admin2,
      department: "Product",
      color: "#34495e",
      gradient: "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)",
      experience: 8,
      description:
        "Product visionary with expertise in product strategy, development and user experience",
      skills: [
        "Product Strategy",
        "User Experience",
        "Agile Development",
        "Product Lifecycle",
      ],
      education: "B.Tech + MBA - IIT Kharagpur & IIM Bangalore",
      certifications: ["Product Management", "UX Design", "Agile Scrum Master"],
      social: {
        linkedin: "https://linkedin.com/in/gaurav-manvar",
        email: "gaurav@company.com",
        phone: "+91 98765 43217",
      },
      achievements: [
        "Launched 10+ successful products",
        "Product of the Year Award 2023",
        "Increased user satisfaction by 40%",
      ],
      funFact: "Award-winning magician",
      joinDate: "2019",
      projects: 95,
      quote:
        "Great products don't focus on features. They focus on experiences.",
    },
    {
      id: 9,
      name: "Jayesh Hasalpara",
      role: "Head of Product",
      image: admin3,
      department: "Product",
      color: "#8e44ad",
      gradient: "linear-gradient(135deg, #8e44ad 0%, #732d91 100%)",
      experience: 11,
      description:
        "HR leader specializing in talent acquisition, employee engagement and organizational development",
      skills: [
        "Talent Acquisition",
        "Employee Engagement",
        "Organizational Development",
        "HR Strategy",
      ],
      education: "MBA HR - Tata Institute of Social Sciences",
      certifications: ["SHRM Certified", "HR Analytics", "Talent Management"],
      social: {
        linkedin: "https://linkedin.com/in/jayesh-bhatt",
        email: "jayesh@company.com",
        phone: "+91 98765 43218",
      },
      achievements: [
        "Reduced employee turnover by 30%",
        "Best Workplace Award 2023",
        "Built team from 50 to 500+ employees",
      ],
      funFact: "Professional classical singer",
      joinDate: "2017",
      projects: 75,
      quote:
        "Take care of your employees and they will take care of your business.",
    },
  ];

  // Departments for filtering
  // Departments for filtering
  const departments = [
    { id: "all", name: "All Team", icon: <Users size={18} /> },
    { id: "leadership", name: "Leadership", icon: <Crown size={18} /> },
    { id: "technology", name: "Technology", icon: <Code size={18} /> },
    { id: "operations", name: "Operations", icon: <BarChart3 size={18} /> },
    { id: "marketing", name: "Marketing", icon: <TargetIcon size={18} /> },
    { id: "sales", name: "Sales", icon: <Target size={18} /> },
    { id: "product", name: "Product", icon: <Layers size={18} /> },
  ];

  // Core Values
  const coreValues = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Integrity First",
      description:
        "We operate with honesty and transparency in everything we do",
      color: "#2ecc71",
    },
    {
      icon: <BrainCircuit size={32} />,
      title: "Innovation Driven",
      description: "Constantly pushing boundaries with creative solutions",
      color: "#3498db",
    },
    {
      icon: <Heart size={32} />,
      title: "Customer Centric",
      description: "Our customers' success is our ultimate measure",
      color: "#e74c3c",
    },
    {
      icon: <GitPullRequest size={32} />,
      title: "Collaborative Spirit",
      description: "Great things are never done by one person",
      color: "#9b59b6",
    },
    {
      icon: <Rocket size={32} />,
      title: "Excellence Always",
      description: "Striving for the highest standards in all we do",
      color: "#f39c12",
    },
    {
      icon: <Globe2 size={32} />,
      title: "Global Impact",
      description: "Creating solutions that make a worldwide difference",
      color: "#1abc9c",
    },
  ];

  // Company Milestones
  const milestones = [
    { year: "2015", event: "Company Founded", icon: <Rocket size={20} /> },
    { year: "2016", event: "First Major Client", icon: <Trophy size={20} /> },
    { year: "2018", event: "Series A Funding", icon: <TrendingUp size={20} /> },
    { year: "2020", event: "Global Expansion", icon: <Globe size={20} /> },
    { year: "2022", event: "Award Winning Team", icon: <Award size={20} /> },
    { year: "2023", event: "Innovation Leader", icon: <Zap size={20} /> },
  ];

  // Filter team members by department
  const filteredMembers =
    activeFilter === "all"
      ? teamMembers
      : teamMembers.filter(
          (member) =>
            member.department.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <div className="team-container" id="team">
      {/* Team Members Section */}
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
            <h1 className="herozz-title">
              <span className="title-line">
                Team&nbsp;
                <span className="title-line highlight">Member</span>
              </span>
            </h1>
            <p className="hero-subtitle">
              Cutting-edge technology and seamless operations ensuring superior
              quality and reliability
            </p>
          </div>
        </div>
      </section>
      <section
        className="team-members-section"
        ref={(el) => addToRefs(el, 1)}
        data-section="members"
      >
        <div className="container">
          <div className="section-header">
            <div className="section-badge" style={{ background: primaryColor }}>
              <Users size={16} />
              Meet The Team
            </div>
            <h2 className="section-title">Leadership That Inspires</h2>
            <p className="section-subtitle">
              Our leadership team combines deep industry expertise with
              visionary thinking
            </p>
          </div>

          {/* Department Filter */}
          <div className="department-filter">
            {departments.map((dept) => (
              <button
                key={dept.id}
                className={`filter-btn ${
                  activeFilter === dept.id ? "active" : ""
                }`}
                onClick={() => setActiveFilter(dept.id)}
              >
                {dept.icon}
                <span>{dept.name}</span>
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="team-grid">
            {filteredMembers.map((member, index) => (
              <div
                key={member.id}
                className={`team-card ${
                  visibleSections.members ? "animate-slide-up" : ""
                } ${activeMember === index ? "active" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveMember(index)}
                onMouseEnter={() => setHoveredCard(member.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-content">
                  {/* Card Front */}
                  <div className="card-front">
                    <div className="member-image-container">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="member-image"
                      />
                      <div
                        className="image-overlay"
                        style={{ background: member.gradient }}
                      ></div>
                      <div className="member-badge">
                        <Crown size={16} />
                      </div>
                    </div>
                    <div className="member-info">
                      <h3 className="member-name2">{member.name}</h3>
                      <p className="member-role">{member.role}</p>
                      <div className="member-department">
                        <Briefcase size={14} />
                        <span>{member.department}</span>
                      </div>
                      <div className="member-experience">
                        <Calendar size={14} />
                        <span>{member.experience}+ years</span>
                      </div>
                    </div>
                    <div className="view-details-btn">
                      <span>View Details</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Member Detail */}
      {teamMembers[activeMember] && (
        <section
          className="member-detail-section"
          ref={(el) => addToRefs(el, 2)}
          data-section="detail"
        >
          <div className="container">
            <div
              className={`member-detail-card ${
                visibleSections.detail ? "animate-fade-in" : ""
              }`}
            >
              <div className="detail-header">
                <div className="member-avatar">
                  <img
                    src={teamMembers[activeMember].image}
                    alt={teamMembers[activeMember].name}
                  />
                  <div
                    className="avatar-glow"
                    style={{ background: teamMembers[activeMember].gradient }}
                  ></div>
                </div>
                <div className="member-intro">
                  <div className="intro-badge">
                    <Crown size={16} />
                    Leadership Team
                  </div>
                  <h2 className="member-name">
                    {teamMembers[activeMember].name}
                  </h2>
                  <h3 className="member-title">
                    {teamMembers[activeMember].role}
                  </h3>
                  <p className="member-description">
                    {teamMembers[activeMember].description}
                  </p>
                  <div className="member-meta">
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>Joined: {teamMembers[activeMember].joinDate}</span>
                    </div>
                    <div className="meta-item">
                      <Target size={16} />
                      <span>{teamMembers[activeMember].projects} Projects</span>
                    </div>
                    <div className="meta-item">
                      <Award size={16} />
                      <span>
                        {teamMembers[activeMember].experience} Years Exp
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-content">
                {/* Skills & Expertise */}
                <div className="detail-section">
                  <h4 className="section-title">
                    <Brain size={20} />
                    Skills & Expertise
                  </h4>
                  <div className="skills-grid">
                    {teamMembers[activeMember].skills.map((skill, idx) => (
                      <div key={idx} className="skill-tag">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="detail-section">
                  <h4 className="section-title">
                    <Trophy size={20} />
                    Key Achievements
                  </h4>
                  <div className="achievements-list">
                    {teamMembers[activeMember].achievements.map(
                      (achievement, idx) => (
                        <div key={idx} className="achievement-item">
                          <Medal size={16} />
                          <span>{achievement}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Education & Certifications */}
                <div className="detail-section">
                  <h4 className="section-title">
                    <Gem size={20} />
                    Qualifications
                  </h4>
                  <div className="qualifications">
                    <div className="qualification-item">
                      <div className="qualification-icon">
                        <BookIcon />
                      </div>
                      <div className="qualification-content">
                        <h5>Education</h5>
                        <p>{teamMembers[activeMember].education}</p>
                      </div>
                    </div>
                    <div className="qualification-item">
                      <div className="qualification-icon">
                        <Shield size={20} />
                      </div>
                      <div className="qualification-content">
                        <h5>Certifications</h5>
                        <div className="certifications">
                          {teamMembers[activeMember].certifications.map(
                            (cert, idx) => (
                              <span key={idx} className="cert-tag">
                                {cert}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fun Fact & Quote */}
                <div className="detail-section">
                  <div className="quote-fact-grid">
                    <div className="fun-fact">
                      <h4 className="section-title">
                        <Sparkles size={20} />
                        Fun Fact
                      </h4>
                      <p>{teamMembers[activeMember].funFact}</p>
                    </div>
                    <div className="member-quote">
                      <h4 className="section-title">
                        <MessageSquare size={20} />
                        Favorite Quote
                      </h4>
                      <blockquote>
                        "{teamMembers[activeMember].quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="detail-section">
                  <h4 className="section-title">
                    <Phone size={20} />
                    Contact
                  </h4>
                  <div className="contact-info">
                    <a
                      href={`mailto:${teamMembers[activeMember].social.email}`}
                      className="contact-link"
                    >
                      <Mail size={18} />
                      <span>{teamMembers[activeMember].social.email}</span>
                    </a>
                    <a
                      href={`tel:${teamMembers[activeMember].social.phone}`}
                      className="contact-link"
                    >
                      <Phone size={18} />
                      <span>{teamMembers[activeMember].social.phone}</span>
                    </a>
                    <a
                      href={teamMembers[activeMember].social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      <Linkedin size={18} />
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Core Values */}
      <section
        className="core-values-section"
        ref={(el) => addToRefs(el, 3)}
        data-section="values"
      >
        <div className="container">
          <div className="section-header">
            <div className="section-badge" style={{ background: primaryColor }}>
              <Heart size={16} />
              Our Culture
            </div>
            <h2 className="section-title">Core Values That Define Us</h2>
            <p className="section-subtitle">
              The principles that guide our decisions and shape our culture
            </p>
          </div>

          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`value-card ${
                  visibleSections.values ? "animate-pop" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="value-icon-wrapper"
                  style={{ background: `${value.color}20` }}
                >
                  <div className="value-icon" style={{ color: value.color }}>
                    {value.icon}
                  </div>
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section
        className="milestones-section"
        ref={(el) => addToRefs(el, 4)}
        data-section="milestones"
      >
        <div className="container">
          <div className="section-header">
            <div className="section-badge" style={{ background: primaryColor }}>
              <Flag size={16} />
              Our Journey
            </div>
            <h2 className="section-title">Milestones & Achievements</h2>
            <p className="section-subtitle">
              The key moments that shaped our growth and success
            </p>
          </div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`timeline-item ${
                  visibleSections.milestones ? "animate-slide-up" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="timeline-year">
                  {milestone.year}
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-icon">{milestone.icon}</div>
                  <div className="timeline-event">{milestone.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Book Icon Component
const BookIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export default Team;
