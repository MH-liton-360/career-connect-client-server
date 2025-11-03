const FilterSidebar = () => {
    return (
        <div className="p-4 rounded-md">
            <h1 className="font-semibold mb-2">Filters: All Category</h1>
            <div className="flex flex-col gap-2">
                <button className="px-3 py-1 bg-blue-500 border border-gray-300 rounded hover:bg-blue-400 hover:text-white transition">
                    Category
                </button>
                <button className="px-3 py-1 bg-blue-500 border border-gray-300 rounded hover:bg-blue-400 hover:text-white transition">
                    Location
                </button>
                <button className="px-3 py-1 bg-blue-500 border border-gray-300 rounded hover:bg-blue-400 hover:text-white transition">
                    Job Type
                </button>
            </div>
        </div>
    );
};

export default FilterSidebar;
