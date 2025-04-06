
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HackathonCard } from "@/components/hackathons/HackathonCard";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hackathonsData, internshipsData } from "@/data/mockData";
import { HackathonCard as HackathonCardType, InternshipCard as InternshipCardType } from "@/types";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getRecommendedHackathons, getRecommendedInternships } from "@/services/recommendationService";

export function AIRecommendations() {
  const [activeTab, setActiveTab] = useState<string>("hackathons");
  const { user } = useAuth();
  const [recommendedHackathons, setRecommendedHackathons] = useState<HackathonCardType[]>([]);
  const [recommendedInternships, setRecommendedInternships] = useState<InternshipCardType[]>([]);
  
  useEffect(() => {
    if (user) {
      const hackathons = getRecommendedHackathons(hackathonsData as HackathonCardType[], user.skills, user.interests);
      setRecommendedHackathons(hackathons);
      
      const internships = getRecommendedInternships(internshipsData as InternshipCardType[], user.skills);
      setRecommendedInternships(internships);
    }
  }, [user]);
  
  if (!user) return null;
  
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">
          Recommended Opportunities For You
        </h2>
        
        <Tabs defaultValue="hackathons" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-secondary/10">
            <TabsTrigger value="hackathons" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
              Hackathons
            </TabsTrigger>
            <TabsTrigger value="internships" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
              Internships
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="hackathons" className="mt-6">
            {recommendedHackathons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedHackathons.map((hackathon) => (
                  <div key={hackathon.id} className="animate-float">
                    <HackathonCard {...hackathon} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="bg-background/50 border border-primary/10 backdrop-blur-md">
                <CardContent className="text-center p-5">
                  No hackathons found based on your profile. Update your profile to get better recommendations.
                </CardContent>
              </Card>
            )}
            
            {recommendedHackathons.length > 0 && (
              <div className="mt-4 flex justify-center">
                <Link to="/hackathons">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View All Hackathons
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="internships" className="mt-6">
            {recommendedInternships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedInternships.map((internship) => (
                  <div key={internship.id} className="animate-float">
                    <InternshipCard {...internship} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="bg-background/50 border border-primary/10 backdrop-blur-md">
                <CardContent className="text-center p-5">
                  No internships found based on your profile. Update your profile to get better recommendations.
                </CardContent>
              </Card>
            )}
            
            {recommendedInternships.length > 0 && (
              <div className="mt-4 flex justify-center">
                <Link to="/internships">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View All Internships
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
