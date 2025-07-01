import { Calendar, MapPin, Clock, Users, ArrowLeft, Share2, Download, CheckCircle, Target, BookOpen } from 'lucide-react';
import Link from 'next/link';
import EventMap from '../../../components/EventMap';
import { getEventById } from '../../../data/events';
import { getEventMapData } from '../../../data/eventMaps';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetails({ params }: PageProps) {
  const resolvedParams = await params;
  const event = getEventById(resolvedParams.id);
  const mapData = event ? getEventMapData(event.id) : null;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Link href="/events" className="text-blue-600 hover:text-blue-700">
            Return to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <Link 
              href="/events" 
              className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {event.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {event.time}
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Event</h2>
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {event.fullDescription}
                </div>
              </div>

              {/* Meeting Points - Only show for events that have them */}
              {event.meetingPoints && event.meetingPoints.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Meeting Points</h3>
                  <div className="grid gap-4">
                    {event.meetingPoints.map((point, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{point.name}</h4>
                            <p className="text-gray-600">{point.location}</p>
                          </div>
                          <div className="text-blue-600 font-semibold">{point.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Agenda - Show for events that have an agenda */}
              {event.agenda && event.agenda.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Schedule</h3>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex border-l-4 border-blue-500 pl-4 py-3 bg-blue-50">
                        <div className="flex-shrink-0 w-20 text-blue-600 font-semibold text-sm">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.activity}</h4>
                          {item.details && <p className="text-gray-600 text-sm mt-1">{item.details}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Map - Show for all events */}
              {mapData && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Location Map</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <EventMap
                      eventId={event.id}
                      eventTitle={event.title}
                      mapPoints={mapData.mapPoints}
                      centerLocation={mapData.centerLocation}
                      mapDescription={mapData.mapDescription}
                      transportationInfo={mapData.transportationInfo}
                      additionalInfo={mapData.additionalInfo}
                    />
                  </div>
                </div>
              )}

              {/* Materials & Outcomes - For training/workshop events */}
              {(event.materials || event.outcomes) && (
                <div className="mt-12 grid md:grid-cols-2 gap-6">
                  {event.materials && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Materials Provided
                      </h4>
                      <ul className="space-y-2">
                        {event.materials.map((material, index) => (
                          <li key={index} className="flex items-start text-blue-800">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {material}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {event.outcomes && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Expected Outcomes
                      </h4>
                      <ul className="space-y-2">
                        {event.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start text-green-800">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Prerequisites - For events that have them */}
              {event.prerequisites && event.prerequisites.length > 0 && (
                <div className="mt-8">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h4 className="font-semibold text-yellow-900 mb-3">Prerequisites</h4>
                    <ul className="space-y-2">
                      {event.prerequisites.map((prerequisite, index) => (
                        <li key={index} className="flex items-start text-yellow-800">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {prerequisite}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Event Details Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Event Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Attendees</span>
                      <div className="flex items-center text-gray-900">
                        <Users className="h-4 w-4 mr-1" />
                        {event.attendees}/{event.maxAttendees}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Organizer</span>
                      <span className="text-gray-900 text-sm">{event.organizer}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Contact</span>
                      <a href={`mailto:${event.contact}`} className="text-blue-600 hover:text-blue-700 text-sm">
                        {event.contact}
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Join This Event
                    </button>
                    
                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Event
                    </button>
                    
                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center">
                      <Download className="h-4 w-4 mr-2" />
                      Download Details
                    </button>
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-4">What to Bring</h3>
                  <ul className="space-y-2">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-green-800">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progress Bar */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Registration Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Registered</span>
                      <span className="text-gray-900">{event.attendees}/{event.maxAttendees}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
