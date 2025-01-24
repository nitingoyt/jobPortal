import express from "express"
import { getJobById, getJobs } from "../controllers/jobController.js"

const router = express.Router()

// Route to get all jobs data
router.get('/', getJobs)

// Route to get single job using iD
router.get('/:id', getJobById)


export default router