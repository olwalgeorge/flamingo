'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ArrowLeft, Save, X, ChevronLeft, ChevronRight, MoreVertical, Copy, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { getAllEvents, Event } from '../../../data/events';

interface CalendarEvent extends Event {
  startTime: string;
  endTime: string;
  color: string;
}

export default function CalendarManagement() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dragOverDate, setDragOverDate] = useState<Date | null>(null);
  const [showQuickActions, setShowQuickActions] = useState<string | null>(null);
  const [conflicts, setConflicts] = useState<string[]>([]);
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);

  // Initialize events from data
  useEffect(() => {
    const originalEvents = getAllEvents();
    const calendarEvents: CalendarEvent[] = originalEvents.map(event => ({
      ...event,
      startTime: event.time.split(' - ')[0] || event.time,
      endTime: event.time.split(' - ')[1] || '18:00',
      color: getEventColor(event.category)
    }));
    setEvents(calendarEvents);
  }, []);

  // Check for event conflicts
  useEffect(() => {
    const checkConflicts = () => {
      const conflictingEvents: string[] = [];
      events.forEach(event => {
        const sameTimeEvents = events.filter(e => 
          e.id !== event.id && 
          e.date === event.date && 
          e.location === event.location &&
          ((e.startTime >= event.startTime && e.startTime < event.endTime) ||
           (e.endTime > event.startTime && e.endTime <= event.endTime) ||
           (e.startTime <= event.startTime && e.endTime >= event.endTime))
        );
        if (sameTimeEvents.length > 0) {
          conflictingEvents.push(event.id);
        }
      });
      setConflicts(conflictingEvents);
    };
    checkConflicts();
  }, [events]);

  // Keyboard shortcuts and click outside handlers
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowEventModal(false);
        setShowQuickActions(null);
      }
      if (e.key === 'n' && e.ctrlKey) {
        e.preventDefault();
        openEventModal();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (showQuickActions && !(e.target as Element).closest('.quick-actions-menu')) {
        setShowQuickActions(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showQuickActions]);

  const getEventColor = (category: string) => {
    switch (category) {
      case 'environmental': return '#10b981'; // green
      case 'meeting': return '#3b82f6'; // blue
      case 'educational': return '#8b5cf6'; // purple
      case 'training': return '#f59e0b'; // yellow
      case 'skills': return '#ec4899'; // pink
      case 'conference': return '#6366f1'; // indigo
      default: return '#6b7280'; // gray
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  };

  const handleDragStart = (e: React.DragEvent, event: CalendarEvent) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', event.id);
    // Add visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // Reset visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    setDraggedEvent(null);
    setDragOverDate(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, date: Date | null) => {
    e.preventDefault();
    setDragOverDate(date);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if leaving the entire day cell
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverDate(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetDate: Date | null) => {
    e.preventDefault();
    if (!draggedEvent || !targetDate) return;

    const updatedEvents = events.map(event => {
      if (event.id === draggedEvent.id) {
        return {
          ...event,
          date: targetDate.toISOString().split('T')[0]
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    setDraggedEvent(null);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const openEventModal = (event: CalendarEvent | null = null, selectedDate: Date | null = null) => {
    setSelectedEvent(event);
    setIsEditing(!!event);
    setNewEventDate(selectedDate);
    setShowEventModal(true);
    setShowQuickActions(null);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
    setIsEditing(false);
    setNewEventDate(null);
  };

  const duplicateEvent = (event: CalendarEvent) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: (Math.max(...events.map(e => parseInt(e.id))) + 1).toString(),
      title: `${event.title} (Copy)`,
      date: new Date().toISOString().split('T')[0]
    };
    setEvents([...events, newEvent]);
    setShowQuickActions(null);
  };

  const handleDoubleClick = (date: Date) => {
    openEventModal(null, date);
  };

  const saveEvent = (eventData: Partial<CalendarEvent>) => {
    if (isEditing && selectedEvent) {
      // Update existing event
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id
          ? { ...event, ...eventData }
          : event
      );
      setEvents(updatedEvents);
    } else {
      // Create new event
      const newEvent: CalendarEvent = {
        id: (Math.max(...events.map(e => parseInt(e.id))) + 1).toString(),
        title: eventData.title || '',
        description: eventData.description || '',
        date: eventData.date || new Date().toISOString().split('T')[0],
        time: `${eventData.startTime} - ${eventData.endTime}`,
        location: eventData.location || '',
        category: eventData.category || 'meeting',
        attendees: eventData.attendees || 0,
        maxAttendees: eventData.maxAttendees || 50,
        organizer: eventData.organizer || 'FCC CBO',
        contact: eventData.contact || 'info@fcc-cbo.org',
        requirements: eventData.requirements || [],
        startTime: eventData.startTime || '09:00',
        endTime: eventData.endTime || '17:00',
        color: getEventColor(eventData.category || 'meeting'),
        fullDescription: eventData.fullDescription || '',
        image: '/placeholder-event.svg' // Add default image
      };
      setEvents([...events, newEvent]);
    }
    closeEventModal();
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    closeEventModal();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
              <h1 className="text-2xl font-bold text-gray-900">Calendar Management</h1>
            </div>
            <button 
              onClick={() => openEventModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Calendar Header */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Drag events to reschedule • Double-click empty dates to add • Ctrl+N for new event
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b bg-gray-50">
            {dayNames.map(day => (
              <div key={day} className="p-4 text-center font-semibold text-gray-700 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {getDaysInMonth(currentDate).map((date, index) => (
              <div
                key={index}
                className={`min-h-32 border-r border-b last:border-r-0 relative ${
                  date ? 
                    dragOverDate && date.getTime() === dragOverDate.getTime() 
                      ? 'bg-blue-50 border-blue-300' 
                      : 'bg-white hover:bg-gray-50' 
                    : 'bg-gray-50'
                } transition-colors duration-150`}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, date)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, date)}
                onDoubleClick={() => date && handleDoubleClick(date)}
              >
                {date && (
                  <>
                    <div className="p-2 text-sm font-medium text-gray-900 flex justify-between items-center">
                      <span>{date.getDate()}</span>
                      {getEventsForDate(date).length > 3 && (
                        <span className="text-xs text-gray-500 bg-gray-200 px-1 rounded">
                          +{getEventsForDate(date).length - 3}
                        </span>
                      )}
                    </div>
                    <div className="px-2 pb-2 space-y-1">
                      {getEventsForDate(date).slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, event)}
                          onDragEnd={handleDragEnd}
                          className={`text-xs p-1 rounded cursor-move hover:opacity-80 text-white relative group ${
                            conflicts.includes(event.id) ? 'ring-2 ring-red-400' : ''
                          }`}
                          style={{ backgroundColor: event.color }}
                        >
                          <div className="font-medium truncate pr-6">{event.title}</div>
                          <div className="opacity-90">{event.startTime}</div>
                          {conflicts.includes(event.id) && (
                            <AlertTriangle className="h-3 w-3 text-red-300 absolute top-1 right-1" />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowQuickActions(showQuickActions === event.id ? null : event.id);
                            }}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-3 w-3 text-white hover:text-gray-200" />
                          </button>
                          
                          {/* Quick Actions Menu */}
                          {showQuickActions === event.id && (
                            <div className="quick-actions-menu absolute top-6 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 text-gray-700 min-w-24">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEventModal(event);
                                }}
                                className="w-full px-3 py-1 text-left hover:bg-gray-100 flex items-center"
                              >
                                <Edit className="h-3 w-3 mr-2" />
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicateEvent(event);
                                }}
                                className="w-full px-3 py-1 text-left hover:bg-gray-100 flex items-center"
                              >
                                <Copy className="h-3 w-3 mr-2" />
                                Copy
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteEvent(event.id);
                                }}
                                className="w-full px-3 py-1 text-left hover:bg-gray-100 flex items-center text-red-600"
                              >
                                <Trash2 className="h-3 w-3 mr-2" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      {/* Add event prompt on hover for empty days */}
                      {getEventsForDate(date).length === 0 && (
                        <div className="text-xs text-gray-400 opacity-0 hover:opacity-100 transition-opacity p-2 text-center">
                          Double-click to add event
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Categories</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { category: 'environmental', label: 'Environmental', color: '#10b981' },
                  { category: 'meeting', label: 'Meeting', color: '#3b82f6' },
                  { category: 'educational', label: 'Educational', color: '#8b5cf6' },
                  { category: 'training', label: 'Training', color: '#f59e0b' },
                  { category: 'skills', label: 'Skills', color: '#ec4899' },
                  { category: 'conference', label: 'Conference', color: '#6366f1' }
                ].map(item => (
                  <div key={item.category} className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {conflicts.length > 0 && (
              <div className="mt-4 lg:mt-0">
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {conflicts.length} scheduling conflict{conflicts.length > 1 ? 's' : ''} detected
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          event={selectedEvent}
          isEditing={isEditing}
          onSave={saveEvent}
          onDelete={deleteEvent}
          onClose={closeEventModal}
          defaultDate={newEventDate}
        />
      )}
    </div>
  );
}

// Event Modal Component
function EventModal({ 
  event, 
  isEditing, 
  onSave, 
  onDelete, 
  onClose,
  defaultDate
}: {
  event: CalendarEvent | null;
  isEditing: boolean;
  onSave: (eventData: Partial<CalendarEvent>) => void;
  onDelete: (eventId: string) => void;
  onClose: () => void;
  defaultDate?: Date | null;
}) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || defaultDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
    startTime: event?.startTime || '09:00',
    endTime: event?.endTime || '17:00',
    location: event?.location || '',
    category: event?.category || 'meeting',
    maxAttendees: event?.maxAttendees || 50,
    organizer: event?.organizer || 'FCC CBO',
    contact: event?.contact || 'info@fcc-cbo.org'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="environmental">Environmental</option>
                <option value="meeting">Meeting</option>
                <option value="educational">Educational</option>
                <option value="training">Training</option>
                <option value="skills">Skills</option>
                <option value="conference">Conference</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Attendees
              </label>
              <input
                type="number"
                value={formData.maxAttendees}
                onChange={(e) => setFormData({ ...formData, maxAttendees: parseInt(e.target.value) })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organizer
              </label>
              <input
                type="text"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-between pt-6">
            <div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => event && onDelete(event.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Event
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
