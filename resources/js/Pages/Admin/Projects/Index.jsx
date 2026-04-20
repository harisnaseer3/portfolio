import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Layout, ExternalLink, Image as ImageIcon } from 'lucide-react';

export default function Index({ auth, projects }) {
    const [editingProject, setEditingProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, delete: destroy, processing, errors, reset, clearErrors, transform } = useForm({
        title: '',
        category: '',
        link: '',
        image: null,
        order_index: '',
        tech_stack: [],
        case_study: '',
        gallery: [],
    });

    const [techInput, setTechInput] = useState('');

    const addTech = (e) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            if (!data.tech_stack.includes(techInput.trim())) {
                setData('tech_stack', [...data.tech_stack, techInput.trim()]);
            }
            setTechInput('');
        }
    };

    const removeTech = (tech) => {
        setData('tech_stack', data.tech_stack.filter(t => t !== tech));
    };

    const openModal = (project = null) => {
        clearErrors();
        if (project) {
            setEditingProject(project);
            setData({
                title: project.title,
                category: project.category,
                link: project.link || '',
                image: null,
                order_index: project.order_index || '',
                tech_stack: project.tech_stack || [],
                case_study: project.case_study || '',
                gallery: [],
            });
        } else {
            setEditingProject(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (editingProject) {
            post(route('admin.projects.update', editingProject.id), {
                forceFormData: true,
                onSuccess: () => closeModal(),
                data: { ...data, _method: 'put' }
            });
        } else {
            post(route('admin.projects.store'), {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteProject = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            destroy(route('admin.projects.destroy', id));
        }
    };

    const categories = ['MOBILE APP', 'WEB APP', 'UI/UX', 'BRANDING'];

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800 flex items-center gap-2">
                <Layout className="text-primary" /> Manage Portfolio Gallery
            </h2>}
        >
            <Head title="Projects Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-premium sm:rounded-[2.5rem] border border-gray-100 p-8 md:p-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Your Works</h3>
                                <p className="text-gray-500 text-sm">Upload images and links for your latest projects.</p>
                            </div>
                            <PrimaryButton onClick={() => openModal()} className="!rounded-xl flex items-center gap-2">
                                <Plus size={18} /> Add New Project
                            </PrimaryButton>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <div key={project.id} className="group relative bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-premium transition-all duration-300">
                                    <div className="aspect-video w-full bg-slate-200 overflow-hidden relative">
                                        {project.image_url ? (
                                            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <ImageIcon size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => openModal(project)}
                                                className="w-10 h-10 bg-white shadow-lg text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button 
                                                onClick={() => deleteProject(project.id)}
                                                className="w-10 h-10 bg-white shadow-lg text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black tracking-widest rounded-full uppercase">
                                                {project.category}
                                            </span>
                                            {project.link && (
                                                <a href={project.link} target="_blank" className="text-gray-400 hover:text-primary transition-colors">
                                                    <ExternalLink size={16} />
                                                </a>
                                            )}
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 line-clamp-1 mb-3">{project.title}</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech_stack?.slice(0, 3).map(tech => (
                                                <span key={tech} className="text-[9px] font-black uppercase tracking-wider bg-gray-200 text-gray-500 px-2 py-0.5 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech_stack?.length > 3 && <span className="text-[9px] font-black text-gray-400">+{project.tech_stack.length - 3} more</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {projects.length === 0 && (
                                <div className="col-span-full py-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                                    No projects found. Add your first masterpiece!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="4xl">
                <form onSubmit={submit} className="p-10 space-y-8 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-black text-gray-900 italic">
                        {editingProject ? 'Edit Masterpiece' : 'Add New Project'}
                    </h2>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <InputLabel htmlFor="title" value="Project Title" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="w-full !rounded-2xl !border-gray-100 bg-gray-50"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="category" value="Category" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                                <select
                                    id="category"
                                    className="w-full border-gray-100 focus:border-primary focus:ring-primary rounded-2xl bg-gray-50 font-bold text-sm h-[50px] px-4"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <InputError message={errors.category} />
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="link" value="External Link" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                                <TextInput
                                    id="link"
                                    type="text"
                                    className="w-full !rounded-2xl !border-gray-100 bg-gray-50"
                                    value={data.link}
                                    onChange={(e) => setData('link', e.target.value)}
                                    placeholder="https://..."
                                />
                                <InputError message={errors.link} />
                            </div>

                            <div className="space-y-2">
                                <InputLabel value="Tech Stack (Press Enter to add)" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-100 rounded-2xl min-h-[50px]">
                                    {data.tech_stack.map(tech => (
                                        <span key={tech} className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-2">
                                            {tech}
                                            <button type="button" onClick={() => removeTech(tech)}><X size={12} /></button>
                                        </span>
                                    ))}
                                    <input 
                                        type="text" 
                                        value={techInput}
                                        onChange={(e) => setTechInput(e.target.value)}
                                        onKeyDown={addTech}
                                        className="bg-transparent border-none focus:ring-0 text-sm flex-1 min-w-[80px]"
                                        placeholder="e.g. Next.js"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <InputLabel value="Main Cover Image" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                                <div className="relative h-44 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all cursor-pointer">
                                    {data.image ? (
                                        <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" alt="Preview" />
                                    ) : editingProject?.image_url ? (
                                        <img src={editingProject.image_url} className="w-full h-full object-cover opacity-50" alt="Current" />
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                            <ImageIcon size={24} className="mb-1" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Main Cover</span>
                                        </div>
                                    )}
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setData('image', e.target.files[0])} />
                                </div>
                                <InputError message={errors.image} />
                            </div>

                            <div className="space-y-2">
                                <InputLabel value="Gallery (Up to 5 images)" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                                <div className="grid grid-cols-3 gap-2">
                                    <label className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-primary/50 cursor-pointer">
                                        <Plus size={16} />
                                        <span className="text-[8px] font-black font-sans uppercase">Add</span>
                                        <input type="file" multiple className="hidden" onChange={(e) => setData('gallery', Array.from(e.target.files).slice(0, 5))} />
                                    </label>
                                    {data.gallery.map((file, i) => (
                                        <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-200">
                                            <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    {editingProject?.image_gallery?.map((url, i) => (
                                        <div key={`old-${i}`} className="aspect-square rounded-xl overflow-hidden bg-gray-200 opacity-50">
                                            <img src={url} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="order_index" value="Sort Order" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                                <TextInput
                                    id="order_index"
                                    type="number"
                                    className="w-full !rounded-2xl !border-gray-100 bg-gray-50"
                                    value={data.order_index}
                                    onChange={(e) => setData('order_index', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="case_study" value="Case Study (Markdown)" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                        <textarea
                            id="case_study"
                            className="w-full rounded-2xl border-gray-100 bg-gray-50 focus:ring-primary focus:border-primary min-h-[250px] font-mono text-sm leading-relaxed"
                            value={data.case_study}
                            onChange={(e) => setData('case_study', e.target.value)}
                            placeholder="# The Challenge&#10;Describe the problem you were solving...&#10;&#10;# The Solution&#10;Describe how you built it..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-50">
                        <SecondaryButton onClick={closeModal} className="!rounded-2xl">Cancel</SecondaryButton>
                        <PrimaryButton className="!bg-primary !px-10 !py-4 !rounded-2xl !text-white shadow-xl shadow-primary/20" disabled={processing}>
                            {editingProject ? 'Save Masterpiece' : 'Publish Project'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
