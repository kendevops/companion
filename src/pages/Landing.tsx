import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  ShoppingBag,
  Shield,
  Star,
  ChevronDown,
  CircleDollarSign,
  Hotel,
  UserRoundCheck,
  Heart,
  MessageCircle,
  Coffee,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Image imports
import Dating from "@/assets/images/dinner.jpg";
import girl1 from "@/assets/images/girl1.jpg";
import girl3 from "@/assets/images/girl3.jpg";
import girl4 from "@/assets/images/girl4.jpg";
import girl6 from "@/assets/images/girl6.jpeg";
import BrickLane from "@/assets/images/BrickLane.jpg";
import man from "@/assets/images/man.jpg";
import man2 from "@/assets/images/man2.png";
import man3 from "@/assets/images/man3.jpg";
import man4 from "@/assets/images/man4.jpg";

// Import animation libraries
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/shared/NavBar";


const LandingPage = () => {
  const images = [girl1, girl3, girl4, man, man2, BrickLane];

  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
    });

    // Smooth scroll implementation
    const smoothScroll = (e: Event, target: string) => {
      e.preventDefault();
      const element = document.getElementById(target);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Offset for navbar
          behavior: "smooth",
        });
      }
    };

    // Add event listeners to navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        const target = href ? href.substring(1) : "";
        smoothScroll(e, target);
      });
    });

    // Cleanup function
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", (e) => {
          const href = anchor.getAttribute("href");
          const target = href ? href.substring(1) : "";
          smoothScroll(e, target);
        });
      });
    };
  }, []);

  // Animation variants for framer-motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const slideInFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const slideInFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Modern Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 to-white"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-100 opacity-70"></div>
          <div className="absolute top-36 -left-20 w-40 h-40 rounded-full bg-purple-100 opacity-60"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-pink-100 opacity-50"></div>
          <svg
            className="absolute bottom-0 left-0 w-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#3170F3"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              variants={slideInFromLeft}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6">
                  Connect with Confidence
                </span>
              </motion.div>
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Companion
              </motion.h1>
              <motion.p
                className="text-lg text-gray-600 mb-8 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Experience meaningful connections through personalized
                companionship that transforms your social life and helps others
                thrive.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Link to="/register?role=buyer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-blue-600 to-violet-600 rounded-full px-8 font-medium"
                    >
                      Find Her
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/register?role=seller">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto cursor-pointer border-blue-400 text-blue-600 rounded-full px-8 font-medium"
                    >
                      Earn Now
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                className="mt-10 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <div className="flex -space-x-3">
                  {images.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + 0.1 * index, duration: 0.5 }}
                      className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden shadow-lg"
                    >
                      <img
                        src={img}
                        alt={`Avatar ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Join 100+ users</p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + 0.05 * i, duration: 0.3 }}
                      >
                        <Star
                          size={14}
                          className="text-yellow-400"
                          fill="currentColor"
                        />
                      </motion.div>
                    ))}
                    <span className="ml-1 text-sm">4.9 (300+ reviews)</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="md:w-1/2" variants={slideInFromRight}>
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 z-10 bg-white/70 backdrop-blur-sm p-1.5 rounded-full shadow-lg">
                  <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
                </div>
                <div className="absolute bottom-4 left-4 z-10 bg-white/70 backdrop-blur-sm p-1.5 rounded-full shadow-lg">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="absolute bottom-4 right-4 z-10 bg-white/70 backdrop-blur-sm p-1.5 rounded-full shadow-lg">
                  <Coffee className="h-5 w-5 text-amber-500" />
                </div>

                {/* Main image with gradient overlay */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-[1]"></div>
                  <img
                    src={Dating}
                    alt="Companion application preview"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats badges */}
          <motion.div
            className="flex flex-wrap justify-center md:justify-between gap-4 mt-16 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              {
                icon: <Users className="h-5 w-5" />,
                text: "100+ Active Users",
              },
              {
                icon: <Globe className="h-5 w-5" />,
                text: "Available in 5 Cities",
              },
              {
                icon: <MessageCircle className="h-5 w-5" />,
                text: "24/7 Support",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-md shadow-md rounded-full py-2 px-4 flex items-center gap-2"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-blue-600">{stat.icon}</span>
                <span className="text-gray-700 font-medium text-sm">
                  {stat.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={() => {
            const servicesElement = document.getElementById("services");
            if (servicesElement) {
              servicesElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span className="text-sm font-medium text-gray-500 mb-2">
            Discover More
          </span>
          <div className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <ChevronDown className="w-5 h-5 text-blue-500" />
          </div>
        </motion.div>
      </motion.section>

      {/* What we are about */}
      <section className="py-24 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-600 font-medium text-sm mb-4">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Why Companion?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're solving real-world challenges with innovative solutions.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                icon: <CircleDollarSign className="h-10 w-10 text-white" />,
                title: "Flexible Income",
                description:
                  "Empowering women with flexible and lucrative income opportunities.",
                color: "from-blue-500 to-cyan-400",
                bgColor: "bg-blue-50",
              },
              {
                icon: <UserRoundCheck className="h-10 w-10 text-white" />,
                title: "Combatting Loneliness",
                description:
                  "Alleviating feelings of isolation and loneliness among men by providing companionship.",
                color: "from-purple-500 to-pink-400",
                bgColor: "bg-purple-50",
              },
              {
                icon: <Hotel className="h-10 w-10 text-white" />,
                title: "Revitalizing Local Scenes",
                description:
                  "Exclusive discounts at restaurants and bars encourage exploring local venues, boosting patronage.",
                color: "from-pink-500 to-rose-400",
                bgColor: "bg-pink-50",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`${feature.bgColor} p-8 rounded-2xl border border-gray-100 shadow-lg`}
                variants={fadeIn}
                whileHover={{
                  y: -10,
                  boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.3 }}
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <motion.div
                  className="mb-6 bg-white p-3 rounded-xl shadow-md inline-block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className={`bg-gradient-to-br ${feature.color} p-3 rounded-lg`}
                  >
                    {feature.icon}
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <a
                    href="#"
                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors group"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Features */}
      <section className="py-20 relative overflow-hidden" id="features">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 right-0 w-64 h-64 rounded-full bg-blue-50 opacity-70"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-50 opacity-60"></div>
          <svg
            className="absolute top-0 right-0 w-full opacity-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#6C63FF"
              fillOpacity="1"
              d="M0,192L48,208C96,224,192,256,288,240C384,224,480,160,576,144C672,128,768,160,864,192C960,224,1056,256,1152,245.3C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            <motion.div
              className="md:w-1/2"
              variants={slideInFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-4">
                Our Advantages
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Why Choose Us?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We connect you with trusted companions who deliver personalized
                experiences tailored to your needs with the highest standards of
                quality and care.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="cursor-pointer bg-gradient-to-r from-blue-600 to-violet-600 rounded-full px-8 font-medium"
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                {
                  icon: <Users className="h-6 w-6 text-white" />,
                  title: "Verified Providers",
                  description:
                    "All companions are thoroughly vetted for quality.",
                  color: "bg-gradient-to-br from-blue-500 to-blue-600",
                },
                {
                  icon: <ShoppingBag className="h-6 w-6 text-white" />,
                  title: "Diverse Services",
                  description: "Wide range of companionship options available.",
                  color: "bg-gradient-to-br from-purple-500 to-purple-600",
                },
                {
                  icon: <Shield className="h-6 w-6 text-white" />,
                  title: "Secure Payments",
                  description: "Your payments are protected and secure.",
                  color: "bg-gradient-to-br from-pink-500 to-pink-600",
                },
                {
                  icon: <MessageCircle className="h-6 w-6 text-white" />,
                  title: "24/7 Support",
                  description: "Our team is always here to help you.",
                  color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                  variants={fadeIn}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start">
                    <div
                      className={`${feature.color} p-2 rounded-lg mr-4 flex-shrink-0`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="py-24 bg-gradient-to-br from-blue-50 to-white"
        id="how-it-works"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-600 font-medium text-sm mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started with Companion is effortless. Just follow these
              simple steps to find your perfect companion.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 max-w-5xl">
              {[
                {
                  step: "01",
                  title: "Create an Account",
                  description:
                    "Sign up in under 60 seconds with our streamlined profile creation.",
                  icon: <Users className="h-6 w-6 text-white" />,
                  color: "from-blue-400 to-blue-600",
                },
                {
                  step: "02",
                  title: "Browse Companions",
                  description:
                    "Explore companions based on your preferences, interests, and schedule.",
                  icon: <Coffee className="h-6 w-6 text-white" />,
                  color: "from-green-400 to-green-600",
                },
                {
                  step: "03",
                  title: "Book & Pay",
                  description:
                    "Select your companion and securely book your time together.",
                  icon: <CircleDollarSign className="h-6 w-6 text-white" />,
                  color: "from-purple-400 to-purple-600",
                },
                {
                  step: "04",
                  title: "Connect & Enjoy",
                  description:
                    "Meet your companion and enjoy a meaningful social experience.",
                  icon: <Heart className="h-6 w-6 text-white" />,
                  color: "from-pink-400 to-pink-600",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-16 left-[calc(50%+40px)] right-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 z-0">
                      <motion.div
                        className="absolute top-1/2 transform -translate-y-1/2 right-0 w-2 h-2 rounded-full bg-purple-500"
                        animate={{
                          x: ["0%", "-100%", "0%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          delay: index,
                        }}
                      />
                    </div>
                  )}

                  <motion.div
                    className="relative z-10 mb-6"
                    data-aos="zoom-in"
                    data-aos-delay={150 * index}
                  >
                    <motion.div
                      className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-lg`}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.icon}
                    </motion.div>
                    <div className="absolute -top-2 -right-2 bg-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border border-gray-200">
                      {step.step.split("0")[1]}
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center h-full w-full flex flex-col"
                    whileHover={{
                      y: -10,
                      boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                    data-aos="fade-up"
                    data-aos-delay={200 * index}
                  >
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600 flex-grow">
                      {step.description}
                    </p>

                    {index === 3 && (
                      <motion.div
                        className="mt-4 pt-4 border-t border-gray-100"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <Button
                          size="sm"
                          className="cursor-pointer bg-gradient-to-r from-blue-600 to-violet-600 rounded-full px-6 font-medium mt-2 w-full"
                        >
                          Get Started Now
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-600 font-medium text-sm mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our users have to say
              about their experiences.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
              {[
                {
                  name: "Charlie S.",
                  role: "Companion Seeker",
                  avatar: man3,
                  quote:
                    "Honestly, i was a little skeptical at first, but Arta completely changed the dating game for me. The whole process feels super smooth and professional. None of that awkward messaging back and forth or weird vibes you get on other apps. The women i've met through Arta have been amazing, absolutely beautiful, but also really chill and interesting to talk to. Plus, getting discounts at great restaurants is a nice bonus, I've ended up trying spots i wouldn't have even thought to go to before. It just makes the whole experience feel experience feel a lot more fun and effortless.",
                  rating: 5,
                  color: "bg-gradient-to-br from-blue-50 to-purple-50",
                  highlight:
                    "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500",
                },
                {
                  name: "Isabel G.",
                  role: "Companion Provider",
                  avatar: girl6,
                  quote:
                    "I honestly couldn’t believe how easy it was. I made $400 in one day just from messaging and hopping on a few video chats with guys—like, that’s wild. I didn’t even have to go out if I didn’t want to. The app makes everything super simple, and I always feel safe using it. Everyone’s veriﬁed, and I get to decide who I talk to or meet. It’s been such a chill way to make extra money without doing anything sketchy. Way better than I expected.",
                  rating: 5,
                  color: "bg-gradient-to-br from-purple-50 to-pink-50",
                  highlight:
                    "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500",
                },
                {
                  name: "Ben M.",
                  role: "Companion Seeker",
                  avatar: man4,
                  quote:
                    "The quality of companions is unmatched. I've used the platform multiple times and have always had wonderful experiences that exceed my expectations, whether it's a casual chat or a dinner date. The app is user-friendly, and the customer support is top-notch. I appreciate the attention to detail and the effort put into ensuring a safe and enjoyable experience. Highly recommend it to anyone looking for companionship.",
                  rating: 5,
                  color: "bg-gradient-to-br from-pink-50 to-rose-50",
                  highlight:
                    "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500",
                },
                {
                  name: "Lachy C. - Brick Lane",
                  role: "Restaurant Owner",
                  avatar: BrickLane,
                  quote:
                    "Partnering with Arta has honestly been a great move for my café. Jack was super professional, he came in, explained everything clearly, no ﬂuff, just straight to the point. Since we joined, I’ve noticed more people coming in, especially during the slower times. The dates actually sit down, order full meals, and a few have even come back on their own later. It’s been a solid boost for business without me having to do much. Deﬁnitely glad we jumped on board.",
                  rating: 5,
                  color: "bg-gradient-to-br from-blue-50 to-purple-50",
                  highlight:
                    "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={`${testimonial.color} p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md`}
                  data-aos="fade-up"
                  data-aos-delay={100 * index}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <h4
                        className={`text-lg font-bold ${testimonial.highlight}`}
                      >
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i, duration: 0.3 }}
                      >
                        <Star
                          size={18}
                          className="text-yellow-400 mr-1"
                          fill={
                            i < testimonial.rating ? "currentColor" : "none"
                          }
                        />
                      </motion.div>
                    ))}
                  </div>

                  <div className="relative">
                    <svg
                      className="absolute top-0 left-0 w-10 h-10 text-gray-200 -mt-3 -ml-3 transform -rotate-6"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-gray-600 relative z-10 pl-4 mt-4 mb-6">
                      {testimonial.quote}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="py-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute top-0 left-0 w-full h-full opacity-10"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 0 10 L 40 10 M 10 0 L 10 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-pink-500 opacity-20 blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-300 opacity-20 blur-3xl -ml-20 -mb-20"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div data-aos="zoom-in" className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white font-medium text-sm mb-6 backdrop-blur-sm">
                Get Started Today
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Ready to Transform Your Social Life?
            </motion.h2>

            <motion.p
              className="text-xl mb-10 text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Join thousands of users who have found meaningful connections and
              new experiences with Companion.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link to="/register?role=buyer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-white/90 w-full sm:w-auto cursor-pointer rounded-full px-8 font-medium"
                  >
                    Find Her
                  </Button>
                </motion.div>
              </Link>
              <Link to="/register?role=seller">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-white/10 hover:text-white w-full sm:w-auto cursor-pointer rounded-full px-8 font-medium"
                  >
                    Earn now
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-24 pb-10">
        <div className="container mx-auto px-4">
          {/* Top section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Link
                  to="/"
                  className="text-2xl font-bold text-white flex items-center gap-2"
                >
                  <Heart className="h-6 w-6" fill="#3170F3" stroke="#3170F3" />
                  <span>Companion</span>
                </Link>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-400 mb-8 max-w-md"
              >
                Connecting people for meaningful experiences and genuine
                companionship. Our platform brings people together to share
                moments, create memories, and build relationships.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                {/* Social Media Icons */}
                {["twitter", "facebook", "instagram", "linkedin"].map(
                  (social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                    >
                      <span className="sr-only">{social}</span>
                      {/* Using built-in Lucide icons as placeholders */}
                      {social === "twitter" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      )}
                      {social === "facebook" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      )}
                      {social === "instagram" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                          ></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      )}
                      {social === "linkedin" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      )}
                    </a>
                  )
                )}
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16 lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="font-bold text-lg mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Testimonials
                    </a>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="font-bold text-lg mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-300">
                  Legal
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Data Protection
                    </a>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="font-bold text-lg mb-5 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-300">
                  Contact
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-pink-500 mt-0.5"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-gray-400">
                      support@companionapp.com
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-pink-500 mt-0.5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-gray-400">+61-0412680511</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-pink-500 mt-0.5"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="text-gray-400">
                      123 City Center, Suite 100
                      <br />
                      Dream City, DC 12345
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="bg-gray-800 rounded-2xl p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="md:w-1/2">
                <h4 className="text-xl font-bold mb-2">
                  Subscribe to our newsletter
                </h4>
                <p className="text-gray-400">
                  Stay updated with the latest features, tips, and special
                  offers.
                </p>
              </div>
              <div className="md:w-1/2 w-full">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-700 border border-gray-600 rounded-full px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                  />
                  <Button className="cursor-pointer bg-gradient-to-r from-blue-600 to-violet-600 rounded-full px-6 font-medium whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom section */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Companion. All rights reserved.
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
