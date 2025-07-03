'use client';

import { useState } from 'react';
import { Star, MessageCircle, ThumbsUp, MoreHorizontal, Flag } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  initials: string;
  rating: number;
  content: string;
  timestamp: string;
  helpful: number;
  isHelpful: boolean;
}

const sampleComments: Comment[] = [
  {
    id: '1',
    author: 'Mary Kiprotich',
    initials: 'MK',
    rating: 5,
    content: 'Excellent event! The organization was top-notch and I learned so much about environmental conservation. The hands-on activities were engaging and the facilitators were very knowledgeable.',
    timestamp: '2 days ago',
    helpful: 12,
    isHelpful: false
  },
  {
    id: '2',
    author: 'John Ochieng',
    initials: 'JO',
    rating: 4,
    content: 'Great community initiative! The tree planting workshop was very informative. I would love to see more workshops like this in our area.',
    timestamp: '1 week ago',
    helpful: 8,
    isHelpful: false
  },
  {
    id: '3',
    author: 'Sarah Wanjiku',
    initials: 'SW',
    rating: 5,
    content: 'Amazing experience! Well organized event with passionate speakers. The networking opportunities were fantastic and I made valuable connections.',
    timestamp: '2 weeks ago',
    helpful: 15,
    isHelpful: false
  }
];

export default function EventComments() {
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState({
    rating: 0,
    content: '',
    author: ''
  });

  const handleSubmitComment = () => {
    if (!newComment.content || !newComment.author || newComment.rating === 0) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author,
      initials: newComment.author.split(' ').map(n => n[0]).join('').toUpperCase(),
      rating: newComment.rating,
      content: newComment.content,
      timestamp: 'Just now',
      helpful: 0,
      isHelpful: false
    };

    setComments([comment, ...comments]);
    setNewComment({ rating: 0, content: '', author: '' });
    setShowAddComment(false);
  };

  const handleHelpful = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            helpful: comment.isHelpful ? comment.helpful - 1 : comment.helpful + 1,
            isHelpful: !comment.isHelpful 
          }
        : comment
    ));
  };

  const averageRating = comments.length > 0 
    ? comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Overall Rating Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Event Reviews & Feedback</h3>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-end">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-5 w-5 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">{comments.length} reviews</div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = comments.filter(c => c.rating === stars).length;
            const percentage = comments.length > 0 ? (count / comments.length) * 100 : 0;
            
            return (
              <div key={stars} className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 w-8">{stars}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Review Button */}
      {!showAddComment && (
        <button
          onClick={() => setShowAddComment(true)}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Write a Review
        </button>
      )}

      {/* Add Review Form */}
      {showAddComment && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Share Your Experience</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={newComment.author}
                onChange={(e) => setNewComment({...newComment, author: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      star <= newComment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-300'
                    }`}
                    onClick={() => setNewComment({...newComment, rating: star})}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea 
                rows={4}
                value={newComment.content}
                onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your thoughts about this event..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAddComment(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitComment}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">{comment.initials}</span>
                </div>
                <div className="ml-3">
                  <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-700 mb-4">{comment.content}</p>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => handleHelpful(comment.id)}
                className={`flex items-center space-x-1 text-sm transition-colors ${
                  comment.isHelpful ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${comment.isHelpful ? 'fill-current' : ''}`} />
                <span>Helpful ({comment.helpful})</span>
              </button>
              
              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>Reply</span>
              </button>
              
              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
                <Flag className="h-4 w-4" />
                <span>Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {comments.length > 0 && (
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}
