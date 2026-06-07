import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Download,
  ExternalLink,
  ChevronRight,
  Code2,
  Moon,
  Sun,
  Menu,
  X,
  ArrowUp,
  Award,
  Briefcase,
  GraduationCap,
  Layers
} from "lucide-react";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiHtml5,
  SiCss,
  SiCplusplus,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiGithub,
  SiSocketdotio,
  SiVscodium
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { useTheme } from "../App";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" }
  })
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <h2
      className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      data-testid={`section-title-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {title}
    </h2>
    {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
  </div>
);

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Back to top"
          data-testid="button-back-to-top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const stats = [
  { label: "CGPA", value: "8.11", icon: GraduationCap },
  { label: "Projects", value: "4+", icon: Layers },
  { label: "Internship", value: "1", icon: Briefcase },
  { label: "Certs", value: "7", icon: Award }
];

const skillGroups = [
  {
    category: "Languages",
    skills: [
      { name: "Java", icon: FaJava, color: "#f89820" },
      { name: "Python", icon: SiPython, color: "#3572A5" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" }
    ]
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#1572B6" }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#999999" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "#010101" }
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" }
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#333333" },
      { name: "VS Code", icon: SiVscodium, color: "#007ACC" }
    ]
  },
  {
    category: "Core CS",
    skills: [
      { name: "DSA", icon: Code2, color: "#7c3aed" },
      { name: "DBMS", icon: Code2, color: "#7c3aed" },
      { name: "OS", icon: Code2, color: "#7c3aed" },
      { name: "CN", icon: Code2, color: "#7c3aed" }
    ]
  }
];

const projects = [
  {
    title: "Collaborative Code Editor",
    description:
      "Real-time multi-user code editor with live sync using Socket.IO. Handles user sessions and seamless collaboration across multiple clients simultaneously.",
    stack: ["Node.js", "Express", "Socket.IO", "JavaScript"],
    gradient: "from-violet-500 to-indigo-500"
  },
  {
    title: "Resume Analyzer",
    description:
      "Analyzes resumes for keyword gaps and formatting improvements. Provides actionable, structured feedback to help candidates stand out.",
    stack: ["HTML", "CSS", "JavaScript"],
    gradient: "from-rose-500 to-pink-500"
  },
  {
    title: "Job Tracker",
    description:
      "Full application lifecycle tracker with reminders, status updates, and a clean dashboard for managing your job search pipeline.",
    stack: ["JavaScript", "REST API", "LocalStorage"],
    gradient: "from-amber-500 to-orange-500"
  },
  {
    title: "AI Caption Generator",
    description:
      "AI-powered tool that generates engaging, context-aware captions for social media content using language model APIs.",
    stack: ["Python", "APIs"],
    gradient: "from-teal-500 to-cyan-500"
  }
];

const experiences = [
  {
    company: "SRDT Pvt Ltd",
    role: "Full Stack Development Intern",
    type: "Internship",
    details: [
      "Built full-stack applications with frontend-backend integration.",
      "Gained hands-on experience in REST APIs, databases, and deployment workflows."
    ]
  },
  {
    company: "L&T EduTech (LearnKonnect)",
    role: "Trainee",
    type: "Training",
    details: [
      "Mobile Application Developer — 34-hour pathway across 6 specialized courses.",
      "SQL for Data Analytics — 25-hour pathway across 7 specialized courses."
    ]
  }
];

const certifications = [
  { name: "Solutions Architecture", issuer: "Forage", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  { name: "GenAI Study Jam", issuer: "GDG", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
  { name: "Full Stack Internship", issuer: "Python", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
  { name: "RAG Workshop", issuer: "GDG", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
  { name: "Yuva AI", issuer: "TCS iON", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
  { name: "Data Analytics", issuer: "Simplilearn", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
  { name: "Software Eng. Simulation", issuer: "JPMorgan", color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" }
];

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" }
];

export default function Home() {
  const { theme, toggle } = useTheme();
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tagline = useTypewriter(
    ["Full-Stack Developer.", "Problem Solver.", "DSA Enthusiast.", "Open to Opportunities."],
    75,
    2000
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4, rootMargin: "-80px 0px 0px 0px" }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgressBar />
      <BackToTop />

      {/* Navigation */}
      <nav className="fixed top-[3px] w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            className="font-mono font-bold text-xl tracking-tighter text-primary"
            data-testid="nav-logo"
          >
            IS<span className="text-foreground">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === link.name.toLowerCase()
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
              data-testid="nav-link-contact"
            >
              Contact
            </a>
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/40 bg-background"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-primary"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">

        {/* Hero */}
        <section id="hero" className="min-h-[92vh] flex flex-col justify-center py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-primary text-sm font-mono mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Available for opportunities
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
                data-testid="hero-name"
              >
                Ishitaa<br />Saxena
              </motion.h1>

              <motion.div variants={fadeUp} className="text-xl md:text-2xl text-primary font-mono mb-6 h-8" data-testid="hero-tagline">
                {tagline}
                <span className="animate-pulse">|</span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-base text-muted-foreground max-w-xl mb-8 leading-relaxed">
                Building robust applications with code and curiosity. Bridging the gap between complex problems and elegant solutions.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#projects"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                  data-testid="button-view-projects"
                >
                  View Projects <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/ishitaasaxena"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-all flex items-center gap-2 border border-border"
                  data-testid="button-download-resume"
                >
                  <Download className="w-4 h-4" /> Resume
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-5 text-muted-foreground">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:saxena.ishitaa@gmail.com" className="hover:text-foreground transition-colors" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
                <div className="flex items-center gap-1.5 text-sm font-mono border-l border-border pl-5">
                  <MapPin className="w-4 h-4" /> Lucknow, India
                </div>
              </motion.div>
            </motion.div>

            {/* Hero right — stats + code card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:flex flex-col gap-6"
            >
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="p-5 rounded-2xl bg-card border border-card-border flex flex-col gap-2 shadow-sm"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <div className="text-3xl font-bold font-mono">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Code snippet card */}
              <div className="rounded-2xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 overflow-hidden shadow-xl font-mono text-sm">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-zinc-500 text-xs">ishitaa.ts</span>
                </div>
                <div className="p-5 space-y-1 text-xs leading-6">
                  <div><span className="text-blue-400">const</span> <span className="text-green-400">developer</span> <span className="text-zinc-400">=</span> <span className="text-yellow-400">&#123;</span></div>
                  <div className="pl-4"><span className="text-rose-400">name</span><span className="text-zinc-400">:</span> <span className="text-amber-300">"Ishitaa Saxena"</span><span className="text-zinc-400">,</span></div>
                  <div className="pl-4"><span className="text-rose-400">role</span><span className="text-zinc-400">:</span> <span className="text-amber-300">"Software Engineer"</span><span className="text-zinc-400">,</span></div>
                  <div className="pl-4"><span className="text-rose-400">stack</span><span className="text-zinc-400">:</span> <span className="text-blue-400">["React", "Node", "Java"]</span><span className="text-zinc-400">,</span></div>
                  <div className="pl-4"><span className="text-rose-400">learning</span><span className="text-zinc-400">:</span> <span className="text-amber-300">"DSA + System Design"</span><span className="text-zinc-400">,</span></div>
                  <div className="pl-4"><span className="text-rose-400">available</span><span className="text-zinc-400">:</span> <span className="text-green-400">true</span></div>
                  <div><span className="text-yellow-400">&#125;</span><span className="text-zinc-400">;</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 border-t border-border/40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <SectionHeader title="About Me" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <p className="text-lg leading-relaxed text-muted-foreground" data-testid="about-text">
                  I'm a BTech Computer Science final-year student at{" "}
                  <span className="text-foreground font-medium">Shri Ramswaroop Memorial College of Engineering and Management</span>, Lucknow — graduating with a CGPA of <span className="text-primary font-mono font-bold">8.11</span>.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                  I'm passionate about full-stack development and love turning ideas into working products. Currently deepening my knowledge of <span className="text-foreground font-medium">Java, Data Structures & Algorithms</span>, and system design to build software that scales.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Location", value: "Lucknow, India" },
                  { label: "Email", value: "saxena.ishitaa@gmail.com" },
                  { label: "Focus", value: "Full-Stack + DSA" },
                  { label: "Status", value: "Open to Work" }
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-xl bg-card border border-card-border">
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 border-t border-border/40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <SectionHeader title="Technical Skills" subtitle="Technologies I work with" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillGroups.map((group, gIdx) => (
                <motion.div
                  key={group.category}
                  custom={gIdx}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-card border border-card-border shadow-sm hover:border-primary/40 transition-colors group"
                >
                  <h3 className="text-sm font-mono font-semibold text-primary uppercase tracking-wider mb-4">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(skill => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                          data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: skill.color }} />
                          {skill.name}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 border-t border-border/40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <SectionHeader title="Featured Projects" subtitle="Things I've built" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  custom={idx}
                  variants={fadeUp}
                  className="group flex flex-col rounded-2xl bg-card border border-card-border overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all shadow-sm"
                  data-testid={`card-project-${idx}`}
                >
                  <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-mono text-muted-foreground">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href="https://github.com"
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                          aria-label="View on GitHub"
                        >
                          <SiGithub className="w-4 h-4" />
                        </a>
                        <a
                          href="#"
                          className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                          aria-label="Live demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-5">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.map(tech => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2.5 py-1 bg-primary/10 text-primary rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20 border-t border-border/40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <SectionHeader title="Experience & Training" subtitle="Where I've worked and learned" />
            <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
              {experiences.map((exp, idx) => (
                <motion.div key={exp.company} custom={idx} variants={fadeUp} className="relative">
                  <div className="absolute -left-8 top-5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="bg-card border border-card-border rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-colors" data-testid={`card-experience-${idx}`}>
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                      <h3 className="text-lg font-bold">{exp.role}</h3>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-primary font-semibold text-sm mb-4">{exp.company}</p>
                    <ul className="space-y-2.5">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex gap-3 text-sm text-muted-foreground">
                          <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Education + Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-20 border-t border-border/40">
          <section id="education">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <SectionHeader title="Education" />
              <div
                className="relative p-7 rounded-2xl bg-primary text-primary-foreground overflow-hidden shadow-lg shadow-primary/20"
                data-testid="card-education"
              >
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)"
                }} />
                <div className="relative">
                  <div className="text-xs font-mono uppercase tracking-widest text-primary-foreground/70 mb-3">
                    2021 — 2025
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    B.Tech in Computer Science Engineering
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-6 leading-relaxed">
                    Shri Ramswaroop Memorial College of Engineering and Management, Lucknow
                  </p>
                  <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl">
                    <GraduationCap className="w-5 h-5" />
                    <div>
                      <div className="text-xs text-primary-foreground/70">CGPA</div>
                      <div className="font-bold text-2xl font-mono leading-none">8.11</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="certifications">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              <SectionHeader title="Certifications" />
              <div className="flex flex-col gap-3">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={cert.name}
                    custom={idx}
                    variants={fadeUp}
                    className="flex items-center justify-between p-4 bg-card border border-card-border rounded-xl hover:border-primary/40 transition-colors"
                    data-testid={`card-cert-${idx}`}
                  >
                    <div className="flex items-center gap-3">
                      <Award className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium">{cert.name}</span>
                    </div>
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${cert.color}`}>
                      {cert.issuer}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </div>

        {/* Contact */}
        <section id="contact" className="py-20 border-t border-border/40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-primary text-sm font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open to opportunities
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Currently looking for new opportunities as I wrap up my BTech. Whether you have a role in mind, a project to collaborate on, or just want to say hi — my inbox is open.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a
                href="mailto:saxena.ishitaa@gmail.com"
                className="flex items-center gap-2.5 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4" />
                <span className="font-medium">Email Me</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-accent transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-4 h-4 text-primary" />
                <span className="font-medium">LinkedIn</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-accent transition-colors"
                data-testid="link-github"
              >
                <Github className="w-4 h-4" />
                <span className="font-medium">GitHub</span>
              </a>
              <a
                href="tel:+918005330876"
                className="flex items-center gap-2.5 px-6 py-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-accent transition-colors"
                data-testid="link-phone"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-medium">8005330876</span>
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-8 text-center border-t border-border/40">
        <p className="text-sm text-muted-foreground font-mono">
          Built with React &amp; Vite &nbsp;·&nbsp; Designed by Ishitaa Saxena
        </p>
      </footer>
    </div>
  );
}
