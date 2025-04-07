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
  onBookmarkToggle?: () => void;
  onViewDetails?: () => void;
  onFormTeam?: () => void;
  source?: string;
  isDetailed?: boolean;

}

export function HackathonCard({
  id,
  title,
  imageUrl,
  organizer,
  dates,
  location,
  mode,
  type,
  prizePool,
  teamSize,
  url,
  description,
  isBookmarked,
  onBookmarkToggle,
  onViewDetails,
  onFormTeam,
  source,
  isDetailed

}: HackathonCardProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const { user } = useAuth();
  const { isBookmarked: isBookmarkedService, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked || isBookmarkedService(id, "hackathon");

  const handleBookmarkClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    onBookmarkToggle?.();
    toggleBookmark(id, "hackathon");
  };

  const handleTeamCreate = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    onFormTeam?.();
    setIsTeamModalOpen(true);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border-primary/10">
        <div className="relative">
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

          {source && (
            <Badge 
              variant="outline" 
              className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm border-none text-xs font-normal"
            >
              {source}
            </Badge>
          )}
        </div>

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

        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2 justify-between">
          <div className="flex gap-2 flex-wrap">
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
          </div>

          {!isDetailed && (
            <Button variant="ghost" asChild>
              <Link to={`/hackathons/${id}`}>View Details</Link>
            </Button>
          )}
        </CardFooter>
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
