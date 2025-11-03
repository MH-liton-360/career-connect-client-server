import FilterSidebar from "../components/FilterSidebar";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <main className="w-11/12 mx-auto p-20 grid grid-cols-12">

                <aside className="col-span-3">
                    <FilterSidebar></FilterSidebar>
                </aside>

                <section className="cols-span-9">
                    <JobCard></JobCard>
                </section>
            </main>
        </div>
    );
};

export default MainLayout;