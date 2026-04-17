<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if admin already exists
        if (!User::where('email', 'harisnaseer3@gmail.com')->exists()) {
            User::create([
                'name' => 'Portfolio Admin',
                'email' => 'harisnaseer3@gmail.com',
                'password' => Hash::make('Hsnsatti@23'),
                'email_verified_at' => now(),
            ]);
        }
    }
}
