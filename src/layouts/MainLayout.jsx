import { Outlet } from "react-router-dom";
// import FilterSidebar from "../components/FilterSidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LandingPage from "../pages/LandingPage";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-white shadow">
                <Navbar />
            </header>

            {/* Main Content */}
            <main className="flex-grow w-11/12 mx-auto p-4 md:p-8">
                <LandingPage />
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
