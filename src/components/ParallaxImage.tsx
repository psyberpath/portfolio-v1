import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxImage({ src, alt }: { src?: string; alt?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="overflow-hidden rounded-sm my-8 shadow-layered">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-auto scale-110"
      />
    </div>
  );
}
