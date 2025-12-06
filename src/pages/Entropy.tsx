import { motion } from 'framer-motion';
import { ExternalLink, Music } from 'lucide-react';

// Mock Data for "Randoms"
const ENTROPY_ITEMS = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop', caption: 'Lagos Brutalism' },
  { id: 2, type: 'link', title: 'The Stack Overflow Age', url: 'https://stackoverflow.com', caption: 'Interesting read on AI coding.' },
  { id: 3, type: 'music', title: 'Everything in its Right Place', artist: 'Radiohead', url: '#' },
  { id: 4, type: 'quote', text: "Simplicity is the ultimate sophistication.", author: "Da Vinci" },
  { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop', caption: 'Server Room Aesthetics' },
  // Add more items...
];

export default function Entropy() {
  return (
    <div className="pt-0 md:pt-12 min-h-screen">

      {/* HEADER */}
      <section className="mb-12 md:mb-20 border-b border-[#D3D9D4] pb-8 flex justify-between items-end">
        <div>
          <h1 className="font-brand font-extrabold text-4xl md:text-7xl text-[#2D2D2D] mb-4">ENTROPY</h1>
          <p className="font-mono text-xs text-[#898681] uppercase tracking-widest max-w-md leading-relaxed">
            // A collection of unstructured data. <br />
            // Photos, links, and opus from the system.
          </p>
        </div>
      </section>

      {/* MASONRY GRID (CSS Columns) */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {ENTROPY_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="break-inside-avoid mb-8"
          >
            {/* TYPE: IMAGE */}
            {item.type === 'image' && (
              <div className="group relative overflow-hidden rounded-sm">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-mono text-xs uppercase tracking-widest">{item.caption}</span>
                </div>
              </div>
            )}

            {/* TYPE: LINK */}
            {item.type === 'link' && (
              <a href={item.url} target="_blank" rel="noopener" className="block p-8 bg-[#EBE7DF]/40 border border-[#D3D9D4] hover:border-[#C65D3B] transition-colors group rounded-sm">
                <div className="flex justify-between items-start mb-4 text-[#898681] group-hover:text-[#C65D3B] transition-colors">
                  <ExternalLink size={20} />
                </div>
                <h3 className="font-serif text-2xl mb-2 text-[#2D2D2D]">{item.title}</h3>
                <p className="font-mono text-xs text-[#898681]">{item.caption}</p>
              </a>
            )}

            {/* TYPE: QUOTE */}
            {item.type === 'quote' && (
              <div className="p-8 bg-[#2D2D2D] text-[#F4F0E8] rounded-sm flex flex-col justify-center text-center">
                <p className="font-serif text-xl italic leading-relaxed mb-4">"{item.text}"</p>
                <span className="font-mono text-xs uppercase tracking-widest text-[#898681]">— {item.author}</span>
              </div>
            )}

            {/* TYPE: MUSIC */}
            {item.type === 'music' && (
              <div className="flex items-center gap-4 p-4 border border-[#D3D9D4] rounded-full hover:bg-white transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-[#C65D3B] rounded-full flex items-center justify-center text-white">
                  <Music size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-[#2D2D2D]">{item.title}</span>
                  <span className="font-mono text-xs text-[#898681]">{item.artist}</span>
                </div>
              </div>
            )}

          </motion.div>
        ))}
      </div>
    </div>
  );
}