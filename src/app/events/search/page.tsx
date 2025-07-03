'use client';

import { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, Search, Filter, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { eventsData } from '../../../data/events';

export default function EventsSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState('all');
  const [attendanceFilter, setAttendanceFilter] = useState('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(eventsData.map(event => event.category)))];

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    const filtered = eventsData.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      
      const matchesDate = (() => {
        if (dateFilter === 'all') return true;
        const eventDate = new Date(event.date);
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        
        switch (dateFilter) {
          case 'upcoming': return eventDate >= today;
          case 'thisWeek': return eventDate >= today && eventDate <= nextWeek;
          case 'thisMonth': return eventDate >= today && eventDate <= nextMonth;
          default: return true;
        }
      })();
      
      const matchesAttendance = (() => {
        if (attendanceFilter === 'all') return true;
        const attendanceRate = (event.attendees / event.maxAttendees) * 100;
        
        switch (attendanceFilter) {
          case 'available': return attendanceRate < 90;
          case 'almostFull': return attendanceRate >= 70 && attendanceRate < 100;
          case 'waitlist': return attendanceRate >= 100;
          default: return true;
        }
      })();
      
      return matchesSearch && matchesCategory && matchesDate && matchesAttendance;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'attendees':
          return b.attendees - a.attendees;
        case 'funding':
          return (b.currentFunding || 0) - (a.currentFunding || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, dateFilter, attendanceFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">Find Events</h1>
              <p className="text-gray-600 mt-2">
                Search and filter through our community events to find what interests you most.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Filters Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="attendees">Sort by Attendees</option>
              <option value="funding">Sort by Funding</option>
              <option value="title">Sort by Title</option>
            </select>
            
            {/* More Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
            
            {/* Results Count */}
            <div className="ml-auto text-gray-600">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Dates</option>
                  <option value="upcoming">Upcoming Events</option>
                  <option value="thisWeek">This Week</option>
                  <option value="thisMonth">This Month</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  value={attendanceFilter}
                  onChange={(e) => setAttendanceFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Events</option>
                  <option value="available">Spots Available</option>
                  <option value="almostFull">Almost Full</option>
                  <option value="waitlist">Waitlist Only</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all events.</p>
              <Link
                href="/events"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse All Events
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {event.category}
                      </span>
                    </div>
                    {event.fundraisingGoal && event.currentFunding !== undefined && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          {Math.round((event.currentFunding / event.fundraisingGoal) * 100)}% funded
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      <Link href={`/events/${event.id}`}>
                        {event.title}
                      </Link>
                    </h3>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees}/{event.maxAttendees} attendees
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Progress Indicators */}
                    <div className="space-y-3">
                      {/* Attendance Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Registration</span>
                          <span className="font-medium">
                            {Math.round((event.attendees / event.maxAttendees) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${Math.min((event.attendees / event.maxAttendees) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Funding Progress */}
                      {event.fundraisingGoal && event.currentFunding !== undefined && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Funding</span>
                            <span className="font-medium text-green-600">
                              ${event.currentFunding.toLocaleString()} / ${event.fundraisingGoal.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${Math.min((event.currentFunding / event.fundraisingGoal) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {Math.round((event.attendees / event.maxAttendees) * 100)}% full
                        </div>
                        {event.currentFunding && (
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-1" />
                            ${event.currentFunding.toLocaleString()}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        {event.fundraisingGoal && (
                          <Link
                            href={`/events/${event.id}/fundraiser`}
                            className="text-green-600 hover:text-green-700 font-medium text-sm"
                          >
                            Donate →
                          </Link>
                        )}
                        <Link
                          href={`/events/${event.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
