import React, { useState, useEffect, forwardRef } from 'react';
import BrandLogo from '@/Components/BrandLogo';
import IconResolver from '@/Components/IconResolver';
import Modal from '@/Components/Modal';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Github, Twitter, Linkedin, Mail, ExternalLink, 
    Palette, Code2, Smartphone, Briefcase, Rocket,
    ArrowRight, Star, MapPin, Phone, Send, Menu, X, ChevronRight, Download, CheckCircle
} from 'lucide-react';

const Nav = ({ onHireMeClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Experience', href: '#experience' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <BrandLogo className="h-10" showText={true} />
                </Link>
                
                {/* Desktop Links */}
                <div className="hidden md:flex gap-8 items-center">
                    {links.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            className="text-text-main hover:text-primary transition-colors font-medium"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button 
                        onClick={onHireMeClick}
                        className="px-6 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
                    >
                        Hire Me
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-text-main" onClick={() => setMobileMenu(!mobileMenu)}>
                    {mobileMenu ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-white border-t border-border-main p-6 shadow-xl md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {links.map((link) => (
                                <a 
                                    key={link.name} 
                                    href={link.href} 
                                    className="text-lg text-text-main py-2 border-b border-border-main last:border-0"
                                    onClick={() => setMobileMenu(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button 
                                onClick={() => { setMobileMenu(false); onHireMeClick(); }}
                                className="mt-4 w-full py-3 bg-primary text-white rounded-xl font-bold"
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

const SkillBar = ({ skill, percentage }) => (
    <div className="mb-6">
        <div className="flex justify-between mb-2">
            <span className="font-semibold text-text-main uppercase tracking-wider">{skill}</span>
            <span className="text-primary font-bold">{percentage}%</span>
        </div>
        <div className="w-full h-3 bg-accent-blue-soft rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-primary"
            />
        </div>
    </div>
);

const ServiceCard = forwardRef(({ index, title, desc, icon }, ref) => (
    <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-white p-8 rounded-3xl border border-border-main card-hover group"
    >
        <div className="w-16 h-16 bg-accent-blue-soft rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
            <IconResolver icon={icon} size={32} />
        </div>
        <h3 className="text-xl font-bold text-text-main mb-4">{title}</h3>
        <p className="text-text-muted leading-relaxed">{desc}</p>
        <div className="mt-8 flex items-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
            Read More <ChevronRight size={18} />
        </div>
    </motion.div>
));

const ProjectCard = forwardRef(({ project, index }, ref) => (
    <motion.div 
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative group rounded-3xl overflow-hidden shadow-lg aspect-auto bg-slate-200"
    >
        {project.image_url && !project.image_url.includes('placeholder.webp') && !project.image_url.includes('project1.webp') ? (
            <img src={project.image_url} alt={project.title} className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
            <div className="w-full h-72 bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                <IconResolver icon="Palette" size={48} className="text-primary/20" />
            </div>
        )}
        
        <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white p-8">
            <span className="text-sm font-bold uppercase tracking-widest mb-2 text-white/80">{project.category}</span>
            <h3 className="text-2xl font-bold text-center mb-6">{project.title}</h3>
            <div className="flex gap-4">
                <a href={project.link} className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center hover:scale-110 transition-all">
                    <ExternalLink size={20} />
                </a>
            </div>
        </div>
    </motion.div>
));

export default function Welcome({ canLogin, canRegister, skills, services, experiences, projects }) {
    const { settings } = usePage().props;
    const [activeTab, setActiveTab] = useState('ALL');
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [showAllServices, setShowAllServices] = useState(false);
    const [showAllExperiences, setShowAllExperiences] = useState(false);
    const [isHireMeModalOpen, setIsHireMeModalOpen] = useState(false);
    const categories = ['ALL', 'MOBILE APP', 'WEB APP', 'UI/UX'];
    
    const { data: contactData, setData: setContactData, post: postContact, processing: processingContact, reset: resetContact, errors: contactErrors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleContactSubmit = (e) => {
        e.preventDefault();
        postContact(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                resetContact();
                setIsHireMeModalOpen(false);
            },
        });
    };
    
    const filteredProjects = activeTab === 'ALL' 
        ? projects 
        : projects?.filter(p => p.category === activeTab);

    const projectsToDisplay = showAllProjects ? filteredProjects : filteredProjects?.slice(0, 4);

    // Fallback data if DB is empty
    const displaySkills = skills?.length > 0 ? skills : [
        { name: 'Figma', percentage: 95 },
        { name: 'Sketch', percentage: 85 },
        { name: 'Adobe XD', percentage: 90 },
        { name: 'Photoshop', percentage: 80 }
    ];

    const displayServices = services?.length > 0 ? services : [
        { title: 'WEB DEV', icon: Code2, description: 'Building responsive and modern web applications.' },
        { title: 'UI DESIGN', icon: Palette, description: 'Creating beautiful and functional user interfaces.' },
        { title: 'MOBILE APP', icon: Smartphone, description: 'Cross-platform mobile apps with seamless UX.' },
        { title: 'BRANDING', icon: Briefcase, description: 'Developing unique brand identities and logos.' }
    ];
    
    const displayExperiences = experiences?.length > 0 ? experiences : [
        { company: 'Google', role: 'Creative Designer', duration: '2022 - Present', description: 'Leading core design systems for global products.' },
        { company: 'Amazon', role: 'UI/UX Designer', duration: '2020 - 2022', description: 'Optimizing conversion for shopping experiences.' },
        { company: 'Facebook', role: 'Lead Designer', duration: '2018 - 2020', description: 'Redesigning social interaction components.' }
    ];

    const skillsToDisplay = showAllSkills ? displaySkills : displaySkills?.slice(0, 4);
    const servicesToDisplay = showAllServices ? displayServices : displayServices?.slice(0, 4);
    const experiencesToDisplay = showAllExperiences ? displayExperiences : displayExperiences?.slice(0, 4);

    return (
        <div className="min-h-screen bg-[#F8FAFF]">
            <Head title="Haris | Developer Portfolio" />
            <Nav onHireMeClick={() => setIsHireMeModalOpen(true)} />

            {/* Hero Section */}
            <section className="container mx-auto px-6 pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-gradient pointer-events-none -z-10" />
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <div className="md:w-1/2">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-accent-blue-soft text-primary font-bold px-4 py-1.5 rounded-full inline-block mb-6"
                        >
                            Hello, I'm Haris 👋
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-extrabold leading-tight text-text-main mb-8"
                        >
                            Welcome to my <br /> 
                            <span className="gradient-text">Portfolio</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-text-muted max-w-lg mb-12 leading-relaxed"
                        >
                            Turning ideas into powerful web solutions
                            Creating fast, secure, and reliable applications that drive real results.
                            Focused on clean design, efficient architecture, and performance to ensure long-term scalability and stability.
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-6 items-center"
                        >
                            <button 
                                onClick={() => setIsHireMeModalOpen(true)}
                                className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-hover shadow-xl shadow-primary/30 flex items-center gap-2 group transition-all"
                            >
                                Hire Me <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </button>

                            {settings?.resume_url && (
                                <a 
                                    href={settings.resume_url} 
                                    download="Haris Naseer"
                                    target="_blank"
                                    className="px-8 py-4 border-2 border-primary text-primary rounded-full font-bold text-lg hover:bg-primary hover:text-white flex items-center gap-2 group transition-all"
                                >
                                    Download CV <Download className="group-hover:translate-y-1 transition-transform" size={20} />
                                </a>
                            )}

                            <div className="flex gap-4">
                                {settings?.social_github && (
                                    <a href={settings.social_github} target="_blank" className="w-12 h-12 rounded-full border border-border-main flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-all hover:border-primary">
                                        <Github size={20} />
                                    </a>
                                )}
                                {settings?.social_twitter && (
                                    <a href={settings.social_twitter} target="_blank" className="w-12 h-12 rounded-full border border-border-main flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-all hover:border-primary">
                                        <Twitter size={20} />
                                    </a>
                                )}
                                {settings?.social_linkedin && (
                                    <a href={settings.social_linkedin} target="_blank" className="w-12 h-12 rounded-full border border-border-main flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-all hover:border-primary">
                                        <Linkedin size={20} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    <div className="md:w-1/2 relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 w-full max-w-md mx-auto aspect-square rounded-[3rem] overflow-hidden bg-white shadow-2xl p-4 border border-border-main"
                        >
                            <div className="w-full h-full rounded-[2.5rem] bg-[#F8FAFF] flex items-center justify-center overflow-hidden relative">
                                {usePage().props.settings?.hero_image_url ? (
                                    <img 
                                        src={usePage().props.settings.hero_image_url} 
                                        alt={usePage().props.settings.site_name || 'Hero'} 
                                        className="w-full h-full object-cover shadow-inner"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-20">
                                            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary/20 rounded-full" />
                                            <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-secondary/20 rounded-full" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-primary/10 rounded-[3rem] rotate-12" />
                                        </div>
                                        <div className="relative text-center z-10">
                                            <BrandLogo className="h-16 opacity-30 grayscale" />
                                            <p className="mt-4 text-[10px] uppercase font-black tracking-[0.3em] text-gray-300">Awaiting Profile Photo</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                        
                        {/* Decorative glows */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />
                        
                        {/* Floating Badges */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute z-20 top-10 -left-12 glass p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/50"
                        >
                            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                <Star fill="white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-text-main">20+</h4>
                                <p className="text-xs text-text-muted">Projects Done</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                            className="absolute z-20 bottom-10 -right-4 glass p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/50"
                        >
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                                <Rocket />
                            </div>
                            <div>
                                <h4 className="font-bold text-text-main">5+ Years</h4>
                                <p className="text-xs text-text-muted">Experience</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="about" className="section-padding bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">My Talent</span>
                        <h2 className="text-4xl md:text-5xl font-black text-text-main">My Soft Skills</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto">
                        <AnimatePresence mode="popLayout">
                            {skillsToDisplay.map((s, idx) => (
                                <motion.div
                                    key={s.id || idx}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                >
                                    <SkillBar skill={s.name} percentage={s.percentage} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {displaySkills.length > 4 && !showAllSkills && (
                        <div className="mt-12 text-center">
                            <button 
                                onClick={() => setShowAllSkills(true)}
                                className="px-8 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20"
                            >
                                View More Skills
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Specialization Section */}
            <section id="services" className="section-padding">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">What I Do</span>
                        <h2 className="text-4xl md:text-5xl font-black text-text-main">I'm Specialized In</h2>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {servicesToDisplay.map((service, idx) => (
                                <ServiceCard 
                                    key={service.id || idx} 
                                    index={idx}
                                    title={service.title} 
                                    desc={service.description} 
                                    icon={service.icon || Palette} 
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {displayServices.length > 4 && !showAllServices && (
                        <div className="mt-12 text-center">
                            <button 
                                onClick={() => setShowAllServices(true)}
                                className="px-8 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20"
                            >
                                View All Services
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="section-padding bg-[#F8FAFF]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Career Path</span>
                        <h2 className="text-4xl md:text-5xl font-black text-text-main">Work Experience</h2>
                    </div>
                    
                    <div className="relative max-w-4xl mx-auto">
                        {/* Vertical Line */}
                        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-1 h-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent rounded-full" />
                        
                        <div className="space-y-12">
                            <AnimatePresence mode="popLayout">
                                {experiencesToDisplay.map((exp, idx) => (
                                    <motion.div 
                                        key={exp.id || idx}
                                        layout
                                        initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`relative flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10" />
                                        
                                        {/* Content Card */}
                                        <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} ml-10 md:ml-0`}>
                                            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-border-main hover:border-primary/30 transition-all group">
                                                <span className="text-primary font-bold text-sm tracking-widest uppercase mb-1 block">{exp.duration}</span>
                                                <h3 className="text-xl font-black text-text-main mb-1 group-hover:text-primary transition-colors">{exp.role}</h3>
                                                <p className="font-bold text-text-muted mb-4">{exp.company}</p>
                                                <p className="text-text-muted leading-relaxed text-sm">{exp.description}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Spacer for Desktop */}
                                        <div className="hidden md:block w-[45%]" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {displayExperiences.length > 4 && !showAllExperiences && (
                            <div className="mt-20 text-center">
                                <button 
                                    onClick={() => setShowAllExperiences(true)}
                                    className="px-10 py-4 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20"
                                >
                                    View More Experience
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="section-padding bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Portfolio</span>
                            <h2 className="text-4xl md:text-5xl font-black text-text-main">Selected Works</h2>
                        </div>
                        <div className="flex bg-accent-blue-soft p-1.5 rounded-full overflow-hidden">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeTab === cat ? 'bg-primary text-white shadow-lg' : 'text-text-muted hover:text-primary'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
                        <AnimatePresence mode="popLayout">
                            {projectsToDisplay?.map((project, idx) => (
                                <ProjectCard key={project.id || idx} project={project} index={idx} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProjects?.length > 4 && !showAllProjects && (
                        <div className="mt-20 text-center">
                            <button 
                                onClick={() => setShowAllProjects(true)}
                                className="px-10 py-4 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20"
                            >
                                View All Projects
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section-padding">
                <div className="container mx-auto px-6">
                    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-12 lg:p-20 bg-primary text-white">
                            <h2 className="text-4xl md:text-5xl font-black mb-8">Let's Work Together</h2>
                            <p className="text-white/80 text-lg mb-12">I'm currently available for freelance work and full-time opportunities. Reach out to start a conversation!</p>
                            
                            <div className="space-y-10">
                                <div className="flex gap-6 items-center">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center"><Phone size={28} /></div>
                                    <div>
                                        <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Call Me</p>
                                        <a href={`tel:${settings?.contact_phone}`} className="text-xl font-bold hover:underline">
                                            {settings?.contact_phone || '+1 (234) 567-890'}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center"><Mail size={28} /></div>
                                    <div>
                                        <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Email Me</p>
                                        <a href={`mailto:${settings?.contact_email}`} className="text-xl font-bold hover:underline">
                                            {settings?.contact_email || 'hello@marshall.com'}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center"><MapPin size={28} /></div>
                                    <div>
                                        <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Visit Me</p>
                                        <p className="text-xl font-bold">{settings?.contact_location || 'New York, NY'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="lg:w-1/2 p-12 lg:p-20">
                            {usePage().props.flash?.success && (
                                <div className="mb-8 p-6 bg-green-50 border border-green-100 text-green-700 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shrink-0">
                                        <CheckCircle size={24} />
                                    </div>
                                    <p className="font-bold">{usePage().props.flash.success}</p>
                                </div>
                            )}

                            <form onSubmit={handleContactSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-black uppercase text-text-muted mb-2">First Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={contactData.first_name}
                                            onChange={e => setContactData('first_name', e.target.value)}
                                            className="w-full px-6 py-4 bg-accent-blue-soft border-0 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                                            placeholder="John" 
                                        />
                                        {contactErrors.first_name && <p className="text-red-500 text-xs mt-1 font-bold">{contactErrors.first_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-black uppercase text-text-muted mb-2">Last Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={contactData.last_name}
                                            onChange={e => setContactData('last_name', e.target.value)}
                                            className="w-full px-6 py-4 bg-accent-blue-soft border-0 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                                            placeholder="Doe" 
                                        />
                                        {contactErrors.last_name && <p className="text-red-500 text-xs mt-1 font-bold">{contactErrors.last_name}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase text-text-muted mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={contactData.email}
                                        onChange={e => setContactData('email', e.target.value)}
                                        className="w-full px-6 py-4 bg-accent-blue-soft border-0 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                                        placeholder="john@example.com" 
                                    />
                                    {contactErrors.email && <p className="text-red-500 text-xs mt-1 font-bold">{contactErrors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase text-text-muted mb-2">Subject</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={contactData.subject}
                                        onChange={e => setContactData('subject', e.target.value)}
                                        className="w-full px-6 py-4 bg-accent-blue-soft border-0 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                                        placeholder="Project Inquiry" 
                                    />
                                    {contactErrors.subject && <p className="text-red-500 text-xs mt-1 font-bold">{contactErrors.subject}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase text-text-muted mb-2">Message</label>
                                    <textarea 
                                        rows="5" 
                                        required
                                        value={contactData.message}
                                        onChange={e => setContactData('message', e.target.value)}
                                        className="w-full px-6 py-4 bg-accent-blue-soft border-0 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none" 
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                    {contactErrors.message && <p className="text-red-500 text-xs mt-1 font-bold">{contactErrors.message}</p>}
                                </div>
                                <button 
                                    type="submit"
                                    disabled={processingContact}
                                    className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-hover shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group transition-all disabled:opacity-50"
                                >
                                    {processingContact ? 'Sending...' : 'Send Message'} <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="bg-[#0F172A] text-white pt-24 pb-12 overflow-hidden relative">
                <div className="container mx-auto px-6 relative z-10">
                    {/* Newsletter Section */}
                    <div className="bg-primary p-12 lg:p-16 rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-10 mb-20 shadow-2xl shadow-primary/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-black mb-4">Stay Updated With our Latest News</h2>
                            <p className="text-white/80 text-lg">Subscribe to get latest design tips and project updates.</p>
                        </div>
                        <div className="lg:w-1/2 w-full flex bg-white text-text-main p-2 rounded-2xl shadow-lg">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="bg-transparent border-0 flex-grow px-6 py-4 focus:ring-0 outline-none"
                            />
                            <button className="bg-[#0F172A] text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20 border-b border-white/10 pb-20">
                        <div className="col-span-2 lg:col-span-1">
                            <Link href="/" className="mb-8 block">
                                <BrandLogo className="h-10" showText={true} />
                            </Link>
                            <p className="text-white/60 leading-relaxed mb-8 max-w-xs">
                                {usePage().props.settings?.footer_description || 'Specializing in crafting high-end digital products with a focus on user-centric design and modern development.'}
                            </p>
                            <div className="flex gap-4">
                                {settings?.social_github && (
                                    <a href={settings.social_github} target="_blank" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-all">
                                        <Github size={20} />
                                    </a>
                                )}
                                {settings?.social_twitter && (
                                    <a href={settings.social_twitter} target="_blank" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-all">
                                        <Twitter size={20} />
                                    </a>
                                )}
                                {settings?.social_linkedin && (
                                    <a href={settings.social_linkedin} target="_blank" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-all">
                                        <Linkedin size={20} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-8">Navigation</h3>
                            <ul className="space-y-4 text-white/60">
                                {['Home', 'About', 'Services', 'Experience', 'Portfolio', 'Contact'].map(item => (
                                    <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-8">Services</h3>
                            <ul className="space-y-4 text-white/60">
                                {displayServices.slice(0, 5).map(service => (
                                    <li key={service.id || service.title}><a href="#services" className="hover:text-primary transition-colors">{service.title}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-8">Get in Touch</h3>
                            <ul className="space-y-4 text-white/60">
                                {settings?.contact_email && <li className="hover:text-primary transition-colors cursor-default">{settings.contact_email}</li>}
                                {settings?.contact_phone && <li className="hover:text-primary transition-colors cursor-default">{settings.contact_phone}</li>}
                                {settings?.contact_location && <li className="hover:text-primary transition-colors cursor-default">{settings.contact_location}</li>}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-white/40 text-sm">
                            {usePage().props.settings?.footer_copyright || `© ${new Date().getFullYear()} Haris Naseer. All rights reserved.`}
                        </p>
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                            Created with 
                            <motion.span 
                                animate={{ scale: [1, 1.2, 1] }} 
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-red-500 mx-1"
                            >
                                ❤️
                            </motion.span>
                            using Laravel & React
                        </div>
                    </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] -mr-48 -mb-48" />
            </footer>

            {/* Hire Me Modal */}
            <Modal show={isHireMeModalOpen} onClose={() => setIsHireMeModalOpen(false)}>
                <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Let's Work Together</h2>
                            <p className="text-gray-500 font-bold tracking-tight">Tell me about your project and I'll get back to you soon.</p>
                        </div>
                        <button onClick={() => setIsHireMeModalOpen(false)} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">First Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={contactData.first_name}
                                    onChange={e => setContactData('first_name', e.target.value)}
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                                    placeholder="John" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Last Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={contactData.last_name}
                                    onChange={e => setContactData('last_name', e.target.value)}
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                                    placeholder="Doe" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Email Address</label>
                            <input 
                                type="email" 
                                required
                                value={contactData.email}
                                onChange={e => setContactData('email', e.target.value)}
                                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                                placeholder="john@example.com" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Subject</label>
                            <input 
                                type="text" 
                                required
                                value={contactData.subject}
                                onChange={e => setContactData('subject', e.target.value)}
                                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                                placeholder="Project Inquiry" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Message</label>
                            <textarea 
                                rows="4" 
                                required
                                value={contactData.message}
                                onChange={e => setContactData('message', e.target.value)}
                                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none" 
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>
                        <button 
                            type="submit"
                            disabled={processingContact}
                            className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-hover shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group transition-all disabled:opacity-50"
                        >
                            {processingContact ? 'Sending...' : 'Send Inquiry'} <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
