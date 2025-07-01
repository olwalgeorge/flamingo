'use client';

import { useState } from 'react';
import { MapPin, Navigation, Info, Waves, TreePine } from 'lucide-react';

export default function RiverKibosMap() {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  // River Kibos key points and areas
  const mapPoints = [
    {
      id: 'kondele-bridge',
      name: 'Kondele Market Bridge',
      type: 'meeting-point',
      description: 'Primary assembly point for the clean-up campaign',
      coordinates: { x: 45, y: 35 },
      details: 'Main gathering location with equipment distribution'
    },
    {
      id: 'nyamasaria-bridge',
      name: 'Nyamasaria Bridge',
      type: 'meeting-point',
      description: 'Secondary assembly point',
      coordinates: { x: 25, y: 55 },
      details: 'Alternative meeting location for nearby residents'
    },
    {
      id: 'mamboleo-junction',
      name: 'Mamboleo Junction',
      type: 'meeting-point',
      description: 'Third assembly point',
      coordinates: { x: 65, y: 25 },
      details: 'Meeting point for volunteers from eastern areas'
    },
    {
      id: 'pollution-hotspot-1',
      name: 'Industrial Discharge Area',
      type: 'pollution',
      description: 'High priority cleaning zone',
      coordinates: { x: 35, y: 45 },
      details: 'Area requiring special attention due to industrial waste'
    },
    {
      id: 'pollution-hotspot-2',
      name: 'Market Waste Zone',
      type: 'pollution',
      description: 'Heavy plastic pollution area',
      coordinates: { x: 55, y: 40 },
      details: 'Focus on plastic waste removal and community education'
    },
    {
      id: 'tree-planting-1',
      name: 'Riverbank Restoration Site A',
      type: 'restoration',
      description: 'Tree planting and erosion control',
      coordinates: { x: 30, y: 60 },
      details: 'Indigenous tree species planting to prevent soil erosion'
    },
    {
      id: 'tree-planting-2',
      name: 'Riverbank Restoration Site B',
      type: 'restoration',
      description: 'Wetland restoration area',
      coordinates: { x: 70, y: 50 },
      details: 'Wetland vegetation restoration and water filtration improvement'
    },
    {
      id: 'monitoring-station',
      name: 'Water Quality Monitoring Station',
      type: 'monitoring',
      description: 'Regular water testing location',
      coordinates: { x: 50, y: 70 },
      details: 'Monthly water quality assessments and data collection'
    }
  ];

  const getPointIcon = (type: string) => {
    switch (type) {
      case 'meeting-point':
        return <MapPin className="h-4 w-4" />;
      case 'pollution':
        return <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white" />;
      case 'restoration':
        return <TreePine className="h-4 w-4 text-green-600" />;
      case 'monitoring':
        return <Waves className="h-4 w-4 text-blue-600" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getPointColor = (type: string) => {
    switch (type) {
      case 'meeting-point':
        return 'bg-blue-600 text-white';
      case 'pollution':
        return 'bg-red-600 text-white';
      case 'restoration':
        return 'bg-green-600 text-white';
      case 'monitoring':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="w-full">
      {/* Map Header */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-900 mb-2">River Kibos Interactive Map</h4>
        <p className="text-gray-600">
          Click on the markers to learn more about specific locations and activities along River Kibos.
        </p>
      </div>

      {/* Legend */}
      <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
        <h5 className="font-semibold text-gray-900 mb-3">Map Legend</h5>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">
              <MapPin className="h-3 w-3 text-white" />
            </div>
            <span>Meeting Points</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-600 rounded-full mr-2"></div>
            <span>Pollution Hotspots</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-2">
              <TreePine className="h-3 w-3 text-white" />
            </div>
            <span>Restoration Sites</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-2">
              <Waves className="h-3 w-3 text-white" />
            </div>
            <span>Monitoring Station</span>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="relative">
        {/* Map Container */}
        <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-gray-300 overflow-hidden">
          {/* River Path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <path
              d="M10 80 Q20 70 30 65 Q40 60 50 65 Q60 70 70 60 Q80 50 90 45"
              stroke="#3B82F6"
              strokeWidth="3"
              fill="none"
              className="opacity-70"
            />
            <path
              d="M10 82 Q20 72 30 67 Q40 62 50 67 Q60 72 70 62 Q80 52 90 47"
              stroke="#60A5FA"
              strokeWidth="2"
              fill="none"
              className="opacity-50"
            />
          </svg>

          {/* River Label */}
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <Waves className="h-4 w-4 mr-1" />
            River Kibos
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
        </div>

        {/* Point Details */}
        {selectedPoint && (
          <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            {(() => {
              const point = mapPoints.find(p => p.id === selectedPoint);
              return point ? (
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h6 className="font-semibold text-gray-900">{point.name}</h6>
                    <button
                      onClick={() => setSelectedPoint(null)}
                      className="text-gray-400 hover:text-gray-600"
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
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center mb-2">
            <Info className="h-5 w-5 text-blue-600 mr-2" />
            <h6 className="font-semibold text-blue-900">River Facts</h6>
          </div>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Length: Approximately 12 km through Kisumu County</li>
            <li>• Serves: Over 15,000 residents directly</li>
            <li>• Main tributaries: 3 seasonal streams</li>
            <li>• Flows into: Lake Victoria</li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center mb-2">
            <TreePine className="h-5 w-5 text-green-600 mr-2" />
            <h6 className="font-semibold text-green-900">Conservation Impact</h6>
          </div>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• 500+ tons of waste removed (2023-2024)</li>
            <li>• 1,200+ indigenous trees planted</li>
            <li>• 40% improvement in water quality</li>
            <li>• 15 active community groups</li>
          </ul>
        </div>
      </div>

      {/* Transportation Guide */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h6 className="font-semibold text-yellow-900 mb-2">Getting There</h6>
        <div className="text-sm text-yellow-800 space-y-1">
          <p><strong>Public Transport:</strong> Take matatu route 9 or 12 to Kondele Market</p>
          <p><strong>Private Vehicle:</strong> Parking available at Kondele Ward Office</p>
          <p><strong>Walking:</strong> All sites accessible on foot from main roads</p>
          <p><strong>Contact:</strong> Call +254 xxx xxx xxx for transportation assistance</p>
        </div>
      </div>
    </div>
  );
}
