<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function show($id)
    {
        $project = Project::findOrFail($id);
        
        return Inertia::render('Projects/Show', [
            'project' => $project,
            'settings' => Setting::all()->pluck('value', 'key')
        ]);
    }
}
