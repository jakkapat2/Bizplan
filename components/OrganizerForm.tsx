import React, { useState } from 'react';
import { generateEventDescription } from '../services/geminiService';
import { Category } from '../types';
import { CATEGORIES, CITIES } from '../constants';
import { Wand2, Loader2, CheckCircle2 } from 'lucide-react';

interface OrganizerFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const OrganizerForm: React.FC<OrganizerFormProps> = ({ onCancel, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Music' as Category,
    city: 'Bangkok',
    venue: '',
    date: '',
    description: '',
    organizerName: '',
    contact: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.city) {
        alert("Please enter a Title and City first.");
        return;
    }
    setAiLoading(true);
    const desc = await generateEventDescription(formData.title, formData.category, `${formData.venue}, ${formData.city}`);
    setFormData(prev => ({ ...prev, description: desc }));
    setAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onSubmit(formData);
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-full">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-zinc-900 mb-2">Event Submitted!</h3>
        <p className="text-zinc-600">Your event has been sent for moderation. You will be notified once it is approved.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-zinc-100 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900">Host an Event</h2>
        <p className="text-zinc-500 mt-1">Submit your event details for review.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-1">Event Title</label>
          <input 
            type="text" 
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
            placeholder="e.g., Sunset Yoga by the Beach"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1">Category</label>
            <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none bg-white"
            >
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            </div>
            <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1">Date & Time</label>
            <input 
                type="datetime-local" 
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none"
            />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1">City</label>
            <select 
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none bg-white"
            >
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            </div>
            <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1">Venue Name</label>
            <input 
                type="text" 
                name="venue"
                required
                value={formData.venue}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none"
                placeholder="e.g., Central World Square"
            />
            </div>
        </div>

        {/* Description with AI Button */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-semibold text-zinc-700">Description</label>
            <button 
                type="button"
                onClick={handleGenerateDescription}
                disabled={aiLoading}
                className="text-xs flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium transition-colors bg-indigo-50 px-3 py-1 rounded-full"
            >
                {aiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                {aiLoading ? "Generating..." : "Generate with AI"}
            </button>
          </div>
          <textarea 
            name="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none"
            placeholder="Describe what attendees can expect..."
          />
        </div>

        <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3">
            <button 
                type="button" 
                onClick={onCancel}
                className="px-6 py-3 rounded-xl font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
                Cancel
            </button>
            <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-3 rounded-xl font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-colors flex items-center gap-2"
            >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Submitting...' : 'Submit Event'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizerForm;
