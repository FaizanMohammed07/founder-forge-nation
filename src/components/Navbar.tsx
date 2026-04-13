import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Program", href: "#journey" },
    { label: "Mentors", href: "#mentors" },
    { label: "Community", href: "#community" },
    { label: "Stories", href: "#stories" },
  ];

  return (
    <nav className="fixed top-0 md:top-4 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:w-[96%] md:max-w-7xl z-50 bg-white text-[#111111] border-b md:border border-gray-200 md:shadow-xl md:rounded-xl transition-all">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="StartupsIndia"
            className="h-8 md:h-10 object-contain hidden md:block"
          />
          <img
            src="/logo.png"
            alt="StartupsIndia"
            className="h-7 object-contain md:hidden"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] font-semibold text-gray-600 hover:text-[#E50914] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Search and Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#111111] transition-colors" />
            <input
              type="text"
              placeholder="Search stories..."
              className="bg-gray-50 border border-gray-200 text-[#111111] text-sm rounded-sm pl-9 pr-4 py-1.5 focus:outline-none focus:border-gray-300 focus:bg-white transition-all w-[180px]"
            />
          </div>
          <div className="flex items-center">
            <Link
              to="/events/founders-meet-2026"
              className="bg-[#E50914] hover:bg-[#c40812] text-white text-[13px] font-semibold px-5 py-2.5 rounded-sm transition-all"
            >
              Founders Meet Register
            </Link>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#111111] p-2"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-xl">
          <div className="px-4 py-4 flex flex-col gap-1">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-50 border border-gray-200 text-[#111111] text-sm rounded-sm pl-9 pr-4 py-2.5 w-full focus:outline-none focus:border-gray-300"
              />
            </div>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-gray-600 hover:text-[#E50914] py-3 px-3 rounded-sm hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-4 border-t border-gray-100">
              <Link
                to="/events/founders-meet-2026"
                className="bg-[#E50914] text-white text-sm font-semibold text-center py-3 rounded-sm shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Founders Meet Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
