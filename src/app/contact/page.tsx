'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import PhoneInput from '@/components/PhoneInput';
import ContactCard from '@/components/ContactCard';
import { DepartmentContacts } from '@/components/DepartmentContact';
import { DEFAULT_COUNTRY_CODE } from '@/utils/countryCodes';
import { CONTACT_INFO } from '@/data/contactInfo';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phoneCountryCode: DEFAULT_COUNTRY_CODE,
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ 
      name: '', 
      email: '', 
      phone: '',
      phoneCountryCode: DEFAULT_COUNTRY_CODE,
      subject: '', 
      message: '' 
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (phone: string) => {
    setFormData({
      ...formData,
      phone
    });
  };

  const handleCountryCodeChange = (phoneCountryCode: string) => {
    setFormData({
      ...formData,
      phoneCountryCode
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Contact {CONTACT_INFO.organization.acronym}
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-blue-100">
              We&apos;d love to hear from you! Whether you have questions about environmental conservation, 
              want to volunteer, or need information about our programs, don&apos;t hesitate to reach out.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <PhoneInput
                    id="phone"
                    label="Phone Number (Optional)"
                    value={formData.phone}
                    countryCode={formData.phoneCountryCode}
                    onPhoneChange={handlePhoneChange}
                    onCountryCodeChange={handleCountryCodeChange}
                    placeholder="712345678"
                    required={false}
                    compact={false}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                    <option value="events">Event Information</option>
                    <option value="membership">Membership</option>
                    <option value="donations">Donations</option>
                    <option value="partnership">Partnership Opportunities</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Send Message <Send className="ml-2 h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <ContactCard 
                variant="detailed"
                showBusinessHours={true}
                showDepartments={false}
                showLeadership={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Department Contacts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect directly with the right department for your specific needs. Each department is 
              specialized to provide you with the best possible assistance.
            </p>
          </div>
          
          <DepartmentContacts 
            variant="detailed"
            showDescription={true}
            showResponsibilities={true}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How can I become a member?
              </h3>
              <p className="text-gray-600">
                Simply attend one of our events or contact us directly. There are no membership fees - 
                just a willingness to contribute to our community!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What volunteer opportunities are available?
              </h3>
              <p className="text-gray-600">
                We have opportunities for all skill levels and time commitments, from event setup 
                to ongoing program coordination. Check our volunteer page for current openings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How are donations used?
              </h3>
              <p className="text-gray-600">
                All donations go directly to community programs, events, and support for local families 
                in need. We maintain full transparency in our financial reporting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I suggest new programs or events?
              </h3>
              <p className="text-gray-600">
                Absolutely! We&apos;re always looking for new ways to serve our community. 
                Contact us with your ideas and we&apos;ll work together to make them happen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
