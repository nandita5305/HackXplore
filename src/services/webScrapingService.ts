
import { useQuery } from '@tanstack/react-query';
import { HackathonCard, InternshipCard, Scholarship } from '@/types';
import { toast } from '@/hooks/use-toast';

// Simulated API endpoints for web scraping
const API_ENDPOINTS = {
  hackathons: '/api/scrape/hackathons',
  internships: '/api/scrape/internships',
  scholarships: '/api/scrape/scholarships'
};

interface ScrapingResponse<T> {
  data: T[];
  lastUpdated: string;
  source: string;
}

export const useScrapedHackathons = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['scrapedHackathons'],
    queryFn: async (): Promise<ScrapingResponse<HackathonCard>> => {
      try {
        // In a real implementation, this would call an actual API endpoint
        // Simulating a response for now
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return {
          data: [
            {
              id: "scraped-hackathon-1",
              title: "Cloud Innovation Challenge",
              organizer: "AWS",
              startDate: "2025-06-15",
              endDate: "2025-06-17",
              location: "Online",
              mode: "Remote",
              prizePool: 20000,
              tags: ["Cloud", "Innovation"],
              applicationDeadline: "2025-06-10",
              url: "https://aws.amazon.com/events/",
              image: "/hackathons/aws-hackathon.jpg",
              isPopular: true,
              type: "Themed"
            },
            {
              id: "scraped-hackathon-2",
              title: "Sustainable Tech Hackathon",
              organizer: "Green Tech Alliance",
              startDate: "2025-07-20",
              endDate: "2025-07-22",
              location: "San Francisco, CA",
              mode: "In-person",
              prizePool: 15000,
              tags: ["Sustainability", "CleanTech"],
              applicationDeadline: "2025-07-15",
              url: "https://greentechalliance.org/events",
              image: "/hackathons/green-tech.jpg",
              isPopular: false,
              type: "Open"
            }
          ],
          lastUpdated: new Date().toISOString(),
          source: "DevPost, MLH"
        };
      } catch (error) {
        console.error("Error fetching scraped hackathons:", error);
        throw new Error("Failed to fetch hackathon data from external sources");
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const manualRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Hackathon data refreshed",
        description: "Latest hackathons have been fetched from external sources.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Could not fetch the latest hackathon data. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return {
    scrapedHackathons: data?.data || [],
    lastUpdated: data?.lastUpdated,
    source: data?.source,
    isLoading,
    error,
    refetch: manualRefresh
  };
};

export const useScrapedInternships = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['scrapedInternships'],
    queryFn: async (): Promise<ScrapingResponse<InternshipCard>> => {
      try {
        // Simulating a response
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return {
          data: [
            {
              id: "scraped-internship-1",
              title: "Machine Learning Intern",
              company: "TechGiant",
              location: "Mountain View, CA",
              isRemote: false,
              stipend: 6000,
              duration: "3 months",
              applicationDeadline: "2025-05-15",
              url: "https://techgiant.com/careers",
              logo: "/companies/techgiant.jpg",
              requiredSkills: ["Python", "TensorFlow", "Data Analysis"],
              companySize: "Large",
              description: "Join our ML team to work on cutting-edge AI projects."
            },
            {
              id: "scraped-internship-2",
              title: "Frontend Developer Intern",
              company: "StartupX",
              location: "Remote",
              isRemote: true,
              stipend: 4000,
              duration: "6 months",
              applicationDeadline: "2025-04-30",
              url: "https://startupx.io/jobs",
              logo: "/companies/startupx.jpg",
              requiredSkills: ["React", "TypeScript", "CSS"],
              companySize: "Startup",
              description: "Help build our customer-facing web application."
            }
          ],
          lastUpdated: new Date().toISOString(),
          source: "LinkedIn, Indeed, Glassdoor"
        };
      } catch (error) {
        console.error("Error fetching scraped internships:", error);
        throw new Error("Failed to fetch internship data from external sources");
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const manualRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Internship data refreshed",
        description: "Latest internships have been fetched from external sources.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Could not fetch the latest internship data. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return {
    scrapedInternships: data?.data || [],
    lastUpdated: data?.lastUpdated,
    source: data?.source,
    isLoading,
    error,
    refetch: manualRefresh
  };
};

export const useScrapedScholarships = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['scrapedScholarships'],
    queryFn: async (): Promise<ScrapingResponse<Scholarship>> => {
      try {
        // Simulating a response
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return {
          data: [
            {
              id: "scraped-scholarship-1",
              title: "Future Tech Leaders Scholarship",
              provider: "Tech Foundation",
              amount: 12500,
              deadline: "2025-05-30",
              type: "Merit-based",
              eligibility: ["Undergraduate Students", "Computer Science Majors", "GPA 3.5+"],
              link: "https://techfoundation.org/scholarships",
              description: "Supporting the next generation of technology innovators with financial assistance for their education."
            },
            {
              id: "scraped-scholarship-2",
              title: "Women in Engineering Grant",
              provider: "Engineering Society",
              amount: 8000,
              deadline: "2025-06-15",
              type: "Diversity",
              eligibility: ["Women", "Engineering Majors", "Undergraduate Students"],
              link: "https://engsociety.org/grants",
              description: "Empowering women to pursue careers in engineering through educational funding."
            }
          ],
          lastUpdated: new Date().toISOString(),
          source: "Scholarship.com, Fastweb, CollegeBoard"
        };
      } catch (error) {
        console.error("Error fetching scraped scholarships:", error);
        throw new Error("Failed to fetch scholarship data from external sources");
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const manualRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Scholarship data refreshed",
        description: "Latest scholarships have been fetched from external sources.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Could not fetch the latest scholarship data. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return {
    scrapedScholarships: data?.data || [],
    lastUpdated: data?.lastUpdated,
    source: data?.source,
    isLoading,
    error,
    refetch: manualRefresh
  };
};

export const useWebScraper = () => {
  const hackathons = useScrapedHackathons();
  const internships = useScrapedInternships();
  const scholarships = useScrapedScholarships();
  
  const refreshAll = async () => {
    try {
      toast({
        title: "Refreshing all data",
        description: "Fetching the latest opportunities from external sources...",
      });
      
      await Promise.all([
        hackathons.refetch(),
        internships.refetch(),
        scholarships.refetch()
      ]);
      
      toast({
        title: "All data refreshed",
        description: "Successfully updated hackathons, internships, and scholarships.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Could not fetch all the latest data. Please try again later.",
        variant: "destructive",
      });
    }
  };
  
  return {
    hackathons,
    internships,
    scholarships,
    refreshAll,
    isLoading: hackathons.isLoading || internships.isLoading || scholarships.isLoading
  };
};
