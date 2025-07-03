'use client';

import { useState, useEffect } from 'react';
import { Event, EventFundraising, EventBudget, EventExpenditure, EventFinancialSummary } from '@/types';
import { financialService } from '@/services/financialManagement';

interface EventFinancialData {
  fundraising?: EventFundraising;
  budget?: EventBudget;
  expenditures: EventExpenditure[];
  summary?: EventFinancialSummary;
}

// Mock events data - in real app, this would come from API
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Community Health Fair',
    description: 'Annual health screening and wellness event',
    date: '2025-08-15',
    time: '09:00',
    location: 'Community Center',
    image: '/placeholder-event.svg',
    category: 'community',
    attendees: 150,
    maxAttendees: 200,
    hasFinancialTracking: true,
    estimatedCost: 5000,
    fundraisingGoal: 7000,
    currency: 'USD'
  },
  {
    id: '2',
    title: 'Environmental Cleanup Drive',
    description: 'Beach and park cleanup initiative',
    date: '2025-07-20',
    time: '07:00',
    location: 'Oceanview Beach',
    image: '/placeholder-event.svg',
    category: 'environmental',
    attendees: 75,
    maxAttendees: 100,
    hasFinancialTracking: true,
    estimatedCost: 2000,
    fundraisingGoal: 3000,
    currency: 'USD'
  }
];

export default function EventFinancialPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [financialData, setFinancialData] = useState<EventFinancialData | null>(null);

  useEffect(() => {
    // Initialize financial tracking for mock events
    mockEvents.forEach(event => {
      if (event.hasFinancialTracking) {
        financialService.initializeEventFinances(event);
        
        // Add some mock donations
        financialService.addDonation(event.id, {
          donorName: 'John Smith',
          amount: 500,
          method: 'online',
          isAnonymous: false,
          message: 'Great cause!'
        });
        
        financialService.addDonation(event.id, {
          donorName: 'Anonymous',
          amount: 200,
          method: 'cash',
          isAnonymous: true
        });

        // Add some mock expenditures
        financialService.addExpenditure({
          eventId: event.id,
          budgetCategoryId: 'venue-equipment',
          amount: 800,
          currency: 'USD',
          description: 'Venue rental',
          date: new Date(),
          paymentMethod: 'bank_transfer',
          vendor: 'Community Center',
          receiptNumber: 'RC001',
          approvedBy: 'admin',
          status: 'paid',
          tags: ['venue', 'rental']
        });
      }
    });
    
    setEvents(mockEvents);
  }, []);

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    const data = financialService.getEventFinancialData(event.id);
    setFinancialData({
      ...data,
      summary: data.summary || undefined
    });
  };

  const initializeFinancialTracking = (event: Event) => {
    financialService.initializeEventFinances(event);
    const updatedEvents = events.map(e => 
      e.id === event.id ? { ...e, hasFinancialTracking: true } : e
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Event Financial Management</h1>
          <p className="text-gray-600 mt-2">
            Manage finances for individual events
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Events List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Events</h2>
              <div className="space-y-3">
                {events.map(event => (
                  <div 
                    key={event.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedEvent?.id === event.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleEventSelect(event)}
                  >
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.date}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        event.hasFinancialTracking 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.hasFinancialTracking ? 'Tracked' : 'Not Tracked'}
                      </span>
                      {!event.hasFinancialTracking && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            initializeFinancialTracking(event);
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Enable Tracking
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="lg:col-span-2">
            {selectedEvent && financialData ? (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Funds Raised</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${financialData.fundraising?.currentAmount || 0}
                        </p>
                        <p className="text-xs text-gray-500">
                          of ${financialData.fundraising?.targetAmount || 0} target
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Budget</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${financialData.budget?.totalBudget || 0}
                        </p>
                        <p className="text-xs text-gray-500">
                          Allocated: ${financialData.budget?.categories.reduce((sum: number, cat) => sum + cat.allocatedAmount, 0) || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Spent</p>
                        <p className="text-2xl font-bold text-gray-900">                          ${financialData.expenditures.reduce((sum: number, exp) =>
                            exp.status === 'paid' ? sum + exp.amount : sum, 0
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          {financialData.expenditures.length} transactions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fundraising Progress */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Fundraising Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Progress</span>
                        <span className="text-sm text-gray-600">
                          {financialData.fundraising 
                            ? ((financialData.fundraising.currentAmount / financialData.fundraising.targetAmount) * 100).toFixed(1)
                            : 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-600 h-3 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${financialData.fundraising 
                              ? Math.min((financialData.fundraising.currentAmount / financialData.fundraising.targetAmount) * 100, 100)
                              : 0}%` 
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                      {financialData.fundraising?.fundraisingMethods.map((method) => (
                        <div key={method.method} className="text-center">
                          <p className="text-sm font-medium text-gray-600 capitalize">
                            {method.method.replace('_', ' ')}
                          </p>
                          <p className="text-lg font-bold text-gray-900">${method.amount}</p>
                          <p className="text-xs text-gray-500">{method.percentage.toFixed(1)}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Budget Categories */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Categories</h3>
                  <div className="space-y-3">
                    {financialData.budget?.categories.map((category) => {
                      const spent = financialData.expenditures
                        .filter((exp) => exp.budgetCategoryId === category.id && exp.status === 'paid')
                        .reduce((sum: number, exp) => sum + exp.amount, 0);
                      const utilization = category.allocatedAmount > 0 ? (spent / category.allocatedAmount) * 100 : 0;
                      
                      return (
                        <div key={category.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-900">{category.name}</h4>
                            <span className={`px-2 py-1 text-xs rounded ${
                              category.priority === 'high' ? 'bg-red-100 text-red-800' :
                              category.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {category.priority}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Allocated: ${category.allocatedAmount}</span>
                            <span>Spent: ${spent}</span>
                            <span>Remaining: ${category.allocatedAmount - spent}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                utilization > 100 ? 'bg-red-600' : 
                                utilization > 80 ? 'bg-yellow-600' : 'bg-green-600'
                              }`}
                              style={{ width: `${Math.min(utilization, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{utilization.toFixed(1)}% utilized</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Expenditures */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenditures</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Vendor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {financialData.expenditures.slice(0, 5).map((exp) => (
                          <tr key={exp.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {exp.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${exp.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {exp.vendor || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded ${
                                exp.status === 'paid' ? 'bg-green-100 text-green-800' :
                                exp.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                                exp.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {exp.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 00-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Event</h3>
                <p className="text-gray-600">
                  Choose an event from the list to view its financial details and management options.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
