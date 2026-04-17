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
            'logo_url' => null,
            'hero_image_url' => null,
            'footer_copyright' => '© 2026 Haris Naseer Satti. All rights reserved.',
            'footer_description' => 'A passionate web developer and UI/UX enthusiast building modern digital experiences.',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
