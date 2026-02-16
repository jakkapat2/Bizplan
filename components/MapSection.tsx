import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Event } from '../types';
import { MapPin } from 'lucide-react';

// Fix for default Leaflet marker icons in React
// In a real production app, you might import these locally.
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapSectionProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

// Component to recenter map when events change
const RecenterMap: React.FC<{ center: [number, number] }> = ({ center }) => {
    const map = useMap();
    map.flyTo(center, map.getZoom());
    return null;
}

const MapSection: React.FC<MapSectionProps> = ({ events, onEventClick }) => {
    // Default center (Thailand)
    const defaultCenter: [number, number] = [13.7563, 100.5018];
    
    // Determine center based on first filtered event or default
    const mapCenter = useMemo(() => {
        if (events.length > 0) {
            return [events[0].location.lat, events[0].location.lng] as [number, number];
        }
        return defaultCenter;
    }, [events]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 z-0">
       <MapContainer 
        center={defaultCenter} 
        zoom={6} 
        scrollWheelZoom={false} 
        className="w-full h-full"
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {events.length > 0 && <RecenterMap center={mapCenter} />}

        {events.map((event) => (
          <Marker 
            key={event.id} 
            position={[event.location.lat, event.location.lng]}
            icon={customIcon}
            eventHandlers={{
                click: () => onEventClick(event)
            }}
          >
            <Popup className="custom-popup">
              <div 
                className="w-48 cursor-pointer"
                onClick={() => onEventClick(event)}
              >
                <img 
                    src={event.imageUrl} 
                    className="w-full h-24 object-cover rounded-t-lg mb-2"
                    alt={event.title}
                />
                <h3 className="font-bold text-sm text-zinc-900 leading-tight">{event.title}</h3>
                <p className="text-xs text-zinc-500 mt-1">{event.location.venue}</p>
                <div className="mt-2 text-xs font-semibold text-indigo-600">View Details</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Overlay UI */}
      <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-xl border border-zinc-100">
        <h3 className="text-sm font-bold text-zinc-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            Exploring Local Events
        </h3>
      </div>
      
      <div className="absolute bottom-4 right-4 z-[400]">
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg hover:bg-zinc-800 transition-colors">
            Use my location
        </button>
      </div>
    </div>
  );
};

export default MapSection;