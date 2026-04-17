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

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '',
        category: '',
        link: '',
        image: null,
        order_index: '',
    });

    const openModal = (project = null) => {
        clearErrors();
        if (project) {
            setEditingProject(project);
            setData({
                title: project.title,
                category: project.category,
                link: project.link || '',
                image: null, // We handle new image separately
                order_index: project.order_index || '',
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
        
        // Use post with _method spoofing for file uploads on update
        if (editingProject) {
            post(route('admin.projects.update', editingProject.id), {
                forceFormData: true,
                onSuccess: () => closeModal(),
                onBefore: (request) => {
                    request.data._method = 'put';
                }
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
            post(route('admin.projects.destroy', id), {
                onBefore: (request) => {
                    request.data._method = 'delete';
                }
            });
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
                                        <h4 className="text-lg font-bold text-gray-900 line-clamp-1">{project.title}</h4>
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

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="xl">
                <form onSubmit={submit} className="p-8">
                    <h2 className="text-2xl font-bold mb-6">
                        {editingProject ? 'Edit Project' : 'Add New Project'}
                    </h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 md:col-span-1">
                                <InputLabel htmlFor="title" value="Project Title" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="mt-1 block w-full !rounded-xl"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <InputLabel htmlFor="category" value="Category" />
                                <select
                                    id="category"
                                    className="mt-1 block w-full border-gray-300 focus:border-primary focus:ring-primary rounded-xl shadow-sm font-medium"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <InputError message={errors.category} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="link" value="Project Link (Optional)" />
                            <TextInput
                                id="link"
                                type="text"
                                className="mt-1 block w-full !rounded-xl"
                                value={data.link}
                                onChange={(e) => setData('link', e.target.value)}
                                placeholder="https://..."
                            />
                            <InputError message={errors.link} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="image" value="Project Image" />
                            <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-primary transition-colors h-48 relative overflow-hidden group">
                                {data.image ? (
                                    <div className="absolute inset-0 p-2">
                                        <img 
                                            src={URL.createObjectURL(data.image)} 
                                            className="w-full h-full object-cover rounded-xl"
                                            alt="Preview"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <ImageIcon className="mx-auto text-gray-300 mb-2" size={32} />
                                        <p className="text-xs text-gray-500 font-medium">Click to upload image</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                    accept="image/*"
                                />
                            </div>
                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="order_index" value="Sort Order" />
                            <TextInput
                                id="order_index"
                                type="number"
                                className="mt-1 block w-full !rounded-xl"
                                value={data.order_index}
                                onChange={(e) => setData('order_index', e.target.value)}
                            />
                            <InputError message={errors.order_index} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="!rounded-xl">Cancel</SecondaryButton>
                        <PrimaryButton className="!rounded-xl" disabled={processing}>
                            {editingProject ? 'Update Project' : 'Publish Project'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
