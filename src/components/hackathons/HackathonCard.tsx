
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useBookmarks } from "@/services/bookmarkService";
import { AuthModal } from "@/components/auth/AuthModal";
import { CreateTeamModal } from "@/components/hackathons/CreateTeamModal";
import { HackathonType } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export interface HackathonCardProps {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  dates?: string;
  startDate?: string;
  endDate?: string;
  organizer?: string;
  mode?: "online" | "in-person" | "hybrid";
  type?: HackathonType[];
  prizePool?: string;
  description?: string;
  teamSize?: number;
  skills?: string[];
  location: string;
  source?: string;
  onViewDetails?: () => void;
  onFormTeam?: () => void;
}

export function HackathonCard({
  id,
  title,
  url,
  imageUrl,
  dates,
  organizer,
  mode,
  type,
  prizePool,
  description,
  teamSize,
  skills,
  location,
  onViewDetails,
  onFormTeam,
}: HackathonCardProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const { user } = useAuth();
  const { bookmarks, isLoading, isBookmarked, toggleBookmark } = useBookmarks();

  const isItemBookmarked = isBookmarked(id, "hackathon");

  const handleBookmark = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    toggleBookmark(id, "hackathon");
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    }
  };

  const handleFormTeam = () => {
    if (onFormTeam) {
      onFormTeam();
    } else {
      if (!user) {
        setIsAuthModalOpen(true);
      } else {
        setIsCreateTeamModalOpen(true);
      }
    }
  };

  return (
    <>
      <Card className="bg-card/50 backdrop-blur-sm border border-primary/10 card-hover-effect">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={imageUrl}
            alt={title}
            className="aspect-video w-full rounded-md object-cover"
          />
        </a>
        <CardContent className="p-4">
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
                className={cn("h-5 w-5", isItemBookmarked && "fill-primary text-primary")}
              />
              <span className="sr-only">
                {isItemBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
              </span>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            {organizer && <span>{organizer}</span>}
            {location && <span>, {location}</span>}
          </p>

          {type && type.length > 0 && (
            <div className="mb-3">
              {type.map((type) => (
                <Badge key={type} variant="secondary" className="mr-1 card-glow-effect">
                  {type}
                </Badge>
              ))}
            </div>
          )}

          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {description}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-1 text-sm">
            {dates && <p className="font-medium">{dates}</p>}
            {prizePool && <p className="text-muted-foreground">Prize: {prizePool}</p>}
            {mode && <p className="text-muted-foreground">Mode: {mode}</p>}
            {teamSize && (
              <p className="text-muted-foreground">
                Team Size: Up to {teamSize} members
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="card-glow-effect"
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Learn More
              </a>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleFormTeam}
              className="gradient-button card-glow-effect"
            >
              <Users className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </div>
        </CardFooter>
      </Card>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultView="login"
      />

      <CreateTeamModal
        isOpen={isCreateTeamModalOpen}
        onClose={() => setIsCreateTeamModalOpen(false)}
        hackathonId={id}
        hackathonTitle={title}
      />
    </>
  );
}
