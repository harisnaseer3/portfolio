import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useState } from 'react';
import { Pencil, Trash2, Plus, GraduationCap } from 'lucide-react';

export default function Index({ auth, education }) {
    const [editingEducation, setEditingEducation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        title: '',
        institution: '',
        duration: '',
        description: '',
        icon: 'GraduationCap',
        order_index: '',
        credential_url: '',
    });

    const openModal = (edu = null) => {
        clearErrors();
        if (edu) {
            setEditingEducation(edu);
            setData({
                title: edu.title,
                institution: edu.institution,
                duration: edu.duration,
                description: edu.description,
                icon: edu.icon || 'GraduationCap',
                order_index: edu.order_index || '',
                credential_url: edu.credential_url || '',
            });
        } else {
            setEditingEducation(null);
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
        if (editingEducation) {
            put(route('admin.education.update', editingEducation.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.education.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteEducation = (id) => {
        if (confirm('Are you sure you want to delete this educational entry?')) {
            destroy(route('admin.education.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-text-main flex items-center gap-2">
                <GraduationCap className="text-primary" /> Manage Academic Foundation
            </h2>}
        >
            <Head title="Education Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[var(--bg-card)] text-text-main overflow-hidden shadow-premium sm:rounded-[2.5rem] border border-[var(--border-main)] p-8 md:p-12 transition-colors">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                            <div>
                                <h3 className="text-lg font-bold text-text-main">Your Degrees & Certifications</h3>
                                <p className="text-text-muted text-sm">Manage your academic achievements and professional certifications.</p>
                            </div>
                            <PrimaryButton onClick={() => openModal()} className="!rounded-xl flex items-center gap-2">
                                <Plus size={18} /> Add New Entry
                            </PrimaryButton>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {education.map((edu) => (
                                <div key={edu.id} className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-main)] hover:border-primary/20 hover:shadow-lg transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                                            <GraduationCap size={24} />
                                        </div>
                                        <div className="flex gap-1">
                                            <button 
                                                onClick={() => openModal(edu)}
                                                className="p-1.5 text-text-muted hover:text-primary transition-colors"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button 
                                                onClick={() => deleteEducation(edu.id)}
                                                className="p-1.5 text-text-muted hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-text-main mb-1">{edu.title}</h4>
                                    <p className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">{edu.institution}</p>
                                    <p className="text-xs text-text-muted line-clamp-2 mb-4 italic">"{edu.description}"</p>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-muted/50">
                                        <span>Duration: {edu.duration}</span>
                                        <span>Order: {edu.order_index || '0'}</span>
                                    </div>
                                </div>
                            ))}
                            {education.length === 0 && (
                                <div className="col-span-full py-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                                    No academic records listed.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="xl">
                <form onSubmit={submit} className="p-8 text-text-main">
                    <h2 className="text-2xl font-black text-text-main p-3 border-l-4 border-primary bg-primary/5 rounded-r-lg mb-6">
                        {editingEducation ? 'Edit Academic Entry' : 'Add New Academic Entry'}
                    </h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="title" value="Degree / Certification Title" className="uppercase text-[10px] font-black tracking-widest text-text-muted" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="mt-1 block w-full !rounded-xl"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g. B.Sc in Computer Science"
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="institution" value="Institution" className="uppercase text-[10px] font-black tracking-widest text-text-muted" />
                                <TextInput
                                    id="institution"
                                    type="text"
                                    className="mt-1 block w-full !rounded-xl"
                                    value={data.institution}
                                    onChange={(e) => setData('institution', e.target.value)}
                                    placeholder="e.g. Stanford University"
                                    required
                                />
                                <InputError message={errors.institution} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="duration" value="Duration / Year" className="uppercase text-[10px] font-black tracking-widest text-text-muted" />
                            <TextInput
                                id="duration"
                                type="text"
                                className="mt-1 block w-full !rounded-xl"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                placeholder="e.g. 2018 - 2022"
                                required
                            />
                            <InputError message={errors.duration} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Key Achievements / Description" className="uppercase text-[10px] font-black tracking-widest text-text-muted" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full !rounded-xl border-[var(--border-main)] bg-[var(--bg-input)] text-text-main focus:border-primary focus:ring-primary shadow-sm h-32 p-4"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                required
                                placeholder="Highlight your academic focus or key certification modules..."
                            ></textarea>
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <InputLabel htmlFor="icon" value="Icon Name" className="uppercase text-[10px] font-black tracking-widest text-text-muted" />
                                <TextInput
                                    id="icon"
                                    type="text"
                                    className="mt-1 block w-full !rounded-xl"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    placeholder="e.g. GraduationCap"
                                />
                                <InputError message={errors.icon} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="order_index" value="Sort Order" className="uppercase text-[10px] font-black tracking-widest text-text-muted" />
                                <TextInput
                                    id="order_index"
                                    type="number"
                                    className="mt-1 block w-full !rounded-xl"
                                    value={data.order_index}
                                    onChange={(e) => setData('order_index', e.target.value)}
                                />
                                <InputError message={errors.order_index} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="credential_url" value="Verify URL (Link)" className="uppercase text-[10px] font-black tracking-widest text-text-muted" />
                                <TextInput
                                    id="credential_url"
                                    type="url"
                                    className="mt-1 block w-full !rounded-xl"
                                    value={data.credential_url}
                                    onChange={(e) => setData('credential_url', e.target.value)}
                                    placeholder="https://..."
                                />
                                <InputError message={errors.credential_url} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="!rounded-xl">Cancel</SecondaryButton>
                        <PrimaryButton className="!rounded-xl" disabled={processing}>
                            {editingEducation ? 'Update Entry' : 'Create Entry'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
