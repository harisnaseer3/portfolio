<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Projects/Index', [
            'projects' => Project::orderBy('order_index', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'link' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'order_index' => 'nullable|integer',
            'tech_stack' => 'nullable|array',
            'case_study' => 'nullable|string',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $galleryPaths[] = Storage::url($path);
            }
            $validated['image_gallery'] = $galleryPaths;
        }

        unset($validated['image'], $validated['gallery']);
        Project::create($validated);

        return redirect()->back()->with('success', 'Project created successfully.');
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'link' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'order_index' => 'nullable|integer',
            'tech_stack' => 'nullable|array',
            'case_study' => 'nullable|string',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($project->image_url) {
                $oldPath = str_replace('/storage/', '', $project->image_url);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('projects', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        if ($request->hasFile('gallery')) {
            // Delete old gallery images
            if ($project->image_gallery) {
                foreach ($project->image_gallery as $url) {
                    $oldPath = str_replace('/storage/', '', $url);
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $galleryPaths[] = Storage::url($path);
            }
            $validated['image_gallery'] = $galleryPaths;
        }

        unset($validated['image'], $validated['gallery']);
        $project->update($validated);

        return redirect()->back()->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        if ($project->image_url) {
            $oldPath = str_replace('/storage/', '', $project->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $project->delete();

        return redirect()->back()->with('success', 'Project deleted successfully.');
    }
}
