
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { internshipsData } from "@/data/mockData";
import { InternshipCard as InternshipCardType } from "@/types";

export default function InternshipDetail() {
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState<InternshipCardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const relatedInternships = internshipsData
    .filter(i => i.id !== id && i.skills && internship?.skills && 
      i.skills.some(s => internship.skills?.includes(s)))
    .slice(0, 3);
  
  // Check if internship exists
  useEffect(() => {
    const foundInternship = internshipsData.find(i => i.id === id);
    if (foundInternship) {
      setInternship(foundInternship);
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
        
        {/* Internship Detail Card */}
        <div className="mb-12">
          <InternshipCard {...internship} isDetailed />
        </div>
        
        {/* Apply Button */}
        <div className="flex justify-center mb-12">
          <Button asChild size="lg">
            <a href={internship.url} target="_blank" rel="noopener noreferrer">
              Apply Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        
        {/* About the Company Section */}
        {internship.description && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">About the Opportunity</h2>
            <Card>
              <CardContent className="pt-6">
                <p>{internship.description}</p>
              </CardContent>
            </Card>
          </section>
        )}
        
        {/* Related Internships */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Similar Internships</h2>
          
          {relatedInternships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedInternships.map((relatedInternship) => (
                <InternshipCard key={relatedInternship.id} {...relatedInternship} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No similar internships found.</p>
          )}
        </section>
      </main>
      
      <Footer />
    </AnimatedBackground>
  );
}
