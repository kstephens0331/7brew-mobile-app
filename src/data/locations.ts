import { Location } from '../types';

export const locations: Location[] = [
  {
    id: 'conroe-davis',
    name: '7 Brew - Conroe (Davis St)',
    address: '3830 W Davis St',
    city: 'Conroe',
    state: 'TX',
    zip: '77304',
    coordinates: {
      lat: 30.3116,
      lng: -95.5072,
    },
    hours: '5:30 AM - 10:00 PM',
    isOpen: true,
    phone: '(936) 555-7279',
  },
  {
    id: 'conroe-concord',
    name: '7 Brew - Conroe (Concord Dr)',
    address: '16968 Concord Dr',
    city: 'Conroe',
    state: 'TX',
    zip: '77385',
    coordinates: {
      lat: 30.2088,
      lng: -95.5419,
    },
    hours: '5:30 AM - 10:00 PM',
    isOpen: true,
    phone: '(936) 555-7280',
  },
];

export const getLocationById = (id: string) => {
  return locations.find((loc) => loc.id === id);
};

export const getNearestLocation = (lat: number, lng: number) => {
  // Simple distance calculation (Haversine formula simplified)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 3959; // Earth radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  let nearest = locations[0];
  let minDistance = calculateDistance(lat, lng, nearest.coordinates.lat, nearest.coordinates.lng);

  locations.forEach((location) => {
    const distance = calculateDistance(lat, lng, location.coordinates.lat, location.coordinates.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = location;
    }
  });

  return nearest;
};
