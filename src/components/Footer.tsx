import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background py-16">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 className="font-semibold text-sm mb-4">About</h4>
          <ul className="space-y-2.5 text-sm text-background/60">
            <li><a href="https://www.startupsindia.in" className="hover:text-background transition-colors">Startups India</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Our Mission</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Team</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Programs</h4>
          <ul className="space-y-2.5 text-sm text-background/60">
            <li><a href="#journey" className="hover:text-background transition-colors">Pre-Incubation</a></li>
            <li><a href="#mentors" className="hover:text-background transition-colors">Mentorship</a></li>
            <li><Link to="/survey" className="hover:text-background transition-colors">Readiness Survey</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Resources</h4>
          <ul className="space-y-2.5 text-sm text-background/60">
            <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
            <li><a href="#stories" className="hover:text-background transition-colors">Success Stories</a></li>
            <li><a href="#" className="hover:text-background transition-colors">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Contact</h4>
          <ul className="space-y-2.5 text-sm text-background/60">
            <li><a href="mailto:hello@startupsindia.in" className="hover:text-background transition-colors">hello@startupsindia.in</a></li>
            <li><a href="https://twitter.com" className="hover:text-background transition-colors">Twitter</a></li>
            <li><a href="https://linkedin.com" className="hover:text-background transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-background/10 flex items-center justify-center">
            <span className="text-background font-bold text-xs">SI</span>
          </div>
          <span className="font-semibold text-sm">
            Startup India – Pre-Incubation Launchpad
          </span>
        </div>
        <p className="text-xs text-background/40">
          © {new Date().getFullYear()} startupsindia.in · Transform Ideas into Startups
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
