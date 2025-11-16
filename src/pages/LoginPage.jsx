// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);

            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/profile");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-md flex flex-col gap-4"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="btn btn-primary w-full rounded-lg py-2 mt-2 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow">
                    Login
                </button>

                <p className="text-center text-gray-600 mt-4 text-sm">
                    Don't have an account?{" "}
                    <Link
                        to="/auth/register"
                        className="text-purple-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
