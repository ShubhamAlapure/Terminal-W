import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const DARK_COLORS = {
  bg: "#07080B",
  panel: "#0E1016",
  panel2: "#0B0D12",
  text: "#F3F5F8",
  muted: "#8890A0",
  mutedDim: "#5B6272",
  border: "#1B1F29",
  borderStrong: "#262B37",
  blue: "#2A6AF0",
  blueDim: "#17356F",
  cyan: "#00D4C8",
  green: "#10B981",
  purple: "#8B5CF6",
};

const LIGHT_COLORS = {
  bg: "#F8FAFC",
  panel: "#FFFFFF",
  panel2: "#F1F5F9",
  text: "#0F172A",
  muted: "#475569",
  mutedDim: "#64748B",
  border: "#E2E8F0",
  borderStrong: "#CBD5E1",
  blue: "#2A6AF0",
  blueDim: "#DBEAFE",
  cyan: "#008B82",
  green: "#059669",
  purple: "#7C3AED",
};

const NAV_LINKS = ["Products", "Solutions", "Services", "Technologies", "About", "Insights", "Contact"];

const PRODUCTS = [
  {
    idx: "P.01",
    id: "peerup",
    name: "PeerUP",
    category: "Peer Learning & Social EdTech",
    desc: "A collaborative peer-to-peer learning and networking platform empowering students and developers to exchange skills, host live study rooms, and build together.",
    caps: ["Skill-based matching", "Live study rooms", "Peer mentorship", "GitHub integration", "Gamified reputation"],
    status: "Flagship Product",
    metrics: "10,000+ Active Peer Connections",
    details: "PeerUP transforms how developers and students learn together. By providing real-time collaborative study spaces, skill matching, and open project pairing, PeerUP enables peer mentorship at scale.",
    githubUrl: "https://github.com/ShubhamAlapure/PeerUP",
    featured: true,
  },
  {
    idx: "P.02",
    id: "teacher-management",
    name: "Teacher Management System",
    category: "Higher Ed / Faculty Operations",
    desc: "A comprehensive university faculty lifecycle operating platform for managing teacher profiles, automated workload distribution, research publications, and appraisals.",
    caps: ["Faculty onboarding", "Workload allocation", "Research & patent log", "Performance appraisal", "Multi-department access"],
    status: "Live Production Platform",
    metrics: "100% Automated Academic Workflows",
    details: "Built for higher education institutions like MIT-ADT University, the Teacher Lifecycle Management System unifies faculty records, automated subject & credit hour allocations, research paper tracking, and promotion workflows.",
    githubUrl: "https://github.com/ShubhamAlapure/teacher_management_system",
    demoUrl: "https://teacher-management-system-chi.vercel.app/",
    featured: true,
  },
  {
    idx: "P.03",
    id: "ledgerline",
    name: "Ledgerline",
    category: "Business / Analytics",
    desc: "A reporting and decision-support platform that turns fragmented spreadsheets into a single live operating view.",
    caps: ["Live dashboards", "Role-based access", "Export pipelines", "Real-time sync"],
    status: "In development",
    metrics: "100% Real-time Data Accuracy",
    details: "Ledgerline aggregates multi-departmental financial and operational datasets into unified SQL-backed analytical workspaces.",
  },
  {
    idx: "P.04",
    id: "coursefield",
    name: "Coursefield",
    category: "Education",
    desc: "A digital campus platform unifying attendance, coursework, and communication for schools and colleges.",
    caps: ["Academic workflows", "Parent & student portals", "Offline-friendly", "LMS Integration"],
    status: "Pilot Phase",
    metrics: "18+ Institutions Engaged",
    details: "Coursefield offers zero-latency offline synchronization for hybrid learning environments and streamlined institutional admin tools.",
  },
];

const SOLUTIONS = [
  { name: "Education technology", desc: "Digital platforms for schools, colleges, universities, students, and educators.", icon: "🎓" },
  { name: "Business software", desc: "Custom software platforms that improve day-to-day business operations.", icon: "⚡" },
  { name: "AI and intelligent systems", desc: "AI-powered applications, automation, analytics, and intelligent workflows.", icon: "🧠" },
  { name: "Data and analytics", desc: "Dashboards, reporting systems, data pipelines, and decision-support platforms.", icon: "📊" },
  { name: "Enterprise platforms", desc: "Secure and scalable systems designed for organizational requirements.", icon: "🛡️" },
  { name: "Digital transformation", desc: "Modernizing existing processes and legacy systems through technology.", icon: "🔄" },
];

const SERVICES = [
  { name: "Custom software development", desc: "End-to-end development of web, mobile, and enterprise software." },
  { name: "Web application development", desc: "Modern, scalable, high-performance web applications." },
  { name: "Mobile app development", desc: "Cross-platform and native mobile experiences." },
  { name: "AI and machine learning", desc: "AI-powered products, intelligent automation, and predictive systems." },
  { name: "UI/UX and product design", desc: "Research-driven, user-centered product experiences." },
  { name: "Cloud and backend engineering", desc: "Scalable APIs, backend systems, databases, and infrastructure." },
];

const PROCESS = [
  { n: "01", name: "Discover", desc: "Understand the problem, users, business objectives, and requirements." },
  { n: "02", name: "Define", desc: "Convert requirements into a clear product and technical strategy." },
  { n: "03", name: "Design", desc: "Shape the product architecture, UX, UI, and system design." },
  { n: "04", name: "Build", desc: "Engineer the software using modern technologies and practices." },
  { n: "05", name: "Test", desc: "Validate performance, reliability, security, and usability." },
  { n: "06", name: "Launch", desc: "Deploy, monitor, improve, and scale." },
];

const TECH = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Vite"] },
  { group: "Backend", items: ["Node.js", "Python", "Go", "REST APIs", "GraphQL", "gRPC"] },
  { group: "AI / ML", items: ["PyTorch", "OpenAI APIs", "LangChain", "Vector DBs", "Computer Vision"] },
  { group: "Data", items: ["PostgreSQL", "Supabase", "Redis", "MongoDB", "ClickHouse"] },
  { group: "Infrastructure", items: ["AWS", "Docker", "Kubernetes", "Vercel", "Git", "CI/CD"] },
];

const WHY = [
  { name: "Product thinking", desc: "We think beyond features and focus on real user and business outcomes." },
  { name: "Engineering excellence", desc: "We build scalable, maintainable, and reliable systems." },
  { name: "AI-ready", desc: "We integrate intelligent technologies where they create genuine value." },
  { name: "User first", desc: "Every product is designed around the people who use it." },
  { name: "Scalable architecture", desc: "Solutions are designed to grow with your organization." },
  { name: "Long-term partnership", desc: "We don't disappear after deployment. We keep improving what we build." },
];

const METRICS = [
  { label: "Active PeerUP Users & Connections", value: 10, prefix: "", suffix: "k+" },
  { label: "Faculty Records & Operations Managed", value: 100, prefix: "", suffix: "%" },
  { label: "Technologies in active use", value: 24, prefix: "", suffix: "+" },
  { label: "Engineers and designers", value: 45, prefix: "", suffix: "+" },
];

const INDUSTRIES = ["Education", "Startups", "Healthcare", "Finance", "Retail", "Manufacturing", "Professional services", "Government / institutions", "Enterprise"];

function useHeroScene(mountRef, isDarkMode) {
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Core: layered icosahedral wireframes
    const coreColors = isDarkMode ? [0x2a6af0, 0x00d4c8, 0x3f4a63] : [0x2a6af0, 0x008b82, 0x94a3b8];
    const cores = [];
    [1.55, 1.95, 2.35].forEach((r, i) => {
      const geo = new THREE.IcosahedronGeometry(r, 1);
      const edges = new THREE.EdgesGeometry(geo);
      const mat = new THREE.LineBasicMaterial({
        color: coreColors[i % coreColors.length],
        transparent: true,
        opacity: i === 0 ? 0.85 : 0.28,
      });
      const mesh = new THREE.LineSegments(edges, mat);
      group.add(mesh);
      cores.push(mesh);
    });

    // Node points at icosahedron vertices
    const nodeGeo = new THREE.IcosahedronGeometry(1.55, 1);
    const pointsMat = new THREE.PointsMaterial({ color: isDarkMode ? 0x00d4c8 : 0x008b82, size: 0.045, transparent: true, opacity: 0.9 });
    const points = new THREE.Points(nodeGeo, pointsMat);
    group.add(points);

    // Outer sparse particle field
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.4 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: isDarkMode ? 0x3f4a63 : 0x64748b, size: 0.03, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    function onMouseMove(e) {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = mouseX * 0.35;
      targetRotX = mouseY * 0.25;
    }
    window.addEventListener("mousemove", onMouseMove);

    let raf;
    const clock = new THREE.Clock();
    function animate() {
      const t = clock.getElapsedTime();
      group.rotation.y += (targetRotY - group.rotation.y) * 0.04 + 0.0022;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.04;
      if (cores[1]) cores[1].rotation.y = -t * 0.12;
      if (cores[2]) cores[2].rotation.x = t * 0.09;
      particles.rotation.y = t * 0.015;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }
    animate();

    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mountRef, isDarkMode]);
}

function Eyebrow({ children, COLORS }) {
  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: "0.02em", color: COLORS.mutedDim, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 14, height: 1, background: COLORS.borderStrong, display: "inline-block" }} />
      {children}
    </div>
  );
}

// Creative Minimalistic Terminal W Technologies Logo Component
function TerminalWLogo({ showSubtitle = true, size = 32, COLORS }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: `linear-gradient(135deg, ${COLORS.panel} 0%, ${COLORS.panel2} 100%)`,
        border: `1px solid ${COLORS.cyan}66`,
        boxShadow: `0 0 14px ${COLORS.cyan}33`,
        display: "flex",
        alignItems: "center",
        justify: "center",
        position: "relative",
        flexShrink: 0,
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6L8.5 10.5L4 15" stroke={COLORS.cyan} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 7L13 16L15.5 11L18 16L21 7" stroke={COLORS.blue} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="10" cy="16" r="1.2" fill={COLORS.cyan}/>
        </svg>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span className="h-display" style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", color: COLORS.text, lineHeight: 1.15 }}>
          TERMINAL W
        </span>
        {showSubtitle && (
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, color: COLORS.cyan, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginTop: 1 }}>
            TECHNOLOGIES
          </span>
        )}
      </div>
    </div>
  );
}

// Interactive Teacher Management System Faculty Operations Simulator Widget
function TeacherManagementDemoWidget({ COLORS }) {
  const [logs, setLogs] = useState([
    { id: 1, type: "FACULTY_VERIFIED", text: "Prof. S. Alapure registered to Department of Computer Science", time: "10:14:01" },
    { id: 2, type: "WORKLOAD_ALIGNED", text: "Allocated CS-401 (DBMS) & CS-401L Lab — 16 Credit Hours/wk", time: "10:14:02" },
    { id: 3, type: "RESEARCH_LOGGED", text: "IEEE Paper & Indian Patent #2026-CS-991 added to annual appraisal", time: "10:14:03" },
  ]);
  const [simulating, setSimulating] = useState(false);

  function runSimulation(preset) {
    if (simulating) return;
    setSimulating(true);
    const timeStr = new Date().toLocaleTimeString();
    
    let newLogs = [];
    if (preset === "onboarding") {
      newLogs = [
        { id: Date.now(), type: "FACULTY_VERIFIED", text: "New Faculty Profile: Dr. R. Kulkarni onboarded to IT Department", time: timeStr },
        { id: Date.now() + 1, type: "CREDENTIALS_SYNC", text: "PhD & Master credentials verified against University HR database", time: timeStr },
        { id: Date.now() + 2, type: "ROLES_ASSIGNED", text: "Granted Associate Professor & Senior Research Advisor access", time: timeStr },
      ];
    } else if (preset === "workload") {
      newLogs = [
        { id: Date.now(), type: "SUBJECT_ASSIGNED", text: "Assigned CS-502 (Distributed Systems & Cloud Computing - 4 Credits)", time: timeStr },
        { id: Date.now() + 1, type: "LAB_ALLOCATION", text: "Allocated CS-502L Practical Sessions (Batch A1 & A2 - 4 Hours/wk)", time: timeStr },
        { id: Date.now() + 2, type: "COMPLIANCE_PASS", text: "Total Faculty Workload: 16 Hours/wk — 100% AICTE/UGC Compliant", time: timeStr },
      ];
    } else {
      newLogs = [
        { id: Date.now(), type: "PAPER_LOGGED", text: "IEEE Transactions Paper #9941 verified by University R&D Cell", time: timeStr },
        { id: Date.now() + 1, type: "PATENT_RECORDED", text: "AI Academic Scheduling Patent application filed & indexed", time: timeStr },
        { id: Date.now() + 2, type: "APPRAISAL_EVAL", text: "Annual Performance Appraisal Index score updated to Tier 1 (96/100)", time: timeStr },
      ];
    }

    setLogs((prev) => [...newLogs, ...prev].slice(0, 6));
    setTimeout(() => setSimulating(false), 600);
  }

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", background: COLORS.panel, border: `1px solid ${COLORS.borderStrong}` }}>
      {/* Header Bar */}
      <div style={{
        background: COLORS.panel2,
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "12px 18px",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
          </div>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: COLORS.cyan, fontWeight: 500 }}>
            tlms.faculty-portal v3.2 (MIT-ADT University Pune)
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: COLORS.green, background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: 12, border: "1px solid rgba(16, 185, 129, 0.3)" }}>
            ● LIVE PLATFORM
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{ padding: "14px 18px", background: COLORS.panel, borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: COLORS.mutedDim, fontFamily: "'IBM Plex Mono', monospace" }}>Test Workflow:</span>
        <button onClick={() => runSimulation("onboarding")} className="ghost-btn" style={{ padding: "6px 12px", fontSize: 12, borderRadius: 4, color: COLORS.text, borderColor: COLORS.borderStrong }}>
          👨‍🏫 Faculty Onboarding
        </button>
        <button onClick={() => runSimulation("workload")} className="ghost-btn" style={{ padding: "6px 12px", fontSize: 12, borderRadius: 4, color: COLORS.text, borderColor: COLORS.borderStrong }}>
          📚 Workload Allocation
        </button>
        <button onClick={() => runSimulation("appraisal")} className="ghost-btn" style={{ padding: "6px 12px", fontSize: 12, borderRadius: 4, color: COLORS.text, borderColor: COLORS.borderStrong }}>
          📊 Appraisal & Research Log
        </button>
      </div>

      {/* Live Stream View */}
      <div style={{ padding: 18, background: COLORS.panel2, minHeight: 210 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: COLORS.mutedDim, textTransform: "uppercase" }}>
            Faculty Operating System & Academic Operations Log
          </span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: COLORS.cyan }}>
            {simulating ? "Updating academic ledger..." : "System active & synced"}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {logs.map((log) => (
            <div key={log.id} style={{
              background: COLORS.bg,
              border: `1px solid ${log.type.includes('VERIFIED') || log.type.includes('PASS') ? 'rgba(16, 185, 129, 0.4)' : log.type.includes('RESEARCH') || log.type.includes('PAPER') ? COLORS.blueDim : COLORS.border}`,
              borderRadius: 6,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justify: "space-between",
              gap: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "3px 6px",
                  borderRadius: 3,
                  background: log.type.includes('PASS') || log.type.includes('VERIFIED') ? "rgba(16, 185, 129, 0.2)" : "rgba(42, 106, 240, 0.2)",
                  color: log.type.includes('PASS') || log.type.includes('VERIFIED') ? COLORS.green : COLORS.cyan,
                }}>
                  {log.type}
                </span>
                <span style={{ fontSize: 13, color: COLORS.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {log.text}
                </span>
              </div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: COLORS.mutedDim, flexShrink: 0 }}>
                {log.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TerminalW() {
  const [theme, setTheme] = useState("dark");
  const isDarkMode = theme === "dark";
  const COLORS = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const heroRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTechGroup, setSelectedTechGroup] = useState("All");
  
  const [form, setForm] = useState({ name: "", org: "", email: "", type: "", message: "" });
  const [formState, setFormState] = useState("idle");
  const [formErrors, setFormErrors] = useState({});

  useHeroScene(heroRef, isDarkMode);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Enter your name.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!form.message.trim()) errs.message = "Tell us a bit about your project.";
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;
    
    setFormState("submitting");
    setTimeout(() => {
      setFormState("sent");
    }, 800);
  }

  const filteredTech = selectedTechGroup === "All" 
    ? TECH 
    : TECH.filter(t => t.group.toLowerCase() === selectedTechGroup.toLowerCase());

  return (
    <div style={{ 
      background: COLORS.bg, 
      color: COLORS.text, 
      fontFamily: "'Inter', system-ui, sans-serif", 
      minHeight: "100vh", 
      overflowX: "hidden",
      transition: "background-color 0.3s ease, color 0.3s ease" 
    }}>
      
      {/* NAV BAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled 
          ? (isDarkMode ? "rgba(7,8,11,0.85)" : "rgba(248,250,252,0.88)") 
          : (isDarkMode ? "rgba(7,8,11,0.4)" : "rgba(248,250,252,0.6)"),
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "1px solid transparent",
        transition: "all .25s ease",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", color: COLORS.text }}>
            <TerminalWLogo showSubtitle={true} size={34} COLORS={COLORS} />
          </a>

          {/* Desktop Nav Links & Theme Toggle */}
          <div style={{ display: "flex", gap: 24, alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map((l) => (
              <a key={l} className="navlink" href={`#${l.toLowerCase()}`} style={{ color: COLORS.muted }}>{l}</a>
            ))}

            {/* Theme Toggle Button directly after Contact link */}
            <button
              onClick={toggleTheme}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
              style={{
                background: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                border: `1px solid ${COLORS.borderStrong}`,
                color: COLORS.text,
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: 12.5,
                fontWeight: 500,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'IBM Plex Mono', monospace",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = COLORS.cyan}
              onMouseOut={(e) => e.currentTarget.style.borderColor = COLORS.borderStrong}
            >
              <span>{isDarkMode ? "☀️" : "🌙"}</span>
              <span>{isDarkMode ? "Light" : "Dark"}</span>
            </button>
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href="#contact" className="cta-btn" style={{ textDecoration: "none" }}>
              Let's build <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>→</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.borderStrong}`,
                color: COLORS.text,
                padding: "8px 12px",
                borderRadius: 4,
                cursor: "pointer",
                display: "none",
              }}
              aria-label="Toggle menu"
              className="mobile-menu-btn"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div style={{
            background: COLORS.panel,
            borderBottom: `1px solid ${COLORS.border}`,
            padding: "20px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>
            {NAV_LINKS.map((l) => (
              <a 
                key={l} 
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{ color: COLORS.text, textDecoration: "none", fontSize: 16, fontWeight: 500 }}
              >
                {l}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              style={{
                background: COLORS.panel2,
                border: `1px solid ${COLORS.borderStrong}`,
                color: COLORS.text,
                padding: "10px 16px",
                borderRadius: 6,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'IBM Plex Mono', monospace",
                marginTop: 8
              }}
            >
              <span>{isDarkMode ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}</span>
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header style={{ position: "relative", minHeight: "88vh", display: "flex", alignItems: "center", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${COLORS.border} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, black, transparent)",
          opacity: isDarkMode ? 0.4 : 0.6,
          pointerEvents: "none"
        }} />
        <div className="container hero-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 32, alignItems: "center", paddingTop: 40, paddingBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: COLORS.cyan, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.cyan, display: "inline-block", boxShadow: `0 0 8px ${COLORS.cyan}` }} />
              SYS.STATUS — CREATORS OF PEERUP & TEACHER MANAGEMENT SYSTEM
            </div>
            <h1 className="h-display" style={{ fontSize: "clamp(42px, 5vw, 64px)", lineHeight: 1.04, fontWeight: 700, margin: "0 0 26px", color: COLORS.text }}>
              Engineering<br />
              <span className={isDarkMode ? "gradient-text-dark" : "gradient-text-light"}>
                what's next.
              </span>
            </h1>
            <p style={{ fontSize: 18, color: COLORS.muted, lineHeight: 1.6, maxWidth: 480, margin: "0 0 36px" }}>
              Terminal W Technologies builds high-performance software platforms like <strong>PeerUP</strong> and the <strong>Teacher Lifecycle Management System</strong> that help organizations solve complex problems, operate smarter, and scale faster.
            </p>
            <div style={{ display: "flex", gap: 14, marginBottom: 44, flexWrap: "wrap" }}>
              <a href="#products" className="cta-btn" style={{ textDecoration: "none" }}>Explore Live Products</a>
              <a href="#contact" className="ghost-btn" style={{ textDecoration: "none", color: COLORS.text, borderColor: COLORS.borderStrong }}>Start a project</a>
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: COLORS.mutedDim, letterSpacing: "0.02em" }}>
              Software / AI / Product engineering / Digital transformation
            </div>
          </div>

          {/* Three.js Canvas Container */}
          <div ref={heroRef} style={{ width: "100%", height: 460, cursor: "grab" }} />
        </div>
      </header>

      {/* CAPABILITY MARQUEE */}
      <div style={{ borderBottom: `1px solid ${COLORS.border}`, padding: "22px 0", background: COLORS.panel2, overflow: "hidden" }}>
        <div className="marquee-track" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: COLORS.mutedDim }}>
          {[...Array(2)].map((_, r) => (
            <React.Fragment key={r}>
              {["Teacher Management System", "PeerUP Learning Network", "Product engineering", "AI and machine learning", "Full-stack development", "Cloud and APIs"].map((c) => (
                <span key={c + r} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 5, height: 5, background: COLORS.cyan, borderRadius: "50%", display: "inline-block" }} />
                  {c}
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="container grid-2" style={{ padding: "120px 32px", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 64 }}>
        <div>
          <Eyebrow COLORS={COLORS}>IDX.01 — ABOUT</Eyebrow>
          <h2 className="h-display" style={{ fontSize: 38, fontWeight: 600, lineHeight: 1.15, margin: 0, color: COLORS.text }}>
            Technology with purpose and precision.
          </h2>
        </div>
        <div>
          <p style={{ fontSize: 17, color: COLORS.muted, lineHeight: 1.75, margin: "0 0 24px" }}>
            Terminal W Technologies is a software solutions and product engineering company focused on building meaningful digital experiences, intelligent systems, and scalable technology platforms — including <strong>PeerUP</strong> and the <strong>Teacher Management System</strong>.
          </p>
          <p style={{ fontSize: 17, color: COLORS.muted, lineHeight: 1.75, margin: "0 0 32px" }}>
            We work across software products, custom platforms, AI solutions, web and mobile applications, data-driven systems, enterprise technology, and automation — treating every engagement as a product to be engineered, not a ticket to be closed.
          </p>
          <a href="#services" style={{ color: COLORS.cyan, fontSize: 14, fontWeight: 500, textDecoration: "none", fontFamily: "'IBM Plex Mono', monospace" }}>
            Discover Terminal W Capabilities →
          </a>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" style={{ borderTop: `1px solid ${COLORS.border}`, background: COLORS.panel2, padding: "120px 0" }}>
        <div className="container">
          <Eyebrow COLORS={COLORS}>IDX.02 — PRODUCTS</Eyebrow>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
            <h2 className="h-display" style={{ fontSize: 38, fontWeight: 600, margin: 0, maxWidth: 520, color: COLORS.text }}>
              Products built to make an impact.
            </h2>
            <p style={{ color: COLORS.muted, fontSize: 15, maxWidth: 340, margin: 0, lineHeight: 1.6 }}>
              From open peer-learning networks like <strong>PeerUP</strong> to institutional platforms like <strong>Teacher Management System</strong>, we build software designed to scale.
            </p>
          </div>
          <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {PRODUCTS.map((p) => (
              <div key={p.name} className="card" style={{ 
                padding: 28, 
                display: "flex", 
                flexDirection: "column", 
                minHeight: 340, 
                position: "relative",
                background: COLORS.panel,
                border: p.featured ? `1px solid ${COLORS.cyan}` : `1px solid ${COLORS.border}`,
                boxShadow: p.featured ? `0 0 20px ${COLORS.cyan}22` : "none"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: COLORS.mutedDim }}>{p.idx}</span>
                  <span style={{ 
                    fontSize: 11, 
                    fontFamily: "'IBM Plex Mono', monospace", 
                    color: p.featured ? COLORS.cyan : COLORS.green, 
                    border: `1px solid ${p.featured ? COLORS.cyan : COLORS.blueDim}`, 
                    background: p.featured ? `${COLORS.cyan}15` : "rgba(42, 106, 240, 0.08)", 
                    padding: "3px 8px", 
                    borderRadius: 3 
                  }}>
                    {p.status}
                  </span>
                </div>
                <h3 className="h-display" style={{ fontSize: 22, fontWeight: 600, margin: "0 0 6px", display: "flex", alignItems: "center", gap: 8, color: COLORS.text }}>
                  {p.name}
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" rel="noreferrer" title="Launch Live Product Demo" style={{ color: COLORS.cyan, textDecoration: "none", fontSize: 16 }}>
                      ↗
                    </a>
                  )}
                </h3>
                <div style={{ fontSize: 13, color: COLORS.cyan, marginBottom: 14, fontFamily: "'IBM Plex Mono', monospace" }}>{p.category}</div>
                <p style={{ fontSize: 14.5, color: COLORS.muted, lineHeight: 1.65, margin: "0 0 20px", flexGrow: 1 }}>{p.desc}</p>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {p.caps.map((c) => (
                    <span key={c} style={{ fontSize: 12, color: COLORS.muted, border: `1px solid ${COLORS.border}`, padding: "4px 10px", borderRadius: 3, background: COLORS.bg }}>
                      {c}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button 
                    onClick={() => setSelectedProduct(p)}
                    className="ghost-btn"
                    style={{ flex: 1, justifyContent: "center", fontSize: 12, padding: "8px 10px", color: COLORS.text, borderColor: COLORS.borderStrong }}
                  >
                    Specs →
                  </button>
                  {p.demoUrl && (
                    <a 
                      href={p.demoUrl}
                      target="_blank" 
                      rel="noreferrer"
                      className="cta-btn"
                      style={{ padding: "8px 12px", fontSize: 12, textDecoration: "none" }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {p.githubUrl && (
                    <a 
                      href={p.githubUrl}
                      target="_blank" 
                      rel="noreferrer"
                      className="ghost-btn"
                      style={{ padding: "8px 10px", fontSize: 12, textDecoration: "none", color: COLORS.text, borderColor: COLORS.borderStrong }}
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLAGSHIP SPOTLIGHT — PEERUP PLATFORM */}
      <section className="container grid-2" style={{ padding: "120px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <Eyebrow COLORS={COLORS}>FLAGSHIP PRODUCT — PEERUP</Eyebrow>
          <h2 className="h-display" style={{ fontSize: 38, fontWeight: 700, margin: "0 0 20px", color: COLORS.text }}>
            PeerUP — Peer Learning Network
          </h2>
          <p style={{ fontSize: 16, color: COLORS.muted, lineHeight: 1.7, margin: "0 0 24px" }}>
            PeerUP connects students, developers, and self-taught builders into real-time collaborative study spaces with automated skill matching and project pairing.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
            {[
              "Skill-Based Peer Matching", 
              "Live Collaborative Rooms", 
              "Open-Source Project Pairing", 
              "Gamified Reputation & Badges", 
              "GitHub Integration & Portfolio Sync", 
              "Community Knowledge Hub"
            ].map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: COLORS.text }}>
                <span style={{ width: 6, height: 6, background: COLORS.cyan, borderRadius: "50%", display: "inline-block", boxShadow: `0 0 8px ${COLORS.cyan}` }} />
                {f}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="https://github.com/ShubhamAlapure/PeerUP" target="_blank" rel="noreferrer" className="cta-btn" style={{ textDecoration: "none" }}>
              Explore PeerUP on GitHub ↗
            </a>
            <button onClick={() => setSelectedProduct(PRODUCTS[0])} className="ghost-btn" style={{ color: COLORS.text, borderColor: COLORS.borderStrong }}>
              View Product Specs →
            </button>
          </div>
        </div>

        {/* PeerUP Visual Feature Card */}
        <div className="card" style={{ padding: 32, background: COLORS.panel, border: `1px solid ${COLORS.cyan}` }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: COLORS.cyan, marginBottom: 16 }}>
            {"{ peerup.community_mesh }"}
          </div>
          <h3 className="h-display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 12, color: COLORS.text }}>
            Empowering 10,000+ Peer Connections
          </h3>
          <p style={{ fontSize: 14.5, color: COLORS.muted, lineHeight: 1.65, marginBottom: 24 }}>
            Built by engineers for developers. PeerUP breaks traditional learning barriers by letting peers exchange skills directly, work on real codebases together, and earn verified skill badges.
          </p>

          <div style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13, color: COLORS.mutedDim, fontFamily: "'IBM Plex Mono', monospace" }}>
              <span>ACTIVE STUDY ROOMS</span>
              <span style={{ color: COLORS.green }}>● 142 ROOMS LIVE</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ background: COLORS.panel2, padding: "8px 12px", borderRadius: 4, display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.text }}>
                <span>⚡ React & Three.js Canvas Deep-Dive</span>
                <span style={{ color: COLORS.cyan }}>8 peers</span>
              </div>
              <div style={{ background: COLORS.panel2, padding: "8px 12px", borderRadius: 4, display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.text }}>
                <span>🧠 System Design & Distributed DBs</span>
                <span style={{ color: COLORS.cyan }}>12 peers</span>
              </div>
              <div style={{ background: COLORS.panel2, padding: "8px 12px", borderRadius: 4, display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.text }}>
                <span>🚀 Open Source PR Review Session</span>
                <span style={{ color: COLORS.cyan }}>15 peers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEACHER MANAGEMENT SYSTEM — LIVE INTERACTIVE DEMO */}
      <section className="container grid-2" style={{ padding: "120px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <Eyebrow COLORS={COLORS}>ACADEMIC OPERATING SYSTEM — TEACHER MANAGEMENT</Eyebrow>
          <h2 className="h-display" style={{ fontSize: 36, fontWeight: 600, margin: "0 0 20px", color: COLORS.text }}>
            Teacher Lifecycle Management System
          </h2>
          <p style={{ fontSize: 16, color: COLORS.muted, lineHeight: 1.7, margin: "0 0 24px" }}>
            Built for higher education universities (like MIT-ADT University Pune), the Teacher Lifecycle Management System unifies faculty records, automated subject & credit hour allocations, research paper tracking, and annual appraisal workflows.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
            {[
              "Faculty Profile & Credential Sync", 
              "Automated Subject & Lab Allocations", 
              "Research Papers & Patent Log", 
              "Annual Appraisal Workflows", 
              "Multi-Department & HOD Access", 
              "AICTE / UGC Norms Compliance"
            ].map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: COLORS.text }}>
                <span style={{ width: 6, height: 6, background: COLORS.cyan, borderRadius: "50%", display: "inline-block", boxShadow: `0 0 8px ${COLORS.cyan}` }} />
                {f}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="https://teacher-management-system-chi.vercel.app/" target="_blank" rel="noreferrer" className="cta-btn" style={{ textDecoration: "none" }}>
              Launch Live App Demo ↗
            </a>
            <a href="https://github.com/ShubhamAlapure/teacher_management_system" target="_blank" rel="noreferrer" className="ghost-btn" style={{ textDecoration: "none", color: COLORS.text, borderColor: COLORS.borderStrong }}>
              GitHub Repo ↗
            </a>
          </div>
        </div>

        {/* Interactive Live Teacher Management Operations Widget */}
        <TeacherManagementDemoWidget COLORS={COLORS} />
      </section>

      {/* SOLUTIONS SECTION */}
      <section id="solutions" style={{ borderTop: `1px solid ${COLORS.border}`, padding: "120px 0" }}>
        <div className="container">
          <Eyebrow COLORS={COLORS}>IDX.04 — SOLUTIONS</Eyebrow>
          <h2 className="h-display" style={{ fontSize: 38, fontWeight: 600, margin: "0 0 56px", maxWidth: 560, color: COLORS.text }}>
            Solutions for real-world challenges.
          </h2>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: COLORS.border, border: `1px solid ${COLORS.border}` }}>
            {SOLUTIONS.map((s) => (
              <div key={s.name} style={{ background: COLORS.panel, padding: 32, transition: "background 0.2s ease" }}>
                <div style={{ fontSize: 24, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 10px", color: COLORS.text }}>{s.name}</h3>
                <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" style={{ borderTop: `1px solid ${COLORS.border}`, background: COLORS.panel2, padding: "120px 0" }}>
        <div className="container">
          <Eyebrow COLORS={COLORS}>IDX.05 — SERVICES</Eyebrow>
          <h2 className="h-display" style={{ fontSize: 38, fontWeight: 600, margin: "0 0 56px", maxWidth: 560, color: COLORS.text }}>
            What we build end-to-end.
          </h2>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {SERVICES.map((s) => (
              <div key={s.name} className="card" style={{ padding: 28, background: COLORS.panel }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px", color: COLORS.text }}>{s.name}</h3>
                <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="container" style={{ padding: "120px 32px" }}>
        <Eyebrow COLORS={COLORS}>IDX.06 — HOW WE WORK</Eyebrow>
        <h2 className="h-display" style={{ fontSize: 38, fontWeight: 600, margin: "0 0 56px", maxWidth: 560, color: COLORS.text }}>
          From idea to production impact.
        </h2>
        <div className="grid-6" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 0, borderTop: `1px solid ${COLORS.border}` }}>
          {PROCESS.map((s, i) => (
            <div key={s.n} style={{ padding: "28px 18px 0", borderLeft: i === 0 ? "none" : `1px solid ${COLORS.border}` }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: COLORS.cyan, marginBottom: 14 }}>{s.n}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px", color: COLORS.text }}>{s.name}</h3>
              <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.55, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNOLOGY STACK SECTION */}
      <section id="technologies" style={{ borderTop: `1px solid ${COLORS.border}`, padding: "120px 0" }}>
        <div className="container">
          <Eyebrow COLORS={COLORS}>IDX.07 — TECHNOLOGY</Eyebrow>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, marginBottom: 44 }}>
            <h2 className="h-display" style={{ fontSize: 38, fontWeight: 600, margin: 0, maxWidth: 560, color: COLORS.text }}>
              Built with modern stack.
            </h2>
            
            {/* Tech Category Filter */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["All", "Frontend", "Backend", "AI / ML", "Data", "Infrastructure"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTechGroup(cat)}
                  style={{
                    background: selectedTechGroup === cat ? COLORS.blue : "transparent",
                    color: selectedTechGroup === cat ? "#fff" : COLORS.muted,
                    border: `1px solid ${selectedTechGroup === cat ? COLORS.blue : COLORS.border}`,
                    padding: "6px 14px",
                    borderRadius: 4,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "'IBM Plex Mono', monospace",
                    transition: "all 0.15s ease"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 28 }}>
            {filteredTech.map((g) => (
              <div key={g.group} className="card" style={{ padding: 24, background: COLORS.panel }}>
                <div style={{ fontSize: 12, color: COLORS.cyan, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 16, textTransform: "uppercase" }}>
                  {g.group}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {g.items.map((it) => (
                    <div key={it} style={{ fontSize: 14.5, color: COLORS.text, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 4, height: 4, background: COLORS.borderStrong, borderRadius: "50%" }} />
                      {it}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TERMINAL W */}
      <section style={{ borderTop: `1px solid ${COLORS.border}`, background: COLORS.panel2, padding: "120px 0" }}>
        <div className="container">
          <Eyebrow COLORS={COLORS}>IDX.08 — WHY TERMINAL W</Eyebrow>
          <h2 className="h-display" style={{ fontSize: 38, fontWeight: 600, margin: "0 0 56px", maxWidth: 560, color: COLORS.text }}>
            Why build with Terminal W?
          </h2>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {WHY.map((w) => (
              <div key={w.name} className="card" style={{ padding: 28, background: COLORS.panel }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px", color: COLORS.text }}>{w.name}</h3>
                <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section className="container grid-4" style={{ padding: "100px 32px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {METRICS.map((m) => (
          <div key={m.label} className="card" style={{ padding: 32, background: COLORS.panel2, textAlign: "left" }}>
            <div className="h-display" style={{ fontSize: 48, fontWeight: 700, color: COLORS.cyan, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
              {m.prefix}{m.value}{m.suffix}
            </div>
            <div style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.4 }}>{m.label}</div>
          </div>
        ))}
      </section>

      {/* INDUSTRIES */}
      <section style={{ borderTop: `1px solid ${COLORS.border}`, padding: "80px 0" }}>
        <div className="container">
          <Eyebrow COLORS={COLORS}>IDX.09 — INDUSTRIES</Eyebrow>
          <p style={{ fontSize: 15, color: COLORS.muted, margin: "0 0 24px" }}>Technology solutions designed for diverse domain challenges —</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {INDUSTRIES.map((i) => (
              <span key={i} style={{ fontSize: 14, color: COLORS.text, border: `1px solid ${COLORS.border}`, background: COLORS.panel, padding: "9px 18px", borderRadius: 4 }}>
                {i}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{ borderTop: `1px solid ${COLORS.border}`, background: COLORS.panel2, padding: "120px 0" }}>
        <div className="container grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <Eyebrow COLORS={COLORS}>IDX.10 — CONTACT</Eyebrow>
            <h2 className="h-display" style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.15, margin: "0 0 20px", color: COLORS.text }}>
              Have an idea?<br />Let's build it.
            </h2>
            <p style={{ fontSize: 16, color: COLORS.muted, lineHeight: 1.7, maxWidth: 420, marginBottom: 32 }}>
              Whether you're building a new product, modernizing an existing system, or exploring what's possible with AI, let's talk.
            </p>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13.5, color: COLORS.cyan, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>✉️</span>
                <a href="mailto:itsterminalw@gmail.com" style={{ color: COLORS.text, textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = COLORS.cyan} onMouseOut={(e) => e.target.style.color = COLORS.text}>itsterminalw@gmail.com</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>📞</span>
                <a href="tel:9322610932" style={{ color: COLORS.text, textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = COLORS.cyan} onMouseOut={(e) => e.target.style.color = COLORS.text}>+91 9322610932</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>📸</span>
                <a href="https://instagram.com/itsterminalw" target="_blank" rel="noreferrer" style={{ color: COLORS.text, textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = COLORS.cyan} onMouseOut={(e) => e.target.style.color = COLORS.text}>@itsterminalw</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>🐙</span>
                <a href="https://github.com/ShubhamAlapure" target="_blank" rel="noreferrer" style={{ color: COLORS.text, textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = COLORS.cyan} onMouseOut={(e) => e.target.style.color = COLORS.text}>github.com/ShubhamAlapure</a>
              </div>
            </div>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {formState === "sent" ? (
              <div style={{ padding: 32, border: `1px solid ${COLORS.cyan}`, background: `${COLORS.cyan}10`, borderRadius: 6, fontSize: 15, color: COLORS.text }}>
                <div style={{ fontSize: 20, color: COLORS.cyan, fontWeight: 600, marginBottom: 8 }}>✓ Message Received</div>
                Thank you for reaching out. A Terminal W engineer will be in touch within 24 hours.
                <button 
                  onClick={() => setFormState("idle")} 
                  className="ghost-btn" 
                  style={{ marginTop: 20, display: "block", fontSize: 13, color: COLORS.text, borderColor: COLORS.borderStrong }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <div>
                  <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, color: COLORS.text }} />
                  {formErrors.name && <div style={{ color: "#E24B4A", fontSize: 12.5, marginTop: 6 }}>{formErrors.name}</div>}
                </div>
                <input placeholder="Organization / Company" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, color: COLORS.text }} />
                <div>
                  <input placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, color: COLORS.text }} />
                  {formErrors.email && <div style={{ color: "#E24B4A", fontSize: 12.5, marginTop: 6 }}>{formErrors.email}</div>}
                </div>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, color: COLORS.text }}>
                  <option value="">Select project scope</option>
                  <option>New AI or Software product</option>
                  <option>Custom platform modernization</option>
                  <option>Data / Analytics infrastructure</option>
                  <option>Technical Advisory & Design</option>
                </select>
                <div>
                  <textarea rows={4} placeholder="Tell us about your project or technical challenge" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ background: COLORS.panel2, border: `1px solid ${COLORS.border}`, color: COLORS.text }} />
                  {formErrors.message && <div style={{ color: "#E24B4A", fontSize: 12.5, marginTop: 6 }}>{formErrors.message}</div>}
                </div>
                <button className="cta-btn" type="submit" disabled={formState === "submitting"} style={{ alignSelf: "flex-start", opacity: formState === "submitting" ? 0.7 : 1 }}>
                  {formState === "submitting" ? "Sending..." : "Submit inquiry →"}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* PRODUCT SPEC MODAL */}
      {selectedProduct && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: isDarkMode ? "rgba(0, 0, 0, 0.85)" : "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(8px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justify: "center",
          padding: 20
        }}>
          <div className="card" style={{ maxWidth: 600, width: "100%", padding: 32, background: COLORS.panel, border: `1px solid ${COLORS.cyan}`, position: "relative" }}>
            <button 
              onClick={() => setSelectedProduct(null)}
              style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", color: COLORS.muted, fontSize: 20, cursor: "pointer" }}
            >
              ✕
            </button>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: COLORS.cyan, marginBottom: 8 }}>{selectedProduct.idx} / {selectedProduct.category}</div>
            <h2 className="h-display" style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", color: COLORS.text }}>{selectedProduct.name}</h2>
            <div style={{ fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", color: COLORS.green, marginBottom: 20 }}>
              Key Metric: {selectedProduct.metrics}
            </div>
            <p style={{ color: COLORS.muted, fontSize: 15, lineHeight: 1.65, marginBottom: 20 }}>{selectedProduct.details}</p>
            
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: COLORS.mutedDim, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 10 }}>CORE CAPABILITIES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {selectedProduct.caps.map((c) => (
                  <span key={c} style={{ fontSize: 12, color: COLORS.text, border: `1px solid ${COLORS.border}`, padding: "6px 12px", borderRadius: 4, background: COLORS.panel2 }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {selectedProduct.demoUrl && (
                <a href={selectedProduct.demoUrl} target="_blank" rel="noreferrer" className="cta-btn" style={{ textDecoration: "none" }}>
                  Launch Live Demo ↗
                </a>
              )}
              {selectedProduct.githubUrl ? (
                <a href={selectedProduct.githubUrl} target="_blank" rel="noreferrer" className="ghost-btn" style={{ textDecoration: "none", color: COLORS.text, borderColor: COLORS.borderStrong }}>
                  View GitHub Repository ↗
                </a>
              ) : (
                <a href="#contact" onClick={() => setSelectedProduct(null)} className="cta-btn" style={{ textDecoration: "none" }}>
                  Request Full Technical Whitepaper →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "72px 0 32px", background: COLORS.bg }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, marginBottom: 56 }} className="grid-4">
            <div>
              <div style={{ marginBottom: 16 }}>
                <TerminalWLogo showSubtitle={true} size={32} COLORS={COLORS} />
              </div>
              <p style={{ fontSize: 13.5, color: COLORS.muted, lineHeight: 1.6, maxWidth: 280 }}>
                A software solutions and product engineering company building technology products and digital solutions for forward-thinking organizations.
              </p>
            </div>
            {[
              { 
                h: "Company", 
                links: [
                  { label: "About", href: "#about" },
                  { label: "Products", href: "#products" },
                  { label: "Services", href: "#services" },
                  { label: "Contact", href: "#contact" }
                ] 
              },
              { 
                h: "Products", 
                links: [
                  { label: "PeerUP", href: "https://github.com/ShubhamAlapure/PeerUP", external: true },
                  { label: "Teacher Management System", href: "https://teacher-management-system-chi.vercel.app/", external: true },
                  { label: "Ledgerline", href: "#products" },
                  { label: "Coursefield", href: "#products" }
                ] 
              },
              { 
                h: "Connect", 
                links: [
                  { label: "📸 @itsterminalw", href: "https://instagram.com/itsterminalw", external: true },
                  { label: "✉️ itsterminalw@gmail.com", href: "mailto:itsterminalw@gmail.com", external: true },
                  { label: "📞 +91 9322610932", href: "tel:9322610932", external: true },
                  { label: "🐙 GitHub", href: "https://github.com/ShubhamAlapure", external: true }
                ] 
              },
            ].map((col) => (
              <div key={col.h}>
                <div style={{ fontSize: 12.5, color: COLORS.mutedDim, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 16 }}>{col.h}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((it) => (
                    <a key={it.label} href={it.href} target={it.external ? "_blank" : "_self"} rel="noreferrer" style={{ fontSize: 13.5, color: COLORS.muted, textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = COLORS.text} onMouseOut={(e) => e.target.style.color = COLORS.muted}>{it.label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12.5, color: COLORS.mutedDim, fontFamily: "'IBM Plex Mono', monospace" }}>
              © 2026 Terminal W Technologies. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy policy", "Terms of service", "Cookie policy"].map((l) => (
                <a key={l} href="#" style={{ fontSize: 12.5, color: COLORS.mutedDim, textDecoration: "none" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
