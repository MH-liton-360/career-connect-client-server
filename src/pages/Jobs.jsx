import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // form state
    const [editing, setEditing] = useState(null); // job object when editing
    const [form, setForm] = useState({ title: "", company: "", description: "" });

    useEffect(() => {
        fetchJobs();
    }, []);

    async function fetchJobs() {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/jobs`);
            const data = await res.json();
            setJobs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate() {
        if (!form.title || !form.company) return alert("Fill title and company");
        try {
            await fetch(`${API}/api/jobs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setForm({ title: "", company: "", description: "" });
            fetchJobs();
        } catch (err) { console.error(err); }
    }

    function startEdit(job) {
        setEditing(job);
        setForm({ title: job.title, company: job.company, description: job.description || "" });
    }

    async function updateJob() {
        try {
            await fetch(`${API}/api/jobs/${editing._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setEditing(null);
            setForm({ title: "", company: "", description: "" });
            fetchJobs();
        } catch (err) { console.error(err); }
    }

    async function deleteJob(id) {
        if (!confirm("Delete this job?")) return;
        try {
            await fetch(`${API}/api/jobs/${id}`, { method: "DELETE" });
            setJobs(prev => prev.filter(j => j._id !== id));
        } catch (err) { console.error(err); }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Jobs</h2>

            <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="font-semibold mb-2">{editing ? "Edit Job" : "Add Job"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input className="border p-2 rounded" placeholder="Title"
                        value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    <input className="border p-2 rounded" placeholder="Company"
                        value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                    <input className="border p-2 rounded" placeholder="Description"
                        value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="mt-3">
                    {editing ? (
                        <>
                            <button onClick={updateJob} className="bg-blue-600 text-white px-4 py-1 rounded mr-2">Update</button>
                            <button onClick={() => { setEditing(null); setForm({ title: "", company: "", description: "" }) }} className="px-4 py-1 rounded border">Cancel</button>
                        </>
                    ) : (
                        <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-1 rounded">Create Job</button>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {loading ? <p>Loading...</p> : (jobs.length === 0 ? <p>No jobs yet</p> : jobs.map(job => (
                    <div key={job._id} className="bg-white p-4 rounded shadow flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold">{job.title}</h3>
                            <p className="text-sm text-gray-600">{job.company}</p>
                            {job.description && <p className="mt-2 text-sm">{job.description}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => startEdit(job)} className="text-blue-600">Edit</button>
                            <button onClick={() => deleteJob(job._1d || job._id)} className="text-red-600">Delete</button>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    );
}
