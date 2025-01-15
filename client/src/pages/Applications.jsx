import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } =
    useContext(AppContext);

  const updateresume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/users/update-resume",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };

  useEffect(()=>{
    if(user){
      fetchUserApplications(  )
    }
  },[user])


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
          {/* Resume Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Resume
            </h2>
            <div className="flex items-center gap-4">
              {isEdit || userData && userData.resume === '' ? (
                <>
                  <label
                    htmlFor="resumeUpload"
                    className="cursor-pointer text-blue-500"
                  >
                    <p className="text-lg">{resume ? resume.name : 'Select Resume' }</p>
                    <input
                      id="resumeUpload"
                      onChange={(e) => setResume(e.target.files[0])}
                      accept="application/pdf"
                      type="file"
                      hidden
                    />
                    <img
                      src={assets.profile_upload_icon}
                      alt="Upload Icon"
                      className="h-10 w-10"
                    />
                  </label>
                  <button
                    onClick={updateresume}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <a target="_blank" href={userData.resume} className="text-blue-500">
                    Resume
                  </a>
                  <button
                    onClick={() => setIsEdit(true)}
                    className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Applied Jobs Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Job Applied
            </h2>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700">Company</th>
                  <th className="px-4 py-2 text-left text-gray-700">
                    Job Title
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700">
                    Location
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {userApplications.map((job, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 flex items-center gap-3 text-gray-600">
                      <img
                        src={job.companyId.image}
                        alt=''
                        className="h-8 w-8 rounded-full"
                      />
                      {job.companyId.name}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{job.jobId.title}</td>
                    <td className="px-4 py-2 text-gray-600">{job.jobId.location}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {moment(job.date).format("ll")}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          job.status === "Accepted"
                            ? "bg-green-100 text-green-600"
                            : job.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
