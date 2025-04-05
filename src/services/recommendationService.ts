
import { HackathonCard, InternshipCard, User, UserSkill, HackathonType } from "@/types";

// Calculate a score based on the match between user skills/interests and the hackathon/internship
export function getRecommendationScore(
  item: HackathonCard | InternshipCard, 
  user: User | null
): number {
  if (!user) return 0;
  
  let score = 0;
  const skills = 'skills' in item ? item.skills || [] : [];
  const types = 'type' in item ? item.type || [] : [];
  
  // Score based on skill matches (higher weight)
  if (skills.length > 0) {
    const userSkills = user.skills || [];
    const skillMatches = skills.filter(skill => userSkills.includes(skill));
    score += (skillMatches.length / skills.length) * 50; // 50% of total score
  }
  
  // Score based on interest/type matches
  if (types.length > 0) {
    const userInterests = user.interests || [];
    const interestMatches = types.filter(type => userInterests.includes(type));
    score += (interestMatches.length / types.length) * 50; // 50% of total score
  }
  
  return score;
}

// Get recommendations for hackathons
export function getHackathonRecommendations(
  hackathons: HackathonCard[],
  user: User | null,
  limit = 5
): HackathonCard[] {
  if (!user) return hackathons.slice(0, limit);
  
  // Calculate scores for each hackathon
  const scoredHackathons = hackathons.map(hackathon => ({
    hackathon,
    score: getRecommendationScore(hackathon, user)
  }));
  
  // Sort by score (descending)
  scoredHackathons.sort((a, b) => b.score - a.score);
  
  // Return top recommendations
  return scoredHackathons.slice(0, limit).map(item => item.hackathon);
}

// Get recommendations for internships
export function getInternshipRecommendations(
  internships: InternshipCard[],
  user: User | null,
  limit = 5
): InternshipCard[] {
  if (!user) return internships.slice(0, limit);
  
  // Calculate scores for each internship
  const scoredInternships = internships.map(internship => ({
    internship,
    score: getRecommendationScore(internship, user)
  }));
  
  // Sort by score (descending)
  scoredInternships.sort((a, b) => b.score - a.score);
  
  // Return top recommendations
  return scoredInternships.slice(0, limit).map(item => item.internship);
}

// Filter hackathons based on user-selected criteria
export function filterHackathons(
  hackathons: HackathonCard[],
  filters: {
    types?: HackathonType[];
    mode?: 'online' | 'in-person' | 'hybrid' | 'all';
    prizePoolMin?: number;
    prizePoolMax?: number;
    timeframe?: 'upcoming' | 'past' | 'all';
    skills?: UserSkill[];
    teamSize?: number;
  }
): HackathonCard[] {
  return hackathons.filter(hackathon => {
    // Filter by type
    if (filters.types && filters.types.length > 0) {
      if (!hackathon.type || !hackathon.type.some(type => filters.types?.includes(type))) {
        return false;
      }
    }
    
    // Filter by mode
    if (filters.mode && filters.mode !== 'all' && hackathon.mode !== filters.mode) {
      return false;
    }
    
    // Filter by prize pool (if applicable)
    if (hackathon.prizePool && (filters.prizePoolMin || filters.prizePoolMax)) {
      const prizeValue = parseInt(hackathon.prizePool.replace(/[^0-9]/g, ''));
      if (filters.prizePoolMin && prizeValue < filters.prizePoolMin) {
        return false;
      }
      if (filters.prizePoolMax && prizeValue > filters.prizePoolMax) {
        return false;
      }
    }
    
    // Filter by timeframe
    if (filters.timeframe && filters.timeframe !== 'all') {
      const now = new Date();
      const endDateString = hackathon.endDate;
      // Try to parse the end date - this is a simplified approach
      const endDate = new Date(endDateString);
      
      if (filters.timeframe === 'upcoming' && endDate < now) {
        return false;
      }
      if (filters.timeframe === 'past' && endDate >= now) {
        return false;
      }
    }
    
    // Filter by skills
    if (filters.skills && filters.skills.length > 0) {
      if (!hackathon.skills || !hackathon.skills.some(skill => filters.skills?.includes(skill))) {
        return false;
      }
    }
    
    // Filter by team size
    if (filters.teamSize && hackathon.teamSize && hackathon.teamSize < filters.teamSize) {
      return false;
    }
    
    return true;
  });
}

// Filter internships based on user-selected criteria
export function filterInternships(
  internships: InternshipCard[],
  filters: {
    skills?: UserSkill[];
    isRemote?: boolean;
    stipendMin?: number;
    stipendMax?: number;
    location?: string;
    deadlineAfter?: Date;
    deadlineBefore?: Date;
  }
): InternshipCard[] {
  return internships.filter(internship => {
    // Filter by skills
    if (filters.skills && filters.skills.length > 0) {
      if (!internship.skills || !internship.skills.some(skill => filters.skills?.includes(skill))) {
        return false;
      }
    }
    
    // Filter by remote option
    if (filters.isRemote !== undefined && internship.isRemote !== filters.isRemote) {
      return false;
    }
    
    // Filter by stipend range
    if (internship.stipend && (filters.stipendMin || filters.stipendMax)) {
      const stipendValue = parseInt(internship.stipend.replace(/[^0-9]/g, ''));
      if (filters.stipendMin && stipendValue < filters.stipendMin) {
        return false;
      }
      if (filters.stipendMax && stipendValue > filters.stipendMax) {
        return false;
      }
    }
    
    // Filter by location (simple text match)
    if (filters.location && !internship.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Filter by deadline
    const deadlineDate = new Date(internship.deadline);
    if (filters.deadlineAfter && deadlineDate < filters.deadlineAfter) {
      return false;
    }
    if (filters.deadlineBefore && deadlineDate > filters.deadlineBefore) {
      return false;
    }
    
    return true;
  });
}
