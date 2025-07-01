'use client';

import { useState } from 'react';
import { Heart, DollarSign, Users, Target, Check, Gift } from 'lucide-react';

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | string>('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount('custom');
  };

  const handleDonate = () => {
    const amount = selectedAmount === 'custom' ? customAmount : selectedAmount;
    alert(`Thank you for your ${donationType} donation of $${amount}! This is a demo - no actual payment will be processed.`);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Support Our Community
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-blue-100">
              Your generous donations help us create lasting positive change in our community. 
              Every contribution, no matter the size, makes a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Impact in Numbers</h2>
            <p className="text-lg text-gray-600">See how your donations are making a difference</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">$50,000+</div>
              <div className="text-gray-600">Total Raised This Year</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">Families Helped</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">15</div>
              <div className="text-gray-600">Programs Funded</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">Goes to Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Make a Donation</h2>
              <p className="text-lg text-gray-600">Choose your donation amount and frequency</p>
            </div>

            {/* Donation Type */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">Donation Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setDonationType('one-time')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    donationType === 'one-time' 
                      ? 'border-blue-600 bg-blue-50 text-blue-600' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  One-time Donation
                </button>
                <button
                  onClick={() => setDonationType('monthly')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    donationType === 'monthly' 
                      ? 'border-blue-600 bg-blue-50 text-blue-600' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Monthly Donation
                </button>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">Donation Amount</label>
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-4 rounded-lg border-2 transition-all font-semibold ${
                      selectedAmount === amount 
                        ? 'border-blue-600 bg-blue-600 text-white' 
                        : 'border-gray-300 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg transition-all ${
                    selectedAmount === 'custom' 
                      ? 'border-blue-600 ring-2 ring-blue-100' 
                      : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                  }`}
                />
              </div>
            </div>

            {/* What Your Donation Provides */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What Your Donation Provides</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  <span>$25 provides school supplies for one child</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  <span>$50 funds a community workshop</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  <span>$100 supports a family emergency fund</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                  <span>$250 sponsors a community event</span>
                </div>
              </div>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={!selectedAmount || (selectedAmount === 'custom' && !customAmount)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-semibold"
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate {selectedAmount === 'custom' ? `$${customAmount}` : `$${selectedAmount}`} {donationType === 'monthly' ? 'Monthly' : 'Now'}
            </button>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>This is a demo donation form. No actual payment will be processed.</p>
              <p>Your donation is secure and tax-deductible. Receipt will be sent via email.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Other Ways to Give</h2>
            <p className="text-lg text-gray-600">There are many ways to support our community</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Volunteer Your Time</h3>
              <p className="text-gray-600 mb-6">
                Join our volunteer programs and contribute your skills and time to make a direct impact.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700">
                Learn More →
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">In-Kind Donations</h3>
              <p className="text-gray-600 mb-6">
                Donate goods, services, or resources that directly support our programs and events.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700">
                See Needs List →
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Corporate Sponsorship</h3>
              <p className="text-gray-600 mb-6">
                Partner with us as a corporate sponsor and help fund major community initiatives.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700">
                Contact Us →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
