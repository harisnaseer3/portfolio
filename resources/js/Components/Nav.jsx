import React, { useState, useEffect } from 'react';
import { 
    Sun, Moon, X, Menu, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '@/Components/Magnetic';
import { usePage } from '@inertiajs/react';

const Nav = ({ onHireMeClick, theme, toggleTheme, settings }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { hasEducation } = usePage().props;

    const navLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Services', href: '/#services' },
        { name: 'Skills', href: '/#skills' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Experience', href: '/#experience' },
        ...(hasEducation ? [{ name: 'Academic', href: '/#academic' }] : []),
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-xl' : 'py-8'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.href = '/'}>
                    <div className="flex items-center gap-2">
                        {settings?.logo_url ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                                <img src={settings.logo_url} alt="Logo" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white rotate-3 group-hover:rotate-12 transition-transform font-black text-xl shadow-lg shadow-primary/20">H</div>
                        )}
                    </div>
                    
                    <div className="flex flex-col border-l border-gray-200 dark:border-slate-800 pl-4">
                        <span className="text-lg font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none">
                            {settings?.site_name || "Haris Naseer"}
                        </span>
                        <span className="text-[10px] font-bold text-primary dark:text-primary-light uppercase tracking-[0.2em] mt-1 leading-none">
                            Web Developer
                        </span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </a>
                    ))}
                    
                    <Magnetic>
                        <button 
                            onClick={onHireMeClick}
                            className="px-6 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
                        >
                            Hire Me
                        </button>
                    </Magnetic>

                    <button 
                        onClick={toggleTheme}
                        className="p-2.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 rounded-full hover:scale-110 transition-all"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                     <button 
                        onClick={toggleTheme}
                        className="p-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 rounded-full"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button 
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="p-2 text-gray-900 dark:text-white"
                    >
                        {mobileMenu ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-gray-100 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a 
                                    key={link.name} 
                                    href={link.href} 
                                    onClick={() => setMobileMenu(false)}
                                    className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-between"
                                >
                                    {link.name} <ChevronRight size={18} className="text-primary" />
                                </a>
                            ))}
                            <button 
                                onClick={() => { setMobileMenu(false); onHireMeClick(); }}
                                className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20"
                            >
                                Hire Me
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Nav;
