'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, Clock, ChevronLeft, ChevronRight, X, Check 
} from 'lucide-react';

interface DateTimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onDateTimeSelect: (startDate: string, endDate: string, startTime: string, endTime: string) => void;
  initialStartDate?: string;
  initialEndDate?: string;
  initialStartTime?: string;
  initialEndTime?: string;
  title?: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isPast: boolean;
  isStartDate?: boolean;
  isEndDate?: boolean;
  isInRange?: boolean;
}

export default function DateTimePicker({
  isOpen,
  onClose,
  onDateTimeSelect,
  initialStartDate = '',
  initialEndDate = '',
  initialStartTime = '09:00',
  initialEndTime = '17:00',
  title = 'Select Event Dates & Times'
}: DateTimePickerProps) {
  const [currentStep, setCurrentStep] = useState<'start-date' | 'end-date' | 'times'>('start-date');
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(
    initialStartDate ? new Date(initialStartDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialEndDate ? new Date(initialEndDate) : null
  );
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [timeError, setTimeError] = useState('');
  const [dateError, setDateError] = useState('');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate time options (every 15 minutes)
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        options.push({ value: timeString, label: displayTime });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  // Validate time and date selection
  useEffect(() => {
    // Reset errors
    setTimeError('');
    setDateError('');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison
    
    // Validate dates
    if (startDate) {
      const startDateOnly = new Date(startDate);
      startDateOnly.setHours(0, 0, 0, 0);
      
      // Start date must be today or in the future
      if (startDateOnly < today) {
        setDateError('Event start date must be today or in the future');
        return;
      }
    }
    
    if (startDate && endDate) {
      const startDateOnly = new Date(startDate);
      const endDateOnly = new Date(endDate);
      startDateOnly.setHours(0, 0, 0, 0);
      endDateOnly.setHours(0, 0, 0, 0);
      
      // End date must be after or equal to start date
      if (endDateOnly < startDateOnly) {
        setDateError('End date must be after or equal to start date');
        return;
      }
      
      // For same day events, validate times
      if (startDateOnly.getTime() === endDateOnly.getTime()) {
        if (startTime && endTime && startTime >= endTime) {
          setTimeError('End time must be after start time for same-day events');
          return;
        }
      }
    }
  }, [startTime, endTime, startDate, endDate]);

  // Generate calendar days
  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const today = new Date();
    
    const days: CalendarDay[] = [];
    
    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      const dayDate = new Date(year, month - 1, day);
      days.push({
        date: dayDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isPast: dayDate < today
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const isToday = dayDate.toDateString() === today.toDateString();
      
      // Check if this date is selected (either start or end date)
      const isStartDate = startDate && dayDate.toDateString() === startDate.toDateString();
      const isEndDate = endDate && dayDate.toDateString() === endDate.toDateString();
      const isSelected = isStartDate || isEndDate;
      
      // Check if this date is in between start and end dates
      const isInRange = startDate && endDate && dayDate > startDate && dayDate < endDate;
      
      // Check if this date is in the past (but allow today)
      const isPast = dayDate < today && !isToday;
      
      days.push({
        date: dayDate,
        isCurrentMonth: true,
        isToday,
        isSelected: !!isSelected,
        isPast,
        isStartDate: !!isStartDate,
        isEndDate: !!isEndDate,
        isInRange: !!isInRange
      });
    }
    
    // Next month days
    const remainingSlots = 42 - days.length;
    for (let day = 1; day <= remainingSlots; day++) {
      const dayDate = new Date(year, month + 1, day);
      days.push({
        date: dayDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isPast: false
      });
    }
    
    return days;
  };

  const navigateCalendar = (direction: 'prev' | 'next') => {
    setCurrentCalendarDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const selectDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateOnly = new Date(date);
    selectedDateOnly.setHours(0, 0, 0, 0);
    
    // Don't allow past dates (except today)
    if (selectedDateOnly < today) {
      return;
    }

    if (currentStep === 'start-date') {
      setStartDate(date);
      // Reset end date if it's before the new start date
      if (endDate && date > endDate) {
        setEndDate(null);
      }
      setCurrentStep('end-date');
    } else if (currentStep === 'end-date') {
      if (startDate && date < startDate) {
        setDateError('End date cannot be before start date');
        return;
      }
      setEndDate(date);
      setDateError('');
      setCurrentStep('times');
    }
  };

  const handleConfirm = () => {
    if (startDate && endDate && startTime && endTime && !timeError && !dateError) {
      const startDateString = startDate.toISOString().split('T')[0];
      const endDateString = endDate.toISOString().split('T')[0];
      onDateTimeSelect(startDateString, endDateString, startTime, endTime);
      onClose();
    }
  };

  const handleClose = () => {
    setCurrentStep('start-date');
    setDateError('');
    setTimeError('');
    onClose();
  };

  const goBackToStartDate = () => {
    setCurrentStep('start-date');
    setDateError('');
  };

  const goBackToEndDate = () => {
    setCurrentStep('end-date');
    setTimeError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Step indicator */}
          <div className="flex items-center mt-3 space-x-2">
            {/* Start Date */}
            <div className={`flex items-center ${currentStep === 'start-date' ? 'text-white' : 'text-blue-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                currentStep === 'start-date' ? 'bg-white text-blue-600' : 
                startDate ? 'bg-green-400 text-white' : 'bg-blue-400 text-white'
              }`}>
                <Calendar className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Start</span>
            </div>
            
            <div className={`w-6 h-px ${startDate ? 'bg-white' : 'bg-blue-400'}`}></div>
            
            {/* End Date */}
            <div className={`flex items-center ${currentStep === 'end-date' ? 'text-white' : 'text-blue-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                currentStep === 'end-date' ? 'bg-white text-blue-600' : 
                endDate ? 'bg-green-400 text-white' : 'bg-blue-400 text-white'
              }`}>
                <Calendar className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">End</span>
            </div>
            
            <div className={`w-6 h-px ${endDate ? 'bg-white' : 'bg-blue-400'}`}></div>
            
            {/* Times */}
            <div className={`flex items-center ${currentStep === 'times' ? 'text-white' : 'text-blue-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                currentStep === 'times' ? 'bg-white text-blue-600' : 
                startTime && endTime ? 'bg-green-400 text-white' : 'bg-blue-400 text-white'
              }`}>
                <Clock className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Times</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {(currentStep === 'start-date' || currentStep === 'end-date') && (
            <div className="space-y-4">
              {/* Current step title */}
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900">
                  {currentStep === 'start-date' ? 'Select Start Date' : 'Select End Date'}
                </h4>
                {currentStep === 'end-date' && startDate && (
                  <p className="text-sm text-gray-600 mt-1">
                    Start: {startDate.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>

              {/* Calendar navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigateCalendar('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h4 className="text-lg font-semibold text-gray-900">
                  {monthNames[currentCalendarDate.getMonth()]} {currentCalendarDate.getFullYear()}
                </h4>
                <button
                  onClick={() => navigateCalendar('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-xs font-medium text-gray-500 uppercase">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentCalendarDate).map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day.isCurrentMonth && !day.isPast && selectDate(day.date)}
                    disabled={!day.isCurrentMonth || day.isPast}
                    className={`
                      relative p-3 text-sm rounded-lg transition-all duration-200 min-h-[3rem] flex items-center justify-center
                      ${day.isStartDate
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : day.isEndDate
                        ? 'bg-purple-500 text-white shadow-lg transform scale-105'
                        : day.isInRange
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : day.isToday
                        ? 'bg-blue-50 text-blue-600 border-2 border-blue-200 font-semibold'
                        : day.isCurrentMonth && !day.isPast
                        ? 'hover:bg-gray-100 text-gray-900 hover:scale-105'
                        : 'text-gray-400 cursor-not-allowed'
                      }
                      ${day.isCurrentMonth && !day.isPast && !day.isSelected ? 'hover:shadow-md' : ''}
                    `}
                  >
                    <span>{day.date.getDate()}</span>
                    {day.isToday && (
                      <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                        day.isSelected ? 'bg-white' : 'bg-blue-500'
                      }`}></div>
                    )}
                    {day.isStartDate && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white text-xs flex items-center justify-center">
                        <span className="text-white text-xs">S</span>
                      </div>
                    )}
                    {day.isEndDate && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white text-xs flex items-center justify-center">
                        <span className="text-white text-xs">E</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Date error */}
              {dateError && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-800">{dateError}</p>
                </div>
              )}

              {/* Selected dates display */}
              <div className="space-y-2">
                {startDate && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Start Date:</strong> {startDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
                {endDate && (
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-800">
                      <strong>End Date:</strong> {endDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 'times' && (
            <div className="space-y-6">
              {/* Selected dates display */}
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <Calendar className="h-5 w-5 text-gray-500 mr-2 inline" />
                      <span className="text-sm font-medium text-gray-900">
                        {startDate && endDate && startDate.toDateString() === endDate.toDateString() 
                          ? `${startDate.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })} (Single Day Event)`
                          : `${startDate?.toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })} - ${endDate?.toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}`
                        }
                      </span>
                    </div>
                    <button
                      onClick={goBackToStartDate}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Change Dates
                    </button>
                  </div>
                </div>

                {/* Multi-day event notice */}
                {startDate && endDate && startDate.toDateString() !== endDate.toDateString() && (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>Multi-day Event:</strong> The start time applies to the first day, and the end time applies to the last day. 
                      All days in between will be considered full event days.
                    </p>
                  </div>
                )}
              </div>

              {/* Time selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {startDate && endDate && startDate.toDateString() === endDate.toDateString() 
                      ? 'Start Time' 
                      : 'Start Time (First Day)'
                    }
                  </label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {startDate && endDate && startDate.toDateString() === endDate.toDateString() 
                      ? 'End Time' 
                      : 'End Time (Last Day)'
                    }
                  </label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                      timeError ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {timeError && (
                    <p className="mt-1 text-sm text-red-600">{timeError}</p>
                  )}
                </div>

                {/* Duration display */}
                {startTime && endTime && !timeError && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      {startDate && endDate && startDate.toDateString() === endDate.toDateString() ? (
                        <>
                          <strong>Duration:</strong> {(() => {
                            const start = new Date(`2000-01-01T${startTime}`);
                            const end = new Date(`2000-01-01T${endTime}`);
                            const diff = end.getTime() - start.getTime();
                            const hours = Math.floor(diff / (1000 * 60 * 60));
                            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                            return `${hours}h ${minutes}m`;
                          })()}
                        </>
                      ) : (
                        <>
                          <strong>Event Schedule:</strong> Starts at {new Date(`2000-01-01T${startTime}`).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })} on {startDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, 
                          ends at {new Date(`2000-01-01T${endTime}`).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })} on {endDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            
            <div className="flex space-x-3">
              {/* Back button */}
              {currentStep === 'end-date' && (
                <button
                  onClick={goBackToStartDate}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Back
                </button>
              )}
              {currentStep === 'times' && (
                <button
                  onClick={goBackToEndDate}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Back
                </button>
              )}
              
              {/* Next/Confirm button */}
              <button
                onClick={
                  currentStep === 'start-date' ? (startDate ? () => setCurrentStep('end-date') : undefined) :
                  currentStep === 'end-date' ? (endDate ? () => setCurrentStep('times') : undefined) :
                  handleConfirm
                }
                disabled={
                  (currentStep === 'start-date' && !startDate) ||
                  (currentStep === 'end-date' && !endDate) ||
                  (currentStep === 'times' && (!startTime || !endTime || !!timeError || !!dateError))
                }
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  ((currentStep === 'start-date' && startDate) || 
                   (currentStep === 'end-date' && endDate) || 
                   (currentStep === 'times' && startTime && endTime && !timeError && !dateError))
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === 'start-date' ? 'Next: End Date' :
                 currentStep === 'end-date' ? 'Next: Set Times' : (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Confirm Event
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
