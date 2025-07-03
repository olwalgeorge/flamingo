import { Calendar, MapPin, Heart, Share2, ArrowLeft, DollarSign, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getEventById } from '../../../../data/events';
import { getRecentDonations, getFundraiserStats, formatTimeAgo } from '../../../../services/fundraiserService';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventFundraiserPage({ params }: PageProps) {
  const resolvedParams = await params;
  const event = getEventById(resolvedParams.id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Link href="/events" className="text-blue-600 hover:text-blue-700">
            Return to Events
          </Link>
        </div>
      </div>
    );
  }

  // Only show fundraiser page for events with financial information
  if (!event.fundraisingGoal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Fundraising Campaign</h1>
          <p className="text-gray-600 mb-6">This event does not have an active fundraising campaign.</p>
          <Link href={`/events/${event.id}`} className="text-blue-600 hover:text-blue-700">
            Return to Event Details
          </Link>
        </div>
      </div>
    );
  }

  const fundingProgress = event.currentFunding && event.fundraisingGoal 
    ? (event.currentFunding / event.fundraisingGoal) * 100 
    : 0;

  const remainingAmount = event.fundraisingGoal - (event.currentFunding || 0);

  // Get real donation data from service
  const recentDonations = getRecentDonations(event.id, 5);
  const fundraiserStats = getFundraiserStats(event.id);

  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-64 bg-gradient-to-r from-green-600 to-blue-600 relative">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white w-full">
              <Link 
                href={`/events/${event.id}`}
                className="inline-flex items-center text-green-100 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Event Details
              </Link>
              
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Heart className="h-6 w-6 mr-2 text-red-400" />
                    <span className="text-green-100 font-medium">Fundraising Campaign</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">{event.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 lg:mt-0 bg-white/10 backdrop-blur-sm rounded-lg p-6 lg:w-80">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">
                      ${(event.currentFunding || 0).toLocaleString()}
                    </div>
                    <div className="text-green-100 mb-3">
                      raised of ${event.fundraisingGoal.toLocaleString()} goal
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 mb-3">
                      <div 
                        className="bg-white h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(fundingProgress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-green-100">
                      {Math.round(fundingProgress)}% funded
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Campaign Description */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Campaign</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {event.description}
                  </p>
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {event.fullDescription}
                  </div>
                </div>
              </div>

              {/* How Funds Are Used */}
              {event.fundingBreakdown && event.fundingBreakdown.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">How Your Donation Helps</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {event.fundingBreakdown.map((item, index) => (
                      <div key={index} className="flex items-start p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{item.category}</h4>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="text-lg font-bold text-green-600">
                            ${item.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Donations */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Supporters</h3>
                {recentDonations.length > 0 ? (
                  <div className="space-y-4">
                    {recentDonations.map((donation) => (
                      <div key={donation.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <Heart className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{donation.donorName}</h4>
                            <div className="flex items-center">
                              <span className="text-lg font-bold text-green-600 mr-2">
                                ${donation.amount}
                              </span>
                              <span className="text-sm text-gray-500">{formatTimeAgo(donation.createdAt)}</span>
                            </div>
                          </div>
                          {donation.message && (
                            <p className="text-gray-600 text-sm">{donation.message}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Be the first to support this event!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Donation Form */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Support This Event</h3>
                  
                  {/* Suggested Amounts */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Choose an amount</label>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {suggestedAmounts.map((amount) => (
                        <button
                          key={amount}
                          className="p-3 border border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="number"
                        placeholder="Other amount"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Leave a message (optional)"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  {/* Anonymous Option */}
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="anonymous"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                      Make this donation anonymous
                    </label>
                  </div>

                  {/* Donate Button */}
                  <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors font-semibold text-lg">
                    Donate Now
                  </button>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Your donation is secure and will go directly toward this event.
                  </p>
                </div>

                {/* Campaign Stats */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Campaign Stats</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Goal Amount</span>
                      <span className="font-semibold text-gray-900">
                        ${event.fundraisingGoal.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Raised So Far</span>
                      <span className="font-semibold text-green-600">
                        ${(event.currentFunding || 0).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Remaining</span>
                      <span className="font-semibold text-gray-900">
                        ${remainingAmount.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Supporters</span>
                      <span className="font-semibold text-gray-900">
                        {fundraiserStats.donationCount}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Days to Event</span>
                      <span className="font-semibold text-gray-900">
                        {Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sponsorship Opportunities */}
                {event.sponsorshipOpportunities && event.sponsorshipOpportunities.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Sponsorship Levels</h3>
                    <div className="space-y-3">
                      {event.sponsorshipOpportunities.map((sponsor, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-900">{sponsor.level}</h4>
                            <span className="text-lg font-bold text-blue-600">${sponsor.amount}</span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {sponsor.benefits.slice(0, 2).map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-center">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                            {sponsor.benefits.length > 2 && (
                              <li className="text-blue-600 text-xs">+{sponsor.benefits.length - 2} more benefits</li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link 
                        href="/contact"
                        className="w-full block text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        Contact for Sponsorship
                      </Link>
                    </div>
                  </div>
                )}

                {/* Share Campaign */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Share This Campaign</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Help us reach more supporters by sharing this campaign.
                  </p>
                  <button className="w-full bg-blue-100 text-blue-700 py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors font-semibold flex items-center justify-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
