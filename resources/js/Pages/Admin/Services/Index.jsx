import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Rocket } from 'lucide-react';

export default function Index({ auth, services }) {
    const [editingService, setEditingService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        title: '',
        description: '',
        icon: '',
        order_index: '',
    });

    const openModal = (service = null) => {
        clearErrors();
        if (service) {
            setEditingService(service);
            setData({
                title: service.title,
                description: service.description,
                icon: service.icon || '',
                order_index: service.order_index || '',
            });
        } else {
            setEditingService(null);
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
        if (editingService) {
            put(route('admin.services.update', editingService.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.services.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteService = (id) => {
        if (confirm('Are you sure you want to delete this service?')) {
            destroy(route('admin.services.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800 flex items-center gap-2">
                <Rocket className="text-primary" /> Manage Services
            </h2>}
        >
            <Head title="Services Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-premium sm:rounded-[2.5rem] border border-gray-100 p-8 md:p-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">What You Offer</h3>
                                <p className="text-gray-500 text-sm">Update the specialized services displayed on your home page.</p>
                            </div>
                            <PrimaryButton onClick={() => openModal()} className="!rounded-xl flex items-center gap-2">
                                <Plus size={18} /> Add New Service
                            </PrimaryButton>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div key={service.id} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                                            <Rocket size={24} />
                                        </div>
                                        <div className="flex gap-1">
                                            <button 
                                                onClick={() => openModal(service)}
                                                className="p-1.5 text-gray-400 hover:text-primary transition-colors"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button 
                                                onClick={() => deleteService(service.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h4>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{service.description}</p>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-300">
                                        <span>Icon: {service.icon || 'Rocket'}</span>
                                        <span>Order: {service.order_index || '0'}</span>
                                    </div>
                                </div>
                            ))}
                            {services.length === 0 && (
                                <div className="col-span-full py-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                                    No services listed.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="xl">
                <form onSubmit={submit} className="p-8">
                    <h2 className="text-2xl font-bold mb-6">
                        {editingService ? 'Edit Service' : 'Add New Service'}
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Service Title" />
                            <TextInput
                                id="title"
                                type="text"
                                className="mt-1 block w-full !rounded-xl"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="e.g. UI/UX Design"
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div>
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

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="icon" value="Icon Name" />
                                <TextInput
                                    id="icon"
                                    type="text"
                                    className="mt-1 block w-full !rounded-xl"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    placeholder="e.g. Palette"
                                />
                                <InputError message={errors.icon} className="mt-2" />
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
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="!rounded-xl">Cancel</SecondaryButton>
                        <PrimaryButton className="!rounded-xl" disabled={processing}>
                            {editingService ? 'Update Service' : 'Create Service'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
