import Link from 'next/link';
import { CheckCircle, Mail, Clock, Users } from 'lucide-react';

export default function ApplicationSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-12 text-center">
            <CheckCircle className="h-20 w-20 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Application Submitted Successfully!
            </h1>
            <p className="text-green-100 text-lg">
              Thank you for your interest in volunteering with our community organization.
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-10">
            <div className="space-y-8">
              {/* What Happens Next */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  What Happens Next?
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Confirmation Email
                      </h3>
                      <p className="text-gray-600">
                        You&apos;ll receive a confirmation email within the next few minutes with your application details.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Application Review
                      </h3>
                      <p className="text-gray-600">
                        Our volunteer coordinator will review your application within 3-5 business days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Interview & Orientation
                      </h3>
                      <p className="text-gray-600">
                        If selected, we&apos;ll schedule a brief interview and orientation session to get you started.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Timeline */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Typical Application Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Application Review</span>
                    <span className="text-sm text-gray-500">3-5 business days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Interview (if selected)</span>
                    <span className="text-sm text-gray-500">1-2 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Background Check</span>
                    <span className="text-sm text-gray-500">1-2 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Orientation & Training</span>
                    <span className="text-sm text-gray-500">1 week</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center font-semibold">
                      <span className="text-gray-900">Start Volunteering</span>
                      <span className="text-green-600">4-6 weeks</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Questions About Your Application?
                </h3>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    If you have any questions about your application or the volunteer process, 
                    please don&apos;t hesitate to contact our volunteer coordinator:
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-900">
                      <span className="font-semibold">Email:</span> volunteer@fcccbo.org
                    </p>
                    <p className="text-gray-900">
                      <span className="font-semibold">Phone:</span> +254 701 234 567
                    </p>
                    <p className="text-gray-900">
                      <span className="font-semibold">Office Hours:</span> Monday - Friday, 9AM - 5PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link 
                  href="/volunteer" 
                  className="flex-1 bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Other Opportunities
                </Link>
                <Link 
                  href="/" 
                  className="flex-1 bg-gray-200 text-gray-800 text-center px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            While You Wait...
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Follow Our Impact
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Stay connected with our community work and see the difference volunteers make.
              </p>
              <Link 
                href="/news" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Read Our Latest News →
              </Link>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Upcoming Events
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Join us at community events and meet other volunteers and community members.
              </p>
              <Link 
                href="/events" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Upcoming Events →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
