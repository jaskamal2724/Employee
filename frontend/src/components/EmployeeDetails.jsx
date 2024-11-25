import axios from 'axios';
import React, { useState, useEffect } from 'react';

const EmployeeDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employees, Setemployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employee-details");
      Setemployees(response.data.data);
    } catch (err) {
      console.log(err.message || "An error occurred while fetching employees.");
    }
  };

  const openModal = (employee) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentEmployee(null);
    setIsModalOpen(false);
  };

  const handleSave = async (updatedEmployee) => {
    try {
      // Send updated employee data to the server

      const response = await axios.post("http://localhost:5000/update-employee", updatedEmployee);
      if (response.status === 200) {
        fetchEmployees();  // Re-fetch employees after updating
        closeModal();
      }
    } 
    catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const Modal = ({ isOpen, onClose, employee, onSave }) => {
    const [formData, setFormData] = useState(employee || {});

    useEffect(() => {
      if (employee) {
        setFormData(employee);
      }
    }, [employee]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let updatedEmployee={
        email:formData.email,
        formData
      }
      onSave(updatedEmployee);
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-l mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo || ""}
            onChange={handleChange}
            placeholder="Mobile No"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="designation"
            value={formData.designation || ""}
            onChange={handleChange}
            placeholder="Designation"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            placeholder="Gender"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="course"
            value={formData.course || ""}
            onChange={handleChange}
            placeholder="Course"
            className="w-full px-3 py-2 border rounded"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    
    );
  };

  const handleDelete = async (id) => {
    try {
      // Send delete request to the server
      const response = await axios.delete(`http://localhost:5000/employee-details/${id}`);
      if (response.status === 200) {
        fetchEmployees();  // Re-fetch employees after deletion
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-center mb-4">Employee Details</h1>
        <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            employee={currentEmployee}
            onSave={handleSave}
          />
        {/* For small screens (mobile-first card layout) */}
        <div className="lg:hidden grid grid-cols-1 gap-4">
          
          {employees.map((employee, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition duration-200"
            >
              <h3 className="text-lg font-medium">{employee.name}</h3>
              <p className="text-sm text-gray-600">{employee.email}</p>
              <p className="text-sm text-gray-600">{employee.mobileNo}</p>
              <p className="text-sm text-gray-600">{employee.designation}</p>
              <p className="text-sm text-gray-600">{employee.gender}</p>
              <p className="text-sm text-gray-600">{employee.course}</p>

              <div className="mt-4 flex justify-between">
                <img
                  src={employee.profileImage}
                  alt="Employee"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="space-x-2">
                  <button onClick={() => openModal(employee)} className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 focus:outline-none">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(employee.id)} className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 focus:outline-none">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* For larger screens (desktop view with table) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Mobile No</th>
                <th className="py-2 px-4 border-b">Designation</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Course</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{employee.name}</td>
                  <td className="py-2 px-4 border-b">{employee.email}</td>
                  <td className="py-2 px-4 border-b">{employee.mobileNo}</td>
                  <td className="py-2 px-4 border-b">{employee.designation}</td>
                  <td className="py-2 px-4 border-b">{employee.gender}</td>
                  <td className="py-2 px-4 border-b">{employee.course}</td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={employee.profileImage}
                      alt="Employee"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button onClick={() => openModal(employee)} className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 focus:outline-none">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(employee.id)} className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 focus:outline-none">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
