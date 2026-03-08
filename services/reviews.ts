import { Review } from '@/types';
import { mockReviews } from '@/lib/mockData';

const SIMULATED_DELAY = 500;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let reviewIdCounter = mockReviews.length + 1;

export const reviewService = {
  async getReviews(movieId: number): Promise<Review[]> {
    await delay(SIMULATED_DELAY);
    return mockReviews.filter(r => r.movie_id === movieId);
  },

  async getUserReviews(userId: number): Promise<Review[]> {
    await delay(SIMULATED_DELAY);
    return mockReviews.filter(r => r.user.id === userId);
  },

  async createReview(movieId: number, rating: number, content: string): Promise<Review> {
    await delay(SIMULATED_DELAY);
    
    const newReview: Review = {
      id: reviewIdCounter++,
      movie_id: movieId,
      user: {
        id: 1,
        username: 'johndoe',
        email: 'john@example.com',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      rating,
      content,
      created_at: new Date().toISOString(),
    };
    
    mockReviews.push(newReview);
    return newReview;
  },

  async updateReview(reviewId: number, rating: number, content: string): Promise<Review> {
    await delay(SIMULATED_DELAY);
    
    const review = mockReviews.find(r => r.id === reviewId);
    if (!review) throw new Error('Review not found');
    
    review.rating = rating;
    review.content = content;
    return review;
  },

  async deleteReview(reviewId: number): Promise<void> {
    await delay(SIMULATED_DELAY);
    const index = mockReviews.findIndex(r => r.id === reviewId);
    if (index > -1) {
      mockReviews.splice(index, 1);
    }
  },
};
