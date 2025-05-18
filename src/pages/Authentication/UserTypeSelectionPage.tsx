import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import logo from "/images/logo.png";

const UserTypeSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelection = (type: "citizen" | "officer") => {
    if (type === "citizen") {
      navigate("/signup/citizen");
    } else if (type === "officer") {
      navigate("/signup/officer");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-white text-black">
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 text-lg focus:outline-none"
      >
        <FaArrowLeft className="text-2xl text-black hover:opacity-80 transition-opacity" />
      </button>

      <div className="flex justify-start gap-x-4 items-center">
        <img src={logo} alt="Main Logo" className="h-16 w-16 mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2 drop-shadow-lg">
          AI Mass Reporting
        </h1>
      </div>

      <div className="p-8 rounded-lg w-96 bg-gray-100 shadow-[0px_0px_4px_rgba(24,54,178,1)]">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">
          Choose Account Type
        </h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSelection("citizen")}
            className="py-2 rounded-md font-semibold border-2 border-[#1836b2] bg-transparent text-[#1836b2] hover:shadow-lg transition-all"
          >
            I’m a Citizen Reporter
          </button>
          <button
            onClick={() => handleSelection("officer")}
            className="py-2 rounded-md font-semibold bg-[#1836b2] text-white hover:shadow-lg transition-all"
          >
            I’m a Traffic Officer
          </button>
        </div>

        <p className="text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-gray-800 hover:text-blue-600 underline border-none bg-transparent focus:outline-none"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserTypeSelectionPage;
