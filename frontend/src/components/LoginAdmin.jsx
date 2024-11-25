import axios from 'axios'
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, } from 'react-toastify'

const LoginAdmin = () => {

    const navigate = useNavigate()

    const [username, Setusername] = useState("")
    const [password, Setpassword] = useState("")
    const [tc, Settc] = useState(false)

    const handleclick = async (e) => {
      try {
        e.preventDefault(); // Corrected the typo
    
        const data = {
          username,
          password,
        };
    
        const response = await axios.post(
          "http://localhost:5000/login",
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const name = response.data.data.username
        console.log(name)
        
        if(response){
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
        }
    
        
        Setusername("");
        Setpassword("");
    
        setTimeout(() => {
          navigate(`/dashboard/${name}`)
        }, 2000); // Adjust the delay as needed

        console.log("Admin logged in successfully");

      } catch (error) {
        if (error.response && error.response.data && error.response.data.message === "user not found") {
          toast.warning('Admin not found', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    };
    

  return (

    <>
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            
        />
        
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-4 py-4 mx-auto min-h-screen lg:py-4">
            <div className="w-full bg-white rounded-lg shadow border sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Admin Login
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleclick}>
                <div>
                    <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    >
                    Username
                    </label>
                    <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => Setusername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Joy"
                    required
                    />
                </div>
                <div>
                    <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    >
                    Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => Setpassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    />
                </div>
                
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                    <input
                        id="terms"
                        value={tc}
                        onChange={()=>Settc(!tc)}
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required
                    />
                    </div>
                    <div className="ml-3 text-sm">
                    <label
                        htmlFor="terms"
                        className="font-light text-gray-500"
                    >
                        I accept the{" "}
                        <a
                        className="font-medium text-primary-600 hover:underline"
                        href="/"
                        >
                        Terms and Conditions
                        </a>
                    </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Login
                </button>
                <p className="text-sm font-light text-gray-500">
                    Don't have an account?{" "}

                    <Link to="/"  className="font-medium text-primary-600 hover:underline">
                    Create Account
                    </Link>
                </p>
                </form>
            </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default LoginAdmin
