
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BookmarkIcon, Calendar, MapPin, Award, Users, ExternalLink } from "lucide-react";
import { HackathonCard as HackathonCardType } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useBookmarks } from "@/services/bookmarkService";
import { AuthModal } from "@/components/auth/AuthModal";
import { CreateTeamModal } from "./CreateTeamModal";

interface HackathonCardProps extends HackathonCardType {
  isDetailed?: boolean;
}

export function HackathonCard({
  id,
  title,
  url,
  imageUrl,
  dates,
  organizer,
  mode,
  description,
  prizePool,
  location,
  type,
  teamSize,
  isDetailed = false,
}: HackathonCardProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const { user } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(id, "hackathon");

  const handleBookmarkClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    toggleBookmark(id, "hackathon");
  };

  const handleTeamCreate = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsTeamModalOpen(true);
  };

  return (
    <>
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 border-primary/10 ${isDetailed ? 'lg:flex' : ''}`}>
        <div className={`${isDetailed ? 'lg:w-2/5' : ''}`}>
          {/* Circular image container for better UI */}
          <div className="relative h-48 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 transition-opacity z-10"></div>
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
              <div className="flex flex-wrap gap-1.5">
                {type && type.map((t) => (
                  <Badge key={t} className="rounded-full bg-primary/20 backdrop-blur-sm text-primary text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            {/* Animated circular pulse background */}
            <div className="absolute -right-24 -top-24 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-pulse-slow"></div>
          </div>
        </div>
        
        <div className={`${isDetailed ? 'lg:w-3/5' : ''}`}>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground text-sm">{organizer}</p>
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
          
          <CardContent className="p-4 pt-0">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="rounded-full capitalize">
                {mode}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{dates}</span>
              </div>
              
              {location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{location}</span>
                </div>
              )}
              
              {prizePool && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Award className="h-4 w-4 mr-2" />
                  <span>Prize pool: {prizePool}</span>
                </div>
              )}
              
              {teamSize && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Team size: up to {teamSize}</span>
                </div>
              )}
            </div>
            
            {isDetailed && description && (
              <div className="mt-4">
                <p className="text-sm">{description}</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
            <Button asChild className="relative overflow-hidden group">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <span className="relative z-10 flex items-center">
                  Register
                  <ExternalLink className="h-4 w-4 ml-2" />
                </span>
                <span className="absolute inset-0 rounded-md bg-white/10 group-hover:animate-ripple"></span>
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleTeamCreate}
              className="rounded-full border-primary/20 hover:bg-primary/10"
            >
              Form Team
            </Button>
            
            {!isDetailed && (
              <Button variant="ghost" asChild>
                <Link to={`/hackathons/${id}`}>View Details</Link>
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
      
      {isTeamModalOpen && (
        <CreateTeamModal
          isOpen={isTeamModalOpen}
          onClose={() => setIsTeamModalOpen(false)}
          hackathonId={id}
          hackathonTitle={title}
        />
      )}
    </>
  );
}
