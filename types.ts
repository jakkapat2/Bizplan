export type Category = 
  | 'Music' 
  | 'Sports' 
  | 'Food' 
  | 'Arts' 
  | 'Community' 
  | 'Workshops' 
  | 'Family' 
  | 'Nightlife' 
  | 'Travel';

export interface Location {
  venue: string;
  city: string;
  lat: number;
  lng: number;
}

export interface Organizer {
  name: string;
  avatar: string;
  contact: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO string
  endDate?: string;
  location: Location;
  category: Category;
  imageUrl: string;
  price: number; // 0 for free
  currency: string;
  organizer: Organizer;
  rsvpCount: number;
  isPopular?: boolean;
  tags: string[];
}

export type FilterState = {
  category: Category | 'All';
  city: string | 'All';
  date: 'Any' | 'Today' | 'Weekend' | 'Month';
  price: 'Any' | 'Free' | 'Paid';
};
