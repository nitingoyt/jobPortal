import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 flex flex-col gap-4">
      {/* Company Icon */}
      <div className="flex items-center justify-center bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto">
        <img
          src={job.companyId.image}
          alt="Company Icon"
          className="w-10 h-10"
        />
      </div>

      {/* Job Title */}
      <h4 className="text-lg sm:text-xl font-bold text-center text-gray-800">
        {job.title}
      </h4>

      {/* Job Info */}
      <div className="flex justify-between items-center text-sm sm:text-base text-gray-600">
        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
          {job.location}
        </span>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {job.level}
        </span>
      </div>

      {/* Job Description */}
      <p
        className="text-gray-700 text-sm sm:text-base text-justify"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition duration-300"
        >
          Apply Now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-gray-300 transition duration-300"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
