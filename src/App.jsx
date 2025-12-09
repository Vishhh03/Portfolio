import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cloud, 
  Server, 
  Code, 
  Database, 
  Cpu, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ChevronRight,
  Globe
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const fullText = "deploying_infrastructure...";

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  const skills = {
    cloud: ["AWS (EC2, Lambda, S3)", "ECS & SNS", "Cognito", "CloudWatch", "IAM"],
    devops: ["Docker", "Kubernetes", "Jenkins", "Terraform", "GitHub Actions", "Prometheus", "Grafana", "ELK Stack"],
    backend: ["Python", "C# / .NET Core", "Node.js", "FastAPI", "PostgreSQL", "SQL Server", "DynamoDB"],
    frontend: ["Angular", "React", "Next.js", "Tailwind CSS", "Sanity CMS"]
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0d1117]/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-blue-400 font-mono font-bold text-xl flex items-center gap-2">
            <Terminal size={20} />
            <span>~/vishal-shaji</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['About', 'Experience', 'Projects', 'Skills'].map((item) => (
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
      <section id="home" className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
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

          {/* Terminal Window */}
          <div className="bg-[#161b22] rounded-xl border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm">
            <div className="bg-[#0d1117] px-4 py-2 border-b border-gray-800 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-2 text-green-400">
                <span>➜</span>
                <span>~</span>
                <span className="text-white">init_portfolio.sh</span>
              </div>
              <div className="text-gray-400 pl-4">
                Initializing environment...<br/>
                Loading modules: AWS, Docker, Terraform...<br/>
                <span className="text-blue-400">{typedText}</span><span className="animate-pulse">_</span>
              </div>
              
              <div className="border-t border-gray-800 my-4"></div>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-500">Current Role</span>
                  <div className="text-white mt-1">DevOps Engineer @ Cognizant</div>
                </div>
                <div>
                  <span className="text-gray-500">Location</span>
                  <div className="text-white mt-1">Kochi, India</div>
                </div>
                <div>
                  <span className="text-gray-500">Education</span>
                  <div className="text-white mt-1">B.Tech Civil (Minor in ML)</div>
                </div>
                <div>
                  <span className="text-gray-500">Focus</span>
                  <div className="text-white mt-1">Cloud Architecture</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-[#161b22]/50 border-y border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-white">Experience</h2>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>

          <div className="relative border-l border-gray-800 ml-3 space-y-12">
            {/* Job 1 */}
            <div className="pl-10 relative group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Cognizant Technology Solutions</h3>
                <span className="text-sm font-mono text-gray-500 bg-gray-800/50 px-3 py-1 rounded">July 2025 – Present</span>
              </div>
              <div className="text-blue-400 font-medium mb-4">Programmer Analyst Trainee</div>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  Led a 5-member team modernizing a full-stack web platform while integrating DevOps practices.
                </li>
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  Containerized the Smart Hotel Management System (Angular + .NET) using Docker.
                </li>
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  Implemented CI/CD pipelines via GitHub Actions and integrated Prometheus/Grafana monitoring.
                </li>
              </ul>
            </div>

            {/* Job 2 */}
            <div className="pl-10 relative group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-600 group-hover:bg-blue-500 transition-colors"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Bommaku Constructions</h3>
                <span className="text-sm font-mono text-gray-500 bg-gray-800/50 px-3 py-1 rounded">Jan 2025 – June 2025</span>
              </div>
              <div className="text-blue-400 font-medium mb-4">Tech Consultant (Intern)</div>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  Supported digital transformation through web, cloud, and visualization solutions.
                </li>
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  Designed Unreal Engine 5 architectural visualization and optimized website performance.
                </li>
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  Guided management on adopting cloud technologies for operational efficiency.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          <div className="h-px bg-gray-800 flex-grow"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project 1 */}
          <div className="group bg-[#161b22] border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/10 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-900/20 text-blue-400 rounded-lg">
                <Server size={24} />
              </div>
              <a href="https://terraless.com" className="text-gray-500 hover:text-white transition-colors">
                <ExternalLink size={20} />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Terraless Hosting</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Minecraft server hosting platform using AWS EC2 Spot Instances and Lambda. Features a full serverless backend architecture for cost optimization.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['Next.js', 'AWS Lambda', 'DynamoDB', 'Cognito'].map(tech => (
                <span key={tech} className="text-xs font-mono text-blue-300 bg-blue-900/10 px-2 py-1 rounded border border-blue-900/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project 2 */}
          <div className="group bg-[#161b22] border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/10 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-purple-900/20 text-purple-400 rounded-lg">
                <Globe size={24} />
              </div>
              <a href="https://idha.vercel.app" className="text-gray-500 hover:text-white transition-colors">
                <ExternalLink size={20} />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Idha Art Stay</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Production-grade client website with automated build pipelines. Integrated Sanity CMS and deployed to Cloudflare with global CDN caching.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['Next.js', 'Sanity CMS', 'Cloudflare', 'GitHub Actions'].map(tech => (
                <span key={tech} className="text-xs font-mono text-purple-300 bg-purple-900/10 px-2 py-1 rounded border border-purple-900/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project 3 */}
          <div className="group bg-[#161b22] border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/10 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-green-900/20 text-green-400 rounded-lg">
                <Database size={24} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Smart Hotel Sys</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Full-stack modernization project. Containerized application, set up CI/CD, and integrated ELK Stack for log management.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['Angular', '.NET Core', 'Docker', 'SQL Server'].map(tech => (
                <span key={tech} className="text-xs font-mono text-green-300 bg-green-900/10 px-2 py-1 rounded border border-green-900/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-[#161b22]/50 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-white">Technical Arsenal</h2>
            <div className="h-px bg-gray-800 flex-grow"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4 text-blue-400">
                  <Cloud size={20} />
                  <h3 className="font-bold text-white">Cloud Architecture</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.cloud.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-[#0d1117] border border-gray-800 rounded text-sm text-gray-300 hover:border-blue-500 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 text-green-400">
                  <Server size={20} />
                  <h3 className="font-bold text-white">DevOps & CICD</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.devops.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-[#0d1117] border border-gray-800 rounded text-sm text-gray-300 hover:border-green-500 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4 text-purple-400">
                  <Code size={20} />
                  <h3 className="font-bold text-white">Backend & Scripting</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-[#0d1117] border border-gray-800 rounded text-sm text-gray-300 hover:border-purple-500 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 text-yellow-400">
                  <Cpu size={20} />
                  <h3 className="font-bold text-white">Frontend & Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-[#0d1117] border border-gray-800 rounded text-sm text-gray-300 hover:border-yellow-500 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
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