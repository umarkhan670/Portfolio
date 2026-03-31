/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Instagram, 
  Twitter, 
  Facebook,
  Youtube, 
  ArrowUpRight, 
  Globe, 
  Menu, 
  X,
  ArrowRight,
  Code,
  Terminal,
  Send
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'sonner';

// --- Constants ---

const PROJECTS_DATA = [
  { title: 'Regen Fiber', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', size: 'large', industry: 'Corporate', url: 'https://regenfiber.com' },
  { title: 'Raghavendra Industries', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop', size: 'small', industry: 'Industrial', url: 'https://raghavendraindustries.com' },
  { title: 'Black or Grey', img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop', size: 'medium', industry: 'Business', url: 'https://blackorgrey.com' },
  { title: 'Suyan Group', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', size: 'small', industry: 'Corporate', url: 'https://suyangroup.com' },
  { title: 'Eminence Equipments', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop', size: 'medium', industry: 'Manufacturing', url: 'https://eminenceequipments.com' },
  { title: 'Nishita Design', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070&auto=format&fit=crop', size: 'medium', industry: 'Design Studio', url: 'https://nishitadesign.com' },
  { title: 'InDesign Elements', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070&auto=format&fit=crop', size: 'small', industry: 'Interior Design', url: 'https://indesignelements.com' },
  { title: 'The Sommer School', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop', size: 'medium', industry: 'Education', url: 'https://thesommerschool.com' },
  { title: 'Aakarigari', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop', size: 'small', industry: 'Ecommerce', url: 'https://aakarigari.com' },
  { title: 'Maverick Simulation', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop', size: 'medium', industry: 'Technology', url: 'https://mavericksimulation.com' },
  { title: 'Synergeze', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop', size: 'small', industry: 'Corporate', url: 'https://synergeze.com' },
  { title: 'Digital Transformation Services', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop', size: 'large', industry: 'IT Services', url: 'https://digitaltransformationservices.com' },
  { title: 'ValveWorks', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop', size: 'small', industry: 'Industrial', url: 'https://valveworks.com' },
  { title: 'NIBE Limited', img: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=2070&auto=format&fit=crop', size: 'medium', industry: 'Corporate', url: 'https://nibelimited.com' },
  { title: 'Nucleosys Technologies', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop', size: 'small', industry: 'Company', url: 'https://nucleosystech.com' },
  { title: 'SellerBaba', img: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2070&auto=format&fit=crop', size: 'medium', industry: 'Ecommerce Platform', url: 'https://sellerbaba.com' },
  { title: 'PTech Solutions', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop', size: 'medium', industry: 'IT Services', url: 'https://ptechsolutions.com' },
  { title: 'PMSOFT', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop', size: 'small', industry: 'Software Company', url: 'https://pmsoft.com' },
];

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProjectCard = ({ item, index }: { item: any, index: number, key?: any }) => (
  <motion.a 
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -10, scale: 1.02 }}
    transition={{ 
      opacity: { delay: index * 0.1 },
      scale: { delay: index * 0.1, duration: 0.3, ease: "easeOut" },
      y: { duration: 0.3, ease: "easeOut" }
    }}
    className={`group block relative overflow-hidden rounded-[2rem] cursor-pointer bg-card shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-white/5 p-3 ${
      item.size === 'large' ? 'lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto' : 'aspect-square'
    }`}
  >
    <div className="w-full h-full overflow-hidden rounded-[1.5rem]">
      <img 
        src={item.img} 
        alt={item.title} 
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        referrerPolicy="no-referrer"
      />
    </div>
    
    <div className="absolute inset-3 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm rounded-[1.5rem] p-4">
      <div className="flex flex-col items-center gap-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-primary text-2xl font-black uppercase tracking-tighter text-center">
          {item.title}
        </h3>
        <div className="px-6 py-2 glass rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
          View Project
        </div>
      </div>
    </div>
  </motion.a>
);

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const followerRef = React.useRef<HTMLDivElement>(null);
  const rippleRef = React.useRef<HTMLDivElement>(null);
  
  const mousePos = React.useRef({ x: 0, y: 0 });
  const cursorCurrentPos = React.useRef({ x: 0, y: 0 });
  const followerCurrentPos = React.useRef({ x: 0, y: 0 });
  const lastMousePos = React.useRef({ x: 0, y: 0 });
  
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text'>('default');
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || ('ontouchstart' in window));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onClick = (e: MouseEvent) => {
      if (!rippleRef.current) return;
      const ripple = rippleRef.current;
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.classList.remove('animate-ripple');
      void ripple.offsetWidth; // trigger reflow
      ripple.classList.add('animate-ripple');
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = target.closest('a, button, .cursor-pointer, svg, input[type="submit"]');
      const isInput = target.closest('input, textarea, select, [contenteditable="true"]');
      const isText = target.closest('p, h1, h2, h3, h4, h5, h6, span, li, label, blockquote');
      
      if (isInput) {
        setCursorState('default');
        document.body.style.cursor = 'auto';
      } else if (isClickable) {
        setCursorState('hover');
        document.body.style.cursor = 'none';
        
        // Magnetic effect logic
        const clickable = isClickable as HTMLElement;
        const rect = clickable.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 60) {
          const pullX = distanceX * 0.15;
          const pullY = distanceY * 0.15;
          clickable.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
          clickable.style.transition = 'transform 0.2s ease-out';
        }
      } else if (isText) {
        setCursorState('text');
        document.body.style.cursor = 'none';
      } else {
        setCursorState('default');
        document.body.style.cursor = 'none';
      }
    };

    const resetMagnetic = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const clickable = target.closest('a, button, .cursor-pointer') as HTMLElement;
      if (clickable) {
        clickable.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('click', onClick);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mouseout', resetMagnetic);

    let rafId: number;
    const render = () => {
      // Smooth easing
      cursorCurrentPos.current.x += (mousePos.current.x - cursorCurrentPos.current.x) * 0.2;
      cursorCurrentPos.current.y += (mousePos.current.y - cursorCurrentPos.current.y) * 0.2;

      followerCurrentPos.current.x += (mousePos.current.x - followerCurrentPos.current.x) * 0.1;
      followerCurrentPos.current.y += (mousePos.current.y - followerCurrentPos.current.y) * 0.1;

      // Velocity for scale
      const dx = mousePos.current.x - lastMousePos.current.x;
      const dy = mousePos.current.y - lastMousePos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const scale = 1 + Math.min(velocity * 0.01, 0.3);
      
      lastMousePos.current = { ...mousePos.current };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorCurrentPos.current.x}px, ${cursorCurrentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerCurrentPos.current.x}px, ${followerCurrentPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('click', onClick);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mouseout', resetMagnetic);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Main Dot */}
      <div 
        ref={cursorRef}
        className={`fixed w-1.5 h-1.5 bg-glow rounded-full will-change-transform transition-all duration-200 ease-out ${
          isClicked ? 'scale-[0.8]' : 'scale-100'
        } ${cursorState === 'text' ? 'scale-75' : ''}`}
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Follower Circle */}
      <div 
        ref={followerRef}
        className={`fixed w-8 h-8 border border-glow/40 rounded-full will-change-transform transition-all duration-300 ease-out flex items-center justify-center ${
          cursorState === 'hover' ? 'scale-[1.8] border-glow bg-glow/5 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 
          cursorState === 'text' ? 'opacity-0 scale-50' : 'scale-100'
        } ${isClicked ? 'scale-[0.9]' : ''}`}
        style={{ pointerEvents: 'none' }}
      />

      {/* Ripple Effect */}
      <div 
        ref={rippleRef}
        className="fixed w-4 h-4 border border-glow rounded-full opacity-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      <style>{`
        @keyframes ripple {
          0% { transform: translate3d(-50%, -50%, 0) scale(1); opacity: 0.8; }
          100% { transform: translate3d(-50%, -50%, 0) scale(3); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 0.4s cubic-bezier(0, 0, 0.2, 1) forwards;
        }
        body {
          cursor: none !important;
          background-color: #0B0F19;
        }
        a, button, .cursor-pointer, svg {
          cursor: none !important;
        }
        input, textarea, select, [contenteditable="true"] {
          cursor: auto !important;
        }
      `}</style>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-bg rounded-sm rotate-45" />
            </div>
            <span className="font-black text-xl tracking-tighter text-primary">UK.</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium uppercase tracking-widest text-primary hover:text-glow transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-glow transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-sm font-medium uppercase tracking-widest text-primary hover:text-glow transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-glow transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-tighter text-primary">
          <span className="text-glow">+</span>
          <span>Pune, India</span>
          <img 
            src="https://picsum.photos/seed/avatar/100/100" 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover border border-white/10"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass py-8 px-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black uppercase tracking-tighter text-primary hover:text-glow"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black uppercase tracking-tighter text-primary hover:text-glow"
                >
                  {link.name}
                </Link>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <h1 className="text-huge font-black uppercase mb-8 text-primary">
            Umar<br />Khan
          </h1>
          <p className="max-w-md text-base text-secondary mb-12 leading-relaxed">
            WordPress Developer with 3+ years of experience in developing, customizing, and maintaining business websites and web applications.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-16">
            {[Youtube, Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:gradient-bg hover:text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 text-primary">
                <Icon size={18} />
              </a>
            ))}
          </div>

          <div className="flex gap-12">
            <div>
              <span className="block text-4xl font-black tracking-tighter text-primary">3+ Years</span>
              <span className="text-xs uppercase font-bold text-secondary max-w-[120px] block mt-1">Professional Experience</span>
            </div>
            <div>
              <span className="block text-4xl font-black tracking-tighter text-primary">20+</span>
              <span className="text-xs uppercase font-bold text-secondary max-w-[120px] block mt-1">Successful Projects Delivered</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden gradient-bg p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <img 
              src="https://i.ibb.co/Q0NwrtC/passport-size-photo.jpg" 
              alt="Umar Khan Portfolio" 
              className="w-full h-full object-cover rounded-[3.5rem]"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating UI Elements */}
            <div className="absolute top-8 right-8 w-12 h-12 glass text-primary rounded-full flex items-center justify-center">
              <Globe size={20} />
            </div>
            
            <div className="absolute bottom-1/4 -left-8 w-16 h-16 glass rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-12">
               <Code className="text-glow" />
            </div>
          </div>
          
          {/* Abstract background shape */}
          <div className="absolute -z-10 -top-20 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -z-10 -bottom-20 -left-20 w-96 h-96 bg-accent-end/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="bg-bg text-primary py-32 px-6 overflow-hidden relative border-y border-white/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="text-[20vw] font-black uppercase whitespace-nowrap animate-pulse text-primary">
            about . about . about . about
         </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative mb-16"
          >
            {/* Artistic Radial Pattern */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute top-1/2 left-1/2 w-full h-1 bg-glow/20 origin-left"
                  style={{ transform: `rotate(${i * 30}deg) translateX(50px)` }}
                />
              ))}
            </div>
            
            <div className="relative z-10 w-64 h-80 rounded-full overflow-hidden border-8 border-white/5 shadow-2xl">
              <img 
                src="https://i.ibb.co/XZgPZ8pb/profile.jpg" 
                alt="Umar Khan" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Icons around image */}
            <div className="absolute -top-4 -left-4 w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white shadow-lg">
              <Code size={16} />
            </div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-glow">
              <Terminal size={16} />
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-editorial font-black uppercase mb-8 max-w-4xl text-primary"
          >
            Creating modern web experiences that are <span className="gradient-text">powerful and intuitive</span>.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-base text-secondary leading-relaxed"
          >
            Strong knowledge of PHP, WordPress core, themes, plugins, and responsive frontend development. Experienced in delivering SEO-friendly, performance-optimized, and scalable websites for corporate, industrial, ecommerce, and education domains.
          </motion.p>
        </div>
      </div>
      
      {/* Corner Decorations */}
      <div className="absolute top-12 left-12 w-12 h-12 border-t-2 border-l-2 border-white/10" />
      <div className="absolute top-12 right-12 w-12 h-12 border-t-2 border-r-2 border-white/10" />
      <div className="absolute bottom-12 left-12 w-12 h-12 border-b-2 border-l-2 border-white/10" />
      <div className="absolute bottom-12 right-12 w-12 h-12 border-b-2 border-r-2 border-white/10" />
    </section>
  );
};

const Portfolio = () => {
  const items = PROJECTS_DATA.slice(0, 6);

  return (
    <section id="portfolio" className="py-32 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20">
          <h2 className="text-huge font-black uppercase text-primary">projects</h2>
          <Link to="/projects" className="hidden md:block text-right group">
            <span className="block text-sm font-bold uppercase tracking-widest text-glow mb-2 group-hover:translate-x-2 transition-transform">View All Works</span>
            <ArrowRight className="inline-block text-glow group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <ProjectCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const industries = ['All', ...Array.from(new Set(PROJECTS_DATA.map(item => item.industry)))];
  
  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(project => project.industry === activeFilter);

  return (
    <div className="pt-40 pb-32 px-6 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-glow font-bold uppercase tracking-widest text-sm mb-4 block">Archive</span>
          <h1 className="text-huge font-black uppercase text-primary mb-8">All Projects</h1>
          
          <div className="flex flex-wrap gap-3">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeFilter === industry 
                    ? 'gradient-bg text-white border-transparent shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-105' 
                    : 'bg-transparent text-primary border-white/10 hover:border-glow hover:text-glow'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard item={{...item, size: 'small'}} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [filter, setFilter] = useState('All');

  const categories = [
    { id: 'All', label: 'All' },
    { id: 'CMS', label: 'CMS' },
    { id: 'Programming', label: 'Programming' },
    { id: 'Frontend', label: 'Frontend' },
    { id: 'Database', label: 'Database' },
    { id: 'OS', label: 'OS' },
  ];

  const skillGroups = [
    {
      id: 'CMS',
      title: 'CMS',
      description: 'Content Management Systems',
      skills: [
        { name: 'WordPress', icon: 'wordpress', color: '#21759b' },
        { name: 'WooCommerce', icon: 'wordpress', color: '#96588a' },
        { name: 'Shopify', icon: 'shopify', color: '#96bf48' },
      ]
    },
    {
      id: 'Programming',
      title: 'Programming',
      description: 'Languages & Logic',
      skills: [
        { name: 'PHP', icon: 'php', color: '#777bb4' },
        { name: 'JavaScript', icon: 'js', color: '#f7df1e' },
        { name: 'jQuery', icon: 'jquery', color: '#0769ad' },
      ]
    },
    {
      id: 'Frontend',
      title: 'Frontend',
      description: 'UI & User Experience',
      skills: [
        { name: 'HTML5', icon: 'html', color: '#e34f26' },
        { name: 'CSS3', icon: 'css', color: '#1572b6' },
        { name: 'Bootstrap', icon: 'bootstrap', color: '#7952b3' },
      ]
    },
    {
      id: 'Database',
      title: 'Databases',
      description: 'Data Storage & Management',
      skills: [
        { name: 'MySQL', icon: 'mysql', color: '#4479a1' },
        { name: 'SQL Server', icon: 'mysql', color: '#cc2927' },
      ]
    },
    {
      id: 'OS',
      title: 'OS',
      description: 'Operating Systems',
      skills: [
        { name: 'Windows', icon: 'windows', color: '#0078d7' },
        { name: 'Linux', icon: 'linux', color: '#fcc624' },
      ]
    },
  ];

  const filteredGroups = filter === 'All' ? skillGroups : skillGroups.filter(g => g.id === filter);

  return (
    <section id="skills" className="py-32 px-6 bg-bg overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-glow font-bold uppercase tracking-widest text-sm mb-2 block">Technologies I Work With</span>
            <h2 className="text-huge font-black uppercase text-primary">Skills</h2>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  filter === cat.id 
                    ? 'gradient-bg text-white border-transparent shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-105' 
                    : 'bg-transparent text-primary border-white/10 hover:border-glow hover:text-glow'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group) => (
              <motion.div
                key={group.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative p-10 rounded-[3rem] bg-card border border-white/5 hover:border-glow/30 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden"
              >
                {/* Glassmorphism background effect */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm -z-10" />
                
                <div className="relative z-10">
                  <div className="mb-8">
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 text-primary">{group.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-secondary">{group.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {group.skills.map((skill) => (
                      <motion.div 
                        key={skill.name}
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:border-glow/20 transition-colors"
                      >
                        <div className="w-16 h-16 flex items-center justify-center relative">
                          <div 
                            className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-20 transition-opacity"
                            style={{ backgroundColor: skill.color }}
                          />
                          <img 
                            src={`https://skillicons.dev/icons?i=${skill.icon}`} 
                            alt={skill.name} 
                            className="w-12 h-12 relative z-10 drop-shadow-2xl transform group-hover:rotate-6 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-tighter text-center text-primary">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-glow/5 rounded-full blur-2xl group-hover:bg-glow/10 transition-colors" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSending(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS keys are missing. Please check your environment variables.');
      toast.error('Something went wrong. Please try again.');
      setIsSending(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Umar Khan',
        },
        publicKey
      );

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-bg text-primary border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-huge font-black uppercase mb-8 text-primary">let's talk</h2>
          <p className="text-lg text-secondary mb-12 max-w-md">
            Have a project in mind or just want to say hello? Feel free to reach out.
          </p>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
  
  {/* Email */}
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white shadow-lg">
      <Globe size={20} />
    </div>
    <span className="text-lg font-medium text-primary">
      umarhusenkhan@gmail.com
    </span>
  </div>

  {/* Phone */}
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white shadow-lg">
      <Phone size={20} />
    </div>
    <span className="text-lg font-medium text-primary">
      7558546393
    </span>
  </div>

</div>
            <div className="flex gap-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:gradient-bg hover:text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all text-primary">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/10 py-4 focus:border-glow outline-none transition-colors text-primary" 
                placeholder="John Doe" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/10 py-4 focus:border-glow outline-none transition-colors text-primary" 
                placeholder="john@example.com" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">Subject</label>
            <input 
              type="text" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/10 py-4 focus:border-glow outline-none transition-colors text-primary" 
              placeholder="Project Inquiry" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">Message</label>
            <textarea 
              rows={4} 
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/10 py-4 focus:border-glow outline-none transition-colors resize-none text-primary" 
              placeholder="Tell me about your project..." 
            />
          </div>
          <button 
            type="submit"
            disabled={isSending}
            className="group flex items-center gap-4 text-2xl font-black uppercase tracking-tighter hover:text-glow transition-colors text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Sending...' : 'Send Message'}
            <div className={`w-12 h-12 rounded-full gradient-bg text-white flex items-center justify-center transition-all ${!isSending && 'group-hover:translate-x-2 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'}`}>
              {isSending ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <ArrowRight size={24} />}
            </div>
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-bg pt-32 pb-12 px-6 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-12">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 bg-white rounded-sm rotate-45" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-primary">UK.</span>
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-8">
            {[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/#about' },
              { name: 'Projects', href: '/projects' },
              { name: 'Skills', href: '/#skills' },
              { name: 'Contact', href: '/#contact' }
            ].map((link) => (
              link.href.startsWith('/#') ? (
                <a key={link.name} href={link.href} className="text-sm font-bold uppercase tracking-widest text-primary hover:text-glow transition-colors">
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} to={link.href} className="text-sm font-bold uppercase tracking-widest text-primary hover:text-glow transition-colors">
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>

        <div className="relative">
          <h2 className="text-[16vw] font-black uppercase leading-tight tracking-tighter text-white/5 select-none pointer-events-none text-center">
            Creator
          </h2>
          <div className="absolute bottom-0 left-0 w-full flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] text-secondary py-8 border-t border-white/5">
            <span>© 2026 Umar Khan</span>
            <span className="hidden md:block">Designed for modern, high-impact web experiences</span>
            <a href="#" className="hover:text-primary transition-colors">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Portfolio />
    <Skills />
    <Contact />
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <ScrollToTop />
      <div className="font-sans">
        <CustomCursor />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
