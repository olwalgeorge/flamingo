import { Calendar, MapPin, Clock, Users, ArrowLeft, CheckCircle, Target, BookOpen, 
         TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import EventMap from '../../../components/EventMap';
import EventRegistration from '../../../components/EventRegistration';
import EventComments from '../../../components/EventComments';
import { getEventById, eventsData } from '../../../data/events';
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

  // Get related events (same category, excluding current event)
  const relatedEvents = eventsData
    .filter(e => e.category === event?.category && e.id !== resolvedParams.id)
    .slice(0, 3);

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

              {/* Event Funding Section - Show for events that have financial information */}
              {(event.fundraisingGoal || event.estimatedCost) && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Support & Funding</h3>
                  
                  {/* Funding Progress */}
                  {event.fundraisingGoal && event.currentFunding !== undefined && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">Funding Progress</h4>
                        <div className="text-sm text-gray-600">
                          {Math.round((event.currentFunding / event.fundraisingGoal) * 100)}% funded
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                          <span>${event.currentFunding?.toLocaleString() || 0} raised</span>
                          <span>${event.fundraisingGoal.toLocaleString()} goal</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((event.currentFunding / event.fundraisingGoal) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Help us reach our funding goal to ensure this community event can make the maximum impact.
                      </p>
                    </div>
                  )}

                  {/* Funding Breakdown */}
                  {event.fundingBreakdown && event.fundingBreakdown.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">How Funds Are Used</h4>
                        <div className="space-y-3">
                          {event.fundingBreakdown.map((item, index) => (
                            <div key={index} className="flex justify-between items-start p-3 bg-white rounded-lg border">
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{item.category}</h5>
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                              <div className="ml-4 text-lg font-semibold text-green-600">
                                ${item.amount}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sponsorship Opportunities */}
                      {event.sponsorshipOpportunities && event.sponsorshipOpportunities.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Sponsorship Opportunities</h4>
                          <div className="space-y-3">
                            {event.sponsorshipOpportunities.map((sponsor, index) => (
                              <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-semibold text-gray-900">{sponsor.level}</h5>
                                  <span className="text-lg font-bold text-blue-600">${sponsor.amount}</span>
                                </div>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {sponsor.benefits.map((benefit, benefitIndex) => (
                                    <li key={benefitIndex} className="flex items-center">
                                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                      {benefit}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Call to Action */}
                  <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
                    <h4 className="text-xl font-bold mb-2">Support This Event</h4>
                    <p className="mb-4 text-blue-100">
                      Your contribution helps us create meaningful impact in our community.
                    </p>
                    <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                      <Link 
                        href={`/events/${event.id}/fundraiser`}
                        className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Donate to This Event
                      </Link>
                      <Link 
                        href="/contact" 
                        className="inline-flex items-center px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Become a Sponsor
                      </Link>
                    </div>
                  </div>
                </div>
              )}

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
                  </div>                <EventRegistration
                  eventTitle={event.title}
                  currentAttendees={event.attendees}
                  maxAttendees={event.maxAttendees}
                />
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

          {/* Event Reviews & Feedback Section */}
          <div className="mt-16">
            <EventComments />
          </div>

          {/* Related Events Section */}
          {relatedEvents.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Events</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedEvents.map((relatedEvent) => (
                  <Link key={relatedEvent.id} href={`/events/${relatedEvent.id}`} className="group">
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <Image 
                        src={relatedEvent.image} 
                        alt={relatedEvent.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
                          {relatedEvent.category}
                        </span>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {relatedEvent.title}
                        </h4>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {relatedEvent.date}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {relatedEvent.location}
                        </div>
                        {relatedEvent.fundraisingGoal && relatedEvent.currentFunding !== undefined && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Funding Progress</span>
                              <span className="font-medium text-green-600">
                                {Math.round((relatedEvent.currentFunding / relatedEvent.fundraisingGoal) * 100)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${Math.min((relatedEvent.currentFunding / relatedEvent.fundraisingGoal) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Event Statistics */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Impact</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{event.attendees}</div>
                <div className="text-sm text-gray-600">Current Attendees</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((event.attendees / event.maxAttendees) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Registration Rate</div>
              </div>
              
              {event.currentFunding && (
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-600 rounded-lg mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">
                    ${event.currentFunding.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Funds Raised</div>
                </div>
              )}
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-600">4.8/5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
