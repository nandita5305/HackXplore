import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User, UserProfile, UserSkill, HackathonType } from "@/types";

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
        setProfile({
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
        });
        
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
    // Generate a unique avatar using a service like DiceBear
    const seed = name.replace(/\s+/g, '').toLowerCase();
    return `https://avatars.dicebear.com/api/avataaars/${seed}.svg`;
  };

  const signUp = async (email: string, password: string) => {
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
