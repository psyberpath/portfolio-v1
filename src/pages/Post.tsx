
// import { useParams, Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { formatDistanceToNow } from 'date-fns';
// import ReactMarkdown from 'react-markdown';
// import { motion, useScroll, useSpring } from 'framer-motion';
// import { ArrowLeft } from 'lucide-react';
// import { api } from '../lib/axios';
// import ParallaxImage from '../components/ParallaxImage';

// interface Post {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   author: {
//     name: string;
//   };
// }

// export default function Post() {
//   const { id } = useParams<{ id: string }>();
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   const { data: post, isLoading, isError } = useQuery<Post>({
//     queryKey: ['post', id],
//     queryFn: async () => {
//       const res = await api.get(`/posts/${id}`);
//       return res.data;
//     },
//     enabled: !!id,
//   });

//   if (isLoading) {
//     return (
//       <div className="pt-20 md:pt-32 animate-pulse">
//         <div className="h-12 bg-stone/20 w-3/4 mb-8 rounded-sm"></div>
//         <div className="space-y-4">
//           <div className="h-4 bg-stone/10 w-full rounded-sm"></div>
//           <div className="h-4 bg-stone/10 w-full rounded-sm"></div>
//           <div className="h-4 bg-stone/10 w-2/3 rounded-sm"></div>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !post) {
//     return (
//       <div className="pt-32">
//         <p className="text-stone mb-4">Thought not found.</p>
//         <Link to="/" className="text-charcoal hover:text-burnt-sienna underline decoration-burnt-sienna/30 underline-offset-4">
//           Return to Index
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <>
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-1 bg-burnt-sienna origin-left z-50"
//         style={{ scaleX }}
//       />

//       <article className="pt-12 md:pt-20 pb-32">
//         <Link
//           to="/"
//           className="inline-flex items-center gap-2 text-stone hover:text-charcoal transition-colors mb-12 text-sm font-mono uppercase tracking-wider group"
//         >
//           <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
//           Index
//         </Link>

//         <header className="mb-16 md:mb-24">
//           <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-charcoal mb-8 text-balance">
//             {post.title}
//           </h1>
//           <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm font-mono text-stone border-t border-sage/30 pt-6">
//             <span className="text-charcoal font-medium">{post.author.name}</span>
//             <span className="hidden md:inline text-sage">•</span>
//             <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
//           </div>
//         </header>

//         <div className="prose prose-lg prose-stone max-w-none font-serif prose-headings:font-serif prose-headings:font-normal prose-p:text-charcoal/90 prose-a:text-burnt-sienna prose-a:no-underline prose-a:border-b prose-a:border-burnt-sienna/30 hover:prose-a:border-burnt-sienna prose-a:transition-colors prose-code:font-mono prose-code:text-sm prose-code:bg-stone/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-pre:bg-charcoal prose-pre:text-isabelline prose-pre:rounded-sm prose-img:rounded-sm prose-img:shadow-layered">
//           <ReactMarkdown
//             components={{
//               img: ({ node, ...props }) => <ParallaxImage {...props} />
//             }}
//           >
//             {post.content}
//           </ReactMarkdown>
//         </div>
//       </article>
//     </>
//   );
// }

import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { api } from '../lib/axios';

// Import a light theme for code blocks to match the "Paper" aesthetic
// You can swap 'github' for 'ascetic' or 'stackoverflow-light' if preferred
import 'highlight.js/styles/github.css';

import ParallaxImage from '../components/ParallaxImage';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    email: string;
  };
}

export default function Post() {
  // 1. CHANGED: Capture 'slug' instead of 'id'
  const { slug } = useParams<{ slug: string }>();

  // 2. SCROLL PROGRESS (The "Reading Meter")
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3. DATA FETCHING
  const { data: post, isLoading, isError } = useQuery<Post>({
    queryKey: ['post', slug], // Cache by slug
    queryFn: async () => {
      // Ensure your Backend API supports fetching by slug: GET /posts/:slug
      const res = await api.get(`/posts/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });

  // LOADING STATE (Terminal Style)
  if (isLoading) {
    return (
      <div className="pt-32 px-6 md:px-0 max-w-3xl mx-auto space-y-8 animate-pulse">
        <div className="h-12 bg-[#D3D9D4] w-3/4 rounded-sm opacity-50"></div>
        <div className="space-y-4 pt-12">
          <div className="h-4 bg-[#D3D9D4] w-full rounded-sm opacity-30"></div>
          <div className="h-4 bg-[#D3D9D4] w-full rounded-sm opacity-30"></div>
          <div className="h-4 bg-[#D3D9D4] w-2/3 rounded-sm opacity-30"></div>
        </div>
        <div className="font-mono text-xs text-[#898681] pt-4"> Retrieving data blocks...</div>
      </div>
    );
  }

  // ERROR STATE
  if (isError || !post) {
    return (
      <div className="pt-32 max-w-3xl mx-auto px-6">
        <p className="font-mono text-red-500 mb-4"> Error: 404 Data Corrupted.</p>
        <Link to="/" className="font-serif italic text-[#2D2D2D] hover:text-[#C65D3B] transition-colors">
          Return to the Index
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* READING PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#C65D3B] origin-left z-[60]"
        style={{ scaleX }}
      />

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pt-12 md:pt-20 pb-32 max-w-3xl mx-auto px-6 md:px-0"
      >
        {/* BACK NAVIGATION */}
        {/* <Link
          to="/"
          className="group inline-flex items-center gap-2 text-[#898681] hover:text-[#C65D3B] transition-colors mb-12 text-xs font-mono uppercase tracking-widest"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Index
        </Link> */}
        {/* Change the Back Link */}
        <Link
          to="/weblogs" // Points to the archive now
          className="group inline-flex items-center gap-2 text-[#898681] hover:text-[#C65D3B] transition-colors mb-12 text-xs font-mono uppercase tracking-widest"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Archive
        </Link>

        {/* HEADER */}
        <header className="mb-16 md:mb-20 border-b border-[#D3D9D4] pb-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-xs font-mono text-[#898681] mb-8">
            <time>{format(new Date(post.createdAt), 'MMMM dd, yyyy')}</time>
            <span className="hidden md:inline text-[#D3D9D4]">/</span>
            <span className="uppercase tracking-widest">{post.author?.name || 'The Psyberpath'}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[1.05] text-[#2D2D2D] text-balance">
            {post.title}
          </h1>
        </header>

        {/* CONTENT (The "Paper" Rendering) */}
        <div className="
          prose prose-lg prose-stone max-w-none 
          
          /* Text Styling */
          prose-p:text-[#2D2D2D] prose-p:leading-[1.8] prose-p:font-sans
          prose-headings:font-serif prose-headings:text-[#2D2D2D] prose-headings:font-bold
          prose-strong:text-[#2D2D2D] prose-strong:font-bold
          
          /* Link Styling */
          prose-a:text-[#C65D3B] prose-a:no-underline prose-a:border-b prose-a:border-[#C65D3B]/30 hover:prose-a:border-[#C65D3B] prose-a:transition-all
          
          /* Code Block Styling - THE KEY CHANGE */
          /* We revert the dark mode default and make it look like paper documentation */
          prose-code:font-mono prose-code:text-[#C65D3B] prose-code:bg-[#EBE7DF] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-normal prose-code:text-[0.9em]
          prose-pre:bg-[#F9F9F9] prose-pre:text-[#2D2D2D] prose-pre:border prose-pre:border-[#D3D9D4] prose-pre:rounded-sm prose-pre:shadow-sm
          
          /* Image Styling */
          prose-img:rounded-sm prose-img:grayscale hover:prose-img:grayscale-0 prose-img:transition-all prose-img:duration-700
          
          /* List Styling */
          prose-li:marker:text-[#C65D3B]
        ">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]} // Enables syntax highlighting
            components={{
              // Keep your custom Parallax Image component
              img: ({ node, ...props }) => <ParallaxImage {...props} />
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* FOOTER SIGNATURE */}
        <div className="mt-24 pt-8 border-t border-[#D3D9D4] flex justify-between items-center text-[#898681] font-mono text-xs">
          <span>// END OF LOG</span>
          <span>ID: {post.id.slice(0, 8)}</span>
        </div>

      </motion.article>
    </>
  );
}
