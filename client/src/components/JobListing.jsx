import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [filteredJobs, setFilteredJobs] = useState(jobs)

  const handleCateogoryChange = (category) => {
    setSelectedCategories(
      prev => prev.includes(category) ? prev.filter(c => c !==category) : [...prev, category]
    )
  }

  const handleLocationChange = (location) => {
    setSelectedLocations(
      prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
    )
  }

  useEffect(()=> {
    const matchesCategory = job => selectedCategories.length === 0 ||selectedCategories.includes(job.category)
    const matchesLocation = job => selectedLocations.length === 0 ||selectedLocations.includes(job.location)
    const matchestitle = job => searchFilter.title === '' || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
    const matchesSearchLocation = job => searchFilter.location === '' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

    const newFiltertedJobs = jobs.slice().reverse().filter(
      job => matchesCategory(job) && matchesLocation(job) && matchestitle(job) && matchesSearchLocation(job)
    )

    setFilteredJobs(newFiltertedJobs)
    setCurrentPage(1)
  },[jobs, selectedCategories, selectedLocations, searchFilter])



  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-8 lg:px-16 py-6">
      {/* Sidebar */}
      <div className="lg:w-1/4 bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
        {/* Search filter from Hero Component */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                Current Search
              </h3>
              <div className="flex flex-wrap gap-2">
                {searchFilter.title && (
                  <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full flex items-center space-x-2">
                    <span className="text-xs sm:text-sm">
                      {searchFilter.title}
                    </span>
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="w-4 h-4 cursor-pointer"
                      src={assets.cross_icon}
                      alt="Remove Title Filter"
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full flex items-center space-x-2">
                    <span className="text-xs sm:text-sm">
                      {searchFilter.location}
                    </span>
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="w-4 h-4 cursor-pointer"
                      src={assets.cross_icon}
                      alt="Remove Location Filter"
                    />
                  </span>
                )}
              </div>
            </div>
          )}

        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* Category filter */}
        <div className={showFilter ? "mt-6 mb-6 " : "max-lg:hidden"}>
          <h4 className="text-md sm:text-lg font-semibold mb-3">
            Search by Categories
          </h4>
          <ul className="space-y-2">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`category-${index}`}
                  className="accent-purple-600"
                  onChange={() => handleCateogoryChange(category)}
                  checked = {selectedCategories.includes(category)}
                 />
                <label
                  htmlFor={`category-${index}`}
                  className="text-sm sm:text-base text-gray-700"
                >
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Location filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="text-md sm:text-lg font-semibold mb-3">
            Search by Location
          </h4>
          <ul className="space-y-2">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`location-${index}`}
                  className="accent-purple-600"
                  onChange={() => handleLocationChange(location)}
                  checked = {selectedLocations.includes(location)}
                />
                <label
                  htmlFor={`location-${index}`}
                  className="text-sm sm:text-base text-gray-700"
                >
                  {location}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <section className="lg:w-3/4">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Latest Jobs</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Get your desired job from top companies
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
        {/* Pagination */}
        {filteredJobs.length > 0 && (
            <div className="flex items-center justify-center space-x-2 mt-10">
                <a href="#job-list">
                    <img onClick={()=> setCurrentPage(Math.max(currentPage-1,1))} src={assets.left_arrow_icon} alt="" />
                </a>
                {Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index)=>(
                    <a key={index} href="#job-list" >
                        <button  onClick={() => setCurrentPage(index + 1 )} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-500' : 'text-gray-500'}`}>{index + 1}</button>
                    </a>
                ))}
                <a href="#job-list">
                    <img onClick={()=> setCurrentPage(Math.min(currentPage+1, Math.ceil(filteredJobs.length/6)))} src={assets.right_arrow_icon} alt="" />
                </a>
            </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
