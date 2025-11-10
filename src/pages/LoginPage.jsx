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
            await login(email, password);
            navigate("/"); // Login success → redirect home
        } catch (err) {
            setError("Login failed. Please check your email and password.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 p-4">
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
                    className="input input-bordered w-full rounded-lg focus:border-green-500 focus:ring focus:ring-green-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full rounded-lg focus:border-green-500 focus:ring focus:ring-green-200"
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
                        className="text-green-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
