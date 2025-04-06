
import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HackathonCard } from "@/components/hackathons/HackathonCard";
import { HackathonFilters } from "@/components/hackathons/HackathonFilters";
import { MovingBubbles } from "@/components/ui/moving-bubbles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { hackathonsData } from "@/data/mockData";
import { HackathonCard as HackathonCardType, HackathonType, UserSkill } from "@/types";
import { filterHackathons } from "@/services/recommendationService";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { CreateTeamModal } from "@/components/hackathons/CreateTeamModal";

export default function Hackathons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHackathons, setFilteredHackathons] = useState<HackathonCardType[]>(hackathonsData.slice(0, 6));
  const [allHackathons, setAllHackathons] = useState<HackathonCardType[]>(hackathonsData);
  const [showAll, setShowAll] = useState(false);
  const [filters, setFilters] = useState({
    types: [] as HackathonType[],
    mode: "all",
    prizePoolMin: 0,
    prizePoolMax: 100000,
    timeframe: "all",
    skills: [] as UserSkill[],
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState<HackathonCardType | null>(null);
  
  const { user, profile } = useAuth();
  const isMobile = useIsMobile();
  const listTopRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let results = allHackathons;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        hackathon =>
          hackathon.title.toLowerCase().includes(query) ||
          hackathon.organizer.toLowerCase().includes(query) ||
          (hackathon.description && hackathon.description.toLowerCase().includes(query))
      );
    }
    
    results = filterHackathons(results, {
      types: filters.types,
      mode: filters.mode as any,
      prizePoolMin: filters.prizePoolMin,
      prizePoolMax: filters.prizePoolMax,
      timeframe: filters.timeframe as any,
      skills: filters.skills,
    });
    
    if (!showAll) {
      setFilteredHackathons(results.slice(0, 6));
    } else {
      setFilteredHackathons(results);
    }
  }, [searchQuery, filters, allHackathons, showAll]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleViewMore = () => {
    setShowAll(true);
    // Scroll to top of the list
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormTeam = (hackathon: HackathonCardType) => {
    setSelectedHackathon(hackathon);
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setIsTeamModalOpen(true);
    }
  };
  
  return (
    <>
      <MovingBubbles numBubbles={15} opacity={0.1} minSize={10} maxSize={40} />
      <Navbar />
      
      <main className="flex-1">
        <section className="py-10 md:py-16 bg-gradient-to-b from-transparent to-primary/5">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h1 className="text-4xl font-bold mb-4">
                Discover Hackathons
              </h1>
              <p className="text-muted-foreground text-lg">
                Find hackathons from various platforms, filter based on your preferences, and build your next project.
              </p>
              
              {!user && (
                <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <p className="text-sm">
                    Sign in to get personalized AI recommendations based on your skills and interests.
                  </p>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8 relative">
              <div className="relative overflow-hidden rounded-full shadow-lg">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search hackathons by name, organizer, or description..."
                  className="pl-12 pr-4 py-6 border-primary/20 bg-background/50 backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute -left-10 -top-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -right-10 -bottom-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
              </div>
            </form>
          </div>
        </section>
        
        <section className="py-8 md:py-12 relative">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {isMobile && (
                <div className="w-full mb-4">
                  <HackathonFilters
                    onFilterChange={handleFilterChange}
                    isMobile={true}
                  />
                </div>
              )}
              
              {!isMobile && (
                <HackathonFilters onFilterChange={handleFilterChange} />
              )}
              
              <div className="flex-1" ref={listTopRef}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    {filteredHackathons.length} {filteredHackathons.length === 1 ? 'Hackathon' : 'Hackathons'}
                  </h2>
                </div>
                
                {filteredHackathons.length > 0 ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredHackathons.map((hackathon) => (
                        <div key={hackathon.id} className="animate-float hackathon-card-container">
                          <HackathonCard 
                            id={hackathon.id}
                            title={hackathon.title}
                            url={hackathon.url}
                            imageUrl={hackathon.imageUrl}
                            dates={hackathon.dates}
                            startDate={hackathon.startDate}
                            endDate={hackathon.endDate}
                            organizer={hackathon.organizer}
                            mode={hackathon.mode}
                            description={hackathon.description}
                            location={hackathon.location}
                            prizePool={hackathon.prizePool}
                            type={hackathon.type}
                            teamSize={hackathon.teamSize}
                            skills={hackathon.skills}
                            isBookmarked={hackathon.isBookmarked}
                          />
                        </div>
                      ))}
                    </div>
                    
                    {!showAll && filteredHackathons.length >= 6 && (
                      <div className="flex justify-center mt-8">
                        <Button onClick={handleViewMore} className="flex items-center gap-2 gradient-button">
                          Load More
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/10">
                    <h3 className="text-xl font-semibold mb-2">No hackathons found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search query
                    </p>
                    <Button 
                      onClick={() => {
                        setSearchQuery("");
                        setFilters({
                          types: [],
                          mode: "all",
                          prizePoolMin: 0,
                          prizePoolMax: 100000,
                          timeframe: "all",
                          skills: [],
                        });
                      }}
                      className="rounded-full gradient-button"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultView="login"
      />
      
      {selectedHackathon && (
        <CreateTeamModal
          isOpen={isTeamModalOpen}
          onClose={() => setIsTeamModalOpen(false)}
          hackathonId={selectedHackathon.id}
          hackathonTitle={selectedHackathon.title}
        />
      )}
    </>
  );
}
