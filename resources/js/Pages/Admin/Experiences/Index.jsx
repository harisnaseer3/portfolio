import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Briefcase } from 'lucide-react';

export default function Index({ auth, experiences }) {
    const [editingExperience, setEditingExperience] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        company: '',
        role: '',
        duration: '',
        description: '',
        order_index: '',
    });

    const openModal = (exp = null) => {
        clearErrors();
        if (exp) {
            setEditingExperience(exp);
            setData({
                company: exp.company,
                role: exp.role,
                duration: exp.duration,
                description: exp.description,
                order_index: exp.order_index || '',
            });
        } else {
            setEditingExperience(null);
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
        if (editingExperience) {
            put(route('admin.experiences.update', editingExperience.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.experiences.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteExperience = (id) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            destroy(route('admin.experiences.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800 flex items-center gap-2">
                <Briefcase className="text-primary" /> Manage Work Experience
            </h2>}
        >
            <Head title="Experience Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-premium sm:rounded-[2.5rem] border border-gray-100 p-8 md:p-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Career Timeline</h3>
                                <p className="text-gray-500 text-sm">Update your work history for the portfolio timeline.</p>
                            </div>
                            <PrimaryButton onClick={() => openModal()} className="!rounded-xl flex items-center gap-2">
                                <Plus size={18} /> Add Experience
                            </PrimaryButton>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs tracking-widest">Company & Role</th>
                                        <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs tracking-widest">Duration</th>
                                        <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {experiences.map((exp) => (
                                        <tr key={exp.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-5 px-4">
                                                <div className="font-bold text-gray-900">{exp.company}</div>
                                                <div className="text-sm text-primary font-medium">{exp.role}</div>
                                                <p className="text-xs text-gray-400 mt-1 line-clamp-1">{exp.description}</p>
                                            </td>
                                            <td className="py-5 px-4 text-gray-500 font-medium">
                                                {exp.duration}
                                            </td>
                                            <td className="py-5 px-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => openModal(exp)}
                                                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteExperience(exp.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {experiences.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="py-20 text-center text-gray-400">
                                                No experience entries found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <form onSubmit={submit} className="p-8">
                    <h2 className="text-2xl font-bold mb-6">
                        {editingExperience ? 'Edit Experience' : 'Add Experience'}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1">
                            <InputLabel htmlFor="company" value="Company Name" />
                            <TextInput
                                id="company"
                                type="text"
                                className="mt-1 block w-full !rounded-xl"
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                                required
                            />
                            <InputError message={errors.company} className="mt-2" />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <InputLabel htmlFor="role" value="Role / Title" />
                            <TextInput
                                id="role"
                                type="text"
                                className="mt-1 block w-full !rounded-xl"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                required
                            />
                            <InputError message={errors.role} className="mt-2" />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <InputLabel htmlFor="duration" value="Duration (e.g. 2022 - Present)" />
                            <TextInput
                                id="duration"
                                type="text"
                                className="mt-1 block w-full !rounded-xl"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                required
                            />
                            <InputError message={errors.duration} className="mt-2" />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <InputLabel htmlFor="order_index" value="Sort Order (Lower = First)" />
                            <TextInput
                                id="order_index"
                                type="number"
                                className="mt-1 block w-full !rounded-xl"
                                value={data.order_index}
                                onChange={(e) => setData('order_index', e.target.value)}
                            />
                            <InputError message={errors.order_index} className="mt-2" />
                        </div>

                        <div className="col-span-2">
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full !rounded-xl border-gray-300 focus:border-primary focus:ring-primary shadow-sm h-32"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                required
                            ></textarea>
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="!rounded-xl">Cancel</SecondaryButton>
                        <PrimaryButton className="!rounded-xl" disabled={processing}>
                            {editingExperience ? 'Update Experience' : 'Save Experience'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
