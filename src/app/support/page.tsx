import { Metadata } from 'next';
import { MessageCircle, Phone, Mail, MapPin, Clock, HelpCircle } from 'lucide-react';
import ChatInterface from '../../components/CustomerCare/ChatInterface';

export const metadata: Metadata = {
  title: 'Customer Support - FLAMINGO CHAP CHAP CBO',
  description: 'Get help and support for FLAMINGO CHAP CHAP CBO services, events, membership, and volunteering opportunities.',
};

export default function SupportPage() {
  const faqItems = [
    {
      question: "How can I become a member of FLAMINGO CHAP CHAP CBO?",
      answer: "You can become a member by filling out our membership form on the Members page. Membership is open to all individuals who share our mission of environmental conservation and community empowerment."
    },
    {
      question: "What types of events do you organize?",
      answer: "We organize various environmental conservation activities including lake clean-up drives, tree planting initiatives, waste management workshops, community education programs, and water conservation projects."
    },
    {
      question: "How can I volunteer with your organization?",
      answer: "Visit our Volunteer page to sign up for upcoming activities. We welcome volunteers for clean-up drives, tree planting, community workshops, and administrative support."
    },
    {
      question: "Can I make a donation to support your work?",
      answer: "Yes! Visit our Donate page to make a contribution. Your donations help fund our environmental programs, community workshops, and conservation equipment."
    },
    {
      question: "Where is FLAMINGO CHAP CHAP CBO located?",
      answer: "We are based in Kisumu County, Kenya, and primarily operate around Lake Victoria and surrounding communities."
    },
    {
      question: "How can I stay updated on your activities?",
      answer: "Follow our news and announcements on the website, and consider joining our newsletter. You can also connect with us through our contact information provided below."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Customer Support</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re here to help! Get assistance with our environmental programs, 
            events, membership, volunteering, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Chat Interface */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-600 text-white p-6">
              <div className="flex items-center space-x-3">
                <MessageCircle size={28} />
                <div>
                  <h2 className="text-2xl font-semibold">Live Chat Support</h2>
                  <p className="text-green-100">Get instant answers to your questions</p>
                </div>
              </div>
            </div>
            <div className="p-0">
              <ChatInterface />
            </div>
          </div>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Phone className="mr-3 text-green-600" />
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="text-green-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600">info@flamingochapchap.org</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="text-green-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-800">Phone</h3>
                    <p className="text-gray-600">+254 xxx xxx xxx</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="text-green-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-800">Location</h3>
                    <p className="text-gray-600">Kisumu County, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="text-green-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-800">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <HelpCircle className="mr-3 text-green-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="font-medium text-gray-800 mb-2">{item.question}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Support Options */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Other Ways to Get Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm">
                Send us detailed questions and we&apos;ll respond within 24 hours
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm">
                Call us during office hours for immediate assistance
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">
                Come to our office in Kisumu County for in-person support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
