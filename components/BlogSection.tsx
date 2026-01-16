"use client";

import React, { useState, useMemo, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: 'Technology',
    date: 'Jan 13, 2023',
    title: 'iPhone is bound to make an impact in your business',
    excerpt: 'Mauris sodales faucibus risus donec. Eu, nibh morbi egestas et congue a odio velit massa.',
    image: 'https://images.unsplash.com/photo-1556656793-062ff9878258?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    category: 'Life Style',
    date: 'Jan 13, 2023',
    title: 'Are you embarrassed by your car skills? Here\'s what to do',
    excerpt: 'Mauris sodales faucibus risus donec. Eu, nibh morbi egestas et congue a odio velit massa.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    category: 'Photographs',
    date: 'Jan 13, 2023',
    title: 'How 7 things will change the way you approach photographs',
    excerpt: 'Tincidunt dolor neque, risus aliquet ac cursus sodales placerat.',
    image: 'https://images.unsplash.com/photo-1452784444945-3f422708fe5e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    category: 'Technology',
    date: 'Jan 13, 2023',
    title: 'Cosmonauts prep for spacewalk',
    excerpt: 'Morbi nisi, pellentesque enim amet, vitae adipiscing elit. Sollicitudin feugiat.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    category: 'Racing',
    date: 'Feb 10, 2024',
    title: 'The future of electric motorcross is here',
    excerpt: 'Experience the silence and torque that only electric platforms can provide in competitive circuits.',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    category: 'Maintenance',
    date: 'Mar 05, 2024',
    title: 'Top 10 tips for E-Moto battery longevity',
    excerpt: 'Maximize your range and battery health with these tactical maintenance protocols.',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 7,
    category: 'Technology',
    date: 'Apr 12, 2024',
    title: 'The physics of silence: Why Braxx is quiet',
    excerpt: 'Deep dive into our drive-train harmonics and why noise is the enemy of performance.',
    image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 8,
    category: 'Life Style',
    date: 'May 20, 2024',
    title: 'Urban Exploration: Los Angeles after midnight',
    excerpt: 'Navigating the grid with silent precision. A guide to the city\'s hidden routes.',
    image: 'https://images.unsplash.com/photo-1558980331-0672ff794669?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 9,
    category: 'Racing',
    date: 'Jun 15, 2024',
    title: 'Setting a new record at the canyon run',
    excerpt: 'How our proprietary motor controller handled the elevation changes of Mulholland.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 10,
    category: 'Photographs',
    date: 'Jul 01, 2024',
    title: 'Capturing speed in low light conditions',
    excerpt: 'Professional photography techniques for shooting the Braxx GT series at dusk.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop'
  }
];

interface BlogSectionProps {
  layout?: 'grid' | 'scroll';
  showViewAll?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  layout = 'grid',
  showViewAll = true
}) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(BLOG_POSTS.map(p => p.category.toUpperCase())));
    return ['ALL', ...cats];
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'ALL') return BLOG_POSTS;
    return BLOG_POSTS.filter(p => p.category.toUpperCase() === activeFilter);
  }, [activeFilter]);

  // For grid layout on homepage, show only first 4 posts
  const displayPosts = layout === 'grid' ? filteredPosts.slice(0, 4) : filteredPosts;

  // Arrow scroll handlers (only used in scroll layout)
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.offsetWidth * 0.25;
    scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.offsetWidth * 0.25;
    scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  // Blog card component to avoid duplication
  const BlogCard = ({ post }: { post: BlogPost }) => (
    <div
      className={`group relative h-[400px] sm:h-[450px] md:h-[500px] rounded-2xl sm:rounded-4xl md:rounded-[3rem] overflow-hidden border border-black/5 bg-white transition-all duration-700 hover:shadow-2xl ${layout === 'scroll' ? 'shrink-0 w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[22vw] snap-start' : ''
        }`}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="absolute inset-0 bg-white/80 group-hover:bg-black/50 transition-colors duration-700 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 h-full p-6 sm:p-8 md:p-10 flex flex-col justify-start space-y-4 sm:space-y-6">
        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black tracking-widest uppercase transition-colors duration-500 text-black/40 group-hover:text-white/60">
          <span>{post.category}</span>
          <span className="w-1 sm:w-1.5 h-px bg-current opacity-50"></span>
          <span>{post.date}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-black tracking-tight leading-tight transition-all duration-500 text-black group-hover:text-white group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
          {post.title}
        </h3>

        <p className="text-[10px] sm:text-[11px] font-bold leading-relaxed transition-all duration-500 text-black/60 group-hover:text-gray-200 line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 sm:h-1.5 bg-black/5 group-hover:bg-[#e2ff4a] transition-all duration-700"></div>
    </div>
  );

  return (
    <section className="bg-[#d4d4d4] py-8 sm:py-12 overflow-hidden">
      <div className="px-4 sm:px-8 lg:px-24 mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center justify-between pb-6 sm:pb-8 border-b border-black/10 gap-y-4 sm:gap-y-6">
          {layout === 'grid' ? (
            // Grid layout header (Homepage style)
            <>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black italic text-black tracking-tighter leading-none">
                LATEST <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px black' }}>NEWS</span>
              </h2>
              {showViewAll && (
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all"
                >
                  VIEW ALL <ArrowRight size={14} />
                </Link>
              )}
            </>
          ) : (
            // Scroll layout header (Blog page style)
            <>
              <div className="flex items-center gap-12">
                <span className="text-sm font-black text-black uppercase tracking-[0.2em] italic">LATEST NEWS</span>

                <div className="hidden sm:flex flex-wrap gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-4 py-1.5 rounded-full text-[8px] font-black tracking-widest uppercase transition-all ${activeFilter === cat
                        ? 'bg-black text-white'
                        : 'bg-transparent text-black/40 hover:text-black'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-4">
                {filteredPosts.length > 4 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={scrollLeft}
                      className="w-10 h-10 rounded-full bg-black/5 hover:bg-black hover:text-white flex items-center justify-center transition-all duration-300"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={scrollRight}
                      className="w-10 h-10 rounded-full bg-black/5 hover:bg-black hover:text-white flex items-center justify-center transition-all duration-300"
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {layout === 'grid' ? (
        // Grid layout (Homepage)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-8 lg:px-24 pb-8 sm:pb-12">
          {displayPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        // Scroll layout (Blog page)
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory px-4 sm:px-8 lg:px-24 gap-4 sm:gap-6 pb-8 sm:pb-12 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {displayPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}

          {/* Spacer at the end for better scroll experience */}
          <div className="shrink-0 w-24"></div>
        </div>
      )}
    </section>
  );
};
