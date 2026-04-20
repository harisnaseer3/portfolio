import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Plus, Trash2, Edit2, BookOpen, Image as ImageIcon, X, Eye, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';

export default function Index({ posts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        title: '',
        content: '',
        excerpt: '',
        image: null,
        is_published: false,
    });

    const openModal = (blogPost = null) => {
        setEditingPost(blogPost);
        if (blogPost) {
            setData({
                title: blogPost.title,
                content: blogPost.content,
                excerpt: blogPost.excerpt || '',
                image: null,
                is_published: !!blogPost.is_published,
            });
        } else {
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPost(blogPost);
        clearErrors();
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPost) {
            post(route('admin.posts.update', editingPost.id), {
                forceFormData: true,
                onSuccess: () => closeModal(),
                data: { ...data, _method: 'PUT' }
            });
        } else {
            post(route('admin.posts.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            destroy(route('admin.posts.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Manage Blog Posts</h2>}
        >
            <Head title="Blog Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Articles & Insights</h3>
                            <p className="text-gray-500 text-sm font-medium">Showcase your technical expertise and share your journey.</p>
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                        >
                            <Plus size={20} /> Write Post
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {posts.map((p) => (
                            <div key={p.id} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-premium group flex flex-col md:flex-row gap-8 items-center">
                                <div className="w-full md:w-48 h-32 rounded-3xl overflow-hidden bg-gray-50 flex-shrink-0">
                                    {p.featured_image ? (
                                        <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <BookOpen size={32} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.is_published ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                            {p.is_published ? 'Published' : 'Draft'}
                                        </span>
                                        <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                                            <Clock size={12} /> {new Date(p.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-black text-gray-900">{p.title}</h4>
                                    <p className="text-gray-500 text-sm line-clamp-1">{p.excerpt || p.content.substring(0, 100) + '...'}</p>
                                    <div className="flex items-center gap-6 pt-2">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                            <Eye size={14} /> {p.views_count} Views
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row md:flex-col gap-2">
                                    <button onClick={() => openModal(p)} className="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all border border-transparent hover:border-primary/10"><Edit2 size={20} /></button>
                                    <button onClick={() => handleDelete(p.id)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"><Trash2 size={20} /></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-20 text-center shadow-premium">
                            <BookOpen size={48} className="mx-auto text-gray-200 mb-6" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Your blog is empty</h4>
                            <p className="text-gray-500 max-w-xs mx-auto mb-8">Share your knowledge with others. It's great for your personal brand!</p>
                            <button onClick={() => openModal()} className="text-primary font-black hover:underline">Write your first post</button>
                        </div>
                    )}
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="4xl">
                <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 italic leading-none">
                                    {editingPost ? 'Edit Post' : 'New Article'}
                                </h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Markdown is supported</p>
                            </div>
                        </div>
                        <button type="button" onClick={closeModal} className="p-2 hover:rotate-90 transition-all text-gray-400"><X size={24} /></button>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <InputLabel htmlFor="title" value="Article Title" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                            <TextInput
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full !rounded-2xl !border-gray-100 bg-gray-50 text-xl font-bold"
                                required
                                placeholder="How to build a SaaS with Laravel..."
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="space-y-2">
                            <InputLabel htmlFor="excerpt" value="Short Excerpt" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                            <TextInput
                                id="excerpt"
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                className="w-full !rounded-2xl !border-gray-100 bg-gray-50"
                                placeholder="A brief summary of the article..."
                            />
                            <InputError message={errors.excerpt} />
                        </div>

                        <div className="space-y-2">
                            <InputLabel htmlFor="content" value="Article Content (Markdown)" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full rounded-2xl border-gray-100 bg-gray-50 focus:ring-primary focus:border-primary min-h-[300px] font-mono text-sm"
                                required
                                placeholder="# Heading&#10;&#10;Write your content here..."
                            ></textarea>
                            <InputError message={errors.content} />
                        </div>

                        <div className="grid grid-cols-2 gap-8 items-center">
                             <div className="space-y-2">
                                <InputLabel value="Featured Image" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                                <label className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-primary/50 transition-all">
                                    <ImageIcon size={20} className="text-gray-400" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pick a cover image</span>
                                    <input type="file" className="hidden" onChange={(e) => setData('image', e.target.files[0])} accept="image/*" />
                                </label>
                                <InputError message={errors.image} />
                            </div>

                            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl">
                                <input
                                    type="checkbox"
                                    id="is_published"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    className="w-6 h-6 rounded-lg border-gray-300 text-primary focus:ring-primary"
                                />
                                <div className="flex flex-col">
                                    <label htmlFor="is_published" className="font-black text-gray-900 leading-none mb-1">Make it Public</label>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Publish to your portfolio</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-50">
                        <SecondaryButton onClick={closeModal} className="!rounded-2xl">Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing} className="!bg-primary !px-10 !py-4 !rounded-2xl !text-white shadow-xl shadow-primary/20">
                            {editingPost ? 'Save Changes' : 'Publish Article'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
