
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { skillsOptions, interestOptions } from "@/data/mockData";
import { UserSkill, HackathonType } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  dob: z.string().optional(),
  githubUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

interface SignUpFormProps {
  onSuccess?: () => void;
  onSwitchToLogin: () => void;
}

export function SignUpForm({ onSuccess, onSwitchToLogin }: SignUpFormProps) {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<UserSkill[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<HackathonType[]>([]);
  const [lookingFor, setLookingFor] = useState<'hackathons' | 'internships' | 'both'>('both');
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      githubUrl: "",
      linkedinUrl: "",
    },
  });

  // Generate avatar when name changes
  useEffect(() => {
    const name = form.watch("name");
    if (name && name.length >= 2) {
      generateAvatar(name);
    }
  }, [form.watch("name")]);

  const generateAvatar = (name: string) => {
    // Use a variety of avatar styles for more diversity
    const styles = ["adventurer", "adventurer-neutral", "big-ears", "big-smile", "bottts", "croodles", "micah", "miniavs", "personas", "pixel-art", "avataaars"];
    const style = styles[Math.floor(Math.random() * styles.length)];
    
    // Create a seed based on name and a random number to ensure uniqueness
    const seed = `${name.trim().toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    const newAvatarUrl = `https://avatars.dicebear.com/api/${style}/${seed}.svg`;
    
    setAvatarUrl(newAvatarUrl);
  };

  const toggleSkill = (skill: UserSkill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  const toggleInterest = (interest: HackathonType) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    try {
      // Move to next step after form validation
      setCurrentStep(2);
      toast({
        title: "Great!",
        description: "Now let's complete your profile by selecting your skills and interests",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function completeProfile() {
    setIsLoading(true);
    
    try {
      const values = form.getValues();
      
      // Ensure we have at least some skills and interests
      if (selectedSkills.length === 0 || selectedInterests.length === 0) {
        toast({
          title: "Please select skills and interests",
          description: "Select at least one skill and interest to continue",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Sign up the user with all profile data
      const { error } = await signUp(
        values.email, 
        values.password, 
        values.name, 
        selectedSkills,
        selectedInterests
      );
      
      if (!error) {
        toast({
          title: "Account created!",
          description: `Welcome to HackXplore, ${values.name}!`,
        });
        
        // Redirect to profile page or dashboard
        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/profile");
        }
      }
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-primary/20 glass-card purple-gradient">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your HackXplore account</CardDescription>
      </CardHeader>
      <ScrollArea className="max-h-[70vh]">
        <CardContent>
          {currentStep === 1 ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col items-center mb-6">
                  {avatarUrl && (
                    <div className="relative mb-3">
                      <Avatar className="h-24 w-24 border-4 border-primary/20">
                        <AvatarImage src={avatarUrl} alt="Profile" />
                        <AvatarFallback className="bg-primary/20 text-xl">
                          {form.getValues().name?.charAt(0)?.toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        type="button"
                        size="sm"
                        variant="outline" 
                        className="absolute bottom-0 right-0 rounded-full size-8 p-0 card-glow-effect"
                        onClick={() => generateAvatar(form.getValues().name)}
                        title="Generate new avatar"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Enter your name to generate a unique profile image
                  </p>
                </div>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="bg-background/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="bg-background/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/username" {...field} className="bg-background/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/in/username" {...field} className="bg-background/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full gradient-button card-glow-effect" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="relative group">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={avatarUrl} alt="Profile" />
                    <AvatarFallback className="bg-primary/20 text-xl">
                      {form.getValues().name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    className="absolute bottom-0 right-0 rounded-full size-8 p-0 card-glow-effect"
                    onClick={() => generateAvatar(form.getValues().name)}
                    variant="outline"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium">{form.getValues().name}</h3>
                <p className="text-sm text-muted-foreground">{form.getValues().email}</p>
              </div>
              
              <Tabs defaultValue="skills">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="skills" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Your Skills</TabsTrigger>
                  <TabsTrigger value="interests" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Your Interests</TabsTrigger>
                </TabsList>
                
                <TabsContent value="skills" className="mt-4">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Select the skills you have (choose all that apply)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skillsOptions.map((skill) => {
                        const isSelected = selectedSkills.includes(skill as UserSkill);
                        return (
                          <Badge
                            key={skill}
                            variant={isSelected ? "default" : "outline"}
                            className={`cursor-pointer ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-primary/20'} card-glow-effect`}
                            onClick={() => toggleSkill(skill as UserSkill)}
                          >
                            {skill}
                          </Badge>
                        );
                      })}
                    </div>
                    {selectedSkills.length === 0 && (
                      <p className="text-xs text-destructive">Please select at least one skill</p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="interests" className="mt-4">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Select the areas you're interested in
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((interest) => {
                        const isSelected = selectedInterests.includes(interest as HackathonType);
                        return (
                          <Badge
                            key={interest}
                            variant={isSelected ? "default" : "outline"}
                            className={`cursor-pointer ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-primary/20'} card-glow-effect`}
                            onClick={() => toggleInterest(interest as HackathonType)}
                          >
                            {interest}
                          </Badge>
                        );
                      })}
                    </div>
                    {selectedInterests.length === 0 && (
                      <p className="text-xs text-destructive">Please select at least one interest</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-3">
                <p className="text-sm font-medium">What are you looking for?</p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={lookingFor === 'hackathons' ? "default" : "outline"}
                    className="cursor-pointer card-glow-effect"
                    onClick={() => setLookingFor('hackathons')}
                  >
                    Hackathons
                  </Badge>
                  <Badge
                    variant={lookingFor === 'internships' ? "default" : "outline"}
                    className="cursor-pointer card-glow-effect"
                    onClick={() => setLookingFor('internships')}
                  >
                    Internships
                  </Badge>
                  <Badge
                    variant={lookingFor === 'both' ? "default" : "outline"}
                    className="cursor-pointer card-glow-effect"
                    onClick={() => setLookingFor('both')}
                  >
                    Both
                  </Badge>
                </div>
              </div>
              
              <div className="pt-4">
                {selectedSkills.length > 0 && selectedInterests.length > 0 ? (
                  <div className="bg-secondary/10 p-3 rounded-md mb-4 border border-primary/20">
                    <div className="flex items-center text-primary mb-2">
                      <p className="text-sm font-medium">Profile Preview</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {form.getValues().name}, interested in {selectedInterests.slice(0, 2).join(", ")}
                      {selectedInterests.length > 2 ? " and more" : ""}.
                      Skilled in {selectedSkills.slice(0, 2).join(", ")}
                      {selectedSkills.length > 2 ? " and more" : ""}.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">
                    Select skills and interests to complete your profile.
                  </p>
                )}
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setCurrentStep(1)}
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 gradient-button card-glow-effect"
                    onClick={completeProfile}
                    disabled={isLoading || selectedSkills.length === 0 || selectedInterests.length === 0}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Complete Signup"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </ScrollArea>
      
      {currentStep === 1 && (
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" className="p-0" onClick={onSwitchToLogin}>
              Sign In
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
