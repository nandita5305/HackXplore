
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BookmarkIcon, Calendar, MapPin, DollarSign, Clock, ExternalLink } from "lucide-react";
import { InternshipCard as InternshipCardType } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useBookmarks } from "@/services/bookmarkService";
import { AuthModal } from "@/components/auth/AuthModal";

interface InternshipCardProps extends InternshipCardType {
  isDetailed?: boolean;
}

export function InternshipCard({
  id,
  title,
  company,
  location,
  deadline,
  duration,
  stipend,
  imageUrl,
  url,
  description,
  skills,
  isRemote,
  isDetailed = false,
}: InternshipCardProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(id, "internship");
  
  // Format the deadline date
  const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleBookmarkClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    toggleBookmark(id, "internship");
  };

  return (
    <>
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 border-primary/10 ${isDetailed ? 'lg:flex' : ''}`}>
        <div className={`${isDetailed ? 'lg:w-2/5' : ''}`}>
          <div className="h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={`${company} - ${title}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
        
        <div className={`${isDetailed ? 'lg:w-3/5' : ''}`}>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground text-sm">{company}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmarkClick}
                className="h-8 w-8"
              >
                <BookmarkIcon
                  className={`h-5 w-5 ${bookmarked ? "fill-primary text-primary" : ""}`}
                />
                <span className="sr-only">Bookmark</span>
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 pt-0">
            <div className="flex flex-wrap gap-2 mb-3">
              {isRemote ? (
                <Badge variant="secondary" className="rounded-full">
                  Remote
                </Badge>
              ) : (
                <Badge variant="secondary" className="rounded-full">
                  In-office
                </Badge>
              )}
              
              {skills && skills.map((skill) => (
                <Badge key={skill} className="rounded-full bg-primary/20 text-primary">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{location}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Apply by: {formattedDeadline}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Duration: {duration}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>Stipend: {stipend}</span>
              </div>
            </div>
            
            {isDetailed && description && (
              <div className="mt-4">
                <p className="text-sm">{description}</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
            <Button asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                Apply Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            
            {!isDetailed && (
              <Button variant="ghost" asChild>
                <Link to={`/internships/${id}`}>View Details</Link>
              </Button>
            )}
          </CardFooter>
        </div>
      </Card>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultView="login"
      />
    </>
  );
}
