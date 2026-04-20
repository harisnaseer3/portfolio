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
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Manage Testimonials</h2>}
        >
            <Head title="Testimonials Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Client Reviews</h3>
                            <p className="text-gray-500 text-sm font-medium">Build trust by showcasing what others say about you.</p>
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
                            <div key={t.id} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-premium group relative">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        {t.image_url ? (
                                            <img src={t.image_url} alt={t.name} className="w-14 h-14 rounded-2xl object-cover" />
                                        ) : (
                                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                                                <Star size={24} />
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-black text-gray-900 leading-none mb-1">{t.name}</h4>
                                            <p className="text-xs font-bold text-primary uppercase tracking-widest leading-none">{t.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal(t)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed italic mb-4">"{t.content}"</p>
                                <div className="text-xs font-black text-gray-300 uppercase tracking-widest">{t.company}</div>
                            </div>
                        ))}
                    </div>

                    {testimonials.length === 0 && (
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-20 text-center shadow-premium">
                            <Star size={48} className="mx-auto text-gray-200 mb-6" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">No testimonials yet</h4>
                            <p className="text-gray-500 max-w-xs mx-auto mb-8">Start collecting feedback from your clients to build social proof.</p>
                            <button onClick={() => openModal()} className="text-primary font-black hover:underline">Add your first one</button>
                        </div>
                    )}
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-black text-gray-900 italic">
                            {editingTestimonial ? 'Update Review' : 'New Testimonial'}
                        </h2>
                        <button type="button" onClick={closeModal} className="p-2 hover:rotate-90 transition-all text-gray-400"><X size={24} /></button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <InputLabel htmlFor="name" value="Client Name" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                            <TextInput
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full !rounded-2xl !border-gray-100 bg-gray-50"
                                required
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="space-y-2">
                            <InputLabel htmlFor="role" value="Role / Title" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                            <TextInput
                                id="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full !rounded-2xl !border-gray-100 bg-gray-50"
                                placeholder="CEO, Lead Designer, etc."
                            />
                            <InputError message={errors.role} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="company" value="Company Name" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                        <TextInput
                            id="company"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                            className="w-full !rounded-2xl !border-gray-100 bg-gray-50"
                        />
                        <InputError message={errors.company} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="content" value="The Testimonial Content" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                        <textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="w-full rounded-2xl border-gray-100 bg-gray-50 focus:ring-primary focus:border-primary min-h-[120px]"
                            required
                        ></textarea>
                        <InputError message={errors.content} />
                    </div>

                    <div className="grid grid-cols-2 gap-6 items-end">
                        <div className="space-y-2">
                            <InputLabel value="Client Photo" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                            <div className="flex items-center gap-4">
                                <label className="flex-1 flex flex-col items-center justify-center h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-primary/50 transition-all">
                                    <ImageIcon size={20} className="text-gray-400 mb-2" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Upload Image</span>
                                    <input type="file" className="hidden" onChange={(e) => setData('image', e.target.files[0])} accept="image/*" />
                                </label>
                            </div>
                            <InputError message={errors.image} />
                        </div>
                        <div className="space-y-2">
                            <InputLabel htmlFor="order_index" value="Sort Order" className="uppercase text-[10px] font-black tracking-widest text-gray-400" />
                            <TextInput
                                type="number"
                                id="order_index"
                                value={data.order_index}
                                onChange={(e) => setData('order_index', e.target.value)}
                                className="w-full !rounded-2xl !border-gray-100 bg-gray-50"
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
