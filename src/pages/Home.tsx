import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { api } from '../lib/axios';
import { useToast } from '../components/Toast';

// --- TYPES ---
interface Post {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
}

// --- MOCK PROJECTS DATA (Update with real info) ---
const PROJECTS = [
  {
    id: 1,
    name: "Real-Time Auction Engine",
    description: "Real-time bidding engine handling race conditions and ensuring data integrity under high concurrency using pessimistic locking and atomic transactions.",
    stack: "Node | Docker | Redis",
    link: "https://github.com/psyberpath/nestjs-auction-system.git"
  },
  {
    id: 2,
    name: "Veriflow IDV Engine",
    description: "Asynchronous identity verification orchestration engine featuring event-driven architecture, real-time WebSocket feedback, and multi-signal fraud detection.",
    stack: "Node | BullMQ | Websockets",
    link: "#"
  },
  {
    id: 3,
    name: "Didara CMS",
    description: "Modular Content Management System (CMS) powering this site. Implements role-based security, database migrations, and high-performance caching strategies.",
    stack: "Node | TypeORM | Docker",
    link: "#"
  }
];

export default function Home() {
  // 1. DATA FETCHING (Calling your API)
  const { data: posts, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await api.get('/posts');
      return res.data;
    },
  });

  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);

  // Animation Variants
  const containerVariants = { show: { transition: { staggerChildren: 0.1 } } };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const { showToast } = useToast();

  const handleHireMe = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop immediate open
    showToast("Initializing secure mail channel...");
    
    // Wait 1.5s then open mail
    setTimeout(() => {
      window.location.href = "mailto:email@me.com";
    }, 1500);
  };

  return (
    <>

      <section className="mt-12 md:mt-24 mb-32 max-w-6xl ml-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center">

        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-1/3 relative z-10 flex justify-center md:justify-start"
        >
          <div
            className="relative w-full max-w-[300px] md:max-w-[380px]"
            style={{
              // THE FIX: This fades the edges of the square container
              maskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)'
            }}
          >
            <img
              src="/victorD.png"
              alt="Victor Durosaro"
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* TEXT CONTAINER (Unchanged) */}
        {/* <div className="w-full md:w-2/3 pt-8 md:pt-0 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif font-bold leading-[0.9] tracking-tight text-[#2D2D2D] mb-6"
          >
            I build logic for the <br />
            <span className="text-[#898681] italic font-light font-serif">invisible world.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col md:flex-row gap-8 font-sans text-base text-[#5a5a5a] max-w-2xl leading-relaxed"
          >
            <p>
              There is an elegance to systems that run silently. I’m a Backend Engineer focused on high-concurrency architectures, distributed systems, and the ethics of the code we deploy.
            </p>
            <div className="flex flex-col gap-2 font-mono text-xs text-[#898681] uppercase tracking-widest pt-1 min-w-[140px]">
              <span>Based in Lagos</span>
              <span>Open for Work</span>
            </div>
          </motion.div>
        </div>
      </section> */}

        {/* TEXT CONTAINER */}
        <div className="w-full md:w-2/3 pt-8 md:pt-0 text-center md:text-left">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold leading-[1.05] tracking-tight text-[#2D2D2D] mb-8"
          >
            Solid Architecture.<br />
            <span className="text-[#898681] italic font-serif font-light">Systems that Scale..</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-6 font-sans text-base md:text-lg text-[#5a5a5a] max-w-2xl leading-relaxed mx-auto md:mx-0"
          >
            <p>
              I write code to solve problems. I love building cool stuff. As said in my headlines, I prioritize <strong className="text-[#2D2D2D] font-medium">clean patterns</strong>, <strong className="text-[#2D2D2D] font-medium">scalable decisions</strong>, and—most importantly—the end-user experience.
            </p>

            <p>
              I don't know everything, but I can figure anything out, and I am currently looking for high-autonomy roles where I can contribute to <strong className="text-[#2D2D2D] font-medium">meaningful engineering challenges</strong>. If your culture is built on <strong className="text-[#2D2D2D] font-medium">rapid iteration</strong>, <strong className="text-[#2D2D2D] font-medium">radical candor</strong>, and building things that actually matter, hire me.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-6 pt-6">

              <a
                onClick={handleHireMe}
                className="px-8 py-3 bg-[#2D2D2D] text-[#F4F0E8] rounded-full font-mono text-xs uppercase tracking-widest hover:bg-[#C65D3B] transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
              >
                Let's Talk
              </a>

              <Link
                to="/projects"
                className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#2D2D2D] border-b border-[#2D2D2D]/30 pb-1 hover:border-[#C65D3B] hover:text-[#C65D3B] transition-all duration-300"
              >
                Show me the Code
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: PROJECTS --- */}
      <section className="w-full mb-32">
        <div className="flex items-center justify-between border-b border-[#D3D9D4] pb-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#898681]">Featured Works</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#898681]">/ PROJECTS</span>
        </div>

        <div className="flex flex-col">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-b border-[#D3D9D4] py-8 flex flex-col md:flex-row md:items-center justify-between transition-all duration-500 hover:bg-[#EBE7DF]/30"
            >
              <div className="md:w-1/3">
                <h3 className="text-xl md:text-2xl font-tech font-bold text-[#2D2D2D] group-hover:text-[#C65D3B] transition-colors uppercase tracking-tight">
                  {project.name}
                </h3>
              </div>
              <div className="md:w-1/3 mt-2 md:mt-0">
                <p className="font-sans text-sm text-[#5a5a5a] group-hover:text-[#2D2D2D] transition-colors">
                  {project.description}
                </p>
              </div>
              <div className="md:w-1/3 mt-4 md:mt-0 flex justify-between md:justify-end items-center gap-8">
                <span className="font-mono text-xs text-[#898681] uppercase tracking-wider">
                  [{project.stack}]
                </span>
                <ArrowRight size={18} className="text-[#C65D3B] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: WEBLOGS (Connected to API) --- */}
      <section className="w-full">
        <div className="flex items-center justify-between border-b border-[#D3D9D4] pb-4 mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#898681]">Latest Entries</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#898681]">
            {isLoading ? 'SYNCING...' : `/ ${posts?.length || '00'}`}
          </span>
        </div>

        {isLoading && <div className="py-12 font-mono text-sm text-[#898681] animate-pulse"> Initializing connection...</div>}
        {isError && <div className="py-12 font-mono text-sm text-red-500"> Error: Connection refused. check_logs()</div>}

        <motion.div key={posts?.length}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col">
          {posts?.map((post) => (
            <Link to={`/weblogs/${post.slug}`} key={post.id}>
              <motion.article
                variants={itemVariants}
                onMouseEnter={() => setHoveredPostId(post.id)}
                onMouseLeave={() => setHoveredPostId(null)}
                className={`group py-10 border-b border-[#D3D9D4] flex flex-col md:flex-row md:items-baseline justify-between transition-all duration-500 ease-out cursor-pointer ${hoveredPostId && hoveredPostId !== post.id ? 'opacity-40 blur-[1px]' : 'opacity-100'}`}
              >
                <div className="flex flex-col">
                  <h2 className="text-3xl font-serif text-[#2D2D2D] group-hover:translate-x-4 transition-transform duration-500 ease-[0.22,1,0.36,1]">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-500 text-[#C65D3B] font-mono text-xs uppercase tracking-wider">
                    <span>Read Entry</span><ArrowRight size={14} />
                  </div>
                </div>
                <div className="font-mono text-xs text-[#898681] mt-4 md:mt-0 whitespace-nowrap">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </section >
    </>
  );
}
