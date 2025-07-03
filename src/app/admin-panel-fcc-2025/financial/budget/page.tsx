'use client';

import { useState, useEffect } from 'react';
import { Event, EventBudget } from '@/types';
import { financialService } from '@/services/financialManagement';

// Mock events data
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
  }
];

export default function BudgetManagementPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [budget, setBudget] = useState<EventBudget | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newBudgetAmount, setNewBudgetAmount] = useState('');

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    const data = financialService.getEventFinancialData(event.id);
    setBudget(data.budget || null);
  };

  const createBudget = () => {
    if (selectedEvent && newBudgetAmount) {
      const amount = parseFloat(newBudgetAmount);
      const newBudget = financialService.createBudget(selectedEvent.id, amount);
      setBudget(newBudget);
      setIsCreating(false);
      setNewBudgetAmount('');
    }
  };

  const approveBudget = () => {
    if (budget) {
      budget.approvalStatus = 'approved';
      budget.approvedBy = 'admin';
      budget.approvedDate = new Date();
      setBudget({ ...budget });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
          <p className="text-gray-600 mt-2">
            Create and manage event budgets, allocate resources, and track spending
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
                    <p className="text-xs text-gray-500 mt-1">
                      Budget: ${event.estimatedCost || 0}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Budget Details */}
          <div className="lg:col-span-3">
            {selectedEvent ? (
              <div className="space-y-6">
                {/* Budget Header */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
                      <p className="text-gray-600">{selectedEvent.description}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Event Date: {selectedEvent.date} at {selectedEvent.time}
                      </p>
                    </div>
                    {!budget && (
                      <button
                        onClick={() => setIsCreating(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Create Budget
                      </button>
                    )}
                  </div>

                  {/* Create Budget Form */}
                  {isCreating && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Budget</h3>
                      <div className="flex gap-4">
                        <input
                          type="number"
                          value={newBudgetAmount}
                          onChange={(e) => setNewBudgetAmount(e.target.value)}
                          placeholder="Enter total budget amount"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={createBudget}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Create
                        </button>
                        <button
                          onClick={() => setIsCreating(false)}
                          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {budget ? (
                  <>
                    {/* Budget Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Budget</p>
                            <p className="text-2xl font-bold text-gray-900">${budget.totalBudget}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Allocated</p>
                            <p className="text-2xl font-bold text-gray-900">
                              ${budget.categories.reduce((sum, cat) => sum + cat.allocatedAmount, 0)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                          <div className="p-2 bg-yellow-100 rounded-lg">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Contingency</p>
                            <p className="text-2xl font-bold text-gray-900">${budget.contingency.amount}</p>
                            <p className="text-xs text-gray-500">{budget.contingency.percentage}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${
                            budget.approvalStatus === 'approved' ? 'bg-green-100' :
                            budget.approvalStatus === 'pending' ? 'bg-yellow-100' :
                            budget.approvalStatus === 'rejected' ? 'bg-red-100' : 'bg-gray-100'
                          }`}>
                            <svg className={`w-6 h-6 ${
                              budget.approvalStatus === 'approved' ? 'text-green-600' :
                              budget.approvalStatus === 'pending' ? 'text-yellow-600' :
                              budget.approvalStatus === 'rejected' ? 'text-red-600' : 'text-gray-600'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Status</p>
                            <p className="text-lg font-bold text-gray-900 capitalize">{budget.approvalStatus}</p>
                            {budget.approvalStatus === 'draft' && (
                              <button
                                onClick={approveBudget}
                                className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Budget Categories */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Budget Categories</h3>
                      <div className="space-y-4">
                        {budget.categories.map((category) => (
                          <div key={category.id} className="border rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-lg font-medium text-gray-900">{category.name}</h4>
                                <p className="text-gray-600">{category.description}</p>
                              </div>
                              <div className="text-right">
                                <span className={`px-3 py-1 text-sm rounded-full ${
                                  category.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  category.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {category.priority} priority
                                </span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600">Allocated Amount</p>
                                <p className="text-xl font-bold text-gray-900">${category.allocatedAmount}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Budget Items</p>
                                <p className="text-xl font-bold text-gray-900">{category.items.length}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Percentage</p>
                                <p className="text-xl font-bold text-gray-900">
                                  {((category.allocatedAmount / budget.totalBudget) * 100).toFixed(1)}%
                                </p>
                              </div>
                            </div>

                            {/* Category Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                              <div 
                                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${Math.min((category.allocatedAmount / budget.totalBudget) * 100, 100)}%` 
                                }}
                              ></div>
                            </div>

                            {/* Budget Items */}
                            {category.items.length > 0 && (
                              <div className="mt-4">
                                <h5 className="font-medium text-gray-900 mb-2">Budget Items</h5>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit Cost</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {category.items.map((item) => (
                                        <tr key={item.id}>
                                          <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                                          <td className="px-4 py-2 text-sm text-gray-900">{item.quantity} {item.unit}</td>
                                          <td className="px-4 py-2 text-sm text-gray-900">${item.estimatedCost}</td>
                                          <td className="px-4 py-2 text-sm font-medium text-gray-900">
                                            ${item.estimatedCost * item.quantity}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Budget Created</h3>
                    <p className="text-gray-600">
                      Create a budget for this event to start tracking expenses and allocating resources.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Event</h3>
                <p className="text-gray-600">
                  Choose an event from the list to view or create its budget.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
