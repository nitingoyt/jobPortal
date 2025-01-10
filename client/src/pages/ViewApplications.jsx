import React from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewApplications = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto bg-white rounded-lg shadow-md relative">
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">#</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">User Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Job Title</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Location</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Resume</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="border-b relative">
                <td className="px-4 py-2 text-sm">{index + 1}</td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={applicant.imgSrc}
                    alt={`${applicant.name} profile`}
                  />
                  <span className="text-sm font-medium text-gray-800">{applicant.name}</span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{applicant.jobTitle}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{applicant.location}</td>
                <td className="px-4 py-2 text-sm">
                  <a
                    href={applicant.resumeLink}
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
                  <div className="group inline-block">
                    <button className="px-2 py-1 text-gray-600 hover:text-gray-900">
                      <span className="material-icons">more_vert</span>
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 ease-in-out z-50">
                      <button className="block px-4 py-2 text-sm text-green-600 hover:bg-green-100 w-full text-left">
                        Accept
                      </button>
                      <button className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left">
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
