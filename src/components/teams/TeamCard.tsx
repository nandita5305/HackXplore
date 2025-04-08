
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useTeams } from "@/services/teamService";
import { Team, UserSkill } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, UserPlus, UserMinus, X, AlertTriangle, Trash } from "lucide-react";

interface TeamCardProps {
  team: Team;
  showActions?: boolean;
  onDelete?: () => void;
}

export function TeamCard({ team, showActions = false, onDelete }: TeamCardProps) {
  const { user } = useAuth();
  const { joinTeam, leaveTeam, isUserInTeam } = useTeams();
  const { toast } = useToast();
  
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const isUserTeamCreator = user?.id === team.creator;
  const isUserInThisTeam = isUserInTeam(team.id);
  const isFull = team.members.length >= team.maxMembers;
  
  const handleJoinTeam = async () => {
    if (!user) return;
    
    setIsJoining(true);
    try {
      const result = await joinTeam(team.id);
      
      if (result.success) {
        toast({
          title: "Request sent successfully",
          description: `You've requested to join ${team.name}. The team owner will review your request.`,
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to join team. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };
  
  const handleLeaveTeam = async () => {
    if (!user) return;
    
    setIsLeaving(true);
    try {
      const result = await leaveTeam(team.id);
      
      if (result.success) {
        toast({
          title: "Team left",
          description: `You've left the team ${team.name}.`,
        });
        setShowLeaveDialog(false);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to leave team. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLeaving(false);
    }
  };
  
  const handleDeleteTeam = () => {
    if (onDelete) {
      onDelete();
      setShowDeleteDialog(false);
      toast({
        title: "Team deleted",
        description: `You've deleted the team ${team.name}.`,
      });
    }
  };
  
  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl line-clamp-1">{team.name}</CardTitle>
            <Badge variant={team.isOpen ? "outline" : "secondary"}>
              {team.isOpen ? "Open" : "Closed"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {team.description}
          </p>
          
          <div className="mb-3">
            <div className="text-sm font-medium mb-1">Looking for:</div>
            <div className="flex flex-wrap gap-1">
              {team.skillsNeeded.length > 0 ? (
                team.skillsNeeded.map((skill: UserSkill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">No specific skills required</span>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Team ({team.members.length}/{team.maxMembers}):</div>
            <div className="flex -space-x-2">
              {team.members.map((memberId, idx) => (
                <Avatar key={memberId} className="h-7 w-7 border-2 border-background">
                  <AvatarFallback className="text-xs">
                    {memberId === user?.id ? 
                      (user.email?.charAt(0).toUpperCase() || 'U') : 
                      `M${idx + 1}`}
                  </AvatarFallback>
                </Avatar>
              ))}
              {team.members.length < team.maxMembers && (
                <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center border-2 border-background text-xs text-muted-foreground">
                  +{team.maxMembers - team.members.length}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          {!isUserInThisTeam && !isFull && team.isOpen ? (
            <Button 
              onClick={handleJoinTeam} 
              className="w-full" 
              disabled={isJoining}
              variant="outline"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {isJoining ? "Sending Request..." : "Request to Join"}
            </Button>
          ) : isUserInThisTeam && !isUserTeamCreator ? (
            <Button 
              onClick={() => setShowLeaveDialog(true)} 
              className="w-full" 
              variant="outline"
            >
              <UserMinus className="mr-2 h-4 w-4" />
              Leave Team
            </Button>
          ) : isUserTeamCreator && showActions ? (
            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {/* View team details */}}
              >
                <Users className="mr-2 h-4 w-4" />
                Manage
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ) : null}
          
          {isFull && !isUserInThisTeam && (
            <Alert variant="default" className="w-full">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Team is full</AlertTitle>
              <AlertDescription>
                This team has reached its maximum capacity of {team.maxMembers} members.
              </AlertDescription>
            </Alert>
          )}
          
          {!team.isOpen && !isUserInThisTeam && (
            <Alert variant="default" className="w-full">
              <X className="h-4 w-4" />
              <AlertTitle>Team is closed</AlertTitle>
              <AlertDescription>
                This team is not accepting new members at this time.
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
      
      {/* Leave Team Dialog */}
      <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Team</DialogTitle>
            <DialogDescription>
              Are you sure you want to leave the team "{team.name}"? You'll need to request to join again if you change your mind.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLeaveDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLeaveTeam}
              disabled={isLeaving}
            >
              {isLeaving ? "Leaving..." : "Leave Team"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Team Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the team "{team.name}"? This action cannot be undone and all members will be removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteTeam}
            >
              Delete Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
