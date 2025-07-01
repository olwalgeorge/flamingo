import { MapPoint } from '../components/EventMap';

interface EventMapData {
  mapPoints: MapPoint[];
  centerLocation: string;
  mapDescription: string;
  transportationInfo: string[];
  additionalInfo: Array<{
    title: string;
    items: string[];
    color: 'blue' | 'green' | 'yellow' | 'purple';
  }>;
}

export function getEventMapData(eventId: string): EventMapData | null {
  switch (eventId) {
    case "1": // River Kibos Clean-up Campaign
      return {
        mapPoints: [
          {
            id: 'kondele-bridge',
            name: 'Kondele Market Bridge',
            type: 'meeting-point',
            description: 'Primary assembly point',
            coordinates: { x: 45, y: 35 },
            details: 'Main gathering location with equipment distribution',
            time: '8:00 AM'
          },
          {
            id: 'nyamasaria-bridge',
            name: 'Nyamasaria Bridge',
            type: 'meeting-point',
            description: 'Secondary assembly point',
            coordinates: { x: 25, y: 55 },
            details: 'Alternative meeting location for nearby residents',
            time: '8:15 AM'
          },
          {
            id: 'mamboleo-junction',
            name: 'Mamboleo Junction',
            type: 'meeting-point',
            description: 'Third assembly point',
            coordinates: { x: 65, y: 25 },
            details: 'Meeting point for volunteers from eastern areas',
            time: '8:30 AM'
          },
          {
            id: 'parking-kondele',
            name: 'Kondele Market Parking',
            type: 'parking',
            description: 'Main parking area',
            coordinates: { x: 50, y: 30 },
            details: 'Free parking available for volunteers'
          }
        ],
        centerLocation: 'River Kibos Watershed',
        mapDescription: 'Click on the markers to learn more about meeting points and facilities for the River Kibos Clean-up Campaign.',
        transportationInfo: [
          'Public Transport: Take matatu route 9 or 12 to Kondele Market',
          'Private Vehicle: Parking available at Kondele Ward Office',
          'Walking: All sites accessible on foot from main roads',
          'Contact: Call +254 xxx xxx xxx for transportation assistance'
        ],
        additionalInfo: [
          {
            title: 'River Facts',
            items: [
              'Length: Approximately 12 km through Kisumu County',
              'Serves: Over 15,000 residents directly',
              'Main tributaries: 3 seasonal streams',
              'Flows into: Lake Victoria'
            ],
            color: 'blue'
          },
          {
            title: 'Conservation Impact',
            items: [
              '500+ tons of waste removed (2023-2024)',
              '1,200+ indigenous trees planted',
              '40% improvement in water quality',
              '15 active community groups'
            ],
            color: 'green'
          }
        ]
      };

    case "2": // Quarterly General Meeting
      return {
        mapPoints: [
          {
            id: 'main-entrance',
            name: 'FCC CBO Main Entrance',
            type: 'meeting-point',
            description: 'Main entry point',
            coordinates: { x: 50, y: 20 },
            details: 'Check-in and registration desk',
            time: '1:45 PM'
          },
          {
            id: 'conference-hall',
            name: 'Conference Hall',
            type: 'location',
            description: 'Meeting venue',
            coordinates: { x: 50, y: 50 },
            details: 'Main meeting room with presentation facilities',
            time: '2:00 PM'
          },
          {
            id: 'parking-office',
            name: 'Office Parking',
            type: 'parking',
            description: 'Visitor parking',
            coordinates: { x: 30, y: 35 },
            details: 'Limited parking spaces available'
          },
          {
            id: 'reception',
            name: 'Reception Area',
            type: 'facility',
            description: 'Information desk',
            coordinates: { x: 40, y: 30 },
            details: 'Information and assistance desk'
          }
        ],
        centerLocation: 'FCC CBO Office, Flamingo Unit',
        mapDescription: 'Location map for the Quarterly General Meeting venue and facilities.',
        transportationInfo: [
          'Public Transport: Matatu route 14 to Flamingo Estate',
          'Private Vehicle: Limited parking available on-site',
          'Walking: 5-minute walk from Flamingo Shopping Center',
          'Taxi: Available from Kisumu town center (15 minutes)'
        ],
        additionalInfo: [
          {
            title: 'Meeting Facilities',
            items: [
              'Air-conditioned conference hall',
              'Audio-visual presentation equipment',
              'Tea/coffee service during break',
              'Document printing services'
            ],
            color: 'blue'
          },
          {
            title: 'What to Bring',
            items: [
              'Government-issued ID for registration',
              'Previous meeting minutes',
              'Committee reports (if applicable)',
              'Notebook and pen'
            ],
            color: 'purple'
          }
        ]
      };

    case "3": // Tree Planting Workshop
      return {
        mapPoints: [
          {
            id: 'community-center',
            name: 'Kondele Community Center',
            type: 'location',
            description: 'Workshop venue',
            coordinates: { x: 50, y: 40 },
            details: 'Main hall for presentations and registration',
            time: '9:00 AM'
          },
          {
            id: 'demo-area',
            name: 'Demonstration Area',
            type: 'facility',
            description: 'Hands-on practice area',
            coordinates: { x: 70, y: 60 },
            details: 'Outdoor area for practical tree planting demonstrations',
            time: '11:45 AM'
          },
          {
            id: 'nursery-site',
            name: 'Tree Nursery',
            type: 'landmark',
            description: 'Seedling distribution point',
            coordinates: { x: 30, y: 70 },
            details: 'Local nursery with indigenous tree seedlings'
          },
          {
            id: 'parking-center',
            name: 'Community Center Parking',
            type: 'parking',
            description: 'Main parking area',
            coordinates: { x: 40, y: 25 },
            details: 'Free parking for workshop participants'
          }
        ],
        centerLocation: 'Kondele Ward Community Center',
        mapDescription: 'Workshop venue and demonstration areas for the Tree Planting Workshop.',
        transportationInfo: [
          'Public Transport: Matatu route 7 or 11 to Kondele Center',
          'Private Vehicle: Ample parking at community center',
          'Walking: Accessible from Kondele Market (10 minutes)',
          'Boda Boda: Available from various points in Kondele'
        ],
        additionalInfo: [
          {
            title: 'Workshop Areas',
            items: [
              'Indoor presentation hall (air-conditioned)',
              'Outdoor demonstration garden',
              'Tool storage and distribution area',
              'Refreshment area with local cuisine'
            ],
            color: 'green'
          },
          {
            title: 'What You\'ll Receive',
            items: [
              '5 indigenous tree seedlings',
              'Tree planting manual',
              'Basic gardening tools kit',
              'Certificate of participation'
            ],
            color: 'blue'
          }
        ]
      };

    case "4": // Urban Farming Training
      return {
        mapPoints: [
          {
            id: 'training-grounds',
            name: 'FCC CBO Training Grounds',
            type: 'location',
            description: 'Main training facility',
            coordinates: { x: 50, y: 45 },
            details: 'Indoor classroom and outdoor demonstration plots',
            time: '10:00 AM'
          },
          {
            id: 'demo-gardens',
            name: 'Demonstration Gardens',
            type: 'facility',
            description: 'Container farming displays',
            coordinates: { x: 70, y: 55 },
            details: 'Various urban farming setups and examples',
            time: '12:00 PM'
          },
          {
            id: 'greenhouse',
            name: 'Greenhouse Facility',
            type: 'facility',
            description: 'Controlled environment farming',
            coordinates: { x: 65, y: 30 },
            details: 'Modern greenhouse with irrigation systems',
            time: '2:00 PM'
          },
          {
            id: 'parking-training',
            name: 'Training Grounds Parking',
            type: 'parking',
            description: 'Participant parking',
            coordinates: { x: 35, y: 35 },
            details: 'Secure parking area for trainees'
          }
        ],
        centerLocation: 'FCC CBO Training Grounds',
        mapDescription: 'Training facilities and demonstration areas for urban farming techniques.',
        transportationInfo: [
          'Public Transport: Matatu route 15 to FCC Training Center',
          'Private Vehicle: Secure parking available on-site',
          'Walking: 15-minute walk from Kondele Market',
          'Contact: +254 xxx xxx xxx for directions'
        ],
        additionalInfo: [
          {
            title: 'Training Facilities',
            items: [
              'Modern classroom with projector',
              'Demonstration container gardens',
              'Greenhouse with irrigation systems',
              'Tool library and equipment storage'
            ],
            color: 'green'
          },
          {
            title: 'Business Support',
            items: [
              'Market linkage contacts',
              'Microfinance partnership info',
              'Business plan templates',
              'Monthly follow-up sessions'
            ],
            color: 'purple'
          }
        ]
      };

    case "5": // Waste Management & Recycling Seminar
      return {
        mapPoints: [
          {
            id: 'community-hall',
            name: 'Kondele Community Hall',
            type: 'location',
            description: 'Seminar venue',
            coordinates: { x: 50, y: 45 },
            details: 'Main hall with seating for 50 participants',
            time: '1:00 PM'
          },
          {
            id: 'recycling-demo',
            name: 'Recycling Demonstration Area',
            type: 'facility',
            description: 'Hands-on recycling station',
            coordinates: { x: 70, y: 35 },
            details: 'Live demonstration of waste sorting and processing',
            time: '2:00 PM'
          },
          {
            id: 'composting-site',
            name: 'Composting Demonstration',
            type: 'facility',
            description: 'Organic waste processing',
            coordinates: { x: 30, y: 65 },
            details: 'Community composting setup example',
            time: '2:30 PM'
          },
          {
            id: 'hall-parking',
            name: 'Community Hall Parking',
            type: 'parking',
            description: 'Visitor parking',
            coordinates: { x: 40, y: 25 },
            details: 'Free parking for seminar attendees'
          }
        ],
        centerLocation: 'Kondele Community Hall',
        mapDescription: 'Seminar venue and demonstration areas for waste management and recycling education.',
        transportationInfo: [
          'Public Transport: Matatu route 8 or 12 to Kondele Hall',
          'Private Vehicle: Free parking at community hall',
          'Walking: Central location in Kondele area',
          'Boda Boda: Readily available in the area'
        ],
        additionalInfo: [
          {
            title: 'Demonstration Areas',
            items: [
              'Waste sorting and classification station',
              'Plastic recycling equipment demo',
              'Organic composting setup',
              'Display of recycled products'
            ],
            color: 'green'
          },
          {
            title: 'Business Opportunities',
            items: [
              'Recycling collection routes',
              'Partnership with waste buyers',
              'Equipment financing options',
              'Market prices for recyclables'
            ],
            color: 'blue'
          }
        ]
      };

    case "6": // Women's Basket Weaving Workshop
      return {
        mapPoints: [
          {
            id: 'community-center-main',
            name: 'FCC CBO Community Center',
            type: 'location',
            description: 'Workshop venue',
            coordinates: { x: 50, y: 45 },
            details: 'Spacious hall with good lighting for detailed work',
            time: '2:00 PM'
          },
          {
            id: 'materials-room',
            name: 'Materials Storage Room',
            type: 'facility',
            description: 'Weaving supplies',
            coordinates: { x: 65, y: 30 },
            details: 'Traditional weaving materials and tools storage'
          },
          {
            id: 'display-area',
            name: 'Product Display Area',
            type: 'facility',
            description: 'Finished products showcase',
            coordinates: { x: 35, y: 60 },
            details: 'Examples of traditional and modern basket designs',
            time: '5:30 PM'
          },
          {
            id: 'center-parking',
            name: 'Community Center Parking',
            type: 'parking',
            description: 'Workshop parking',
            coordinates: { x: 30, y: 30 },
            details: 'Safe parking for workshop participants'
          }
        ],
        centerLocation: 'FCC CBO Community Center',
        mapDescription: 'Workshop venue and facilities for traditional basket weaving and women\'s empowerment.',
        transportationInfo: [
          'Public Transport: Matatu route 13 to FCC Community Center',
          'Private Vehicle: Secure parking available',
          'Walking: 20-minute walk from Kondele Market',
          'Group Transport: Arranged pickup from central locations'
        ],
        additionalInfo: [
          {
            title: 'Workshop Facilities',
            items: [
              'Well-lit workspace with comfortable seating',
              'Traditional weaving material supplies',
              'Display area for finished products',
              'Tea service and networking area'
            ],
            color: 'purple'
          },
          {
            title: 'Economic Benefits',
            items: [
              'Market linkage with local shops',
              'Online selling platform training',
              'Cooperative membership opportunity',
              'Bulk order contracts available'
            ],
            color: 'green'
          }
        ]
      };

    default:
      return null;
  }
}
