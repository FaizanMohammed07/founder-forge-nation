import { Rocket } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-12">
    <div className="container mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Rocket className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">
            Startup India – Pre-Incubation Launchpad
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Transform Ideas into Startups · © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
