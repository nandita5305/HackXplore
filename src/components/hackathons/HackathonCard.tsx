
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
          <div className="h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
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
              <Badge variant="secondary" className="rounded-full capitalize">
                {mode}
              </Badge>
              
              {type && type.map((t) => (
                <Badge key={t} className="rounded-full bg-primary/20 text-primary">
                  {t}
                </Badge>
              ))}
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
            <Button asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                Register
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            
            <Button variant="outline" onClick={handleTeamCreate}>
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
      
      <CreateTeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        hackathonId={id}
        hackathonTitle={title}
      />
    </>
  );
}
