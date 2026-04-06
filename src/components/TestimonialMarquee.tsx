import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

const reviews = [
  {
    title: "Interior Painting - Full Main Floor",
    text: "Trisalex repainted our living room, kitchen, and hallway. The prep was meticulous, edges are perfectly clean, and they finished exactly on schedule.",
    author: "Sarah M.",
    city: "West Island"
  },
  {
    title: "Exterior Spray Painting - Brick and Aluminum",
    text: "We hired Trisalex for exterior spray painting on our brick facade and aluminum siding. The finish looks factory-smooth and the color came out exactly as promised.",
    author: "Marc D.",
    city: "Kirkland"
  },
  {
    title: "Cabinet Painting - Kitchen Refresh",
    text: "Our kitchen cabinets look brand new after Trisalex refinished them. The team protected everything, kept the space clean, and delivered a premium result.",
    author: "Nadia R.",
    city: "Laval"
  },
  {
    title: "Interior Painting - Condo Turnover",
    text: "I needed a fast repaint before listing my condo. Trisalex patched walls, painted ceilings and trim, and completed everything within three days.",
    author: "Kevin L.",
    city: "Montreal"
  },
  {
    title: "Exterior Spray Painting - Vinyl Siding",
    text: "Trisalex transformed our faded vinyl siding and shutters. The crew was punctual, organized, and the curb appeal improvement is incredible.",
    author: "Julie T.",
    city: "Brossard"
  },
  {
    title: "Interior Painting - Staircase and Trim",
    text: "We booked Trisalex for our staircase, railings, and trim. Communication was excellent throughout and the final finish is flawless.",
    author: "Anthony G.",
    city: "Vaudreuil"
  },
  {
    title: "Commercial Painting - Boutique Space",
    text: "Our boutique stayed open while Trisalex repainted the interior in phases. They were respectful with customers and delivered a clean, professional look.",
    author: "Isabelle P.",
    city: "Longueuil"
  },
  {
    title: "Interior Painting - Basement and Ceiling",
    text: "From drywall touch-ups to final coats, Trisalex handled our basement repaint professionally. The space is brighter and the workmanship is top quality.",
    author: "Daniel C.",
    city: "Terrebonne"
  }
];

// Duplicate reviews to create a seamless loop
const column1 = [...reviews.slice(0, 3), ...reviews.slice(0, 3)];
const column2 = [...reviews.slice(3, 6), ...reviews.slice(3, 6)];
const column3 = [...reviews.slice(6, 8), reviews[0], ...reviews.slice(6, 8), reviews[0]];

const ReviewCard: React.FC<{ review: typeof reviews[0] }> = ({ review }) => (
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
