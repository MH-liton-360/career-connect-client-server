import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>
    },
    {
        path: "/details",
        element: <h1>Details page</h1>
    },
    {
        path: "auth",
        element: <h1>Login page</h1>
    },
    {
        path: "*",
        element: <h1>Error page</h1>
    }
])

export default router;