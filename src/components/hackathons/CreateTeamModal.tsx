
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { useTeams } from "@/services/teamService";
import { UserSkill } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Check, PlusCircle, X, Users } from "lucide-react";
import { skillsOptions } from "@/data/mockData";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  hackathonId: string;
  hackathonTitle: string;
}

export function CreateTeamModal({ isOpen, onClose, hackathonId, hackathonTitle }: CreateTeamModalProps) {
  const { user, profile } = useAuth();
  const { createTeam, useHackathonTeams } = useTeams();
  const { toast } = useToast();
  
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableSkills, setAvailableSkills] = useState<UserSkill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<UserSkill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch existing teams for recommendations
  const { data: hackathonTeams = [] } = useHackathonTeams(hackathonId);
  
  // Initialize available skills and filter user's existing skills
  useEffect(() => {
    const allSkills = [...skillsOptions] as UserSkill[];
    const userSkills = profile?.skills || [];
    const filteredSkills = allSkills.filter(skill => !userSkills.includes(skill));
    setAvailableSkills(filteredSkills.sort((a, b) => a.localeCompare(b)));
  }, [profile?.skills]);
  
  // Get filtered skills based on search term
  const getFilteredSkills = () => {
    if (!searchTerm) return availableSkills;
    
    return availableSkills.filter(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const handleSelectSkill = (skill: UserSkill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setAvailableSkills(availableSkills.filter(s => s !== skill));
    }
    setSearchTerm("");
  };
  
  const handleRemoveSkill = (skill: UserSkill) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
    setAvailableSkills([...availableSkills, skill].sort((a, b) => a.localeCompare(b)));
  };
  
  const handleCreateTeam = async () => {
    if (!user) return;
    
    if (!teamName.trim()) {
      toast({
        title: "Team name required",
        description: "Please provide a name for your team",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Combine user skills and selected additional skills
      const skillsNeeded = [...selectedSkills];
      
      const result = await createTeam({
        hackathonId,
        name: teamName,
        description: description || `Team for ${hackathonTitle}`,
        skillsNeeded,
        maxMembers,
      });
      
      if (result.success) {
        toast({
          title: "Team created successfully",
          description: `Your team '${teamName}' has been created for ${hackathonTitle}`,
        });
        
        onClose();
      } else {
        toast({
          title: "Failed to create team",
          description: result.error || "An error occurred while creating your team. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast({
        title: "Failed to create team",
        description: "An error occurred while creating your team. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredSkills = getFilteredSkills();
  
  // Find teams looking for skills the user has
  const recommendedTeams = hackathonTeams.filter(team => {
    if (!team.isOpen || team.members.length >= team.maxMembers) return false;
    if (profile?.skills && profile.skills.length > 0) {
      return team.skillsNeeded.some(skill => profile.skills.includes(skill));
    }
    return false;
  });
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create a Team for {hackathonTitle}</DialogTitle>
          <DialogDescription>
            Form a team to participate in this hackathon. Add team details and skills you're looking for.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {recommendedTeams.length > 0 && (
              <div className="space-y-4 mb-4">
                <h3 className="text-lg font-semibold">Recommended Teams</h3>
                <p className="text-sm text-muted-foreground">
                  These teams are looking for members with your skills
                </p>
                
                <div className="space-y-2">
                  {recommendedTeams.slice(0, 3).map(team => (
                    <div key={team.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{team.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{team.description}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Request to Join
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {team.skillsNeeded.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
              </div>
            )}
          
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Team Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your team and project idea"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxMembers">Maximum Team Size</Label>
              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  id="maxMembers"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(Number(e.target.value))}
                  min={2}
                  max={10}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">members (including you)</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div>
                <Label>Skills You're Looking For</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Select skills that you want other team members to have
                </p>
              </div>
              
              {/* Already selected skills */}
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 rounded-full hover:bg-secondary/80 focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {skill}</span>
                    </button>
                  </Badge>
                ))}
                
                {selectedSkills.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    No skills selected yet
                  </p>
                )}
              </div>
              
              {/* Skills search */}
              <div className="space-y-2">
                <Label htmlFor="skillSearch">Add Skills</Label>
                <div className="relative">
                  <Input
                    id="skillSearch"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for skills to add"
                    className="pr-8"
                  />
                </div>
                
                {searchTerm && filteredSkills.length > 0 && (
                  <div className="bg-card border rounded-md mt-1 max-h-40 overflow-y-auto">
                    {filteredSkills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => handleSelectSkill(skill)}
                        className="w-full px-3 py-2 text-left hover:bg-muted flex items-center justify-between"
                      >
                        <span>{skill}</span>
                        <PlusCircle className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                )}
                
                {searchTerm && filteredSkills.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No matching skills found
                  </p>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Team Creator</Label>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  {profile?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{profile?.name || user?.email}</p>
                  <p className="text-xs text-muted-foreground">Team Leader</p>
                </div>
                <Badge variant="outline" className="ml-auto">
                  <Check className="h-3 w-3 mr-1" />
                  You
                </Badge>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateTeam} 
            disabled={!teamName.trim() || isLoading}
            className="gradient-button"
          >
            <Users className="mr-2 h-4 w-4" />
            {isLoading ? "Creating..." : "Create Team"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
