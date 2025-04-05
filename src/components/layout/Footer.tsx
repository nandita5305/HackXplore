
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Mail, Send, Github, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.trim()) {
      toast({
        title: "Subscribed!",
        description: "You have been subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80 py-10">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HackXplore
            </span>
          </Link>
          <p className="text-muted-foreground mb-6 max-w-md">
            HackXplore is a centralized platform that aggregates hackathons and internships 
            from various sources, allowing users to easily discover, bookmark, and participate 
            in events and stay updated about current opportunities.
          </p>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-sm gap-2">
            <Input
              type="email"
              placeholder="Subscribe to our newsletter"
              className="bg-muted/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Subscribe</span>
            </Button>
          </form>
        </div>
        
        <div className="col-span-1">
          <h3 className="font-medium text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/hackathons" className="text-muted-foreground hover:text-foreground transition-colors">
                Hackathons
              </Link>
            </li>
            <li>
              <Link to="/internships" className="text-muted-foreground hover:text-foreground transition-colors">
                Internships
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/partner" className="text-muted-foreground hover:text-foreground transition-colors">
                Partner with Us
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="col-span-1">
          <h3 className="font-medium text-lg mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@hackxplore.com" className="hover:text-foreground transition-colors">
                info@hackxplore.com
              </a>
            </li>
            <li className="mt-6">
              <h4 className="font-medium mb-2">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-6 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HackXplore. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
