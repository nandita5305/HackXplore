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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function getProfile() {
      if (!user) {
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
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        toast({
          title: 'Error signing up',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Check your inbox',
          description: 'Verify your email to continue.',
        });

        // Optional: You can still manually insert a profile,
        // but the trigger should already do it.
        const newUser = data.user;
        if (newUser) {
          await supabase.from('profiles').insert({
            id: newUser.id,
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
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (!error) {
        toast({
          title: 'Signed in successfully!',
          description: 'Welcome back to HackXplore',
        });
      }

      return { error };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Signed out successfully',
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    try {
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

      if (error) throw error;

      if (profile) {
        setProfile({
          ...profile,
          ...updates,
        });
      }

      toast({
        title: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile',
        variant: 'destructive',
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
