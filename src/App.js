import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  Code,
  Award,
  Briefcase,
  Star,
  ArrowRight,
  Download,
  ChevronDown,
} from "lucide-react";

// Import your images here
// Uncomment and update paths according to your project structure
import grad1 from "./images/IMG_4620.JPG";
import premier1 from "./images/1.PNG";
import premier2 from "./images/2.PNG";
import premier3 from "./images/4.PNG";
import repo1 from "./images/IMG_5581.PNG";
import repo2 from "./images/IMG_5583.PNG";
import repo3 from "./images/IMG_5582.PNG";
import lumify3 from "./images/IMG_0513.PNG";
import lumify2 from "./images/IMG_5580.PNG";
import lumify1 from "./images/IMG_5579.PNG";
import myLogo from "./images/MyLogo.png";

const TypedCode = ({ code, delay = 0 }) => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < code.length) {
        setDisplayedCode(code.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isVisible, code]);

  return (
    <pre className="text-xs md:text-sm text-green-400 font-mono overflow-x-auto bg-black/40 p-4 rounded-lg border border-green-500/20">
      <code>{displayedCode}</code>
      <span className="animate-pulse">|</span>
    </pre>
  );
};

const ScrollReveal = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = React.useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref) observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref]);

  return (
    <div
      ref={setRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [currentProject, setCurrentProject] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const images = apps[currentProject].images;

      setCarouselIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2500); // autoplay speed

    return () => clearInterval(interval);
  }, [currentProject]);
  useEffect(() => {
    setCarouselIndex(0);
  }, [currentProject]);

  const nextProject = () => {
    setCurrentProject((prev) => (prev === apps.length - 1 ? prev : prev + 1));
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? prev : prev - 1));
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // existing logic
      setScrolled(currentScrollY > 50);

      // 🔽 hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }

      setLastScrollY(currentScrollY);

      // active section logic (keep as-is)
      const sections = [
        "home",
        "about",
        "apps",
        "experience",
        "skills",
        "contact",
      ];

      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const apps = [
    {
      name: "Premier Rewards",
      company: "Logic Nexus Systems",
      description:
        "Premier Rewards Your Gateway to Exclusive Rewards Discover a world of privileges with the Premier Rewards app. Earn points with every activity, enjoy personalized promotions, and redeem gifts directly from your phone effortlessly and conveniently. ",
      playStore:
        "https://play.google.com/store/apps/details?id=com.premier_rewards&pcampaignid=web_share",
      appStore: "https://apps.apple.com/lk/app/premier-rewards/id6751279250",
      tech: ["React Native", "Node.js", "Firebase", "Redux", "Lottie"],
      images: [premier1, premier2, premier3],
      color: "from-violet-600 to-purple-600",
      metrics: { users: "50K+", rating: "4.6" },
    },
    {
      name: "Repo One",
      company: "Logic Nexus Systems",
      description:
        "Advanced asset management system with real-time tracking, automated workflows, and enterprise integration capabilities.",
      playStore: "https://play.google.com/store/apps",
      appStore: "https://apps.apple.com/lk/app/repo-one/id1554229106",
      tech: ["React Native", "Express.js", "PostgreSQL", "Firebase"],
      images: [repo1, repo2, repo3],
      color: "from-blue-600 to-cyan-600",
      metrics: { users: "30K+", rating: "4.5" },
    },
    {
      name: "Lumify",
      company: "Logic Nexus Systems",
      description:
        "AI-powered business intelligence platform delivering actionable insights through advanced analytics and machine learning.",
      playStore:
        "https://play.google.com/store/apps/details?id=com.lumify&pcampaignid=web_share",
      appStore: "https://apps.apple.com",
      tech: ["React Native", "TypeScript", "Redux", "TensorFlow"],
      images: [lumify1, lumify2, lumify3],
      color: "from-orange-600 to-red-600",
      metrics: { users: "25K+", rating: "4.7" },
    },
  ];

  const experience = [
    {
      role: "Software Engineer",
      company: "Logic Nexus Systems Pvt Ltd",
      period: "Mar 2024 - Present",
      description: "Architecting production-grade mobile applications.",
      achievements: [
        "Shipped 2 apps with 100K+ downloads",
        "Reduced crash rate by 75%",
        "Implemented CI/CD pipeline",
      ],
      color: "violet",
    },
    {
      role: "Trainee Developer",
      company: "Sri Lanka Telecom Mobitel",
      period: "Apr - Oct 2024",
      description: "Built BCMS notification system handling 1M+ daily events.",
      achievements: [
        "Processed 1M+ daily notifications",
        "Optimized API by 40%",
        "Created monitoring dashboard",
      ],
      color: "blue",
    },
  ];

  const skills = {
    mobile: ["React Native", "iOS", "Android", "Expo"],
    frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Python", "REST APIs"],
    database: ["MongoDB", "PostgreSQL", "Firebase", "Redis"],
  };

  const codeSnippets = {
    profile: `{
  "name": "Rivindu Navanjana",
  "role": "Software Engineer",
  "specialization": "React Native",
  "experience": "3+ years",
  "focus": ["Mobile Apps", "Scalable Systems"],
  "status": "Available"
}`,
    stats: `const portfolio = {
  appsPublished: 3,
  totalDownloads: "100K+",
  avgRating: 4.6,
  usersServed: "100K+",
  achievements: [
    "High Performance",
    "User Centric"
  ]
};`,
  };

  const colorMap = {
    violet: "from-violet-500 to-purple-500",
    blue: "from-blue-500 to-cyan-500",
    orange: "from-orange-500 to-red-500",
  };

  const navItems = ["Home", "About", "Apps", "Experience", "Skills", "Contact"];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden cursor-none">
      {/* Custom Cursor */}
      <div
        className="fixed w-5 h-5 rounded-full border-2 border-violet-400 pointer-events-none z-[100] transition-transform duration-150 ease-out mix-blend-difference"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${
            cursorVariant === "hover" ? 2 : 1
          })`,
        }}
      />
      <div
        className="fixed w-2 h-2 bg-violet-400 rounded-full pointer-events-none z-[100] transition-all duration-100 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 transition-all duration-300 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)",
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out
    ${navVisible ? "translate-y-0" : "-translate-y-full"}
    ${
      scrolled
        ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg"
        : "bg-transparent"
    }
  `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="w-full h-full flex items-center">
              <img
                src={myLogo}
                alt="My logo"
                className="w-14 h-14 object-contain"
              />
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors relative group ${
                    activeSection === item.toLowerCase()
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {item}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 transition-all ${
                      activeSection === item.toLowerCase()
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>
              ))}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-6 py-4 hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-violet-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 pt-20 relative z-10"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="text-center lg:text-left">
              {/* <div className="mb-6 inline-block">
                <span className="px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm font-medium">
                  🚀 Available for Opportunities
                </span>
              </div> */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Rivindu Navanjana
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">
                Software Engineer
              </p>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                Specializing in building exceptional mobile applications with
                React Native. Transforming ideas into scalable, user-centric
                solutions.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
                <a
                  href="#apps"
                  className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full font-medium hover:shadow-lg hover:shadow-violet-500/50 transition-all flex items-center gap-2"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  View My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-medium hover:bg-white/10 transition-all"
                >
                  Let's Talk
                </a>
              </div>

              <div className="flex justify-center lg:justify-start gap-4">
                <a
                  href="https://github.com/RivinduNavanjana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-violet-400 transition-all group"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://linkedin.com/in/rivindu20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-violet-400 transition-all group"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <TypedCode code={codeSnippets.profile} delay={500} />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <a href="#about" className="animate-bounce">
              <ChevronDown className="w-6 h-6 text-violet-400" />
            </a>
          </ScrollReveal>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center">
              About{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Me
              </span>
            </h2>

            <div className="grid lg:grid-cols-5 gap-12 items-center mb-16">
              {/* Graduation Image - Creative Design */}
              <ScrollReveal className="lg:col-span-2">
                <div className="relative group">
                  {/* Animated gradient rings */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-700 animate-pulse"></div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 rounded-full opacity-20 blur-2xl animate-gradient"></div>

                  {/* Hexagonal frame effect */}
                  <div className="relative mx-auto w-72 h-72">
                    {/* Rotating border */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500 p-1 group-hover:scale-105 transition-transform duration-500"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #8b5cf6, #a855f7, #c084fc, #8b5cf6)",
                        animation: "spin 8s linear infinite",
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-slate-950"></div>
                    </div>

                    {/* Image container */}
                    <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-violet-500/30">
                      <img
                        src={grad1}
                        alt="Rivindu Navanjana"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* Floating particles */}
                    <div
                      className="absolute -top-2 -right-2 w-4 h-4 bg-violet-400 rounded-full animate-float"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="absolute top-1/4 -left-3 w-3 h-3 bg-purple-400 rounded-full animate-float"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute bottom-1/4 -right-4 w-2 h-2 bg-violet-300 rounded-full animate-float"
                      style={{ animationDelay: "2s" }}
                    ></div>
                    <div
                      className="absolute -bottom-3 left-1/3 w-3 h-3 bg-purple-300 rounded-full animate-float"
                      style={{ animationDelay: "1.5s" }}
                    ></div>

                    {/* Achievement badge */}
                    {/* <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm shadow-lg shadow-violet-500/50 group-hover:scale-110 transition-transform">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span className="text-xs font-bold whitespace-nowrap">
                          Software Engineer
                        </span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </ScrollReveal>

              {/* Content */}
              <div className="lg:col-span-3 space-y-8">
                <div>
                  <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                    I'm a passionate software engineer with 3+ years of
                    experience building scalable mobile applications that serve
                    hundreds of thousands of users globally.
                  </p>
                  <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                    My expertise lies in React Native development, where I
                    combine cutting-edge technologies with best practices to
                    deliver high-performance applications users love.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Apps Published", value: "3+" },
                    { label: "Total Downloads", value: "100K+" },
                    { label: "Years Experience", value: "3+" },
                    { label: "Avg Rating", value: "4.6★" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-violet-400/50 transition-all group"
                    >
                      <div className="text-violet-400 text-sm font-medium mb-1 group-hover:text-purple-400 transition-colors">
                        {stat.label}
                      </div>
                      <div className="text-2xl font-bold group-hover:scale-110 transition-transform inline-block">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ScrollReveal>
              <TypedCode code={codeSnippets.stats} delay={200} />
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </section>
      {/* Apps Section */}
      <section id="apps" className="py-32 relative z-10 overflow-hidden">
        <ScrollReveal>
          <div className="text-center mb-16 px-6">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Production applications serving thousands of users
            </p>
          </div>
        </ScrollReveal>

        {/* ===== ARROWS ===== */}
        <div className="absolute inset-y-0 left-6 flex items-center z-20">
          <button
            onClick={prevProject}
            disabled={currentProject === 0}
            className={`w-14 h-14 rounded-full flex items-center justify-center bg-white/10 backdrop-blur border border-white/20 transition ${
              currentProject === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:scale-110"
            }`}
          >
            ←
          </button>
        </div>

        <div className="absolute inset-y-0 right-6 flex items-center z-20">
          <button
            onClick={nextProject}
            disabled={currentProject === apps.length - 1}
            className={`w-14 h-14 rounded-full flex items-center justify-center bg-white/10 backdrop-blur border border-white/20 transition ${
              currentProject === apps.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:scale-110"
            }`}
          >
            →
          </button>
        </div>

        {/* ===== SLIDER ===== */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-24">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentProject * 100}%)`,
              }}
            >
              {apps.map((app, index) => (
                <div key={index} className="min-w-full">
                  <ScrollReveal>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      {/* PHONE MOCKUP */}
                      <div className="relative mx-auto w-full max-w-sm">
                        <div
                          className={`absolute -inset-8 bg-gradient-to-br ${app.color} opacity-20 blur-3xl rounded-full animate-float`}
                        />

                        <div className="relative z-10 bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-8 border-slate-800">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-3xl z-20" />

                          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/18]">
                            {app.images.map((img, imgIndex) => (
                              <img
                                key={imgIndex}
                                src={img}
                                alt=""
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                                  (index === currentProject
                                    ? carouselIndex
                                    : 0) === imgIndex
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-95"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Image dots */}
                        <div className="flex justify-center gap-2 mt-6">
                          {app.images.map((_, imgIndex) => (
                            <button
                              key={imgIndex}
                              onClick={() => setCarouselIndex(imgIndex)}
                              className={`transition-all rounded-full ${
                                carouselIndex === imgIndex
                                  ? "bg-white w-8 h-2"
                                  : "bg-white/40 w-2 h-2"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-full">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-green-400 text-sm font-bold uppercase">
                            Live in Production
                          </span>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-bold">
                          {app.name}
                        </h3>

                        <p className="text-violet-400 font-semibold text-lg">
                          {app.company}
                        </p>

                        <p className="text-slate-300 text-lg leading-relaxed">
                          {app.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {app.tech.map((tech, i) => (
                            <span
                              key={i}
                              className={`px-4 py-2 bg-gradient-to-br ${app.color} bg-opacity-10 border border-white/10 rounded-xl text-sm`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                            <p className="text-slate-400 text-sm">Downloads</p>
                            <p className="text-3xl font-bold">
                              {app.metrics.users}
                            </p>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                            <p className="text-slate-400 text-sm">Rating</p>
                            <p className="text-3xl font-bold">
                              {app.metrics.rating}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-6">
                          <a
                            href={app.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-6 py-4 bg-green-600 rounded-2xl font-semibold text-center hover:scale-105 transition-transform"
                          >
                            Play Store
                          </a>
                          <a
                            href={app.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-6 py-4 bg-blue-600 rounded-2xl font-semibold text-center hover:scale-105 transition-transform"
                          >
                            App Store
                          </a>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                Work{" "}
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <ScrollReveal key={index}>
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-16 h-16 flex-shrink-0 bg-gradient-to-br ${
                        colorMap[exp.color]
                      } rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Briefcase className="w-8 h-8" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            {exp.role}
                          </h3>
                          <p className="text-violet-400 font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-sm text-slate-400 bg-white/5 px-4 py-2 rounded-full whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-slate-400 mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="space-y-3">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-slate-300">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                Technical{" "}
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Expertise
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <ScrollReveal key={category}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all h-full">
                  <h3 className="text-xl font-bold mb-6 capitalize flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Code className="w-5 h-5" />
                    </div>
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 hover:border-violet-400/50 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Let's{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-16">
              Open to new opportunities and collaborations
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "rivindunavanjana2000@gmail.com",
                  href: "mailto:rivindunavanjana2000@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+94 76 939 0572",
                  href: "tel:+94769390572",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  value: "in/rivindu20",
                  href: "https://linkedin.com/in/rivindu20",
                },
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <ScrollReveal key={index}>
                    <a
                      href={contact.href}
                      target={
                        contact.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        contact.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      // className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-violet-400/50 transition-all"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8" />
                      </div>
                      <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">
                        {contact.label}
                      </p>
                      <p className="font-medium text-sm">{contact.value}</p>
                    </a>
                  </ScrollReveal>
                );
              })}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:rivindunavanjana2000@gmail.com"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full font-medium hover:shadow-lg hover:shadow-violet-500/50 transition-all flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Send Message
              </a>
              <a
                href="https://github.com/RivinduNavanjana"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View GitHub
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-400 font-medium">
                © 2024 Rivindu Navanjana
              </p>
              <p className="text-sm text-slate-500">All rights reserved</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/RivinduNavanjana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/rivindu20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:rivindunavanjana2000@gmail.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-violet-400 font-medium">
                Software Engineer
              </p>
              <p className="text-xs text-slate-500">React Native Specialist</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
