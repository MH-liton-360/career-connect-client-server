import { Outlet } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
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
            <main className="flex-grow w-11/12 mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Sidebar */}
                <aside className="hidden md:block md:col-span-3">
                    <FilterSidebar />
                </aside>

                {/* Dynamic page content */}
                <section className="col-span-1 md:col-span-9">
                    <Outlet />
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
