import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { Mail, Trash2, CheckCircle, Clock, Search, MessageSquare, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';

export default function Index({ auth, messages }) {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = messages.filter(msg => 
        (msg.first_name + ' ' + msg.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const markAsRead = (id, isRead) => {
        router.patch(route('admin.messages.update', id), {
            is_read: !isRead
        }, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedMessage && selectedMessage.id === id) {
                    setSelectedMessage(prev => ({ ...prev, is_read: !isRead }));
                }
            }
        });
    };

    const deleteMessage = (id) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(route('admin.messages.destroy', id), {
                preserveScroll: true,
                onSuccess: () => setSelectedMessage(null)
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800 flex items-center gap-2">
                <Mail className="text-primary" /> Visitor Messages
            </h2>}
        >
            <Head title="Messages" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-premium sm:rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row min-h-[700px]">
                        
                        {/* Messages List Area */}
                        <div className="w-full md:w-2/5 border-r border-gray-100 flex flex-col">
                            <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Search messages..."
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto max-h-[600px] scrollbar-hide">
                                {filteredMessages.length > 0 ? (
                                    filteredMessages.map((msg) => (
                                        <button 
                                            key={msg.id}
                                            onClick={() => {
                                                setSelectedMessage(msg);
                                                if (!msg.is_read) {
                                                    markAsRead(msg.id, msg.is_read);
                                                }
                                            }}
                                            className={`w-full p-6 text-left border-b border-gray-50 transition-all hover:bg-accent-blue-soft/30 flex gap-4 items-start relative ${selectedMessage?.id === msg.id ? 'bg-accent-blue-soft' : ''}`}
                                        >
                                            {!msg.is_read && (
                                                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                                            )}
                                            <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-primary shrink-0 shadow-sm">
                                                <MessageSquare size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className={`text-sm tracking-tight truncate ${!msg.is_read ? 'font-black text-black' : 'font-bold text-gray-600'}`}>
                                                        {msg.first_name} {msg.last_name}
                                                    </h4>
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase whitespace-nowrap ml-2">
                                                        {new Date(msg.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className={`text-xs truncate ${!msg.is_read ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                                                    {msg.subject}
                                                </p>
                                                <p className="text-[11px] text-gray-400 mt-1 truncate">
                                                    {msg.message}
                                                </p>
                                            </div>
                                            <ChevronRight className="text-gray-300 mt-4 shrink-0" size={16} />
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-20 text-center opacity-40">
                                        <Mail size={48} className="mx-auto mb-4" />
                                        <p className="font-bold">No messages found</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Message Detail Area */}
                        <div className="flex-1 flex flex-col bg-gray-50/10">
                            {selectedMessage ? (
                                <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="p-8 border-b border-gray-50 bg-white flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl">
                                                {selectedMessage.first_name[0]}{selectedMessage.last_name[0]}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-gray-900">{selectedMessage.first_name} {selectedMessage.last_name}</h3>
                                                <p className="text-gray-500 font-bold text-sm tracking-tight">{selectedMessage.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => markAsRead(selectedMessage.id, selectedMessage.is_read)}
                                                className={`p-3 rounded-xl transition-all ${selectedMessage.is_read ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                                                title={selectedMessage.is_read ? "Mark as unread" : "Mark as read"}
                                            >
                                                <CheckCircle size={20} />
                                            </button>
                                            <button 
                                                onClick={() => deleteMessage(selectedMessage.id)}
                                                className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                                                title="Delete message"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-10 flex-1 overflow-y-auto bg-white/50">
                                        <div className="max-w-2xl">
                                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary mb-2">
                                                <Clock size={14} /> Received on {new Date(selectedMessage.created_at).toLocaleString()}
                                            </div>
                                            <h4 className="text-2xl font-black text-gray-900 mb-8 leading-tight">
                                                {selectedMessage.subject}
                                            </h4>
                                            
                                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm leading-relaxed text-gray-700 whitespace-pre-line text-lg">
                                                {selectedMessage.message}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-8 bg-white border-t border-gray-100">
                                        <a 
                                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedMessage.email}&su=${encodeURIComponent('Re: ' + selectedMessage.subject)}`}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-hover transition-all shadow-xl shadow-primary/20"
                                        >
                                            <Mail size={18} /> Reply to {selectedMessage.first_name}
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-20 opacity-30">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                        <MessageSquare size={48} />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900">Select a message</h3>
                                    <p className="max-w-xs mt-2 font-bold">Choose a message from the list to read the full conversation and reply.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
