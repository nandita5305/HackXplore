
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Team } from "@/types";

// Mock data for teams (replace with API calls in a real application)
const mockTeamsData = [
  {
    id: "team-1",
    name: "Awesome Team",
    hackathonId: "hackathon-1",
    members: ["user-1", "user-2"],
    createdAt: "2024-03-15T12:00:00Z",
    description: "A team working on an awesome project",
    skillsNeeded: ["JavaScript", "React", "Node.js"],
    creator: "user-1",
    maxMembers: 4,
    isOpen: true,
  },
  {
    id: "team-2",
    name: "Fantastic Four",
    hackathonId: "hackathon-2",
    members: ["user-3", "user-4", "user-5", "user-6"],
    createdAt: "2024-03-20T18:00:00Z",
    description: "A team of fantastic developers",
    skillsNeeded: ["Python", "Machine Learning", "Data Analysis"],
    creator: "user-3",
    maxMembers: 4,
    isOpen: false,
  },
];

export const useTeamService = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Function to fetch teams for a specific hackathon
  const useHackathonTeams = (hackathonId: string) => {
    return useQuery({
      queryKey: ["teams", hackathonId],
      queryFn: () => {
        // Simulate API call to fetch teams for a hackathon
        return mockTeamsData.filter((team) => team.hackathonId === hackathonId);
      },
    });
  };

  // Function to create a new team
  const createTeam = async (
    hackathonId: string,
    teamName: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // In a real implementation, this would make an API call
      console.log(
        `Creating team "${teamName}" for hackathon with ID ${hackathonId}`
      );

      // For mock implementation, we'll just simulate success
      return { success: true };
    } catch (error) {
      console.error("Error creating team:", error);
      return { success: false, error: "Failed to create team" };
    }
  };

  // Function to join a team
  const joinTeam = async (
    teamId: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // In a real implementation, this would make an API call
      console.log(`User joining team: ${teamId}`);

      // For mock implementation, we'll just simulate success
      return { success: true };
    } catch (error) {
      console.error("Error joining team:", error);
      return { success: false, error: "Failed to join team" };
    }
  };
  
  // Function to leave a team
  const leaveTeam = async (teamId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // In a real implementation, this would make an API call
      console.log(`User leaving team: ${teamId}`);
      
      // For mock implementation, we'll just simulate success
      return { success: true };
    } catch (error) {
      console.error("Error leaving team:", error);
      return { success: false, error: "Failed to leave team" };
    }
  };

  return {
    useHackathonTeams,
    createTeam,
    joinTeam,
    leaveTeam,
  };
};

// Also export a useTeams function that exports methods to get teams for a user
export const useTeams = () => {
  const { user } = useAuth();
  
  const useUserTeams = () => {
    return useQuery({
      queryKey: ["userTeams", user?.id],
      queryFn: () => {
        // Simulate API call to fetch teams for a user
        return mockTeamsData.filter((team) => 
          team.members.includes(user?.id || "") || team.creator === user?.id);
      },
      enabled: !!user?.id,
    });
  };
  
  return {
    useUserTeams,
  };
};
