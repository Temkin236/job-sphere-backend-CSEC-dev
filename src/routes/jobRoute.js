import express from 'express';
import upload from '../config/multer.js';   

import {
    createJob,
    getJobs,
    getJobById,
    deleteJobs,
    Updatejobs, // Add missing import
} from '../controllers/jobController.js'; // Include file extension
import { validateJob } from '../middleware/validator.js';

const router = express.Router();

// Define routes
router.get('/', getJobs); // Get all jobs
router.get('/:id', getJobById); // Get a job by ID
router.post('/', upload.single('logo'),validateJob, createJob); // Create a new job (with validation)
router.put('/:id', Updatejobs); // Update a job by ID
router.delete('/:id', deleteJobs); // Delete a job by ID

export default router;