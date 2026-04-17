import BrandLogo from '@/Components/BrandLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F8FAFF] pt-6 sm:justify-center sm:pt-0 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-gradient pointer-events-none -z-10" />
            
            <div className="z-10 mb-8">
                <Link href="/">
                    <BrandLogo className="h-12" showText={true} />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-10 py-12 bg-white shadow-2xl rounded-[3rem] border border-border-main z-10">
                {children}
            </div>
        </div>
    );
}
