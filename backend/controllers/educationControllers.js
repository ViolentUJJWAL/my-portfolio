const Education = require('../models/educationModels'); // Import the Education model
const uploadOnCloudinary = require("../utils/cloudinary")
const cloudinary = require('cloudinary').v2;

// Get all education entries for a specific user
exports.getAllEducation = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const educationEntries = await Education.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({ message: "get all education data", data: educationEntries });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Failed to retrieve education entries.' });
    }
}

// Add a new education entry with optional image upload
exports.addEducation = async (req, res) => {
    try {
        const { course, college, location, start, end, description } = req.body;
        const userId = req.user.id;

        if (!course || !college || !location || !start || !end || !description || !start.month || !start.year || !end.month || !end.year) {
            console.log(!start.year)
            return res.status(400).json({ error: "all field are required" })
        }

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        console.log(currentMonth)

        const status = (end.year > currentYear) ? "pursuing" : (end.month > currentMonth)? "pursuing" : "completed"

        let imageUrl = null;
        let imagePublicId = null;

        // Check if image file is provided and upload it to Cloudinary
        if (req.file) {
            const { url, public_id } = await uploadOnCloudinary(req.file.path);
            imageUrl = url;
            imagePublicId = public_id;
        }

        // Create a new Education document
        const newEducation = new Education({
            course,
            college,
            location,
            start,
            end,
            status,
            image: (!imagePublicId) ? null : { url: imageUrl, public_id: imagePublicId },
            description,
            userId
        });

        await newEducation.save();
        return res.status(201).json({ message: 'Education entry added successfully!', education: newEducation });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
}

// Update an existing education entry with optional image update
exports.updateEducation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const updatedData = req.body;
        if (updatedData.start) {
            if (!updatedData.start.year || !updatedData.start.month) return res.status(400).json({ error: "invalid formet of course start" });
        }

        if (updatedData.end) {
            if (!updatedData.end.year || !updatedData.end.month) return res.status(400).json({ error: "invalid formet of course end" });
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();
            updatedData.status = (updatedData.end.year > currentYear) ? "pursuing" : (updatedData.end.month > currentMonth)? "pursuing" : "completed"
        }

        // Find the existing education entry to get current image details
        const education = await Education.findOne({ _id: id, userId });
        if (!education) return res.status(404).json({ error: 'Education entry not found or access denied.' });

        // If a new image file is provided, delete the old image from Cloudinary and upload a new one
        if (req.file) {
            if (education.image.public_id) {
                await cloudinary.uploader.destroy(education.image.public_id); // Delete old image from Cloudinary
            }

            const { url, public_id } = await uploadOnCloudinary(req.file.path); // Upload new image to Cloudinary
            updatedData.image = { url, public_id }; // Update image data
        }
        // Update the education entry in the database
        console.log("updatedData", updatedData)
        const updatedEducation = await Education.findOneAndUpdate(
            { _id: id, userId },
            updatedData,
            { new: true}
        );

        return res.status(200).json({ message: 'Education entry updated successfully!' });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message });
    }
}

// Delete an education entry by ID
exports.deleteEducation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        // Find the education entry to get current image details
        const education = await Education.findOne({ _id: id, userId });
        if (!education) return res.status(404).json({ error: 'Education entry not found or access denied.' });

        // Delete image from Cloudinary if it exists
        if (education.image.public_id) {
            await cloudinary.uploader.destroy(education.image.public_id);
        }

        // Delete the education entry from the database
        await Education.findOneAndDelete({ _id: id, userId });
        return res.status(200).json({ message: 'Education entry deleted successfully!', data: education });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Failed to delete education entry.' });
    }
}
