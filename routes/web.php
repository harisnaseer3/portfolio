<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

Route::middleware('guest')->group(function () {
    Route::get('admin-login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('admin-login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Dashboard', [
            'stats' => [
                'projects' => \App\Models\Project::count(),
                'skills' => \App\Models\Skill::count(),
                'services' => \App\Models\Service::count(),
                'experiences' => \App\Models\Experience::count(),
            ]
        ]);
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('skills', \App\Http\Controllers\Admin\SkillController::class);
        Route::resource('services', \App\Http\Controllers\Admin\ServiceController::class);
        Route::resource('experiences', \App\Http\Controllers\Admin\ExperienceController::class);
        Route::resource('projects', \App\Http\Controllers\Admin\ProjectController::class);

        Route::get('settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
        Route::post('settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

