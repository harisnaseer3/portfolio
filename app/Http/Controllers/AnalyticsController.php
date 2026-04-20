<?php

namespace App\Http\Controllers;

use App\Models\Analytic;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    public function track(Request $request)
    {
        $validated = $request->validate([
            'event_name' => 'required|string|in:cv_download,hire_me_click,page_view',
        ]);

        $date = Carbon::today()->toDateString();

        Analytic::updateOrCreate(
            ['event_name' => $validated['event_name'], 'date' => $date],
            ['event_count' => \DB::raw('event_count + 1')]
        );

        return response()->json(['success' => true]);
    }
}
