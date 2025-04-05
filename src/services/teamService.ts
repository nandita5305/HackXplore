
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { Team, UserSkill } from "@/types";

export function useTeams() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Function to fetch all teams for a hackathon
  const fetchTeamsByHackathon = async (hackathonId: string) => {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .eq("hackathon_id", hackathonId);

    if (error) {
      throw error;
    }

    return data || [];
  };

  // Function to fetch teams that the user is part of
  const fetchUserTeams = async () => {
    if (!user) return [];

    // Get teams where user is the creator
    const { data: createdTeams, error: createdError } = await supabase
      .from("teams")
      .select("*")
      .eq("creator_id", user.id);

    if (createdError) {
      throw createdError;
    }

    // Get team memberships for the user
    const { data: memberships, error: membershipError } = await supabase
      .from("team_members")
      .select("team_id, status")
      .eq("user_id", user.id)
      .eq("status", "accepted");

    if (membershipError) {
      throw membershipError;
    }

    // If no memberships, return just the created teams
    if (!memberships.length) {
      return createdTeams || [];
    }

    // Get teams where user is a member
    const { data: memberTeams, error: memberTeamsError } = await supabase
      .from("teams")
      .select("*")
      .in(
        "id",
        memberships.map((m) => m.team_id)
      );

    if (memberTeamsError) {
      throw memberTeamsError;
    }

    // Combine created teams and teams where user is a member
    const allTeams = [...(createdTeams || []), ...(memberTeams || [])];
    return allTeams.filter(
      (team, index, self) => index === self.findIndex((t) => t.id === team.id)
    );
  };

  // Query to get teams for a specific hackathon
  const useHackathonTeams = (hackathonId: string) => {
    return useQuery({
      queryKey: ["teams", "hackathon", hackathonId],
      queryFn: () => fetchTeamsByHackathon(hackathonId),
      enabled: !!hackathonId,
    });
  };

  // Query to get user teams
  const useUserTeams = () => {
    return useQuery({
      queryKey: ["teams", "user", user?.id],
      queryFn: fetchUserTeams,
      enabled: !!user,
    });
  };

  // Mutation to create a new team
  const createTeamMutation = useMutation({
    mutationFn: async ({
      name,
      hackathonId,
      description,
      skillsNeeded,
      maxMembers,
    }: {
      name: string;
      hackathonId: string;
      description: string;
      skillsNeeded: UserSkill[];
      maxMembers: number;
    }) => {
      if (!user) throw new Error("User not authenticated");

      const newTeam = {
        id: uuidv4(),
        name,
        hackathon_id: hackathonId,
        description,
        skills_needed: skillsNeeded,
        creator_id: user.id,
        max_members: maxMembers,
        is_open: true,
      };

      const { data, error } = await supabase.from("teams").insert(newTeam).select();

      if (error) throw error;
      return data[0];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast({
        title: "Team created",
        description: `Your team ${data.name} has been created successfully`,
      });
    },
    onError: (error) => {
      console.error("Failed to create team:", error);
      toast({
        title: "Failed to create team",
        description: "There was an error creating your team",
        variant: "destructive",
      });
    },
  });

  // Mutation to join a team
  const joinTeamMutation = useMutation({
    mutationFn: async (teamId: string) => {
      if (!user) throw new Error("User not authenticated");

      const newMembership = {
        id: uuidv4(),
        team_id: teamId,
        user_id: user.id,
        status: "pending",
      };

      const { data, error } = await supabase
        .from("team_members")
        .insert(newMembership)
        .select();

      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast({
        title: "Team join request sent",
        description: "Your request to join the team has been sent",
      });
    },
    onError: (error) => {
      console.error("Failed to join team:", error);
      toast({
        title: "Failed to join team",
        description: "There was an error sending your request",
        variant: "destructive",
      });
    },
  });

  // Mutation to update team status (open/closed)
  const updateTeamStatusMutation = useMutation({
    mutationFn: async ({ teamId, isOpen }: { teamId: string; isOpen: boolean }) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("teams")
        .update({ is_open: isOpen })
        .eq("id", teamId)
        .eq("creator_id", user.id) // Only the creator can update
        .select();

      if (error) throw error;
      return data[0];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast({
        title: `Team ${data.is_open ? "opened" : "closed"}`,
        description: `Your team is now ${
          data.is_open ? "open for new members" : "closed to new members"
        }`,
      });
    },
    onError: (error) => {
      console.error("Failed to update team status:", error);
      toast({
        title: "Failed to update team",
        description: "There was an error updating your team status",
        variant: "destructive",
      });
    },
  });

  // Function to check if user is in a team for a hackathon
  const isUserInTeam = async (hackathonId: string) => {
    if (!user) return false;

    // Check if user created any teams for this hackathon
    const { data: createdTeams, error: createdError } = await supabase
      .from("teams")
      .select("id")
      .eq("creator_id", user.id)
      .eq("hackathon_id", hackathonId);

    if (createdError) {
      console.error("Error checking created teams:", createdError);
      return false;
    }

    if (createdTeams && createdTeams.length > 0) {
      return true;
    }

    // Check if user is a member of any team for this hackathon
    const { data: teams, error: teamsError } = await supabase
      .from("teams")
      .select("id")
      .eq("hackathon_id", hackathonId);

    if (teamsError) {
      console.error("Error checking teams:", teamsError);
      return false;
    }

    if (!teams || teams.length === 0) {
      return false;
    }

    const teamIds = teams.map(team => team.id);

    const { data: memberships, error: membershipError } = await supabase
      .from("team_members")
      .select("team_id")
      .eq("user_id", user.id)
      .eq("status", "accepted")
      .in("team_id", teamIds);

    if (membershipError) {
      console.error("Error checking team memberships:", membershipError);
      return false;
    }

    return memberships && memberships.length > 0;
  };

  return {
    useHackathonTeams,
    useUserTeams,
    createTeam: createTeamMutation.mutate,
    joinTeam: joinTeamMutation.mutate,
    updateTeamStatus: updateTeamStatusMutation.mutate,
    isCreatingTeam: createTeamMutation.isPending,
    isJoiningTeam: joinTeamMutation.isPending,
    isUpdatingTeam: updateTeamStatusMutation.isPending,
    isUserInTeam,
  };
}
