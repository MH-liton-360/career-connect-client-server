import { useEffect, useState } from "react";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Applicants() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchApps(); }, []);

    async function fetchApps() {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/applicants`);
            const data = await res.json();
            setApps(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Applicants</h2>
            {loading ? <p>Loading...</p> : apps.length === 0 ? <p>No applicants yet</p> : (
                <div className="space-y-3">
                    {apps.map(a => (
                        <div key={a._id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                            <div>
                                <div className="font-semibold">{a.name || a.userId}</div>
                                <div className="text-sm text-gray-600">{a.email || ""}</div>
                                <div className="text-sm text-gray-700 mt-1">Applied for: {a.title || a.jobTitle || a.jobId || "—"}</div>
                            </div>

                            <div className="flex gap-2">
                                {a.resume && a.resume.filename ? (
                                    <>
                                        <a className="px-3 py-1 border rounded" href={`${API.replace(/\/$/, '')}/${a.resume.path}`} target="_blank" rel="noreferrer">View</a>
                                        <a className="px-3 py-1 border rounded" href={`${API.replace(/\/$/, '')}/${a.resume.path}`} download>Download</a>
                                    </>
                                ) : (
                                    <span className="text-sm text-gray-500">No resume</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
