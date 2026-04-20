import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Layout, Zap, Rocket, Briefcase, Plus, ExternalLink, ArrowRight, MessageSquare, Star, BookOpen, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ auth, stats, analytics }) {
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
            value: `${stats.experiences} Roles`,
            icon: Briefcase,
            color: 'bg-purple-500',
            link: route('admin.experiences.index'),
            description: 'Your professional journey'
        },
        {
            label: 'Blog Posts',
            value: stats.posts,
            icon: BookOpen,
            color: 'bg-orange-500',
            link: route('admin.posts.index'),
            description: 'Engaging with your audience'
        },
        {
            label: 'Testimonials',
            value: stats.testimonials,
            icon: Star,
            color: 'bg-yellow-500',
            link: route('admin.testimonials.index'),
            description: 'Social proof & trust'
        }
    ];

    const quickStats = [
        { label: 'Skills', value: stats.skills, icon: Zap, color: 'text-primary' },
        { label: 'Services', value: stats.services, icon: Rocket, color: 'text-blue-500' },
        { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'text-green-500' },
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
                            <div className="flex gap-4">
                                <Link 
                                    href={route('home')} 
                                    target="_blank"
                                    className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-xl"
                                >
                                    View Live Portfolio <ExternalLink size={18} />
                                </Link>
                                <div className="flex items-center gap-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                    {quickStats.map((stat, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <span className="text-xs font-black uppercase text-white/60 tracking-wider font-sans">{stat.label}</span>
                                            <span className="text-xl font-black">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
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

                    {/* Analytics Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-premium overflow-hidden">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <TrendingUp size={20} />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900">Portfolio Activity</h4>
                                </div>
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Last 30 Days</span>
                            </div>
                            
                            <div className="h-72 w-full">
                                {analytics.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={analytics}>
                                            <defs>
                                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                                                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                                itemStyle={{ fontWeight: 800, fontSize: '12px' }}
                                                labelStyle={{ fontWeight: 800, color: '#94A3B8', marginBottom: '4px' }}
                                            />
                                            <Area type="monotone" dataKey="page_view" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
                                            <Area type="monotone" dataKey="hire_me_click" stroke="#EC4899" strokeWidth={3} fill="none" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                        <TrendingUp size={48} className="mb-4 opacity-10" />
                                        <p className="font-bold">No activity data yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-premium">
                             <h4 className="text-lg font-bold mb-6 text-gray-900">Quick Actions</h4>
                             <div className="grid grid-cols-1 gap-4">
                                 <Link href={route('admin.projects.index')} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 hover:text-primary transition-all group">
                                     <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                         <Plus size={18} />
                                     </div>
                                     <span className="text-sm font-bold">New Project</span>
                                 </Link>
                                 <Link href={route('admin.posts.index')} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 hover:text-primary transition-all group">
                                     <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                         <BookOpen size={18} />
                                     </div>
                                     <span className="text-sm font-bold">Write Article</span>
                                 </Link>
                                 <Link href={route('admin.testimonials.index')} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 hover:text-primary transition-all group">
                                     <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                         <Star size={18} />
                                     </div>
                                     <span className="text-sm font-bold">Add Testimonial</span>
                                 </Link>
                                 <Link href={route('admin.settings.index')} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 hover:text-primary transition-all group">
                                     <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                         <Zap size={18} />
                                     </div>
                                     <span className="text-sm font-bold">Preferences</span>
                                 </Link>
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
