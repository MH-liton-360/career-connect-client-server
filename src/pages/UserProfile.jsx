import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Please login to see your profile</p>;

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-md border p-6 rounded-lg shadow-md bg-white">
                <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role || "user"}</p>
                {user.photoURL && (
                    <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full mt-4" />
                )}
            </div>
        </div>
    );
};

export default UserProfile;
