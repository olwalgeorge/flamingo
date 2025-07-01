'use client';

import { useState } from 'react';
import { MapPin, Navigation, Info, Building, TreePine, Home, Clock } from 'lucide-react';

export interface MapPoint {
  id: string;
  name: string;
  type: 'meeting-point' | 'location' | 'parking' | 'facility' | 'landmark';
  description: string;
  coordinates: { x: number; y: number };
  details: string;
  time?: string;
}

interface EventMapProps {
  eventId: string;
  eventTitle: string;
  mapPoints: MapPoint[];
  centerLocation: string;
  mapDescription: string;
  transportationInfo?: string[];
  additionalInfo?: {
    title: string;
    items: string[];
    color: 'blue' | 'green' | 'yellow' | 'purple';
  }[];
}

export default function EventMap({ 
  eventTitle, 
  mapPoints, 
  centerLocation,
  mapDescription,
  transportationInfo,
  additionalInfo 
}: EventMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const getPointIcon = (type: string) => {
    switch (type) {
      case 'meeting-point':
        return <MapPin className="h-4 w-4" />;
      case 'location':
        return <Building className="h-4 w-4" />;
      case 'parking':
        return <div className="w-4 h-4 bg-blue-500 rounded border-2 border-white flex items-center justify-center text-white text-xs">P</div>;
      case 'facility':
        return <Home className="h-4 w-4" />;
      case 'landmark':
        return <TreePine className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getPointColor = (type: string) => {
    switch (type) {
      case 'meeting-point':
        return 'bg-blue-600 text-white';
      case 'location':
        return 'bg-green-600 text-white';
      case 'parking':
        return 'bg-purple-600 text-white';
      case 'facility':
        return 'bg-orange-600 text-white';
      case 'landmark':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getColorClasses = (color: 'blue' | 'green' | 'yellow' | 'purple') => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-200 text-blue-800 text-blue-900';
      case 'green':
        return 'bg-green-50 border-green-200 text-green-800 text-green-900';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 text-yellow-900';
      case 'purple':
        return 'bg-purple-50 border-purple-200 text-purple-800 text-purple-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800 text-gray-900';
    }
  };

  return (
    <div className="w-full">
      {/* Map Header */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{eventTitle} - Location Map</h4>
        <p className="text-gray-600">{mapDescription}</p>
      </div>

      {/* Legend */}
      <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
        <h5 className="font-semibold text-gray-900 mb-3">Map Legend</h5>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          {Array.from(new Set(mapPoints.map(point => point.type))).map(type => (
            <div key={type} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${getPointColor(type)}`}>
                {getPointIcon(type)}
              </div>
              <span className="capitalize">{type.replace('-', ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Map */}
      <div className="relative">
        {/* Map Container */}
        <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-gray-300 overflow-hidden">
          {/* Location Label */}
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {centerLocation}
          </div>

          {/* Directional Arrow */}
          <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md">
            <Navigation className="h-4 w-4 text-gray-600 transform rotate-45" />
          </div>

          {/* Map Points */}
          {mapPoints.map((point) => (
            <button
              key={point.id}
              className={`absolute w-8 h-8 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center ${getPointColor(point.type)} ${
                selectedPoint === point.id ? 'ring-4 ring-yellow-400 scale-110' : ''
              }`}
              style={{
                left: `${point.coordinates.x}%`,
                top: `${point.coordinates.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedPoint(selectedPoint === point.id ? null : point.id)}
            >
              {getPointIcon(point.type)}
            </button>
          ))}

          {/* Center marker for main location */}
          <div className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white" 
               style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          </div>
        </div>

        {/* Point Details */}
        {selectedPoint && (
          <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            {(() => {
              const point = mapPoints.find(p => p.id === selectedPoint);
              return point ? (
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h6 className="font-semibold text-gray-900">{point.name}</h6>
                      {point.time && (
                        <div className="flex items-center text-blue-600 text-sm mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {point.time}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedPoint(null)}
                      className="text-gray-400 hover:text-gray-600 ml-2"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{point.description}</p>
                  <p className="text-gray-700 text-sm">{point.details}</p>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>

      {/* Additional Information */}
      {additionalInfo && additionalInfo.length > 0 && (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {additionalInfo.map((info, index) => {
            const colorClasses = getColorClasses(info.color);
            return (
              <div key={index} className={`p-4 border rounded-lg ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]}`}>
                <div className="flex items-center mb-2">
                  <Info className={`h-5 w-5 mr-2 ${colorClasses.split(' ')[3]}`} />
                  <h6 className={`font-semibold ${colorClasses.split(' ')[3]}`}>{info.title}</h6>
                </div>
                <ul className={`text-sm space-y-1 ${colorClasses.split(' ')[2]}`}>
                  {info.items.map((item, itemIndex) => (
                    <li key={itemIndex}>• {item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {/* Transportation Guide */}
      {transportationInfo && transportationInfo.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h6 className="font-semibold text-yellow-900 mb-2">Getting There</h6>
          <div className="text-sm text-yellow-800 space-y-1">
            {transportationInfo.map((info, index) => (
              <p key={index}>{info}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
