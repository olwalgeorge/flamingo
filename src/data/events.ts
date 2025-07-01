export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  image: string;
  coordinates?: { lat: number; lng: number };
  fullDescription: string;
  organizer: string;
  contact: string;
  requirements: string[];
  meetingPoints?: Array<{
    name: string;
    location: string;
    time: string;
  }>;
  agenda?: Array<{
    time: string;
    activity: string;
    details?: string;
  }>;
  materials?: string[];
  outcomes?: string[];
  prerequisites?: string[];
}

export const eventsData: Event[] = [
  {
    id: "1",
    title: "River Kibos Clean-up Campaign",
    date: "July 15, 2025",
    time: "8:00 AM - 12:00 PM",
    location: "River Kibos Watershed, Kondele Ward",
    description: "Join us for our monthly river clean-up initiative to protect water sources and preserve aquatic ecosystems.",
    category: "environmental",
    attendees: 45,
    maxAttendees: 60,
    image: "/api/placeholder/800/400",
    coordinates: { lat: -0.0917, lng: 34.7680 },
    fullDescription: `The River Kibos Clean-up Campaign is a monthly community-driven initiative aimed at preserving one of Kisumu's most important water sources. River Kibos flows through several wards in Kisumu County and directly impacts the lives of thousands of residents.

This campaign involves:
• Removal of solid waste and plastic pollution from the riverbanks and water
• Water quality testing and monitoring
• Community education on proper waste disposal
• Tree planting along the riverbanks to prevent erosion
• Collaboration with local authorities and environmental agencies

Impact So Far:
• Over 500 tons of waste removed since 2023
• 1,200+ trees planted along riverbanks
• Water quality improved by 40%
• 15 community groups now actively participate

This event is suitable for all ages and fitness levels. Families are especially welcome, as we believe environmental stewardship should be taught from an early age.`,
    organizer: "FCC CBO Environmental Committee",
    contact: "environment@fcccbo.org",
    requirements: ["Comfortable work clothes", "Water bottle", "Enthusiasm for environmental conservation"],
    meetingPoints: [
      { name: "Primary Assembly Point", location: "Kondele Market Bridge", time: "8:00 AM" },
      { name: "Secondary Point A", location: "Nyamasaria Bridge", time: "8:15 AM" },
      { name: "Secondary Point B", location: "Mamboleo Junction", time: "8:30 AM" }
    ],
    agenda: [
      { time: "8:00 AM", activity: "Registration & Equipment Distribution", details: "Check-in at Kondele Market Bridge" },
      { time: "8:30 AM", activity: "Safety Briefing", details: "Important safety guidelines for river work" },
      { time: "9:00 AM", activity: "Clean-up Activities Begin", details: "Divided into teams for different river sections" },
      { time: "11:00 AM", activity: "Tree Planting Session", details: "Indigenous species along erosion-prone areas" },
      { time: "11:45 AM", activity: "Wrap-up & Data Collection", details: "Waste sorting and environmental data recording" },
      { time: "12:00 PM", activity: "Community Refreshments", details: "Light refreshments and networking" }
    ]
  },
  {
    id: "2",
    title: "Quarterly General Meeting - Q3 2025",
    date: "July 20, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "FCC CBO Office, Flamingo Unit",
    description: "Mandatory quarterly meeting for all management committee members to discuss progress and plan future activities.",
    category: "meeting",
    attendees: 15,
    maxAttendees: 20,
    image: "/api/placeholder/800/400",
    fullDescription: `The Quarterly General Meeting is a cornerstone of FCC CBO's governance structure, ensuring transparency, accountability, and strategic planning for our community initiatives.

This meeting will cover:
• Review of Q2 2025 achievements and financial reports
• Assessment of ongoing environmental and community projects
• Planning for Q4 2025 activities and resource allocation
• Member feedback and suggestions for organizational improvement
• Election of committee positions (if required)
• Partnership opportunities and funding updates

Key Discussion Points:
• River Kibos conservation project progress
• Community empowerment program expansion
• Financial sustainability strategies
• Member engagement and volunteer coordination
• Impact measurement and reporting

All management committee members are required to attend. Guest speakers from partner organizations will present on collaborative opportunities.`,
    organizer: "FCC CBO Management Committee",
    contact: "management@fcccbo.org",
    requirements: ["Formal attire", "Meeting materials", "Committee reports"],
    agenda: [
      { time: "2:00 PM", activity: "Opening & Welcome", details: "Chairman's address and member introductions" },
      { time: "2:15 PM", activity: "Financial Report Presentation", details: "Q2 2025 financial overview and budget review" },
      { time: "2:45 PM", activity: "Project Updates", details: "Environmental and community project progress reports" },
      { time: "3:30 PM", activity: "Tea Break", details: "Networking and informal discussions" },
      { time: "3:45 PM", activity: "Strategic Planning Session", details: "Q4 2025 planning and goal setting" },
      { time: "4:30 PM", activity: "Member Input & Resolutions", details: "Open floor for member concerns and proposals" },
      { time: "5:00 PM", activity: "Closing Remarks", details: "Summary and next steps" }
    ],
    prerequisites: ["Management committee membership", "Review of provided meeting materials"]
  },
  {
    id: "3",
    title: "Tree Planting Workshop",
    date: "July 28, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Community Center, Kondele Ward",
    description: "Educational workshop on sustainable tree planting techniques and watershed conservation practices.",
    category: "educational",
    attendees: 30,
    maxAttendees: 40,
    image: "/api/placeholder/800/400",
    fullDescription: `Join us for an intensive hands-on workshop designed to equip community members with practical tree planting skills and watershed conservation knowledge. This workshop combines theoretical learning with practical application.

Workshop Components:
• Native tree species identification and selection
• Soil preparation and nursery management techniques
• Proper planting methods for different terrains
• Watering schedules and early care practices
• Pest and disease management for young trees
• Community forest management principles

Learning Outcomes:
• Understand the ecological importance of indigenous trees
• Master proper tree planting and care techniques
• Learn about watershed conservation and its community benefits
• Develop skills in community forest management
• Create personal action plans for tree planting initiatives

Expert Facilitators:
• Kenya Forest Service technical officers
• Local agricultural extension officers
• Experienced community conservationists
• FCC CBO environmental committee members

Each participant will receive a starter kit with indigenous tree seedlings to plant in their communities.`,
    organizer: "FCC CBO Environmental Committee",
    contact: "environment@fcccbo.org",
    requirements: ["Work clothes suitable for outdoor activities", "Notebook and pen", "Water bottle and light snacks"],
    agenda: [
      { time: "9:00 AM", activity: "Registration & Welcome", details: "Check-in and workshop material distribution" },
      { time: "9:30 AM", activity: "Introduction to Watershed Conservation", details: "Theoretical session on environmental importance" },
      { time: "10:30 AM", activity: "Native Tree Species Workshop", details: "Identification and selection of appropriate species" },
      { time: "11:30 AM", activity: "Tea Break", details: "Networking and Q&A session" },
      { time: "11:45 AM", activity: "Hands-on Planting Session", details: "Practical tree planting demonstration" },
      { time: "1:00 PM", activity: "Lunch Break", details: "Community meal and informal discussions" },
      { time: "2:00 PM", activity: "Nursery Management Training", details: "Soil preparation and seedling care" },
      { time: "2:45 PM", activity: "Action Planning", details: "Individual and community planting plans" },
      { time: "3:00 PM", activity: "Closing & Seedling Distribution", details: "Take-home seedlings and certificates" }
    ],
    materials: ["Indigenous tree seedlings", "Planting tools", "Soil testing kits", "Training manual"],
    outcomes: ["Certificate of participation", "Seedling starter kit", "Community action plan template"]
  },
  {
    id: "4",
    title: "Urban Farming Training",
    date: "August 5, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "FCC CBO Training Grounds",
    description: "Hands-on training for community members on modern urban farming methods and sustainable agriculture.",
    category: "training",
    attendees: 25,
    maxAttendees: 35,
    image: "/api/placeholder/800/400",
    fullDescription: `Transform your understanding of urban agriculture with this comprehensive training program designed for community members interested in sustainable food production and income generation.

Training Modules:
• Container and vertical farming techniques
• Organic composting and soil health management
• Water-efficient irrigation systems
• Crop rotation and companion planting
• Pest management using natural methods
• Marketing and business aspects of urban farming

Practical Skills Development:
• Setting up urban garden spaces in limited areas
• Building raised beds and container systems
• Creating organic fertilizers from kitchen waste
• Installing drip irrigation systems
• Harvesting and post-harvest handling
• Record keeping and financial management

Economic Benefits:
• Reduce household food expenses by up to 30%
• Generate supplementary income through produce sales
• Create employment opportunities for family members
• Develop marketable agricultural skills
• Build resilience against food insecurity

This training is perfect for individuals with limited space but big dreams of growing their own food and contributing to community food security.`,
    organizer: "FCC CBO Agricultural Committee",
    contact: "agriculture@fcccbo.org",
    requirements: ["Work clothes and gloves", "Notebook for record keeping", "Interest in sustainable agriculture"],
    agenda: [
      { time: "10:00 AM", activity: "Welcome & Introduction to Urban Farming", details: "Overview of modern urban agriculture methods" },
      { time: "10:45 AM", activity: "Container Farming Demonstration", details: "Hands-on setup of container gardens" },
      { time: "12:00 PM", activity: "Lunch Break", details: "Farm-to-table meal from training grounds" },
      { time: "1:00 PM", activity: "Composting Workshop", details: "Creating organic fertilizers from waste" },
      { time: "2:00 PM", activity: "Irrigation Systems Setup", details: "Installing water-efficient systems" },
      { time: "3:00 PM", activity: "Business Planning Session", details: "Marketing and financial planning for urban farms" },
      { time: "4:00 PM", activity: "Resource Distribution & Closing", details: "Starter kits and follow-up information" }
    ],
    materials: ["Vegetable seeds", "Small containers", "Organic fertilizer samples", "Irrigation supplies"],
    outcomes: ["Urban farming starter kit", "Business plan template", "Monthly follow-up support"],
    prerequisites: ["Basic literacy skills", "Access to small growing space"]
  },
  {
    id: "5",
    title: "Waste Management & Recycling Seminar",
    date: "August 12, 2025",
    time: "1:00 PM - 4:00 PM",
    location: "Kondele Community Hall",
    description: "Learn about eco-friendly waste management systems and recycling opportunities for community benefit.",
    category: "environmental",
    attendees: 40,
    maxAttendees: 50,
    image: "/api/placeholder/800/400",
    fullDescription: `Join this transformative seminar focused on turning waste challenges into environmental and economic opportunities for our community.

Seminar Focus Areas:
• Waste segregation and classification systems
• Home composting for organic waste
• Plastic recycling and upcycling techniques
• Community waste collection and management
• Economic opportunities in waste management
• Partnership with waste management companies

Environmental Impact:
• Reduce landfill waste by up to 60%
• Decrease greenhouse gas emissions from improper disposal
• Protect water sources from contamination
• Create cleaner, healthier community environments
• Contribute to county-wide environmental goals

Economic Opportunities:
• Start small-scale recycling businesses
• Create community employment in waste collection
• Generate income from recyclable materials
• Reduce household waste disposal costs
• Access microfinance for waste management ventures

Community Benefits:
• Improved public health through proper waste handling
• Enhanced community appearance and property values
• Reduced disease vectors and pest problems
• Strengthened community cooperation and responsibility

Guest speakers include successful local recycling entrepreneurs and environmental health officers.`,
    organizer: "FCC CBO Environmental Committee",
    contact: "environment@fcccbo.org",
    requirements: ["Interest in environmental conservation", "Notebook for taking notes", "Examples of household waste (optional)"],
    agenda: [
      { time: "1:00 PM", activity: "Registration & Welcome", details: "Introduction to waste management challenges" },
      { time: "1:15 PM", activity: "Waste Classification Workshop", details: "Learning proper segregation techniques" },
      { time: "2:00 PM", activity: "Composting Demonstration", details: "Setting up home composting systems" },
      { time: "2:30 PM", activity: "Recycling Business Opportunities", details: "Presentation by local recycling entrepreneurs" },
      { time: "3:00 PM", activity: "Tea Break & Networking", details: "Connect with like-minded community members" },
      { time: "3:15 PM", activity: "Community Action Planning", details: "Developing neighborhood waste management plans" },
      { time: "3:45 PM", activity: "Resource Sharing & Closing", details: "Information packets and partnership opportunities" }
    ],
    materials: ["Waste segregation guides", "Composting starter materials", "Recycling contact directory"],
    outcomes: ["Community waste management plan", "Business opportunity assessment", "Follow-up support network"]
  },
  {
    id: "6",
    title: "Women's Basket Weaving Workshop",
    date: "August 19, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "FCC CBO Community Center",
    description: "Empowering women through traditional weaving skills and income-generating activities.",
    category: "skills",
    attendees: 20,
    maxAttendees: 25,
    image: "/api/placeholder/800/400",
    fullDescription: `Celebrate and preserve traditional craftsmanship while building modern economic opportunities for women in our community through this intensive basket weaving workshop.

Workshop Objectives:
• Master traditional Luo basket weaving techniques
• Learn modern design adaptations for market appeal
• Develop quality control and finishing skills
• Build business and marketing capabilities
• Create sustainable income-generating opportunities
• Strengthen women's economic empowerment

Traditional Techniques Covered:
• Material selection and preparation (sisal, palm leaves, grass)
• Foundation and base construction methods
• Traditional patterns and cultural significance
• Color integration using natural dyes
• Finishing techniques for durability and appeal

Modern Adaptations:
• Contemporary designs for urban markets
• Size variations for different uses (storage, decoration, gifts)
• Integration with modern materials for enhanced durability
• Quality standards for retail and export markets
• Branding and presentation techniques

Economic Empowerment:
• Cost calculation and pricing strategies
• Market research and customer identification
• Online selling platforms and social media marketing
• Cooperative formation for bulk sales and shared resources
• Access to microfinance and business development support

Cultural Preservation:
• Documentation of traditional techniques
• Intergenerational knowledge transfer
• Integration of cultural stories and meanings
• Promotion of Luo craftsmanship heritage`,
    organizer: "FCC CBO Women's Empowerment Committee",
    contact: "women@fcccbo.org",
    requirements: ["Comfortable seating arrangement", "Good eyesight or reading glasses", "Patience for detailed work"],
    agenda: [
      { time: "2:00 PM", activity: "Welcome & Cultural Context", details: "History and significance of traditional weaving" },
      { time: "2:30 PM", activity: "Material Preparation Workshop", details: "Selecting and preparing weaving materials" },
      { time: "3:30 PM", activity: "Basic Weaving Techniques", details: "Hands-on learning of foundation methods" },
      { time: "4:30 PM", activity: "Tea Break & Sharing", details: "Cultural stories and experiences exchange" },
      { time: "4:45 PM", activity: "Advanced Patterns & Finishing", details: "Complex designs and professional finishing" },
      { time: "5:30 PM", activity: "Business & Marketing Session", details: "Turning skills into income opportunities" },
      { time: "6:00 PM", activity: "Closing & Take-home Projects", details: "Completed baskets and follow-up plans" }
    ],
    materials: ["Weaving materials (sisal, grasses)", "Basic tools and equipment", "Natural dyes and colors"],
    outcomes: ["Completed basket project", "Business development guide", "Women's cooperative invitation"],
    prerequisites: ["Basic hand-eye coordination", "Commitment to skill development"]
  }
];

export function getEventById(id: string): Event | undefined {
  return eventsData.find(event => event.id === id);
}

export function getAllEvents(): Event[] {
  return eventsData;
}
