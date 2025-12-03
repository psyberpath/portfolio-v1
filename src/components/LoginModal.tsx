import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { X, Lock, Loader2, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '../lib/axios'; // Ensure this points to your axios instance

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/auth/login', { email, password });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        onClose();
        navigate('/admin');
      } else {
        setError('Token missing in response');
      }
    },
    onError: (err: any) => {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#2D2D2D]/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#F4F0E8] rounded-sm shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-[#D3D9D4]">
            <h2 className="font-tech text-lg font-bold uppercase tracking-wider text-[#2D2D2D] flex items-center gap-2">
              <Lock size={16} /> Admin Access
            </h2>
            <button onClick={onClose} className="text-[#898681] hover:text-[#C65D3B] transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-sm text-xs font-mono flex items-center gap-2 border border-red-100">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-[#898681]">Identity</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#D3D9D4] p-3 font-sans text-sm focus:outline-none focus:border-[#C65D3B] transition-colors text-[#2D2D2D]"
                placeholder="admin@didara.dev"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-[#898681]">Passkey</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#D3D9D4] p-3 font-sans text-sm focus:outline-none focus:border-[#C65D3B] transition-colors text-[#2D2D2D]"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loginMutation.isPending}
              className="mt-4 w-full bg-[#2D2D2D] text-[#F4F0E8] py-3 rounded-sm font-mono text-xs uppercase tracking-widest hover:bg-[#C65D3B] transition-colors flex justify-center items-center gap-2"
            >
              {loginMutation.isPending ? <Loader2 className="animate-spin" size={16} /> : 'Authenticate'}
            </button>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}