"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, Globe, Truck, Phone, Laptop, Tablet, ChevronRight, ShoppingBag } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, animate, useScroll, useMotionValueEvent, LazyMotion, domAnimation, useAnimation } from "framer-motion"
import { Logo } from "@/components/logo"
import { BrandButton } from "@/components/brand-button"
import { VideoBackground } from "@/components/video-background"

export default function Home() {
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

      // 3. Fade in buttons
      // A tiny delay can sometimes help ensure the DOM update from setButtonAppearance is fully processed
      // before the fade-in starts, though often not strictly necessary with async/await.
      await Promise.all([
        contactOpacityControls.start({ opacity: 1 }, { duration: 0.25, ease: "easeInOut", delay: 0.15 }),
        auctionOpacityControls.start({ opacity: 1 }, { duration: 0.25, ease: "easeInOut", delay: 0.15 })
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
            const headerOffset = headerInnerRef.current ? headerInnerRef.current.offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset - 20; // 20px buffer

            window.history.pushState(null, '', hash);

            animate(window.scrollY, offsetPosition, {
              type: "spring",
              stiffness: 120,
              damping: 25, // Increased damping for smoother stop
              restDelta: 0.01,
              onUpdate: latest => {
                window.scrollTo(0, latest);
              }
            });
          }
        }
      }
    };

    document.addEventListener('click', handleNavClick);
    return () => {
      document.removeEventListener('click', handleNavClick);
    };
  }, []); // Empty dependency array: runs once on mount to set up/clean up listener

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
      width: '800px',
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
            className={`relative mx-auto flex items-center px-4 md:px-6 backdrop-blur-md ${isShrunk ? 'shadow-md' : ''}`}
            variants={containerVariants}
            animate={isShrunk ? 'shrunk' : 'initial'}
            initial="initial"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ willChange: 'transform, width, border-radius, padding, background-color, border-color' }}
          >
            <motion.div
              variants={logoVariants}
              animate={isShrunk ? 'shrunk' : 'initial'}
              initial="initial"
              style={{ transformOrigin: 'left center', willChange: 'transform', cursor: 'pointer' }}
              onClick={() => {
                animate(window.scrollY, 0, {
                  type: "spring",
                  stiffness: 120,
                  damping: 25,
                  restDelta: 0.01,
                  onUpdate: latest => {
                    window.scrollTo(0, latest);
                  }
                });
                window.history.pushState(null, '', window.location.pathname);
              }}
            >
              <Logo />
            </motion.div>

            <nav className="hidden md:flex gap-6 absolute left-1/2 transform -translate-x-1/2">
              <Link href="#about" className="text-sm font-medium text-[#222222] hover:text-[#2F7971] transition-colors">
                About
              </Link>
              <Link href="#process" className="text-sm font-medium text-[#222222] hover:text-[#2F7971] transition-colors">
                Our Process
              </Link>
              <Link href="#grading" className="text-sm font-medium text-[#222222] hover:text-[#2F7971] transition-colors">
                Grading System
              </Link>
              <Link href="#shipping" className="text-sm font-medium text-[#222222] hover:text-[#2F7971] transition-colors">
                Shipping
              </Link>
            </nav>

            <div className="absolute top-1/2 right-4 md:right-6 transform -translate-y-1/2 flex items-center gap-4">
              <motion.a
                href="#contact"
                className={`inline-flex h-10 items-center justify-center rounded-full border-2 border-[#712F79] bg-transparent text-sm font-medium text-[#712F79] shadow-sm transition-colors hover:bg-[#712F79] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5A2964] overflow-hidden whitespace-nowrap ${buttonAppearance.contactShowsText ? 'px-6' : 'px-3'}`}
                style={{ transformOrigin: 'right center', willChange: 'transform' }}
                initial={{ opacity: 1 }}
                animate={contactOpacityControls}
              >
                {buttonAppearance.contactShowsText ? 
                  <span style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>Contact Us</span> :
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
                  <span style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>Become a Buyer</span> :
                  <ShoppingBag className="h-5 w-5 flex-shrink-0" />
                }
              </motion.a>
            </div>
          </motion.div>
        </motion.header>
        <main className="flex-1">
          <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-purple-700 to-purple-900"></div>

            <VideoBackground src="/hero.webm" />

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
                  Upgrade Your Inventory with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
                    Premium Devices
                  </span>
                </h1>
                <p className="max-w-[800px] mx-auto text-white/90 text-lg md:text-xl">
                Reyder Enterprises offers Daily Access to Premium Mobile Inventory.
                Join top resellers in exclusive auctions built for speed, profit, and serious volume.
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
                    Create an Account
                  </BrandButton>
                  <Link
                    href="#contact"
                    className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#712F79] bg-transparent px-8 text-sm font-medium text-[#712F79] shadow-lg backdrop-blur-md transition-all hover:bg-[#712F79] hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A2964]"
                  >
                    Contact Us
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
                  <p className="text-sm text-[#222222] mt-1">Devices Processed</p>
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
                  <p className="text-sm text-[#222222] mt-1">Business Partners</p>
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
                  <p className="text-sm text-[#222222] mt-1">Years in Business</p>
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
                  <p className="text-sm text-[#222222] mt-1">Countries Served</p>
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
                    About Reyder Enterprises
                  </h2>
                  <p className="max-w-[900px] text-[#222222] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Reyder Enterprises is a leading mobile device wholesale company providing high-quality devices to
                    businesses worldwide. Our exclusive auctions platform connects you with premium inventory at
                    competitive prices.
                  </p>
                </motion.div>
              </div>
              <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col justify-center space-y-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#5A2964]">Premium Inventory</h3>
                      <p className="text-[#222222] mt-2">
                        Access a wide selection of thoroughly tested and graded mobile devices from leading manufacturers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                      <Laptop className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#5A2964]">Competitive Pricing</h3>
                      <p className="text-[#222222] mt-2">
                        Our auction platform ensures fair market pricing for all inventory, helping you maximize your
                        margins.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg">
                      <Tablet className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#5A2964]">Trusted Partner</h3>
                      <p className="text-[#222222] mt-2">
                        Join hundreds of businesses who trust Reyder Enterprises for their inventory needs year after
                        year.
                      </p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-green-500 opacity-30 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
                      <Image
                        src="/about-image.jpg"
                        width={600}
                        height={400}
                        alt="Mobile devices showcase"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-700/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-medium">Premium devices, thoroughly tested and graded</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="process" className="w-full py-20 md:py-32 bg-[#F7FAF9] overflow-hidden">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 md:mb-24">
                 <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#5A2964]">Our Streamlined Process</h2>
                 <p className="max-w-[700px] mx-auto text-[#222222] md:text-xl/relaxed">
                   Follow our rigorous steps ensuring quality and security for every device.
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
                          src="/data-wiping.jpg"
                          width={400}
                          height={250}
                          alt="Secure data wiping"
                          className="rounded-lg w-full h-auto object-cover mb-4 shadow-sm"
                        />
                        <h3 className="text-2xl font-semibold mb-2 text-[#5A2964] text-center md:text-left">1. Secure Data Wiping</h3>
                        <p className="text-[#222222] text-center md:text-left">
                          All devices undergo certified, secure data wiping procedures to protect privacy and ensure compliance.
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
                          src="/cleaning.jpg"
                          width={400}
                          height={250}
                          alt="Professional Cleaning"
                          className="rounded-lg w-full h-auto object-cover mb-4 shadow-sm"
                        />
                        <h3 className="text-2xl font-semibold mb-2 text-[#5A2964] text-center md:text-left">2. Professional Cleaning</h3>
                        <p className="text-[#222222] text-center md:text-left">
                          Devices are meticulously cleaned and sanitized to meet high presentation standards.
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
                            src="/testing.jpg"
                            width={400}
                            height={250}
                            alt="Comprehensive Testing"
                            className="rounded-lg w-full h-auto object-cover mb-4 shadow-sm"
                          />
                          <h3 className="text-2xl font-semibold mb-2 text-[#5A2964] text-center md:text-left">3. Comprehensive Testing</h3>
                          <p className="text-[#222222] text-center md:text-left">
                            Rigorous multi-point testing ensures full hardware and software functionality.
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
                            src="/grading.jpg"
                            width={400}
                            height={250}
                            alt="Detailed Grading"
                            className="rounded-lg w-full h-auto object-cover mb-4 shadow-sm"
                          />
                          <h3 className="text-2xl font-semibold mb-2 text-[#5A2964] text-center md:text-left">4. Detailed Grading</h3>
                          <p className="text-[#222222] text-center md:text-left">
                             Expert technicians assign grades based on a transparent, detailed system.
                          </p>
                        </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          <section 
            id="grading" 
            ref={gradingSystemRef} 
            className="relative w-full py-16 md:py-20"
            style={{
              background: `linear-gradient(to bottom, #F7FAF9 0%, #F7FAF9 80%, transparent 100%)`,
              marginBottom: "-50px",
              zIndex: 5,
              position: "relative"
            }}
          >
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            
            <div className="container relative z-10 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#5A2964]">Our Grading System</h2>
                  <p className="max-w-[900px] text-[#222222] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We use a comprehensive in-house grading system to ensure transparency and quality.
                  </p>
                </motion.div>
              </div>
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 md:grid-cols-3">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isGradingSystemVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="col-span-3 md:col-span-1"
                  >
                    <div className="relative h-full overflow-hidden rounded-2xl bg-[#E8DFF1] p-6 text-[#222222] shadow-xl border border-gray-200">
                      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#5A2964]/10"></div>
                      <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#5A2964]/10"></div>
                      <h3 className="text-2xl font-bold mb-4 text-[#5A2964]">Premium Grade</h3>
                      <p className="mb-6">Our highest quality devices with minimal to no signs of use.</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5A2964] text-white font-bold">
                            A+
                          </div>
                          <span>Like new condition</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5A2964] text-white font-bold">
                            A
                          </div>
                          <span>Excellent condition</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5A2964] text-white font-bold">
                            A-
                          </div>
                          <span>Very good condition</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isGradingSystemVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="col-span-3 md:col-span-1"
                  >
                    <div className="relative h-full overflow-hidden rounded-2xl bg-[#E4F5D2] p-6 text-[#222222] shadow-xl border border-gray-200">
                      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#4B7918]/10"></div>
                      <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#4B7918]/10"></div>
                      <h3 className="text-2xl font-bold mb-4 text-[#5A2964]">Standard Grade</h3>
                      <p className="mb-6">Good quality devices with minor signs of use but fully functional.</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4B7918] text-white font-bold">
                            B+
                          </div>
                          <span>Good condition</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4B7918] text-white font-bold">
                            B
                          </div>
                          <span>Fair condition</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4B7918] text-white font-bold">
                            B-
                          </div>
                          <span>Acceptable condition</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isGradingSystemVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="col-span-3 md:col-span-1"
                  >
                    <div className="relative h-full overflow-hidden rounded-2xl bg-[#DDE9F0] p-6 text-[#222222] shadow-xl border border-gray-200">
                      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#5A2964]/10"></div>
                      <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#5A2964]/10"></div>
                      <h3 className="text-2xl font-bold mb-4 text-[#5A2964]">Economy Grade</h3>
                      <p className="mb-6">Functional devices with noticeable signs of use at lower price points.</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5A2964] text-white font-bold">
                            C+
                          </div>
                          <span>Moderate wear</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5A2964] text-white font-bold">
                            C
                          </div>
                          <span>Heavy wear</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5A2964] text-white font-bold">
                            C-
                          </div>
                          <span>Significant wear</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isGradingSystemVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-12 text-center"
                >
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-[#2F7971] transition-colors hover:underline underline-offset-4"
                  >
                    Learn more about our grading system
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>

          <div 
            className="w-full h-[280px] bg-[url('/purple.png')] bg-no-repeat bg-center bg-[size:180%_100%] relative z-10" 
            style={{ marginTop: "-50px", marginBottom: "-120px" }}
          ></div>

          <section id="shipping" ref={shippingRef} className="relative w-full py-20 md:py-32 bg-[#712f79] isolate z-5">
            <div className="absolute inset-0 z-10 bg-[url('/27.png')] bg-no-repeat bg-bottom bg-[size:75%_77%]"></div>
            
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
                    We Ship Everywhere.
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
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 opacity-20 blur-lg"></div>
                    <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl">
                      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple-50"></div>
                      
                      <div className="absolute top-0 right-32 w-48 h-48 bg-[url('/50.png')] bg-cover bg-no-repeat opacity-100 mix-blend-multiply z-0"></div>

                      <div className="relative z-10">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg mb-6">
                          <Truck className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-[#5A2964]">Domestic Shipping</h3>
                        <p className="text-[#222222] mb-6">
                          We offer <span className="font-bold text-[#6BAD23]">FREE shipping</span> on all domestic orders
                          within the United States. Your devices will be carefully packaged and shipped with tracking
                          information provided.
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971]/10 text-[#2F7971]">
                              <Check className="h-4 w-4" />
                            </div>
                            <span className="text-[#222222]">Free shipping on all US orders</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971]/10 text-[#2F7971]">
                              <Check className="h-4 w-4" />
                            </div>
                            <span className="text-[#222222]">Secure packaging for safe delivery</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971]/10 text-[#2F7971]">
                              <Check className="h-4 w-4" />
                            </div>
                            <span className="text-[#222222]">Tracking information provided</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971]/10 text-[#2F7971]">
                              <Check className="h-4 w-4" />
                            </div>
                            <span className="text-[#222222]">Fast processing times</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isShippingVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative"
                  >
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 opacity-20 blur-lg"></div>
                    <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl">
                      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-50"></div>
                      <div className="relative">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg mb-6">
                          <Globe className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-[#5A2964]">International Shipping</h3>
                        <p className="text-[#222222] mb-6">
                          We ship to businesses worldwide. International shipping rates are calculated based on
                          destination and order volume. Contact us for custom shipping quotes.
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971]/10 text-[#2F7971]">
                              <Check className="h-4 w-4" />
                            </div>
                            <span className="text-[#222222]">Worldwide shipping available</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971]/10 text-[#2F7971]">
                              <Check className="h-4 w-4" />
                            </div>
                            <span className="text-[#222222]">Customs documentation assistance</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971]/10 text-[#2F7971]">
                              <Check className="h-4 w-4" />
                            </div>
                            <span className="text-[#222222]">Volume discounts available</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7971]/10 text-[#2F7971]">
                              <Check className="h-4 w-4" />
                            </div>
                            <span className="text-[#222222]">International tracking provided</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          <section 
            className="w-full py-48 md:py-64 relative bg-[#712f79] z-10" 
            style={{ backgroundImage: 'radial-gradient(circle at center, #5A2964 0%, #712f79 70%)' }}
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
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                    Ready to Access Premium Mobile Devices?
                  </h2>
                  <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join our auctions platform today and discover high-quality mobile devices at competitive wholesale
                    prices.
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
                      Sign Up For Auctions
                    </BrandButton>
                    <p className="text-sm text-white/60">
                      Join hundreds of businesses already sourcing from Reyder Enterprises.
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
                  Get In Touch
                </h2>
                <p className="max-w-[900px] text-[#222222] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions or ready to get started? Contact us today!
                </p>
              </motion.div>
            </div>
            <div className="mx-auto max-w-4xl text-center flex flex-col md:flex-row gap-8 justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">Contact us on WhatsApp</h3>
                <p className="text-gray-600 mb-4">
                  Click the button below to start a chat with us on WhatsApp.
                </p>
                <BrandButton
                  href="#"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#6BAD23] px-8 text-sm font-medium text-white shadow-lg transition-colors hover:bg-[#4B7918] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B7918]"
                >
                  Chat on WhatsApp
                </BrandButton>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">Send us an Email</h3>
                <p className="text-gray-600 mb-4">
                  Click the button below to send us an email.
                </p>
                <BrandButton
                  href="mailto:sales@reyderenterprises.com"
                  variant="green"
                  size="lg"
                >
                  Send Email
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
                © {new Date().getFullYear()} Reyder Enterprises. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-sm text-[#2F7971] hover:underline underline-offset-4">
                Terms
              </Link>
              <Link href="#" className="text-sm text-[#2F7971] hover:underline underline-offset-4">
                Privacy
              </Link>
              <Link href="#contact" className="text-sm text-[#2F7971] hover:underline underline-offset-4">
                Contact
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </LazyMotion>
  )
}
