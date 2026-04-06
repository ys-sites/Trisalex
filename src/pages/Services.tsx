import { motion } from "motion/react";
import { Paintbrush, Home, PenTool, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Paintbrush className="w-12 h-12 text-blue-600" />,
      title: t("servicesPage.items.interior.title"),
      description: t("servicesPage.items.interior.description"),
      image: "/after1.jpg"
    },
    {
      icon: <Home className="w-12 h-12 text-blue-600" />,
      title: t("servicesPage.items.exterior.title"),
      description: t("servicesPage.items.exterior.description"),
      image: "/after2.jpg"
    },
    {
      icon: <PenTool className="w-12 h-12 text-blue-600" />,
      title: t("servicesPage.items.drywall.title"),
      description: t("servicesPage.items.drywall.description"),
      image: "/after4.png"
    },
    {
      icon: <Paintbrush className="w-12 h-12 text-blue-600" />,
      title: t("servicesPage.items.commercial.title"),
      description: t("servicesPage.items.commercial.description"),
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Home className="w-12 h-12 text-blue-600" />,
      title: t("servicesPage.items.staining.title"),
      description: t("servicesPage.items.staining.description"),
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
            {t("servicesPage.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("servicesPage.subtitle")}
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
                  {t("servicesPage.requestQuote")} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
