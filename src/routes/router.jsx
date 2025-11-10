import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import JobCardDetails from "../components/JobCardDetails";
import JobCard from "../components/JobCard";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "jobcard",
                element: <JobCard></JobCard>
            },
            {
                path: "/details/:id",
                element: <JobCardDetails></JobCardDetails>
            },
        ]
    },

    {
        path: "auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "login",
                element: <LoginPage></LoginPage>
            },
            {
                path: "register",
                element: <RegisterPage></RegisterPage>
            },
        ]
    },
    {
        path: "*",
        element: <h1>Error page</h1>
    }
])

export default router;