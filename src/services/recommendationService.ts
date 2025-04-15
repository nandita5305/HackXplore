import { HackathonCard, HackathonType, UserSkill } from "@/types";

// Type for filtering hackathons
interface HackathonFilters {
  types: HackathonType[];
  mode: "all" | "online" | "in-person" | "hybrid";
  prizePoolMin: number;
  prizePoolMax: number;
  timeframe: "all" | "upcoming" | "ongoing" | "past";
  skills: UserSkill[];
}

// Filter hackathons based on provided filters
export const filterHackathons = (hackathons: HackathonCard[], filters: HackathonFilters): HackathonCard[] => {
  return hackathons.filter(hackathon => {
    // Filter by type
    if (filters.types.length > 0) {
      if (!hackathon.type) return false;
      
      const hackathonTypes = Array.isArray(hackathon.type) 
        ? hackathon.type.map(t => t as HackathonType) 
        : [hackathon.type as HackathonType];
        
      const hasMatchingType = filters.types.some(type => 
        hackathonTypes.includes(type)
      );
      
      if (!hasMatchingType) return false;
    }
    
    // Filter by mode
    if (filters.mode !== "all") {
      if (hackathon.mode !== filters.mode) return false;
    }
    
    // Filter by prize pool
    if (hackathon.prizePool !== undefined) {
      let prizePoolNumber: number;
      
      // Handle both string and number types for prizePool
      if (typeof hackathon.prizePool === 'string') {
        // Remove non-numeric characters if it's a string
        prizePoolNumber = parseInt(hackathon.prizePool.replace(/[^0-9]/g, ""));
      } else {
        // If it's already a number, use it directly
        prizePoolNumber = hackathon.prizePool;
      }
      
      // Check if the prize pool is within the specified range
      if (isNaN(prizePoolNumber) || prizePoolNumber < filters.prizePoolMin || prizePoolNumber > filters.prizePoolMax) {
        return false;
      }
    }
    
    // Filter by skills
    if (filters.skills.length > 0 && hackathon.skills) {
      const hackathonSkills = Array.isArray(hackathon.skills) 
        ? hackathon.skills.map(s => s as UserSkill) 
        : [hackathon.skills as UserSkill];
        
      const hasMatchingSkill = filters.skills.some(skill => 
        hackathonSkills.includes(skill)
      );
      
      if (!hasMatchingSkill) return false;
    }
    
    // Filter by timeframe
    if (filters.timeframe !== "all") {
      const now = new Date();
      const startDate = new Date(hackathon.startDate);
      const endDate = new Date(hackathon.endDate);
      
      if (filters.timeframe === "upcoming" && startDate <= now) {
        return false;
      }
      
      if (filters.timeframe === "ongoing" && (startDate > now || endDate < now)) {
        return false;
      }
      
      if (filters.timeframe === "past" && endDate >= now) {
        return false;
      }
    }
    
    return true;
  });
};

// Filter internships based on provided filters
export const filterInternships = (internships: any[], filters: any): any[] => {
  return internships.filter(internship => {
    // Filter by skills
    if (filters.skills && filters.skills.length > 0 && internship.skills) {
      const internshipSkills = Array.isArray(internship.skills) 
        ? internship.skills 
        : [internship.skills];
        
      const hasMatchingSkill = filters.skills.some((skill: string) => 
        internshipSkills.includes(skill)
      );
      
      if (!hasMatchingSkill) return false;
    }
    
    // Filter by remote preference
    if (filters.isRemote !== undefined && internship.isRemote !== filters.isRemote) {
      return false;
    }
    
    return true;
  });
};

// Get internship recommendations based on user profile
// Define this function before it's referenced in getHackathonRecommendations
export const getRecommendedInternships = (
  internships: any[],
  userSkills: UserSkill[] = []
): any[] => {
  if (!userSkills.length) {
    return internships.slice(0, 3); // Return first 3 if no user skills
  }
  
  return internships
    .map(internship => {
      let score = 0;
      
      // Score based on matching skills
      if (internship.skills && userSkills.length) {
        const internshipSkills = Array.isArray(internship.skills) 
          ? internship.skills.map(s => s as UserSkill) 
          : [internship.skills as UserSkill];
          
        userSkills.forEach(skill => {
          if (internshipSkills.includes(skill)) {
            score += 2;
          }
        });
      }
      
      // Boost score for remote internships (might be preferred)
      if (internship.isRemote) {
        score += 1;
      }
      
      return { ...internship, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ score, ...internship }) => internship);
};

// Get hackathon recommendations based on user profile
export const getRecommendedHackathons = (
  hackathons: HackathonCard[],
  userSkills: UserSkill[] = [],
  userInterests: HackathonType[] = []
): HackathonCard[] => {
  if (!userSkills.length && !userInterests.length) {
    return hackathons.slice(0, 3); // Return first 3 if no user preferences
  }
  
  return hackathons
    .map(hackathon => {
      let score = 0;
      
      // Score based on matching skills
      if (hackathon.skills && userSkills.length) {
        const hackathonSkills = Array.isArray(hackathon.skills) 
          ? hackathon.skills.map(s => s as UserSkill) 
          : [hackathon.skills as UserSkill];
          
        userSkills.forEach(skill => {
          if (hackathonSkills.includes(skill)) {
            score += 2;
          }
        });
      }
      
      // Score based on matching interests/types
      if (hackathon.type && userInterests.length) {
        const hackathonTypes = Array.isArray(hackathon.type) 
          ? hackathon.type.map(t => t as HackathonType) 
          : [hackathon.type as HackathonType];
          
        userInterests.forEach(interest => {
          if (hackathonTypes.includes(interest)) {
            score += 3;
          }
        });
      }
      
      // Boost score for upcoming hackathons
      const now = new Date();
      const startDate = new Date(hackathon.startDate);
      if (startDate > now) {
        score += 1;
      }
      
      return { ...hackathon, score };
    })
    .sort((a, b) => (b as any).score - (a as any).score)
    .slice(0, 5)
    .map(({ score, ...hackathon }) => hackathon);
};

// Backward compatibility aliases - defined after the main functions
export const getHackathonRecommendations = getRecommendedHackathons;
export const getInternshipRecommendations = getRecommendedInternships;

export const filterScholarships = (
  scholarships: any[],
  filters: {
    types: string[];
    amountMin: number;
    amountMax: number;
    deadlineType: "all" | "upcoming" | "urgent";
    provider: string;
    eligibility: string[];
  }
) => {
  return scholarships.filter((scholarship) => {
    // Filter by type
    if (filters.types.length > 0 && !filters.types.includes(scholarship.type)) {
      return false;
    }

    // Filter by amount range
    if (
      scholarship.amount < filters.amountMin ||
      scholarship.amount > filters.amountMax
    ) {
      return false;
    }

    // Filter by deadline
    if (filters.deadlineType !== "all") {
      const deadlineDate = new Date(scholarship.deadline);
      const currentDate = new Date();
      const timeDiff = deadlineDate.getTime() - currentDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (filters.deadlineType === "upcoming" && (daysDiff < 0 || daysDiff > 30)) {
        return false;
      }

      if (filters.deadlineType === "urgent" && (daysDiff < 0 || daysDiff > 7)) {
        return false;
      }
    }

    // Filter by provider
    if (filters.provider && !scholarship.provider.toLowerCase().includes(filters.provider.toLowerCase())) {
      return false;
    }

    // Filter by eligibility criteria
    if (filters.eligibility.length > 0) {
      const hasMatchingCriteria = filters.eligibility.some(criterion => 
        scholarship.eligibility.includes(criterion)
      );
      if (!hasMatchingCriteria) {
        return false;
      }
    }

    return true;
  });
};
