import { Calendar, Users, MapPin, Clock, Plus, Edit, Trash2, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { getAllEvents, Event } from '../../../data/events';

export default function EventsManagement() {
  const events = getAllEvents();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environmental':
        return 'bg-green-100 text-green-800';
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'educational':
        return 'bg-purple-100 text-purple-800';
      case 'training':
        return 'bg-yellow-100 text-yellow-800';
      case 'skills':
        return 'bg-pink-100 text-pink-800';
      case 'conference':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (attendees: number, maxAttendees: number) => {
    const percentage = (attendees / maxAttendees) * 100;
    if (percentage >= 90) return 'bg-red-100 text-red-800';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (attendees: number, maxAttendees: number) => {
    const percentage = (attendees / maxAttendees) * 100;
    if (percentage >= 90) return 'Nearly Full';
    if (percentage >= 70) return 'Filling Up';
    return 'Available';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                href="/admin-panel-fcc-2025"
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
            </div>
            <Link 
              href="/admin-panel-fcc-2025/events/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Categories</option>
                <option value="environmental">Environmental</option>
                <option value="meeting">Meeting</option>
                <option value="educational">Educational</option>
                <option value="training">Training</option>
                <option value="skills">Skills</option>
                <option value="conference">Conference</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="filling">Filling Up</option>
                <option value="full">Nearly Full</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Events ({events.length})</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event: Event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="flex items-center mt-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {event.date}
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {event.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {event.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          {event.attendees}/{event.maxAttendees}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.attendees, event.maxAttendees)}`}>
                        {getStatusText(event.attendees, event.maxAttendees)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link 
                          href={`/events/${event.id}`}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Categories</h3>
            <div className="space-y-2">
              {Object.entries(
                events.reduce((acc: Record<string, number>, event) => {
                  acc[event.category] = (acc[event.category] || 0) + 1;
                  return acc;
                }, {})
              ).map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="capitalize text-gray-600">{category}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Registered</span>
                <span className="font-medium">{events.reduce((sum, event) => sum + event.attendees, 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Capacity</span>
                <span className="font-medium">{events.reduce((sum, event) => sum + event.maxAttendees, 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Fill Rate</span>
                <span className="font-medium">
                  {Math.round(
                    (events.reduce((sum, event) => sum + (event.attendees / event.maxAttendees), 0) / events.length) * 100
                  )}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                href="/admin-panel-fcc-2025/events/new"
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Create New Event
              </Link>
              <button className="block w-full bg-gray-200 text-gray-700 text-center py-2 px-4 rounded hover:bg-gray-300 transition-colors">
                Export Events Data
              </button>
              <button className="block w-full bg-gray-200 text-gray-700 text-center py-2 px-4 rounded hover:bg-gray-300 transition-colors">
                Send Reminders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
