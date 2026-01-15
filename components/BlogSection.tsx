"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from './Link';

interface BlogPost {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: 'Photographs',
    date: 'Jul 01, 2024',
    title: 'Capturing speed in low light conditions',
    excerpt: 'Professional photography techniques for shooting the Braxx GT series at dusk.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop'
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
  }
];

export const BlogSection = () => {
  return (
    <section className="bg-[#d4d4d4] py-12">
      <div className="px-8 lg:px-24 mb-12">
        <div className="flex items-center justify-between pb-8 border-b border-black/10">
          <h2 className="text-6xl lg:text-8xl font-black italic text-black tracking-tighter leading-none">
            LATEST <br /> <span className="text-transparent border-text-black" style={{ WebkitTextStroke: '1px black' }}>NEWS</span>
          </h2>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all"
          >
            VIEW ALL <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 lg:px-24 pb-12">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            className="group relative h-[500px] rounded-[3rem] overflow-hidden border border-black/5 bg-white transition-all duration-700 hover:shadow-2xl"
          >
            <div
              className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
              style={{ backgroundImage: `url(${post.image})` }}
            >
              <div className="absolute inset-0 bg-white/80 group-hover:bg-black/50 transition-colors duration-700 backdrop-blur-[1px]"></div>
            </div>

            <div className="relative z-10 h-full p-10 flex flex-col justify-start space-y-6">
              <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase transition-colors duration-500 text-black/40 group-hover:text-white/60">
                <span>{post.category}</span>
                <span className="w-1.5 h-px bg-current opacity-50"></span>
                <span>{post.date}</span>
              </div>

              <h3 className="text-xl font-black tracking-tight leading-tight transition-all duration-500 text-black group-hover:text-white group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                {post.title}
              </h3>

              <p className="text-[11px] font-bold leading-relaxed transition-all duration-500 text-black/60 group-hover:text-gray-200">
                {post.excerpt}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-black/5 group-hover:bg-[#e2ff4a] transition-all duration-700"></div>
          </div>
        ))}
      </div>
    </section>
  );
};
