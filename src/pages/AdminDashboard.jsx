import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
    const [counts, setCounts] = useState({
        jobs: 0,
        applicants: 0,
        users: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCounts();
        // Optional: poll every 10 seconds for real-time update
        // const interval = setInterval(fetchCounts, 10000);
        // return () => clearInterval(interval);
    }, []);

    async function fetchCounts() {
        setLoading(true);
        try {
            // Fetch jobs, applicants, users in parallel
            const [jobsRes, appsRes, usersRes] = await Promise.all([
                fetch(`${API}/api/jobs`),
                fetch(`${API}/api/applied-jobs`),
                fetch(`${API}/api/users`),
            ]);

            const jobsData = await jobsRes.json();
            const appsData = await appsRes.json();
            const usersData = await usersRes.json();

            setCounts({
                jobs: jobsData.length,
                applicants: appsData.length,
                users: usersData.length,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p className="text-center py-4">Loading dashboard...</p>;

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded shadow text-center">
                    <h3 className="font-semibold mb-2">Total Jobs</h3>
                    <p className="text-xl font-bold">{counts.jobs}</p>
                </div>
                <div className="bg-white p-6 rounded shadow text-center">
                    <h3 className="font-semibold mb-2">Total Applicants</h3>
                    <p className="text-xl font-bold">{counts.applicants}</p>
                </div>
                <div className="bg-white p-6 rounded shadow text-center">
                    <h3 className="font-semibold mb-2">Users</h3>
                    <p className="text-xl font-bold">{counts.users}</p>
                </div>
            </div>
        </div>
    );
}
