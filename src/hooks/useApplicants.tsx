import { useQuery, UseQueryOptions } from "@tanstack/react-query";
const APPLICANTS_API = "/api/applicants";

const DEFAULT_APPLICANTS_COUNT = 50;
// those should be coming from another API
export const STAGES = [
  "Applied",
  "Phone Screen",
  "Technical Interview",
  "Onsite",
  "Offer",
  "Hired",
];

export const SOURCES = [
  "LinkedIn",
  "Internal Referral",
  "Indeed",
  "Stack Overflow",
  "Company Website",
];

export const ROLES = [
  "Frontend Engineer",
  "Backend Engineer",
  "Data Scientist",
  "Product Manager",
  "DevOps Engineer",
];

export const SALARY_BANDS = ["Junior", "Mid", "Senior"];

export type Candidate = {
  id: number;
  name: string;
  stage: string;
  source: string;
  role: string;
  salary_band: string;
  timeInStage: number;
  totalTime: number;
  priority: "High" | "Normal";
  timeToHire: number;
};
export const useApplicants = (options?: UseQueryOptions<Candidate[]>) => {
  return useQuery({
    queryKey: [APPLICANTS_API],
    queryFn: async () => {
      const generateSampleData = (numCandidates = DEFAULT_APPLICANTS_COUNT) =>
        Array.from({ length: numCandidates }, (_, index) => ({
          id: index + 1,
          name: `Candidate ${index + 1}`,
          stage: STAGES[Math.floor(Math.random() * 6)],
          source: SOURCES[Math.floor(Math.random() * 5)],
          role: ROLES[Math.floor(Math.random() * 5)],
          salary_band: SALARY_BANDS[Math.floor(Math.random() * 3)],
          timeInStage: Math.floor(Math.random() * 14) + 1, // Days in current stage
          totalTime: Math.floor(Math.random() * 45) + 5, // Total days in pipeline
          priority:
            Math.random() > 0.7 ? ("High" as const) : ("Normal" as const), // Some candidates marked high priority
          timeToHire: Math.floor(Math.random() * 30) + 1,
        }));
      const currentApplicantsCount = 30;
      return generateSampleData(currentApplicantsCount);
    },
    ...options,
    initialData: () => [],
  });
};
