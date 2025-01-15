import React, { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);

  // function to fetch company job Applications data
  const fetchCompanyJobApplictions = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.messge);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to update job applications status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        fetchCompanyJobApplictions();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplictions();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
      <div></div>
    ) : (
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto bg-white rounded-lg shadow-md relative">
          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  #
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  User Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Job Title
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Location
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Resume
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index} className="border-b relative">
                    <td className="px-4 py-2 text-sm">{index + 1}</td>
                    <td className="px-4 py-2 flex items-center space-x-2">
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={applicant.userId.image}
                        alt=""
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {applicant.userId.name}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {applicant.jobId.title}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {applicant.jobId.location}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <a
                        href={applicant.userId.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center"
                      >
                        Resume
                        <img
                          className="ml-2 w-4 h-4"
                          src={assets.resume_download_icon}
                          alt="Download icon"
                        />
                      </a>
                    </td>
                    <td className="px-4 py-2 text-sm relative">
                      {applicant.status === "Pending" ? (
                        <div className="group inline-block">
                          <button className="px-2 py-1 text-gray-600 hover:text-gray-900">
                            <span className="material-icons">...</span>
                          </button>
                          {/* Dropdown Menu */}
                          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 ease-in-out z-50">
                            <button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Accepted"
                                )
                              }
                              className="block px-4 py-2 text-sm text-green-600 hover:bg-green-100 w-full text-left"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Rejected"
                                )
                              }
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>{applicant.status}</div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplications;
