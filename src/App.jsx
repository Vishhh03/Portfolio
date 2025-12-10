import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Server, 
  Database, 
  Cpu, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight,
  Globe,
  Award,
  Activity,
  HardDrive,
  Box,
  Briefcase,
  Cloud,
  X,
  Maximize2,
  Loader2,
  Eye
} from 'lucide-react';

// --- Marquee Styles ---
const marqueeStyle = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-scroll {
    animation: scroll 30s linear infinite;
  }
  .animate-scroll-reverse {
    animation: scroll 30s linear infinite reverse;
  }
  .pause-on-hover:hover {
    animation-play-state: paused;
  }
`;

// --- Tech Stack Data (Moved outside component for stability) ---
const infraStack = [
  { name: 'aws', color: 'FF9900', label: 'AWS', customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'docker', color: '2496ED', label: 'Docker' },
  { name: 'kubernetes', color: '326CE5', label: 'Kubernetes' },
  { name: 'terraform', color: '7B42BC', label: 'Terraform' },
  { name: 'jenkins', color: 'D24939', label: 'Jenkins' },
  { name: 'githubactions', color: '2088FF', label: 'GitHub Actions' },
  { name: 'prometheus', color: 'E6522C', label: 'Prometheus' },
  { name: 'grafana', color: 'F46800', label: 'Grafana' },
  { name: 'linux', color: 'FCC624', label: 'Linux' },
  { name: 'elastic', color: '005571', label: 'ELK Stack' },
];

const devStack = [
  { name: 'python', color: '3776AB', label: 'Python' },
  { name: 'dotnet', color: '512BD4', label: '.NET Core' },
  { name: 'react', color: '61DAFB', label: 'React' },
  { name: 'angular', color: 'DD0031', label: 'Angular' },
  { name: 'nextdotjs', color: 'white', label: 'Next.js' },
  { name: 'postgresql', color: '4169E1', label: 'PostgreSQL' },
  { name: 'mongodb', color: '47A248', label: 'MongoDB' },
  { name: 'csharp', color: '239120', label: 'C#', customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'typescript', color: '3178C6', label: 'TypeScript' },
];

// --- Tech Icon Component (For Marquee) ---
const TechBadge = ({ name, color, label, customUrl, isActive }) => {
  const iconUrl = customUrl || `https://cdn.simpleicons.org/${name}/${color}`;
  
  return (
    <div 
      className={`
        flex items-center gap-2 px-4 py-2 bg-[#161b22] border rounded-full shrink-0 
        transition-all duration-500 cursor-default group
        ${isActive 
          ? 'grayscale-0 border-gray-500 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
          : 'border-gray-800/60 grayscale hover:grayscale-0 hover:border-gray-700 hover:scale-105'}
      `}
    >
      <img 
        src={iconUrl} 
        alt={label} 
        className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
      />
      <span 
        className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
      >
        {label}
      </span>
    </div>
  );
};

// --- Project Tech Pill Component (Small version for Cards) ---
const ProjectTechPill = ({ label, iconKey, customUrl, color }) => {
  const iconUrl = customUrl || `https://cdn.simpleicons.org/${iconKey}/${color}`;
  
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/80 border border-gray-700 rounded-md shrink-0 transition-all hover:bg-gray-800 hover:border-gray-600">
      <img src={iconUrl} alt={label} className="w-3.5 h-3.5" />
      <span className="text-[11px] font-mono text-gray-300 tracking-tight">{label}</span>
    </div>
  );
};

// --- Project Preview Modal Component ---
const ProjectPreviewModal = ({ project, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full h-full max-w-7xl bg-[#0d1117] rounded-xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden">
        {/* Browser Header */}
        <div className="h-10 bg-[#161b22] border-b border-gray-700 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-500" onClick={onClose} title="Close" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 px-3 py-0.5 bg-[#0d1117] rounded text-xs text-gray-400 font-mono border border-gray-800 flex items-center gap-2 min-w-[200px]">
              <Globe size={10} />
              {project.link || 'local-environment'}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                title="Open in new tab"
              >
                <ExternalLink size={16} />
              </a>
            )}
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 relative bg-white">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d1117] text-blue-400 z-10">
              <Loader2 size={40} className="animate-spin mb-4" />
              <p className="font-mono text-sm">Establishing connection to {project.title}...</p>
            </div>
          )}
          
          {project.link ? (
            <iframe
              src={project.link}
              title={project.title}
              className="w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d1117] text-gray-400 p-8 text-center">
              <Database size={64} className="mb-6 text-gray-600" />
              <h3 className="text-xl font-bold text-white mb-2">Internal System</h3>
              <p className="max-w-md">
                This project ({project.title}) is an internal application or backend service without a public frontend interface accessible via iframe.
              </p>
              <button 
                onClick={onClose}
                className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all font-medium"
              >
                Return to Portfolio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [previewProject, setPreviewProject] = useState(null);
  
  // State for random icon highlighting
  const [activeInfraIndex, setActiveInfraIndex] = useState(null);
  const [activeDevIndex, setActiveDevIndex] = useState(null);
  
  // --- DevOps Monitor State ---
  const [metrics, setMetrics] = useState({ cpu: 15, memory: 42, uptime: 99.98 });
  const [logs, setLogs] = useState([
    { time: '00:01', msg: 'Initializing system boot sequence...' },
    { time: '00:02', msg: 'Loading kernel modules: AWS, Docker, Terraform...' },
  ]);
  const logContainerRef = useRef(null);

  // --- 1. Dynamic Favicon & Title Logic ---
  useEffect(() => {
    // Set Page Title
    document.title = "Vishal Shaji | Cloud & DevOps";

    // Generate Dynamic Favicon [ VS ]
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Background: Dark Hex
    ctx.fillStyle = '#0d1117'; 
    ctx.fillRect(0, 0, 64, 64);
    
    // Border: Blue
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 64, 64);

    // Text: VS
    ctx.font = 'bold 32px monospace';
    ctx.fillStyle = '#3b82f6';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('VS', 32, 32);

    // Update Favicon Link
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL("image/x-icon");
    
    // Remove existing favicons if any
    const existingFavicons = document.querySelectorAll('link[rel="shortcut icon"]');
    existingFavicons.forEach(e => e.remove());
    
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  // --- Random Tech Highlight Logic ---
  useEffect(() => {
    // Random flicker for Infra Stack (Top Row)
    const infraInterval = setInterval(() => {
      // 3 because we duplicate the array 3 times for the marquee
      const totalItems = infraStack.length * 3;
      const idx = Math.floor(Math.random() * totalItems);
      setActiveInfraIndex(idx);
      
      // Turn off after a short duration
      setTimeout(() => setActiveInfraIndex(null), 2000);
    }, 2500);

    // Random flicker for Dev Stack (Bottom Row)
    const devInterval = setInterval(() => {
      const totalItems = devStack.length * 3;
      const idx = Math.floor(Math.random() * totalItems);
      setActiveDevIndex(idx);
      
      setTimeout(() => setActiveDevIndex(null), 2000);
    }, 3500);

    return () => {
      clearInterval(infraInterval);
      clearInterval(devInterval);
    };
  }, []);

  // Simulated Live Metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.min(100, Math.max(5, prev.cpu + (Math.random() * 10 - 5))),
        memory: Math.min(100, Math.max(20, prev.memory + (Math.random() * 4 - 2))),
        uptime: prev.uptime
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulated Boot Logs
  useEffect(() => {
    const logSequence = [
      "Connecting to ap-south-1 region...",
      "Fetching configuration from S3 bucket...",
      "[SUCCESS] IAM Roles validated.",
      "Starting container orchestration...",
      "[INFO] Pod 'portfolio-v1' scheduled on node-01.",
      "Pulling image: vishal/portfolio:latest...",
      "[SUCCESS] Image pulled in 1.2s",
      "Mounting persistent volumes...",
      "Starting Nginx reverse proxy...",
      "[INFO] Health check passed: HTTP 200 OK",
      "System ready. Listening on port 443."
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < logSequence.length) {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
        
        setLogs(prev => [...prev.slice(-6), { time: timeString, msg: logSequence[index] }]);
        index++;
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- EXPERIENCE DATA (With Logo Support) ---
  const experiences = [
    {
      company: "Cognizant Technology Solutions",
      role: "Programmer Analyst Trainee",
      period: "July 2025 – Present",
      // Uncomment the line below and add your image path
      // logo: "/images/cognizant-logo.png", 
      defaultColor: "blue",
      details: [
        "Led a 5-member team modernizing a full-stack web platform while integrating DevOps practices.",
        "Containerized the Smart Hotel Management System (Angular + .NET) using Docker.",
        "Implemented CI/CD pipelines via GitHub Actions and integrated Prometheus/Grafana monitoring."
      ]
    },
    {
      company: "Bommaku Constructions",
      role: "Tech Consultant (Intern)",
      period: "Jan 2025 – June 2025",
      // Uncomment the line below and add your image path
      // logo: "/images/bommaku-logo.png",
      defaultColor: "orange",
      details: [
        "Supported digital transformation through web, cloud, and visualization solutions.",
        "Designed Unreal Engine 5 architectural visualization and optimized website performance.",
        "Guided management on adopting cloud technologies for operational efficiency."
      ]
    }
  ];

  // --- PROJECTS DATA (With Logo Support) ---
  const projects = [
    {
      title: "Terraless Hosting",
      desc: "Minecraft server hosting platform using AWS EC2 Spot Instances and Lambda. Features a full serverless backend architecture for cost optimization.",
      // Uncomment the line below and add your image path
      // logo: "/images/terraless-logo.png",
      details: [
        "Developed Next.js application with a full serverless backend architecture.",
        "Automated backend workflows via AWS Lambda, IAM, DynamoDB, and Cognito.",
        "Implemented CloudWatch dashboards for instance uptime and cost monitoring."
      ],
      techs: [
        { label: 'Next.js', iconKey: 'nextdotjs', color: 'white' },
        { label: 'AWS', iconKey: 'amazonwebservices', color: 'FF9900', customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        { label: 'DynamoDB', iconKey: 'dynamodb', color: '4053D6', customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dynamodb/dynamodb-original.svg' }, 
        { label: 'Cognito', iconKey: 'cognito', color: 'DD344C', customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' }
      ],
      link: "https://terraless.com",
      icon: Server,
      color: "blue"
    },
    {
      title: "Idha Art Stay",
      desc: "Production-grade client website with automated build pipelines. Integrated Sanity CMS and deployed to Cloudflare with global CDN caching.",
      // Uncomment the line below and add your image path
      // logo: "/images/idha-logo.png",
      details: [
        "Built a responsive Next.js + Sanity CMS frontend for an art homestay business.",
        "Set up CI/CD pipelines using GitHub Actions for deployment to Cloudflare.",
        "Configured Cloudflare CDN for performance optimization and SEO improvements."
      ],
      techs: [
        { label: 'Next.js', iconKey: 'nextdotjs', color: 'white' },
        { label: 'Sanity', iconKey: 'sanity', color: 'F03E2F' },
        { label: 'Cloudflare', iconKey: 'cloudflare', color: 'F38020' },
        { label: 'GitHub Actions', iconKey: 'githubactions', color: '2088FF' }
      ],
      link: "https://idha.vercel.app",
      icon: Globe,
      color: "purple"
    },
    {
      title: "Smart Hotel Sys",
      desc: "Full-stack modernization project. Containerized application, set up CI/CD, and integrated ELK Stack for log management.",
      // Uncomment the line below and add your image path
      // logo: "/images/smart-hotel-logo.png",
      details: [
        "Developed Smart Hotel Management System (Angular + .NET + SQL Server).",
        "Containerized the application using Docker and implemented Github Actions CI/CD.",
        "Integrated Prometheus & Grafana for live monitoring and ELK Stack for log management."
      ],
      techs: [
        { label: 'Angular', iconKey: 'angular', color: 'DD0031' },
        { label: '.NET Core', iconKey: 'dotnet', color: '512BD4' },
        { label: 'Docker', iconKey: 'docker', color: '2496ED' },
        { label: 'SQL Server', iconKey: 'microsoftsqlserver', color: 'CC2927', customUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' }
      ],
      link: null, 
      icon: Database,
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans selection:bg-blue-500/30">
      <style>{marqueeStyle}</style>
      
      {/* Modal Overlay */}
      {previewProject && (
        <ProjectPreviewModal 
          project={previewProject} 
          onClose={() => setPreviewProject(null)} 
        />
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0d1117]/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-blue-400 font-mono font-bold text-xl flex items-center gap-2">
            <Terminal size={20} />
            <span>~/vishal-shaji</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['About', 'Experience', 'Projects', 'Skills', 'Certifications'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-blue-400 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <a 
            href="mailto:vishshaji03@gmail.com" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-all"
          >
            Contact Me
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 text-blue-400 text-xs font-mono mb-6 border border-blue-900/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for Hire
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Cloud & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">DevOps Engineer</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              Transforming complex infrastructure into scalable, automated systems. 
              Specializing in AWS, CI/CD pipelines, and modernizing legacy applications.
            </p>
            
            <div className="flex gap-4">
              <a href="https://github.com/Vishhh03" target="_blank" rel="noreferrer" className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/VishalShaji" target="_blank" rel="noreferrer" className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700">
                <Linkedin size={24} />
              </a>
              <a href="mailto:vishshaji03@gmail.com" className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* DevOps Control Panel */}
          <div className="bg-[#161b22] rounded-xl border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm">
            <div className="bg-[#0d1117] px-4 py-2 border-b border-gray-800 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-gray-500">root@vishal-monitor:~</div>
            </div>

            <div className="grid grid-cols-3 gap-px bg-gray-800 border-b border-gray-800">
              <div className="bg-[#161b22] p-4">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Activity size={14} className="text-blue-400" />
                  CPU Load
                </div>
                <div className="text-lg font-bold text-white">{metrics.cpu.toFixed(1)}%</div>
                <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${metrics.cpu}%` }}></div>
                </div>
              </div>
              <div className="bg-[#161b22] p-4">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <HardDrive size={14} className="text-purple-400" />
                  Memory
                </div>
                <div className="text-lg font-bold text-white">{metrics.memory.toFixed(1)}%</div>
                 <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${metrics.memory}%` }}></div>
                </div>
              </div>
              <div className="bg-[#161b22] p-4">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Box size={14} className="text-green-400" />
                  Containers
                </div>
                <div className="text-lg font-bold text-white">5 Active</div>
                <div className="flex gap-1 mt-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>

            <div 
              ref={logContainerRef}
              className="p-4 h-48 overflow-y-auto font-mono text-xs space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
            >
               {logs.map((log, i) => (
                 <div key={i} className="flex gap-3">
                   <span className="text-gray-500 shrink-0">[{log.time}]</span>
                   <span className={(log.msg || '').includes('SUCCESS') ? 'text-green-400' : (log.msg || '').includes('INFO') ? 'text-blue-400' : 'text-gray-300'}>
                     {log.msg}
                   </span>
                 </div>
               ))}
               <div className="flex gap-2 items-center text-blue-400 animate-pulse">
                <span>➜</span>
                <span className="w-2 h-4 bg-blue-400 block"></span>
              </div>
            </div>
            
            <div className="bg-[#0d1117] border-t border-gray-800 px-4 py-2 flex justify-between text-xs text-gray-500">
               <div>Region: <span className="text-gray-300">ap-south-1</span></div>
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500"></span>
                 System Operational
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-white">Experience</h2>
          <div className="h-px bg-gray-800 flex-grow"></div>
        </div>

        <div className="relative border-l border-gray-800 ml-3 space-y-12">
          {experiences.map((job, idx) => (
            <div key={idx} className="pl-10 relative group">
              <div className={`absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full bg-${job.defaultColor}-500 group-hover:scale-125 transition-transform z-10`}></div>
              
              <div className="flex gap-6 flex-col sm:flex-row items-start">
                {/* Dynamic Logo Rendering */}
                {job.logo ? (
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-gray-700">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`w-14 h-14 bg-${job.defaultColor}-900/20 border border-${job.defaultColor}-900/50 rounded-lg flex items-center justify-center shrink-0`}>
                    <span className={`text-2xl font-bold text-${job.defaultColor}-400`}>{job.company.charAt(0)}</span>
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className={`text-xl font-bold text-white group-hover:text-${job.defaultColor}-400 transition-colors`}>{job.company}</h3>
                    <span className="text-sm font-mono text-gray-500 bg-gray-800/50 px-3 py-1 rounded mt-2 sm:mt-0 w-fit">{job.period}</span>
                  </div>
                  <div className={`text-${job.defaultColor}-400 font-medium mb-4 flex items-center gap-2`}>
                    <Briefcase size={16} />
                    {job.role}
                  </div>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    {job.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex gap-3 items-start">
                        <ChevronRight size={16} className={`text-${job.defaultColor}-500 shrink-0 mt-0.5`} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto bg-[#161b22]/30">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          <div className="h-px bg-gray-800 flex-grow"></div>
        </div>

        {/* Flex Container for Accordion Effect - Using justify-start (default but explicit for clarity) and items-start to remove vertical stretch */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className={`
                group relative 
                bg-[#0d1117] border border-gray-800 rounded-2xl overflow-hidden 
                flex flex-col justify-start
                transition-all duration-500 ease-in-out
                w-full lg:w-auto
                lg:flex-1 lg:hover:flex-[2.5] lg:hover:border-blue-500/50
                hover:shadow-2xl hover:bg-[#161b22]
              `}
            >
              <div className="p-6 flex flex-col h-full relative z-10">
                  {/* Header Icons & Logo Support */}
                  <div className="flex justify-between items-start mb-4">
                      {project.logo ? (
                        <div className="w-12 h-12 rounded-xl bg-white overflow-hidden border border-gray-700">
                          <img src={project.logo} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className={`p-3 rounded-xl bg-opacity-20 bg-${project.color}-500`}>
                            <project.icon size={28} className={`text-${project.color}-400`} />
                        </div>
                      )}
                  </div>

                  {/* Title & Desc */}
                  <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors whitespace-nowrap">
                          {project.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed lg:group-hover:line-clamp-none transition-all duration-300">
                          {project.desc}
                      </p>
                  </div>

                  {/* Bullet Points (Visible PRE-hover, Hidden POST-hover) */}
                  <div className="transition-all duration-500 ease-in-out max-h-[500px] opacity-100 lg:group-hover:max-h-0 lg:group-hover:opacity-0 overflow-hidden">
                    <ul className="space-y-2 mb-4">
                      {project.details.map((detail, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-400">
                          <ChevronRight size={14} className="text-blue-500 shrink-0 mt-1" />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills & Buttons (Hidden PRE-hover, Visible POST-hover) */}
                  <div className="flex flex-col justify-end transition-all duration-500 ease-in-out max-h-0 opacity-0 lg:group-hover:max-h-[300px] lg:group-hover:opacity-100 overflow-hidden">
                      <div className="flex flex-wrap gap-2 mb-6">
                          {project.techs.map((tech, tIdx) => (
                            <ProjectTechPill 
                              key={tIdx} 
                              label={tech.label} 
                              iconKey={tech.iconKey} 
                              color={tech.color}
                              customUrl={tech.customUrl}
                            />
                          ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewProject(project);
                            }}
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                          >
                            <Eye size={18} />
                            <span className="whitespace-nowrap">Live Preview</span>
                          </button>
                          
                          {project.link ? (
                              <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex-1 px-4 py-3 bg-[#0d1117] border border-gray-700 hover:border-gray-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:bg-gray-800"
                              >
                                <ExternalLink size={18} />
                                <span className="whitespace-nowrap">Visit Site</span>
                              </a>
                          ) : (
                              <button disabled className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-800 text-gray-500 rounded-lg font-medium flex items-center justify-center gap-2 cursor-not-allowed">
                                  <ExternalLink size={18} />
                                  <span className="whitespace-nowrap">Internal Only</span>
                              </button>
                          )}
                      </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infinite Logo Slider (Tech Arsenal) */}
      <section id="skills" className="py-16 bg-[#0d1117] border-y border-gray-800 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <h2 className="text-3xl font-bold text-white">Tech Arsenal</h2>
          <div className="h-px bg-gray-800 mt-4"></div>
        </div>

        {/* Row 1: Infrastructure & Cloud (Scrolling Left) */}
        <div className="relative flex overflow-hidden mb-6">
          <div className="flex animate-scroll hover:pause-on-hover gap-6 px-3 w-max">
            {[...infraStack, ...infraStack, ...infraStack].map((tech, i) => (
              <TechBadge key={`infra-${i}`} {...tech} isActive={i === activeInfraIndex} />
            ))}
          </div>
        </div>

        {/* Row 2: Development & Data (Scrolling Right) */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-scroll-reverse hover:pause-on-hover gap-6 px-3 w-max">
            {[...devStack, ...devStack, ...devStack].map((tech, i) => (
              <TechBadge key={`dev-${i}`} {...tech} isActive={i === activeDevIndex} />
            ))}
          </div>
        </div>
        
        {/* Gradients for fading edges */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#0d1117] to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#0d1117] to-transparent pointer-events-none"></div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-white">Certifications</h2>
          <div className="h-px bg-gray-800 flex-grow"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            {/* AWS */}
            <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 flex items-start gap-4 hover:border-blue-500/50 transition-colors group">
                <div className="p-3 bg-blue-900/20 text-blue-400 rounded-lg shrink-0 group-hover:text-blue-300">
                    <Cloud size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">AWS Certified Cloud Practitioner</h3>
                    <p className="text-gray-400 text-sm mt-1">Amazon Web Services • 2024</p>
                </div>
            </div>

            {/* OCI Associate Architect */}
             <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 flex items-start gap-4 hover:border-red-500/50 transition-colors group">
                <div className="p-3 bg-red-900/20 text-red-400 rounded-lg shrink-0 group-hover:text-red-300">
                    <Award size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">OCI Associate Architect</h3>
                    <p className="text-gray-400 text-sm mt-1">Oracle Cloud Infrastructure</p>
                </div>
            </div>
            
            {/* OCI Foundational Associate */}
             <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 flex items-start gap-4 hover:border-red-500/50 transition-colors group">
                <div className="p-3 bg-red-900/20 text-red-400 rounded-lg shrink-0 group-hover:text-red-300">
                    <Award size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">OCI Foundational Associate</h3>
                    <p className="text-gray-400 text-sm mt-1">Oracle Cloud Infrastructure</p>
                </div>
            </div>

             {/* OCI Foundational AI */}
             <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 flex items-start gap-4 hover:border-red-500/50 transition-colors group">
                <div className="p-3 bg-red-900/20 text-red-400 rounded-lg shrink-0 group-hover:text-red-300">
                    <Cpu size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">OCI Foundational AI</h3>
                    <p className="text-gray-400 text-sm mt-1">Oracle Cloud Infrastructure</p>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0d1117] border-t border-gray-800 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/Vishhh03" className="text-gray-500 hover:text-white transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/VishalShaji" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:vishshaji03@gmail.com" className="text-gray-500 hover:text-white transition-colors">Email</a>
        </div>
        <p className="text-gray-600 text-sm">
          © 2025 Vishal Shaji. Built with React & Tailwind.
        </p>
        <p className="text-gray-700 text-xs mt-2 font-mono">
          Last deploy: {new Date().toLocaleDateString()}
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;