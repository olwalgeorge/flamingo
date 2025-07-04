'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, FileText, TrendingUp, Settings, Plus, Edit, Eye, BarChart3, MessageCircle, DollarSign, LogOut, User } from 'lucide-react';
import Link from 'next/link';

interface AdminData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  department: string;
  title?: string;
}

export default function ManagementDashboard() {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get admin data from localStorage
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      try {
        setAdmin(JSON.parse(adminData));
      } catch (error) {
        console.error('Error parsing admin data:', error);
        router.push('/admin-panel-fcc-2025/login');
      }
    } else {
      router.push('/admin-panel-fcc-2025/login');
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      localStorage.removeItem('admin');
      router.push('/admin-panel-fcc-2025/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      localStorage.removeItem('admin');
      router.push('/admin-panel-fcc-2025/login');
    }
  };

  // Mock data - in a real app, this would come from a database
  const stats = {
    totalEvents: 6,
    totalMembers: 87,
    activeProjects: 4,
    monthlyGrowth: 12.5,
    activeChatSessions: 3,
    totalChatMessages: 127
  };

  const recentEvents = [
    { id: 1, name: "River Kibos Clean-up", date: "2025-07-15", attendees: 45, status: "active" },
    { id: 2, name: "General Meeting Q3", date: "2025-07-20", attendees: 15, status: "active" },
    { id: 3, name: "Tree Planting Workshop", date: "2025-07-28", attendees: 30, status: "active" }
  ];

  const recentMembers = [
    { id: 1, name: "Alice Wanjiku", email: "alice@example.com", joined: "2025-06-28", status: "active" },
    { id: 2, name: "John Ochieng", email: "john@example.com", joined: "2025-06-25", status: "active" },
    { id: 3, name: "Mary Akinyi", email: "mary@example.com", joined: "2025-06-22", status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FCC CBO Management</h1>
              <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Admin Only</span>
            </div>
            <div className="flex items-center space-x-4">
              {admin && (
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/admin-panel-fcc-2025/profile"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    title="View Profile"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm">
                      {admin.firstName} {admin.lastName}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      {admin.role}
                    </span>
                  </Link>
                  <div className="h-4 border-l border-gray-300"></div>
                </div>
              )}
              <Link href="/" className="text-gray-600 hover:text-gray-900" title="View Site">
                <Eye className="h-5 w-5" />
              </Link>
              <button className="text-gray-600 hover:text-gray-900" title="Settings">
                <Settings className="h-5 w-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalMembers}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeProjects}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                <p className="text-3xl font-bold text-gray-900">{stats.monthlyGrowth}%</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Support Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Customer Support</h3>
              <Link 
                href="/admin-panel-fcc-2025/chat-sessions"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.activeChatSessions}</p>
                <p className="text-sm text-gray-600">Active Chats</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalChatMessages}</p>
                <p className="text-sm text-gray-600">Total Messages</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Support Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">New chat started</span>
                <span className="text-gray-500">2 min ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Member inquiry resolved</span>
                <span className="text-gray-500">15 min ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Event question answered</span>
                <span className="text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Events Management */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Events</h2>
                <Link 
                  href="/admin-panel-fcc-2025/events"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{event.name}</h3>
                      <p className="text-sm text-gray-600">{event.date} • {event.attendees} attendees</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        event.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link 
                  href="/admin-panel-fcc-2025/events"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all events →
                </Link>
              </div>
            </div>
          </div>

          {/* Members Management */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Members</h2>
                <Link 
                  href="/admin-panel-fcc-2025/members"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.email} • Joined {member.joined}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {member.status}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link 
                  href="/admin-panel-fcc-2025/members"
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  View all members →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link 
              href="/admin-panel-fcc-2025/events/new"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Create New Event</p>
            </Link>

            <Link 
              href="/admin-panel-fcc-2025/members/new"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
            >
              <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Add New Member</p>
            </Link>

            <Link 
              href="/admin-panel-fcc-2025/financial"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors text-center"
            >
              <DollarSign className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Financial Management</p>
            </Link>

            <Link 
              href="/admin-panel-fcc-2025/reports"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
            >
              <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Generate Reports</p>
            </Link>

            <Link 
              href="/admin-panel-fcc-2025/settings"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors text-center"
            >
              <Settings className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">System Settings</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
