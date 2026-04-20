<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use App\Models\Service;
use App\Models\Experience;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'skills' => \App\Models\Skill::orderBy('percentage', 'desc')->get(),
            'services' => \App\Models\Service::orderBy('order_index')->get(),
            'experiences' => \App\Models\Experience::orderBy('order_index')->get(),
            'projects' => \App\Models\Project::orderBy('order_index')->get(),
            'testimonials' => \App\Models\Testimonial::orderBy('order_index')->get(),
            'education' => \App\Models\Education::orderBy('order_index')->get(),
            'posts' => \App\Models\Post::where('is_published', true)->orderBy('created_at', 'desc')->take(3)->get(),
        ]);
    }
}
