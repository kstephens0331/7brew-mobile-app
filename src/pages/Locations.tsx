import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LocationMap } from '../components/ui/LocationMap';
import { locations } from '../data/locations';

export const Locations = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const handleGetDirections = (lat: number, lng: number) => {
    // Open in Google Maps
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="sticky top-0 z-40 bg-maroon text-white shadow-lg">
        <div className="flex items-center px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-heading font-bold ml-2">FIND A STAND</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {/* Info Banner */}
        <Card className="bg-navy text-white">
          <div className="text-center py-2">
            <p className="font-bold text-lg">553 Stands Nationwide</p>
            <p className="text-sm opacity-90">Cultivating Kindness Since 2017</p>
          </div>
        </Card>

        {/* Locations List */}
        <div className="space-y-4">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                interactive
                onClick={() => setSelectedLocation(location)}
                className={selectedLocation.id === location.id ? 'ring-2 ring-maroon' : ''}
              >
                {/* Location Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-maroon/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-maroon" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{location.name}</h3>
                      <p className="text-sm text-gray-600">{location.address}</p>
                      <p className="text-sm text-gray-600">
                        {location.city}, {location.state} {location.zip}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      location.isOpen
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {location.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>

                {/* Location Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{location.hours}</span>
                  </div>
                  {location.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} />
                      <a href={`tel:${location.phone}`} className="text-maroon font-semibold">
                        {location.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetDirections(location.coordinates.lat, location.coordinates.lng);
                    }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Navigation size={16} />
                    Directions
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Set as default location and navigate to menu
                      navigate('/menu');
                    }}
                  >
                    Order Here
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Interactive Map */}
        <LocationMap
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />
      </div>
    </div>
  );
};
