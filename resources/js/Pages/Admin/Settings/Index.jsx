import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Settings, Image as ImageIcon, Save, CheckCircle } from 'lucide-react';

export default function Index({ auth, settings }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        site_name: settings.site_name || '',
        footer_copyright: settings.footer_copyright || '',
        footer_description: settings.footer_description || '',
        logo: null,
        hero_image: null,
        _method: 'post', // For file upload with post
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800 flex items-center gap-2">
                <Settings className="text-primary" /> General Site Settings
            </h2>}
        >
            <Head title="General Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-premium sm:rounded-[2.5rem] border border-gray-100 p-8 md:p-12">
                        
                        <div className="max-w-3xl">
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Configure Your Brand</h3>
                            <p className="text-gray-500 mb-10">Manage your site identity, dynamic logo, and footer information.</p>

                            <form onSubmit={submit} className="space-y-10">
                                {/* Logo Upload */}
                                <div>
                                    <InputLabel value="Site Logo" className="mb-4 text-black font-bold" />
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="w-32 h-32 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-center overflow-hidden relative group">
                                            {settings.logo_url && !data.logo ? (
                                                <img src={settings.logo_url} className="w-full h-full object-contain p-2" alt="Logo" />
                                            ) : data.logo ? (
                                                <img src={URL.createObjectURL(data.logo)} className="w-full h-full object-contain p-2" alt="Preview" />
                                            ) : (
                                                <div className="text-gray-300 flex flex-col items-center">
                                                    <ImageIcon size={32} />
                                                    <span className="text-[10px] uppercase font-black tracking-widest mt-1">HNS Fallback</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="relative inline-block">
                                                <PrimaryButton type="button" className="!rounded-xl pointer-events-none">
                                                    Choose New Logo
                                                </PrimaryButton>
                                                <input 
                                                    type="file" 
                                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                    onChange={(e) => setData('logo', e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                            <p className="mt-3 text-xs text-gray-400">
                                                Recommended: PNG or SVG with transparent background. Max 2MB.
                                            </p>
                                            <InputError message={errors.logo} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray-50" />

                                {/* Hero Image Upload */}
                                <div>
                                    <InputLabel value="Home Hero Image (Profile Photo)" className="mb-4 text-black font-bold" />
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="w-48 h-48 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center justify-center overflow-hidden relative group shadow-sm">
                                            {settings.hero_image_url && !data.hero_image ? (
                                                <img src={settings.hero_image_url} className="w-full h-full object-cover" alt="Hero" />
                                            ) : data.hero_image ? (
                                                <img src={URL.createObjectURL(data.hero_image)} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <div className="text-gray-300 flex flex-col items-center">
                                                    <ImageIcon size={48} />
                                                    <span className="text-[10px] uppercase font-black tracking-widest mt-2 text-center px-4">No Hero Image</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="relative inline-block">
                                                <PrimaryButton type="button" className="!rounded-xl pointer-events-none bg-secondary hover:bg-secondary">
                                                    Upload Profile Photo
                                                </PrimaryButton>
                                                <input 
                                                    type="file" 
                                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                    onChange={(e) => setData('hero_image', e.target.files[0])}
                                                    accept="image/*"
                                                />
                                            </div>
                                            <p className="mt-3 text-sm text-gray-500 max-w-xs">
                                                This image appears in the large square frame on your home page hero section.
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                Recommended: Square aspect ratio (1:1). Max 4MB.
                                            </p>
                                            <InputError message={errors.hero_image} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray-50" />

                                {/* Text Settings */}
                                <div className="grid gap-8">
                                    <div>
                                        <InputLabel htmlFor="site_name" value="Site Title / Display Name" />
                                        <TextInput
                                            id="site_name"
                                            className="mt-1 block w-full !rounded-xl"
                                            value={data.site_name}
                                            onChange={(e) => setData('site_name', e.target.value)}
                                            placeholder="e.g. Haris Naseer Satti"
                                            required
                                        />
                                        <InputError message={errors.site_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="footer_copyright" value="Footer Copyright Text" />
                                        <TextInput
                                            id="footer_copyright"
                                            className="mt-1 block w-full !rounded-xl"
                                            value={data.footer_copyright}
                                            onChange={(e) => setData('footer_copyright', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.footer_copyright} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="footer_description" value="Service / Footer Description" />
                                        <textarea
                                            id="footer_description"
                                            className="mt-1 block w-full border-gray-300 focus:border-primary focus:ring-primary rounded-xl shadow-sm h-32"
                                            value={data.footer_description}
                                            onChange={(e) => setData('footer_description', e.target.value)}
                                            required
                                        ></textarea>
                                        <InputError message={errors.footer_description} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton className="!rounded-xl px-10 py-4 flex items-center gap-2" disabled={processing}>
                                        <Save size={18} /> Save Settings
                                    </PrimaryButton>

                                    {recentlySuccessful && (
                                        <div className="flex items-center gap-2 text-green-500 font-bold text-sm animate-in fade-in slide-in-from-left-2">
                                            <CheckCircle size={18} /> Saved successfully!
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
