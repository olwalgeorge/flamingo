import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

export default function News() {
  const newsArticles = [
    {
      id: 1,
      title: "Community Garden Produces Record Harvest",
      excerpt: "Our community garden volunteers harvested over 500 pounds of fresh produce this season, all donated to local food banks.",
      content: "This year's harvest season has been our most successful yet, with dedicated volunteers working throughout the spring and summer to tend to our expanding community garden...",
      author: "Sarah Martinez",
      date: "June 28, 2025",
      category: "Community Impact",
      image: "/api/placeholder/600/400",
      featured: true
    },
    {
      id: 2,
      title: "Youth Leadership Program Graduates 25 Students",
      excerpt: "Our youth leadership program celebrated its largest graduating class, with participants going on to start their own community initiatives.",
      content: "Twenty-five young leaders completed our comprehensive 6-month youth leadership program, learning skills in communication, project management, and community organizing...",
      author: "David Johnson",
      date: "June 25, 2025",
      category: "Education",
      image: "/api/placeholder/600/400"
    },
    {
      id: 3,
      title: "Annual Summer Festival Raises $15,000 for Local Families",
      excerpt: "Thanks to amazing community support, our summer festival exceeded fundraising goals and will help 30 families with emergency assistance.",
      content: "The annual CommunityConnect Summer Festival was a tremendous success, bringing together over 800 community members for a day of fun, food, and fundraising...",
      author: "Emily Wong",
      date: "June 22, 2025",
      category: "Fundraising",
      image: "/api/placeholder/600/400"
    },
    {
      id: 4,
      title: "New Senior Technology Classes Launch Next Month",
      excerpt: "Free technology classes for seniors will begin in July, helping older community members stay connected with family and access online services.",
      content: "Starting July 15th, we'll be offering free technology classes specifically designed for senior community members. The program will cover smartphone basics, video calling, and online safety...",
      author: "Lisa Chen",
      date: "June 20, 2025",
      category: "Education",
      image: "/api/placeholder/600/400"
    },
    {
      id: 5,
      title: "Volunteer Appreciation Night Honors Outstanding Contributors",
      excerpt: "We celebrated our amazing volunteers with a special appreciation dinner, recognizing their dedication and impact on our community.",
      content: "Last week's Volunteer Appreciation Night was a heartwarming celebration of the incredible individuals who make our community programs possible...",
      author: "Alex Smith",
      date: "June 18, 2025",
      category: "Recognition",
      image: "/api/placeholder/600/400"
    },
    {
      id: 6,
      title: "Partnership with Local Library Expands Digital Access",
      excerpt: "A new partnership with the public library will provide free WiFi and computer access to families without reliable internet connections.",
      content: "We're excited to announce a new partnership with our local public library that will significantly expand digital access for community members...",
      author: "Michael Rodriguez",
      date: "June 15, 2025",
      category: "Partnerships",
      image: "/api/placeholder/600/400"
    }
  ];

  const categories = [
    "All News",
    "Community Impact",
    "Education", 
    "Fundraising",
    "Recognition",
    "Partnerships"
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Community Impact': return 'bg-green-100 text-green-800';
      case 'Education': return 'bg-blue-100 text-blue-800';
      case 'Fundraising': return 'bg-purple-100 text-purple-800';
      case 'Recognition': return 'bg-yellow-100 text-yellow-800';
      case 'Partnerships': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Community News
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-blue-100">
              Stay updated with the latest news, achievements, and stories 
              from our vibrant community organization.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {newsArticles[0] && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Story</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Tag className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <p className="text-lg">Featured Image</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 lg:p-12">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(newsArticles[0].category)}`}>
                      {newsArticles[0].category}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{newsArticles[0].title}</h3>
                  <p className="text-lg text-gray-600 mb-6">{newsArticles[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm mr-4">{newsArticles[0].author}</span>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{newsArticles[0].date}</span>
                    </div>
                    <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Categories Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Browse by Category</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
            <p className="text-lg text-gray-600">
              Catch up on all the latest happenings in our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.slice(1).map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Tag className="h-12 w-12 mx-auto mb-2 opacity-80" />
                    <p className="text-sm">Article Image</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-500">
                      <User className="h-3 w-3 mr-1" />
                      <span className="text-xs mr-3">{article.author}</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="text-xs">{article.date}</span>
                    </div>
                    <button className="text-blue-600 font-semibold hover:text-blue-700 text-sm flex items-center">
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Stay Informed</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
              Subscribe to our newsletter to get the latest community news, event updates, 
              and volunteer opportunities delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Archive & Contact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">News Archive</h3>
              <p className="text-gray-600 mb-6">
                Looking for older news stories? Browse our complete archive of community news and updates.
              </p>
              <Link 
                href="/news/archive" 
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Archive <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Story</h3>
              <p className="text-gray-600 mb-6">
                Have a community story to share? We&apos;d love to feature your experience or local news.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                Submit Story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
