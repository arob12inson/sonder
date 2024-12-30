interface Job {
    id: number;
    date: Date
    title: string;
    description: string;
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
        <div className="w-1/2 mx-auto mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Posted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {jobs.map((job) => (
                        <tr key={job.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.date.toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{job.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-indigo-600 hover:text-indigo-900">View</button>
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
        {id: 1, date: new Date, title: "Software Engineer", description: "We are looking for a software engineer."},
    ];
    // const jobs = null;

    return (
        <div className="w-full h-full flex flex-col p-6 ">
            <h1 className="text-grey-900 text-lg my-4">My Jobs</h1>
            {jobs === null ? <EmptyRecruiterHome /> : <JobsTable jobs={jobs} />}
        </div>
    );
}

export default RecruiterHome;