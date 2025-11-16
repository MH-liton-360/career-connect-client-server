export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">Total Jobs</h3>
                    {/* optionally fetch counts */}
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">Total Applicants</h3>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">Users</h3>
                </div>
            </div>
        </div>
    );
}
