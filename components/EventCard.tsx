import React from 'react';
import { Event } from '../types';
import { MapPin, Users, Heart, CheckCircle } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
  variant?: 'standard' | 'large';
  isSaved?: boolean;
  isRsvp?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick, variant = 'standard', isSaved = false, isRsvp = false }) => {
  const date = new Date(event.startDate);
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <div 
      className={`group relative bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border border-zinc-100 flex flex-col ${variant === 'large' ? 'min-h-[380px]' : 'min-h-[320px]'}`}
      onClick={() => onClick(event)}
    >
      {/* Image Container */}
      <div className={`relative w-full overflow-hidden ${variant === 'large' ? 'h-56' : 'h-44'}`}>
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-zinc-800 shadow-sm">
          {event.category}
        </div>
        {event.price === 0 && (
          <div className="absolute top-3 right-3 bg-green-100/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-green-700 shadow-sm">
            Free
          </div>
        )}
        {/* Status Indicators */}
        <div className="absolute bottom-3 right-3 flex gap-2">
            {isSaved && (
                <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-sm">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                </div>
            )}
             {isRsvp && (
                <div className="bg-zinc-900/90 backdrop-blur-md p-1.5 rounded-full shadow-sm">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                </div>
            )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="text-xs font-medium text-red-500 mb-1 uppercase tracking-wide">
            {dateStr} • {timeStr}
          </div>
          <h3 className={`font-bold text-zinc-900 leading-tight mb-2 ${variant === 'large' ? 'text-xl' : 'text-lg'}`}>
            {event.title}
          </h3>
          <div className="flex items-center text-zinc-500 text-sm mb-3">
            <MapPin className="w-3.5 h-3.5 mr-1.5" />
            <span className="truncate">{event.location.venue}, {event.location.city}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-50 pt-3 mt-2">
          <div className="flex items-center text-zinc-500 text-xs font-medium">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            {event.rsvpCount + (isRsvp ? 1 : 0)} going
          </div>
          <button 
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${isRsvp ? 'bg-green-100 text-green-700' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'}`}
          >
            {isRsvp ? (
                <>
                    <CheckCircle className="w-3 h-3" />
                    Going
                </>
            ) : "RSVP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;