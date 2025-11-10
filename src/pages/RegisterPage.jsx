import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [file, setFile] = useState(null);
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ email, password, displayName: userName, file });
            navigate("/");
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-md flex flex-col gap-4"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Your Account
                </h2>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <input
                    type="text"
                    placeholder="User Name"
                    className="input input-bordered w-full rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Custom file upload */}
                <label className="btn btn-outline w-full mb-2 cursor-pointer flex justify-center items-center rounded-lg">
                    {file ? file.name : "Choose Profile Image"}
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </label>

                <button className="btn btn-primary w-full rounded-lg py-2 mt-2 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow">
                    Register
                </button>

                <p className="text-center text-gray-600 mt-4 text-sm">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
