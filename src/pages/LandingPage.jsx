// LandingPage.jsx
import React, { useState } from "react";

// Sample job data with type for filtering
const jobs = [
    { id: 1, title: "Frontend Developer", company: "ABC Ltd", location: "Remote", type: "Full-time" },
    { id: 2, title: "Backend Developer", company: "XYZ Ltd", location: "On-site", type: "Full-time" },
    { id: 3, title: "Fullstack Developer", company: "TechCorp", location: "Remote", type: "Part-time" },
    { id: 4, title: "UI/UX Designer", company: "DesignPro", location: "Remote", type: "Full-time" },
];

const LandingPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        remote: false,
        fullTime: false,
        partTime: false,
    });

    const handleFilterChange = (key) => {
        setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilters =
            (!filters.remote || job.location.toLowerCase() === "remote") &&
            (!filters.fullTime || job.type === "Full-time") &&
            (!filters.partTime || job.type === "Part-time");

        return matchesSearch && matchesFilters;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto p-4 md:p-6 grid md:grid-cols-12 gap-6">

                {/* Sidebar */}
                <aside className="md:col-span-3 bg-white p-5 rounded-lg shadow-md sticky top-6 max-h-screen overflow-auto">
                    <h3 className="text-lg font-semibold mb-4">Filters</h3>
                    <div className="space-y-3 text-gray-700">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filters.remote}
                                onChange={() => handleFilterChange("remote")}
                            />
                            <span>Remote</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filters.fullTime}
                                onChange={() => handleFilterChange("fullTime")}
                            />
                            <span>Full-time</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filters.partTime}
                                onChange={() => handleFilterChange("partTime")}
                            />
                            <span>Part-time</span>
                        </label>
                    </div>
                </aside>

                {/* Jobs Section */}
                <section className="md:col-span-9 flex flex-col gap-4 w-full">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search for jobs or companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Job Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Company logo placeholder */}
                                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 font-semibold">
                                            {job.company[0]}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold">{job.title}</h4>
                                            <p className="text-gray-500">{job.company}</p>
                                            <p className="text-gray-400 text-sm">
                                                {job.location} | {job.type}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                                        Apply
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">No jobs found.</p>
                        )}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-4">
                        <button
                            onClick={() =>
                                setFilters({ remote: false, fullTime: false, partTime: false }) ||
                                setSearchTerm("")
                            }
                            className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                        >
                            View All Jobs
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;
