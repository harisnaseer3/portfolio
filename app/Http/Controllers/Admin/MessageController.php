<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Messages/Index', [
            'messages' => ContactMessage::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function update(Request $request, ContactMessage $message)
    {
        $message->update([
            'is_read' => $request->is_read
        ]);

        return redirect()->back()->with('success', 'Message status updated.');
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();

        return redirect()->back()->with('success', 'Message deleted successfully.');
    }
}
