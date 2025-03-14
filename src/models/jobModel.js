import mongoose from 'mongoose';
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    experienceLevel: {
        type: String,
        required: true,
    },
    isbookmarked: {
        type: Boolean,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
});
const Job = mongoose.model('Job', jobSchema);
export default Job;