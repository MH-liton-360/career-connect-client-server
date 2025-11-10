import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const JobCardDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

    useEffect(() => {
        fetch("/jobData.json")
            .then(res => res.json())
            .then(data => {
                const selectedJob = data.find(j => j.id === parseInt(id));
                setJob(selectedJob);
            });
    }, [id]);

    if (!job) return <p>Loading...</p>;

    return (
        <div className="max-w-lg mx-auto p-5 border rounded shadow">
            <img src={job.logo} alt={job.company} className="w-24 h-24 mb-4" />
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <h2 className="text-xl text-gray-600">{job.company}</h2>

            <p className="my-4">{job.fullDescription || job.shortDescription}</p>

            <div className="w-full h-48 bg-gray-200 mb-4 flex items-center justify-center">
                <span>Image</span>
            </div>

            <div className="flex justify-between">
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>

                <button className="btn btn-primary">
                    Apply
                </button>
            </div>

            <div className="mt-4">
                <input type="file" className="btn btn-outline" />
            </div>
        </div>
    );
};

export default JobCardDetails;
