// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <header className="sticky top-0 z-50">
                <Navbar />
            </header>

            {/* Page content */}
            <main className="flex-1 p-4 md:p-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 p-4 text-center">
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;
