
// Replace this with the actual implementation from the read-only file
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookmarkIcon, Calendar, MapPin, Clock, DollarSign, ExternalLink } from "lucide-react";
import { useState } from "react";
import { InternshipCard as InternshipCardType, UserSkill } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useBookmarks } from "@/services/bookmarkService";
import { AuthModal } from "@/components/auth/AuthModal";

interface InternshipCardProps extends InternshipCardType {
  onBookmarkToggle?: () => void;
  onViewDetailsClick?: () => void;
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
  skills,
  isRemote,
  description,
  isBookmarked,
  onBookmarkToggle,
  onViewDetailsClick,
  source
}: InternshipCardProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const { isBookmarked: isBookmarkedService, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked || isBookmarkedService(id, "internship");

  const handleBookmarkClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    onBookmarkToggle?.();
    toggleBookmark(id, "internship");
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border-primary/10 card-hover-effect wide-card">
        <div className="relative h-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 z-10"></div>
          <img
            src={imageUrl}
            alt={`${company} logo`}
            className="w-full h-full object-cover"
          />
          {isRemote && (
            <Badge 
              variant="outline" 
              className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm border-none"
            >
              Remote
            </Badge>
          )}
          
          {source && (
            <Badge 
              variant="outline" 
              className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm border-none text-xs font-normal"
            >
              {source}
            </Badge>
          )}
        </div>
        
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
              className="h-8 w-8 rounded-full hover:bg-primary/10"
            >
              <BookmarkIcon
                className={`h-5 w-5 ${bookmarked ? "fill-primary text-primary" : ""}`}
              />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-0 flex-1">
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{location}</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Deadline: {deadline}</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>{duration}</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>{stipend}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills?.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="rounded-full text-xs">
                {skill}
              </Badge>
            ))}
            {skills?.length > 3 && (
              <Badge variant="outline" className="rounded-full text-xs">
                +{skills.length - 3} more
              </Badge>
            )}
          </div>
          
          {description && (
            <p className="text-sm line-clamp-2 text-muted-foreground">
              {description}
            </p>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button variant="outline" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
              Apply Now
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
          
          <Button variant="ghost" onClick={onViewDetailsClick}>
            View Details
          </Button>
        </CardFooter>
      </Card>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultView="login"
      />
    </>
  );
}
