import { Application } from "../models/applicationModel.js"
import { Job } from '../models/jobModel.js'
import mongoose from "mongoose";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        // Ensure jobId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid Job ID.",
                success: false
            });
        }

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }

        // Check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred.", success: false });
    }
};




export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        })
        if(!application){
            return res.status(404).json({ message: 'No jobs found', success: false })
        }
        return res.status(200).json({ message: 'Jobs found successfully', success: true,application})
    } catch (error) {
        throw new Error(error)
    }
}


export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}



export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body
        const applicationId = req.params.id
        if(!status){
            return res.status(400).json({ message: 'Status is required', success: false })
        }
        const applicantion = await Application.findOne({
            _id: applicationId,
        })
        if(!applicantion){
            return res.status(404).json({ message: 'Application not found', success: false })
        }
        applicantion.status = status.toLowerCase()
        await applicantion.save()
        return res.status(200).json({ message: 'Status updated successfully', success: true})
    } catch (error) {
        throw new Error(error)
    }
}