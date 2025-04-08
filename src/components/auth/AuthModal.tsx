
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { User, UserProfile, UserSkill, HackathonType } from "@/types";

// Types
type AuthUser = {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  profile: UserProfile | null;
  signUp: (
    email: string, 
    password: string, 
    name?: string,
    skills?: UserSkill[],
    interests?: HackathonType[]
  ) => Promise<{ user?: AuthUser; error?: { message: string } }>;
  signIn: (email: string, password: string) => Promise<{ user?: AuthUser; error?: { message: string } }>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: UserProfile) => Promise<{ success?: boolean; error?: { message: string } }>;
  isLoading: boolean;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Get auth token from localStorage
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setIsLoading(false);
          return;
        }

        // For mock implementation, we'll just simulate a successful auth check
        // In a real app, you'd validate the token with your backend
        const storedUser = localStorage.getItem('authUser');
        const storedProfile = localStorage.getItem('userProfile');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error("Auth status check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Sign up function
  const signUp = async (
    email: string, 
    password: string,
    name?: string,
    skills?: UserSkill[],
    interests?: HackathonType[]
  ) => {
    try {
      console.log(`Attempting to sign up user with email: ${email}`);
      
      // For mock implementation, we'll just simulate a successful signup
      const newUser: AuthUser = {
        id: `user-${Date.now()}`,
        email,
        name,
        avatarUrl: name ? `https://avatars.dicebear.com/api/initials/${name.charAt(0)}.svg` : undefined
      };
      
      // Create a profile if name, skills and interests are provided
      if (name && skills && interests) {
        const newProfile: UserProfile = {
          name,
          skills: skills,
          interests: interests,
          lookingFor: 'both',
          avatarUrl: newUser.avatarUrl
        };
        
        setProfile(newProfile);
        localStorage.setItem('userProfile', JSON.stringify(newProfile));
      }
      
      // Store auth info
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      localStorage.setItem('authUser', JSON.stringify(newUser));
      
      // Set user in state
      setUser(newUser);
      
      return { user: newUser };
    } catch (error) {
      console.error("Sign up error:", error);
      return { error: { message: "Failed to create account" } };
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      // For mock implementation, we'll just simulate a successful login
      const mockUser: AuthUser = {
        id: `user-${Date.now()}`,
        email,
        name: "Mock User",
        avatarUrl: `https://avatars.dicebear.com/api/initials/M.svg`
      };
      
      const mockProfile: UserProfile = {
        name: "Mock User",
        skills: ["JavaScript", "React", "Node.js"],
        interests: ["Web Development", "Mobile App Development"],
        lookingFor: 'both',
        avatarUrl: mockUser.avatarUrl
      };
      
      // Store auth info
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      localStorage.setItem('authUser', JSON.stringify(mockUser));
      localStorage.setItem('userProfile', JSON.stringify(mockProfile));
      
      // Set user and profile in state
      setUser(mockUser);
      setProfile(mockProfile);
      
      return { user: mockUser };
    } catch (error) {
      console.error("Sign in error:", error);
      return { error: { message: "Invalid credentials" } };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      // Clear local auth state
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      localStorage.removeItem('userProfile');
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Update profile function
  const updateProfile = async (profileData: UserProfile) => {
    try {
      // For mock implementation, just update the profile in localStorage
      setProfile(profileData);
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      
      return { success: true };
    } catch (error) {
      console.error("Profile update error:", error);
      return { error: { message: "Failed to update profile" } };
    }
  };

  // Create context value
  const value = {
    user,
    profile,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Auth Modal Component
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultView);
  const { user } = useAuth();
  
  // Close modal if user is logged in
  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);
  
  const handleSwitchToLogin = () => {
    setActiveTab('login');
  };
  
  const handleSwitchToSignup = () => {
    setActiveTab('signup');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-0">
        <Tabs value={activeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="login" 
              onClick={handleSwitchToLogin}
              className="rounded-none data-[state=active]:bg-primary/10"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              onClick={handleSwitchToSignup}
              className="rounded-none data-[state=active]:bg-primary/10"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="p-6">
            <LoginForm onSwitchToSignup={handleSwitchToSignup} onSuccess={onClose} />
          </TabsContent>
          <TabsContent value="signup" className="px-6 py-4">
            <SignUpForm onSwitchToLogin={handleSwitchToLogin} onSuccess={onClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
