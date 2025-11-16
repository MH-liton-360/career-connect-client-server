import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/auth/login");
        } catch (err) {
            console.error(err);
        }
    };

    const getInitial = () => {
        if (user?.displayName) return user.displayName.charAt(0).toUpperCase();
        if (user?.email) return user.email.charAt(0).toUpperCase();
        return "?";
    };

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            {/* Logo */}
            <div className="flex-1">
                <Link to="/">
                    <img src={logo} alt="CareerConnect Logo" className="w-40 h-32 rounded-4xl" />
                </Link>
            </div>

            {/* Search + Profile */}
            <div className="flex gap-3 items-center">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            {user.photoURL ? (
                                <div className="w-10 rounded-full overflow-hidden">
                                    <img src={user.photoURL} alt="profile" />
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                    {getInitial()}
                                </div>
                            )}
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        >
                            {/* User name/email */}
                            <li className="font-semibold">{user.displayName || user.email}</li>

                            {/* Dynamic Dashboard link */}
                            <li>
                                <Link to={user.role === "admin" ? "/admin" : "/profile"}>Dashboard</Link>
                            </li>

                            {/* Profile link */}
                            {user.role !== "admin" && (
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                            )}

                            {/* Logout */}
                            <li>
                                <button className="text-red-500" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/auth/login" className="btn btn-ghost btn-circle">
                        <FaUser className="text-xl" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
