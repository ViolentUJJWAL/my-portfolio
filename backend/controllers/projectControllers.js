const Project = require('../models/projectModels'); // Import the Project model
const uploadOnCloudinary = require("../utils/cloudinary")
const cloudinary = require('cloudinary').v2;


// Get all projects for a specific user
exports.getAllProjects = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const projects = await Project.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({message: "get all education data", data: projects});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to retrieve projects.'});
    }
}

// Add a new project with image upload
exports.addProject = async (req, res) => {
    try {
        const { title, description, link } = req.body;
        const userId = req.user.id;

        if(!title || !description || !link) return res.status(400).json({error: "project title, description and link is required."});
        if(await Project.findOne({title, userId})) return res.status(400).json({error: "Project title alresdy exist"});

        // Check if image file is provided
        if (!req.file) {
            return res.status(400).json({error: 'Project image is required.'});
        }

        // Upload image to Cloudinary
        const { url, public_id } = await uploadOnCloudinary(req.file.path);

        // Create a new Project document
        const newProject = new Project({
            title,
            description,
            image: { url, public_id },
            link,
            userId
        });

        await newProject.save();
        return res.status(201).json({ message: 'Project added successfully!', data: newProject });
    } catch (error) {
        console.log(error)
       return res.status(400).json({error: error.message});
    }
}

// Update an existing project with optional image update
exports.updateProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const updatedData = req.body;

        // Find the existing project to get the current image details
        const project = await Project.findOne({ _id: id, userId });
        if (!project) return res.status(404).json({error: 'Project not found or access denied.'});

        // If a new image file is provided, delete the old image from Cloudinary
        if (req.file) {
            if (project.image.public_id) {
                await cloudinary.uploader.destroy(project.image.public_id); // Delete old image from Cloudinary
            }

            // Upload new image to Cloudinary
            const { url, public_id } = await uploadOnCloudinary(req.file.path);
            updatedData.image = { url, public_id }; // Update image data
        }

        // Update project in the database
        const updatedProject = await Project.findOneAndUpdate(
            { _id: id, userId },
            updatedData,
            { new: true, runValidators: true }
        );

        return res.status(200).json({ message: 'Project updated successfully!', data: updatedProject });
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message});
    }
}

// Delete a project by ID
exports.deleteProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        // Find the project to get the current image details
        const project = await Project.findOne({ _id: id, userId });
        if (!project) return res.status(404).json({error: 'Project not found or access denied.'});

        // Delete image from Cloudinary if it exists
        if (project.image.public_id) {
            await cloudinary.uploader.destroy(project.image.public_id);
        }

        // Delete project from the database
        await Project.findOneAndDelete({ _id: id, userId });
        return res.status(200).json({message: 'Project deleted successfully!'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to delete project.'});
    }
}


