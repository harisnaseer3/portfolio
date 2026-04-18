<?php

namespace Database\Seeders;

use App\Models\Skill;
use App\Models\Service;
use App\Models\Experience;
use App\Models\Project;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // Skills
        Skill::updateOrCreate(['name' => 'PHP & Laravel'], ['percentage' => 95, 'icon' => 'PHP & Laravel']);
        Skill::updateOrCreate(['name' => 'JavaScript & React'], ['percentage' => 90, 'icon' => 'JavaScript & React']);
        Skill::updateOrCreate(['name' => 'MySQL / PostgreSQL'], ['percentage' => 95, 'icon' => 'MySQL / PostgreSQL']);
        Skill::updateOrCreate(['name' => 'Git & Version Control'], ['percentage' => 90, 'icon' => 'Git & Version Control']);

        // Services
        Service::updateOrCreate(['title' => 'WEB DEV'], ['description' => 'Designing and building modern, scalable, and reliable web applications that deliver real results.', 'icon' => 'Code2', 'order_index' => 1]);
        Service::updateOrCreate(['title' => 'DATABASE DESIGN'], ['description' => 'Designing efficient, scalable, and well-structured databases to ensure optimal performance and data integrity.', 'icon' => 'Database', 'order_index' => 2]);
        Service::updateOrCreate(['title' => 'SYSTEM ARCHITECTURE'], ['description' => 'Designing robust, scalable, and efficient system architectures to ensure reliability, performance, and long-term maintainability.', 'icon' => 'Architecture', 'order_index' => 3]);
        Service::updateOrCreate(['title' => 'UI DESIGN'], ['description' => 'Creating clean, intuitive, and user-focused interfaces that deliver a seamless user experience.', 'icon' => 'Briefcase', 'order_index' => 4]);

        // Experience
        Experience::updateOrCreate(['company' => 'Sardar Group of Companies (SGC)', 'role' => 'Software Developer'], [
            'duration' => '2025 - Present', 
            'description' => 'Contributing as a Software Developer by delivering reliable and high-performance web solutions, improving system efficiency, and building secure and scalable applications tailored to business needs.', 
            'order_index' => 1
        ]);
        Experience::updateOrCreate(['company' => '99 Technologies', 'role' => 'Larave Developer'], [
            'duration' => '2023 - 2025', 
            'description' => 'Served as a Laravel Developer, where I developed dynamic web applications, designed and integrated RESTful APIs, and handled database management. Improved system performance, fixed bugs, and ensured scalable and maintainable code.', 
            'order_index' => 2
        ]);
        Experience::updateOrCreate(['company' => 'Fliegen IT Solution', 'role' => 'Full-Stack Developer'], [
            'duration' => '2021 - 2023', 
            'description' => 'As a Full-Stack Developer, I developed and maintained web applications by combining strong backend systems', 
            'order_index' => 3
        ]);

        // Projects
        Project::updateOrCreate(['title' => 'Enterprise Resource Planning'], ['category' => 'WEB APP', 'image_url' => '/storage/projects/l7anOkZCBVBv81cf43AOU8oWcU4iY15MJQpmMRiF.jpg', 'link' => 'https://tovus.net/', 'order_index' => 1]);
        Project::updateOrCreate(['title' => 'product search platform'], ['category' => 'WEB APP', 'image_url' => '/storage/projects/A3IFyWVdTDUAFoJo575INUMvmnANAjVPx47HegTn.jpg', 'link' => 'https://boly.pk/', 'order_index' => 2]);
        Project::updateOrCreate(['title' => 'Real Estate App'], ['category' => 'WEB APP', 'image_url' => '/storage/projects/jbwdWl4wRfHEev1NpaBWZ4yYvqQh8R6q0zkD15XE.jpg', 'link' => 'https://tajpk.com/', 'order_index' => 3]);
        Project::updateOrCreate(['title' => 'Computer Reseller Platform'], ['category' => 'WEB APP', 'image_url' => '/storage/projects/HvPetR3Qr5ANROEEw6qLaCahYxiussOy5d6ECeBA.jpg', 'link' => 'https://sjcomputers.us/', 'order_index' => 4]);
    }
}
