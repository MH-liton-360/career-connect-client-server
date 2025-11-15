// src/pages/UserProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
    const { user, loading } = useAuth();
    const [resume, setResume] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [newJob, setNewJob] = useState({ title: "", company: "" });

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Please login to see your profile</p>;

    const handleFileChange = (e) => setResume(e.target.files[0]);

    const handleUpload = async () => {
        if (!resume) return alert("Select a file first");
        setUploading(true);
        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("userId", user.uid);
        try {
            const res = await fetch("http://localhost:5000/api/upload-resume", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            alert(data.message);
            setResume(null);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const fetchJobs = async () => {
        setJobsLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/applied-jobs?userId=${user.uid}`);
            const data = await res.json();
            setJobs(data);
        } catch (err) {
            console.error(err);
            setJobs([]);
        } finally {
            setJobsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [user.uid]);

    const handleAddJob = async () => {
        if (!newJob.title || !newJob.company) return alert("Fill all fields");
        try {
            await fetch("http://localhost:5000/api/applied-jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...newJob, userId: user.uid }),
            });
            setNewJob({ title: "", company: "" });
            fetchJobs();
        } catch (err) {
            console.error(err);
            alert("Failed to add job");
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await fetch(`http://localhost:5000/api/applied-jobs/${id}`, { method: "DELETE" });
            fetchJobs();
        } catch (err) {
            console.error(err);
            alert("Failed to delete job");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-6">
            <div className="w-full max-w-3xl flex flex-col gap-8">
                {/* User Info */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Profile Info</h2>
                    <div className="flex items-center gap-6">
                        {user.photoURL && (
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-24 h-24 rounded-full"
                            />
                        )}
                        <div>
                            <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> {user.role || "user"}</p>
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="mt-6">
                        <label className="block mb-2 font-semibold">Upload Resume</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border p-2 rounded w-full"
                        />
                        {resume && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-green-600">{resume.name}</span>
                                <button
                                    onClick={handleUpload}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                    disabled={uploading}
                                >
                                    {uploading ? "Uploading..." : "Upload"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Applied Jobs */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>

                    {/* Add new job */}
                    <div className="flex flex-col md:flex-row gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Job Title"
                            className="border p-2 rounded w-full"
                            value={newJob.title}
                            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Company"
                            className="border p-2 rounded w-full"
                            value={newJob.company}
                            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                        />
                        <button
                            onClick={handleAddJob}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            Add Job
                        </button>
                    </div>

                    {jobsLoading ? (
                        <p>Loading jobs...</p>
                    ) : jobs.length === 0 ? (
                        <p>No applied jobs found.</p>
                    ) : (
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2 text-left">Job Title</th>
                                    <th className="border px-4 py-2 text-left">Company</th>
                                    <th className="border px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job._id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{job.title}</td>
                                        <td className="border px-4 py-2">{job.company}</td>
                                        <td className="border px-4 py-2 flex gap-2">
                                            <button className="text-blue-500 hover:underline">View</button>
                                            <button
                                                className="text-red-500 hover:underline"
                                                onClick={() => handleDeleteJob(job._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
