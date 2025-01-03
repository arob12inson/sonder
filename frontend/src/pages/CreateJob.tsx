import React, { useState } from "react";
import { Job, JobPostingStatus, } from "../types";

const CreateJobForm = () => {
    const [jobFormData, setJobFormData] = useState<Job>({
        jobId: 0,
        date: new Date,
        title: "",
        description: "",
        status: JobPostingStatus.IN_PROGRESS
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
        <div className="w-full p-12 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-2">Job Title:
                        <input 
                            type="text" 
                            name="title" 
                            value={jobFormData.title} 
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md text-black"
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
                <div className="flex justify-between">
                    <button 
                        type="submit"
                        className=" bg-gray-500 text-white py-3 px-5 rounded-lg hover:bg-gray-600 shadow-md"
                    >
                        Create Job
                    </button>
                    <button 
                        type="submit"
                        className=" bg-white text-gray-500 rounded-lg hover:text-red-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );

}

const CreateJob = () => {
    return (
        <div className="w-full h-full flex flex-col p-6">
            <div className="w-1/2 h-full flex flex-col mx-auto">
                <h1 className="text-grey-900 text-xl my-4">Create Job</h1>
                <CreateJobForm />
            </div>
        </div>
    );
};  
export default CreateJob;