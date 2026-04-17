import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Layout, Zap, Rocket, Briefcase, Plus, ExternalLink, ArrowRight } from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    const statCards = [
        {
            label: 'Total Projects',
            value: stats.projects,
            icon: Layout,
            color: 'bg-indigo-500',
            link: route('admin.projects.index'),
            description: 'Showcasing your best works'
        },
        {
            label: 'Experience',
            value: `${stats.experiences} Years/Roles`,
            icon: Briefcase,
            color: 'bg-purple-500',
            link: route('admin.experiences.index'),
            description: 'Your professional journey'
        },
        {
            label: 'Skills',
            value: stats.skills,
            icon: Zap,
            color: 'bg-primary',
            link: route('admin.skills.index'),
            description: 'Technical competencies'
        },
        {
            label: 'Services',
            value: stats.services,
            icon: Rocket,
            color: 'bg-blue-500',
            link: route('admin.services.index'),
            description: 'Specialized offerings'
        }
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl font-bold leading-tight text-gray-800">
                        Welcome back, {auth.user.name} 👋
                    </h2>
                    <div className="text-sm text-gray-500 font-medium">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            }
        >
            <Head title="Portfolio Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Hero Section */}
                    <div className="relative overflow-hidden bg-primary rounded-[2.5rem] p-10 text-white shadow-premium shadow-primary/20">
                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-3xl font-black mb-4">You're in Control.</h3>
                            <p className="text-primary-light/80 text-lg mb-8">
                                Manage your portfolio data, upload new projects, and update your professional profile all from one place.
                            </p>
                            <Link 
                                href={route('home')} 
                                target="_blank"
                                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-xl"
                            >
                                View Live Portfolio <ExternalLink size={18} />
                            </Link>
                        </div>
                        {/* Abstract background shapes */}
                        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 translate-y-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((stat, idx) => (
                            <Link key={idx} href={stat.link} className="group overflow-hidden bg-white border border-gray-100 rounded-[2rem] p-6 shadow-premium hover:border-primary/20 transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-4 rounded-xl ${stat.color} text-white shadow-lg`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <ArrowRight className="text-gray-200 group-hover:text-primary transition-colors" size={20} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-gray-400 text-xs font-black uppercase tracking-widest">{stat.label}</h4>
                                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                                    <p className="text-xs text-gray-400 font-medium">{stat.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-premium">
                            <h4 className="text-lg font-bold mb-6 text-gray-900">Quick Actions</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href={route('admin.projects.index')} className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-3xl hover:bg-primary/5 hover:text-primary transition-all group">
                                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                        <Plus size={20} />
                                    </div>
                                    <span className="text-sm font-bold">New Project</span>
                                </Link>
                                <Link href={route('admin.skills.index')} className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-3xl hover:bg-primary/5 hover:text-primary transition-all group">
                                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                        <Zap size={20} />
                                    </div>
                                    <span className="text-sm font-bold">Add Skill</span>
                                </Link>
                                <Link href={route('admin.services.index')} className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-3xl hover:bg-primary/5 hover:text-primary transition-all group">
                                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                        <Rocket size={20} />
                                    </div>
                                    <span className="text-sm font-bold">New Service</span>
                                </Link>
                                <Link href={route('admin.experiences.index')} className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-3xl hover:bg-primary/5 hover:text-primary transition-all group">
                                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                        <Briefcase size={20} />
                                    </div>
                                    <span className="text-sm font-bold">Add Exp</span>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-premium flex flex-col justify-center text-center">
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Layout size={32} />
                            </div>
                            <h4 className="text-xl font-bold mb-2">Portfolio Analytics</h4>
                            <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                                You currently have {stats.projects} active projects and {stats.skills} technical skills listed on your portfolio.
                            </p>
                            <Link 
                                href={route('admin.projects.index')} 
                                className="text-primary font-bold hover:underline inline-flex items-center justify-center gap-1"
                            >
                                Manage everything <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
