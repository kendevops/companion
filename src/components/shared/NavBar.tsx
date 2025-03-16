import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="relative z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/arta.svg" alt="Logo" className="mr-2" />
          <h1 className="text-2xl font-bold">Companion</h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex ml-10 space-x-6">
            <a
              href="#services"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Pricing
            </a>
          </nav>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Auth Buttons (desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu */}
          <div className="absolute top-0 left-0 bg-white right-0 z-50 p-6 w-11/12 max-w-sm mx-auto mt-24 rounded-lg shadow-xl space-y-4">
            <a
              href="#services"
              className="block text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="block text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="block text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="block text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Pricing
            </a>

            <div className="flex flex-col gap-2 pt-4 border-t">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full">Get Started</Button>
              </Link>
              {/* <div className="flex flex-col gap-2 pt-4 border-t">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
