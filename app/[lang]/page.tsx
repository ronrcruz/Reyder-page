"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, Globe, Truck, Phone, Laptop, Tablet, ChevronRight, ShoppingBag } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, animate, useScroll, useMotionValueEvent, LazyMotion, domAnimation, useAnimation } from "framer-motion"
import { Logo } from "@/components/logo"
import { BrandButton } from "@/components/brand-button"
import { VideoBackground } from "@/components/video-background"
import { useTranslation } from "../../lib/i18n-client"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function Home({ params: { lang } }: { params: { lang: string } }) {
  const { t } = useTranslation(lang, 'common')

  const [isVisible, setIsVisible] = useState({
    process: false,
    grading: false,
    shipping: false,
  })

  const processRef = useRef<HTMLDivElement>(null)
  const gradingRef = useRef<HTMLDivElement>(null)
  const shippingRef = useRef<HTMLDivElement>(null)

  // Keep refs/states for other sections if needed
  const gradingSystemRef = useRef<HTMLDivElement>(null)
  const [isGradingSystemVisible, setIsGradingSystemVisible] = useState(false)
  const [isShippingVisible, setIsShippingVisible] = useState(false)
  const [displayedStatsValues, setDisplayedStatsValues] = useState({
    devices: 0,
    partners: 0,
    years: 0,
    countries: 0,
  })

  // --- Scroll Animation State & Refs ---
  const { scrollY } = useScroll();
  const [isShrunk, setIsShrunk] = useState(false);
  const shrinkThreshold = 90;

  const headerInnerRef = useRef<HTMLDivElement>(null);
  const currentScrollAnimation = useRef<(() => void) | null>(null); // Ref to store current scroll animation stop function

  // NEW: State to control the actual content and padding of buttons
  // This state is updated only AFTER fade-out is complete.
  const [buttonAppearance, setButtonAppearance] = useState({
    contactShowsText: true,
    auctionShowsText: true,
  });

  // Update isShrunk based on scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsShrunk(latest > shrinkThreshold);
  });

  // --- Animation Controls for Buttons ---
  const contactOpacityControls = useAnimation();
  const auctionOpacityControls = useAnimation();
  const isInitialMount = useRef(true);

  // Effect for initial setup on mount
  useEffect(() => {
    const initialScrollY = window.scrollY;
    const initiallyShrunk = initialScrollY > shrinkThreshold;
    setIsShrunk(initiallyShrunk); // Set reactive isShrunk state
    setButtonAppearance({       // Set initial button appearance directly
      contactShowsText: !initiallyShrunk,
      auctionShowsText: !initiallyShrunk,
    });
    contactOpacityControls.set({ opacity: 1 }); // Ensure visible on mount
    auctionOpacityControls.set({ opacity: 1 }); // Ensure visible on mount
    isInitialMount.current = false;
  }, [contactOpacityControls, auctionOpacityControls, shrinkThreshold]); // Ran once on mount

  // Effect for animations when isShrunk changes (after initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      return; // Don't run animations on initial setup
    }

    const animateButtonTransition = async () => {
      // 1. Fade out buttons
      await Promise.all([
        contactOpacityControls.start({ opacity: 0 }, { duration: 0.25, ease: "easeInOut" }),
        auctionOpacityControls.start({ opacity: 0 }, { duration: 0.25, ease: "easeInOut" })
      ]);

      // 2. Update button appearance state (triggers re-render with new content/padding)
      // This happens while buttons are opacity: 0
      setButtonAppearance({
        contactShowsText: !isShrunk,
        auctionShowsText: !isShrunk,
      });

      // NEW: Explicitly wait for a short period to allow React to process the state update
      // and re-render the button content/styles in the DOM before fading back in.
      await new Promise(resolve => setTimeout(resolve, 50)); // 50ms pause

      // 3. Fade in buttons (now without their own internal delay property)
      await Promise.all([
        contactOpacityControls.start({ opacity: 1 }, { duration: 0.25, ease: "easeInOut" }),
        auctionOpacityControls.start({ opacity: 1 }, { duration: 0.25, ease: "easeInOut" })
      ]);
    };

    animateButtonTransition();
  }, [isShrunk, contactOpacityControls, auctionOpacityControls]); // Note: isInitialMount.current is not a dependency here
  // --- End Animation Controls for Buttons ---

  // Smooth scroll for navigation links
  useEffect(() => {
    const handleNavClick = (event: MouseEvent) => {
      let target = event.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          event.preventDefault();
          const hash = href;
          const targetElement = document.querySelector(hash) as HTMLElement;

          if (targetElement) {
            if (currentScrollAnimation.current) {
              currentScrollAnimation.current(); // Stop existing animation
            }

            const headerOffset = headerInnerRef.current ? headerInnerRef.current.offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset - 20; // 20px buffer

            window.history.pushState(null, '', hash);

            const animationControls = animate(window.scrollY, offsetPosition, {
              type: "spring",
              stiffness: 120,
              damping: 25,
              restDelta: 0.01,
              onUpdate: latest => {
                window.scrollTo(0, latest);
              },
              onComplete: () => {
                currentScrollAnimation.current = null; // Clear on completion
              }
            });
            currentScrollAnimation.current = animationControls.stop; // Store stop function
          }
        }
      }
    };

    document.addEventListener('click', handleNavClick);
    return () => {
      document.removeEventListener('click', handleNavClick);
    };
  }, []);

  // Effect to handle user scroll interruption
  useEffect(() => {
    const handleUserScroll = () => {
      if (currentScrollAnimation.current) {
        currentScrollAnimation.current();
        currentScrollAnimation.current = null;
      }
    };

    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchmove', handleUserScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
      if (currentScrollAnimation.current) {
        currentScrollAnimation.current(); // Stop on unmount if active
      }
    };
  }, []);

  // --- Animation Variants (Header Bar) ---
  const headerVariants = {
    initial: {
      top: '0px',
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    shrunk: {
      top: '1.5rem', // Add 1rem top offset when shrunk
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  const containerVariants = {
    initial: {
      width: '100%',
      borderRadius: '0px',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: 'rgba(229, 231, 235, 1)',
      borderBottomWidth: '1px',
    },
    shrunk: {
      width: '960px',
      borderRadius: '999px',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      backgroundColor: 'rgba(247, 250, 249, 0.95)',
      borderColor: 'rgba(229, 231, 235, 0)',
      borderBottomWidth: '0px',
    }
  };

  const logoVariants = {
    initial: { scale: 1 },
    shrunk: { scale: 0.85 }
  };
  // --- End Animation Variants ---

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === gradingSystemRef.current) {
            setIsGradingSystemVisible(entry.isIntersecting)
          } else if (entry.target === shippingRef.current) {
            setIsShippingVisible(entry.isIntersecting)
          }
        })
      },
      { threshold: 0.3 },
    )

    const refsToObserve = [gradingSystemRef, shippingRef]
    
    refsToObserve.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
       refsToObserve.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex min-h-screen flex-col bg-[#F7FAF9] text-[#222222]">
        <motion.header
          className="sticky z-50 w-full"
          variants={headerVariants}
          animate={isShrunk ? 'shrunk' : 'initial'}
          initial="initial"
          style={{ willChange: 'top' }}
        >
          <motion.div
            ref={headerInnerRef}
            layout
            className={`relative mx-auto flex items-center justify-between px-4 md:px-6 backdrop-blur-md ${isShrunk ? 'shadow-md' : ''}`}
            variants={containerVariants}
            animate={isShrunk ? 'shrunk' : 'initial'}
            initial="initial"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ willChange: 'transform, width, border-radius, padding, background-color, border-color' }}
          >
            <div className="flex items-center">
              <motion.div
                variants={logoVariants}
                animate={isShrunk ? 'shrunk' : 'initial'}
                initial="initial"
                style={{ transformOrigin: 'left center', willChange: 'transform', cursor: 'pointer' }}
                onClick={() => {
                  if (currentScrollAnimation.current) {
                    currentScrollAnimation.current(); // Stop existing animation
                  }
                  const animationControls = animate(window.scrollY, 0, {
                    type: "spring",
                    stiffness: 120,
                    damping: 25,
                    restDelta: 0.01,
                    onUpdate: latest => {
                      window.scrollTo(0, latest);
                    },
                    onComplete: () => {
                      currentScrollAnimation.current = null; // Clear on completion
                    }
                  });
                  currentScrollAnimation.current = animationControls.stop; // Store stop function
                  window.history.pushState(null, '', window.location.pathname);
                }}
              >
                <Logo />
              </motion.div>
              <div className="ml-4">
                <LanguageSwitcher />
              </div>
            </div>

            <nav className="hidden md:flex gap-6 absolute left-1/2 transform -translate-x-1/2">
              <Link href="#about" className="text-sm font-medium text-[#222222] hover:text-[#2F7971] transition-colors">
                {t('nav_about')}
              </Link>
              <Link href="#process" className="text-sm font-medium text-[#222222] hover:text-[#2F7971] transition-colors">
                {t('nav_process')}
              </Link>
              <Link href="#grading" className="text-sm font-medium text-[#222222] hover:text-[#2F7971] transition-colors">
                {t('nav_grading')}
              </Link>
              <Link href="#shipping" className="text-sm font-medium text-[#222222] hover:text-[#2F7971] transition-colors">
                {t('nav_shipping')}
              </Link>
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              <motion.a
                href="#contact"
                className={`inline-flex h-10 items-center justify-center rounded-full border-2 border-[#712F79] bg-transparent text-sm font-medium text-[#712F79] shadow-sm transition-colors hover:bg-[#712F79] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5A2964] overflow-hidden whitespace-nowrap ${buttonAppearance.contactShowsText ? 'px-6' : 'px-3'}`}
                style={{ transformOrigin: 'right center', willChange: 'transform' }}
                initial={{ opacity: 1 }}
                animate={contactOpacityControls}
              >
                {buttonAppearance.contactShowsText ? 
                  <span style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>{t('nav_button_contact')}</span> :
                  <Phone className="h-5 w-5 flex-shrink-0" />
                }
              </motion.a>
              <motion.a
                href="https://auctions.reyderenterprises.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-10 items-center justify-center rounded-full bg-[#6BAD23] text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#4B7918] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4B7818] overflow-hidden whitespace-nowrap ${buttonAppearance.auctionShowsText ? 'px-6' : 'px-3'}`}
                style={{ transformOrigin: 'right center', willChange: 'transform' }}
                initial={{ opacity: 1 }}
                animate={auctionOpacityControls}
              >
                {buttonAppearance.auctionShowsText ? 
                  <span style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>{t('nav_button_buyer')}</span> :
                  <ShoppingBag className="h-5 w-5 flex-shrink-0" />
                }
              </motion.a>
            </div>
          </motion.div>
        </motion.header>
        <main className="flex-1">
          <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden">
            {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-purple-700 to-purple-900"></div> */}

            <VideoBackground src="/hero2.webm" />

            <div 
              className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/60 backdrop-blur-[1px] backdrop-brightness-90"
            ></div>

            <div className="container relative z-30 px-4 md:px-6 py-12 md:py-24 lg:py-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center space-y-8"
              >
                <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                  {t('hero_title_line1')}{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
                    {t('hero_title_line2_highlight')}
                  </span>
                </h1>
                <p className="max-w-[800px] mx-auto text-white/90 text-lg md:text-xl">
                  {t('hero_subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <BrandButton
                    href="https://auctions.reyderenterprises.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="green"
                    size="lg"
                    icon
                  >
                    {t('hero_button_create_account')}
                  </BrandButton>
                  <Link
                    href="#contact"
                    className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#712F79] bg-transparent px-8 text-sm font-medium text-[#712F79] shadow-lg backdrop-blur-md transition-all hover:bg-[#712F79] hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A2964]"
                  >
                    {t('hero_button_contact_us')}
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="w-full py-12">
            <div className="container px-4 md:px-6" style={{ transform: 'translateY(-12px)' }}>
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                onViewportEnter={() => {
                  const controls = {
                    devices: animate(0, 10000, {
                      duration: 1.5,
                      ease: "easeOut",
                      onUpdate(value) {
                        setDisplayedStatsValues(prev => ({ ...prev, devices: Math.round(value) }));
                      }
                    }),
                    partners: animate(0, 500, {
                      duration: 1.5,
                      ease: "easeOut",
                      onUpdate(value) {
                        setDisplayedStatsValues(prev => ({ ...prev, partners: Math.round(value) }));
                      }
                    }),
                    years: animate(0, 15, {
                      duration: 1.5,
                      ease: "easeOut",
                      onUpdate(value) {
                        setDisplayedStatsValues(prev => ({ ...prev, years: Math.round(value) }));
                      }
                    }),
                    countries: animate(0, 100, {
                      duration: 1.5,
                      ease: "easeOut",
                      onUpdate(value) {
                        setDisplayedStatsValues(prev => ({ ...prev, countries: Math.round(value) }));
                      }
                    }),
                  };

                  return () => {
                    controls.devices.stop();
                    controls.partners.stop();
                    controls.years.stop();
                    controls.countries.stop();
                  };
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#5A2964]">
                    {displayedStatsValues.devices.toLocaleString()}
                  </div>
                  <p className="text-sm text-[#222222] mt-1">{t('stats_devices_processed')}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#5A2964]">
                    {displayedStatsValues.partners}+
                  </div>
                  <p className="text-sm text-[#222222] mt-1">{t('stats_business_partners')}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#5A2964]">
                    {displayedStatsValues.years}+
                  </div>
                  <p className="text-sm text-[#222222] mt-1">{t('stats_years_in_business')}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#5A2964]">
                    {displayedStatsValues.countries}+
                  </div>
                  <p className="text-sm text-[#222222] mt-1">{t('stats_countries_served')}</p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <div className="container px-4 md:px-6">
            <hr className="my-12 border-t border-purple-300" />
          </div>

          <section 
            id="about" 
            className="relative w-full py-20 md:py-32 overflow-visible before:content-[''] before:absolute before:inset-x-0 before:-top-32 before:-bottom-32 before:-z-10 before:bg-[radial-gradient(circle_at_50%_40%,#AA82AF_0%,#E8DFF1_35%,#DDF2CC_100%)]"
          >
            <div className="container relative z-10 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#5A2964]">
                    {t('about_title')}
                  </h2>
                  <p className="max-w-[900px] text-[#222222] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t('about_subtitle')}
                  </p>
                </motion.div>
              </div>
              <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-col justify-center space-y-8"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h4 className="text-2xl font-semibold text-[#5A2964] mb-3 leading-tight">
                      {t('about_feature_title_quality')}
                    </h4>
                    <p className="text-[#3a3a3a] text-md mb-8">
                      {t('about_feature_text_quality')}
                    </p>
                  </motion.div>

                  {[
                    {
                      icon: <Phone className="h-6 w-6" />,
                      title: t('about_feature1_title'),
                      description: t('about_feature1_desc'),
                      gradient: "from-purple-600 to-purple-700",
                      delay: 0.5
                    },
                    {
                      icon: <Laptop className="h-6 w-6" />,
                      title: t('about_feature2_title'),
                      description: t('about_feature2_desc'),
                      gradient: "from-green-500 to-green-600",
                      delay: 0.7
                    },
                    {
                      icon: <Tablet className="h-6 w-6" />,
                      title: t('about_feature3_title'),
                      description: t('about_feature3_desc'),
                      gradient: "from-purple-600 to-purple-700",
                      delay: 0.9
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.5, delay: feature.delay }}
                      className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/60"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${feature.gradient} text-white shadow-md flex-shrink-0`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#5A2964]">{feature.title}</h3>
                          <p className="text-[#222222] mt-2">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-green-500 opacity-30 blur-xl"></div>
                    <motion.div
                      className="relative overflow-hidden rounded-2xl bg-white shadow-xl"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="/manhat.png"
                        width={600}
                        height={400}
                        alt={t('about_image_alt')}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-700/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-semibold text-sm tracking-tight">{t('about_image_caption')}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="process" className="w-full py-20 md:py-32 bg-[#F7FAF9] overflow-hidden">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 md:mb-24">
                 <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#5A2964]">{t('process_title')}</h2>
                 <p className="max-w-[700px] mx-auto text-[#222222] md:text-xl/relaxed">
                   {t('process_subtitle')}
                 </p>
              </div>

              <div className="relative max-w-5xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-300 via-purple-500 to-green-500 transform -translate-x-1/2 hidden md:block rounded-full"></div>

                <div className="space-y-16 md:space-y-24">

                  <div className="relative grid md:grid-cols-2 gap-8 items-center">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 md:translate-y-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                      1
                    </div>
                    <div className="md:order-1 md:pr-16 lg:pr-24">
                       <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                         <Image
                          src="/resetiPhone.jpeg"
                          width={400}
                          height={250}
                          alt="Secure data wiping"
                          className="rounded-lg w-full h-auto object-cover mb-4 shadow-sm"
                        />
                        <h3 className="text-2xl font-semibold mb-2 text-[#5A2964] text-center md:text-left">{t('process_step1_title')}</h3>
                        <p className="text-[#222222] text-center md:text-left">
                          {t('process_step1_desc')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative grid md:grid-cols-2 gap-8 items-center">
                     <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 md:translate-y-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                      2
                    </div>
                    <div className="md:order-2 md:pl-16 lg:pl-24">
                       <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                         <Image
                          src="/cleaningiPhone.jpeg"
                          width={400}
                          height={250}
                          alt="Professional Cleaning"
                          className="rounded-lg w-full h-auto object-cover mb-4 shadow-sm"
                        />
                        <h3 className="text-2xl font-semibold mb-2 text-[#5A2964] text-center md:text-left">{t('process_step2_title')}</h3>
                        <p className="text-[#222222] text-center md:text-left">
                          {t('process_step2_desc')}
                        </p>
                       </div>
                    </div>
                  </div>

                  <div className="relative grid md:grid-cols-2 gap-8 items-center">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 md:translate-y-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                      3
                    </div>
                     <div className="md:order-1 md:pr-16 lg:pr-24">
                       <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                          <Image
                            src="/diagnose.jpeg"
                            width={400}
                            height={250}
                            alt="Comprehensive Testing"
                            className="rounded-lg w-full h-auto object-cover mb-4 shadow-sm"
                          />
                          <h3 className="text-2xl font-semibold mb-2 text-[#5A2964] text-center md:text-left">{t('process_step3_title')}</h3>
                          <p className="text-[#222222] text-center md:text-left">
                            {t('process_step3_desc')}
                          </p>
                       </div>
                    </div>
                  </div>

                   <div className="relative grid md:grid-cols-2 gap-8 items-center">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 md:translate-y-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                      4
                    </div>
                    <div className="md:order-2 md:pl-16 lg:pl-24">
                       <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                          <Image
                            src="/grading.jpeg"
                            width={400}
                            height={250}
                            alt="Detailed Grading"
                            className="rounded-lg w-full h-auto object-cover mb-4 shadow-sm"
                          />
                          <h3 className="text-2xl font-semibold mb-2 text-[#5A2964] text-center md:text-left">{t('process_step4_title')}</h3>
                          <p className="text-[#222222] text-center md:text-left">
                             {t('process_step4_desc')}
                          </p>
                        </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          <div 
            className="w-full h-[280px] bg-[url('/purple.png')] bg-no-repeat bg-center bg-[size:180%_100%] relative z-10" 
            style={{ marginTop: "-50px", marginBottom: "-120px" }}
          ></div>

          <section id="shipping" ref={shippingRef} className="relative w-full py-20 md:py-32 bg-[#712f79] isolate z-5 overflow-hidden">
            <div
              className="absolute top-[250px] left-[-225px] -translate-y-1/2 w-[500px] h-[600px] z-10 bg-[url('/tape1.png')] bg-contain bg-center bg-no-repeat opacity-100 transform -rotate-5"
              aria-hidden="true"
            ></div>
            <div
              className="absolute top-1/2 right-[-50px] -translate-y-1/2 w-[280px] h-[800px] z-10 bg-[url('/sidebubble.png')] bg-contain bg-center bg-no-repeat opacity-100 transform rotate-5"
              aria-hidden="true"
            ></div>
            <div className="container px-4 md:px-6 relative z-20">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#ffffff]"> 
                    {t('shipping_title')}
                  </h2>
                </motion.div>
              </div>
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isShippingVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative overflow-visible"
                  >
                    <div className="relative overflow-hidden rounded-2xl p-8">
                      <div className="absolute inset-0 bg-[url('/cardboard3.jpg')] bg-cover bg-center bg-no-repeat -scale-x-100" aria-hidden="true"></div>
                      <div className="relative z-10">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg mb-6">
                          <Truck className="h-8 w-8" />
                        </div>
                        <div className="inline-block bg-slate-100 rounded-full px-4 py-1 mb-4">
                          <h3 className="text-2xl font-bold text-[#5A2964]">{t('shipping_domestic_title')}</h3>
                        </div>
                        <div className="bg-black/25 rounded-md p-3">
                          <p className="text-slate-100 mb-4">
                            <span dangerouslySetInnerHTML={{ __html: t('shipping_domestic_desc').replace("FREE shipping", "<span class=\"font-bold text-green-300\">FREE shipping</span>") }}></span>
                          </p>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971] text-white">
                                <Check className="h-4 w-4" />
                              </div>
                              <span className="text-slate-200">{t('shipping_domestic_li1')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971] text-white">
                                <Check className="h-4 w-4" />
                              </div>
                              <span className="text-slate-200">{t('shipping_domestic_li2')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971] text-white">
                                <Check className="h-4 w-4" />
                              </div>
                              <span className="text-slate-200">{t('shipping_domestic_li3')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971] text-white">
                                <Check className="h-4 w-4" />
                              </div>
                              <span className="text-slate-200">{t('shipping_domestic_li4')}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isShippingVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative"
                  >
                    <div className="relative overflow-hidden rounded-2xl p-8 bg-[url('/cardboard1.png')] bg-cover bg-center bg-no-repeat">
                      <div className="relative">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg mb-6">
                          <Globe className="h-8 w-8" />
                        </div>
                        <div className="inline-block bg-slate-100 rounded-full px-4 py-1 mb-4">
                          <h3 className="text-2xl font-bold text-[#5A2964]">{t('shipping_international_title')}</h3>
                        </div>
                        <div className="bg-black/25 rounded-md p-3">
                          <p className="text-slate-100 mb-4">
                            {t('shipping_international_desc')}
                          </p>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971] text-white">
                                <Check className="h-4 w-4" />
                              </div>
                              <span className="text-slate-200">{t('shipping_international_li1')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971] text-white">
                                <Check className="h-4 w-4" />
                              </div>
                              <span className="text-slate-200">{t('shipping_international_li2')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971] text-white">
                                <Check className="h-4 w-4" />
                              </div>
                              <span className="text-slate-200">{t('shipping_international_li3')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971] text-white">
                                <Check className="h-4 w-4" />
                              </div>
                              <span className="text-slate-200">{t('shipping_international_li4')}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="w-full py-48 md:py-64 relative z-10 bg-[url('/purple.png')] bg-[center_top_-12rem] bg-[length:170%_60%] bg-no-repeat"
          >
            <div className="container relative px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#5A2964]">
                    {t('cta_title')}
                  </h2>
                  <p className="max-w-[900px] text-[#222222] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t('cta_subtitle')}
                  </p>
                  <div className="mx-auto w-full max-w-sm space-y-4 pt-4">
                    <BrandButton
                      href="https://auctions.reyderenterprises.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="green"
                      size="lg"
                      icon
                    >
                      {t('cta_button_text')}
                    </BrandButton>
                    <p className="text-sm text-gray-600">
                      {t('cta_join_text')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <section id="contact" className="w-full py-20 md:py-32 bg-[#F7FAF9] relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#5A2964]">
                  {t('contact_title')}
                </h2>
                <p className="max-w-[900px] text-[#222222] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('contact_subtitle')}
                </p>
              </motion.div>
            </div>
            <div className="mx-auto max-w-4xl text-center flex flex-col md:flex-row gap-8 justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">{t('contact_whatsapp_title')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('contact_whatsapp_desc')}
                </p>
                <BrandButton
                  href="#"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#6BAD23] px-8 text-sm font-medium text-white shadow-lg transition-colors hover:bg-[#4B7918] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B7918]"
                >
                  {t('contact_whatsapp_button')}
                </BrandButton>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">{t('contact_email_title')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('contact_email_desc')}
                </p>
                <BrandButton
                  href="mailto:sales@reyderenterprises.com"
                  variant="green"
                  size="lg"
                >
                  {t('contact_email_button')}
                </BrandButton>
              </div>
            </div>
          </div>
        </section>
        <footer className="w-full border-t bg-white py-8">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <Logo size="small" />
              <p className="text-sm text-[#222222]">
                {t('footer_copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="#contact" className="text-sm text-[#2F7971] hover:underline underline-offset-4">
                {t('footer_contact_link')}
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </LazyMotion>
  )
} 