import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    details: ""
  });

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL || "https://services.leadconnectorhq.com/hooks/o7aUwpKbtkP4AOP0pEjC/webhook-trigger/c66736a7-834c-4043-b1b0-17c60adcb344";
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          source: "Website Contact Form",
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          city: "",
          service: "",
          details: ""
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 bg-[#f7f3eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-3xl md:text-6xl font-extrabold text-gray-900 mb-6"
          >
            {t('nav.contact')}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t('home.cta.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            id="contact-form"
            className="bg-[#fffdf8]/94 rounded-3xl shadow-[0_32px_80px_rgba(148,163,184,0.22)] p-8 md:p-12 border border-[#fffaf0]/90"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contactPage.successTitle')}</h2>
                <p className="text-lg text-gray-600 mb-8">
                  {t('contactPage.successMessage')}
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-blue-600 font-bold hover:underline"
                >
                  {t('contactPage.sendAnother')}
                </button>
              </motion.div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-900">{t('home.contact.fullName')}</label>
                    <input 
                      required
                      type="text" 
                      placeholder={t('contactPage.placeholderName')}
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-900">{t('home.contact.phoneNumber')}</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="(514) 622-1599"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-900">{t('home.contact.emailAddress')}</label>
                    <input 
                      required
                      type="email" 
                      placeholder={t('contactPage.placeholderEmail')}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-900">{t('home.contact.city')}</label>
                    <input 
                      required
                      type="text" 
                      placeholder={t('contactPage.placeholderCity')}
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">{t('home.contact.serviceNeeded')}</label>
                  <select 
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 appearance-none cursor-pointer"
                  >
                    <option value="">{t('home.contact.selectService')}</option>
                    <option value="interior">{t('home.services.interior')}</option>
                    <option value="exterior">{t('home.services.exterior')}</option>
                    <option value="commercial">{t('home.contact.commercial')}</option>
                    <option value="other">{t('home.contact.other')}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">{t('home.contact.projectDetails')}</label>
                  <textarea 
                    rows={4}
                    placeholder={t('home.contact.detailsPlaceholder')}
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400 resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#4278c4] to-[#2e5da0] text-white font-extrabold py-4 md:py-5 rounded-2xl text-base md:text-xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                        {t('contactPage.sending')}
                      </>
                    ) : (
                      <>
                        {t('home.contact.submit')} <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> {t('home.contact.secure')}
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
