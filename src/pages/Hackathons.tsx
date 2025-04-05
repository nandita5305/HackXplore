
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HackathonCard } from "@/components/hackathons/HackathonCard";
import { HackathonFilters } from "@/components/hackathons/HackathonFilters";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { hackathonsData } from "@/data/mockData";
import { HackathonCard as HackathonCardType, HackathonType, UserSkill } from "@/types";
import { filterHackathons } from "@/services/recommendationService";

export default function Hackathons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHackathons, setFilteredHackathons] = useState<HackathonCardType[]>(hackathonsData);
  const [filters, setFilters] = useState({
    types: [] as HackathonType[],
    mode: "all",
    prizePoolMin: 0,
    prizePoolMax: 100000,
    timeframe: "all",
    skills: [] as UserSkill[],
  });
  
  const isMobile = useIsMobile();
  
  // Apply filters when they change
  useEffect(() => {
    let results = hackathonsData;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        hackathon =>
          hackathon.title.toLowerCase().includes(query) ||
          hackathon.organizer.toLowerCase().includes(query) ||
          (hackathon.description && hackathon.description.toLowerCase().includes(query))
      );
    }
    
    // Apply other filters
    results = filterHackathons(results, {
      types: filters.types,
      mode: filters.mode as any,
      prizePoolMin: filters.prizePoolMin,
      prizePoolMax: filters.prizePoolMax,
      timeframe: filters.timeframe as any,
      skills: filters.skills,
    });
    
    setFilteredHackathons(results);
  }, [searchQuery, filters]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  return (
    <AnimatedBackground>
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
                {/* Animated circle effects */}
                <div className="absolute -left-10 -top-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -right-10 -bottom-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
              </div>
            </form>
          </div>
        </section>
        
        <section className="py-8 md:py-12 relative">
          {/* Decorative circles */}
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Mobile View */}
              {isMobile && (
                <div className="w-full mb-4">
                  <HackathonFilters
                    onFilterChange={handleFilterChange}
                    isMobile={true}
                  />
                </div>
              )}
              
              {/* Filters - Desktop View */}
              {!isMobile && (
                <HackathonFilters onFilterChange={handleFilterChange} />
              )}
              
              {/* Hackathon List */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    {filteredHackathons.length} {filteredHackathons.length === 1 ? 'Hackathon' : 'Hackathons'}
                  </h2>
                </div>
                
                {filteredHackathons.length > 0 ? (
                  <div className="space-y-6">
                    {filteredHackathons.map((hackathon) => (
                      <HackathonCard key={hackathon.id} {...hackathon} />
                    ))}
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
                      className="rounded-full"
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
    </AnimatedBackground>
  );
}
