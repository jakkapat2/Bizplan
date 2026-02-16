import { Event, Category } from './types';

export const CATEGORIES: { label: string; value: Category; icon: string }[] = [
  { label: 'Music & Concerts', value: 'Music', icon: '🎵' },
  { label: 'Sports & Outdoor', value: 'Sports', icon: '🏃' },
  { label: 'Markets & Food', value: 'Food', icon: '🍜' },
  { label: 'Arts & Culture', value: 'Arts', icon: '🎨' },
  { label: 'Community', value: 'Community', icon: '🤝' },
  { label: 'Workshops', value: 'Workshops', icon: '💡' },
  { label: 'Family & Kids', value: 'Family', icon: '🎈' },
  { label: 'Nightlife', value: 'Nightlife', icon: '🍸' },
  { label: 'Travel', value: 'Travel', icon: '🗺️' },
];

export const CITIES = ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Koh Samui'];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Wonderfruit Festival 2024',
    description: 'A celebration of art, music, food and ideas to catalyze positive impact. Join us for a weekend of wonder in the fields of Siam Country Club.',
    startDate: new Date(Date.now() + 86400000 * 10).toISOString(),
    location: {
      venue: 'Siam Country Club',
      city: 'Pattaya',
      lat: 12.9103,
      lng: 100.9976
    },
    category: 'Music',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    price: 5500,
    currency: 'THB',
    organizer: {
      name: 'Scratch First',
      avatar: 'https://picsum.photos/100/100?random=101',
      contact: 'hello@wonderfruit.co'
    },
    rsvpCount: 1240,
    isPopular: true,
    tags: ['Festival', 'Eco', 'Art']
  },
  {
    id: '2',
    title: 'Bangkok Art Biennale',
    description: 'Experience contemporary art from around the world across various venues in Bangkok. The theme this year focuses on nurturing the soul.',
    startDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    location: {
      venue: 'BACC',
      city: 'Bangkok',
      lat: 13.7468,
      lng: 100.5351
    },
    category: 'Arts',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    price: 0,
    currency: 'THB',
    organizer: {
      name: 'BACC Foundation',
      avatar: 'https://picsum.photos/100/100?random=102',
      contact: 'info@bacc.or.th'
    },
    rsvpCount: 850,
    isPopular: true,
    tags: ['Gallery', 'Exhibition']
  },
  {
    id: '3',
    title: 'Sunday Morning Yoga in the Park',
    description: 'Start your Sunday with a refreshing Vinyasa flow at Lumpini Park. Open to all levels. Bring your own mat.',
    startDate: new Date(Date.now() + 86400000 * 1).toISOString(),
    location: {
      venue: 'Lumpini Park',
      city: 'Bangkok',
      lat: 13.7314,
      lng: 100.5417
    },
    category: 'Sports',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    price: 0,
    currency: 'THB',
    organizer: {
      name: 'Bangkok Wellness',
      avatar: 'https://picsum.photos/100/100?random=103',
      contact: 'yoga@bkwell.com'
    },
    rsvpCount: 45,
    isPopular: false,
    tags: ['Yoga', 'Wellness', 'Outdoor']
  },
  {
    id: '4',
    title: 'Chiang Mai Coffee Week',
    description: 'The biggest gathering of coffee lovers in the North. Taste beans from local growers and learn brewing techniques.',
    startDate: new Date(Date.now() + 86400000 * 15).toISOString(),
    location: {
      venue: 'One Nimman',
      city: 'Chiang Mai',
      lat: 18.8000,
      lng: 98.9680
    },
    category: 'Food',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    price: 100,
    currency: 'THB',
    organizer: {
      name: 'Northern Brews',
      avatar: 'https://picsum.photos/100/100?random=104',
      contact: 'brew@cmcoffee.com'
    },
    rsvpCount: 2300,
    isPopular: true,
    tags: ['Coffee', 'Market']
  },
  {
    id: '5',
    title: 'Full Moon Party',
    description: 'The legendary beach party on Haad Rin. Fire shows, buckets, and dancing until sunrise.',
    startDate: new Date(Date.now() + 86400000 * 20).toISOString(),
    location: {
      venue: 'Haad Rin Beach',
      city: 'Koh Phangan',
      lat: 9.6756,
      lng: 100.0633
    },
    category: 'Nightlife',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    price: 200,
    currency: 'THB',
    organizer: {
      name: 'Phangan Events',
      avatar: 'https://picsum.photos/100/100?random=105',
      contact: 'party@phangan.com'
    },
    rsvpCount: 5000,
    isPopular: true,
    tags: ['Party', 'Beach']
  },
  {
    id: '6',
    title: 'Thai Cooking Masterclass',
    description: 'Learn to cook authentic Pad Thai and Tom Yum Kung from a Michelin-star chef.',
    startDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    location: {
      venue: 'Blue Elephant School',
      city: 'Phuket',
      lat: 7.8804,
      lng: 98.3923
    },
    category: 'Workshops',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    price: 2500,
    currency: 'THB',
    organizer: {
      name: 'Chef Somchai',
      avatar: 'https://picsum.photos/100/100?random=106',
      contact: 'somchai@cooking.com'
    },
    rsvpCount: 12,
    isPopular: false,
    tags: ['Cooking', 'Class']
  }
];
