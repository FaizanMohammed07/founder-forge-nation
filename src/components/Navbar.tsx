import { useState } from "react";
import { Menu, X } from "lucide-react";
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SI</span>
          </div>
          <span className="font-semibold text-sm text-foreground tracking-tight">
            Startup India
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/survey" className="btn-outline text-sm !px-4 !py-2">
            Take Survey
          </Link>
          <Link to="/apply" className="btn-primary text-sm !px-4 !py-2">
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

      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-md hover:bg-muted transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
              <Link to="/survey" className="btn-outline text-sm text-center !py-2.5">
                Take Survey
              </Link>
              <Link to="/apply" className="btn-primary text-sm text-center !py-2.5">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
