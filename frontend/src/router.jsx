import {createBrowserRouter} from "react-router-dom"
import App from './App'
import LoginAdmin from "./components/LoginAdmin"
import RegisterPage from "./components/RegisterPage"
import Dashboard from "./components/Dashboard"
import Employee from "./components/Employee"

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<RegisterPage/>
            },
            {
                path:"/login-admin",
                element:<LoginAdmin/>
            },
            {
                path:"/dashboard/:name",
                element:<Dashboard/>,
               
            },
            {
                path:"/employee-register",
                element:<Employee/>
            }
        ]
    }
])

export default router