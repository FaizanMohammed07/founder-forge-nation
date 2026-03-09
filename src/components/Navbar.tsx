import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Menu, X } from "lucide-react";
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
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 rounded-none border-x-0"
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Rocket className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-base md:text-lg text-foreground">
            Startup India
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/survey" className="btn-outline-glow text-sm !px-5 !py-2.5">
            Take Survey
          </Link>
          <Link to="/apply" className="btn-primary-glow text-sm !px-5 !py-2.5">
            Apply Now
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground p-2"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground py-2"
                >
                  {link.label}
                </a>
              ))}
              <Link to="/survey" className="btn-outline-glow text-sm !px-5 !py-2.5 text-center mt-2">
                Take Survey
              </Link>
              <Link to="/apply" className="btn-primary-glow text-sm !px-5 !py-2.5 text-center">
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
