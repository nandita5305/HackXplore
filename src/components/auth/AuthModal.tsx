
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
type AuthUser = {
  id: string;
  email: string;
};

type UserProfile = {
  name?: string;
  avatarUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  skills?: string[];
  interests?: string[];
  lookingFor?: 'hackathons' | 'internships' | 'both';
};

type AuthContextType = {
  user: AuthUser | null;
  profile: UserProfile | null;
  signUp: (email: string, password: string) => Promise<{ user?: AuthUser; error?: { message: string } }>;
  signIn: (email: string, password: string) => Promise<{ user?: AuthUser; error?: { message: string } }>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: UserProfile) => Promise<{ success?: boolean; error?: { message: string } }>;
  isLoading: boolean;
};

// AuthModal props
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: "login" | "signup";
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL - should match your backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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

        // Verify token with backend
        const response = await fetch(`${API_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          
          // Also fetch user profile if available
          try {
            const profileResponse = await fetch(`${API_URL}/users/profile`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (profileResponse.ok) {
              const profileData = await profileResponse.json();
              setProfile(profileData);
            }
          } catch (profileError) {
            console.error("Error fetching profile:", profileError);
          }
        } else {
          // Invalid token, clear it
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error("Auth status check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Sign up function with better error handling
  const signUp = async (email: string, password: string) => {
    try {
      console.log(`Attempting to sign up user with email: ${email}`);
      
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      console.log(`Sign up response status: ${response.status}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error("Signup API error:", data.error || "Unknown error");
        return { error: { message: data.error || "Failed to create account" } };
      }
      
      // Save auth token
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Set user in state
      setUser(data.user);
      
      return { user: data.user };
    } catch (error) {
      console.error("Sign up network error:", error);
      return { error: { message: "Network error: Unable to connect to authentication service" } };
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { error: { message: data.error || "Invalid credentials" } };
      }
      
      // Save auth token
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Set user in state
      setUser(data.user);
      
      // Also fetch user profile if available
      try {
        const profileResponse = await fetch(`${API_URL}/users/profile`, {
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfile(profileData);
        }
      } catch (profileError) {
        console.error("Error fetching profile after login:", profileError);
      }
      
      return { user: data.user };
    } catch (error) {
      console.error("Sign in error:", error);
      return { error: { message: "Network error: Unable to connect to authentication service" } };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          // Optional: Notify backend about logout
          await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
        } catch (error) {
          console.error("Error during backend logout:", error);
          // Continue with local logout regardless
        }
      }
    } finally {
      // Always clear local auth state
      localStorage.removeItem('authToken');
      setUser(null);
      setProfile(null);
    }
  };

  // Update profile function
  const updateProfile = async (profileData: UserProfile) => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return { error: { message: "Not authenticated" } };
      }
      
      console.log("Sending profile update with data:", profileData);
      
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error("Profile update API error:", data.error || "Unknown error");
        return { error: { message: data.error || "Failed to update profile" } };
      }
      
      // Update local profile state
      setProfile(data.profile);
      
      return { success: true };
    } catch (error) {
      console.error("Profile update network error:", error);
      return { error: { message: "Network error: Unable to connect to profile service" } };
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
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Modal Component
export function AuthModal({ isOpen, onClose, defaultView = "login" }: AuthModalProps) {
  const [activeView, setActiveView] = useState<"login" | "signup">(defaultView);
  
  const handleViewChange = (view: "login" | "signup") => {
    setActiveView(view);
  };
  
  const handleClose = () => {
    onClose();
    // Reset to default view when closing
    setTimeout(() => setActiveView(defaultView), 300);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-transparent border-none shadow-none">
        {activeView === "login" ? (
          <LoginForm onSuccess={handleClose} onSwitchToSignUp={() => handleViewChange("signup")} />
        ) : (
          <SignUpForm onSuccess={handleClose} onSwitchToLogin={() => handleViewChange("login")} />
        )}
      </DialogContent>
    </Dialog>
  );
}
