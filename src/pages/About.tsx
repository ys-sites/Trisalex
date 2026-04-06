import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14
    }
  }
};

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {t("about.title")}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {t("about.subtitle")}
            </p>
            <p className="text-gray-600 mb-8">
              {t("about.description")}
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("about.whyTitle")}</h3>
            <ul className="space-y-4">
              {[
                t("about.points.0"),
                t("about.points.1"),
                t("about.points.2"),
                t("about.points.3"),
                t("about.points.4"),
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="relative hidden lg:block">
            <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/main.jpg"
                alt={t("about.imageAlt")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-8 rounded-2xl shadow-lg hidden md:block">
              <p className="text-4xl font-extrabold mb-2">25+</p>
              <p className="text-blue-100 font-medium">{t("about.experience")}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
