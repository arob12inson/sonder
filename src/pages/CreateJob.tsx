import React, { useState } from "react";
import { Job, JobPostingStatus } from "../types";

const CreateJobForm = () => {
    const [jobFormData, setJobFormData] = useState<Job>({
        jobId: 0,
        date: new Date,
        title: "",
        description: "",
        status: JobPostingStatus.INCOMPLETE
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobFormData({
            ...jobFormData,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className="max-w-2xl p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Job Title:
                        <input 
                            type="text" 
                            name="title" 
                            value={jobFormData.title} 
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md"
                        />
                    </label>
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Description:
                        <textarea 
                            name="description" 
                            value={jobFormData.description}
                            onChange={(e) => setJobFormData({...jobFormData, description: e.target.value})}
                            required
                            className="w-full p-2 border rounded-md"
                            rows={4}
                        />
                    </label>
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Date:
                        <input 
                            type="date" 
                            name="date" 
                            value={jobFormData.date.toISOString().split('T')[0]}
                            onChange={(e) => setJobFormData({...jobFormData, date: new Date(e.target.value)})}
                            required
                            className="w-full p-2 border rounded-md"
                        />
                    </label>
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Status:
                        <select 
                            name="status" 
                            value={jobFormData.status}
                            onChange={(e) => setJobFormData({...jobFormData, status: e.target.value as JobPostingStatus})}
                            required
                            className="w-full p-2 border rounded-md"
                        >
                            {Object.values(JobPostingStatus).map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <button 
                    type="submit"
                    className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 shadow-md"
                >
                    Create Job
                </button>
            </form>
        </div>
    );

}

const CreateJob = () => {
    return (
        <div className="w-full h-full flex flex-col p-6">
            <h1 className="text-grey-900 text-lg my-4">Create Job</h1>
            <CreateJobForm />
        </div>
    );
};  
export default CreateJob;