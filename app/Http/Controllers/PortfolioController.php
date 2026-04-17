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
            'skills' => Skill::orderBy('percentage', 'desc')->get(),
            'services' => Service::orderBy('order_index')->get(),
            'experiences' => Experience::orderBy('order_index')->get(),
            'projects' => Project::orderBy('order_index')->get(),
        ]);
    }
}
