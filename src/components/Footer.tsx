import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[#111111] text-white py-20 border-t border-white/10">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-1 mb-6">
            <span className="font-bold text-2xl tracking-tight">
              <span className="text-[#E50914]">Startups</span>
              <span className="text-white">India</span>
            </span>
            <div className="w-8 h-8 flex items-center justify-center -mt-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-7 h-7 text-[#E50914]"
                style={{ transform: "rotate(45deg)" }}
              >
                {/* Blue trails */}
                <path
                  d="M5 15L3 17"
                  stroke="#60A5FA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="opacity-70"
                />
                <path
                  d="M8 18L6 20"
                  stroke="#60A5FA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="opacity-70"
                />
                <path
                  d="M11 19L9 21"
                  stroke="#60A5FA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="opacity-70"
                />
                {/* Paper plane */}
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
          <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-6">
            Empowering the next generation of Indian founders with world-class
            incubation, mentorship, and funding opportunities to build globally
            competitive startups.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-5 text-white">Platform</h4>
          <ul className="space-y-3.5 text-sm text-white/60">
            <li>
              <a href="#journey" className="hover:text-white transition-colors">
                Pre-Incubation
              </a>
            </li>
            <li>
              <a href="#mentors" className="hover:text-white transition-colors">
                Mentorship
              </a>
            </li>
            <li>
              <Link to="/survey" className="hover:text-white transition-colors">
                Readiness Survey
              </Link>
            </li>
            <li>
              <a
                href="#community"
                className="hover:text-white transition-colors"
              >
                Community
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-5 text-white">Media</h4>
          <ul className="space-y-3.5 text-sm text-white/60">
            <li>
              <a href="#stories" className="hover:text-white transition-colors">
                Success Stories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Ecosystem News
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Upcoming Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Press Resources
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-5 text-white">Connect</h4>
          <ul className="space-y-3.5 text-sm text-white/60">
            <li>
              <a
                href="mailto:hello@startupsindia.in"
                className="hover:text-white transition-colors"
              >
                hello@startupsindia.in
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                className="hover:text-white transition-colors"
              >
                Twitter (X)
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Partner with us
              </a>
            </li>
            <li>
              <Link
                to="/events/founders-meet-2026/register"
                className="hover:text-white transition-colors"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/40 font-medium">
          © {new Date().getFullYear()} StartupsIndia. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-white/40">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
