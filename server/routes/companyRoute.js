import express, { Router } from "express";
import {
  ChangeJobApplicationsStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a company
router.post("/register", upload.single("image"), registerCompany);

// Company Login
router.post("/login", loginCompany);

// get company data
router.get("/company", protectCompany, getCompanyData);

// Post a job
router.post("/post-job", protectCompany, postJob);

// Get applicants Data
router.get("/applicants", protectCompany, getCompanyJobApplicants);

// get company job list
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);

// get company application status
router.post("/change-status", protectCompany, ChangeJobApplicationsStatus);

//change application visibility
router.post("/change-visibility", protectCompany, changeVisibility);

export default router;
