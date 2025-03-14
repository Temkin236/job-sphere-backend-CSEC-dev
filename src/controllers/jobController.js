import Job from '../models/jobModel.js';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: 'Failed to retrieve jobs' });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ message: 'Failed to retrieve job' });
    }
};

const createJob = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No logo image uploaded' });
        if (!req.file.mimetype.startsWith('image/')) return res.status(400).json({ message: 'Uploaded file is not an image' });

        // Process image
        const resizedBuffer = await sharp(req.file.buffer)
            .resize({ width: 250, height: 250, fit: 'contain' })
            .jpeg({ quality: 90 })
            .toBuffer();

        // Define file path
        const filename = `logo-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;
        const uploadDir = path.join(__dirname, '../../uploads');
        const filePath = path.join(uploadDir, filename);

        // Ensure upload directory exists
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        // Save the processed image
        await fs.promises.writeFile(filePath, resizedBuffer);

        // Create job entry in database
        const job = new Job({
            ...req.body,
            logo: `/uploads/${filename}`
        });
        await job.save();

        res.status(201).json(job);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Failed to create job' });
    }
};

const Updatejobs = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!job) return res.status(404).json({ message: 'Job not found' });

        res.status(200).json(job);
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Failed to update job' });
    }
};

const deleteJobs = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: 'Failed to delete job' });
    }
};

// Export the controller functions
export { createJob, deleteJobs, getJobs, getJobById, Updatejobs };
