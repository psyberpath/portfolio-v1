import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { api } from '../lib/axios';

export default function Weblogs() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => (await api.get('/posts')).data,
  });

  return (
    <div className="pt-0 md:pt-12 max-w-4xl mx-auto">
      {/* Header */}
      <section className="mb-12 md:mb-20 border-b border-[#D3D9D4] pb-8">
        <h1 className="font-serif text-4xl md:text-7xl text-[#2D2D2D] mb-6">Archive</h1>
        <p className="font-mono text-xs text-[#898681] uppercase tracking-widest">
          // Total Logs: {isLoading ? '...' : posts?.length || 0}
        </p>
      </section>

      {/* The Archive List */}
      <div className="flex flex-col">
        {posts?.map((post: any, i: number) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group"
          >
            <Link
              to={`/weblogs/${post.slug}`}
              className="flex flex-col md:flex-row md:items-baseline justify-between py-6 border-b border-[#D3D9D4] hover:bg-[#EBE7DF]/30 transition-colors px-4 -mx-4 rounded-sm"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                <span className="font-mono text-xs text-[#898681] w-24">
                  {format(new Date(post.createdAt), 'yyyy.MM.dd')}
                </span>
                <h2 className="font-serif text-2xl text-[#2D2D2D] group-hover:text-[#C65D3B] transition-colors leading-tight">
                  {post.title}
                </h2>
              </div>

              <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 text-[#C65D3B]">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}