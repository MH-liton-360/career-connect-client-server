// src/pages/UserProfile.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const UserProfile = () => {
    const { user, loading } = useAuth();
    const [resume, setResume] = useState(null);
    const [uploading, setUploading] = useState(false);

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
            const res = await fetch(`${API}/api/upload-resume`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Upload failed");

            alert(data.message);
            setResume(null);
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-6">
            <div className="w-full max-w-3xl flex flex-col gap-8">
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
            </div>
        </div>
    );
};

export default UserProfile;
