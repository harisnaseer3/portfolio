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
        Skill::create(['name' => 'PHP & Laravel', 'percentage' => 95, 'icon' => 'PHP & Laravel']);
        Skill::create(['name' => 'JavaScript & React', 'percentage' => 90, 'icon' => 'JavaScript & React']);
        Skill::create(['name' => 'MySQL / PostgreSQL', 'percentage' => 95, 'icon' => 'MySQL / PostgreSQL']);
        Skill::create(['name' => 'Git & Version Control', 'percentage' => 90, 'icon' => 'Git & Version Control']);

        // Services
        Service::create(['title' => 'WEB DEV', 'description' => 'Building responsive and modern web applications.', 'icon' => 'Code2', 'order_index' => 1]);
        Service::create(['title' => 'UI DESIGN', 'description' => 'Creating beautiful and functional user interfaces.', 'icon' => 'Palette', 'order_index' => 2]);
        Service::create(['title' => 'MOBILE APP', 'description' => 'Cross-platform mobile apps with seamless UX.', 'icon' => 'Smartphone', 'order_index' => 3]);
        Service::create(['title' => 'BRANDING', 'description' => 'Developing unique brand identities and logos.', 'icon' => 'Briefcase', 'order_index' => 4]);

        // Experience
        Experience::create(['company' => 'Google', 'role' => 'Creative Designer', 'duration' => '2022 - Present', 'description' => 'Leading core design systems for global products.', 'order_index' => 1]);
        Experience::create(['company' => 'Amazon', 'role' => 'UI/UX Designer', 'duration' => '2020 - 2022', 'description' => 'Optimizing conversion for shopping experiences.', 'order_index' => 2]);
        Experience::create(['company' => 'Facebook', 'role' => 'Lead Designer', 'duration' => '2018 - 2020', 'description' => 'Redesigning social interaction components.', 'order_index' => 3]);

        // Projects
        Project::create(['title' => 'Real Estate App', 'category' => 'MOBILE APP', 'image_url' => '/images/project1.webp', 'link' => '#', 'order_index' => 1]);
        Project::create(['title' => 'Fintech Dashboard', 'category' => 'WEB APP', 'image_url' => '/images/project2.webp', 'link' => '#', 'order_index' => 2]);
        Project::create(['title' => 'Crypto Landing', 'category' => 'UI/UX', 'image_url' => '/images/project3.webp', 'link' => '#', 'order_index' => 3]);
        Project::create(['title' => 'Health Platform', 'category' => 'WEB APP', 'image_url' => '/images/project4.webp', 'link' => '#', 'order_index' => 4]);
    }
}
