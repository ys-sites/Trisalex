import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

const reviews = [
  {
    title: "Basement renovation",
    text: "We got a legal basement done from Hamza and his team, their customer service, quality, and transparency were all perfect. The project was done in timely manner.",
    author: "HomeOwner"
  },
  {
    title: "Full home reno",
    text: "I had a great experience with this company they did a full remodel for my house all 3 levels, they completely changed the entire house and through out the...",
    author: "Omar Ibrahim"
  },
  {
    title: "Deck Build",
    text: "Amazing service from Hamza and his team. Offered a more than fair price and was clean, quick and hardworking with his team.",
    author: "Customer"
  },
  {
    title: "Washroom renovation",
    text: "Hamza and his team renovated by washroom. Installed and rebuild the shower and water system. The work was clean. No messes nor junk was made or left behind after...",
    author: "Customer"
  },
  {
    title: "Basement Finishing",
    text: "Dealing with Hamza was an absolute pleasure! Not only was the work completed in a timely manner, he was upfront regarding any potential issues and took care of...",
    author: "Customer"
  },
  {
    title: "Basement renovation",
    text: "Great work, very professionally done. Would communicate well, and take the time to explain everything. Very effective.",
    author: "Customer"
  },
  {
    title: "Amazing result",
    text: "Hamza and his team are great they renovated my washroom upstairs and Im beyond happy with the results and quality of work and the companys professionalism...",
    author: "HomeOwner"
  },
  {
    title: "Perfectly done",
    text: "The renovation was great! So organized and well managed! Got the job done perfectly. Perfectly done!",
    author: "HomeOwner"
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
