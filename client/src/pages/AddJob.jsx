import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programming");
  const [location, setLocation] = useState("Bangalore");
  const [level, setLevel] = useState("Pro Level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // Initialize Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form className="p-4 bg-white shadow-lg rounded-lg w-3/5">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-600 font-medium mb-2">
          Job Title
        </label>
        <input
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Type here"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-600 font-medium mb-2"
        >
          Job Description
        </label>

        <div
          ref={editorRef}
          id="description"
          className="border border-gray-300 rounded-lg p-2 min-h-[200px]"
        ></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label
            htmlFor="category"
            className="block text-gray-600 font-medium mb-2"
          >
            Job Category
          </label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-gray-600 font-medium mb-2"
          >
            Job Location
          </label>
          <select
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-gray-600 font-medium mb-2"
          >
            Job Level
          </label>
          <select
            id="level"
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Boss level">Boss level</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="salary"
          className="block text-gray-600 font-medium mb-2"
        >
          Job Salary
        </label>
        <input
          id="salary"
          min={0}
          onChange={(e) => setSalary(e.target.value)}
          type="number"
          placeholder="2500"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        ADD
      </button>
    </form>
  );
};

export default AddJob;
