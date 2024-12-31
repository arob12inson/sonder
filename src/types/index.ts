export interface Job {
    jobId: number;
    date: Date
    title: string;
    description: string;
    status: JobPostingStatus;
}

export enum JobPostingStatus {
    INCOMPLETE = "Incomplete",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed",
}