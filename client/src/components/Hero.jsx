import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="px-4 sm:px-8 lg:px-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 rounded-lg shadow-xl mb-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            Over 10,000+ Jobs to Apply
          </h2>
          <p className="text-lg mb-8">
            Find your dream job from our extensive list of opportunities.
            Whether looking to start your career or take the next big step.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center bg-white text-black rounded p-2 w-full sm:w-1/3">
              <img
                src={assets.search_icon}
                alt="Search Icon"
                className="w-6 h-6 mr-2"
              />
              <input
                ref={titleRef}
                className="max-sm:text-xs rounded outline-none w-full"
                type="text"
                placeholder="Search for jobs"
              />
            </div>
            <div className="flex items-center bg-white text-black rounded p-2 w-full sm:w-1/3">
              <img
                src={assets.location_icon}
                alt="Location Icon"
                className="w-6 h-6 mr-2"
              />
              <input
                ref={locationRef}
                className="max-sm:text-xs rounded outline-none w-full"
                type="text"
                placeholder="Location"
              />
            </div>
            <button
              onClick={onSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div
  className="bg-white py-6 px-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start sm:justify-between"
>
  {/* Trusted By Text */}
  <div className="sm:w-1/4 text-center sm:text-left mb-4 sm:mb-0">
    <p className="text-lg font-semibold">Trusted by</p>
  </div>

  {/* Logos */}
  <div className="flex-1 flex flex-wrap justify-center sm:justify-start gap-6">
    <img src={assets.microsoft_logo} alt="Microsoft Logo" className="h-8" />
    <img src={assets.walmart_logo} alt="Walmart Logo" className="h-8" />
    <img src={assets.accenture_logo} alt="Accenture Logo" className="h-8" />
    <img src={assets.samsung_logo} alt="Samsung Logo" className="h-8" />
    <img src={assets.amazon_logo} alt="Amazon Logo" className="h-8" />
    <img src={assets.adobe_logo} alt="Adobe Logo" className="h-8" />
  </div>
</div>

    </div>
  );
};

export default Hero;
