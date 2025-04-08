
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink, Calendar, DollarSign, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useBookmarks } from "@/services/bookmarkService";
import { AuthModal } from "@/components/auth/AuthModal";
import { UserSkill } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export interface InternshipCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  imageUrl: string;
  skills: UserSkill[];
  duration: string;
  deadline?: string;
  stipend?: string;
  isRemote?: boolean;
  isBookmarked?: boolean;
}

export function InternshipCard({
  id,
  title,
  company,
  location,
  description,
  url,
  imageUrl,
  skills,
  duration,
  deadline,
  stipend,
  isRemote,
  isBookmarked: initialBookmarkState,
}: InternshipCardProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const { isBookmarked, toggleBookmark, isLoading } = useBookmarks();
  
  const hasBookmark = isBookmarked(id, "internship");
  
  const handleBookmark = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    toggleBookmark(id, "internship");
  };
  
  return (
    <>
      <Card className="bg-card/50 backdrop-blur-sm border border-primary/10 card-hover-effect h-full flex flex-col">
        <CardContent className="p-4 flex-grow">
          <div className="flex gap-4 mb-4">
            <img
              src={imageUrl}
              alt={company}
              className="h-16 w-16 rounded-md object-contain bg-white/10 p-2"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  disabled={isLoading}
                  className="h-8 w-8 rounded-full hover:bg-primary/10 card-glow-effect"
                >
                  <Bookmark
                    className={cn("h-5 w-5", hasBookmark && "fill-primary text-primary")}
                  />
                  <span className="sr-only">
                    {hasBookmark ? "Remove from bookmarks" : "Add to bookmarks"}
                  </span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
          </div>
          
          <div className="mb-3 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{location}</span>
              {isRemote && (
                <Badge variant="outline" className="ml-2 text-xs">
                  Remote Available
                </Badge>
              )}
            </div>
            
            {deadline && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Deadline: {deadline}</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Duration: {duration}</span>
            </div>
            
            {stipend && (
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>Stipend: {stipend}</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {description}
          </p>
          
          {skills && skills.length > 0 && (
            <div className="mt-3 space-y-1">
              <p className="text-sm font-medium">Skills Required:</p>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="card-glow-effect">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button
            asChild
            className="w-full gradient-button card-glow-effect"
            size="sm"
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Apply Now
            </a>
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
