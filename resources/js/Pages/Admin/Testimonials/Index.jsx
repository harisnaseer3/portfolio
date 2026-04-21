import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Trash2, Edit2, Star, Image as ImageIcon, X } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';

export default function Index({ testimonials }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        role: '',
        company: '',
        content: '',
        image: null,
        order_index: 0,
    });

    const openModal = (testimonial = null) => {
        setEditingTestimonial(testimonial);
        if (testimonial) {
            setData({
                name: testimonial.name,
                role: testimonial.role || '',
                company: testimonial.company || '',
                content: testimonial.content,
                image: null,
                order_index: testimonial.order_index,
            });
        } else {
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTestimonial(null);
        clearErrors();
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTestimonial) {
            // Using POST with _method=PUT because of file upload issues with PUT in Laravel
            post(route('admin.testimonials.update', editingTestimonial.id), {
                forceFormData: true,
                onSuccess: () => closeModal(),
                data: { ...data, _method: 'PUT' }
            });
        } else {
            post(route('admin.testimonials.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            destroy(route('admin.testimonials.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-[var(--text-main)]">Manage Testimonials</h2>}
        >
            <Head title="Testimonials Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-[var(--text-main)] tracking-tight">Client Reviews</h3>
                            <p className="text-[var(--text-muted)] text-sm font-medium">Build trust by showcasing what others say about you.</p>
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                        >
                            <Plus size={20} /> Add Testimonial
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <div key={t.id} className="bg-[var(--bg-card)] rounded-[2.5rem] border border-[var(--border-main)] p-8 shadow-premium group relative">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        {t.image_url ? (
                                            <img src={t.image_url} alt={t.name} className="w-14 h-14 rounded-2xl object-cover" />
                                        ) : (
                                            <div className="w-14 h-14 bg-[var(--bg-input)] rounded-2xl flex items-center justify-center text-[var(--text-muted)]">
                                                <Star size={24} />
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-black text-[var(--text-main)] leading-none mb-1">{t.name}</h4>
                                            <p className="text-xs font-bold text-primary uppercase tracking-widest leading-none">{t.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal(t)} className="p-2 text-[var(--text-muted)] hover:text-primary hover:bg-primary/5 rounded-xl transition-all"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(t.id)} className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                                <p className="text-[var(--text-muted)] text-sm leading-relaxed italic mb-4">"{t.content}"</p>
                                <div className="text-xs font-black text-[var(--text-muted)] opacity-50 uppercase tracking-widest">{t.company}</div>
                            </div>
                        ))}
                    </div>

                    {testimonials.length === 0 && (
                        <div className="bg-[var(--bg-card)] rounded-[2.5rem] border border-[var(--border-main)] p-20 text-center shadow-premium">
                            <Star size={48} className="mx-auto text-[var(--border-main)] mb-6" />
                            <h4 className="text-xl font-bold text-[var(--text-main)] mb-2">No testimonials yet</h4>
                            <p className="text-[var(--text-muted)] max-w-xs mx-auto mb-8">Start collecting feedback from your clients to build social proof.</p>
                            <button onClick={() => openModal()} className="text-primary font-black hover:underline">Add your first one</button>
                        </div>
                    )}
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-black text-[var(--text-main)] italic">
                            {editingTestimonial ? 'Update Review' : 'New Testimonial'}
                        </h2>
                        <button type="button" onClick={closeModal} className="p-2 hover:rotate-90 transition-all text-[var(--text-muted)]"><X size={24} /></button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <InputLabel htmlFor="name" value="Client Name" className="uppercase text-[10px] font-black tracking-widest text-[var(--text-muted)]" />
                            <TextInput
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full !rounded-2xl border-[var(--border-main)] bg-[var(--bg-input)]"
                                required
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="space-y-2">
                            <InputLabel htmlFor="role" value="Role / Title" className="uppercase text-[10px] font-black tracking-widest text-[var(--text-muted)]" />
                            <TextInput
                                id="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full !rounded-2xl border-[var(--border-main)] bg-[var(--bg-input)]"
                                placeholder="CEO, Lead Designer, etc."
                            />
                            <InputError message={errors.role} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="company" value="Company Name" className="uppercase text-[10px] font-black tracking-widest text-[var(--text-muted)]" />
                        <TextInput
                            id="company"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                            className="w-full !rounded-2xl border-[var(--border-main)] bg-[var(--bg-input)]"
                        />
                        <InputError message={errors.company} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="content" value="The Testimonial Content" className="uppercase text-[10px] font-black tracking-widest text-[var(--text-muted)]" />
                        <textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="w-full rounded-2xl border-[var(--border-main)] bg-[var(--bg-input)] text-[var(--text-main)] focus:ring-primary focus:border-primary min-h-[120px]"
                            required
                        ></textarea>
                        <InputError message={errors.content} />
                    </div>

                    <div className="grid grid-cols-2 gap-6 items-end">
                        <div className="space-y-2">
                            <InputLabel value="Client Photo" className="uppercase text-[10px] font-black tracking-widest text-[var(--text-muted)]" />
                            <div className="flex items-center gap-4">
                                <label className="flex-1 flex flex-col items-center justify-center h-24 bg-[var(--bg-input)] border-2 border-dashed border-[var(--border-main)] rounded-2xl cursor-pointer hover:border-primary/50 transition-all">
                                    <ImageIcon size={20} className="text-[var(--text-muted)] mb-2" />
                                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">Upload Image</span>
                                    <input type="file" className="hidden" onChange={(e) => setData('image', e.target.files[0])} accept="image/*" />
                                </label>
                            </div>
                            <InputError message={errors.image} />
                        </div>
                        <div className="space-y-2">
                            <InputLabel htmlFor="order_index" value="Sort Order" className="uppercase text-[10px] font-black tracking-widest text-[var(--text-muted)]" />
                            <TextInput
                                type="number"
                                id="order_index"
                                value={data.order_index}
                                onChange={(e) => setData('order_index', e.target.value)}
                                className="w-full !rounded-2xl border-[var(--border-main)] bg-[var(--bg-input)]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <SecondaryButton onClick={closeModal} className="!rounded-2xl">Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing} className="!bg-primary !px-8 !py-4 !rounded-2xl !text-white shadow-lg shadow-primary/20">
                            {editingTestimonial ? 'Update' : 'Create'} Testimonial
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
