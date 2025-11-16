import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import JobCardDetails from "../components/JobCardDetails";
import JobCard from "../components/JobCard";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserProfile from "../pages/UserProfile";
import LandingPage from "../pages/LandingPage";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import Jobs from "../pages/Jobs";
import Applicants from "../pages/Applicants";
import AdminProfile from "../pages/AdminProfile";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <LandingPage /> },
            { path: "jobcard", element: <JobCard /> },
            { path: "details/:id", element: <JobCardDetails /> },
            { path: "profile", element: <UserProfile /> },
        ],
    },
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
        ],
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "jobs", element: <Jobs /> },
            { path: "applicants", element: <Applicants /> },
            { path: "profile", element: <AdminProfile /> }, // lowercase fixed
        ],
    },
    { path: "*", element: <h1>Page Not Found</h1> },
]);

export default router;
