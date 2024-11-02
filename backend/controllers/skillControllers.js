const Skill = require('../models/skillModels'); // Import the Skill model
const uploadOnCloudinary = require("../utils/cloudinary")
const cloudinary = require('cloudinary').v2;



// Get all skills for a specific user
exports.getAllSkills = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const skills = await Skill.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({message : "get all skill data", data: skills});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to retrieve skills.'});
    }
}

// Add a new skill with icon upload
exports.addSkill = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id;

        if(!name || !description){
            return res.status(400).json({error: "Skill name and description is required."})
        }

        if(await Skill.findOne({name, userId})) return res.status(400).json({error: "this skill name is already exist"})

        // Check if icon file is provided
        if (!req.file) {
            return res.status(400).json({error: 'Skill icon is required.'});
        }

        // Upload icon to Cloudinary
        const { url, public_id } = await uploadOnCloudinary(req.file.path);

        // Create a new Skill document
        const newSkill = new Skill({
            name,
            icon: { url, public_id },
            description,
            userId
        });

        await newSkill.save();
        return res.status(201).json({ message: 'Skill added successfully!', data: newSkill });
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message});
    }
}

// Update an existing skill with optional icon update
exports.updateSkill = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const updatedData = req.body;

        // Find the existing skill to get the current icon details
        const skill = await Skill.findOne({ _id: id, userId });
        if (!skill) return res.status(404).json({error: 'Skill not found or access denied.'});

        // If a new icon file is provided, delete the old icon from Cloudinary
        if (req.file) {
            if (skill.icon.public_id) {
                await cloudinary.uploader.destroy(skill.icon.public_id); // Delete old icon from Cloudinary
            }

            // Upload new icon to Cloudinary
            const { url, public_id } = await uploadOnCloudinary(req.file.path);
            updatedData.icon = { url, public_id }; // Update icon data
        }

        // Update skill in the database
        const updatedSkill = await Skill.findOneAndUpdate(
            { _id: id, userId },
            updatedData,
            { new: true, runValidators: true }
        );

        return res.status(200).json({ message: 'Skill updated successfully!', data: updatedSkill });
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message});
    }
}

// Delete a skill by ID
exports.deleteSkill = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        // Find the skill to get the current icon details
        const skill = await Skill.findOne({ _id: id, userId });
        if (!skill) return res.status(404).json({error: 'Skill not found or access denied.'});

        // Delete icon from Cloudinary if it exists
        if (skill.icon.public_id) {
            await cloudinary.uploader.destroy(skill.icon.public_id);
        }

        // Delete skill from the database
        await Skill.findOneAndDelete({ _id: id, userId });
        return res.status(200).json({error: 'Skill deleted successfully!'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to delete skill.'});
    }
}