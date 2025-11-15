import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-white shadow">
                <Navbar />
            </header>

            {/* Main Content */}
            <main className="flex-grow w-11/12 mx-auto p-4 md:p-8">
                <Outlet /> {/* child routes will render here */}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
