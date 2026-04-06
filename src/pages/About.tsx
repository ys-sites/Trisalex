import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              About Trisalex
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Family owned and operated for over 25 years, Trisalex has been the trusted name for professional painting in Montreal and the West Island.
            </p>
            <p className="text-gray-600 mb-8">
              We specialize in professional high-end interior painting and exterior spray painting for homes. We believe that proper preparation is the key to every successful project. That's why we don't just paint; we offer comprehensive drywall repairs and plastering before painting to ensure smooth surfaces and long-lasting, flawless results.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
            <ul className="space-y-4">
              {[
                "25+ years of family-owned experience",
                "5.0 ⭐ Google Rated by satisfied customers",
                "Meticulous preparation (drywall & plastering)",
                "High-end interior & exterior spray painting",
                "Clean, respectful, and timely service",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/about.jpg"
                alt="Painter at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-8 rounded-2xl shadow-lg hidden md:block">
              <p className="text-4xl font-extrabold mb-2">25+</p>
              <p className="text-blue-100 font-medium">Years of<br/>Experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
