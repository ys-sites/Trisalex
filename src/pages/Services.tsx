import { motion } from "motion/react";
import { Paintbrush, Home, PenTool, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Services() {
  const services = [
    {
      icon: <Paintbrush className="w-12 h-12 text-blue-600" />,
      title: "Interior Painting",
      description: "Transform your living spaces with our high-end interior painting services. We handle everything from walls and ceilings to intricate trim and doors, using only premium quality paints for a flawless finish.",
      image: "/after1.jpg"
    },
    {
      icon: <Home className="w-12 h-12 text-blue-600" />,
      title: "Exterior Spray Painting",
      description: "Boost your home's curb appeal and protect it from the elements. Our exterior spray painting provides a smooth, durable, and weather-resistant finish for siding, brick, stucco, and more.",
      image: "/after2.jpg"
    },
    {
      icon: <PenTool className="w-12 h-12 text-blue-600" />,
      title: "Drywall Repairs & Plastering",
      description: "Proper preparation is key to a lasting paint job. We offer expert drywall repairs, patching, and plastering to ensure your surfaces are perfectly smooth before the first drop of paint is applied.",
      image: "/after4.png"
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
      image: "/after.jpg"
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Our Professional Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive painting and preparation services tailored to meet the highest standards of quality for your Montreal or West Island home.
          </p>
        </motion.div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
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
