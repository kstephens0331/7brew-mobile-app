import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation } from 'lucide-react';
import { Location } from '../../types';
import { Button } from './Button';

// Fix Leaflet default icon issue with CDN URLs
const DefaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface LocationMapProps {
  locations: Location[];
  selectedLocation?: Location;
  onLocationSelect?: (location: Location) => void;
}

// Component to handle map center changes
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}

// Function to open native map apps for directions
const openNativeDirections = (lat: number, lng: number, name: string) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  if (isIOS) {
    // Open Apple Maps on iOS
    window.location.href = `maps://maps.apple.com/?daddr=${lat},${lng}&q=${encodeURIComponent(name)}`;
  } else if (isAndroid) {
    // Open Google Maps on Android
    window.location.href = `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(name)})`;
  } else {
    // Open Google Maps in browser for desktop
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  }
};

export const LocationMap = ({ locations, selectedLocation, onLocationSelect }: LocationMapProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([30.3115, -95.4560]); // Default to Conroe, TX area
  const [mapZoom, setMapZoom] = useState(11);

  useEffect(() => {
    if (selectedLocation) {
      setMapCenter([selectedLocation.coordinates.lat, selectedLocation.coordinates.lng]);
      setMapZoom(14);
    }
  }, [selectedLocation]);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-96">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="h-full w-full"
        zoomControl={true}
      >
        <ChangeView center={mapCenter} zoom={mapZoom} />

        {/* Premium map tiles from OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Location markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={DefaultIcon}
            eventHandlers={{
              click: () => {
                onLocationSelect?.(location);
              },
            }}
          >
            <Popup className="location-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-gray-900 mb-1">{location.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <span className={`px-2 py-1 rounded-full font-semibold ${
                    location.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {location.isOpen ? 'Open' : 'Closed'}
                  </span>
                  <span>{location.hours}</span>
                </div>
                <Button
                  size="sm"
                  fullWidth
                  onClick={() => openNativeDirections(
                    location.coordinates.lat,
                    location.coordinates.lng,
                    location.name
                  )}
                  className="flex items-center justify-center gap-2"
                >
                  <Navigation size={14} />
                  Get Directions
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Custom zoom controls overlay */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-1">
        <button
          onClick={() => setMapZoom((z) => Math.min(z + 1, 18))}
          className="block w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors font-bold text-gray-700"
        >
          +
        </button>
        <div className="h-px bg-gray-200 my-1" />
        <button
          onClick={() => setMapZoom((z) => Math.max(z - 1, 1))}
          className="block w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors font-bold text-gray-700"
        >
          −
        </button>
      </div>
    </div>
  );
};
