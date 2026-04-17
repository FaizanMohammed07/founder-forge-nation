import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const homeAnchor = (anchor: string) => (isHomePage ? anchor : `/${anchor}`);

  return (
    <footer className="border-t border-white/10 bg-[#111111] py-20 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" className="mb-6 flex items-center gap-1">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-[#E50914]">Startups</span>
                <span className="text-white">India</span>
              </span>
              <div className="-mt-3 flex h-8 w-8 items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-7 w-7 text-[#E50914]"
                  style={{ transform: "rotate(45deg)" }}
                >
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
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
              Empowering the next generation of Indian founders with world-class
              incubation, mentorship, and funding opportunities to build
              globally competitive startups.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">Platform</h4>
            <ul className="space-y-3.5 text-sm text-white/60">
              <li>
                <a
                  href={homeAnchor("#journey")}
                  className="transition-colors hover:text-white"
                >
                  Pre-Incubation
                </a>
              </li>
              <li>
                <a
                  href={homeAnchor("#mentors")}
                  className="transition-colors hover:text-white"
                >
                  Mentorship
                </a>
              </li>
              <li>
                <Link
                  to="/survey"
                  className="transition-colors hover:text-white"
                >
                  Readiness Survey
                </Link>
              </li>
              <li>
                <a
                  href={homeAnchor("#community")}
                  className="transition-colors hover:text-white"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">Media</h4>
            <ul className="space-y-3.5 text-sm text-white/60">
              <li>
                <Link
                  to="/stories"
                  className="transition-colors hover:text-white"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Ecosystem News
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Upcoming Events
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Press Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">Connect</h4>
            <ul className="space-y-3.5 text-sm text-white/60">
              <li>
                <a
                  href="mailto:hello@startupsindia.in"
                  className="transition-colors hover:text-white"
                >
                  hello@startupsindia.in
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  className="transition-colors hover:text-white"
                >
                  Twitter (X)
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  className="transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Partner with us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs font-medium text-white/40">
            Copyright {new Date().getFullYear()} StartupsIndia. All rights
            reserved.
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
                to="/events/founders-meet-2026"
                className="hover:text-white transition-colors"
              >
                Founders Meet
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
