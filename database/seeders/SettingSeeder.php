<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            'site_name' => 'Haris Naseer Satti',
            'logo_url' => '/storage/branding/AoGijJAjj5Z5LVBf0uAMx5zqjylQ0ezSnXiRxMA1.png',
            'hero_image_url' => '/storage/hero/DxvSqshwHYp2J95MOHDUKRb0xvOERjoVLPIIqINY.jpg',
            'footer_copyright' => '© 2026 Haris Naseer Satti. All rights reserved.',
            'footer_description' => 'A passionate web developer and UI/UX enthusiast building modern digital experiences.',
            'contact_phone' => '+92 344 1518890',
            'contact_email' => 'harisnaseer3@gmail.com',
            'contact_location' => 'Islamabad, Pakistan',
            'social_github' => 'https://github.com/harisnaseer3',
            'social_twitter' => 'https://twitter.com/harisnaseer3',
            'social_linkedin' => 'https://linkedin.com/in/haris-naseer-satti',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
