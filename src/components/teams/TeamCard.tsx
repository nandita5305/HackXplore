
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Lock, Unlock, UserPlus } from "lucide-react";
import { Team, User } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useTeams } from "@/services/teamService";
import { AuthModal } from "@/components/auth/AuthModal";
import { useToast } from "@/hooks/use-toast";

interface TeamCardProps {
  team: Team;
  hackathonTitle?: string;
  members?: User[];
  onViewDetails?: () => void;
}

export function TeamCard({ team, hackathonTitle, members = [], onViewDetails }: TeamCardProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, profile } = useAuth();
  const { joinTeam, isJoiningTeam, updateTeamStatus, isUpdatingTeam } = useTeams();
  const { toast } = useToast();
  const isCreator = user?.id === team.creator;
  
  const handleJoinTeam = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    joinTeam(team.id);
  };
  
  const handleToggleStatus = () => {
    if (!isCreator) return;
    
    updateTeamStatus({
      teamId: team.id,
      isOpen: !team.isOpen,
    });
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-primary/10">
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold">{team.name}</h3>
              {hackathonTitle && (
                <p className="text-muted-foreground text-sm">{hackathonTitle}</p>
              )}
            </div>
            {isCreator && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleStatus}
                disabled={isUpdatingTeam}
                className="h-8 w-8"
              >
                {team.isOpen ? (
                  <Unlock className="h-5 w-5" />
                ) : (
                  <Lock className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {team.isOpen ? "Close Team" : "Open Team"}
                </span>
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <p className="text-sm mb-4">{team.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {team.skills.map((skill) => (
              <Badge key={skill} className="rounded-full bg-primary/20 text-primary">
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {team.members.length} / {team.maxMembers} members
            </span>
          </div>
          
          {members.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Team Members</h4>
              <div className="flex -space-x-2">
                {members.map((member) => (
                  <Avatar key={member.id} className="border-2 border-background">
                    <AvatarImage src={member.avatarUrl} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {member.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
          {onViewDetails && (
            <Button variant="outline" onClick={onViewDetails}>
              View Details
            </Button>
          )}
          
          {team.isOpen && !isCreator && team.members.length < team.maxMembers && (
            <Button onClick={handleJoinTeam} disabled={isJoiningTeam}>
              {isJoiningTeam ? "Joining..." : "Join Team"}
              <UserPlus className="h-4 w-4 ml-2" />
            </Button>
          )}
          
          {!team.isOpen && !isCreator && (
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/10">
              Team Closed
            </Badge>
          )}
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
