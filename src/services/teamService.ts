
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Team, UserSkill } from "@/types";

// Mock data for teams (replace with API calls in a real application)
const mockTeamsData: Team[] = [
  {
    id: "team-1",
    name: "Awesome Team",
    hackathonId: "hackathon-1",
    members: ["user-1", "user-2"],
    createdAt: "2024-03-15T12:00:00Z",
    description: "A team working on an awesome project",
    skillsNeeded: ["JavaScript", "React", "Node.js"] as UserSkill[],
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
    skillsNeeded: ["Python", "Machine Learning", "Data Analysis"] as UserSkill[],
    creator: "user-3",
    maxMembers: 4,
    isOpen: false,
  },
];

// Mock data for team join requests
const mockJoinRequestsData: {
  id: string;
  teamId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}[] = [
  {
    id: "request-1",
    teamId: "team-1",
    userId: "user-3",
    status: "pending",
    createdAt: "2024-03-21T10:00:00Z"
  }
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
  
  // Function to check if a user is in a specific team
  const isUserInTeam = (teamId: string): boolean => {
    if (!user) return false;
    const team = mockTeamsData.find(t => t.id === teamId);
    return team ? team.members.includes(user.id) || team.creator === user.id : false;
  };

  // Function to create a new team
  const createTeam = async (teamData: {
    hackathonId: string;
    name: string;
    description?: string;
    skillsNeeded?: UserSkill[];
    maxMembers?: number;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      // In a real implementation, this would make an API call
      console.log("Creating team:", teamData);

      // For mock implementation, we'll simulate adding a team
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        name: teamData.name,
        hackathonId: teamData.hackathonId,
        description: teamData.description || `Team for hackathon ${teamData.hackathonId}`,
        skillsNeeded: teamData.skillsNeeded || [],
        maxMembers: teamData.maxMembers || 4,
        creator: user?.id || "unknown",
        members: [user?.id || "unknown"],
        createdAt: new Date().toISOString(),
        isOpen: true,
      };
      
      // Add the team to mock data
      mockTeamsData.push(newTeam);
      
      // Invalidate team queries
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["userTeams"] });
      
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

      // Create a join request
      const newRequest = {
        id: `request-${Date.now()}`,
        teamId,
        userId: user?.id || "unknown",
        status: "pending" as const,
        createdAt: new Date().toISOString()
      };
      
      mockJoinRequestsData.push(newRequest);
      queryClient.invalidateQueries({ queryKey: ["joinRequests"] });
      
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
      
      const teamIndex = mockTeamsData.findIndex(t => t.id === teamId);
      if (teamIndex !== -1 && user) {
        // Remove user from team members
        mockTeamsData[teamIndex].members = mockTeamsData[teamIndex].members.filter(
          memberId => memberId !== user.id
        );
        
        queryClient.invalidateQueries({ queryKey: ["teams"] });
        queryClient.invalidateQueries({ queryKey: ["userTeams"] });
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error leaving team:", error);
      return { success: false, error: "Failed to leave team" };
    }
  };
  
  // Function to delete a team (only for creators)
  const deleteTeam = async (teamId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const team = mockTeamsData.find(t => t.id === teamId);
      
      if (!team) {
        return { success: false, error: "Team not found" };
      }
      
      if (team.creator !== user?.id) {
        return { success: false, error: "Only team creator can delete the team" };
      }
      
      // Remove the team from mock data
      const teamIndex = mockTeamsData.findIndex(t => t.id === teamId);
      if (teamIndex !== -1) {
        mockTeamsData.splice(teamIndex, 1);
        queryClient.invalidateQueries({ queryKey: ["teams"] });
        queryClient.invalidateQueries({ queryKey: ["userTeams"] });
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting team:", error);
      return { success: false, error: "Failed to delete team" };
    }
  };
  
  // Function to handle join requests
  const respondToJoinRequest = async (
    requestId: string, 
    status: 'accepted' | 'rejected'
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const requestIndex = mockJoinRequestsData.findIndex(r => r.id === requestId);
      
      if (requestIndex === -1) {
        return { success: false, error: "Request not found" };
      }
      
      const request = mockJoinRequestsData[requestIndex];
      const team = mockTeamsData.find(t => t.id === request.teamId);
      
      if (!team) {
        return { success: false, error: "Team not found" };
      }
      
      if (team.creator !== user?.id) {
        return { success: false, error: "Only team creator can respond to requests" };
      }
      
      // Update request status
      mockJoinRequestsData[requestIndex].status = status;
      
      // If accepted, add user to team
      if (status === 'accepted') {
        const teamIndex = mockTeamsData.findIndex(t => t.id === request.teamId);
        if (teamIndex !== -1 && !mockTeamsData[teamIndex].members.includes(request.userId)) {
          mockTeamsData[teamIndex].members.push(request.userId);
        }
      }
      
      queryClient.invalidateQueries({ queryKey: ["joinRequests"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      
      return { success: true };
    } catch (error) {
      console.error("Error responding to join request:", error);
      return { success: false, error: "Failed to respond to join request" };
    }
  };
  
  // Function to get pending join requests for user's teams
  const useTeamJoinRequests = () => {
    return useQuery({
      queryKey: ["joinRequests", user?.id],
      queryFn: () => {
        if (!user) return [];
        
        // Get teams created by the user
        const userCreatedTeams = mockTeamsData.filter(team => team.creator === user.id);
        const userTeamIds = userCreatedTeams.map(team => team.id);
        
        // Get join requests for those teams
        return mockJoinRequestsData.filter(request => 
          userTeamIds.includes(request.teamId) && request.status === 'pending'
        );
      },
      enabled: !!user,
    });
  };
  
  // Function to get user's sent join requests
  const useUserSentRequests = () => {
    return useQuery({
      queryKey: ["sentRequests", user?.id],
      queryFn: () => {
        if (!user) return [];
        
        return mockJoinRequestsData.filter(request => request.userId === user.id);
      },
      enabled: !!user,
    });
  };

  return {
    useHackathonTeams,
    createTeam,
    joinTeam,
    leaveTeam,
    deleteTeam,
    isUserInTeam,
    useTeamJoinRequests,
    respondToJoinRequest,
    useUserSentRequests
  };
};

// Export a useTeams function for getting user teams
export const useTeams = () => {
  const { user } = useAuth();
  const teamService = useTeamService();
  
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
    ...teamService
  };
};
