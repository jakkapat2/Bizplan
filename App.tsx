import React, { useState, useMemo } from 'react';
import { Search, PlusCircle, Grid, User, CalendarCheck } from 'lucide-react';
import { MOCK_EVENTS, CITIES } from './constants';
import { Event, Category } from './types';
import EventCard from './components/EventCard';
import CategoryRail from './components/CategoryRail';
import MapSection from './components/MapSection';
import EventDrawer from './components/EventDrawer';
import OrganizerForm from './components/OrganizerForm';

function App() {
  // State
  const [view, setView] = useState<'home' | 'organizer' | 'my-events'>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // User Actions State
  const [savedEventIds, setSavedEventIds] = useState<Set<string>>(new Set());
  const [rsvpEventIds, setRsvpEventIds] = useState<Set<string>>(new Set());
  
  // Filters
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [cityFilter, setCityFilter] = useState<string>('All');
  
  // Handlers
  const handleToggleSave = (event: Event) => {
    setSavedEventIds(prev => {
        const next = new Set(prev);
        if (next.has(event.id)) next.delete(event.id);
        else next.add(event.id);
        return next;
    });
  };

  const handleToggleRsvp = (event: Event) => {
    setRsvpEventIds(prev => {
        const next = new Set(prev);
        if (next.has(event.id)) next.delete(event.id);
        else next.add(event.id);
        return next;
    });
  };

  // Filter Logic
  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.location.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;
      const matchesCity = cityFilter === 'All' || event.location.city === cityFilter;
      
      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [searchQuery, categoryFilter, cityFilter]);

  const popularEvents = useMemo(() => {
    return MOCK_EVENTS.filter(e => e.isPopular).slice(0, 3);
  }, []);

  const myEvents = useMemo(() => {
    return MOCK_EVENTS.filter(e => savedEventIds.has(e.id) || rsvpEventIds.has(e.id));
  }, [savedEventIds, rsvpEventIds]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
             {/* Logo Placeholder */}
             <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
             </div>
             <span className="font-bold text-xl tracking-tight">ArokaGO</span>
          </div>

          <div className="flex items-center gap-4">
             {/* Nav Links */}
             <div className="hidden md:flex items-center gap-4 mr-2">
                <button 
                    onClick={() => setView('my-events')}
                    className={`text-sm font-semibold transition-colors ${view === 'my-events' ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                    My Events
                </button>
             </div>

             {view !== 'organizer' && (
               <button 
                 onClick={() => setView('organizer')}
                 className="hidden md:flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
               >
                 <PlusCircle className="w-4 h-4" />
                 Host an Event
               </button>
             )}
             
             <div 
                className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-200 transition-colors"
                onClick={() => setView(view === 'my-events' ? 'home' : 'my-events')}
             >
                <User className="w-4 h-4 text-zinc-600" />
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        
        {view === 'organizer' ? (
           <OrganizerForm onCancel={() => setView('home')} onSubmit={() => setView('home')} />
        ) : view === 'my-events' ? (
            /* My Events View */
            <section className="min-h-[60vh]">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900 mb-2">My Events</h1>
                    <p className="text-zinc-500">Events you are attending or have saved.</p>
                </div>

                {myEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {myEvents.map(event => (
                            <EventCard 
                                key={event.id} 
                                event={event} 
                                onClick={handleEventClick} 
                                isSaved={savedEventIds.has(event.id)}
                                isRsvp={rsvpEventIds.has(event.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
                        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                            <CalendarCheck className="w-8 h-8 text-zinc-300" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 mb-2">No events yet</h3>
                        <p className="text-zinc-500 text-center max-w-sm mb-6">
                            You haven't RSVP'd to or saved any events yet. Explore upcoming events to get started.
                        </p>
                        <button 
                            onClick={() => setView('home')}
                            className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-zinc-800 transition-colors"
                        >
                            Browse Events
                        </button>
                    </div>
                )}
            </section>
        ) : (
          /* Home View */
          <>
            {/* 1. DISCOVER / HERO SECTION */}
            <section className="relative">
              <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[480px]">
                <img 
                  src="https://picsum.photos/1600/900?random=hero" 
                  alt="Thailand Events" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
                    Discover Events in Thailand
                  </h1>
                  <p className="text-lg text-zinc-100 max-w-2xl mb-8 drop-shadow-md">
                    Find what’s happening near you — from concerts to markets and community activities.
                  </p>

                  {/* Search Bar */}
                  <div className="w-full max-w-3xl bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2">
                    <div className="flex-1 flex items-center px-4 bg-zinc-50 rounded-xl">
                      <Search className="w-5 h-5 text-zinc-400 mr-3" />
                      <input 
                        type="text"
                        placeholder="Search event, venue, or activity..."
                        className="w-full bg-transparent py-3 outline-none text-zinc-800 placeholder-zinc-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    {/* Desktop Filters within Search */}
                    <div className="hidden md:flex items-center gap-2">
                        <select 
                            className="bg-zinc-50 py-3 px-4 rounded-xl text-sm font-medium text-zinc-700 outline-none border-r-[12px] border-r-zinc-50 border-transparent cursor-pointer hover:bg-zinc-100"
                            value={cityFilter}
                            onChange={(e) => setCityFilter(e.target.value)}
                        >
                            <option value="All">All Cities</option>
                            {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                        <button className="bg-zinc-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-zinc-800 transition-colors">
                            Search
                        </button>
                    </div>
                  </div>
                  
                  {/* Mobile Filter Button */}
                  <div className="mt-4 md:hidden w-full max-w-3xl flex justify-center">
                     <select 
                        className="bg-white/90 backdrop-blur text-zinc-900 py-2 px-6 rounded-full text-sm font-semibold shadow-lg"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                    >
                        <option value="All">📍 All Cities</option>
                        {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>

                </div>
              </div>
            </section>

            {/* 2. CATEGORIES */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-zinc-900">Browse by Category</h2>
              </div>
              <CategoryRail selectedCategory={categoryFilter} onSelect={setCategoryFilter} />
            </section>

            {/* 3. DISCOVER GRID (Filtered Results) */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-zinc-900">
                   {categoryFilter === 'All' ? 'Upcoming Events' : `${categoryFilter} Events`}
                </h2>
                <div className="text-sm text-zinc-500 font-medium">
                   {filteredEvents.length} results
                </div>
              </div>
              
              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredEvents.map(event => (
                    <EventCard 
                        key={event.id} 
                        event={event} 
                        onClick={handleEventClick} 
                        isSaved={savedEventIds.has(event.id)}
                        isRsvp={rsvpEventIds.has(event.id)}
                    />
                    ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
                    <p className="text-zinc-500">No events found matching your criteria.</p>
                    <button 
                        onClick={() => {setCategoryFilter('All'); setCityFilter('All'); setSearchQuery('');}}
                        className="mt-4 text-indigo-600 font-semibold text-sm"
                    >
                        Clear Filters
                    </button>
                </div>
              )}
            </section>

             {/* 4. POPULAR EVENTS */}
             {popularEvents.length > 0 && categoryFilter === 'All' && !searchQuery && (
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-zinc-900">Popular Events</h2>
                        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                            View all
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {popularEvents.map(event => (
                            <EventCard 
                                key={`pop-${event.id}`} 
                                event={event} 
                                onClick={handleEventClick}
                                variant="large"
                                isSaved={savedEventIds.has(event.id)}
                                isRsvp={rsvpEventIds.has(event.id)}
                            />
                        ))}
                    </div>
                </section>
             )}

            {/* 5. EXPLORE LOCAL (MAP) */}
            <section>
               <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-900">Explore Local Events</h2>
                    <p className="text-zinc-500 text-sm mt-1">Discover what's happening around Thailand</p>
                  </div>
               </div>
               <MapSection events={filteredEvents} onEventClick={handleEventClick} />
            </section>
          </>
        )}

      </main>

      {/* Mobile Nav Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-6 py-3 flex justify-around items-center z-40 pb-safe">
         <button 
            onClick={() => setView('home')} 
            className={`flex flex-col items-center gap-1 ${view === 'home' ? 'text-zinc-900' : 'text-zinc-400'}`}
         >
            <Grid className="w-6 h-6" />
            <span className="text-[10px] font-medium">Discover</span>
         </button>
         <button 
            onClick={() => setView('organizer')} 
            className={`flex flex-col items-center gap-1 ${view === 'organizer' ? 'text-zinc-900' : 'text-zinc-400'}`}
         >
            <PlusCircle className="w-6 h-6" />
            <span className="text-[10px] font-medium">Host</span>
         </button>
         <button 
            onClick={() => setView('my-events')} 
            className={`flex flex-col items-center gap-1 ${view === 'my-events' ? 'text-zinc-900' : 'text-zinc-400'}`}
         >
            <CalendarCheck className="w-6 h-6" />
            <span className="text-[10px] font-medium">My Events</span>
         </button>
      </div>

      {/* Details Drawer */}
      <EventDrawer 
        event={selectedEvent} 
        isOpen={isDrawerOpen} 
        onClose={closeDrawer}
        isSaved={selectedEvent ? savedEventIds.has(selectedEvent.id) : false}
        isRsvp={selectedEvent ? rsvpEventIds.has(selectedEvent.id) : false}
        onToggleSave={handleToggleSave}
        onToggleRsvp={handleToggleRsvp}
      />
    </div>
  );
}

export default App;