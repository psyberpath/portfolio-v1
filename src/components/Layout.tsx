import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, ArrowUpRight, Mail, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '../lib/axios';
import { useToast } from '../components/Toast';

import HealthCheck from './HealthCheck';
import LoginModal from './LoginModal';

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={`w-4 h-4 ${className}`} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const CreativeMenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="flex flex-col items-end justify-center w-8 h-8 gap-1.5 pointer-events-none">
    <span
      className={`h-[2px] bg-[#2D2D2D] transition-all duration-300 ease-out origin-center
      ${isOpen ? 'w-8 rotate-45 translate-y-[9px]' : 'w-8'}`}
    />

    <span
      className={`h-[2px] bg-[#2D2D2D] transition-all duration-300 ease-out 
      ${isOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'}`}
    />

    <span
      className={`h-[2px] bg-[#2D2D2D] transition-all duration-300 ease-out origin-center
      ${isOpen ? 'w-8 -rotate-45 -translate-y-[5px]' : 'w-4'}`}
    />
  </div>
);

const NavLink = ({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link to={to} onClick={onClick} className="relative group inline-block">
      <span className={`
        font-mono text-xs uppercase tracking-widest md:text-xs md:font-mono 
        transition-colors duration-300
        ${isActive ? 'text-[#2D2D2D]' : 'text-[#898681] group-hover:text-[#C65D3B]'}
      `}>
        {label}
      </span>
      {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C65D3B]" />}
    </Link>
  );
};

export default function Layout() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { showToast } = useToast();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await api.post('/newsletter/subscribe', { email });
      return res.data;
    },
    onSuccess: () => {
      showToast("Subscription Confirmed. Welcome.");
      setEmail('');
    },
    onError: (error: any) => {
      console.error(error);
      showToast("Transmission Error. Please try again.");
    }
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeMutation.mutate(email);
  };

  const handleHireMe = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast("Initializing secure mail channel...");
    setTimeout(() => {
      window.location.href = "mailto:your@email.com";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F0E8] text-[#2D2D2D]">

      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-start md:items-center z-50 bg-[#F4F0E8]/85 backdrop-blur-md border-b border-[#D3D9D4]/30 transition-all duration-300">

        {/* LOGO: Brutalist Stack on Mobile */}
        <Link to="/" className="font-brand font-extrabold text-2xl md:text-3xl tracking-tight text-[#2D2D2D] hover:text-[#C65D3B] transition-colors flex flex-col leading-[0.85] z-[70] relative">
          <span>VICTOR</span>
          <span>DUROSARO</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          <NavLink to="/" label="Home" />
          <NavLink to="/projects" label="Projects" />
          <NavLink to="/weblogs" label="Weblogs" />
          <NavLink to="/randoms" label="Randoms" />
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-5 border-r border-[#D3D9D4] pr-6 text-[#2D2D2D]">
            <a href="https://github.com/psyberpath" target="_blank" className="hover:text-[#C65D3B] hover:-translate-y-0.5 transition-all"><Github size={18} strokeWidth={1.5} /></a>
            <a href="https://linkedin.com/in/victor-durosaro" target="_blank" className="hover:text-[#C65D3B] hover:-translate-y-0.5 transition-all"><Linkedin size={18} strokeWidth={1.5} /></a>
            <a href="https://x.com/0b1dotdev?s=21" target="_blank" className="hover:text-[#C65D3B] hover:-translate-y-0.5 transition-all"><XLogo /></a>
          </div>

          <a onClick={handleHireMe} className="bg-[#2D2D2D] text-[#F4F0E8] px-5 py-2 rounded-full hover:bg-[#C65D3B] transition-colors duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md">
            <span className="font-mono text-xs uppercase tracking-wider">Hire Me</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-[70] relative p-2 -mr-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <CreativeMenuIcon isOpen={isMobileMenuOpen} />
        </button>

      </header>

      {/* --- MOBILE FULLSCREEN OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-[#F4F0E8] flex flex-col pt-32 px-6 md:hidden overflow-y-auto"
            data-lenis-prevent // Tells Lenis to ignore scroll inside this menu
          >
            {/* LARGE MOBILE LINKS */}
            <div className="flex flex-col items-start gap-6 mb-12">
              {[
                { to: "/", label: "Home" },
                { to: "/projects", label: "Projects" },
                { to: "/weblogs", label: "Weblogs" },
                { to: "/randoms", label: "Randoms" }
              ].map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-sans uppercase text-2xl text-[#2D2D2D] hover:text-[#C65D3B] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* MOBILE ACTIONS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto pb-12 border-t border-[#D3D9D4] pt-8"
            >
              <a onClick={handleHireMe} className="w-full bg-[#2D2D2D] text-[#F4F0E8] py-4 rounded-sm hover:bg-[#C65D3B] transition-colors duration-300 flex justify-center items-center gap-2 mb-8 uppercase font-mono text-xs tracking-widest cursor-pointer shadow-lg">
                Hire Me <ArrowUpRight size={14} />
              </a>

              <div className="flex justify-between items-center text-[#2D2D2D]">
                <div className="flex gap-8">
                  <a href="https://github.com/psyberpath" target="_blank"><Github size={24} strokeWidth={1.5} /></a>
                  <a href="https://linkedin.com/in/victor-durosaro" target="_blank"><Linkedin size={24} strokeWidth={1.5} /></a>
                  <a href="https://x.com/0b1dotdev?s=21" target="_blank"><XLogo className="w-6 h-6" /></a>
                </div>
                <HealthCheck />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-20">
        <Outlet />
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 pb-12 pt-12 md:pt-20 border-t border-[#D3D9D4]/50 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">

          <div className="w-full max-w-md">
            <h4 className="font-serif text-2xl text-[#2D2D2D] mb-2">subscribe to my newsletter</h4>
            <p className="font-sans text-sm text-[#898681] mb-6 leading-relaxed">
              I write about interesting stuff I'm exploring, technical and non-technical: things I build, tools I use and how I use them, personal experiments, experiences and observations, occasional rants, counterintuitive philosophies, and everything inbetween..
            </p>

            <form onSubmit={handleSubscribe} className="relative w-full group">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-[#898681] group-focus-within:text-[#C65D3B] transition-colors" size={18} />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribeMutation.isPending}
                className="w-full bg-transparent border-b border-[#898681] py-3 pl-8 pr-12 font-mono text-sm focus:outline-none focus:border-[#C65D3B] transition-colors placeholder:text-[#D3D9D4] text-[#2D2D2D]"
              />
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-[#C65D3B] transition-colors disabled:opacity-50"
              >
                {subscribeMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <ArrowUpRight size={18} />}
              </button>
            </form>
          </div>

          <div className="flex flex-col items-end gap-3 text-[10px] font-mono tracking-widest text-[#898681] uppercase">
            <div className="flex items-center gap-2">
              <span className="opacity-50">System Status:</span>
              <HealthCheck />
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setIsLoginOpen(true)} className="hover:text-[#2D2D2D] transition-colors">
                Admin Entry
              </button>
              <span>&copy; {new Date().getFullYear()} Victor Durosaro</span>
            </div>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}