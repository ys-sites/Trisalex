import { motion } from "motion/react";
import { Instagram, ExternalLink } from "lucide-react";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Placeholder images for Before & After
const beforeAfterItems = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    after: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Living Room Transformation",
    category: "Interior"
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80&grayscale=true",
    after: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Bedroom Accent Wall",
    category: "Interior"
  },
  {
    id: 3,
    before: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80&grayscale=true",
    after: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Exterior Spray Painting",
    category: "Exterior"
  }
];

export default function Portfolio() {
  return (
    <div className="py-16 md:py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Our Recent Work
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Browse our portfolio of high-end interior and exterior painting projects across Montreal and the West Island. See the difference a professional touch makes.
          </motion.p>
          
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="https://www.instagram.com/trisalexpainting/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow us on Instagram
            <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
          </motion.a>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {beforeAfterItems.map((item) => (
            <motion.div 
              key={item.id} 
              variants={fadeInUp}
              className="flex flex-col"
            >
              <div className="mb-4">
                <span className="text-[#2e5da0] font-bold text-sm uppercase tracking-wider mb-1 block">{item.category}</span>
                <h3 className="text-gray-900 font-bold text-2xl">{item.title}</h3>
              </div>
              <div className="shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden border border-gray-100">
                <BeforeAfterSlider 
                  beforeImage={item.before} 
                  afterImage={item.after} 
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
