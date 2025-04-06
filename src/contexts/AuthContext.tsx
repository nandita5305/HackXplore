
import { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';

type AuthContextType = {
  user: SupabaseUser | null;
  profile: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Check if Supabase environment variables are set
const isSupabaseConfigured = () => {
  return !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Initialize with mock data if Supabase is not configured
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      console.warn("Supabase is not configured - running in demo mode");
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user profile when user changes
  useEffect(() => {
    async function getProfile() {
      if (!user || !isSupabaseConfigured()) {
        setProfile(null);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else if (data) {
          // Transform database profile to app User type
          setProfile({
            id: data.id,
            email: user.email || '',
            name: data.name || '',
            skills: data.skills as any || [],
            interests: data.interests as any || [],
            preferredRole: data.preferred_role || undefined,
            lookingFor: (data.looking_for as 'hackathons' | 'internships' | 'both') || 'both',
            bio: data.bio || undefined,
            githubUrl: data.github_url || undefined,
            linkedinUrl: data.linkedin_url || undefined,
            portfolioUrl: data.portfolio_url || undefined,
            avatarUrl: data.avatar_url || undefined,
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    getProfile();
  }, [user]);

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      console.warn("Running in demo mode - creating mock account");
      
      // Create mock user and profile in demo mode
      const mockUserId = `mock-${Date.now()}`;
      const mockUser = {
        id: mockUserId,
        email: email,
        name: "",
        skills: [],
        interests: [],
        lookingFor: 'both' as const,
        avatarUrl: `https://avatars.dicebear.com/api/initials/${email.charAt(0)}.svg`,
      };
      
      // Set mock user and profile
      setUser({ id: mockUserId, email: email } as SupabaseUser);
      setProfile(mockUser);
      
      toast({
        title: "Demo account created!",
        description: "This is a demo account. Connect to Supabase for full functionality.",
      });
      
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (!error) {
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account.",
        });
        
        // Create initial profile
        if (user) {
          await supabase.from('profiles').insert({
            id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      }
      
      return { error };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      console.warn("Running in demo mode - creating mock login");
      
      // Create mock user and profile in demo mode
      const mockUserId = `mock-${Date.now()}`;
      const mockUser = {
        id: mockUserId,
        email: email,
        name: "Demo User",
        skills: ["JavaScript", "React", "Frontend"],
        interests: ["Web", "AI/ML"],
        lookingFor: 'both' as const,
        avatarUrl: `https://avatars.dicebear.com/api/initials/${email.charAt(0)}.svg`,
      };
      
      // Set mock user and profile
      setUser({ id: mockUserId, email: email } as SupabaseUser);
      setProfile(mockUser);
      
      toast({
        title: "Signed in with demo account",
        description: "This is a demo account. Connect to Supabase for full functionality.",
      });
      
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (!error) {
        toast({
          title: "Signed in successfully!",
          description: "Welcome back to HackXplore",
        });
      }
      
      return { error };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      // Just clear local state in demo mode
      setUser(null);
      setProfile(null);
      setSession(null);
      
      toast({
        title: "Signed out from demo account",
      });
      
      return;
    }

    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!isSupabaseConfigured()) {
      // Update local state only in demo mode
      if (profile) {
        const updatedProfile = { ...profile, ...updates };
        setProfile(updatedProfile);
        
        toast({
          title: "Profile updated in demo mode",
          description: "Connect to Supabase to save your profile permanently",
        });
      }
      
      return;
    }

    if (!user) {
      console.error("Cannot update profile - User not logged in");
      return;
    }

    try {
      // Transform app User type to database profile
      const dbUpdates = {
        name: updates.name,
        avatar_url: updates.avatarUrl,
        skills: updates.skills,
        interests: updates.interests,
        preferred_role: updates.preferredRole,
        looking_for: updates.lookingFor,
        bio: updates.bio,
        github_url: updates.githubUrl,
        linkedin_url: updates.linkedinUrl,
        portfolio_url: updates.portfolioUrl,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Update local profile state
      if (profile) {
        setProfile({
          ...profile,
          ...updates,
        });
      }

      toast({
        title: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
