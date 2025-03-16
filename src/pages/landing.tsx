import React from "react";
import { Link } from "react-router-dom";
import {
  //   Check,
  ArrowRight,
  Users,
  ShoppingBag,
  Shield,
  Star,
  ChevronDown,
} from "lucide-react";
import Dating from "@/assets/images/dinner.jpg";
import { Button } from "@/components/ui/button";

import girl1 from "@/assets/images/girl1.jpg";
import girl3 from "@/assets/images/girl3.jpg";
import girl4 from "@/assets/images/girl4.jpg";
import girl5 from "@/assets/images/girl5.jpg";
import Navbar from "@/components/shared/NavBar";

const LandingPage: React.FC = () => {
  const images = [girl1, girl3, girl4, girl5];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-blue/10 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find the Perfect Companion for Your Needs
              </h1>
              <p className="text-lg text-gray-600 mb-8 md:pr-10">
                Connect with trusted service providers for personalized
                experiences and solutions. From personal shopping to style
                consultations, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register?role=buyer">
                  <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                    Find Services
                  </Button>
                </Link>
                <Link to="/register?role=seller">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto cursor-pointer"
                  >
                    Become a Provider
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`Avatar ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Join 2000+ users</p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                    <span className="ml-1 text-sm">4.9 (300+ reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src={Dating}
                  alt="Companion application preview"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm font-medium text-gray-500 mb-2">
            Scroll to explore
          </span>
          <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Companion?</h2>
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
              <div key={index} className="bg-gray-50 p-8 rounded-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
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
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-lg shadow-sm h-full">
                  <div className="text-4xl font-bold text-brand-blue/20 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
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
              <div key={index} className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-yellow-400 mr-1"
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-blue text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have found the perfect service providers
            for their needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register?role=buyer">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto cursor-pointer"
              >
                Find Services
              </Button>
            </Link>
            <Link to="/register?role=seller">
              <Button
                size="lg"
                variant="outline"
                className="bg-[#3170F3] border-white text-white hover:bg-[#3170F3]/90 w-full sm:w-auto cursor-pointer"
              >
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Companion</h3>
              <p className="text-gray-400">
                Connecting you with trusted service providers for personalized
                experiences.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-400 hover:text-white"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-400 hover:text-white"
                  >
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">support@companionapp.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
              </ul>
            </div>
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
