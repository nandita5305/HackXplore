
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User, UserProfile, UserSkill, HackathonType } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  signUp: (email: string, password: string, name: string, skills?: UserSkill[], interests?: HackathonType[]) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
        } as User);
        fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
          } as User);
          fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return;
      }

      if (data) {
        const profileData: UserProfile = {
          name: data.name,
          skills: data.skills || [],
          interests: data.interests || [],
          lookingFor: data.looking_for || "both",
          avatarUrl: data.avatar_url,
          githubUrl: data.github_url,
          linkedinUrl: data.linkedin_url,
          portfolioUrl: data.portfolio_url,
          preferredRole: data.preferred_role,
          bio: data.bio,
        };
        
        setProfile(profileData);
        
        // Update user with profile data for easier access
        setUser(prev => {
          if (!prev) return null;
          return {
            ...prev,
            name: data.name,
            skills: data.skills || [],
            interests: data.interests || [],
            avatarUrl: data.avatar_url,
          };
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const generateAvatarUrl = (name: string) => {
    // Generate a unique avatar using Dicebear with a variety of styles
    const styles = ["adventurer", "adventurer-neutral", "big-ears", "big-smile", "bottts", "croodles", "micah", "miniavs", "personas", "pixel-art", "avataaars"];
    const style = styles[Math.floor(Math.random() * styles.length)];
    const seed = name.trim().toLowerCase().replace(/\s+/g, '-');
    return `https://avatars.dicebear.com/api/${style}/${seed}.svg`;
  };

  const signUp = async (email: string, password: string, name: string, skills: UserSkill[] = [], interests: HackathonType[] = []) => {
    try {
      // First, create the authentication account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Error signing up",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      if (data.user) {
        // Generate avatar URL using the name
        const avatarUrl = generateAvatarUrl(name);
        
        // Create profile in the database
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({
            user_id: data.user.id,
            name: name,
            skills: skills,
            interests: interests,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });
        
        if (profileError) {
          console.error("Error creating profile:", profileError);
          toast({
            title: "Profile creation issue",
            description: "Your account was created but we had trouble with your profile. Please update it later.",
            variant: "destructive",
          });
        } else {
          // Set the user state immediately for a smoother UX
          setUser({
            id: data.user.id,
            email: data.user.email || "",
            name: name,
            avatarUrl: avatarUrl,
            skills: skills,
            interests: interests,
          });
          
          // Set the profile state
          setProfile({
            name: name,
            skills: skills,
            interests: interests,
            lookingFor: "both",
            avatarUrl: avatarUrl,
          });
          
          toast({
            title: "Account created!",
            description: `Welcome to HackXplore, ${name}!`,
          });
        }
      }
      
      return { error: null };
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Unexpected error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Error signing in",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      }
      
      return { error };
    } catch (error) {
      console.error("Error signing in:", error);
      toast({
        title: "Error signing in",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return;

    try {
      // Generate avatar URL if name is provided but no avatar exists
      let avatarUrl = profileData.avatarUrl;
      if (profileData.name && !avatarUrl) {
        avatarUrl = generateAvatarUrl(profileData.name);
      }

      const updates = {
        user_id: user.id,
        name: profileData.name,
        skills: profileData.skills,
        interests: profileData.interests,
        looking_for: profileData.lookingFor,
        avatar_url: avatarUrl,
        github_url: profileData.githubUrl,
        linkedin_url: profileData.linkedinUrl,
        portfolio_url: profileData.portfolioUrl,
        preferred_role: profileData.preferredRole,
        bio: profileData.bio,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(updates, { onConflict: "user_id" });

      if (error) {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      // Update the profile state with the new data
      setProfile(prevProfile => {
        if (!prevProfile) return {
          ...profileData,
          avatarUrl,
        } as UserProfile;
        
        return { 
          ...prevProfile, 
          ...profileData,
          avatarUrl: avatarUrl || prevProfile.avatarUrl 
        };
      });
      
      // Update user state as well to keep them in sync
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          name: profileData.name || prev.name,
          skills: profileData.skills || prev.skills,
          interests: profileData.interests || prev.interests,
          avatarUrl: avatarUrl || prev.avatarUrl,
        };
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
