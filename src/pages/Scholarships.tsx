import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScholarshipCard } from "@/components/scholarships/ScholarshipCard";
import { ScholarshipFilters } from "@/components/scholarships/ScholarshipFilters";
import { MovingBubbles } from "@/components/ui/moving-bubbles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scholarshipsData } from "@/data/mockData";
import { Scholarship, ScholarshipType, UserSkill } from "@/types";
import { filterScholarships } from "@/services/recommendationService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Scholarships() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>(
    scholarshipsData.map(s => ({...s, type: s.type as ScholarshipType}))
  );
  const [allScholarships, setAllScholarships] = useState<Scholarship[]>(
    scholarshipsData.map(s => ({...s, type: s.type as ScholarshipType}))
  );
  const [showAll, setShowAll] = useState(false);
  const [filters, setFilters] = useState({
    types: [] as ScholarshipType[],
    amountMin: 0,
    amountMax: 50000,
    deadlineType: "all",
    provider: "",
    eligibility: [] as string[],
  });
  
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    let results = allScholarships;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        scholarship =>
          scholarship.title.toLowerCase().includes(query) ||
          scholarship.provider.toLowerCase().includes(query) ||
          (scholarship.description && scholarship.description.toLowerCase().includes(query))
      );
    }
    
    results = filterScholarships(results, {
      types: filters.types,
      amountMin: filters.amountMin,
      amountMax: filters.amountMax,
      deadlineType: filters.deadlineType as any,
      provider: filters.provider,
      eligibility: filters.eligibility,
    });
    
    if (!showAll) {
      setFilteredScholarships(results.slice(0, 9));
    } else {
      setFilteredScholarships(results);
    }
  }, [searchQuery, filters, allScholarships, showAll]);
  
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
    navigate(`/scholarships/${id}`);
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
                Find Scholarships
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover scholarship opportunities from Google, Microsoft, and other major companies to support your education.
              </p>
            </div>
            
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8">
              <div className="relative overflow-hidden rounded-full shadow-lg">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search scholarships by title, provider, or eligibility..."
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
                  <ScholarshipFilters
                    onFilterChange={handleFilterChange}
                    isMobile={true}
                  />
                </div>
              )}
              
              {!isMobile && (
                <ScholarshipFilters onFilterChange={handleFilterChange} />
              )}
              
              <div className="flex-1">
                <div ref={topRef} className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    {filteredScholarships.length} {filteredScholarships.length === 1 ? 'Scholarship' : 'Scholarships'}
                  </h2>
                </div>
                
                {filteredScholarships.length > 0 ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredScholarships.map((scholarship) => (
                        <div key={scholarship.id} className="animate-float scholarship-card-container">
                          <ScholarshipCard 
                            {...scholarship}
                            onViewDetailsClick={() => handleViewDetails(scholarship.id)}
                          />
                        </div>
                      ))}
                    </div>
                    
                    {!showAll && filteredScholarships.length >= 9 && (
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
                    <h3 className="text-xl font-semibold mb-2">No scholarships found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search query
                    </p>
                    <Button 
                      onClick={() => {
                        setSearchQuery("");
                        setFilters({
                          types: [],
                          amountMin: 0,
                          amountMax: 50000,
                          deadlineType: "all",
                          provider: "",
                          eligibility: [],
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
