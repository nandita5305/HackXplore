
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, BookmarkIcon, UserIcon, LogOut, Menu, X, Home } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [search, setSearch] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "signup">("login");
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      const path = location.pathname.includes("intern") ? "/internships" : "/hackathons";
      navigate(`${path}?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const openLogin = () => {
    setAuthModalView("login");
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthModalView("signup");
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HackXplore
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center justify-center gap-4 flex-1 mx-4">
          <nav className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"} 
                className={isActive("/") ? "gradient-button" : "hover:bg-primary/10 hover:text-primary"}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/hackathons">
              <Button 
                variant={isActive("/hackathons") ? "default" : "ghost"}
                className={isActive("/hackathons") ? "gradient-button" : "hover:bg-primary/10 hover:text-primary"}
              >
                Hackathons
              </Button>
            </Link>
            <Link to="/internships">
              <Button 
                variant={isActive("/internships") ? "default" : "ghost"}
                className={isActive("/internships") ? "gradient-button" : "hover:bg-primary/10 hover:text-primary"}
              >
                Internships
              </Button>
            </Link>
          </nav>
          
          <form onSubmit={handleSearch} className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for hackathons and internships..."
              className="w-full pl-10 bg-muted/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={profile?.avatarUrl} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {profile?.name ? profile.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-md border-primary/20">
                <div className="flex items-center justify-start p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {profile?.name && <p className="font-medium">{profile.name}</p>}
                    {user.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/bookmarks")} className="cursor-pointer">
                  <BookmarkIcon className="mr-2 h-4 w-4" />
                  <span>Bookmarks</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={openLogin} className="hover:bg-primary/10 hover:text-primary">Sign In</Button>
              <Button onClick={openSignup} className="gradient-button">Sign Up</Button>
            </div>
          )}
        </div>
        
        {/* Mobile menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col bg-card/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4 mt-4">
                <form onSubmit={handleSearch} className="relative w-full">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
                
                <Link to="/">
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
                <Link to="/hackathons">
                  <Button variant="ghost" className="w-full justify-start">Hackathons</Button>
                </Link>
                <Link to="/internships">
                  <Button variant="ghost" className="w-full justify-start">Internships</Button>
                </Link>
                
                {user ? (
                  <>
                    <Link to="/profile">
                      <Button variant="ghost" className="w-full justify-start">
                        <UserIcon className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    <Link to="/bookmarks">
                      <Button variant="ghost" className="w-full justify-start">
                        <BookmarkIcon className="mr-2 h-4 w-4" />
                        Bookmarks
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button onClick={openLogin} className="w-full">Sign In</Button>
                    <Button onClick={openSignup} variant="default" className="w-full gradient-button">Sign Up</Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultView={authModalView}
      />
    </header>
  );
}
