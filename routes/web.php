<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::get('/projects/{project}', [\App\Http\Controllers\ProjectController::class, 'show'])->name('projects.show');

Route::middleware('guest')->group(function () {
    Route::get('admin-login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('admin-login', [AuthenticatedSessionController::class, 'store']);
});

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Dashboard', [
            'stats' => [
                'projects' => \App\Models\Project::count(),
                'skills' => \App\Models\Skill::count(),
                'services' => \App\Models\Service::count(),
                'experiences' => \App\Models\Experience::count(),
                'messages' => \App\Models\ContactMessage::count(),
                'posts' => \App\Models\Post::count(),
                'testimonials' => \App\Models\Testimonial::count(),
                'education' => \App\Models\Education::count(),
            ],
            'analytics' => \App\Models\Analytic::where('date', '>=', now()->subDays(30))
                ->orderBy('date', 'asc')
                ->get()
                ->groupBy('date')
                ->map(function ($items, $date) {
                    $row = ['date' => $date];
                    foreach ($items as $item) {
                        $row[$item->event_name] = $item->event_count;
                    }
                    return $row;
                })->values()
        ]);
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('skills', \App\Http\Controllers\Admin\SkillController::class);
        Route::resource('services', \App\Http\Controllers\Admin\ServiceController::class);
        Route::resource('experiences', \App\Http\Controllers\Admin\ExperienceController::class);
        Route::resource('projects', \App\Http\Controllers\Admin\ProjectController::class);
        Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class);
        Route::resource('posts', \App\Http\Controllers\Admin\PostController::class);
        Route::resource('education', \App\Http\Controllers\Admin\EducationController::class);
        Route::resource('messages', \App\Http\Controllers\Admin\MessageController::class)->only(['index', 'update', 'destroy']);

        Route::get('settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
        Route::post('settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
    });
});

Route::post('/analytics/track', [\App\Http\Controllers\AnalyticsController::class, 'track'])->name('analytics.track');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
