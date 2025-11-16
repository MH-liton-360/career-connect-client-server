import { useAuth } from "../context/AuthContext";

export default function AdminProfile() {
    const { user, logout } = useAuth();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
            <div className="bg-white p-4 rounded shadow">
                <p><strong>Name:</strong> {user?.displayName || "—"}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <div className="mt-4">
                    <button onClick={logout} className="bg-red-600 text-white px-4 py-1 rounded">Logout</button>
                </div>
            </div>
        </div>
    );
}
