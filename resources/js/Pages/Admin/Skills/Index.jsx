import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Zap } from 'lucide-react';

export default function Index({ auth, skills }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        percentage: '',
        icon: '',
    });

    const openModal = (skill = null) => {
        clearErrors();
        if (skill) {
            setEditingSkill(skill);
            setData({
                name: skill.name,
                percentage: skill.percentage,
                icon: skill.icon || '',
            });
        } else {
            setEditingSkill(null);
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
        if (editingSkill) {
            put(route('admin.skills.update', editingSkill.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.skills.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteSkill = (id) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            destroy(route('admin.skills.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800 flex items-center gap-2">
                <Zap className="text-primary" /> Manage My Skills
            </h2>}
        >
            <Head title="Skills Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-premium sm:rounded-[2.5rem] border border-gray-100 p-8 md:p-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Your Expertise</h3>
                                <p className="text-gray-500 text-sm">Add or update the skills displayed on your portfolio.</p>
                            </div>
                            <PrimaryButton onClick={() => openModal()} className="!rounded-xl flex items-center gap-2">
                                <Plus size={18} /> Add New Skill
                            </PrimaryButton>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs tracking-widest">Skill Name</th>
                                        <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs tracking-widest">Proficiency</th>
                                        <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {skills.map((skill) => (
                                        <tr key={skill.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-5 px-4">
                                                <div className="font-bold text-gray-900">{skill.name}</div>
                                                <div className="text-xs text-gray-400">{skill.icon || 'No Icon set'}</div>
                                            </td>
                                            <td className="py-5 px-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-primary" 
                                                            style={{ width: `${skill.percentage}%` }}
                                                        />
                                                    </div>
                                                    <span className="font-bold text-primary">{skill.percentage}%</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => openModal(skill)}
                                                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteSkill(skill.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {skills.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="py-20 text-center text-gray-400">
                                                No skills found. Start by adding one!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <form onSubmit={submit} className="p-8">
                    <h2 className="text-2xl font-bold mb-6">
                        {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Skill Name" />
                            <TextInput
                                id="name"
                                type="text"
                                className="mt-1 block w-full !rounded-xl"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Photoshop, React, UI Design"
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="percentage" value="Proficiency (%)" />
                            <TextInput
                                id="percentage"
                                type="number"
                                className="mt-1 block w-full !rounded-xl"
                                value={data.percentage}
                                onChange={(e) => setData('percentage', e.target.value)}
                                placeholder="0-100"
                                required
                            />
                            <InputError message={errors.percentage} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="icon" value="Icon Name (Lucide Icon)" />
                            <TextInput
                                id="icon"
                                type="text"
                                className="mt-1 block w-full !rounded-xl"
                                value={data.icon}
                                onChange={(e) => setData('icon', e.target.value)}
                                placeholder="e.g. Palette, Code2"
                            />
                            <InputError message={errors.icon} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="!rounded-xl">Cancel</SecondaryButton>
                        <PrimaryButton className="!rounded-xl" disabled={processing}>
                            {editingSkill ? 'Update Skill' : 'Create Skill'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
