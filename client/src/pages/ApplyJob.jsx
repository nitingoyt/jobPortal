import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getToken } = useAuth();
  const [JobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error("Login to apply for jobs");
      }
      if (!userData.resume) {
        navigate("/applications");
        return toast.error("Upload resume to apply");
      }

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/users/apply",
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchUserApplications()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(
      (item) => item.jobId._id === JobData._id
    );
    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied();
    }
  }, [JobData, userApplications, id]);

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
              <button
                onClick={applyHandler}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-2.5 py-2 px-10 rounded-lg shadow transition duration-300"
              >
                {isAlreadyApplied ? "Already Applied" : "Apply Now"}
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
              <button
                onClick={applyHandler}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-2.5 py-2 px-10 rounded-lg shadow transition duration-300"
              >
                {isAlreadyApplied ? "Already Applied" : "Apply Now"} 
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
                  ).filter(job => {
                    // set of applied jobIds
                    const appliedJobsIds = new Set(userApplications.map(app=> app.jobId && app.jobId._id))
                    // return true if user not applied for this job
                    return !appliedJobsIds.has(job._id)
                  })
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
