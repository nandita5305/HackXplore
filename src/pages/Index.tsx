
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HackathonCard } from "@/components/hackathons/HackathonCard";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { AIRecommendations } from "@/components/recommendations/AIRecommendations";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { PartnerSection } from "@/components/home/PartnerSection";
import { Link } from "react-router-dom";
import { ArrowRight, Search, LightbulbIcon, Users, Globe, Clock } from "lucide-react";
import { hackathonsData, internshipsData, partnerLogosData } from "@/data/mockData";

export default function Index() {
  const [activeTab, setActiveTab] = useState<string>("hackathons");
  
  // Get featured items
  const featuredHackathons = hackathonsData.slice(0, 4);
  const featuredInternships = internshipsData.slice(0, 4);
  
  return (
    <AnimatedBackground>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 text-center relative overflow-hidden">
          <div className="container px-4 sm:px-6 relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse-slow">
              Discover. Connect. <br /> Hack. Grow.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              HackXplore is your centralized platform for discovering hackathons and internships from various sources, all in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gradient-button">
                <Link to="/hackathons">
                  Explore Hackathons
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/internships">Discover Internships</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gradient-to-b from-transparent to-primary/5">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose HackXplore</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We simplify your journey to find and participate in hackathons and internships that match your skills and interests.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-primary/10">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Centralized Discovery</h3>
                <p className="text-muted-foreground">
                  Find hackathons and internships from multiple platforms in one place, saving you time and effort.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-primary/10">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <LightbulbIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
                <p className="text-muted-foreground">
                  Get personalized suggestions based on your skills, interests, and past activities.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-primary/10">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Team Formation</h3>
                <p className="text-muted-foreground">
                  Easily create or join teams for hackathons with our built-in team formation feature.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-primary/10">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Global Opportunities</h3>
                <p className="text-muted-foreground">
                  Access opportunities from around the world, whether remote or in-person.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Section */}
        <section className="py-16">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Opportunities</h2>
              <Tabs 
                defaultValue="hackathons" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full md:w-auto mt-4 md:mt-0"
              >
                <TabsList className="grid w-full md:w-auto grid-cols-2">
                  <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
                  <TabsTrigger value="internships">Internships</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {activeTab === "hackathons" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredHackathons.map((hackathon) => (
                  <HackathonCard key={hackathon.id} {...hackathon} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredInternships.map((internship) => (
                  <InternshipCard key={internship.id} {...internship} />
                ))}
              </div>
            )}
            
            <div className="flex justify-center mt-10">
              <Button asChild>
                <Link to={activeTab === "hackathons" ? "/hackathons" : "/internships"}>
                  View More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* AI Recommendations Section */}
        <section className="py-16 bg-gradient-to-b from-transparent to-primary/5">
          <div className="container">
            <AIRecommendations />
          </div>
        </section>
        
        {/* Partner Logos Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We aggregate opportunities from these and other platforms to give you a seamless experience.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {partnerLogosData.map((partner) => (
                <a 
                  key={partner.id} 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-12 md:h-16 object-contain" 
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <TestimonialSection />
        
        {/* Partner With Us Section */}
        <PartnerSection />
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to find your next challenge?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Create your profile today and get personalized recommendations for hackathons and internships.
            </p>
            <Button asChild size="lg" className="gradient-button">
              <Link to="/hackathons">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </AnimatedBackground>
  );
}
