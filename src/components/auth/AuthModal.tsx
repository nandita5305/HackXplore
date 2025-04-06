
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { ProfileForm } from "./ProfileForm";
import { useAuth } from "@/contexts/AuthContext";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const getTitleText = () => {
    switch(currentView) {
      case "login": return "Sign In";
      case "signup": return "Sign Up";
      case "profile": return "Complete Your Profile";
      default: return "Authentication";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-xl bg-transparent border-none shadow-none p-0 max-h-[90vh] overflow-hidden">
        <DialogTitle>
          <VisuallyHidden>{getTitleText()}</VisuallyHidden>
        </DialogTitle>
        
        <ScrollArea className="max-h-[80vh]">
          <div className="p-4">
            {currentView === "login" && (
              <LoginForm
                onSuccess={handleSuccess}
                onSwitchToSignUp={() => setView("signup")}
              />
            )}
            {currentView === "signup" && (
              <SignUpForm
                onSuccess={handleSuccess}
                onSwitchToLogin={() => setView("login")}
              />
            )}
            {currentView === "profile" && (
              <ProfileForm onComplete={handleProfileComplete} />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
