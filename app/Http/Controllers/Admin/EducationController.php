<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Education/Index', [
            'education' => Education::orderBy('order_index', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer',
            'credential_url' => 'nullable|url|max:255',
        ]);

        Education::create($validated);

        return redirect()->back()->with('success', 'Education entry created successfully.');
    }

    public function update(Request $request, Education $education)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'nullable|integer',
            'credential_url' => 'nullable|url|max:255',
        ]);

        $education->update($validated);

        return redirect()->back()->with('success', 'Education entry updated successfully.');
    }

    public function destroy(Education $education)
    {
        $education->delete();

        return redirect()->back()->with('success', 'Education entry deleted successfully.');
    }
}
