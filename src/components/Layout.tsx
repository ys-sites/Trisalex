import { Link, Outlet, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Menu, X, Paintbrush, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { FloatingHeader } from "./ui/floating-header";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isContact = location.pathname === "/contact";
  const { t } = useTranslation();
  const phoneNumber = "(514) 707-6123";
  const contactFormHref = "/contact#contact-form";
  const serviceCities = t("layout.serviceCities");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.slice(1);
      const scrollToHashTarget = () => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      };

      requestAnimationFrame(scrollToHashTarget);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  const navLinks = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.services'), path: "/services" },
    { name: t('nav.portfolio'), path: "/portfolio" },
    { name: t('nav.contact'), path: "/contact" },
  ];

  return (
    <div className={cn("min-h-screen flex flex-col font-sans text-gray-900", isContact ? "bg-[#f7f3eb]" : "bg-gray-50")}>
      {/* Top Bar */}
      {!isContact && <div className="bg-blue-900 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:hidden overflow-hidden city-ticker-wrap">
            <div className="city-ticker-track" aria-label={t("layout.serviceCitiesAria")}>
              <span className="city-ticker-content">{serviceCities}</span>
              <span className="city-ticker-content" aria-hidden="true">{serviceCities}</span>
            </div>
          </div>

          <div className="hidden sm:flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="flex items-center"><Phone className="w-4 h-4 mr-2" /> {phoneNumber}</span>
              <span className="hidden md:flex items-center flex-wrap"><MapPin className="w-4 h-4 mr-2" /> {serviceCities}</span>
            </div>
            <div className="flex items-center">
              <a href="https://www.instagram.com/trisalexpainting/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors flex items-center">
                <Instagram className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{t('nav.followUs')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>}

      {/* Navigation */}
      <div className="w-full h-0 sticky top-0 z-50">
        <div className="w-full px-4 pt-4">
          <FloatingHeader />
        </div>
      </div>

      {/* Main Content */}
      <main className={cn("flex-grow", !isHome && "pt-8")}>
        <Outlet />
      </main>

      <a
        href={contactFormHref}
        aria-label={t("layout.openContactForm")}
        className="lg:hidden fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#2e5da0] text-white shadow-[0_18px_35px_rgba(46,93,160,0.35)] transition-transform duration-200 active:scale-95"
      >
        <Phone className="h-6 w-6" />
      </a>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <img 
                  src="/logo.png" 
                  alt="Trisalex Logo" 
                  className="h-[4.5rem] w-auto object-contain" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden items-center">
                  <Paintbrush className="h-8 w-8 text-blue-600 mr-2" />
                  <span className="font-bold text-2xl tracking-tight text-gray-900">Trisalex</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                {t('footer.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">{t('footer.quickLinks')}</h3>
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">{t('footer.contactUs')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 font-medium">20 Rue du Curé-Trottier<br />Kirkland, QC H9J 1K4</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-600 font-medium">{phoneNumber}</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <a href="mailto:trisalexpainting@gmail.com" className="text-gray-600 font-medium hover:text-blue-600 transition-colors">
                      trisalexpainting@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Instagram className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <a href="https://www.instagram.com/trisalexpainting/" target="_blank" rel="noopener noreferrer" className="text-gray-600 font-medium hover:text-blue-600 transition-colors">
                      @trisalexpainting
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0 font-medium">
              &copy; {new Date().getFullYear()} Trisalex. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
