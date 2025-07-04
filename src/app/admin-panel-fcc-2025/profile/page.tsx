'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Building, Calendar, Edit, Save, X, Shield, Lock, Camera, Upload, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface AdminData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  phoneCountryCode: string;
  role: string;
  department: string;
  title?: string;
  bio?: string;
  profileImage?: string;
  address?: {
    street?: string;
    city?: string;
    county?: string;
    country?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
    phoneCountryCode?: string;
  };
  employment?: {
    startDate: string;
    endDate?: string;
    employmentType: string;
    salary?: number;
    currency: string;
  };
  lastLogin?: string;
  preferences?: {
    language: string;
    timezone: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
}

export default function AdminProfile() {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<Partial<AdminData>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get admin data from localStorage
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      try {
        const parsedAdmin = JSON.parse(adminData);
        setAdmin(parsedAdmin);
        setFormData(parsedAdmin);
      } catch (error) {
        console.error('Error parsing admin data:', error);
        router.push('/admin-panel-fcc-2025/login');
      }
    } else {
      router.push('/admin-panel-fcc-2025/login');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...((prev as Record<string, unknown>)[parent] as Record<string, unknown> || {}),
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    
    setUploadingImage(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSuccess('Profile image updated successfully!');
        setAdmin(prev => prev ? { ...prev, profileImage: result.imageUrl } : null);
        setFormData(prev => ({ ...prev, profileImage: result.imageUrl }));
        setImageFile(null);
        setImagePreview(null);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('admin-token');
      
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Profile updated successfully!');
        setAdmin(result.data);
        localStorage.setItem('admin', JSON.stringify(result.data));
        setEditing(false);
        
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super-admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'moderator': return 'bg-green-100 text-green-800';
      case 'editor': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300 opacity-30"></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-pink-400 rounded-full animate-bounce delay-700 opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-1000 opacity-30"></div>
      </div>

      <div className="relative z-10 min-h-screen py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section with Profile Image */}
          <div className="relative mb-8">
            {/* Cover Photo Area */}
            <div className="h-56 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-t-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              {/* Sparkle Effects */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-12 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-8 right-24 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-700"></div>
              
              {/* Profile Image Container */}
              <div className="absolute -bottom-20 left-8 z-20">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl bg-white overflow-hidden transform transition-all duration-300 hover:scale-105">
                    {imagePreview || admin.profileImage ? (
                      <Image
                        src={imagePreview || admin.profileImage || ''}
                        alt={`${admin.firstName} ${admin.lastName}`}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <User className="w-20 h-20 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Image Upload Overlay */}
                  {editing && (
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                      <label htmlFor="profile-image" className="cursor-pointer">
                        <div className="bg-white rounded-full p-3 shadow-lg">
                          <Camera className="w-6 h-6 text-blue-600" />
                        </div>
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
                
                {/* Image Upload Button */}
                {editing && imageFile && (
                  <div className="mt-4 flex items-center space-x-2">
                    <button
                      onClick={handleImageUpload}
                      disabled={uploadingImage}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    </button>
                    <button
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* White Card Container */}
            <div className="bg-white rounded-b-3xl shadow-2xl border border-gray-100 pt-24 pb-8">
              <div className="px-8">
                {/* Name and Role Section */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h1 className="text-4xl font-bold text-gray-900 flex items-center">
                          {admin.firstName} {admin.lastName}
                          {admin.role === 'super-admin' && (
                            <div className="ml-3 relative">
                              <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
                              <div className="absolute inset-0 w-8 h-8 rounded-full bg-yellow-400 animate-ping opacity-20"></div>
                            </div>
                          )}
                        </h1>
                        <p className="text-2xl text-gray-600 mt-2">{admin.title || admin.role}</p>
                        <div className="flex items-center space-x-4 mt-4">
                          <span className={`px-6 py-3 text-sm font-bold rounded-full ${getRoleColor(admin.role)} shadow-lg`}>
                            {admin.role}
                          </span>
                          <span className="flex items-center text-base text-gray-600">
                            <Building className="w-5 h-5 mr-2" />
                            {admin.department}
                          </span>
                          {admin.lastLogin && (
                            <span className="flex items-center text-base text-gray-600">
                              <Calendar className="w-5 h-5 mr-2" />
                              Last login: {formatDate(admin.lastLogin)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link 
                      href="/admin-panel-fcc-2025/change-password"
                      className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <Lock className="w-5 h-5 mr-2" />
                      Change Password
                    </Link>
                    <Link 
                      href="/admin-panel-fcc-2025"
                      className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Dashboard
                    </Link>
                    {!editing && (
                      <button
                        onClick={() => setEditing(true)}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <Edit className="w-5 h-5 mr-2" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <p className="text-green-800">{success}</p>
          </div>
        )}

        {/* Profile Form */}
        <div className="mt-8 space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <User className="w-6 h-6 mr-3" />
                  Personal Information
                </h2>
                {!editing && (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white font-medium hover:bg-opacity-30 transition-all duration-200"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      required
                    />
                  ) : (
                    <p className="text-gray-900 text-lg font-medium">{admin.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      required
                    />
                  ) : (
                    <p className="text-gray-900 text-lg font-medium">{admin.lastName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <p className="text-gray-900 text-lg font-medium">{admin.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  {editing ? (
                    <div className="flex rounded-lg shadow-sm">
                      <select
                        name="phoneCountryCode"
                        value={formData.phoneCountryCode || '+254'}
                        onChange={handleInputChange}
                        className="px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      >
                        <option value="+254">+254</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+27">+27</option>
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-green-600" />
                      <p className="text-gray-900 text-lg font-medium">{admin.phoneCountryCode} {admin.phone}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department
                  </label>
                  {editing ? (
                    <select
                      name="department"
                      value={formData.department || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    >
                      <option value="administration">Administration</option>
                      <option value="programs">Programs</option>
                      <option value="finance">Finance</option>
                      <option value="communications">Communications</option>
                      <option value="operations">Operations</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Building className="h-5 w-5 text-purple-600" />
                      <p className="text-gray-900 text-lg font-medium capitalize">{admin.department}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      placeholder="e.g., Senior Administrator"
                    />
                  ) : (
                    <p className="text-gray-900 text-lg font-medium">{admin.title || 'Not specified'}</p>
                  )}
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                </label>
                {editing ? (
                  <textarea
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900 text-base leading-relaxed">{admin.bio || 'No bio provided'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                System Information
              </h2>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-gray-900 text-lg font-medium">@{admin.username}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role
                  </label>
                  <div className="flex items-center space-x-3">
                    <span className={`px-4 py-2 text-sm font-bold rounded-full ${getRoleColor(admin.role)}`}>
                      {admin.role}
                    </span>
                    {admin.role === 'super-admin' && (
                      <Star className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                </div>

                {admin.lastLogin && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Login
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <p className="text-gray-900 text-lg font-medium">{formatDate(admin.lastLogin)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {editing && (
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setFormData(admin);
                  setError('');
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
              >
                <X className="h-4 w-4 mr-2 inline" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Save className="h-4 w-4 mr-2 inline" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
