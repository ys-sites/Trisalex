import { Link } from "react-router-dom";
import { CheckCircle2, Star, ArrowRight, Paintbrush, ShieldCheck, Clock, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { TestimonialMarquee } from "../components/TestimonialMarquee";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

type VideoItem = {
  id: number;
  title: string;
  src: string;
  poster: string;
};

export default function Home() {
  const { t } = useTranslation();
  const googleReviewLink = "https://share.google/8gIZ6dsyAi8mTG4Ck";
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const mobileSlideRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const [mobileVideoIndex, setMobileVideoIndex] = useState(0);
  const [videoThumbnails, setVideoThumbnails] = useState<Record<number, string>>({});

  const videoItems: VideoItem[] = [
    { id: 1, title: "Trisalex Painting", src: "/vid1.mp4", poster: "/after1.jpg" },
    { id: 2, title: "Trisalex Painting", src: "/vid2.mp4", poster: "/after2.jpg" },
    { id: 3, title: "Trisalex Painting", src: "/vid3.mp4", poster: "/after4.png" }
  ];

  useEffect(() => {
    let cancelled = false;

    const createThumbnail = (item: VideoItem) => new Promise<string | null>((resolve) => {
      const tempVideo = document.createElement("video");
      tempVideo.src = item.src;
      tempVideo.preload = "auto";
      tempVideo.muted = true;
      tempVideo.playsInline = true;

      const cleanup = () => {
        tempVideo.pause();
        tempVideo.removeAttribute("src");
        tempVideo.load();
      };

      const captureFrame = () => {
        const canvas = document.createElement("canvas");
        canvas.width = tempVideo.videoWidth || 720;
        canvas.height = tempVideo.videoHeight || 1280;
        const context = canvas.getContext("2d");
        if (!context) {
          cleanup();
          resolve(null);
          return;
        }

        context.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL("image/jpeg", 0.82);
        cleanup();
        resolve(thumbnail);
      };

      tempVideo.addEventListener("error", () => {
        cleanup();
        resolve(null);
      }, { once: true });

      tempVideo.addEventListener("loadedmetadata", () => {
        const targetTime = Number.isFinite(tempVideo.duration) && tempVideo.duration > 1 ? 1 : 0;

        if (targetTime === 0) {
          captureFrame();
          return;
        }

        tempVideo.addEventListener("seeked", captureFrame, { once: true });
        tempVideo.currentTime = targetTime;
      }, { once: true });

      tempVideo.load();
    });

    Promise.all(videoItems.map(async (item) => ({
      id: item.id,
      thumbnail: await createThumbnail(item)
    }))).then((results) => {
      if (cancelled) {
        return;
      }

      const nextThumbnails = results.reduce<Record<number, string>>((accumulator, result) => {
        if (result.thumbnail) {
          accumulator[result.id] = result.thumbnail;
        }
        return accumulator;
      }, {});

      setVideoThumbnails(nextThumbnails);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const resetVideoToStart = (video: HTMLVideoElement) => {
    video.pause();
    video.currentTime = 0;
  };

  const handleVideoClick = async (id: number) => {
    const selectedVideo = videoRefs.current[id];
    if (!selectedVideo) {
      return;
    }

    for (const key in videoRefs.current) {
      const keyAsNumber = Number(key);
      const video = videoRefs.current[keyAsNumber];
      if (!video || keyAsNumber === id) {
        continue;
      }
      resetVideoToStart(video);
    }

    if (selectedVideo.paused) {
      selectedVideo.currentTime = 0;
      try {
        await selectedVideo.play();
        setActiveVideoId(id);
      } catch {
        setActiveVideoId(null);
      }
    } else {
      resetVideoToStart(selectedVideo);
      setActiveVideoId(null);
    }
  };

  const resetVideosToPreview = () => {
    for (const key in videoRefs.current) {
      const keyAsNumber = Number(key);
      const video = videoRefs.current[keyAsNumber];
      if (!video) {
        continue;
      }
      resetVideoToStart(video);
    }
    setActiveVideoId(null);
  };

  const scrollToMobileVideo = (index: number) => {
    const targetVideo = videoItems[index];
    const slide = mobileSlideRefs.current[targetVideo.id];
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const handlePrevMobileVideo = () => {
    resetVideosToPreview();
    setMobileVideoIndex((prev: number) => {
      const nextIndex = prev === 0 ? videoItems.length - 1 : prev - 1;
      scrollToMobileVideo(nextIndex);
      return nextIndex;
    });
  };

  const handleNextMobileVideo = () => {
    resetVideosToPreview();
    setMobileVideoIndex((prev: number) => {
      const nextIndex = (prev + 1) % videoItems.length;
      scrollToMobileVideo(nextIndex);
      return nextIndex;
    });
  };

  const renderVideoCard = (vid: VideoItem, refId: number, isMobile = false) => {
    const thumbnailSrc = videoThumbnails[vid.id] ?? vid.poster;

    return (
    <motion.div
      key={`${refId}-${vid.id}`}
      variants={fadeInUp}
      className="relative rounded-[2rem] overflow-hidden aspect-[9/16] group cursor-pointer border border-white/10 shadow-2xl"
      onClick={() => handleVideoClick(refId)}
    >
      <video
        src={vid.src}
        poster={vid.poster}
        ref={(el: HTMLVideoElement | null) => {
          videoRefs.current[refId] = el;
        }}
        className={`block w-full h-full object-cover bg-black transition-opacity duration-300 ${isMobile ? "" : "transition-transform duration-700 group-hover:scale-105"} ${activeVideoId === refId ? "opacity-100" : "opacity-0"}`}
        controls={isMobile && activeVideoId === refId}
        playsInline
        preload={isMobile ? "metadata" : "auto"}
        onPlay={() => setActiveVideoId(refId)}
        onPause={() => {
          setActiveVideoId((current) => (current === refId ? null : current));
        }}
        style={{ WebkitTransform: "translateZ(0)", backfaceVisibility: "hidden" }}
      />

      {activeVideoId !== refId && (
        <img
          src={thumbnailSrc}
          alt={`${vid.title} thumbnail`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Dark Overlay */}
      <div className={`absolute inset-0 transition-colors duration-300 ${activeVideoId === refId ? "bg-transparent" : "bg-black/20 group-hover:bg-black/10"}`}></div>

      {/* Top Bar (Glassmorphism) */}
      <div className={`absolute top-4 left-4 right-4 flex items-center justify-between bg-black/40 backdrop-blur-md rounded-2xl p-2 pr-3 border border-white/10 transition-opacity duration-300 ${activeVideoId === refId && isMobile ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="flex items-center space-x-3 overflow-hidden">
          {/* Instagram Story Ring with Logo */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px] flex-shrink-0">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-0.5">
              <Instagram className="w-4 h-4 text-pink-600" />
            </div>
          </div>
          <span className="text-white text-sm font-medium truncate">{vid.title}</span>
        </div>
        <span className={`bg-white/20 hover:bg-white/30 transition-colors text-white text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full flex-shrink-0 ${isMobile ? "hidden" : ""}`}>
          {t('home.video.viewInstagram')}
        </span>
      </div>

      {activeVideoId !== refId && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-gray-900 text-white overflow-hidden min-h-[90vh] flex items-center"
        style={{
          backgroundImage: 'url("/hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-6 text-sm font-medium backdrop-blur-sm">
              <Star className="w-4 h-4 mr-2 fill-current" /> {t('home.hero.topRated')}
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              {t('home.hero.title1')}<br/> <span className="text-blue-400">{t('home.hero.title2')}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              {t('home.hero.subtitle')}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                to="/contact"
                className="bg-[#4a68b1] hover:bg-[#3a5596] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-900/30 text-center flex items-center justify-center group"
              >
                {t('home.hero.getQuote')} <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all text-center flex items-center justify-center"
              >
                {t('home.hero.ourServices')}
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-50 text-sm font-medium backdrop-blur-md shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]">
              <Clock className="w-4 h-4 mr-2 text-blue-300" /> {t('home.hero.trust')}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* Faint background grid to match the reference */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-10 transform scale-110 -translate-y-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full h-64 object-cover rounded-lg" alt="" />
                <img src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full h-48 object-cover rounded-lg" alt="" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center text-center mb-12 md:mb-16"
          >
            <a 
              href="https://www.instagram.com/trisalexpainting/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors mb-6"
            >
              <Instagram className="w-4 h-4 mr-2" /> {t('home.video.follow')}
            </a>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">{t('home.video.title')}</h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('home.video.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="md:hidden"
          >
            <div className="relative">
              <div
                ref={mobileCarouselRef}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {videoItems.map((vid, index) => (
                  <div
                    key={`mobile-${vid.id}`}
                    ref={(element: HTMLDivElement | null) => {
                      mobileSlideRefs.current[vid.id] = element;
                    }}
                    className="min-w-[58vw] max-w-[220px] snap-center shrink-0"
                    onClick={() => setMobileVideoIndex(index)}
                  >
                    {renderVideoCard(vid, vid.id + 100, true)}
                  </div>
                ))}
              </div>

              <button
                type="button"
                aria-label={t('home.video.previousAria')}
                onClick={handlePrevMobileVideo}
                className="absolute left-4 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white hover:bg-black/50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                aria-label={t('home.video.nextAria')}
                onClick={handleNextMobileVideo}
                className="absolute right-4 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white hover:bg-black/50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="mt-4 text-center">
                <span className="text-white/80 text-sm font-medium">
                  {mobileVideoIndex + 1} / {videoItems.length}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="hidden md:grid grid-cols-3 gap-6 lg:gap-8"
          >
            {videoItems.map((vid) => renderVideoCard(vid, vid.id))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100 transform transition-transform hover:-translate-y-1">
              <div className="bg-blue-50 p-5 rounded-2xl mb-6 text-blue-600">
                <Star className="w-10 h-10 fill-current" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('home.features.ratingTitle')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.features.ratingDesc')}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100 transform transition-transform hover:-translate-y-1">
              <div className="bg-blue-50 p-5 rounded-2xl mb-6 text-blue-600">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('home.features.experienceTitle')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.features.experienceDesc')}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100 transform transition-transform hover:-translate-y-1">
              <div className="bg-blue-50 p-5 rounded-2xl mb-6 text-blue-600">
                <Paintbrush className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('home.features.prep')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('home.features.prepDesc')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2e5da0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{t('home.services.title')}</h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 group">
              <div className="relative overflow-hidden">
                <img
                  src="/int.png"
                  alt={t('home.services.interior')}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('home.services.interior')}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {t('home.services.interiorDesc')}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700"><CheckCircle2 className="w-5 h-5 text-blue-500 mr-3" /> {t('home.services.premiumPaints')}</li>
                  <li className="flex items-center text-gray-700"><CheckCircle2 className="w-5 h-5 text-blue-500 mr-3" /> {t('home.services.furniture')}</li>
                  <li className="flex items-center text-gray-700"><CheckCircle2 className="w-5 h-5 text-blue-500 mr-3" /> {t('home.services.clean')}</li>
                </ul>
                <Link to="/services" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors">
                  {t('home.services.learnMore')} <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 group">
              <div className="relative overflow-hidden">
                <img
                  src="/ext.jpg"
                  alt={t('home.services.exterior')}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('home.services.exterior')}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {t('home.services.exteriorDesc')}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700"><CheckCircle2 className="w-5 h-5 text-blue-500 mr-3" /> {t('home.services.factory')}</li>
                  <li className="flex items-center text-gray-700"><CheckCircle2 className="w-5 h-5 text-blue-500 mr-3" /> {t('home.services.weather')}</li>
                  <li className="flex items-center text-gray-700"><CheckCircle2 className="w-5 h-5 text-blue-500 mr-3" /> {t('home.services.curbAppeal')}</li>
                </ul>
                <Link to="/services" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors">
                  {t('home.services.learnMore')} <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">{t('home.process.title')}</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.process.subtitle')}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
          >
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-[1px] bg-gray-200"></div>
            
            {/* Step 1 */}
            <motion.div variants={fadeInUp} className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#4a68b1] flex items-center justify-center text-white text-2xl font-bold mb-6 relative z-10 shadow-lg shadow-blue-900/20">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('home.process.step1')}</h3>
              <p className="text-gray-600">{t('home.process.step1Desc')}</p>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div variants={fadeInUp} className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#4a68b1] flex items-center justify-center text-white text-2xl font-bold mb-6 relative z-10 shadow-lg shadow-blue-900/20">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('home.process.step2')}</h3>
              <p className="text-gray-600">{t('home.process.step2Desc')}</p>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div variants={fadeInUp} className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#4a68b1] flex items-center justify-center text-white text-2xl font-bold mb-6 relative z-10 shadow-lg shadow-blue-900/20">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('home.process.step3')}</h3>
              <p className="text-gray-600">{t('home.process.step3Desc')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#0a0a0a] flex flex-col lg:flex-row">
        <div className="trisalex-about-visual lg:w-1/2 relative min-h-[300px] md:min-h-[400px] lg:min-h-auto overflow-hidden">
          <img 
            src="/about.jpg" 
            alt="Professional Painter" 
            className="trisalex-about-image absolute inset-0 w-full h-full object-cover object-[68%_center] lg:object-center"
          />
        </div>
        <div className="lg:w-1/2 p-8 md:p-12 lg:p-24 flex flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{t('home.whyUs.title')} <span className="text-white font-light hidden md:inline">|</span></h2>
            <p className="text-lg md:text-xl text-gray-400 mb-8">{t('home.whyUs.subtitle')}</p>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              {t('home.whyUs.desc')}
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 rounded-full bg-[#4278c4] mr-4"></div>
                {t('home.whyUs.point1')}
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 rounded-full bg-[#4278c4] mr-4"></div>
                {t('home.whyUs.point2')}
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 rounded-full bg-[#4278c4] mr-4"></div>
                {t('home.whyUs.point3')}
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 rounded-full bg-[#4278c4] mr-4"></div>
                {t('home.whyUs.point4')}
              </li>
            </ul>
            
            <p className="text-gray-300 mb-10">
              <span className="border-b border-white pb-1 font-bold">{t('home.whyUs.goalLabel')}</span> {t('home.whyUs.goalDesc')}
            </p>
            
            <div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-[#4278c4] text-white font-bold py-3 px-8 rounded-full hover:bg-[#2e5da0] transition-colors duration-200 shadow-lg"
              >
                {t('home.whyUs.getQuote')} <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">{t('home.portfolio.title')}</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.portfolio.subtitle')}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12"
          >
            {[
              { id: 1, title: t('home.portfolio.previewItems.0.title'), category: t('home.portfolio.previewItems.0.category'), before: "/before.jpg", after: "/after.jpg" },
              { id: 2, title: t('home.portfolio.previewItems.1.title'), category: t('home.portfolio.previewItems.1.category'), before: "/before6.jpg", after: "/after6.jpg" },
            ].map((item) => (
              <motion.div key={item.id} variants={fadeInUp} className="flex flex-col">
                <div className="mb-4">
                  <span className="text-[#2e5da0] font-bold text-sm uppercase tracking-wider mb-1 block">{item.category}</span>
                  <h3 className="text-gray-900 font-bold text-2xl">{item.title}</h3>
                </div>
                <div className="shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden border border-gray-100">
                  <BeforeAfterSlider 
                    beforeImage={item.before} 
                    afterImage={item.after} 
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
                 <div className="text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center bg-[#4a68b1] text-white font-bold py-3 px-8 rounded-full hover:bg-[#3a5596] transition-colors duration-200 shadow-lg"
            >
              {t('home.portfolio.seeMore')} <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">{t('home.testimonials.title')}</h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('home.testimonials.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto mb-10"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-7 text-center shadow-xl shadow-black/20">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-yellow-300 mb-4">
                <Star className="w-7 h-7 fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t('home.testimonials.reviewCtaTitle')}</h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                {t('home.testimonials.reviewCtaText')}
              </p>
              <a
                href={googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#1f3f84] px-6 py-3 text-sm font-bold hover:bg-gray-100 transition-colors"
              >
                {t('home.testimonials.reviewCtaButton')} <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </motion.div>
          
          <TestimonialMarquee />
        </div>
      </section>

    </div>
  );
}
