import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User, UserProfile } from "@/types";
import { UserSkill, HackathonType } from "@/types";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo mode constants
const DEMO_USER_ID = "demo-user-123";
const DEMO_USER_EMAIL = "demo@hackxplore.com";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
        });
        fetchUserProfile(session.user.id);
      } else {
        // Check if we should activate demo mode
        checkAndActivateDemoMode();
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
          });
          fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
          // Check if we should activate demo mode
          checkAndActivateDemoMode();
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAndActivateDemoMode = () => {
    // Check if Supabase URL or key is missing (indicating we're in demo mode)
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("Running in demo mode - Supabase credentials missing");
      activateDemoMode();
    }
  };

  const activateDemoMode = () => {
    // Set a demo user with mock data
    setUser({
      id: DEMO_USER_ID,
      email: DEMO_USER_EMAIL,
    });

    // Set a demo profile
    setProfile({
      name: "Demo User",
      skills: ["React", "JavaScript", "TypeScript", "Node.js"] as UserSkill[],
      interests: ["Web Development", "AI/ML", "Mobile"] as HackathonType[],
      lookingFor: "both",
      avatarUrl: "https://avatars.dicebear.com/api/initials/DU.svg",
      githubUrl: "https://github.com/demo-user",
      linkedinUrl: "https://linkedin.com/in/demo-user",
    });
  };

  const fetchUserProfile = async (userId: string) => {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("Running in demo mode - skipping actual profile fetch");
      return;
    }

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
        setProfile({
          name: data.name,
          skills: data.skills || [],
          interests: data.interests || [],
          lookingFor: data.looking_for || "both",
          avatarUrl: data.avatar_url,
          githubUrl: data.github_url,
          linkedinUrl: data.linkedin_url,
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("Running in demo mode - simulating signup");
      // Simulate the signup process in demo mode
      setUser({
        id: DEMO_USER_ID,
        email: email,
      });
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { error };
    } catch (error) {
      console.error("Error signing up:", error);
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("Running in demo mode - simulating signin");
      // Simulate the signin process in demo mode
      setUser({
        id: DEMO_USER_ID,
        email: email,
      });
      // Set a demo profile
      setProfile({
        name: "Demo User",
        skills: ["React", "JavaScript", "TypeScript", "Node.js"] as UserSkill[],
        interests: ["Web Development", "AI/ML", "Mobile"] as HackathonType[],
        lookingFor: "both",
        avatarUrl: "https://avatars.dicebear.com/api/initials/DU.svg",
        githubUrl: "https://github.com/demo-user",
        linkedinUrl: "https://linkedin.com/in/demo-user",
      });
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      console.error("Error signing in:", error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("Running in demo mode - simulating signout");
      // Clear the user and profile states in demo mode
      setUser(null);
      setProfile(null);
      return;
    }

    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return;

    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("Running in demo mode - simulating profile update");
      // Update the profile in demo mode
      setProfile(prevProfile => {
        if (!prevProfile) {
          // If we don't have a profile yet, create a new one with the provided data
          return {
            name: profileData.name || "Demo User",
            skills: profileData.skills || [] as UserSkill[],
            interests: profileData.interests || [] as HackathonType[],
            lookingFor: profileData.lookingFor || "both",
            avatarUrl: profileData.avatarUrl || "https://avatars.dicebear.com/api/initials/DU.svg",
            githubUrl: profileData.githubUrl || "",
            linkedinUrl: profileData.linkedinUrl || "",
          };
        }
        // Otherwise update the existing profile
        return {
          ...prevProfile,
          ...profileData,
        };
      });
      return;
    }

    try {
      const updates = {
        user_id: user.id,
        name: profileData.name,
        skills: profileData.skills,
        interests: profileData.interests,
        looking_for: profileData.lookingFor,
        avatar_url: profileData.avatarUrl,
        github_url: profileData.githubUrl,
        linkedin_url: profileData.linkedinUrl,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(updates, { onConflict: "user_id" });

      if (error) {
        throw error;
      }

      // Update the profile state with the new data
      setProfile(prevProfile => {
        if (!prevProfile) return profileData as UserProfile;
        return { ...prevProfile, ...profileData };
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
