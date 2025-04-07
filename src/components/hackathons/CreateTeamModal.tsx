
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
import { Loader2, Users, Sparkles } from "lucide-react";
import { useTeams } from "@/services/teamService";
import { UserSkill } from "@/types";
import { skillsOptions } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const { user } = useAuth();
  const { toast } = useToast();
  const [aiSuggesting, setAiSuggesting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim() || selectedSkills.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select at least one skill needed.",
        variant: "destructive",
      });
      return;
    }
    
    createTeam({
      name,
      hackathonId,
      description,
      skillsNeeded: selectedSkills,
      maxMembers,
    });
    
    toast({
      title: "Team created!",
      description: "Your team has been created successfully. You can now invite others to join.",
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

  // AI suggestion for skills based on user profile
  const suggestSkills = () => {
    setAiSuggesting(true);
    
    // Simulate AI processing
    setTimeout(() => {
      if (user && user.skills) {
        // Get complementary skills (ones the user doesn't have)
        const userSkills = user.skills;
        const complementarySkills = skillsOptions
          .filter(skill => !userSkills.includes(skill as UserSkill))
          .slice(0, 4) as UserSkill[];
          
        setSelectedSkills(complementarySkills);
        
        toast({
          title: "AI Suggestion",
          description: "We've suggested skills that would complement your team based on your profile.",
        });
      } else {
        toast({
          title: "Cannot suggest skills",
          description: "Please complete your profile with your skills first.",
          variant: "destructive",
        });
      }
      
      setAiSuggesting(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-xl bg-background fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-primary/20 relative overflow-hidden max-h-[85vh] z-50">
        {/* Circular decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-secondary/20 rounded-full blur-lg"></div>
        
        <DialogHeader>
          <DialogTitle>Create a new team</DialogTitle>
          <DialogDescription>
            Create a team for {hackathonTitle} and find teammates with the skills you need
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team-name">Team Name</Label>
                <Input
                  id="team-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a name for your team"
                  required
                  className="border-primary/20 bg-background/50 focus:border-primary"
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
                  className="border-primary/20 bg-background/50 focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Skills Needed</Label>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline"
                    onClick={suggestSkills}
                    disabled={aiSuggesting}
                    className="text-xs rounded-full flex items-center"
                  >
                    {aiSuggesting ? (
                      <>
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        Suggesting...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-1 h-3 w-3 text-secondary" />
                        AI Suggest
                      </>
                    )}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skillsOptions.map((skill) => {
                    const isSelected = selectedSkills.includes(skill as UserSkill);
                    return (
                      <Badge
                        key={skill}
                        variant={isSelected ? "default" : "outline"}
                        className={`cursor-pointer rounded-full ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-primary/20'}`}
                        onClick={() => toggleSkill(skill as UserSkill)}
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
              
              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <Label htmlFor="max-members" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Maximum Team Size
                  </Label>
                  <span className="text-sm text-muted-foreground">{maxMembers} members</span>
                </div>
                <Slider
                  id="max-members"
                  min={2}
                  max={8}
                  step={1}
                  value={[maxMembers]}
                  onValueChange={(value) => setMaxMembers(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                  <span>8</span>
                </div>
              </div>
            </div>
          </form>
        </ScrollArea>
        
        <DialogFooter className="mt-4">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isCreatingTeam || name.trim() === "" || description.trim() === "" || selectedSkills.length === 0}
            className="rounded-full relative overflow-hidden group gradient-button"
          >
            <span className="relative z-10">
              {isCreatingTeam ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                  Creating...
                </>
              ) : (
                "Create Team"
              )}
            </span>
            <span className="absolute inset-0 rounded-full bg-white/10 group-hover:animate-ripple"></span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
