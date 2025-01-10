import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const [state, setstate] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const { setShowRecruiterLogin } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmited) {
      setIsTextDataSubmited(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  });

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96 space-y-6 relative"
      >
        {/* Close (Cross) Icon */}
        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-4 right-4 cursor-pointer w-6 h-6 hover:opacity-80 transition duration-200"
          src={assets.cross_icon}
          alt="Close"
        />

        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Recruiter {state}
        </h1>
        <p className="text-center text-gray-600">Welcome back!</p>

        {state === "Sign Up" && isTextDataSubmited ? (
          <div className="text-center">
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload Area"
                className="mx-auto mb-4 w-32 h-32 object-contain"
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
            <p className="text-gray-700">Upload Company Logo</p>
          </div>
        ) : (
          <>
            {state !== "Login" && (
              <div className="space-y-2">
                <div className="flex items-center gap-3 border p-2 rounded-lg shadow-sm">
                  <img src={assets.person_icon} alt="" className="h-6 w-6" />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Company Name"
                    className="flex-1 outline-none border-none"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-3 border p-2 rounded-lg shadow-sm">
                <img src={assets.email_icon} alt="" className="h-6 w-6" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email ID"
                  className="flex-1 outline-none border-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 border p-2 rounded-lg shadow-sm">
                <img src={assets.lock_icon} alt="" className="h-6 w-6" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  className="flex-1 outline-none border-none"
                  required
                />
              </div>
            </div>
          </>
        )}

        {state === "Login" && (
          <p className="text-sm text-right text-blue-600 cursor-pointer">
            Forgot password?
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmited
            ? "Create Account"
            : "Next"}
        </button>

        {state === "Login" ? (
          <p className="text-sm text-center text-gray-600">
            Dont have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setstate("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setstate("Login")}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default RecruiterLogin;
