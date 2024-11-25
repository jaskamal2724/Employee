import { Router } from "express";
import { createEmployee, deleteEmployee, editEmployee, viewDetails } from "../controllers/Employee.controller.js";
import { registerAdmin, signInAdmin } from "../controllers/Admin.controller.js"
import { upload } from "../middlewares/multer.js";

const router = Router()

// admin routes
router.route("/registerAdmin").post(registerAdmin)
router.route("/login").post(signInAdmin)

// employee routes
router.route("/registerEmployee").post(
    upload.fields([
        {
            name:"profileImage",
            maxCount:1
        }
    ]),
    createEmployee)

router.route("/employee-details").get(viewDetails)
router.route("/delete-employee").delete(deleteEmployee)
router.route("/update-employee").post(editEmployee)
export default router