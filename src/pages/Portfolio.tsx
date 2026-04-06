import { motion } from "motion/react";
import { Instagram, ExternalLink } from "lucide-react";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
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
      staggerChildren: 0.1
    }
  }
};

export default function Portfolio() {
  const { t } = useTranslation();

  const beforeAfterItems = [
    {
      id: 1,
      before: "/before1.jpg",
      after: "/after1.jpg",
      title: t("portfolioPage.items.0.title"),
      category: t("portfolioPage.items.0.category")
    },
    {
      id: 2,
      before: "/before2.jpg",
      after: "/after2.jpg",
      title: t("portfolioPage.items.1.title"),
      category: t("portfolioPage.items.1.category")
    },
    {
      id: 4,
      before: "/before4.png",
      after: "/after4.png",
      title: t("portfolioPage.items.2.title"),
      category: t("portfolioPage.items.2.category")
    },
    {
      id: 5,
      before: "/before5.jpg",
      after: "/after5.jpg",
      title: t("portfolioPage.items.3.title"),
      category: t("portfolioPage.items.3.category")
    },
    {
      id: 7,
      before: "/before7.jpg",
      after: "/after7.jpg",
      title: t("portfolioPage.items.4.title"),
      category: t("portfolioPage.items.4.category")
    },
    {
      id: 8,
      before: "/before8.jpg",
      after: "/after8.jpg",
      title: t("portfolioPage.items.5.title"),
      category: t("portfolioPage.items.5.category")
    },
    {
      id: 9,
      before: "/before9.jpg",
      after: "/after9.jpg",
      title: t("portfolioPage.items.6.title"),
      category: t("portfolioPage.items.6.category")
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            {t("portfolioPage.title")}
          </motion.h1>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            {t("portfolioPage.subtitle")}
          </motion.p>
          
          <motion.a 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            href="https://www.instagram.com/trisalexpainting/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-50 border border-blue-100 text-[#2e5da0] font-semibold rounded-full shadow-lg hover:bg-blue-100 transition-colors"
          >
            <Instagram className="w-5 h-5 mr-2" />
            {t("portfolioPage.followInstagram")}
            <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
          </motion.a>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
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
              <div className="shadow-xl shadow-gray-200/60 rounded-2xl overflow-hidden border border-gray-100">
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
