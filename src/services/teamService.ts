
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Team } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

export const useTeams = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchTeams = async () => {
    try {
      if (!supabase) {
        // Return mock data if Supabase is not initialized
        return [];
      }

      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching teams:', error);
      return [];
    }
  };

  const fetchTeamsByHackathon = async (hackathonId: string) => {
    try {
      if (!supabase) {
        // Return mock data if Supabase is not initialized
        return [];
      }

      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('hackathon_id', hackathonId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching teams by hackathon:', error);
      return [];
    }
  };

  const fetchUserTeams = async () => {
    try {
      if (!user || !supabase) {
        // Return mock data if user is not logged in or Supabase is not initialized
        return [];
      }

      // Get teams where user is a member or creator
      const { data: memberData, error: memberError } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id)
        .eq('status', 'accepted');

      if (memberError) {
        throw memberError;
      }

      const teamIds = memberData?.map(item => item.team_id) || [];

      // Also get teams created by the user
      const { data: creatorData, error: creatorError } = await supabase
        .from('teams')
        .select('id')
        .eq('creator_id', user.id);

      if (creatorError) {
        throw creatorError;
      }

      // Combine team IDs
      const allTeamIds = [...teamIds, ...(creatorData?.map(item => item.id) || [])];
      
      // If no teams found, return empty array
      if (allTeamIds.length === 0) {
        return [];
      }

      // Fetch all team details
      const { data: teams, error: teamsError } = await supabase
        .from('teams')
        .select('*')
        .in('id', allTeamIds)
        .order('created_at', { ascending: false });

      if (teamsError) {
        throw teamsError;
      }

      return teams || [];
    } catch (error) {
      console.error('Error fetching user teams:', error);
      return [];
    }
  };

  const createTeam = async (teamData: Omit<Team, 'id' | 'creator' | 'members' | 'created_at'>) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to create a team');
      }

      const newTeam = {
        id: uuidv4(),
        creator_id: user.id,
        ...teamData,
        is_open: true, // Default to open
        max_members: teamData.maxMembers || 4,
      };

      const { error } = await supabase
        .from('teams')
        .insert([
          {
            id: newTeam.id,
            name: newTeam.name,
            description: newTeam.description,
            hackathon_id: newTeam.hackathonId,
            skills_needed: newTeam.skillsNeeded,
            creator_id: newTeam.creator_id,
            max_members: newTeam.max_members,
            is_open: newTeam.is_open,
          }
        ]);

      if (error) throw error;

      // Add the creator as a member
      const { error: memberError } = await supabase
        .from('team_members')
        .insert([
          {
            id: uuidv4(),
            team_id: newTeam.id,
            user_id: user.id,
            status: 'accepted'
          }
        ]);

      if (memberError) throw memberError;

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['userTeams'] });

      return newTeam.id;
    } catch (error) {
      console.error('Error creating team:', error);
      toast({
        title: 'Error creating team',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const joinTeam = async (teamId: string) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to join a team');
      }

      // Check if user already requested to join
      const { data: existingRequest, error: checkError } = await supabase
        .from('team_members')
        .select('*')
        .eq('team_id', teamId)
        .eq('user_id', user.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" which is expected
        throw checkError;
      }

      if (existingRequest) {
        if (existingRequest.status === 'accepted') {
          throw new Error('You are already a member of this team');
        } else if (existingRequest.status === 'pending') {
          throw new Error('Your request to join this team is pending');
        } else if (existingRequest.status === 'rejected') {
          throw new Error('Your request to join this team was rejected');
        }
      }

      // Get the team first to check if it's open and not full
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('*, team_members(*)')
        .eq('id', teamId)
        .single();

      if (teamError) throw teamError;

      if (!team.is_open) {
        throw new Error('This team is not accepting new members');
      }

      if (team.team_members && team.team_members.length >= team.max_members) {
        throw new Error('This team is already full');
      }

      // Add the member
      const { error } = await supabase
        .from('team_members')
        .insert([
          {
            id: uuidv4(),
            team_id: teamId,
            user_id: user.id,
            status: 'accepted' // Auto-accept for now
          }
        ]);

      if (error) throw error;

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['userTeams'] });

      return true;
    } catch (error) {
      console.error('Error joining team:', error);
      toast({
        title: 'Error joining team',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const leaveTeam = async (teamId: string) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to leave a team');
      }

      // Check if user is the creator
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('creator_id')
        .eq('id', teamId)
        .single();

      if (teamError) throw teamError;

      if (team.creator_id === user.id) {
        throw new Error('Team creators cannot leave their own team. You may delete the team instead.');
      }

      // Remove the member
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', teamId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['userTeams'] });

      return true;
    } catch (error) {
      console.error('Error leaving team:', error);
      toast({
        title: 'Error leaving team',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Use React Query to fetch teams
  const useAllTeams = () => useQuery({ 
    queryKey: ['teams'], 
    queryFn: fetchTeams
  });

  const useTeamsByHackathon = (hackathonId: string) => useQuery({ 
    queryKey: ['teams', hackathonId], 
    queryFn: () => fetchTeamsByHackathon(hackathonId)
  });

  const useUserTeams = () => useQuery({ 
    queryKey: ['userTeams'], 
    queryFn: fetchUserTeams,
    enabled: !!user // Only run if user is logged in
  });

  const createTeamMutation = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['userTeams'] });
    }
  });

  return {
    useAllTeams,
    useTeamsByHackathon,
    useUserTeams,
    createTeam: createTeamMutation.mutate,
    joinTeam,
    leaveTeam
  };
};
