
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HackathonCard } from "@/components/hackathons/HackathonCard";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { AuthModal } from "@/components/auth/AuthModal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBookmarks } from "@/services/bookmarkService";
import { hackathonsData, internshipsData } from "@/data/mockData";
import { BookmarkIcon, LogIn } from "lucide-react";

export default function Bookmarks() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const { bookmarks, isLoading } = useBookmarks();
  
  const hackathonBookmarks = bookmarks
    .filter(bookmark => bookmark.item_type === "hackathon")
    .map(bookmark => 
      hackathonsData.find(hackathon => hackathon.id === bookmark.item_id)
    )
    .filter(hackathon => hackathon !== undefined) as any[];
    
  const internshipBookmarks = bookmarks
    .filter(bookmark => bookmark.item_type === "internship")
    .map(bookmark => 
      internshipsData.find(internship => internship.id === bookmark.item_id)
    )
    .filter(internship => internship !== undefined) as any[];
  
  if (!user) {
    return (
      <AnimatedBackground>
        <Navbar />
        <main className="container py-16">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardContent className="pt-12 pb-6 px-6">
                <BookmarkIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h1 className="text-2xl font-bold mb-2">Sign In Required</h1>
                <p className="text-muted-foreground mb-6">
                  You need to be signed in to view your bookmarked hackathons and internships.
                </p>
                <Button onClick={() => setIsAuthModalOpen(true)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            defaultView="login"
          />
        </main>
        <Footer />
      </AnimatedBackground>
    );
  }
  
  return (
    <AnimatedBackground>
      <Navbar />
      
      <main className="container py-12">
        <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>
        
        <Tabs defaultValue="hackathons">
          <TabsList className="mb-8 w-full md:w-auto">
            <TabsTrigger value="hackathons">
              Hackathons ({hackathonBookmarks.length})
            </TabsTrigger>
            <TabsTrigger value="internships">
              Internships ({internshipBookmarks.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="hackathons">
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="w-full h-48 animate-pulse bg-muted"></Card>
                ))}
              </div>
            ) : hackathonBookmarks.length > 0 ? (
              <div className="space-y-6">
                {hackathonBookmarks.map((hackathon) => (
                  <HackathonCard key={hackathon.id} {...hackathon} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <BookmarkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No bookmarked hackathons</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't bookmarked any hackathons yet. Browse hackathons and click the bookmark icon to add them here.
                    </p>
                    <Button asChild>
                      <a href="/hackathons">Explore Hackathons</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="internships">
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="w-full h-48 animate-pulse bg-muted"></Card>
                ))}
              </div>
            ) : internshipBookmarks.length > 0 ? (
              <div className="space-y-6">
                {internshipBookmarks.map((internship) => (
                  <InternshipCard key={internship.id} {...internship} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <BookmarkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No bookmarked internships</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't bookmarked any internships yet. Browse internships and click the bookmark icon to add them here.
                    </p>
                    <Button asChild>
                      <a href="/internships">Explore Internships</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </AnimatedBackground>
  );
}
