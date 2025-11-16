import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaHome, FaUser, FaUsers, FaBriefcase } from "react-icons/fa";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 text-2xl font-bold border-b">Admin Panel</div>
                <nav className="flex-1 p-4 space-y-2">
                    {/* Home button now goes to main landing page */}
                    <Link to="/" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
                        <FaHome /> Home
                    </Link>

                    {/* Admin Dashboard link */}
                    <Link to="/admin" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
                        <FaHome /> Dashboard
                    </Link>

                    <Link to="/admin/jobs" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
                        <FaBriefcase /> Jobs
                    </Link>
                    <Link to="/admin/applicants" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
                        <FaUsers /> Applicants
                    </Link>
                    <Link to="/admin/profile" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
                        <FaUser /> Profile
                    </Link>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col">
                <header><Navbar /></header>
                <main className="flex-1 p-6">
                    <Outlet /> {/* Dashboard or other child pages render here */}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
