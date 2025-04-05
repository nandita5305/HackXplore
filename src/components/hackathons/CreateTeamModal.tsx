
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Loader2 } from "lucide-react";
import { useTeams } from "@/services/teamService";
import { UserSkill } from "@/types";
import { skillsOptions } from "@/data/mockData";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  hackathonId: string;
  hackathonTitle: string;
}

export function CreateTeamModal({
  isOpen,
  onClose,
  hackathonId,
  hackathonTitle,
}: CreateTeamModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<UserSkill[]>([]);
  const [maxMembers, setMaxMembers] = useState(4);
  const { createTeam, isCreatingTeam } = useTeams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim() || selectedSkills.length === 0) {
      return;
    }
    
    createTeam({
      name,
      hackathonId,
      description,
      skillsNeeded: selectedSkills,
      maxMembers,
    });
    
    // Reset form
    setName("");
    setDescription("");
    setSelectedSkills([]);
    setMaxMembers(4);
    
    onClose();
  };

  const toggleSkill = (skill: UserSkill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a new team</DialogTitle>
          <DialogDescription>
            Create a team for {hackathonTitle} and find teammates with the skills you need
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a name for your team"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team-description">Description</Label>
              <Textarea
                id="team-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project idea or what you're looking for in teammates"
                required
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Skills Needed</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {skillsOptions.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <Badge
                      key={skill}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-primary/20'}`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  );
                })}
              </div>
              {selectedSkills.length === 0 && (
                <p className="text-sm text-destructive">
                  Please select at least one skill
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="max-members">Maximum Team Size</Label>
                <span className="text-sm text-muted-foreground">{maxMembers} members</span>
              </div>
              <Slider
                id="max-members"
                min={2}
                max={8}
                step={1}
                value={[maxMembers]}
                onValueChange={(value) => setMaxMembers(value[0])}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreatingTeam}>
              {isCreatingTeam ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Team"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
