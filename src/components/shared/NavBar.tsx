import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore, isAuthenticated } from "@/store/auth-store";
import { UserRole } from "@/types";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Auth
  const user = useAuthStore((s) => s.user);
  const loggedIn = isAuthenticated();

  // Determine dashboard path by role
  const dashboardPath = useMemo(() => {
    if (!user) return "/dashboard";
    switch (user.role) {
      case UserRole.ADMIN:
        return "/admin/dashboard";
      case UserRole.SELLER:
        return "/seller/dashboard";
      default:
        return "/buyer/dashboard";
    }
  }, [user]);

  // Handle scroll for bg change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile on ESC
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold text-brand-blue flex items-center gap-2"
          >
            <Heart className="h-6 w-6" fill="#3170F3" stroke="#3170F3" />
            <span>Companion</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-gray-700 hover:text-brand-blue transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-brand-blue transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-brand-blue transition-colors"
            >
              Testimonials
            </a>

            <div className="flex items-center space-x-4">
              {loggedIn ? (
                <Link to={dashboardPath}>
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="rounded-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white shadow-xl absolute w-full top-full left-0"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {["#services", "#how-it-works", "#testimonials"].map((href) => (
                  <a
                    key={href}
                    href={href}
                    className="text-gray-700 hover:text-brand-blue transition-colors py-2 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {href
                      .replace("#", "")
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </a>
                ))}

                <div className="flex flex-col space-y-2 pt-2 border-t">
                  {loggedIn ? (
                    <Link to={dashboardPath} onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Dashboard</Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
