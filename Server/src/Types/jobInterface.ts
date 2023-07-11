export interface JobInterface {
  _id: string;
  jobTitle: string;
  jobType: string;
  jobVacancies: string;
  jobTiming: string;
  about: string;
  essentialKnowledge: string;
  skills: string[];
  jobLocation: string;
  qualification: string;
  salary: string;
  experience: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}
