<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Setting;
use App\Mail\ContactInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        // Send Email Notification
        $adminEmail = Setting::where('key', 'contact_email')->value('value') ?? 'harisnaseer3@gmail.com';
        
        try {
            Mail::to($adminEmail)->send(new ContactInquiry($validated));
        } catch (\Exception $e) {
            // Silently fail or log if mail server is not configured yet
            report($e);
        }

        return redirect()->back()->with('success', 'Your message has been sent successfully! We will get back to you soon.');
    }
}
