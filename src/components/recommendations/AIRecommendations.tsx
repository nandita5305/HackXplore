
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { HackathonCard } from "@/components/hackathons/HackathonCard";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { useAuth } from "@/contexts/AuthContext";
import { hackathonsData, internshipsData } from "@/data/mockData";
import { getHackathonRecommendations, getInternshipRecommendations } from "@/services/recommendationService";
import { HackathonCard as HackathonCardType, InternshipCard as InternshipCardType } from "@/types";

export function AIRecommendations() {
  const { profile } = useAuth();
  const [recommendedHackathons, setRecommendedHackathons] = useState<HackathonCardType[]>([]);
  const [recommendedInternships, setRecommendedInternships] = useState<InternshipCardType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    // Generate recommendations
    const hackathonRecs = getHackathonRecommendations(hackathonsData, profile, 3);
    const internshipRecs = getInternshipRecommendations(internshipsData, profile, 3);
    
    setRecommendedHackathons(hackathonRecs);
    setRecommendedInternships(internshipRecs);
    
    setLoading(false);
  }, [profile]);
  
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-secondary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-muted-foreground">
            {profile ? 
              `Personalized suggestions based on your skills and interests.` : 
              `Sign in to get personalized recommendations based on your skills and interests.`
            }
          </p>
        </div>
        
        <Tabs defaultValue="hackathons">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="hackathons" className="flex-1">Hackathons</TabsTrigger>
            <TabsTrigger value="internships" className="flex-1">Internships</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hackathons" className="mt-0">
            {loading ? (
              <div className="space-y-4 mt-4">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="w-full h-48 animate-pulse bg-muted"></Card>
                ))}
              </div>
            ) : recommendedHackathons.length > 0 ? (
              <div className="space-y-4 mt-4">
                {recommendedHackathons.map((hackathon) => (
                  <HackathonCard key={hackathon.id} {...hackathon} />
                ))}
                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <a href="/hackathons">View More Hackathons</a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No recommendation data available</p>
                <Button asChild>
                  <a href="/hackathons">Explore All Hackathons</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="internships" className="mt-0">
            {loading ? (
              <div className="space-y-4 mt-4">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="w-full h-48 animate-pulse bg-muted"></Card>
                ))}
              </div>
            ) : recommendedInternships.length > 0 ? (
              <div className="space-y-4 mt-4">
                {recommendedInternships.map((internship) => (
                  <InternshipCard key={internship.id} {...internship} />
                ))}
                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <a href="/internships">View More Internships</a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No recommendation data available</p>
                <Button asChild>
                  <a href="/internships">Explore All Internships</a>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
