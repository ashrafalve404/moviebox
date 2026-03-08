'use client';

import { useState } from 'react';
import RatingStars from './RatingStars';
import { reviewService } from '@/services/reviews';
import { useAuthStore } from '@/store/authStore';

interface ReviewFormProps {
  movieId: number;
  onSuccess?: () => void;
}

export default function ReviewForm({ movieId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Please login to write a review');
      return;
    }

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (!content.trim()) {
      setError('Please write a review');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await reviewService.createReview(movieId, rating, content);
      setRating(0);
      setContent('');
      onSuccess?.();
    } catch {
      setError('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-zinc-900 rounded-lg p-4 text-center">
        <p className="text-zinc-400">Please <a href="/login" className="text-red-500 hover:underline">login</a> to write a review</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-lg p-4">
      <h3 className="text-white font-semibold mb-4">Write a Review</h3>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-3 py-2 rounded mb-3 text-sm">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <label className="text-zinc-400 text-sm mb-2 block">Your Rating</label>
        <RatingStars rating={rating} onRatingChange={setRating} />
      </div>
      
      <div className="mb-4">
        <label className="text-zinc-400 text-sm mb-2 block">Your Review</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts about this movie..."
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors resize-none"
          rows={4}
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
