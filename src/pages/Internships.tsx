
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { InternshipFilters } from "@/components/internships/InternshipFilters";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { internshipsData } from "@/data/mockData";
import { InternshipCard as InternshipCardType, UserSkill } from "@/types";
import { filterInternships } from "@/services/recommendationService";

export default function Internships() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInternships, setFilteredInternships] = useState<InternshipCardType[]>(internshipsData);
  const [filters, setFilters] = useState({
    skills: [] as UserSkill[],
    isRemote: undefined as boolean | undefined,
    stipendMin: 0,
    stipendMax: 10000,
    location: "",
  });
  
  const isMobile = useIsMobile();
  
  // Apply filters when they change
  useEffect(() => {
    let results = internshipsData;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        internship =>
          internship.title.toLowerCase().includes(query) ||
          internship.company.toLowerCase().includes(query) ||
          internship.location.toLowerCase().includes(query) ||
          (internship.description && internship.description.toLowerCase().includes(query))
      );
    }
    
    // Apply other filters
    results = filterInternships(results, {
      skills: filters.skills,
      isRemote: filters.isRemote,
      stipendMin: filters.stipendMin,
      stipendMax: filters.stipendMax,
      location: filters.location,
    });
    
    setFilteredInternships(results);
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
                Find Internships
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover internship opportunities that match your skills and interests.
              </p>
            </div>
            
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search internships by title, company, or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </section>
        
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Mobile View */}
              {isMobile && (
                <div className="w-full mb-4">
                  <InternshipFilters
                    onFilterChange={handleFilterChange}
                    isMobile={true}
                  />
                </div>
              )}
              
              {/* Filters - Desktop View */}
              {!isMobile && (
                <InternshipFilters onFilterChange={handleFilterChange} />
              )}
              
              {/* Internship List */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    {filteredInternships.length} {filteredInternships.length === 1 ? 'Internship' : 'Internships'}
                  </h2>
                </div>
                
                {filteredInternships.length > 0 ? (
                  <div className="space-y-6">
                    {filteredInternships.map((internship) => (
                      <InternshipCard key={internship.id} {...internship} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/10">
                    <h3 className="text-xl font-semibold mb-2">No internships found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search query
                    </p>
                    <Button onClick={() => {
                      setSearchQuery("");
                      setFilters({
                        skills: [],
                        isRemote: undefined,
                        stipendMin: 0,
                        stipendMax: 10000,
                        location: "",
                      });
                    }}>
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
