import React from 'react'
import { Link, useParams } from 'react-router-dom'
import EmployeeDetails from './EmployeeDetails'

const Dashboard = () => {
  const {name} = useParams()

  return (
   <>
    <div className='text-center my-5'>
      Welcome :  {name.toUpperCase()}
    </div>

    <div>
    <Link to="/employee-register" className="flex justify-center">
      <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all">
        Add Employee
      </button>
    </Link>
    </div>

    <EmployeeDetails/>
   </>
  )
}

export default Dashboard
