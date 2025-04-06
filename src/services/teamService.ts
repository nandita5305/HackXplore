
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Team, User, UserSkill } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

// This is a mock service for demonstration purposes
// Replace with actual API calls in production

// Sample data
const mockTeams: Team[] = [
  {
    id: "team1",
    name: "Innovation Squad",
    hackathonId: "future-innovators-2024",
    description: "Looking for creative thinkers to build an AI-powered solution for healthcare.",
    skills: ["React", "Python", "AI/ML"],
    creator: "user1",
    members: ["user1", "user2"],
    maxMembers: 4,
    isOpen: true,
  },
  {
    id: "team2",
    name: "Blockchain Builders",
    hackathonId: "dora-hacks-web3-2025",
    description: "Building a decentralized app for sustainable development tracking.",
    skills: ["Solidity", "React", "Node.js"],
    creator: "user3",
    members: ["user3"],
    maxMembers: 5,
    isOpen: true,
  }
];

// Rename the function to useTeams to match the imports in other components
export function useTeams() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  // Get all teams for a specific hackathon
  const useHackathonTeams = (hackathonId: string) => {
    return useQuery({
      queryKey: ["teams", hackathonId],
      queryFn: async () => {
        // Simulate API call
        return new Promise<Team[]>((resolve) => {
          setTimeout(() => {
            resolve(mockTeams.filter(team => team.hackathonId === hackathonId));
          }, 800);
        });
      },
    });
  };

  // Get teams that the current user is a member of
  const useUserTeams = () => {
    return useQuery({
      queryKey: ["userTeams", userId],
      queryFn: async () => {
        // Simulate API call
        return new Promise<Team[]>((resolve) => {
          setTimeout(() => {
            if (!userId) resolve([]);
            resolve(mockTeams.filter(team => team.members.includes(userId || "")));
          }, 800);
        });
      },
      enabled: !!userId,
    });
  };

  // Create a new team
  const { mutate: createTeam, isPending: isCreatingTeam } = useMutation({
    mutationFn: async (newTeam: { 
      name: string; 
      hackathonId: string; 
      description: string; 
      skillsNeeded: UserSkill[];
      maxMembers: number;
    }) => {
      // Simulate API call
      return new Promise<Team>((resolve) => {
        setTimeout(() => {
          const team = {
            id: `team${mockTeams.length + 1}`,
            name: newTeam.name,
            hackathonId: newTeam.hackathonId,
            description: newTeam.description,
            skills: newTeam.skillsNeeded,
            creator: userId || "anonymous",
            members: userId ? [userId] : [],
            maxMembers: newTeam.maxMembers,
            isOpen: true,
          };
          mockTeams.push(team);
          resolve(team);
        }, 800);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["userTeams", userId] });
    },
  });

  // Join an existing team
  const { mutate: joinTeam, isPending: isJoiningTeam } = useMutation({
    mutationFn: async (teamId: string) => {
      // Simulate API call
      return new Promise<Team>((resolve, reject) => {
        setTimeout(() => {
          const teamIndex = mockTeams.findIndex(t => t.id === teamId);
          if (teamIndex === -1) return reject(new Error("Team not found"));
          
          const team = mockTeams[teamIndex];
          if (team.members.length >= team.maxMembers) {
            return reject(new Error("Team is full"));
          }
          
          if (userId && !team.members.includes(userId)) {
            team.members.push(userId);
            mockTeams[teamIndex] = team;
          }
          
          resolve(team);
        }, 800);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["userTeams", userId] });
    },
  });

  // Update team status (open/closed)
  const { mutate: updateTeamStatus, isPending: isUpdatingTeam } = useMutation({
    mutationFn: async ({ teamId, isOpen }: { teamId: string; isOpen: boolean }) => {
      // Simulate API call
      return new Promise<Team>((resolve, reject) => {
        setTimeout(() => {
          const teamIndex = mockTeams.findIndex(t => t.id === teamId);
          if (teamIndex === -1) return reject(new Error("Team not found"));
          
          const team = mockTeams[teamIndex];
          team.isOpen = isOpen;
          mockTeams[teamIndex] = team;
          
          resolve(team);
        }, 800);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["userTeams", userId] });
    },
  });

  // Check if user is already in a team for a specific hackathon
  const isUserInTeam = async (hackathonId: string) => {
    if (!userId) return false;
    
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const userTeam = mockTeams.find(team => 
          team.hackathonId === hackathonId && 
          team.members.includes(userId)
        );
        resolve(!!userTeam);
      }, 300);
    });
  };

  return {
    useHackathonTeams,
    useUserTeams,
    createTeam,
    joinTeam,
    updateTeamStatus,
    isCreatingTeam,
    isJoiningTeam,
    isUpdatingTeam,
    isUserInTeam,
  };
}

// Add this line for backward compatibility, so we don't break other parts that might be using the old import syntax
export { useTeams as default };
