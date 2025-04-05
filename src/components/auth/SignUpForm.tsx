import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { UserSkill, HackathonType } from "@/types";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const skillsOptions: UserSkill[] = [
  "Frontend",
  "Backend",
  "UI/UX",
  "ML/AI",
  "DevOps",
  "Mobile",
];

const interestOptions: HackathonType[] = [
  "Web",
  "AI",
  "Blockchain",
  "Fintech",
  "Health",
  "EdTech",
];

type SignUpFormProps = {
  onSuccess?: () => void;
  onSwitchToLogin: () => void;
};

export function SignUpForm({ onSuccess, onSwitchToLogin }: SignUpFormProps) {
  const { signUp, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<UserSkill[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<HackathonType[]>([]);
  const [lookingFor, setLookingFor] = useState<'hackathons' | 'internships' | 'both'>('both');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toggleSkill = (skill: UserSkill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest: HackathonType) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
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
      await updateProfile({
        skills: selectedSkills,
        interests: selectedInterests,
        lookingFor,
      });

      toast({
        title: "Profile created!",
        description: "Welcome to HackXplore",
      });

      onSuccess?.();
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="bg-background/50" />
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
                      <Input type="password" {...field} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Continue"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <Tabs defaultValue="skills">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="skills">Your Skills</TabsTrigger>
                <TabsTrigger value="interests">Your Interests</TabsTrigger>
              </TabsList>
              <TabsContent value="skills" className="mt-4">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Choose your skills</p>
                  <div className="flex flex-wrap gap-2">
                    {skillsOptions.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="interests" className="mt-4">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Select your interests</p>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <Badge
                        key={interest}
                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-3">
              <p className="text-sm font-medium">Looking for:</p>
              <div className="flex gap-2 flex-wrap">
                {["hackathons", "internships", "both"].map((option) => (
                  <Badge
                    key={option}
                    variant={lookingFor === option ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setLookingFor(option as typeof lookingFor)}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(1)} disabled={isLoading}>
                  Back
                </Button>
                <Button
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
