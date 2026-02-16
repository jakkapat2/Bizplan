import React from 'react';
import { Event } from '../types';
import { X, Calendar, MapPin, Share2, Heart, CheckCircle } from 'lucide-react';

interface EventDrawerProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved?: boolean;
  isRsvp?: boolean;
  onToggleSave?: (event: Event) => void;
  onToggleRsvp?: (event: Event) => void;
}

const EventDrawer: React.FC<EventDrawerProps> = ({ 
    event, 
    isOpen, 
    onClose, 
    isSaved = false, 
    isRsvp = false, 
    onToggleSave, 
    onToggleRsvp 
}) => {
  if (!event) return null;

  const date = new Date(event.startDate);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="relative">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-zinc-800" />
          </button>

          {/* Hero Image */}
          <div className="h-64 md:h-72 w-full relative">
             <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-xs font-medium mb-2 border border-white/30">
                    {event.category}
                </span>
                <h2 className="text-3xl font-bold leading-tight">{event.title}</h2>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Quick Actions */}
            <div className="flex gap-3">
              <button 
                onClick={() => onToggleRsvp?.(event)}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                    isRsvp 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {isRsvp ? "Going" : "I'm Going"}
              </button>
              
              <button 
                onClick={() => onToggleSave?.(event)}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                    isSaved
                    ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? "Saved" : "Save"}
              </button>
              
              <button className="p-3 bg-zinc-100 text-zinc-900 rounded-xl hover:bg-zinc-200 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-zinc-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-zinc-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">Date & Time</h4>
                  <p className="text-zinc-600 text-sm mt-1">
                    {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-zinc-500 text-sm">
                    {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-zinc-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-zinc-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">Location</h4>
                  <p className="text-zinc-600 text-sm mt-1">{event.location.venue}</p>
                  <p className="text-zinc-500 text-sm">{event.location.city}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-zinc-900 mb-3">About</h3>
              <p className="text-zinc-600 leading-relaxed text-sm">
                {event.description}
              </p>
            </div>

            {/* Organizer */}
            <div className="bg-zinc-50 p-4 rounded-2xl flex items-center gap-4">
              <img 
                src={event.organizer.avatar} 
                alt={event.organizer.name}
                className="w-12 h-12 rounded-full object-cover border border-zinc-200"
              />
              <div className="flex-1">
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Hosted by</p>
                <h4 className="font-bold text-zinc-900">{event.organizer.name}</h4>
              </div>
              <button className="text-xs font-semibold text-zinc-900 underline">
                Contact
              </button>
            </div>

             {/* Location Map Preview (Static Image for visual) */}
             <div className="rounded-2xl overflow-hidden h-40 relative">
                <img 
                    src={`https://picsum.photos/seed/${event.location.city}/600/300`} 
                    alt="Map preview" 
                    className="w-full h-full object-cover opacity-80"
                />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="bg-white p-2 rounded-full shadow-lg">
                        <MapPin className="w-5 h-5 text-red-500" />
                    </div>
                 </div>
                 <button className="absolute bottom-3 right-3 bg-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                    Open in Maps
                 </button>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDrawer;