import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Phone, MapPin, Clock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const bgImages = [
    "/after.jpg",
    "/after1.jpg",
    "/after2.jpg",
    "/after4.png",
    "/after5.jpg",
    "/after6.jpg",
    "/after7.jpg",
    "/after8.jpg",
    "/after9.jpg"
  ];

  const gridImages = Array.from({ length: 72 }, (_, i) => bgImages[i % bgImages.length]);

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
    <div className="relative min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 auto-rows-fr gap-0 group/contact">
        {gridImages.map((src, index) => (
          <div key={index} className="relative aspect-square overflow-hidden">
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover scale-[1.03] opacity-70 brightness-105 saturate-90 transition-all duration-500 ease-out group-hover/contact:opacity-55 hover:!scale-110 hover:!opacity-100 hover:!brightness-100 hover:!saturate-100"
            />
            <div className="pointer-events-none absolute inset-0 bg-white/35 transition-opacity duration-500 group-hover/contact:bg-white/45 hover:!bg-transparent"></div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-white/58"></div>
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_right,rgba(46,93,160,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(46,93,160,0.04)_1px,transparent_1px)] bg-[size:92px_92px]"></div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6"
          >
            {t('nav.contact')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t('home.cta.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white/92 p-8 rounded-3xl shadow-[0_24px_60px_rgba(148,163,184,0.18)] border border-white/80">
              <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('footer.contactUs')}</h3>
              <p className="text-gray-600 font-medium">(514) 707-6123</p>
            </div>

            <div className="bg-white/92 p-8 rounded-3xl shadow-[0_24px_60px_rgba(148,163,184,0.18)] border border-white/80">
              <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600 font-medium">20 Rue du Curé-Trottier<br/>Kirkland, QC H9J 1K4</p>
            </div>

            <div className="bg-white/92 p-8 rounded-3xl shadow-[0_24px_60px_rgba(148,163,184,0.18)] border border-white/80">
              <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hours</h3>
              <p className="text-gray-600 font-medium">Mon - Fri: 8AM - 6PM<br/>Sat: 9AM - 2PM</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="contact-form"
            className="lg:col-span-2 bg-white/94 rounded-3xl shadow-[0_32px_80px_rgba(148,163,184,0.22)] p-8 md:p-12 border border-white/90"
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Send another message
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
                      placeholder="Jean Francois"
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
                      placeholder="jean@example.com"
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
                      placeholder="Montreal"
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
                        Sending...
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
        </div>
      </div>
    </div>
  );
}
