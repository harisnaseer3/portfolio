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
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
        ]);

        foreach ($validated as $key => $value) {
            if ($key === 'logo' || $key === 'hero_image') continue;
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        if ($request->hasFile('logo')) {
            $this->updateImageSetting('logo_url', $request->file('logo'), 'branding');
        }

        if ($request->hasFile('hero_image')) {
            $this->updateImageSetting('hero_image_url', $request->file('hero_image'), 'hero');
        }

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }

    private function updateImageSetting($key, $file, $folder)
    {
        $oldSetting = Setting::where('key', $key)->first();
        if ($oldSetting && $oldSetting->value) {
            $oldPath = str_replace('/storage/', '', $oldSetting->value);
            Storage::disk('public')->delete($oldPath);
        }

        $path = $file->store($folder, 'public');
        Setting::updateOrCreate(['key' => $key], ['value' => Storage::url($path)]);
    }
}
