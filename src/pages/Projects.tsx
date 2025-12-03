import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Github, Layers } from 'lucide-react';

// MOCK DATA (Keep your existing data)
const PROJECTS = [
  {
    id: 1,
    name: "Real-Time Auction Engine",
    description: "A high-concurrency platform architected with NestJS. Solved critical race conditions using PostgreSQL pessimistic locking within atomic transactions. Scaled read performance with Redis caching and delivered sub-50ms state synchronization via WebSockets.",
    stack: ["Node", "Redis", "PostgreSQL"],
    link: "https://github.com",
    year: "2025"
  },
  {
    id: 2,
    name: "Veriflow IDV Engine",
    description: "Event-driven identity verification engine architected with NestJS. Orchestrates asynchronous, multi-step workflows (document & biometric analysis) using BullMQ job queues, Redis caching, and a finite state machine to ensure data integrity and compliance.",
    stack: ["Node", "Postgres", "Docker"],
    link: "https://github.com",
    year: "2025"
  },
  {
    id: 3,
    name: "Didara CMS",
    description: "Production-grade Headless CMS API engineered for scale. Features secure JWT authentication, Redis caching, asynchronous job queues via BullMQ, and a fully Dockerized PostgreSQL infrastructure.",
    stack: ["Node", "Redis"],
    link: "https://github.com",
    year: "2025"
  },
  {
    id: 4,
    name: "OSS-001",
    description: "Approved PR to nestjs/nest repository to add support for fastify e2e tests",
    stack: ["Node", "Redis"],
    link: "https://github.com",
    year: "2025"
  }
];

export default function Projects() {
  // Animation stagger setup
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="pt-12 md:pt-24 max-w-screen-2xl mx-auto">

      {/* HEADER */}
      <section className="mb-24 border-b border-[#D3D9D4] pb-8 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl text-[#2D2D2D] mb-6">Dev and Prod</h1>
          <p className="font-mono text-xs text-[#898681] uppercase tracking-widest flex items-center gap-2">
            <Layers size={14} /> // Systems Engineering & Open Source
          </p>
        </div>
        <div className="hidden md:block font-mono text-xs text-[#898681] uppercase tracking-widest">
          Total Systems: {PROJECTS.length.toString().padStart(2, '0')}
        </div>
      </section>

      {/* THE MANIFEST LIST */}
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            variants={item}
            className="group relative border-b border-[#D3D9D4] py-12 transition-all duration-500 hover:bg-[#EBE7DF]/40 -mx-6 px-6 md:-mx-12 md:px-12"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12">

              {/* 1. IDENTITY (Left) */}
              <div className="md:w-1/4">
                <div className="flex items-baseline gap-4 mb-4">
                  <h3 className="font-tech text-3xl font-bold text-[#2D2D2D] uppercase tracking-tight group-hover:text-[#C65D3B] transition-colors">
                    {project.name}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#898681] border border-[#D3D9D4] px-3 py-1 rounded-full inline-block">
                  {project.year}
                </span>
              </div>

              {/* 2. LOGIC (Middle) */}
              <div className="md:w-2/4 max-w-2xl">
                <p className="font-sans text-lg text-[#5a5a5a] leading-relaxed group-hover:text-[#2D2D2D] transition-colors">
                  {project.description}
                </p>
              </div>

              {/* 3. SPECS & ACTIONS (Right) */}
              <div className="md:w-1/4 flex flex-col items-start md:items-end justify-between gap-8">

                {/* Tech Stack List */}
                <div className="font-mono text-xs text-[#898681] uppercase tracking-wider text-right">
                  {project.stack.join(" | ")}
                </div>

                {/* Action Icons (Slide in on hover) */}
                <div className="flex items-center gap-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                  <a href={project.link} target="_blank" aria-label="View Source" className="text-[#2D2D2D] hover:text-[#C65D3B] transition-colors">
                    <Github size={24} strokeWidth={1.5} />
                  </a>
                  <a href={project.link} target="_blank" aria-label="View Live" className="text-[#2D2D2D] hover:text-[#C65D3B] transition-colors">
                    <ArrowUpRight size={24} strokeWidth={1.5} />
                  </a>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}