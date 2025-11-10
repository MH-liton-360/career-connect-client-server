import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JobCard = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/jobData.json')
            .then((res) => res.json())
            .then((data) => setJobs(data));
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <div className="">
            {jobs.map((job) => (

                < div className="card card-dash bg-base-100 w-96 mt-5" >
                    <div className="card-body">
                        <h2 className="card-title">{job.title} </h2>
                        <h2 className="card-title">{job.company} </h2>
                        <p>{job.shortDescription}</p>
                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleViewDetails(job.id)}
                            >
                                {job.buttonText || "View Details"}
                            </button>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default JobCard;