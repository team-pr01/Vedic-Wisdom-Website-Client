
export type TApplication = {
  jobId: string;
  userId: string;
  status?: "applied" | "withdrawn" | "shortlisted" | "hired" | "rejected";
  selectedCandidate?: string;
  resume: string;
  noteFromApplicant?: string;
};