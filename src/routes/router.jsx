import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Landing page</h1>
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