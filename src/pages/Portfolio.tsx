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

const beforeAfterItems = [
  {
    id: 1,
    before: "/before1.jpg",
    after: "/after1.jpg",
    title: "Project 1",
    category: "Before & After"
  },
  {
    id: 2,
    before: "/before2.jpg",
    after: "/after2.jpg",
    title: "Project 2",
    category: "Before & After"
  },
  {
    id: 4,
    before: "/before4.png",
    after: "/after4.png",
    title: "Project 4",
    category: "Before & After"
  },
  {
    id: 5,
    before: "/before5.jpg",
    after: "/after5.jpg",
    title: "Project 5",
    category: "Before & After"
  },
  {
    id: 7,
    before: "/before7.jpg",
    after: "/after7.jpg",
    title: "Project 7",
    category: "Before & After"
  },
  {
    id: 8,
    before: "/before8.jpg",
    after: "/after8.jpg",
    title: "Project 8",
    category: "Before & After"
  },
  {
    id: 9,
    before: "/before9.jpg",
    after: "/after9.jpg",
    title: "Project 9",
    category: "Before & After"
  }
];

export default function Portfolio() {
  return (
    <div className="py-16 md:py-24 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Before & After Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
          >
            Browse the full gallery of recent Trisalex transformations across Montreal and the West Island, with the same before-and-after comparisons previously shown on the home page.
          </motion.p>
          
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="https://www.instagram.com/trisalexpainting/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-full shadow-lg hover:bg-white/20 transition-colors"
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
        >
          {beforeAfterItems.map((item) => (
            <motion.div 
              key={item.id} 
              variants={fadeInUp}
              className="flex flex-col"
            >
              <div className="mb-4">
                <span className="text-blue-300 font-bold text-sm uppercase tracking-wider mb-1 block">{item.category}</span>
                <h3 className="text-white font-bold text-2xl">{item.title}</h3>
              </div>
              <div className="shadow-xl shadow-black/30 rounded-2xl overflow-hidden border border-white/10">
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
