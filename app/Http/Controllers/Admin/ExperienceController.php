<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => Experience::orderBy('order_index', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'description' => 'required|string',
            'order_index' => 'nullable|integer',
        ]);

        Experience::create($validated);

        return redirect()->back()->with('success', 'Experience created successfully.');
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'description' => 'required|string',
            'order_index' => 'nullable|integer',
        ]);

        $experience->update($validated);

        return redirect()->back()->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return redirect()->back()->with('success', 'Experience deleted successfully.');
    }
}
