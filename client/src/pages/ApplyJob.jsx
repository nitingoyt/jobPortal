import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";

const ApplyJob = () => {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);

  const { jobs } = useContext(AppContext);

  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  return JobData ? (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col py-10 container px-4 sm:px-8 lg:px-16 mx-auto">
        <div className="bg-white text-gray-800 rounded-lg shadow-md">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl relative">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                className="h-24 w-24 bg-white rounded-lg p-4 border shadow-sm"
                src={JobData.companyId.image}
                alt={JobData.companyId.name}
              />
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  {JobData.title}
                </h1>
                <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
                  <span className="flex items-center gap-2">
                    <img
                      src={assets.suitcase_icon}
                      alt=""
                      className="h-5 w-5"
                    />
                    {JobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src={assets.location_icon}
                      alt=""
                      className="h-5 w-5"
                    />
                    {JobData.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.person_icon} alt="" className="h-5 w-5" />
                    {JobData.level}
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.money_icon} alt="" className="h-5 w-5" />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right md:absolute md:right-8 md:top-20">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-2.5 py-2 px-10 rounded-lg shadow transition duration-300">
                Apply Now
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Posted {moment(JobData.date).fromNow()}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row px-4 md:px-16 py-8">
            {/* Left Panel: Job Description */}
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
              <div
                className="text-gray-700 mb-6"
                dangerouslySetInnerHTML={{ __html: JobData.description }}
              ></div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-2.5 py-2 px-10 rounded-lg shadow transition duration-300">
                Apply Now
              </button>
            </div>

            {/* Right Panel: More Jobs */}
            <div className="md:w-1/3 ml-0 md:ml-8">
              <h2 className="text-2xl font-semibold mb-4">
                More Jobs from {JobData.companyId.name}
              </h2>
              <div className="space-y-6">
                {jobs
                  .filter(
                    (job) =>
                      job._id !== JobData._id &&
                      job.companyId._id === JobData.companyId._id
                  )
                  .slice(0, 4)
                  .map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
