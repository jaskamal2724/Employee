import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: "", 
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("email", formData.email);
    dataToSend.append("mobileNo", formData.mobileNo);
    dataToSend.append("designation", formData.designation);
    dataToSend.append("gender", formData.gender);
    dataToSend.append("course", formData.course);
    if (formData.profileImage) {
      dataToSend.append("profileImage", formData.profileImage);
    }
    
    console.log(dataToSend)
    
    try {
        const response = await axios.post("http://localhost:5000/registerEmployee", dataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
        toast.success('🦄 Admin logged in Successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        setFormData({
            name: "",
            email: "",
            mobileNo: "",
            designation: "",
            gender: "",
            course: "",
            profileImage: null,
        });  
        console.log("User data submitted successfully!");

      } 
      catch (error) {
        console.error("Error submitting form data:", error);
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <h3 className="text-center">Employee Regsitration</h3>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* mobileNo No */} 
          <div>
            <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
              mobileNo:
            </label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              placeholder="Enter your mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Designation */}
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
              Designation:
            </label>
            <select
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender:</label>
            <div className="mt-1 flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Course:</label>
            <div className="mt-1 flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="course"
                  value="MCA"
                  checked={formData.course === "MCA"}
                  onChange={handleChange}
                  className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2">MCA</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="course"
                  value="BCA"
                  checked={formData.course === "BCA"}
                  onChange={handleChange}
                  className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2">BCA</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="course"
                  value="BSC"
                  checked={formData.course === "BSC"}
                  onChange={handleChange}
                  className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2">BSC</span>
              </label>
            </div>
          </div>

          {/* profileImage Upload */}
          <div>
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
              profileImage Upload:
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
