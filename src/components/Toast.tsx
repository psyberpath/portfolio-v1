import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

const ToastContext = createContext<{ showToast: (msg: string) => void } | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-6 md:right-12 z-[100] flex items-center gap-3 bg-[#2D2D2D] text-[#F4F0E8] px-6 py-4 rounded-sm shadow-2xl border-l-2 border-[#C65D3B]"
          >
            <Terminal size={16} className="text-[#C65D3B]" />
            <span className="font-mono text-xs uppercase tracking-widest">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};