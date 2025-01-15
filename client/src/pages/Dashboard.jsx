import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const {companyData, backendUrl, setCompanyData, setCompanyToken} = useContext(AppContext)
  
  // func to logout

  const logout = () => {
    setCompanyToken(null)
    localStorage.removeItem('comapnyToken')
    setCompanyData(null)
    navigate('/')
  }

  useEffect(()=>{
    if(companyData){
      navigate('/dashboard/manage-jobs')
    }
  },[companyData])


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar for panel */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            onClick={(e) => navigate("/")}
            src={assets.logo}
            alt="Logo"
            className="h-12 cursor-pointer"
          />
          {companyData && (
        <div className="flex items-center gap-4">
          <p className="text-gray-700 font-medium">Welcome, {companyData.name}</p>
          <div className="relative group">
            <img
              src={companyData.image}
              alt="Company Icon"
              className="h-10 w-10 rounded-full cursor-pointer border border-gray-300"
            />
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg hidden group-hover:block">
              <ul className="text-sm text-gray-700">
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer text-center"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* Left sidebar */}
        <div className="w-60 bg-white min-h-screen border-r shadow-sm">
          <ul className="space-y-2 mt-6">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-4 sm:px-6 gap-3 w-full hover:bg-gray-100 transition ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img src={assets.add_icon} alt="Add Job Icon" className="h-5 w-5" />
              <p className="text-gray-800 font-medium">Add Job</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-4 sm:px-6 gap-3 w-full hover:bg-gray-100 transition ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/manage-jobs"}
            >
              <img src={assets.home_icon} alt="Manage Jobs Icon" className="h-5 w-5" />
              <p className="text-gray-800 font-medium">Manage Jobs</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-4 sm:px-6 gap-3 w-full hover:bg-gray-100 transition ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img
                src={assets.person_tick_icon}
                alt="View Applications Icon"
                className="h-5 w-5"
              />
              <p className="text-gray-800 font-medium">View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
