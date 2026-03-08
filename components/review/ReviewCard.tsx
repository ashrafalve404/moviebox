'use client';

import { Review } from '@/types';
import Image from 'next/image';
import RatingStars from './RatingStars';
import { formatDistanceToNow } from '@/lib/utils';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-zinc-900 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
          {review.user.avatar ? (
            <Image
              src={review.user.avatar}
              alt={review.user.username}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500">
              {review.user.username[0].toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-white">{review.user.username}</span>
            <span className="text-zinc-500 text-xs">
              {formatDistanceToNow(review.created_at)}
            </span>
          </div>
          
          <RatingStars rating={review.rating} readonly size={12} />
          
          <p className="text-zinc-300 mt-2 text-sm">{review.content}</p>
        </div>
      </div>
    </div>
  );
}
