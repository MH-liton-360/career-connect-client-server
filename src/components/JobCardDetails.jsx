// src/pages/JobCardDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // your Firebase auth context
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Example jobs (you can fetch from backend if needed)
const jobs = [
    { id: 1, title: "Frontend Developer", company: "ABC Ltd", location: "Remote", type: "Full-time", description: "Build amazing UI with React and Tailwind." },
    { id: 2, title: "Backend Developer", company: "XYZ Ltd", location: "On-site", type: "Full-time", description: "Work on APIs and databases." },
    { id: 3, title: "Fullstack Developer", company: "TechCorp", location: "Remote", type: "Part-time", description: "Handle both frontend and backend." },
    { id: 4, title: "UI/UX Designer", company: "DesignPro", location: "Remote", type: "Full-time", description: "Design user-friendly interfaces." },
];

const JobCardDetails = () => {
    const { id } = useParams();
    const { user } = useAuth(); // get logged-in user
    const [applied, setApplied] = useState(false);

    const job = jobs.find(job => job.id === parseInt(id));
    if (!job) return <p className="text-center py-4">Job not found.</p>;

    // Optional: check if already applied (could fetch from backend)
    useEffect(() => {
        const checkApplied = async () => {
            if (!user) return;
            try {
                const res = await fetch(`${API}/api/applied-jobs?userId=${user.uid}`);
                const data = await res.json();
                if (data.some(item => item.jobId === job.id)) setApplied(true);
            } catch (err) {
                console.error(err);
            }
        };
        checkApplied();
    }, [user, job.id]);

    const handleApply = async () => {
        if (!user) return alert("Please login first!");

        try {
            const res = await fetch(`${API}/api/applied-jobs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.uid, // correct Firebase UID
                    jobId: job.id,
                    jobTitle: job.title,
                    company: job.company,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to apply");

            setApplied(true);
            alert("Application submitted successfully!");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-start p-6 bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-1"><strong>Company:</strong> {job.company}</p>
                <p className="text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
                <p className="text-gray-600 mb-4"><strong>Type:</strong> {job.type}</p>
                <p className="text-gray-700 mb-6">{job.description}</p>
                <button
                    onClick={handleApply}
                    disabled={applied}
                    className={`px-6 py-2 rounded transition ${applied ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}
                >
                    {applied ? "Applied" : "Apply Now"}
                </button>
            </div>
        </div>
    );
};

export default JobCardDetails;
