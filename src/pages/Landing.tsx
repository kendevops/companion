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
} from "lucide-react";
import Dating from "@/assets/images/dinner.jpg";
import { Button } from "@/components/ui/button";

import girl1 from "@/assets/images/girl1.jpg";
import girl3 from "@/assets/images/girl3.jpg";
import girl4 from "@/assets/images/girl4.jpg";
import girl5 from "@/assets/images/girl5.jpg";
import Navbar from "@/components/shared/NavBar";

// Import animation libraries
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  const images = [girl1, girl3, girl4, girl5];

  // // References for scroll sections
  // const servicesRef = useRef(null);
  // const howItWorksRef = useRef(null);
  // const testimonialsRef = useRef(null);

  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
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

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative py-20 bg-gradient-to-br from-brand-blue/10 to-white overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Companion
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register?role=buyer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto cursor-pointer"
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
                      className="w-full sm:w-auto cursor-pointer"
                    >
                      Earn
                    </Button>
                  </motion.div>
                </Link>
              </div>

              <motion.div
                className="mt-8 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex -space-x-2">
                  {images.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * index, duration: 0.5 }}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`Avatar ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Join 2000+ users</p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i, duration: 0.3 }}
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

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="relative rounded-lg overflow-hidden shadow-xl"
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={Dating}
                  alt="Companion application preview"
                  className="w-full h-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={() => {
            const servicesElement = document.getElementById("services");
            if (servicesElement) {
              servicesElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span className="text-sm font-medium text-gray-500 mb-2">
            Scroll to explore
          </span>
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </motion.section>

      {/* What we are about */}
      <section className="py-20 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Why Companion?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are solving these three problems using these solutions.
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
                icon: (
                  <CircleDollarSign className="h-10 w-10 text-brand-blue" />
                ),
                title: "Flexible Income",
                description:
                  "Empowering women with flexible and lucrative income opportunities.",
              },
              {
                icon: <UserRoundCheck className="h-10 w-10 text-brand-blue" />,
                title: "Combatting Loneliness for Men",
                description:
                  "Alleviating feelings of isolation and loneliness among men by providing companionship.",
              },
              {
                icon: <Hotel className="h-10 w-10 text-brand-blue" />,
                title: "Revitalizing Local Dining & Social Scenes",
                description:
                  "Through exclusive discounts at restaurants and bars, we encourage users to explore local venues, boosting patronage and supporting the industry.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-lg"
                variants={fadeIn}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.3 }}
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <motion.div
                  className="mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Features */}
      <section className="py-20 bg-white" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Why Choose US?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We connect you with trusted service providers who deliver
              personalized experiences tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-brand-blue" />,
                title: "Verified Providers",
                description:
                  "All service providers are thoroughly vetted to ensure quality and reliability.",
              },
              {
                icon: <ShoppingBag className="h-10 w-10 text-brand-blue" />,
                title: "Diverse Services",
                description:
                  "Find a wide range of services from personal shopping to style consultation.",
              },
              {
                icon: <Shield className="h-10 w-10 text-brand-blue" />,
                title: "Secure Payments",
                description:
                  "Your payments are protected and only released when you're satisfied.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-lg"
                data-aos="flip-up"
                data-aos-delay={100 * index}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <motion.div
                  className="mb-4"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started with Companion is easy. Follow these simple steps
              to find the perfect service provider.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Create an Account",
                description:
                  "Sign up as a buyer to access our marketplace of service providers.",
              },
              {
                step: "02",
                title: "Browse Services",
                description:
                  "Explore services and providers based on your specific needs.",
              },
              {
                step: "03",
                title: "Book & Pay",
                description:
                  "Select the services you want and make a secure payment.",
              },
              {
                step: "04",
                title: "Connect & Enjoy",
                description:
                  "Get access to provider contact details and enjoy your service.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                data-aos="zoom-in"
                data-aos-delay={150 * index}
              >
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-sm h-full"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-4xl font-bold text-brand-blue/20 mb-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>

                {index < 3 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="h-6 w-6 text-gray-300" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our users have to say
              about their experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Johnson",
                role: "Buyer",
                quote:
                  "Found an amazing personal shopper through Companion. The process was seamless, and I love my new wardrobe!",
                rating: 5,
              },
              {
                name: "David Chen",
                role: "Seller",
                quote:
                  "As a service provider, Companion has helped me connect with clients who truly value my expertise. The platform is intuitive and easy to use.",
                rating: 5,
              },
              {
                name: "Sarah Williams",
                role: "Buyer",
                quote:
                  "The quality of service providers on Companion is unmatched. I've used the platform multiple times and have always been satisfied.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-lg"
                data-aos="fade-up"
                data-aos-delay={100 * index}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                transition={{ duration: 0.3 }}
              >
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
                        fill={i < testimonial.rating ? "currentColor" : "none"}
                      />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="py-20 bg-brand-blue text-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div data-aos="zoom-in" className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who have found the perfect service
              providers for their needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register?role=buyer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto cursor-pointer"
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
                    className="bg-[#3170F3] border-white text-white hover:bg-[#3170F3]/90 w-full sm:w-auto cursor-pointer"
                  >
                    Earn
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4">Companion</h3>
              <p className="text-gray-400">
                Connecting you with trusted service providers for personalized
                experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
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
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">support@companionapp.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
              </ul>
            </motion.div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Companion. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
