'use client';

import { useState, useMemo } from 'react';
import { Calendar, MapPin, Clock, Users, Search, Filter, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getAllEvents } from '../../../data/events';

type EventCategory = 'all' | 'environmental' | 'meeting' | 'educational' | 'training' | 'skills';
type SortOption = 'date' | 'funding' | 'attendees' | 'alphabetical';

export default function EventsOverview() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [showFundedOnly, setShowFundedOnly] = useState(false);

  const allEvents = getAllEvents();

  const filteredAndSortedEvents = useMemo(() => {
    const filtered = allEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      
      const matchesFunding = !showFundedOnly || (event.fundraisingGoal && event.currentFunding !== undefined);
      
      return matchesSearch && matchesCategory && matchesFunding;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'funding':
          const aProgress = a.fundraisingGoal && a.currentFunding !== undefined 
            ? (a.currentFunding / a.fundraisingGoal) * 100 : 0;
          const bProgress = b.fundraisingGoal && b.currentFunding !== undefined 
            ? (b.currentFunding / b.fundraisingGoal) * 100 : 0;
          return bProgress - aProgress;
        case 'attendees':
          return b.attendees - a.attendees;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allEvents, searchTerm, selectedCategory, sortBy, showFundedOnly]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environmental': return 'bg-green-100 text-green-800 border-green-200';
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'educational': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'training': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'skills': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const fundedEventsCount = allEvents.filter(event => 
    event.fundraisingGoal && event.currentFunding !== undefined
  ).length;

  const totalFundsRaised = allEvents.reduce((total, event) => 
    total + (event.currentFunding || 0), 0
  );

  const totalFundingGoals = allEvents.reduce((total, event) => 
    total + (event.fundraisingGoal || 0), 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Events</h1>
              <p className="text-gray-600 mt-1">
                Discover and support community events across Kisumu County
              </p>
            </div>
            
            {/* Summary Stats */}
            <div className="mt-6 lg:mt-0 flex space-x-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{allEvents.length}</div>
                <div className="text-gray-600">Total Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{fundedEventsCount}</div>
                <div className="text-gray-600">Funded Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ${totalFundsRaised.toLocaleString()}
                </div>
                <div className="text-gray-600">Funds Raised</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as EventCategory)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Categories</option>
                <option value="environmental">Environmental</option>
                <option value="educational">Educational</option>
                <option value="training">Training</option>
                <option value="meeting">Meetings</option>
                <option value="skills">Skills</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="funding">Sort by Funding</option>
                <option value="attendees">Sort by Popularity</option>
                <option value="alphabetical">Sort A-Z</option>
              </select>
            </div>

            {/* Funding Filter */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fundedOnly"
                checked={showFundedOnly}
                onChange={(e) => setShowFundedOnly(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="fundedOnly" className="ml-2 text-sm text-gray-700">
                Show funded events only
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredAndSortedEvents.length === 0 ? (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  {/* Category Badge and Funding Status */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    {event.fundraisingGoal && event.currentFunding !== undefined && (
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-xs font-medium">
                          {Math.round((event.currentFunding / event.fundraisingGoal) * 100)}% funded
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  
                  {/* Funding Progress */}
                  {event.fundraisingGoal && event.currentFunding !== undefined && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-gray-700">Funding Progress</span>
                        <span className="text-xs text-green-600 font-semibold">
                          ${event.currentFunding.toLocaleString()} / ${event.fundraisingGoal.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((event.currentFunding / event.fundraisingGoal) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">{event.attendees} attending</span>
                    </div>
                    <div className="space-x-2">
                      {event.fundraisingGoal && (
                        <Link 
                          href={`/events/${event.id}/fundraiser`}
                          className="inline-flex items-center px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                        >
                          Support
                        </Link>
                      )}
                      <Link 
                        href={`/events/${event.id}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Overall Funding Summary */}
      {totalFundingGoals > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Community Funding Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-4xl font-bold">${totalFundsRaised.toLocaleString()}</div>
                  <div className="text-blue-100">Total Raised</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">${totalFundingGoals.toLocaleString()}</div>
                  <div className="text-blue-100">Total Goals</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">
                    {Math.round((totalFundsRaised / totalFundingGoals) * 100)}%
                  </div>
                  <div className="text-blue-100">Overall Progress</div>
                </div>
              </div>
              <div className="w-full bg-blue-800 rounded-full h-4 mb-6 max-w-2xl mx-auto">
                <div 
                  className="bg-white h-4 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((totalFundsRaised / totalFundingGoals) * 100, 100)}%` }}
                ></div>
              </div>
              <Link 
                href="/events"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse All Events
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
