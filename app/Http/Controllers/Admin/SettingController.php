<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => Setting::all()->pluck('value', 'key')
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'footer_copyright' => 'required|string|max:255',
            'footer_description' => 'required|string',
            'contact_phone' => 'required|string|max:50',
            'contact_email' => 'required|email|max:255',
            'contact_location' => 'required|string|max:255',
            'social_github' => 'nullable|url|max:255',
            'social_twitter' => 'nullable|url|max:255',
            'social_linkedin' => 'nullable|url|max:255',
            'site_theme' => 'required|string|in:light,dark',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        foreach ($validated as $key => $value) {
            if (in_array($key, ['logo', 'hero_image', 'resume'])) continue;
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        if ($request->hasFile('logo')) {
            $this->updateFileSetting('logo_url', $request->file('logo'), 'branding');
        }

        if ($request->hasFile('hero_image')) {
            $this->updateFileSetting('hero_image_url', $request->file('hero_image'), 'hero');
        }

        if ($request->hasFile('resume')) {
            $this->updateFileSetting('resume_url', $request->file('resume'), 'resumes');
        }

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }

    private function updateFileSetting($key, $file, $folder)
    {
        $oldSetting = Setting::where('key', $key)->first();
        if ($oldSetting && $oldSetting->value) {
            $oldPath = str_replace('/storage/', '', $oldSetting->value);
            Storage::disk('public')->delete($oldPath);
        }

        $filename = ($key === 'resume_url') 
            ? 'Haris-Naseer.' . $file->getClientOriginalExtension() 
            : $file->hashName();

        $path = $file->storeAs($folder, $filename, 'public');
        Setting::updateOrCreate(['key' => $key], ['value' => Storage::url($path)]);
    }
}
