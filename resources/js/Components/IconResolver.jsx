import React from 'react';
import { 
    Palette, Code2, Smartphone, Briefcase, Rocket, 
    Zap, Layout, Shield, Globe, Award, Database, Settings 
} from 'lucide-react';

const icons = {
    Palette,
    Code2,
    Smartphone,
    Briefcase,
    Rocket,
    Zap,
    Layout,
    Shield,
    Globe,
    Award,
    Database,
    Settings
};

export default function IconResolver({ icon, size = 24, className = "" }) {
    // If icon is already a component reference
    if (typeof icon !== 'string' && icon) {
        const IconComponent = icon;
        return <IconComponent size={size} className={className} />;
    }

    // If icon is a string, resolve it from our map
    const IconComponent = icons[icon] || Palette; // Fallback to Palette
    return <IconComponent size={size} className={className} />;
}
