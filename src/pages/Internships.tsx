import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { InternshipFilters } from "@/components/internships/InternshipFilters";
import { MovingBubbles } from "@/components/ui/moving-bubbles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { internshipsData } from "@/data/mockData";
import { InternshipCard as InternshipCardType, UserSkill } from "@/types";
import { filterInternships } from "@/services/recommendationService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Internships() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInternships, setFilteredInternships] = useState<InternshipCardType[]>(internshipsData.slice(0, 9));
  const [allInternships, setAllInternships] = useState<InternshipCardType[]>(internshipsData);
  const [showAll, setShowAll] = useState(false);
  const [filters, setFilters] = useState({
    skills: [] as UserSkill[],
    isRemote: undefined as boolean | undefined,
    stipendMin: 0,
    stipendMax: 10000,
    location: "",
  });
  
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    let results = allInternships;
    
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
    
    results = filterInternships(results, {
      skills: filters.skills,
      isRemote: filters.isRemote,
      stipendMin: filters.stipendMin,
      stipendMax: filters.stipendMax,
      location: filters.location,
    });
    
    if (!showAll) {
      setFilteredInternships(results.slice(0, 9));
    } else {
      setFilteredInternships(results);
    }
  }, [searchQuery, filters, allInternships, showAll]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleViewMore = () => {
    setShowAll(true);
    // Scroll to top of the listings area
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/internships/${id}`);
  };
  
  return (
    <>
      <MovingBubbles />
      <Navbar />
      
      <main className="flex-1 overflow-x-hidden">
        <section className="py-10 md:py-16 bg-gradient-to-b from-transparent to-primary/5">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h1 className="text-4xl font-bold mb-4">
                Find Internships
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover internship opportunities from DoraHacks, DevTown, and more that match your skills and interests.
              </p>
            </div>
            
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8">
              <div className="relative overflow-hidden rounded-full shadow-lg">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search internships by title, company, or location..."
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
        
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {isMobile && (
                <div className="w-full mb-4">
                  <InternshipFilters
                    onFilterChange={handleFilterChange}
                    isMobile={true}
                  />
                </div>
              )}
              
              {!isMobile && (
                <InternshipFilters onFilterChange={handleFilterChange} />
              )}
              
              <div className="flex-1">
                <div ref={topRef} className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    {filteredInternships.length} {filteredInternships.length === 1 ? 'Internship' : 'Internships'}
                  </h2>
                </div>
                
                {filteredInternships.length > 0 ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredInternships.map((internship) => (
                        <div key={internship.id} className="animate-float internship-card-container">
                          <InternshipCard 
                            id={internship.id}
                            title={internship.title}
                            company={internship.company}
                            location={internship.location}
                            imageUrl={internship.logo}
                            isRemote={internship.isRemote}
                            stipend={internship.stipend}
                            duration={internship.duration}
                            skills={internship.skills}
                            postedDate={new Date().toISOString().split('T')[0]}
                            applicationDeadline={internship.applicationDeadline}
                            type="Tech"
                            companySize={internship.companySize}
                            description={internship.description || ""}
                            url={internship.url}
                            onViewDetails={() => handleViewDetails(internship.id)}
                          />
                        </div>
                      ))}
                    </div>
                    
                    {!showAll && filteredInternships.length >= 9 && (
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
                    <h3 className="text-xl font-semibold mb-2">No internships found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search query
                    </p>
                    <Button 
                      onClick={() => {
                        setSearchQuery("");
                        setFilters({
                          skills: [],
                          isRemote: undefined,
                          stipendMin: 0,
                          stipendMax: 10000,
                          location: "",
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
    </>
  );
}
