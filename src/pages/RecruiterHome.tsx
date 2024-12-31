import { useNavigate } from "react-router-dom";
import { Job, JobPostingStatus } from "../types";

const EmptyRecruiterHome = () => {
    return (
        <div className="w-full h-full my-8 flex flex-col items-center justify-center">
            <h2 className="text-gray-900 text-2xl">You have no jobs posted yet.</h2>
            <p className="text-gray-900 text-base">Create your first job to start sending interviews</p>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg my-4">Post a Job</button>
        </div>
    );
}

const JobsTable = ({ jobs }: { jobs: Job[] }) => {
    const navigate = useNavigate();

    return (
        <div className="h-1/2 overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 rounded-t-lg sticky top-0">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Posted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                    <tr className="hover:bg-gray-100" key={job.jobId} onClick={() => navigate(`/recruiter/${job.jobId}`)}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.date.toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left font-medium">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === JobPostingStatus.INCOMPLETE ? "bg-red-100 text-red-800" : job.status === JobPostingStatus.IN_PROGRESS ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                                {job.status}
                            </span>
                        </td>
                    </tr> 
                ))}
            </tbody>
            </table>
        </div>
    );
};

const RecruiterHome = () => { 
    const jobs = [
        {jobId: 1, date: new Date, title: "Software Engineer Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.INCOMPLETE},
        {jobId: 2, date: new Date, title: "Marketing Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.COMPLETED},
        {jobId: 3, date: new Date, title: "Business Development Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.IN_PROGRESS},
        {jobId: 4, date: new Date, title: "Software Engineer Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.INCOMPLETE},
        {jobId: 5, date: new Date, title: "Software Engineer Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.INCOMPLETE},
        {jobId: 6, date: new Date, title: "Software Engineer Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.INCOMPLETE},
        {jobId: 7, date: new Date, title: "Software Engineer Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.INCOMPLETE},
        {jobId: 8, date: new Date, title: "Marketing Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.COMPLETED},
        {jobId: 9, date: new Date, title: "Business Development Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.IN_PROGRESS},
        {jobId: 10, date: new Date, title: "Marketing Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.COMPLETED},
        {jobId: 11, date: new Date, title: "Business Development Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.IN_PROGRESS},
        {jobId: 12, date: new Date, title: "Marketing Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.COMPLETED},
        {jobId: 13, date: new Date, title: "Business Development Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.IN_PROGRESS},
        {jobId: 14, date: new Date, title: "Marketing Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.COMPLETED},
        {jobId: 15, date: new Date, title: "Business Development Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.IN_PROGRESS},
    ];

    return (
        <div className="w-full h-full flex flex-col p-6 ">
            <h1 className="text-grey-900 text-lg my-4">My Jobs</h1>
            {jobs === null ? <EmptyRecruiterHome /> : 
            <div className="grid grid-cols-4 gap-4">
                <div className="col-start-1 col-end-2">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-gray-900 text-base font-bold">Post a Job</h2>
                        <p className="text-gray-900 text-base">Create a new job posting</p>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg mt-6">Post a Job</button>
                    </div>
                </div>
                <div className="w-full col-start-2 col-end-4">
                    <JobsTable jobs={jobs} />
                </div>
            </div>
            }
        </div>
    );
}

export default RecruiterHome;