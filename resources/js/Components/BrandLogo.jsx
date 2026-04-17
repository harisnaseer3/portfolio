import React from 'react';
import { usePage } from '@inertiajs/react';

export default function BrandLogo({ className = "h-8", showText = false }) {
    const { settings } = usePage().props;

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {settings?.logo_url ? (
                <img 
                    src={settings.logo_url} 
                    alt={settings.site_name || 'Logo'} 
                    className="h-full w-auto object-contain"
                />
            ) : (
                <svg 
                    viewBox="0 0 100 100" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-auto"
                >
                    {/* Minimalist Monogram HNS Fallback */}
                    <defs>
                        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#A855F7" />
                        </linearGradient>
                    </defs>
                    
                    <path 
                        d="M20 30V70 M20 50H45 M45 30V70" 
                        stroke="url(#logo-gradient)" 
                        strokeWidth="8" 
                        strokeLinecap="round"
                    />
                    <path 
                        d="M55 70V30L80 70V30" 
                        stroke="url(#logo-gradient)" 
                        strokeWidth="8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                    <path 
                        d="M20 85C40 85 80 85 80 85" 
                        stroke="url(#logo-gradient)" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                    />
                    <circle cx="85" cy="85" r="4" fill="url(#logo-gradient)" />
                </svg>
            )}
            
            {(showText || settings?.site_name) && showText && (
                <div className="flex flex-col leading-none">
                    <span className="text-xl font-black tracking-tighter uppercase gradient-text">
                        {settings?.site_name || 'Haris Naseer'}
                    </span>
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400">Portfolio</span>
                </div>
            )}
        </div>
    );
}
