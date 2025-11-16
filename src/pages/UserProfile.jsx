// src/pages/UserProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function UserProfile() {
    const { user, loading } = useAuth();
    const [resume, setResume] = useState(null);
    const [uploadedResume, setUploadedResume] = useState(null); // show uploaded resume
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [description, setDescription] = useState("");

    // Fetch applied jobs
    useEffect(() => {
        if (!user) return;
        const fetchJobs = async () => {
            setJobsLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/api/applied-jobs?userId=${user.uid}`);
                const data = await res.json();
                setJobs(data);
            } catch {
                setJobs([]);
            } finally {
                setJobsLoading(false);
            }
        };
        fetchJobs();
    }, [user]);

    // Fetch latest uploaded resume
    useEffect(() => {
        if (!user) return;
        const fetchResume = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/resumes?userId=${user.uid}`);
                const data = await res.json();
                if (data.length > 0) setUploadedResume(data[data.length - 1]);
            } catch {
                setUploadedResume(null);
            }
        };
        fetchResume();
    }, [user, uploading]); // refresh after upload

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Please login to see your profile</p>;

    const handleUpload = async () => {
        if (!resume) return alert("Select a file first");
        setUploading(true);
        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("userId", user.uid);

        try {
            const res = await fetch("http://localhost:5000/api/upload-resume", { method: "POST", body: formData });
            const data = await res.json();
            alert(data.message);
            setResume(null);
            setUploadedResume(data.file);
        } catch {
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-6">
            <div className="w-full max-w-4xl flex flex-col gap-8">
                {/* Profile Info */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Profile Info</h2>
                    <div className="flex items-center gap-6">
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full" />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                                {user.displayName?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="flex-1">
                            <p><strong>Name:</strong> {user.displayName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> {user.role || "user"}</p>
                            <div className="mt-2">
                                <label className="block font-semibold mb-1">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border p-2 rounded w-full"
                                    placeholder="Write something about yourself"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="mt-6">
                        <label className="block mb-1 font-semibold">Upload Resume</label>
                        <input type="file" onChange={(e) => setResume(e.target.files[0])} className="border p-2 rounded w-full" />
                        {resume && (
                            <button onClick={handleUpload} disabled={uploading} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
                                {uploading ? "Uploading..." : "Upload"}
                            </button>
                        )}
                        {uploadedResume && (
                            <div className="mt-2">
                                <p className="font-semibold">Uploaded Resume:</p>
                                <a
                                    href={`http://localhost:5000/${uploadedResume.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    {uploadedResume.filename}
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Applied Jobs */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>
                    {jobsLoading ? <p>Loading jobs...</p> : (
                        jobs.length === 0 ? <p>No applied jobs found.</p> :
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border px-4 py-2 text-left">Job Title</th>
                                        <th className="border px-4 py-2 text-left">Company</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map((job) => (
                                        <tr key={job._id} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">{job.title}</td>
                                            <td className="border px-4 py-2">{job.company}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    )}
                </div>
            </div>
        </div>
    );
}
