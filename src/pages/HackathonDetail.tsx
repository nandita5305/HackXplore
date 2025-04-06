import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { HackathonCard } from "@/components/hackathons/HackathonCard";
import { TeamCard } from "@/components/teams/TeamCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreateTeamModal } from "@/components/hackathons/CreateTeamModal";
import { ArrowLeft, Users } from "lucide-react";
import { hackathonsData } from "@/data/mockData";
import { useTeams } from "@/services/teamService";
import { HackathonCard as HackathonCardType, Team } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

export default function HackathonDetail() {
  const { id } = useParams<{ id: string }>();
  const [hackathon, setHackathon] = useState<HackathonCardType | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isUserInTeam, setIsUserInTeam] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { useHackathonTeams, isUserInTeam: checkUserInTeam } = useTeams();
  const { user } = useAuth();
  
  const { data: teams, isLoading: isLoadingTeams } = useHackathonTeams(id || "");
  
  const relatedHackathons = hackathonsData
    .filter(h => h.id !== id && h.type && hackathon?.type && 
      h.type.some(t => hackathon.type?.includes(t as any)))
    .slice(0, 3);
  
  // Check if hackathon exists
  useEffect(() => {
    const foundHackathon = hackathonsData.find(h => h.id === id);
    if (foundHackathon) {
      setHackathon(foundHackathon);
    }
    setIsLoading(false);
  }, [id]);
  
  // Check if user is in a team for this hackathon
  useEffect(() => {
    const checkUserTeam = async () => {
      if (!user || !id) return;
      
      try {
        const isInTeam = await checkUserInTeam(id);
        setIsUserInTeam(isInTeam);
      } catch (error) {
        console.error("Error checking if user is in team:", error);
      }
    };
    
    checkUserTeam();
  }, [user, id, checkUserInTeam]);
  
  if (isLoading) {
    return (
      <AnimatedBackground>
        <Navbar />
        <main className="container py-12">
          <div className="w-full h-96 animate-pulse bg-muted rounded-lg"></div>
        </main>
        <Footer />
      </AnimatedBackground>
    );
  }
  
  if (!hackathon) {
    return (
      <AnimatedBackground>
        <Navbar />
        <main className="container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Hackathon Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The hackathon you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/hackathons">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Hackathons
            </Link>
          </Button>
        </main>
        <Footer />
      </AnimatedBackground>
    );
  }
  
  return (
    <AnimatedBackground>
      <Navbar />
      
      <main className="container py-12">
        <Link to="/hackathons" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Hackathons
        </Link>
        
        {/* Hackathon Detail Card */}
        <div className="mb-12">
          <HackathonCard {...hackathon} isDetailed />
        </div>
        
        {/* Teams Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Teams</h2>
            
            {!isUserInTeam && (
              <Button onClick={() => setIsTeamModalOpen(true)}>
                Create Team
                <Users className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          
          {isLoadingTeams ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="w-full h-64 animate-pulse bg-muted"></Card>
              ))}
            </div>
          ) : teams && teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team: Team) => (
                <TeamCard 
                  key={team.id} 
                  team={team}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">No teams yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Be the first to create a team for this hackathon!
                  </p>
                  <Button onClick={() => setIsTeamModalOpen(true)}>
                    Create Team
                    <Users className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
        
        {/* Related Hackathons */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Similar Hackathons</h2>
          
          {relatedHackathons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedHackathons.map((relatedHackathon) => (
                <HackathonCard key={relatedHackathon.id} {...relatedHackathon} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No similar hackathons found.</p>
          )}
        </section>
      </main>
      
      <CreateTeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        hackathonId={hackathon.id}
        hackathonTitle={hackathon.title}
      />
      
      <Footer />
    </AnimatedBackground>
  );
}
