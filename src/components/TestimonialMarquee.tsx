import React from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Review = {
  title: string;
  text: string;
  author: string;
  city: string;
};

// Duplicate reviews to create a seamless loop
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="bg-[#11111a] border border-white/5 rounded-xl p-6 mb-6 shadow-lg">
    <div className="flex text-red-500 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
    </div>
    <h4 className="text-white font-bold text-lg mb-3">"{review.title}"</h4>
    <p className="text-gray-400 text-sm leading-relaxed mb-6">
      {review.text}
    </p>
    <p className="text-white font-bold text-sm">{review.author}</p>
    <p className="text-blue-300 text-xs mt-1">{review.city}</p>
  </div>
);

export function TestimonialMarquee() {
  const { t } = useTranslation();
  const reviews = t('testimonials.items', { returnObjects: true }) as Review[];

  // Duplicate reviews to create a seamless loop
  const column1 = [...reviews.slice(0, 3), ...reviews.slice(0, 3)];
  const column2 = [...reviews.slice(3, 6), ...reviews.slice(3, 6)];
  const column3 = [...reviews.slice(6, 8), reviews[0], ...reviews.slice(6, 8), reviews[0]];

  return (
    <div className="relative h-[600px] overflow-hidden bg-[#050505] flex gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top and Bottom Fades */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none"></div>

      <div className="flex-1 overflow-hidden relative">
        <div className="animate-marquee-vertical flex flex-col">
          {column1.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden relative hidden md:block">
        <div className="animate-marquee-vertical-slow flex flex-col">
          {column2.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative hidden lg:block">
        <div className="animate-marquee-vertical-fast flex flex-col">
          {column3.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
