
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building, MapPin, Calendar, DollarSign, Clock, ExternalLink } from "lucide-react";
import { internshipsData } from "@/data/mockData";
import { InternshipCard as InternshipCardType, UserSkill } from "@/types";

export default function InternshipDetail() {
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState<InternshipCardType | null>(null);
  const [relatedInternships, setRelatedInternships] = useState<InternshipCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Find the internship and related internships
  useEffect(() => {
    const foundInternship = internshipsData.find(i => i.id === id);
    
    if (foundInternship) {
      setInternship(foundInternship);
      
      // Find related internships with similar skills
      if (foundInternship.skills && foundInternship.skills.length > 0) {
        const similar = internshipsData
          .filter(i => i.id !== id)
          .filter(i => {
            if (!i.skills) return false;
            return i.skills.some(skill => 
              foundInternship.skills?.includes(skill as UserSkill)
            );
          })
          .slice(0, 3);
          
        setRelatedInternships(similar);
      }
    }
    
    setIsLoading(false);
  }, [id]);

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

  if (!internship) {
    return (
      <AnimatedBackground>
        <Navbar />
        <main className="container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Internship Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The internship you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/internships">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Internships
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
        <Link to="/internships" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Internships
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border border-primary/10">
              <CardHeader className="pb-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 overflow-hidden rounded-lg bg-background flex items-center justify-center">
                      <img 
                        src={internship.imageUrl} 
                        alt={internship.company} 
                        className="object-contain w-12 h-12"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{internship.title}</h1>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Building className="h-4 w-4" />
                        <span>{internship.company}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button asChild>
                      <a 
                        href={internship.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Apply Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary/70" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p>{internship.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary/70" />
                      <div>
                        <p className="text-sm text-muted-foreground">Application Deadline</p>
                        <p>{internship.deadline}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary/70" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p>{internship.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary/70" />
                      <div>
                        <p className="text-sm text-muted-foreground">Stipend</p>
                        <p>{internship.stipend}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{internship.description}</p>
                </div>
                
                {internship.skills && internship.skills.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {internship.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/10 border-primary/10">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-card/50 backdrop-blur-sm border border-primary/10 sticky top-20">
              <CardHeader>
                <CardTitle>Similar Internships</CardTitle>
                <CardDescription>
                  Based on skills required for this internship
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {relatedInternships.length > 0 ? (
                  relatedInternships.map((internship) => (
                    <Link 
                      key={internship.id} 
                      to={`/internships/${internship.id}`}
                      className="block hover:no-underline"
                    >
                      <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 overflow-hidden rounded bg-background flex items-center justify-center">
                            <img 
                              src={internship.imageUrl} 
                              alt={internship.company} 
                              className="object-contain w-6 h-6"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{internship.title}</h3>
                            <p className="text-sm text-muted-foreground">{internship.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{internship.location}</span>
                          <span className="font-medium">{internship.stipend}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No similar internships found
                  </p>
                )}
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/internships">View All Internships</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </AnimatedBackground>
  );
}
