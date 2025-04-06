import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovingBubbles } from "@/components/ui/moving-bubbles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HackathonCard } from "@/components/hackathons/HackathonCard";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { PartnerSection } from "@/components/home/PartnerSection";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search, LightbulbIcon, Users, Globe, Sparkles } from "lucide-react";
import { hackathonsData, internshipsData, partnerLogos } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Card, CardContent } from "@/components/ui/card";

export default function Index() {
  const [activeTab, setActiveTab] = useState<string>("hackathons");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const featuredHackathons = hackathonsData.slice(0, 3);
  const featuredInternships = internshipsData.slice(0, 3);

  const openSignup = () => {
    setIsAuthModalOpen(true);
  };

  const closeModal = () => {
    setIsAuthModalOpen(false);
  };
  
  return (
    <>
      <MovingBubbles />
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
              <Button asChild size="lg" variant="outline" className="hover:bg-primary/10 hover:text-primary">
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
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Centralized Discovery</h3>
                <p className="text-muted-foreground">
                  Find hackathons and internships from multiple platforms in one place, saving you time and effort.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <LightbulbIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
                <p className="text-muted-foreground">
                  Get personalized suggestions based on your skills, interests, and past activities.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Team Formation</h3>
                <p className="text-muted-foreground">
                  Easily create or join teams for hackathons with our built-in team formation feature.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
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
                <TabsList className="grid w-full md:w-auto grid-cols-2 bg-primary/10">
                  <TabsTrigger value="hackathons" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Hackathons
                  </TabsTrigger>
                  <TabsTrigger value="internships" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Internships
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {activeTab === "hackathons" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredHackathons.map((hackathon) => (
                  <div key={hackathon.id} className="hackathon-card-container animate-float">
                    <HackathonCard {...hackathon} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredInternships.map((internship) => (
                  <div key={internship.id} className="internship-card-container animate-float">
                    <InternshipCard {...internship} />
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-center mt-10">
              <Button asChild className="gradient-button">
                <Link to={activeTab === "hackathons" ? "/hackathons" : "/internships"}>
                  View More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* AI Recommendations Message Section */}
        <section className="py-16 bg-gradient-to-b from-transparent to-primary/5">
          <div className="container">
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 rounded-xl shadow-lg text-center py-12">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-xl -z-0 transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-lg -z-0 transform -translate-x-8 translate-y-8 animate-float"></div>
              
              <CardContent className="relative z-10 max-w-3xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-secondary mr-3" />
                  <h2 className="text-3xl font-bold">Personalized AI Recommendations</h2>
                </div>
                
                <p className="text-xl text-muted-foreground mb-8">
                  Sign in to get personalized AI recommendations based on your skills and interests.
                </p>
                
                {!user && (
                  <Button size="lg" className="gradient-button" onClick={openSignup}>
                    Sign up for free
                  </Button>
                )}
              </CardContent>
            </Card>
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
            {!user && (
              <Button size="lg" className="gradient-button" onClick={openSignup}>
                Get Started Now
              </Button>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeModal} 
        defaultView="signup"
      />
    </>
  );
}
