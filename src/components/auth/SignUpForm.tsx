
import { useState } from "react";
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
import { Loader2, Sparkles, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { skillsOptions, interestOptions } from "@/data/mockData";
import { UserSkill, HackathonType } from "@/types";

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
  const { signUp, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<UserSkill[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<HackathonType[]>([]);
  const [lookingFor, setLookingFor] = useState<'hackathons' | 'internships' | 'both'>('both');
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const { toast } = useToast();

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

  const generateRandomAvatar = () => {
    // Use a placeholder avatar service for demo purposes
    const randomSeed = Math.floor(Math.random() * 1000);
    return `https://avatars.dicebear.com/api/initials/${randomSeed}.svg`;
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
      const { error } = await signUp(values.email, values.password);
      
      if (error) {
        toast({
          title: "Error signing up",
          description: error.message,
          variant: "destructive",
        });
      } else {
        if (!avatarUrl) {
          setAvatarUrl(generateRandomAvatar());
        }
        // Move to next step after successful signup
        setCurrentStep(2);
      }
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
      
      await updateProfile({
        name: values.name,
        githubUrl: values.githubUrl,
        linkedinUrl: values.linkedinUrl,
        skills: selectedSkills,
        interests: selectedInterests,
        lookingFor,
        avatarUrl: avatarUrl,
      });
      
      toast({
        title: "Profile created!",
        description: "Welcome to HackXplore",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-primary/20 glass-card">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your HackXplore account</CardDescription>
      </CardHeader>
      <CardContent>
        {currentStep === 1 ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              
              <Button type="submit" className="w-full gradient-button" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
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
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="bg-primary/20 text-xl">
                    {form.getValues().name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  onClick={() => setAvatarUrl(generateRandomAvatar())}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="skills">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="skills">Your Skills</TabsTrigger>
                <TabsTrigger value="interests">Your Interests</TabsTrigger>
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
                          className={`cursor-pointer ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-primary/20'}`}
                          onClick={() => toggleSkill(skill as UserSkill)}
                        >
                          {skill}
                        </Badge>
                      );
                    })}
                  </div>
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
                          className={`cursor-pointer ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-primary/20'}`}
                          onClick={() => toggleInterest(interest as HackathonType)}
                        >
                          {interest}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-3">
              <p className="text-sm font-medium">What are you looking for?</p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={lookingFor === 'hackathons' ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setLookingFor('hackathons')}
                >
                  Hackathons
                </Badge>
                <Badge
                  variant={lookingFor === 'internships' ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setLookingFor('internships')}
                >
                  Internships
                </Badge>
                <Badge
                  variant={lookingFor === 'both' ? "default" : "outline"}
                  className="cursor-pointer"
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
                    <Sparkles className="h-4 w-4 mr-2 text-secondary" />
                    <p className="text-sm font-medium">AI Recommendation</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on your skills and interests, we'll recommend {lookingFor === 'hackathons' ? 'hackathons' : lookingFor === 'internships' ? 'internships' : 'opportunities'} that match your profile.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">
                  Select skills and interests to get personalized recommendations.
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
                  className="flex-1 gradient-button"
                  onClick={completeProfile}
                  disabled={isLoading || selectedSkills.length === 0 || selectedInterests.length === 0}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Complete Profile"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
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
