import { Head, Link } from '@inertiajs/react';
import { 
    Github, Twitter, Linkedin, Mail, ExternalLink, 
    Palette, Code2, Smartphone, Briefcase, Rocket,
    ArrowLeft, Star, MapPin, Phone, Send, Menu, X, ChevronRight, Download, CheckCircle,
    Sun, Moon, Code, Database, Calendar, Tag, User, ArrowRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Nav from '@/Components/Nav'; // Wait, I need to make sure Nav is extracted or handle it here
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

export default function Show({ project, settings }) {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 pb-20">
            <Head title={`${project.title} | Case Study`} />
            
            {/* Simple Nav for Detail Page */}
            <nav className="fixed top-0 w-full z-50 glass py-4 shadow-sm border-b border-gray-100 dark:border-slate-900">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 text-gray-900 dark:text-white font-black group">
                        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
                    </Link>
                    <button 
                        onClick={toggleTheme}
                        className="p-2.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 rounded-full transition-all"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </nav>

            {/* Hero Header */}
            <section className="pt-32 pb-16 bg-gray-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
                                    {project.category}
                                </span >
                                <span className="text-gray-400 font-bold text-xs flex items-center gap-1.5">
                                    <Calendar size={14} /> {new Date(project.created_at).getFullYear()}
                                </span>
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight italic"
                            >
                                {project.title}
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-gray-500 dark:text-slate-400 mb-8 leading-relaxed font-medium"
                            >
                                {project.description}
                            </motion.p>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-3"
                            >
                                {project.tech_stack?.map(tech => (
                                    <span key={tech} className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl text-xs font-black text-gray-700 dark:text-gray-300 shadow-sm flex items-center gap-2">
                                        <Tag size={12} className="text-primary" /> {tech}
                                    </span>
                                ))}
                            </motion.div>

                            {project.link && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-10"
                                >
                                    <a 
                                        href={project.link} 
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all"
                                    >
                                        Visit Live Site <ExternalLink size={18} />
                                    </a>
                                </motion.div>
                            )}
                        </div>
                        <div className="md:w-1/2">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="rounded-[3rem] overflow-hidden shadow-premium border-8 border-white dark:border-slate-800"
                            >
                                <img src={project.image_url} alt={project.title} className="w-full h-auto" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content & Gallery */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="prose prose-lg dark:prose-invert max-w-none mb-20 prose-headings:font-black prose-headings:italic prose-p:text-gray-500 dark:prose-p:text-slate-400">
                        {project.case_study ? (
                            <ReactMarkdown>{project.case_study}</ReactMarkdown>
                        ) : (
                            <div className="p-10 bg-gray-50 dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 text-center italic text-gray-400">
                                Case study details coming soon...
                            </div>
                        )}
                    </div>

                    {project.image_gallery?.length > 0 && (
                        <div className="space-y-8">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-10 italic underline decoration-primary decoration-4">Project Gallery</h2>
                            <div className="grid grid-cols-1 gap-8">
                                {project.image_gallery.map((url, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800"
                                    >
                                        <img src={url} alt={`Gallery ${i}`} className="w-full h-auto hover:scale-105 transition-transform duration-700" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-20 pt-20 border-t border-gray-100 dark:border-slate-900 flex justify-between items-center">
                        <div>
                            <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2 italic">Ready to build something?</h4>
                            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Let's discuss your next project</p>
                        </div>
                        <Link 
                            href="/#contact"
                            className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-xl"
                        >
                            Work With Me <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
