
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { ProfileForm } from "./ProfileForm";
import { useAuth } from "@/contexts/AuthContext";

type AuthView = "login" | "signup" | "profile";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: AuthView;
}

export function AuthModal({ isOpen, onClose, defaultView = "login" }: AuthModalProps) {
  const [view, setView] = useState<AuthView>(defaultView);
  const { user, profile } = useAuth();

  // If the user is logged in but doesn't have a profile, show the profile form
  const currentView = user && !profile?.name ? "profile" : view;

  const handleSuccess = () => {
    if (user && !profile?.name) {
      setView("profile");
    } else {
      onClose();
    }
  };

  const handleProfileComplete = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-xl bg-transparent border-none shadow-none">
        {currentView === "login" && (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToSignUp={() => setView("signup")}
          />
        )}
        {currentView === "signup" && (
          <SignUpForm onSuccess={() => {
              // close modal or redirect to dashboard
              }} onSwitchToLogin={() => {
              setAuthView("login"); // your modal state manager
        }} />

        )}
        {currentView === "profile" && (
          <ProfileForm onComplete={handleProfileComplete} />
        )}
      </DialogContent>
    </Dialog>
  );
}
