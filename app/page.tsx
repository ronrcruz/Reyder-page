"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Globe, Truck, Phone, Laptop, Tablet, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const [isVisible, setIsVisible] = useState({
    process: false,
    grading: false,
    shipping: false,
  })

  const processRef = useRef<HTMLDivElement>(null)
  const gradingRef = useRef<HTMLDivElement>(null)
  const shippingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === processRef.current) {
            setIsVisible((prev) => ({ ...prev, process: entry.isIntersecting }))
          } else if (entry.target === gradingRef.current) {
            setIsVisible((prev) => ({ ...prev, grading: entry.isIntersecting }))
          } else if (entry.target === shippingRef.current) {
            setIsVisible((prev) => ({ ...prev, shipping: entry.isIntersecting }))
          }
        })
      },
      { threshold: 0.2 },
    )

    if (processRef.current) observer.observe(processRef.current)
    if (gradingRef.current) observer.observe(gradingRef.current)
    if (shippingRef.current) observer.observe(shippingRef.current)

    return () => {
      if (processRef.current) observer.unobserve(processRef.current)
      if (gradingRef.current) observer.unobserve(gradingRef.current)
      if (shippingRef.current) observer.unobserve(shippingRef.current)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Reyder Enterprises Logo" width={150} height={50} className="h-auto" />
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-purple-700 transition-colors">
              About
            </Link>
            <Link href="#process" className="text-sm font-medium hover:text-purple-700 transition-colors">
              Our Process
            </Link>
            <Link href="#grading" className="text-sm font-medium hover:text-purple-700 transition-colors">
              Grading System
            </Link>
            <Link href="#shipping" className="text-sm font-medium hover:text-purple-700 transition-colors">
              Shipping
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="https://auctions.reyderenterprises.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              Visit Auctions Platform
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
            <div className="absolute inset-0 opacity-20">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="20" cy="20" r="25" fill="url(#radialGradient)" />
                <circle cx="80" cy="80" r="35" fill="url(#radialGradient)" />
              </svg>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          <div className="container relative px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Premium Mobile Device Wholesale
                </div>
                <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                  Elevate Your Inventory with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                    Premium Devices
                  </span>
                </h1>
                <p className="max-w-[600px] text-white/80 text-lg md:text-xl">
                  Access high-quality mobile devices through our exclusive auctions platform. Join industry
                  professionals sourcing the best wholesale inventory.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="https://auctions.reyderenterprises.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 px-8 text-sm font-medium text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-green-500/40 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  >
                    Join Our Auctions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="#process"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-green-500 to-purple-600 opacity-75 blur-xl"></div>
                  <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-2 shadow-2xl">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-2">
                        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 p-1 shadow-lg">
                          <Image
                            src="/phone-1.png"
                            width={180}
                            height={360}
                            alt="Premium smartphone"
                            className="rounded-lg object-cover h-auto w-full"
                          />
                        </div>
                        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-green-100 to-green-200 p-1 shadow-lg">
                          <Image
                            src="/phone-2.png"
                            width={180}
                            height={360}
                            alt="Premium smartphone"
                            className="rounded-lg object-cover h-auto w-full"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-green-100 to-green-200 p-1 shadow-lg">
                          <Image
                            src="/phone-3.png"
                            width={180}
                            height={360}
                            alt="Premium smartphone"
                            className="rounded-lg object-cover h-auto w-full"
                          />
                        </div>
                        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 p-1 shadow-lg">
                          <Image
                            src="/phone-4.png"
                            width={180}
                            height={360}
                            alt="Premium smartphone"
                            className="rounded-lg object-cover h-auto w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-purple-700">10K+</div>
                <p className="text-sm text-gray-500 mt-1">Devices Monthly</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-purple-700">500+</div>
                <p className="text-sm text-gray-500 mt-1">Business Partners</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-purple-700">99%</div>
                <p className="text-sm text-gray-500 mt-1">Satisfaction Rate</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-purple-700">24/7</div>
                <p className="text-sm text-gray-500 mt-1">Customer Support</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                  <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
                  About Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-700">
                  About Reyder Enterprises
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Premium Inventory</h3>
                    <p className="text-gray-500 mt-2">
                      Access a wide selection of thoroughly tested and graded mobile devices from leading manufacturers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg">
                    <Laptop className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Competitive Pricing</h3>
                    <p className="text-gray-500 mt-2">
                      Our auction platform ensures fair market pricing for all inventory, helping you maximize your
                      margins.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg">
                    <Tablet className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Trusted Partner</h3>
                    <p className="text-gray-500 mt-2">
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
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-green-500 opacity-30 blur-xl"></div>
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
                    <Image
                      src="/about-image.jpg"
                      width={600}
                      height={400}
                      alt="Mobile devices showcase"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-medium">Premium devices, thoroughly tested and graded</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" ref={processRef} className="w-full py-20 md:py-32 bg-gray-50 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                  <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
                  Our Process
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-700">Our Process</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At Reyder Enterprises, we ensure every device meets our rigorous quality standards through our
                  comprehensive process.
                </p>
              </motion.div>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-purple-500 to-green-500 transform -translate-x-1/2 hidden md:block"></div>
              <div className="mx-auto max-w-5xl">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={isVisible.process ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative grid md:grid-cols-2 gap-8 mb-16"
                >
                  <div className="md:text-right flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-purple-700 mb-2">1. Testing</h3>
                    <p className="text-gray-600">
                      Every device undergoes comprehensive testing to ensure functionality across all components and
                      features.
                    </p>
                  </div>
                  <div className="relative flex justify-start md:justify-start items-center">
                    <div className="absolute left-0 md:left-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl shadow-lg md:-translate-x-1/2 z-10">
                      1
                    </div>
                    <div className="ml-16 md:ml-8 bg-white rounded-xl p-4 shadow-lg border border-purple-100">
                      <Image
                        src="/testing.jpg"
                        width={400}
                        height={250}
                        alt="Device testing process"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={isVisible.process ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative grid md:grid-cols-2 gap-8 mb-16"
                >
                  <div className="md:order-2 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-purple-700 mb-2">2. Cleaning</h3>
                    <p className="text-gray-600">
                      Devices are professionally cleaned to meet our presentation standards, ensuring they look their
                      best.
                    </p>
                  </div>
                  <div className="relative md:order-1 flex justify-start md:justify-end items-center">
                    <div className="absolute right-0 md:right-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl shadow-lg md:translate-x-1/2 z-10">
                      2
                    </div>
                    <div className="ml-16 md:mr-8 bg-white rounded-xl p-4 shadow-lg border border-purple-100">
                      <Image
                        src="/cleaning.jpg"
                        width={400}
                        height={250}
                        alt="Device cleaning process"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={isVisible.process ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative grid md:grid-cols-2 gap-8 mb-16"
                >
                  <div className="md:text-right flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-purple-700 mb-2">3. Data Wiping</h3>
                    <p className="text-gray-600">
                      All devices undergo secure data wiping to protect privacy and security, meeting industry
                      standards.
                    </p>
                  </div>
                  <div className="relative flex justify-start md:justify-start items-center">
                    <div className="absolute left-0 md:left-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl shadow-lg md:-translate-x-1/2 z-10">
                      3
                    </div>
                    <div className="ml-16 md:ml-8 bg-white rounded-xl p-4 shadow-lg border border-purple-100">
                      <Image
                        src="/data-wiping.jpg"
                        width={400}
                        height={250}
                        alt="Data wiping process"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={isVisible.process ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="relative grid md:grid-cols-2 gap-8"
                >
                  <div className="md:order-2 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-purple-700 mb-2">4. Grading</h3>
                    <p className="text-gray-600">
                      Our experts grade each device according to our detailed grading system, ensuring transparency and
                      quality.
                    </p>
                  </div>
                  <div className="relative md:order-1 flex justify-start md:justify-end items-center">
                    <div className="absolute right-0 md:right-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl shadow-lg md:translate-x-1/2 z-10">
                      4
                    </div>
                    <div className="ml-16 md:mr-8 bg-white rounded-xl p-4 shadow-lg border border-purple-100">
                      <Image
                        src="/grading.jpg"
                        width={400}
                        height={250}
                        alt="Device grading process"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Grading System */}
        <section id="grading" ref={gradingRef} className="w-full py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                  <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
                  Grading System
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-700">Our Grading System</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We use a comprehensive in-house grading system to ensure transparency and quality.
                </p>
              </motion.div>
            </div>
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 md:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible.grading ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="col-span-3 md:col-span-1"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 p-6 text-white shadow-xl">
                    <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10"></div>
                    <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
                    <h3 className="text-2xl font-bold mb-4">Premium Grade</h3>
                    <p className="mb-6">Our highest quality devices with minimal to no signs of use.</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-700 font-bold">
                          A+
                        </div>
                        <span>Like new condition</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-700 font-bold">
                          A
                        </div>
                        <span>Excellent condition</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-700 font-bold">
                          A-
                        </div>
                        <span>Very good condition</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible.grading ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="col-span-3 md:col-span-1"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-green-700 p-6 text-white shadow-xl">
                    <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10"></div>
                    <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
                    <h3 className="text-2xl font-bold mb-4">Standard Grade</h3>
                    <p className="mb-6">Good quality devices with minor signs of use but fully functional.</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-green-700 font-bold">
                          B+
                        </div>
                        <span>Good condition</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-green-700 font-bold">
                          B
                        </div>
                        <span>Fair condition</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-green-700 font-bold">
                          B-
                        </div>
                        <span>Acceptable condition</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible.grading ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="col-span-3 md:col-span-1"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 p-6 text-white shadow-xl">
                    <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10"></div>
                    <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
                    <h3 className="text-2xl font-bold mb-4">Economy Grade</h3>
                    <p className="mb-6">Functional devices with noticeable signs of use at lower price points.</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 font-bold">
                          C+
                        </div>
                        <span>Moderate wear</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 font-bold">
                          C
                        </div>
                        <span>Heavy wear</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 font-bold">
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
                animate={isVisible.grading ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-12 text-center"
              >
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-purple-100 px-6 py-3 text-sm font-medium text-purple-800 transition-colors hover:bg-purple-200"
                >
                  Learn more about our grading system
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Shipping Section */}
        <section id="shipping" ref={shippingRef} className="w-full py-20 md:py-32 bg-gray-50 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                  <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
                  Shipping
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-700">
                  Shipping Information
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer convenient shipping options to meet your business needs.
                </p>
              </motion.div>
            </div>
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isVisible.shipping ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative"
                >
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 opacity-20 blur-lg"></div>
                  <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl">
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple-100"></div>
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg mb-6">
                        <Truck className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Domestic Shipping</h3>
                      <p className="text-gray-600 mb-6">
                        We offer <span className="font-bold text-green-600">FREE shipping</span> on all domestic orders
                        within the United States. Your devices will be carefully packaged and shipped with tracking
                        information provided.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-gray-700">Free shipping on all US orders</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-gray-700">Secure packaging for safe delivery</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-gray-700">Tracking information provided</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-gray-700">Fast processing times</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isVisible.shipping ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative"
                >
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 opacity-20 blur-lg"></div>
                  <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl">
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-100"></div>
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg mb-6">
                        <Globe className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">International Shipping</h3>
                      <p className="text-gray-600 mb-6">
                        We ship to businesses worldwide. International shipping rates are calculated based on
                        destination and order volume. Contact us for custom shipping quotes.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-gray-700">Worldwide shipping available</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-gray-700">Customs documentation assistance</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-gray-700">Volume discounts available</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-gray-700">International tracking provided</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
            <div className="absolute inset-0 opacity-20">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <radialGradient id="radialGradient2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="20" cy="20" r="25" fill="url(#radialGradient2)" />
                <circle cx="80" cy="80" r="35" fill="url(#radialGradient2)" />
              </svg>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Join Our Platform
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Access Premium Mobile Devices?
                </h2>
                <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our auctions platform today and discover high-quality mobile devices at competitive wholesale
                  prices.
                </p>
                <div className="mx-auto w-full max-w-sm space-y-4 pt-4">
                  <Link
                    href="https://auctions.reyderenterprises.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 px-8 text-sm font-medium text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-green-500/40 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  >
                    Sign Up For Auctions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <p className="text-sm text-white/60">
                    Join hundreds of businesses already sourcing from Reyder Enterprises.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-white py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Reyder Enterprises Logo" width={120} height={40} className="h-auto" />
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Reyder Enterprises. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
