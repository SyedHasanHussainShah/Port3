import { useEffect, useMemo, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedName from "./components/AnimatedName";
import ScrollProgressCircle from "./components/ScrollProgressCircle";
import Marquee from "./components/Marquee";
import {
  Download,
  Mail,
  GraduationCap,
  Briefcase,
  BookOpen,
  Code2,
  Menu,
  X,
  FolderGit2,
  Code,
  Rocket,
  Target,
  Heart,
} from "lucide-react";
import {
  FaBootstrap,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiNextdotjs,
  SiExpress,
  SiTypescript,
  SiVite,
  SiCplusplus,
  SiSharp,
  SiOracle,
  SiFlask,
  SiThreedotjs,
  SiLinux,
} from "react-icons/si";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "./index.css";

interface Project {
  title: string;
  stack: string[];
  description: string;
  image: string;
  link: string;
}

// Content sourced from the provided CV
const PROFILE = {
  name: "SYED HASSAN HUSSAIN SHAH",
  title: "Web Developer, Programmer",
  location: "Gujranwala, Pakistan",
  email: "ssyedhassan667@gmail.com",
  github: "github.com/SyedHasanHussainShah ",
  linkedin: "linkedin.com/in/syed-hassan-shah-a3351b2b5",
};

const SKILL_ROTATION = [
  "HTML",
  "CSS",
  "JavaScript",
  "Tailwind CSS",
  "Bootstrap",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "C++",
  "C#",
  "Oracle",
  "Flask",
  "Three.js",
  "Linux",
];

const PROJECTS: Project[] = [
  {
    title: "Islam 360",
    stack: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Axios",
      "ShadCN UI",
      "Context API",
    ],
    description:
      "A full‑featured Islamic utility app with prayer times, offline Dhikr, Tasbih counter, Islamic content, and an integrated AI chatbot trained on Islamic content. Deployed on Vercel.",
    image: "/Islam360.png",
    link: "https://islam-1xr3.vercel.app/",
  },
  {
    title: "Spotify",
    stack: ["React.js", "Vite", "Tailwind CSS", "Bootstrap", "JavaScript", "Spotify API"],
    description:
      "Spotify clone with dynamic playlists, real-time music streaming, and sleek UI powered by the Spotify API for authentic functionality.",
    image: "/Spotify.png",
    link: "https://my-spotify-clone.surge.sh/",
  },
  {
    title: "Train Reservation System",
    stack: [
      "HTML",
      "Bootstrap",
      "Tailwind CSS",
      "JavaScript",
      "DB integration",
    ],
    description:
      "Responsive booking platform with real‑time train data, secure ticket booking, cancellation, reminders, and account management. Optimized for mobile.",
    image: "/Train.png",
    link: "https://train-delta-bice.vercel.app/",
  },
  {
    title: "ChainWallet DApp",
    stack: [
      "HTML",
      "CSS",
      "Tailwind",
      "JavaScript",
      "ethers.js",
      "jSOPD",
      "QRCode.js",
      "OTPAuth",
      "Web3",
    ],
    description:
      "Decentralized crypto wallet with MetaMask integration, ETH contract transfers, transaction history, 2FA security, contacts, and PDF/QR export; multi‑network support.",
    image: "/ChainVallet.png",
    link: "https://syedhasanhussainshah.github.io/bc/",
  },
  {
    title: "Drive Sense AI",
    stack: [
      "HTML",
      "Tailwind CSS",
      "Bootstrap",
      "Python",
      "Flask",
      "AI model training",
    ],
    description:
      "AI-powered driving analysis with 92% hazard detection accuracy, adjustable sensitivity, and PDF/video reports using Flask & ML models.",
    image: "/DriveSense.png",
    link: "https://syedhasanhussainshah.github.io/Ai-project/",
  },
  {
    title: "Transpomate App",
    stack: ["C++", "DSA", "API", "HTML", "CSS", "JavaScript", "Github"],
    description:
      "Bus booking app to check availability, calculate distance, and estimate travel time with efficient algorithms and API integration.",
    image: "/Transpomate.png",
    link: "https://github.com/SyedHasanHussainShah/Transpomate-App-Admin-View-",
  },
  
];

const EDUCATION = [
  {
    school:
      "University of Engineering and Technology Lahore — Gujranwala Campus",
    degree: "BSC Computer Science",
    period: "12/2027 (In progress)",
  },
  {
    school: "Punjab Colleges — Gujranwala",
    degree: "FSC Pre‑Engineering",
    period: "12/2023",
  },
];
const SKILLS = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" />, level: 95 },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" />, level: 90 },
  { name: "JavaScript", icon: <SiTypescript className="text-sky-500" />, level: 75 },
  { name: "Bootstrap", icon: <FaBootstrap className="text-purple-600" />, level: 85 },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" />, level: 90 },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" />, level: 80 },
  { name: "React", icon: <FaReact className="text-sky-400" />, level: 65 },
  { name: "Vite", icon: <SiVite className="text-purple-500" />, level: 80 },
  { name: "Next.js", icon: <SiNextdotjs />, level: 50 },
  { name: "Express.js", icon: <SiExpress />, level: 48 },
  { name: "MongoDB", icon: <SiMongodb className="text-green-700" />, level: 70 },
  { name: "Python", icon: <FaPython className="text-yellow-500" />, level: 75 },
  { name: "C++", icon: <SiCplusplus className="text-sky-500" />, level: 80 },
  { name: "C#", icon: <SiSharp className="text-purple-500" />, level: 78 },
  { name: "Oracle", icon: <SiOracle className="text-red-500" />, level: 70 },
  { name: "Flask", icon: <SiFlask className="text-green-500" />, level: 60 },
  { name: "Three.js", icon: <SiThreedotjs className="text-blue-400 text-2xl"/>, level: 40 },
  { name: "Linux", icon: <SiLinux className="text-yellow-500 text-2xl"/>, level: 70 },
];

function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return [theme, toggle];
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-8 sm:mb-10">
      <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-sky-100 dark:bg-slate-800 text-sky-600 dark:text-indigo-400">
        {icon}
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
          <span className="gradient-text">{title}</span>
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function useReveal() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const variants = useMemo(
    () => ({ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }),
    []
  );
  return { ref, variants, inView };
}

// Tech Galaxy Component
const TechGalaxy = () => {
  return (
    <div className="w-full relative mb-8 overflow-hidden">
      <div className="relative h-80 rounded-[2rem] bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center">
        
        {/* Center element */}
        <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg">
          Tech
        </div>
        
        {/* Orbiting skills - FASTER animation */}
        {SKILLS.map((skill, index) => {
          const angle = (index / SKILLS.length) * Math.PI * 2;
          const radius = 140;
          
          return (
            <motion.div
              key={skill.name}
              className="absolute p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg flex flex-col items-center justify-center cursor-pointer border border-slate-200 dark:border-slate-700 z-20"
              animate={{
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                rotate: 360,
              }}
              transition={{
                x: {
                  duration: 8, // Faster: reduced from 20 to 8 seconds
                  repeat: Infinity,
                  repeatDelay: 20,
                  ease: "linear",
                },
                y: {
                  duration: 8, // Faster: reduced from 20 to 8 seconds
                  repeat: Infinity,
                  repeatDelay: 20,
                  ease: "linear",
                },
                rotate: {
                  duration: 8, // Faster: reduced from 20 to 8 seconds
                  repeat: Infinity,
                  repeatDelay: 20,
                  ease: "linear",
                },
              }}
              whileHover={{
                scale: 1.4,
                z: 30,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                transition: { duration: 0.2 } // Faster hover transition
              }}
            >
              <div className="text-2xl mb-1">{skill.icon}</div>
              <span className="text-xs font-medium text-center">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
        
        {/* Decorative orbital rings - FASTER */}
        <div className="absolute w-64 h-64 rounded-full border border-slate-300 dark:border-slate-600 opacity-30 orbit-animation-fast"></div>
        <div className="absolute w-80 h-80 rounded-full border border-slate-300 dark:border-slate-600 opacity-20 orbit-reverse-fast"></div>
        <div className="absolute w-96 h-96 rounded-full border border-slate-300 dark:border-slate-600 opacity-10 orbit-fast"></div>
      </div>

      {/* Faster animation styles */}
      <style>{`
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .orbit-animation-fast {
          animation: orbit 30s linear infinite;
        }
        
        .orbit-reverse-fast {
          animation: orbit 30s linear infinite reverse;
        }
        
        .orbit-slow-fast {
          animation: orbit 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listeners for hover states
    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        setCursorText("Click me!");
      });
      link.addEventListener("mouseleave", () => {
        setCursorText("");
      });
    });

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-sky-500 rounded-full pointer-events-none z-50 flex items-center justify-center text-white text-xs"
      animate={{ x: position.x - 12, y: position.y - 12 }}
      transition={{ type: "spring", damping: 20 }}
    >
      {cursorText && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-8 bg-slate-900 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
};

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const { ref: heroRef, inView: heroInView } = useReveal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [easterEggActive, setEasterEggActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Handle resize if needed
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Easter egg key listener
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "u") {
        setEasterEggActive(!easterEggActive);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [easterEggActive]);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Swal.fire({
      title: "Sending...",
      text: "Please wait while we send your message.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.currentTarget,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for contacting me. I'll reply soon.",
          showConfirmButton: false,
          timer: 2500,
        });
        e.currentTarget.reset();
      })
      .catch(() => {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for contacting me. I'll reply soon",
        });
      });
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] overflow-x-hidden">
      {/* Easter Egg */}
      {easterEggActive && (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setEasterEggActive(false)}
          >
            ✕
          </button>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">You found the secret!</h2>
            <p className="text-xl">
              I see you're the curious type - perfect for innovative teams!
            </p>
          </div>
        </div>
      )}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 text-slate-900 dark:bg-slate-900/80 dark:text-white backdrop-blur-md shadow-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out">
        <div className="container-responsive flex items-center justify-between py-3">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 text-lg font-extrabold"
          >
            <Code2 className="text-sky-500" />
            <span className="hidden sm:inline">{PROFILE.name}</span>
            <span className="sm:hidden">SHHS</span>
          </a>

          {/* Desktop Links with Icons */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a
              href="#projects"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <FolderGit2 size={16} /> Projects
            </a>
            <a
              href="#education"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <GraduationCap size={16} /> Education
            </a>
            <a
              href="#skills"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <Code size={16} /> Skills
            </a>
            <a
              href="#looking-for"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <Target size={16} /> Goals
            </a>
            <a
              href="#resume"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <Download size={16} /> Resume
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <Mail size={16} /> Contact
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/SyedHasanHussainShah"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline hover:animate-[wiggle_0.5s_ease-in-out]"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.3333333333333333"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-github-icon lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/syed-hassan-hussain-shah-a3351b2b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline hover:animate-[wiggle_0.5s_ease-in-out]"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.3333333333333333"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-linkedin-icon lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-outline relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="absolute"
                  >
                    {/* Sun Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.33"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 3v1" />
                      <path d="M12 20v1" />
                      <path d="M3 12h1" />
                      <path d="M20 12h1" />
                      <path d="m18.364 5.636-.707.707" />
                      <path d="m6.343 17.657-.707.707" />
                      <path d="m5.636 5.636.707.707" />
                      <path d="m17.657 17.657.707.707" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="absolute"
                  >
                    {/* Eclipse Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.33"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a7 7 0 1 0 10 10" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            {window.innerWidth < 768 && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden btn-outline"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-md overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-3 text-sm font-semibold">
              <a
                href="#projects"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:text-sky-500 transition-colors"
              >
                <FolderGit2 size={16} /> Projects
              </a>
              <a
                href="#education"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:text-sky-500 transition-colors"
              >
                <GraduationCap size={16} /> Education
              </a>
              <a
                href="#skills"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:text-sky-500 transition-colors"
              >
                <Code size={16} /> Skills
              </a>
              <a
                href="#looking-for"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:text-sky-500 transition-colors"
              >
                <Target size={16} /> Goals
              </a>
              <a
              href="#resume"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <Download size={16} /> Resume
            </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:text-sky-500 transition-colors"
              >
                <Mail size={16} /> Contact
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      <Marquee />

      {/* Hero */}
      <header id="home" className="container-responsive">
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center py-12 md:py-16"
        >
          {/* LEFT SIDE */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -40 },
              show: { opacity: 1, x: 0 },
            }}
            className="order-2 lg:order-1 space-y-4 md:space-y-6"
          >
            {/* Badge */}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: -20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-sky-100 text-sky-600 dark:bg-slate-800 dark:text-indigo-400 px-3 py-1 text-xs font-bold tracking-widest uppercase"
            >
              {PROFILE.title}
            </motion.span>

            {/* Animated Name */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 70 }}
            >
              <AnimatedName />
            </motion.div>

            {/* Main Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl"
            >
              I don't just write code—I craft{" "}
              <span className="font-semibold text-sky-600 dark:text-sky-400">
                digital experiences
              </span>{" "}
              that users love and businesses value. With expertise across the
              full stack, I bridge the gap between{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {" "}
                elegant design
              </span>{" "}
              and{" "}
              <span className="font-semibold text-green-600 dark:text-green-400">
                {" "}
                robust engineering
              </span>
              .
            </motion.p>

            {/* Skills Rotation */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium"
            >
              I work with{" "}
              <span className="font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
                <Typewriter
                  words={SKILL_ROTATION}
                  loop={0}
                  typeSpeed={70}
                  deleteSpeed={40}
                  delaySpeed={1400}
                />
              </span>
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-3 mt-4 md:mt-6"
            >
              <a
                href="#projects"
                className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out text-sm md:text-base"
              >
                🚀 View Projects
              </a>
              <a
                href="#contact"
                className="px-4 py-2 md:px-6 md:py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105 transform transition duration-300 ease-in-out text-sm md:text-base"
              >
                💼 Hire Me
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - IMAGE */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, rotate: -5 },
              show: { opacity: 1, scale: 1, rotate: 0 },
            }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative mx-auto h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-80 lg:w-80 rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200/70 dark:ring-slate-700">
              <img
                src="/Profile1.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-indigo-500/10 mix-blend-overlay" />
            </div>
          </motion.div>
        </motion.section>
      </header>

      {/* Projects */}
      <main className="space-y-16 md:space-y-24">
  <section id="projects" className="container-responsive">
    <SectionHeader
      icon={<Briefcase />}
      title="Projects"
      subtitle="A selection of recently built apps and experiments"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      {PROJECTS.map((p, idx) => (
        <motion.article
          key={p.title}
          initial={{ opacity: 0, y: 60, scale: 0.9, rotate: -3 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            delay: idx * 0.15,
            type: "spring",
            stiffness: 80,
          }}
          whileHover={{
            scale: 1.03,
            rotate: 1,
            boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
            transition: { duration: 0.4 },
          }}
          onClick={() => setExpandedProject(p)}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
        >
          {/* Project Image */}
          <motion.img
            src={p.image}
            alt={p.title}
            className="h-40 w-full object-cover"
            initial={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />

          {/* Card Content */}
          <div className="p-4 md:p-5 space-y-3 md:space-y-4">
            {/* Title + Icon Row */}
            <motion.div
              className="flex items-center justify-between gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 + 0.2, duration: 0.4 }}
            >
              {/* Project Title */}
              <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                {p.title}
                {/* Transparent Icon Button */}
              <motion.a
                whileHover={{
                  scale: 1.15,
                  rotate: 5,
                  color: "#3b82f6", // blue-500 on hover
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.2 + 0.3 }}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors"
                href={p.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-send"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
              </motion.a>
              </h3>

              
            </motion.div>

            {/* Description */}
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
              {p.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1 md:gap-2">
              {p.stack.map((t, tagIdx) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: tagIdx * 0.05 }}
                  className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-100 via-slate-100 to-purple-100 dark:from-blue-900 dark:via-slate-800 dark:to-purple-900 text-slate-700 dark:text-slate-300 shadow-sm"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  </section>

        {/* Expanded Project View */}
       {expandedProject && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-transparent backdrop-blur-lg z-50 flex items-center justify-center p-4"
    onClick={() => setExpandedProject(null)}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 0 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header with close button */}
      <div className="relative">
        <button
          className="absolute top-5 right-5 z-10 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
          onClick={() => setExpandedProject(null)}
          aria-label="Close modal"
        >
          <X size={22} className="text-slate-700 dark:text-slate-300" />
        </button>
        <img
          src={expandedProject.image}
          alt={expandedProject.title}
          className="w-full h-60 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {expandedProject.title}
          </h2>
          <a
            href={expandedProject.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            View Live Project
          </a>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg leading-relaxed">
          {expandedProject.description}
        </p>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {expandedProject.stack.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-slate-700 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
)}
        {/* Skills */}
        <section id="skills" className="container-responsive">
          <SectionHeader
            icon={<Code2 />}
            title="Skills"
            subtitle="Core technologies I use"
          />

          {/* Tech Galaxy */}
          <TechGalaxy />
        </section>

        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
        `}</style>

        {/* Education */}
        <section id="education" className="container-responsive">
          <SectionHeader
            icon={<GraduationCap />}
            title="Education"
            subtitle="Academic background"
          />
          <ol className="relative border-s-4 border-transparent before:absolute before:top-0 before:bottom-0 before:left-2 before:w-1 before:bg-gradient-to-b before:from-sky-400 before:via-cyan-500 before:to-blue-500 before:rounded-full before:shadow-[0_0_15px_rgba(56,189,248,0.6)]">
            {EDUCATION.map((e, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -80, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                className="ms-8 md:ms-10 mb-8 md:mb-10 relative group"
              >
                {/* Dot Marker */}
                <span className="absolute -left-5 md:-left-6 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-500 text-white shadow-lg ring-4 ring-white dark:ring-slate-900 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                  <BookOpen size={12} className="md:w-4" />
                </span>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 0.5 }}
                  className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  <h4 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white">
                    {e.school}
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium">
                    {e.degree}
                  </p>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 italic">
                    {e.period}
                  </p>
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* I'm Looking For Section */}
        <section
          id="looking-for"
          className="container-responsive py-12 md:py-16"
        >
          <SectionHeader
            icon={<Target />}
            title="I'm Looking For"
            subtitle="The perfect opportunity to grow and innovate"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Rocket className="text-sky-500" /> My Next Mission
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-sky-500">•</span>A forward-thinking
                  team that values creative technical solutions
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-sky-500">•</span>A role where I can
                  leverage my full-stack skills on innovative products
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-sky-500">•</span>A company with a
                  culture of experimentation and growth
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-6 bg-sky-100 dark:bg-sky-900/20 rounded-2xl"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Heart className="text-pink-500" /> Let's Collaborate If
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-pink-500">•</span>
                  You're building something that pushes technological boundaries
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-pink-500">•</span>
                  Your team values both clean code and creative problem-solving
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-pink-500">•</span>
                  You need a developer who can bridge design and technical
                  implementation
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Resume */}
        <section id="resume" className="container-responsive py-10 md:py-1">
          <SectionHeader
            icon={< Download/>}
            title="Download Resume"
            subtitle="Unfold the story of my career journey"
          />
          <div className="rounded-2xl md:rounded-3xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 p-4 md:p-8 shadow-xl md:shadow-2xl flex flex-col md:flex-row items-center justify-between gap-3 md:gap-2 text-white relative overflow-hidden">
            {/* Background Glow Animation */}
            <div className="absolute inset-0">
              <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-40 h-40 md:w-60 md:h-60 bg-sky-400/30 rounded-full blur-2xl md:blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-48 h-48 md:w-72 md:h-72 bg-indigo-500/30 rounded-full blur-2xl md:blur-3xl animate-pulse delay-700"></div>
            </div>

            {/* Text Content */}
            <div className="max-w-lg space-y-2 md:space-y-4 z-10">
              <p className="text-sm md:text-lg opacity-90 leading-relaxed">
                Discover my{" "}
                <span className="font-semibold">
                  skills, experience, and achievements
                </span>{" "}
                all in one place — crafted to give{" "}
                <span className="italic">
                  recruiters, clients, and collaborators
                </span>{" "}
                a clear and lasting impression of my professional journey.
              </p>
            </div>

            {/* Buttons Container */}
            <div className="flex flex-row flex-wrap gap-4 items-center z-10">
              {/* Eye Button (Preview Resume) */}
              <button
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/17uEe9T9TmZqEFvpqv6tYoh2ZwoDC5kBP/view?usp=sharing",
                    "_blank"
                  )
                }
                className="relative w-12 h-12 md:w-14 md:h-14 bg-black/40 rounded-full flex items-center justify-center group/eye hover:bg-black/60 transition-colors duration-300"
              >
                {/* Eye icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-eye"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" className="eye-pupil" />
                </svg>

                {/* Tooltip */}
                <span className="absolute -top-9 bg-slate-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/eye:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Preview Resume
                </span>
              </button>

              {/* Arrow Button (Download Resume) */}
              <a
                href="https://drive.google.com/uc?export=download&id=17uEe9T9TmZqEFvpqv6tYoh2ZwoDC5kBP"
                target="_blank"
                rel="noopener noreferrer"
                className="group/arrow w-12 h-12 md:w-14 md:h-14 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-colors duration-300 active:scale-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-cloud-download"
                >
                  {/* Arrow group (moves down/up on hover) */}
                  <g className="[transform-box:fill-box] [transform-origin:center] group-hover/arrow:animate-[arrowDrop_0.6s_ease-in-out]">
                    <path d="M12 13v8l-4-4" />
                    <path d="m12 21 4-4" />
                  </g>

                  {/* Cloud (subtle bounce on hover) */}
                  <path
                    className="group-hover/arrow:animate-[cloudBounce_0.6s_ease-in-out]"
                    d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container-responsive py-12 md:py-16">
          <SectionHeader
            icon={<Mail />}
            title="Contact"
            subtitle="Let's build something amazing together"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-3 md:space-y-5"
            >
              {/* Email Button */}

              <motion.a
                initial={{ opacity: 0, y: 20 }} // entrance animation
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl 
             border border-sky-500 text-sky-500 font-medium shadow-md
             hover:bg-sky-500 hover:text-white transition-all duration-300 text-sm md:text-base"
                href="mailto:ssyedhassan667@gmail.com"
              >
                {/* Animated Icon */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mails-icon"
                  whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }} // wiggle on hover
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732" />
                  <path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5" />
                  <rect x="7" y="3" width="15" height="12" rx="2" />
                </motion.svg>
                Email Us
              </motion.a>
              {/* Social Buttons */}
              <div className="flex flex-wrap gap-2 md:gap-4">
                <a
                  href="https://github.com/SyedHasanHussainShah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline hover:animate-[wiggle_0.5s_ease-in-out]"
                  aria-label="GitHub"
                >
                  {" "}
                  Github
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.3333333333333333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-github-icon lucide-github"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/syed-hassan-hussain-shah-a3351b2b5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline hover:animate-[wiggle_0.5s_ease-in-out]"
                  aria-label="LinkedIn"
                >
                  {" "}
                  Linkedin
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.3333333333333333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-linkedin-icon lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>

              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                Got a project idea or collaboration in mind? Fill out the form
                and I'll get back to you within 24 hours.
              </p>
            </motion.div>

            {/* RIGHT SIDE - CONTACT FORM */}
            <motion.form
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3 md:space-y-4"
              onSubmit={sendEmail}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="px-3 py-2 md:px-4 md:py-3 rounded-lg border border-slate-300 dark:border-slate-700
                     bg-white dark:bg-slate-900 text-slate-900 dark:text-white
                     placeholder-slate-400 dark:placeholder-slate-500
                     focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm md:text-base"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="px-3 py-2 md:px-4 md:py-3 rounded-lg border border-slate-300 dark:border-slate-700
                     bg-white dark:bg-slate-900 text-slate-900 dark:text-white
                     placeholder-slate-400 dark:placeholder-slate-500
                     focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm md:text-base"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-slate-300 dark:border-slate-700
                   bg-white dark:bg-slate-900 text-slate-900 dark:text-white
                   placeholder-slate-400 dark:placeholder-slate-500
                   focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm md:text-base"
              />

              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                required
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-slate-300 dark:border-slate-700
                   bg-white dark:bg-slate-900 text-slate-900 dark:text-white
                   placeholder-slate-400 dark:placeholder-slate-500
                   focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm md:text-base"
              ></textarea>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-5 py-2 md:px-6 md:py-3 rounded-lg bg-sky-500 text-white font-semibold
                   hover:bg-sky-600 shadow-md hover:shadow-lg
                   transition-all duration-300 text-sm md:text-base"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 md:mt-24 relative overflow-hidden border-t border-slate-200 dark:border-slate-800">
        {/* Background Glow Animation */}
        <div className="absolute inset-0">
          <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-40 h-40 md:w-60 md:h-60 bg-sky-400/20 rounded-full blur-2xl md:blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-48 h-48 md:w-72 md:h-72 bg-indigo-500/20 rounded-full blur-2xl md:blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Footer Content */}
        <div className="relative container-responsive py-4 md:py-6 flex flex-col items-center gap-2 md:gap-3 text-center z-10">
          {/* Gradient Line */}
          <div className="w-16 md:w-24 h-0.5 md:h-1 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 animate-gradient-x"></div>

          {/* Name */}
          <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
            © {new Date().getFullYear()} Syed Hassan Hussain Shah
          </p>
        </div>
      </footer>
      <ScrollProgressCircle />
    </div>
  );
}
