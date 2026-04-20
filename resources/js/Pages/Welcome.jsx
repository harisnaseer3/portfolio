import { 
    Mail, ExternalLink, 
    Palette, Code2, Smartphone, Briefcase, Rocket,
    ArrowRight, Star, MapPin, Phone, Send, Menu, X, ChevronRight, Download, CheckCircle,
    Sun, Moon, Code, Database
} from 'lucide-react';
import { useState, useEffect, useMemo, useRef, memo } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/Components/Modal';
import CustomCursor from '@/Components/CustomCursor';
import Magnetic from '@/Components/Magnetic';
import ScrollProgress from '@/Components/ScrollProgress';
import Nav from '@/Components/Nav';
import { Github, Twitter, Linkedin } from '@/Components/SocialIcons';
import axios from 'axios';


const IconResolver = ({ iconName, size = 24, className = "" }) => {
    const icons = { Palette, Code2, Smartphone, Briefcase, Rocket, Star, MapPin, Phone, Send, Mail, Code, Database };
    const IconComponent = icons[iconName] || Code;
    return <IconComponent size={size} className={className} />;
};


const SkillBar = ({ skill, percentage }) => (
    <div className="mb-6">
        <div className="flex justify-between mb-2">
            <span className="font-black text-gray-900 dark:text-white tracking-tight uppercase text-sm">{skill}</span>
            <span className="font-bold text-primary dark:text-primary-light text-sm">{percentage}%</span>
        </div>
        <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-gray-50 dark:border-slate-700">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-sm"
            />
        </div>
    </div>
);

const ServiceCard = ({ title, desc, icon: Icon, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -10 }}
        className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-card hover:shadow-premium transition-all group"
    >
        <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary dark:text-primary-light mb-6 group-hover:scale-110 transition-transform">
            <Icon size={32} />
        </div>
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-text-muted dark:text-slate-400 font-medium leading-relaxed italic">
            "{desc}"
        </p>
    </motion.div>
);

const ProjectCard = memo(({ project, onTrack }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -10 }}
        className="relative group rounded-[2.5rem] overflow-hidden shadow-lg aspect-auto bg-white dark:bg-slate-900 border border-transparent hover:border-primary/20 transition-all h-full"
    >
        <div className="relative h-64 overflow-hidden">
            {project.image_url && !project.image_url.includes('placeholder.webp') && !project.image_url.includes('project1.webp') ? (
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                    <IconResolver iconName="Palette" size={48} className="text-primary/20" />
                </div>
            )}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
        
        <div className="p-8">
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full">{project.category}</span>
                <div className="flex gap-2">
                    {project.link && (
                        <a href={project.link} target="_blank" className="p-2 bg-gray-50 dark:bg-slate-800 text-gray-400 hover:text-primary rounded-xl transition-all border border-gray-100 dark:border-slate-700">
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 leading-tight line-clamp-1">{project.title}</h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tech_stack?.slice(0, 3).map(tech => (
                    <span key={tech} className="text-[9px] font-bold uppercase text-gray-400 border border-gray-100 dark:border-slate-800 px-2 py-1 rounded-lg">
                        {tech}
                    </span>
                ))}
                {project.tech_stack?.length > 3 && <span className="text-[9px] font-bold text-gray-300">+{project.tech_stack.length - 3}</span>}
            </div>

            <Link 
                href={route('projects.show', project.id)}
                className="w-full py-3 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all shadow-sm"
            >
                View Case Study <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    </motion.div>
));

export default function Welcome({ 
    auth, canLogin, canRegister, 
    skills, services, experiences, projects,
    testimonials: displayTestimonials,
    posts: displayPosts
}) {
    const { settings } = usePage().props;
    const [activeTab, setActiveTab] = useState('ALL');
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [showAllServices, setShowAllServices] = useState(false);
    const [showAllExperiences, setShowAllExperiences] = useState(false);
    const [showAllTestimonials, setShowAllTestimonials] = useState(false);
    const [showAllPosts, setShowAllPosts] = useState(false);
    const [isHireMeModalOpen, setIsHireMeModalOpen] = useState(false);
    const { site_theme } = usePage().props;
    const [theme, setTheme] = useState(localStorage.getItem('theme') || site_theme || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const trackEvent = (eventName) => {
        axios.post(route('analytics.track'), { event_name: eventName })
            .catch(err => console.error('Analytics failed', err));
    };

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
        { title: 'WEB DEVELOPMENT', icon: Code2, description: 'Building responsive and modern web applications.' },
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
    const testimonialsToDisplay = showAllTestimonials ? displayTestimonials : displayTestimonials?.slice(0, 4);
    const postsToDisplay = showAllPosts ? displayPosts : displayPosts?.slice(0, 4);

    return (
        <div className="min-h-screen bg-[var(--bg-main)] dark:bg-slate-950 transition-colors duration-500">
            <Head title="Haris | Developer Portfolio" />
            <ScrollProgress />
            <CustomCursor />

            <Nav 
                onHireMeClick={() => {
                    setIsHireMeModalOpen(true);
                    trackEvent('hire_me_click');
                }} 
                theme={theme}
                toggleTheme={toggleTheme}
                settings={settings}
            />

            {/* Hero Section */}
            <section className="container mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-20 relative overflow-hidden">
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
                            className="text-5xl lg:text-7xl font-extrabold leading-tight text-text-main dark:text-white mb-8"
                        >
                            Welcome to Haris's <br /> 
                            <span className="gradient-text">Portfolio</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-text-muted dark:text-slate-400 max-w-lg mb-12 leading-relaxed"
                        >
                            Turning ideas into powerful web solutions.
                            Creating fast, secure, and reliable applications that drive real results.
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-6 items-center"
                        >
                            <Magnetic>
                                <button 
                                    onClick={() => {
                                        setIsHireMeModalOpen(true);
                                        trackEvent('hire_me_click');
                                    }}
                                    className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-hover shadow-xl shadow-primary/30 flex items-center gap-2 group transition-all"
                                >
                                    Hire Me <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </Magnetic>

                            {settings?.resume_url && (
                                <Magnetic>
                                    <a 
                                        href={settings.resume_url} 
                                        onClick={() => trackEvent('cv_download')}
                                        download="Haris Naseer"
                                        className="flex items-center gap-3 font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors group"
                                    >
                                        <div className="w-12 h-12 rounded-full border-2 border-gray-100 dark:border-slate-800 flex items-center justify-center group-hover:border-primary transition-all">
                                            <Download size={20} />
                                        </div>
                                        Download CV
                                    </a>
                                </Magnetic>
                            )}
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800 flex items-center gap-4"
                        >
                            <span className="text-xs font-black uppercase tracking-widest text-text-muted dark:text-slate-500 mr-4">Connect With Me:</span>
                            <div className="flex gap-4">
                                {settings?.social_github && (
                                    <Magnetic>
                                        <a href={settings.social_github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-primary-light transition-all border border-gray-100 dark:border-slate-800 hover:border-primary shadow-sm hover:shadow-premium">
                                            <Github size={20} />
                                        </a>
                                    </Magnetic>
                                )}
                                {settings?.social_twitter && (
                                    <Magnetic>
                                        <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-primary-light transition-all border border-gray-100 dark:border-slate-800 hover:border-primary shadow-sm hover:shadow-premium">
                                            <Twitter size={20} />
                                        </a>
                                    </Magnetic>
                                )}
                                {settings?.social_linkedin && (
                                    <Magnetic>
                                        <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-primary-light transition-all border border-gray-100 dark:border-slate-800 hover:border-primary shadow-sm hover:shadow-premium">
                                            <Linkedin size={20} />
                                        </a>
                                    </Magnetic>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    <div className="md:w-1/2 relative lg:flex lg:justify-end">
                        <div className="relative z-10">
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-64 h-64 md:w-80 md:h-80 bg-white dark:bg-slate-900 rounded-[3rem] p-4 shadow-premium border-8 border-white/50 dark:border-slate-800/50 overflow-hidden"
                            >
                                <img src={settings?.hero_image_url || "/api/placeholder/400/400"} alt="Profile" className="w-full h-full object-cover rounded-[2rem] animate-float" />
                            </motion.div>
                            
                            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 animate-bounce">
                                <div className="flex -space-x-3 mb-2">
                                    {[1,2,2].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary dark:text-primary-light">HS</div>)}
                                </div>
                                <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tighter">5+ Years Exp.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialization Section */}
            <section id="services" className="section-padding bg-white dark:bg-slate-950/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-10">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">What I Do</span>
                        <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white">I'm Specialized In</h2>
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
                        <div className="mt-10 text-center">
                            <button 
                                onClick={() => setShowAllServices(true)}
                                className="px-10 py-4 border-2 border-primary text-primary dark:text-primary-light rounded-full font-bold hover:bg-primary hover:text-white transition-all group lg:text-lg"
                            >
                                View All Services <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="section-padding">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
                        <div className="md:w-1/2">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">My Talent</span>
                            <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white mb-6">Professional <br />Skills & Tools</h2>
                            <p className="text-lg text-text-muted dark:text-slate-400 mb-8 leading-relaxed">
                                I spend every day honing my craft. I'm constantly learning new technologies and techniques to stay at the top of my game and deliver the best results for my clients.
                            </p>
                            <div className="flex gap-4">
                                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center text-green-600">
                                        <Code size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Mastery</p>
                                        <p className="font-bold dark:text-white">Coding</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600">
                                        <Palette size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Mastery</p>
                                        <p className="font-bold dark:text-white">Design</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2 w-full">
                            <AnimatePresence mode="popLayout">
                                {skillsToDisplay.map((s, idx) => (
                                    <motion.div
                                        key={s.id || idx}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <SkillBar skill={s.name} percentage={s.percentage} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {displaySkills.length > 4 && !showAllSkills && (
                                <div className="mt-8">
                                    <button 
                                        onClick={() => setShowAllSkills(true)}
                                        className="px-10 py-4 border-2 border-primary text-primary dark:text-primary-light rounded-full font-bold hover:bg-primary hover:text-white transition-all group lg:text-lg"
                                    >
                                        View All Skills <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="section-padding bg-accent-blue-soft/30 dark:bg-slate-950/30">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-10">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">My Journey</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">Work Experience</h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {experiencesToDisplay.map((exp, index) => (
                                <div key={index} className="group flex gap-8">
                                    <div className="flex flex-col items-center">
                                        <div className="w-5 h-5 rounded-full bg-primary ring-8 ring-primary/10" />
                                        <div className="flex-1 w-px bg-gray-100 dark:bg-slate-800 my-2 group-last:hidden" />
                                    </div>
                                    <div className="pb-10 group-last:pb-0">
                                        <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-xs font-black uppercase tracking-widest mb-4">
                                            {exp.duration || exp.year}
                                        </span>
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">{exp.role || exp.title}</h3>
                                        <p className="text-lg font-bold text-text-muted dark:text-slate-400">{exp.company}</p>
                                        <p className="mt-4 text-text-muted dark:text-slate-400 leading-relaxed italic border-l-4 border-gray-100 dark:border-slate-800 pl-6">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {displayExperiences.length > 4 && !showAllExperiences && (
                            <div className="mt-10 text-center">
                                <button 
                                    onClick={() => setShowAllExperiences(true)}
                                    className="px-10 py-4 border-2 border-primary text-primary dark:text-primary-light rounded-full font-bold hover:bg-primary hover:text-white transition-all group lg:text-lg"
                                >
                                    Load Full History <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials Bento Section */}
            {displayTestimonials?.length > 0 && (
                <section id="testimonials" className="section-padding bg-gray-50 dark:bg-slate-900/50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-10">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Social Proof</span>
                            <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white">Client Stories</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <AnimatePresence mode="popLayout">
                                {testimonialsToDisplay.map((t, idx) => (
                                    <motion.div 
                                        key={t.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-premium border border-gray-100 dark:border-slate-800 ${idx === 0 ? 'md:col-span-8' : idx === 1 ? 'md:col-span-4' : 'md:col-span-6'}`}
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/20">
                                                <img src={t.image_url || "/api/placeholder/100/100"} alt={t.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-900 dark:text-white leading-none mb-1">{t.name}</h4>
                                                <p className="text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-widest">{t.role} @ {t.company}</p>
                                            </div>
                                        </div>
                                        <p className="text-lg text-gray-500 dark:text-slate-400 font-medium italic leading-relaxed">
                                            "{t.content}"
                                        </p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {displayTestimonials.length > 4 && !showAllTestimonials && (
                            <div className="mt-10 text-center">
                                <button 
                                    onClick={() => setShowAllTestimonials(true)}
                                    className="px-10 py-4 border-2 border-primary text-primary dark:text-primary-light rounded-full font-bold hover:bg-primary hover:text-white transition-all group lg:text-lg"
                                >
                                    View All Testimonials <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Projects Section */}
            <section id="projects" className="section-padding">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-8">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">My Works</span>
                            <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white leading-tight">Recent Featured <br />Projects</h2>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-slate-900 p-2 rounded-2xl border border-gray-200 dark:border-slate-800">
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === cat ? 'bg-primary text-white shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:text-primary'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
                        <AnimatePresence mode="popLayout">
                            {projectsToDisplay.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProjects.length > 4 && !showAllProjects && (
                        <div className="mt-10 text-center">
                            <button 
                                onClick={() => setShowAllProjects(true)}
                                className="px-10 py-4 border-2 border-primary text-primary dark:text-primary-light rounded-full font-bold hover:bg-primary hover:text-white transition-all group lg:text-lg"
                            >
                                View All Projects <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Blog Section Highlights */}
            {displayPosts?.length > 0 && (
                <section id="blog" className="section-padding">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Insights</span>
                                <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white italic">Latest Articles</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {postsToDisplay.map((post) => (
                                    <motion.div 
                                        key={post.id}
                                        whileHover={{ y: -10 }}
                                        className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-premium border border-gray-100 dark:border-slate-800 group"
                                    >
                                        <div className="h-48 overflow-hidden">
                                            <img src={post.featured_image || "/api/placeholder/400/250"} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="p-8">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block italic">{new Date(post.created_at).toLocaleDateString()}</span>
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 line-clamp-2">{post.title}</h3>
                                            <p className="text-gray-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">{post.excerpt || post.content.substring(0, 100)}</p>
                                            <div className="flex items-center gap-2 text-primary dark:text-primary-light font-black text-sm group-hover:gap-4 transition-all">
                                                Read Article <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {displayPosts.length > 4 && !showAllPosts && (
                            <div className="mt-10 text-center">
                                <button 
                                    onClick={() => setShowAllPosts(true)}
                                    className="px-10 py-4 border-2 border-primary text-primary dark:text-primary-light rounded-full font-bold hover:bg-primary hover:text-white transition-all group lg:text-lg"
                                >
                                    View All Articles <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section id="contact" className="section-padding bg-accent-blue-soft/30 dark:bg-slate-950/30">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-[3rem] shadow-premium overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-slate-800">
                        <div className="lg:w-1/2 bg-primary p-12 lg:p-20 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tighter">Let's talk about<br />your project.</h2>
                                
                                <div className="space-y-8">
                                    <div className="flex gap-6 items-center">
                                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-xs font-black uppercase tracking-widest">Email Me</p>
                                            <p className="text-xl font-bold">{settings?.contact_email || "harisnaseer3@gmail.com"}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-center">
                                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-xs font-black uppercase tracking-widest">Call Me</p>
                                            <p className="text-xl font-bold">{settings?.contact_phone || "+92 344 1518890"}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-center">
                                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-white/60 text-xs font-black uppercase tracking-widest">Location</p>
                                            <p className="text-xl font-bold">{settings?.contact_location || "Islamabad, Pakistan"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/30 blur-[100px] rounded-full -ml-32 -mb-32" />
                        </div>
                        
                        <div className="lg:w-1/2 p-12 lg:p-20 bg-white dark:bg-slate-900">
                            {usePage().props.flash?.success && (
                                <div className="mb-8 p-6 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 text-green-700 dark:text-green-400 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shrink-0">
                                        <CheckCircle size={24} />
                                    </div>
                                    <p className="font-bold">{usePage().props.flash.success}</p>
                                </div>
                            )}

                            <form onSubmit={handleContactSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-black uppercase text-text-muted dark:text-slate-400 mb-2">First Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={contactData.first_name}
                                            onChange={e => setContactData('first_name', e.target.value)}
                                            className="w-full px-6 py-4 bg-accent-blue-soft dark:bg-slate-800 border-0 dark:border dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white" 
                                            placeholder="John" 
                                        />
                                        {contactErrors.first_name && <p className="text-red-500 text-xs mt-1 font-bold">{contactErrors.first_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-black uppercase text-text-muted dark:text-slate-400 mb-2">Last Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={contactData.last_name}
                                            onChange={e => setContactData('last_name', e.target.value)}
                                            className="w-full px-6 py-4 bg-accent-blue-soft dark:bg-slate-800 border-0 dark:border dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white" 
                                            placeholder="Doe" 
                                        />
                                        {contactErrors.last_name && <p className="text-red-500 text-xs mt-1 font-bold">{contactErrors.last_name}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase text-text-muted dark:text-slate-400 mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={contactData.email}
                                        onChange={e => setContactData('email', e.target.value)}
                                        className="w-full px-6 py-4 bg-accent-blue-soft dark:bg-slate-800 border-0 dark:border dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white" 
                                        placeholder="john@example.com" 
                                    />
                                    {contactErrors.email && <p className="text-red-500 text-xs mt-1 font-bold">{contactErrors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase text-text-muted dark:text-slate-400 mb-2">Subject</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={contactData.subject}
                                        onChange={e => setContactData('subject', e.target.value)}
                                        className="w-full px-6 py-4 bg-accent-blue-soft dark:bg-slate-800 border-0 dark:border dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white" 
                                        placeholder="Project Inquiry" 
                                    />
                                    {contactErrors.subject && <p className="text-red-500 text-xs mt-1 font-bold">{contactErrors.subject}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase text-text-muted dark:text-slate-400 mb-2">Message</label>
                                    <textarea 
                                        rows="5" 
                                        required
                                        value={contactData.message}
                                        onChange={e => setContactData('message', e.target.value)}
                                        className="w-full px-6 py-4 bg-accent-blue-soft dark:bg-slate-800 border-0 dark:border dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none dark:text-white" 
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

            <footer className="py-20 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-900">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                            <div className="flex items-center gap-2">
                                {settings?.logo_url ? (
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                                        <img src={settings.logo_url} alt="Logo" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white rotate-3 group-hover:rotate-12 transition-transform font-black text-xl shadow-lg shadow-primary/20">H</div>
                                )}
                            </div>
                            
                            <div className="flex flex-col border-l border-gray-200 dark:border-slate-800 pl-4 text-left">
                                <span className="text-lg font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none">
                                    {settings?.site_name || "Haris Naseer"}
                                </span>
                                <span className="text-[10px] font-bold text-primary dark:text-primary-light uppercase tracking-[0.2em] mt-1 leading-none">
                                    Web Developer
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex gap-10">
                            {categories.filter(c => c !== 'ALL').map(c => (
                                <button key={c} onClick={() => { setActiveTab(c); window.scrollTo({top: document.getElementById('projects').offsetTop, behavior: 'smooth'}); }} className="text-sm font-bold text-gray-400 hover:text-primary transition-all uppercase tracking-widest">{c}</button>
                            ))}
                        </div>

                        <div className="flex gap-6">
                            {settings?.social_github && (
                                <a href={settings.social_github} className="w-12 h-12 bg-gray-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary transition-all border border-gray-100 dark:border-slate-800 hover:border-primary">
                                    <Github size={20} />
                                </a>
                            )}
                            {settings?.social_twitter && (
                                <a href={settings.social_twitter} className="w-12 h-12 bg-gray-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary transition-all border border-gray-100 dark:border-slate-800 hover:border-primary">
                                    <Twitter size={20} />
                                </a>
                            )}
                            {settings?.social_linkedin && (
                                <a href={settings.social_linkedin} className="w-12 h-12 bg-gray-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary transition-all border border-gray-100 dark:border-slate-800 hover:border-primary">
                                    <Linkedin size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-20 pt-10 border-t border-gray-50 dark:border-slate-900 text-center">
                        <p className="text-gray-400 font-bold text-sm">
                            {settings?.footer_copyright || "© 2026 Haris Naseer. All rights reserved."}
                        </p>
                    </div>
                </div>
            </footer>

            {/* Hire Me Modal */}
            <Modal show={isHireMeModalOpen} onClose={() => setIsHireMeModalOpen(false)}>
                <div className="p-8 md:p-12 bg-white dark:bg-slate-900">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 italic">Work With Me</h2>
                            <p className="text-text-muted dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Let's create something extraordinary together</p>
                        </div>
                        <button onClick={() => setIsHireMeModalOpen(false)} className="w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-gray-400 hover:rotate-90 transition-all">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-black uppercase text-text-muted dark:text-slate-400 mb-2">First Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={contactData.first_name}
                                    onChange={e => setContactData('first_name', e.target.value)}
                                    className="w-full px-6 py-4 bg-accent-blue-soft dark:bg-slate-800 border-0 dark:border dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white" 
                                    placeholder="Haris" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-black uppercase text-text-muted dark:text-slate-400 mb-2">Last Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={contactData.last_name}
                                    onChange={e => setContactData('last_name', e.target.value)}
                                    className="w-full px-6 py-4 bg-accent-blue-soft dark:bg-slate-800 border-0 dark:border dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white" 
                                    placeholder="Naseer" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-black uppercase text-text-muted dark:text-slate-400 mb-2">Your Email</label>
                            <input 
                                type="email" 
                                required
                                value={contactData.email}
                                onChange={e => setContactData('email', e.target.value)}
                                className="w-full px-6 py-4 bg-accent-blue-soft dark:bg-slate-800 border-0 dark:border dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white" 
                                placeholder="name@company.com" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black uppercase text-text-muted dark:text-slate-400 mb-2">What service do you need?</label>
                            <input 
                                type="text" 
                                required
                                value={contactData.subject}
                                onChange={e => setContactData('subject', e.target.value)}
                                className="w-full px-6 py-4 bg-accent-blue-soft dark:bg-slate-800 border-0 dark:border dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white" 
                                placeholder="Web Development, Design, etc." 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black uppercase text-text-muted dark:text-slate-400 mb-2">Project Details</label>
                            <textarea 
                                rows="4" 
                                required
                                value={contactData.message}
                                onChange={e => setContactData('message', e.target.value)}
                                className="w-full px-6 py-4 bg-accent-blue-soft dark:bg-slate-800 border-0 dark:border dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none dark:text-white" 
                                placeholder="Tell me a bit about your goals..."
                            ></textarea>
                        </div>
                        <button 
                            type="submit"
                            disabled={processingContact}
                            className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-hover shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                        >
                            {processingContact ? 'Sending Inquiry...' : 'Send Inquiry'} <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
