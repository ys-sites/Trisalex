import { motion } from "motion/react";
import { Paintbrush, Home, PenTool, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      icon: <Paintbrush className="w-12 h-12 text-blue-600" />,
      title: "Interior Painting",
      description: "Transform your living spaces with our high-end interior painting services. We handle everything from walls and ceilings to intricate trim and doors, using only premium quality paints for a flawless finish.",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Home className="w-12 h-12 text-blue-600" />,
      title: "Exterior Spray Painting",
      description: "Boost your home's curb appeal and protect it from the elements. Our exterior spray painting provides a smooth, durable, and weather-resistant finish for siding, brick, stucco, and more.",
      image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <PenTool className="w-12 h-12 text-blue-600" />,
      title: "Drywall Repairs & Plastering",
      description: "Proper preparation is key to a lasting paint job. We offer expert drywall repairs, patching, and plastering to ensure your surfaces are perfectly smooth before the first drop of paint is applied.",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Paintbrush className="w-12 h-12 text-blue-600" />,
      title: "Commercial Painting",
      description: "Professional painting services for businesses, offices, and retail spaces in Montreal. We work around your schedule to minimize disruption while delivering high-quality results.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Home className="w-12 h-12 text-blue-600" />,
      title: "Staining & Refinishing",
      description: "Expert staining and refinishing for decks, fences, and wooden surfaces. We use high-quality stains that protect your wood and enhance its natural beauty.",
      image: "https://images.unsplash.com/photo-1595844730298-b960ff98fee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Our Professional Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive painting and preparation services tailored to meet the highest standards of quality for your Montreal or West Island home.
          </p>
        </div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="aspect-w-16 aspect-h-10 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="mb-6">{service.icon}</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{service.description}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 text-lg"
                >
                  Request a quote for this service <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
