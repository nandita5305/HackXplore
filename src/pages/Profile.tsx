import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileForm } from "@/components/auth/ProfileForm";
import { TeamCard } from "@/components/teams/TeamCard";
import { AuthModal } from "@/components/auth/AuthModal";
import { useTeams } from "@/services/teamService";
import { useBookmarks } from "@/services/bookmarkService";
import { hackathonsData, internshipsData } from "@/data/mockData";
import { HackathonCard } from "@/components/hackathons/HackathonCard";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { Edit, Github, Linkedin, Globe, User, LogIn } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, profile } = useAuth();
  const { useUserTeams } = useTeams();
  const { bookmarks, isLoading: isLoadingBookmarks } = useBookmarks();
  
  const { data: userTeams, isLoading: isLoadingTeams } = useUserTeams();
  
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
              <CardHeader>
                <CardTitle>Sign In Required</CardTitle>
                <CardDescription>
                  Please sign in to view your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">
                  You need to be signed in to access your profile, bookmarks, and teams
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => setIsAuthModalOpen(true)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </CardFooter>
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
        {isEditing ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
            <ProfileForm onComplete={() => setIsEditing(false)} />
          </div>
        ) : (
          <>
            <div className="mb-12">
              <Card className="bg-card/50 backdrop-blur-sm border border-primary/10">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile?.avatarUrl} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {profile?.name ? profile.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                        <div>
                          <h1 className="text-3xl font-bold">{profile?.name || user.email}</h1>
                          <p className="text-muted-foreground">
                            {profile?.preferredRole || "No role specified"}
                          </p>
                        </div>
                        
                        <Button onClick={() => setIsEditing(true)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      </div>
                      
                      {profile?.bio && (
                        <p className="mb-4">{profile.bio}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {profile?.skills?.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        {profile?.githubUrl && (
                          <a 
                            href={profile.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                          >
                            <Github className="mr-1 h-4 w-4" />
                            GitHub
                          </a>
                        )}
                        
                        {profile?.linkedinUrl && (
                          <a 
                            href={profile.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                          >
                            <Linkedin className="mr-1 h-4 w-4" />
                            LinkedIn
                          </a>
                        )}
                        
                        {profile?.portfolioUrl && (
                          <a 
                            href={profile.portfolioUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                          >
                            <Globe className="mr-1 h-4 w-4" />
                            Portfolio
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="teams">
              <TabsList className="mb-8 w-full md:w-auto">
                <TabsTrigger value="teams">My Teams</TabsTrigger>
                <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="teams">
                <h2 className="text-2xl font-semibold mb-6">My Teams</h2>
                
                {isLoadingTeams ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, index) => (
                      <Card key={index} className="w-full h-64 animate-pulse bg-muted"></Card>
                    ))}
                  </div>
                ) : userTeams && userTeams.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userTeams.map((team) => (
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
                          You haven't created or joined any teams yet
                        </p>
                        <Button asChild>
                          <a href="/hackathons">Find Hackathons</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="bookmarks">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-6">Bookmarked Hackathons</h2>
                  
                  {isLoadingBookmarks ? (
                    <div className="grid grid-cols-1 gap-6">
                      {[...Array(3)].map((_, index) => (
                        <Card key={index} className="w-full h-48 animate-pulse bg-muted"></Card>
                      ))}
                    </div>
                  ) : hackathonBookmarks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {hackathonBookmarks.map((hackathon) => (
                        <HackathonCard key={hackathon.id} {...hackathon} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-8">
                        <div className="text-center">
                          <h3 className="text-xl font-semibold mb-2">No bookmarked hackathons</h3>
                          <p className="text-muted-foreground mb-6">
                            You haven't bookmarked any hackathons yet
                          </p>
                          <Button asChild>
                            <a href="/hackathons">Explore Hackathons</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Bookmarked Internships</h2>
                  
                  {isLoadingBookmarks ? (
                    <div className="grid grid-cols-1 gap-6">
                      {[...Array(3)].map((_, index) => (
                        <Card key={index} className="w-full h-48 animate-pulse bg-muted"></Card>
                      ))}
                    </div>
                  ) : internshipBookmarks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {internshipBookmarks.map((internship) => (
                        <InternshipCard key={internship.id} {...internship} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-8">
                        <div className="text-center">
                          <h3 className="text-xl font-semibold mb-2">No bookmarked internships</h3>
                          <p className="text-muted-foreground mb-6">
                            You haven't bookmarked any internships yet
                          </p>
                          <Button asChild>
                            <a href="/internships">Explore Internships</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <Footer />
    </AnimatedBackground>
  );
}
