
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Team, UserSkill } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useTeams } from "@/services/teamService";
import { AuthModal } from "@/components/auth/AuthModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, Lock, Users } from "lucide-react";

interface TeamCardProps {
  team: Team;
  onViewDetails?: () => void;
  showActions?: boolean;
}

export function TeamCard({ team, onViewDetails, showActions = true }: TeamCardProps) {
  const { user } = useAuth();
  const teamService = useTeams();
  const { toast } = useToast();
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showMembersDialog, setShowMembersDialog] = useState(false);
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  
  const isCreator = team.creator === user?.id;
  const isMember = team.members.includes(user?.id || "");
  const isFull = team.members.length >= team.maxMembers;
  
  const handleJoinTeam = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    try {
      setIsJoining(true);
      await teamService.joinTeam(team.id);
      toast({
        title: "Team joined!",
        description: `You have successfully joined ${team.name}`,
      });
    } catch (error) {
      console.error("Error joining team:", error);
      toast({
        title: "Failed to join team",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };
  
  const handleLeaveTeam = async () => {
    if (!user || isCreator) return;
    
    try {
      setIsLeaving(true);
      // Fixed the reference to leaveTeam
      await teamService.leaveTeam(team.id);
      toast({
        title: "Team left",
        description: `You have left ${team.name}`,
      });
      setIsLeaveConfirmOpen(false);
    } catch (error) {
      console.error("Error leaving team:", error);
      toast({
        title: "Failed to leave team",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLeaving(false);
    }
  };
  
  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border-primary/10 card-hover-effect">
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{team.name}</h3>
              {team.hackathonId && (
                <p className="text-sm text-muted-foreground truncate">
                  {team.hackathonId}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMembersDialog(true)}
              className="h-8 w-8 rounded-full hover:bg-primary/10"
            >
              <Users className="h-5 w-5" />
              <span className="sr-only">View Members</span>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-0 flex-1">
          {team.description && (
            <p className="text-sm mb-4 line-clamp-3">{team.description}</p>
          )}
          
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>
                {team.members.length} / {team.maxMembers} members
              </span>
            </div>
            
            {!team.isOpen && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Closed
              </Badge>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Looking for skills:</h4>
            <div className="flex flex-wrap gap-1.5">
              {team.skillsNeeded?.map((skill) => (
                <Badge key={skill} variant="outline" className="rounded-full">
                  {skill}
                </Badge>
              ))}
              {(!team.skillsNeeded || team.skillsNeeded.length === 0) && (
                <p className="text-sm text-muted-foreground">No specific skills required</p>
              )}
            </div>
          </div>
        </CardContent>
        
        {showActions && (
          <CardFooter className="p-4 pt-0 flex justify-between">
            {!isMember && team.isOpen && !isFull ? (
              <Button 
                onClick={handleJoinTeam} 
                disabled={isJoining}
                className="w-full gradient-button"
              >
                {isJoining ? "Joining..." : "Join Team"}
              </Button>
            ) : isMember && !isCreator ? (
              <Button 
                variant="outline" 
                onClick={() => setIsLeaveConfirmOpen(true)}
                disabled={isLeaving}
                className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                {isLeaving ? "Leaving..." : "Leave Team"}
              </Button>
            ) : isCreator ? (
              <Button variant="outline" className="w-full" disabled>
                <Check className="mr-2 h-4 w-4" />
                Your Team
              </Button>
            ) : (
              <Button variant="outline" disabled className="w-full">
                {isFull ? "Team is Full" : "Team is Closed"}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultView="login"
      />
      
      <Dialog open={showMembersDialog} onOpenChange={setShowMembersDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Team Members</DialogTitle>
            <DialogDescription>
              {team.name} members ({team.members.length}/{team.maxMembers})
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 py-4">
              {team.members.map((memberId) => (
                <div key={memberId} className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/10">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={(team.creator === memberId && user?.avatarUrl) || ""} />
                    <AvatarFallback className={memberId === team.creator ? "bg-primary/20" : "bg-secondary/20"}>
                      {(team.creator === memberId && user?.name?.charAt(0)?.toUpperCase()) || memberId.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="font-medium">
                      {team.creator === memberId ? (user?.name || user?.email || "Team Leader") : `Member ${memberId.slice(0, 6)}`}
                    </div>
                    {team.creator === memberId && (
                      <div className="text-xs text-muted-foreground">Team Leader</div>
                    )}
                  </div>
                  
                  {memberId === user?.id && (
                    <Badge variant="outline">You</Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isLeaveConfirmOpen} onOpenChange={setIsLeaveConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove you from the team "{team.name}". You can join again later if the team is still open.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLeaveTeam} disabled={isLeaving}>
              {isLeaving ? "Leaving..." : "Leave Team"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
