interface Job {
    id: number;
    date: Date
    title: string;
    description: string;
    status: JobPostingStatus;
}

enum JobPostingStatus {
    INCOMPLETE = "Incomplete",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed",
}

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
    return (
        <div className="w-1/2 mx-auto mt-4 overflow-x-auto shadow-lg rounded-lg">
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
                <tr key={job.id}>
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
        {id: 1, date: new Date, title: "Software Engineer Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.INCOMPLETE},
        {id: 1, date: new Date, title: "Marketing Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.COMPLETED},
        {id: 1, date: new Date, title: "Business Development Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.IN_PROGRESS},
        {id: 1, date: new Date, title: "Software Engineer Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.INCOMPLETE},
        {id: 1, date: new Date, title: "Software Engineer Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.INCOMPLETE},
        {id: 1, date: new Date, title: "Software Engineer Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.INCOMPLETE},
        {id: 1, date: new Date, title: "Software Engineer Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.INCOMPLETE},
        {id: 1, date: new Date, title: "Marketing Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.COMPLETED},
        {id: 1, date: new Date, title: "Business Development Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.IN_PROGRESS},
        {id: 1, date: new Date, title: "Marketing Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.COMPLETED},
        {id: 1, date: new Date, title: "Business Development Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.IN_PROGRESS},
        {id: 1, date: new Date, title: "Marketing Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.COMPLETED},
        {id: 1, date: new Date, title: "Business Development Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.IN_PROGRESS},
        {id: 1, date: new Date, title: "Marketing Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.COMPLETED},
        {id: 1, date: new Date, title: "Business Development Intern", description: "We are looking for a software engineer.", status: JobPostingStatus.IN_PROGRESS},
    ];

    return (
        <div className="w-full h-full flex flex-col p-6 ">
            <h1 className="text-grey-900 text-lg my-4">My Jobs</h1>
            {jobs === null ? <EmptyRecruiterHome /> : <JobsTable jobs={jobs} />}
        </div>
    );
}

export default RecruiterHome;